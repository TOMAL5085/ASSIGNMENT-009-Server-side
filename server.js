import "dotenv/config";
import app from "./src/app.js";
import { connectToDatabase } from "./src/lib/runtime.js";

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`MediQueue server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();
