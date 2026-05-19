import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Tutor from "../models/Tutor.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { search = "", startDate, endDate, limit } = req.query;
    const query = {};

    if (search.trim()) {
      query.tutorName = { $regex: search.trim(), $options: "i" };
    }

    if (startDate || endDate) {
      query.sessionStartDate = {};

      if (startDate) {
        query.sessionStartDate.$gte = new Date(startDate);
      }

      if (endDate) {
        query.sessionStartDate.$lte = new Date(endDate);
      }
    }

    const tutors = await Tutor.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) || 0);

    res.json(tutors);
  } catch (error) {
    next(error);
  }
});

router.get("/my-tutors", verifyToken, async (req, res, next) => {
  try {
    const tutors = await Tutor.find({ "creator.email": req.user.email }).sort({
      createdAt: -1,
    });

    res.json(tutors);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Tutor not found." });
    }

    const tutor = await Tutor.findById(req.params.id);

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found." });
    }

    res.json(tutor);
  } catch (error) {
    next(error);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const tutor = new Tutor({
      ...req.body,
      creator: {
        uid: req.user.uid,
        name: req.body.creator?.name || req.user.name || "Tutor Creator",
        email: req.user.email,
        photoURL: req.body.creator?.photoURL || req.user.photoURL || "",
      },
    });

    const savedTutor = await tutor.save();
    res.status(201).json(savedTutor);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", verifyToken, async (req, res, next) => {
  try {
    const tutor = await Tutor.findOne({
      _id: req.params.id,
      "creator.email": req.user.email,
    });

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found." });
    }

    Object.assign(tutor, req.body);
    const updatedTutor = await tutor.save();

    res.json(updatedTutor);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const tutor = await Tutor.findOneAndDelete({
      _id: req.params.id,
      "creator.email": req.user.email,
    });

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found." });
    }

    await Booking.deleteMany({ tutorId: tutor._id });

    res.json({ message: "Tutor deleted successfully." });
  } catch (error) {
    next(error);
  }
});

export default router;
