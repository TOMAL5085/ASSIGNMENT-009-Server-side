import "dotenv/config";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { toNodeHandler } from "better-auth/node";
import { createAuth } from "./src/lib/auth.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import tutorRoutes from "./src/routes/tutorRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.CLIENT_URL,
].filter(Boolean);

function signAppJwt(user) {
  return jwt.sign(
    {
      uid: user.id,
      email: user.email,
      name: user.name,
      photoURL: user.image || "",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function createHeadersFromRequest(req) {
  const headers = new Headers();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      headers.set(key, value.join(","));
      return;
    }

    if (value) {
      headers.set(key, value);
    }
  });

  return headers;
}

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const auth = createAuth(mongoose.connection.db);

    app.use(
      cors({
        origin(origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
          }

          callback(new Error("Origin is not allowed by CORS"));
        },
        credentials: true,
      })
    );

    app.get("/", (_req, res) => {
      res.json({
        name: "MediQueue API",
        status: "running",
        timestamp: new Date().toISOString(),
      });
    });

    app.get("/api/health", (_req, res) => {
      res.json({ ok: true });
    });

    app.get("/api/social-complete", async (req, res, next) => {
      try {
        const session = await auth.api.getSession({
          headers: createHeadersFromRequest(req),
        });

        if (!session) {
          return res.redirect(
            `${process.env.CLIENT_URL}/login?authError=${encodeURIComponent("Unable to complete Google sign-in.")}`
          );
        }

        const redirectPath = typeof req.query.redirect === "string" ? req.query.redirect : "/";
        const redirectUrl = new URL("/auth-callback", process.env.CLIENT_URL);

        redirectUrl.searchParams.set("token", signAppJwt(session.user));
        redirectUrl.searchParams.set("sessionToken", session.session.token);
        redirectUrl.searchParams.set("redirect", redirectPath);
        redirectUrl.searchParams.set("id", session.user.id);
        redirectUrl.searchParams.set("name", session.user.name);
        redirectUrl.searchParams.set("email", session.user.email);
        redirectUrl.searchParams.set("image", session.user.image || "");

        return res.redirect(redirectUrl.toString());
      } catch (error) {
        next(error);
      }
    });

    app.post("/api/auth/exchange", express.json(), async (req, res, next) => {
      try {
        const { sessionToken } = req.body;

        if (!sessionToken) {
          return res.status(400).json({ message: "Session token is required." });
        }

        const session = await auth.api.getSession({
          headers: new Headers({
            authorization: `Bearer ${sessionToken}`,
          }),
        });

        if (!session) {
          return res.status(401).json({ message: "Invalid auth session." });
        }

        return res.json({
          token: signAppJwt(session.user),
          user: {
            uid: session.user.id,
            displayName: session.user.name,
            email: session.user.email,
            photoURL: session.user.image || "",
          },
        });
      } catch (error) {
        next(error);
      }
    });

    app.all("/api/auth/*splat", toNodeHandler(auth));
    app.use(express.json());

    app.use("/api/tutors", tutorRoutes);
    app.use("/api/bookings", bookingRoutes);

    app.use((err, _req, res, _next) => {
      const status = err.status || 500;
      res.status(status).json({
        message: err.message || "Something went wrong on the server.",
      });
    });

    app.listen(port, () => {
      console.log(`MediQueue server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();
