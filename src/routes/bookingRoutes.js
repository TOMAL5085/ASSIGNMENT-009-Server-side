import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Tutor from "../models/Tutor.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

function createSessionToken() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  const stamp = Date.now().toString().slice(-6);
  return `MQ-${stamp}-${random}`;
}

function startOfDay(date) {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

router.get("/my-bookings", verifyToken, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ studentEmail: req.user.email }).sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const { tutorId, studentName, studentEmail, phone } = req.body;

    if (!mongoose.Types.ObjectId.isValid(tutorId)) {
      return res.status(404).json({ message: "Tutor not found." });
    }

    if (studentEmail !== req.user.email) {
      return res.status(403).json({ message: "Email does not match token." });
    }

    const existingBooking = await Booking.findOne({
      tutorId,
      studentEmail,
      status: "booked",
    });

    if (existingBooking) {
      return res
        .status(409)
        .json({ message: "You have already booked this tutor session." });
    }

    const tutor = await Tutor.findById(tutorId);

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found." });
    }

    if (tutor.totalSlot <= 0) {
      return res.status(400).json({ message: "No available slots left." });
    }

    const today = startOfDay(new Date());
    const sessionDate = startOfDay(tutor.sessionStartDate);

    if (sessionDate < today) {
      return res.status(400).json({
        message: "This session date has already passed. Booking is closed for this tutor.",
      });
    }

    const updatedTutor = await Tutor.findOneAndUpdate(
      { _id: tutorId, totalSlot: { $gt: 0 } },
      { $inc: { totalSlot: -1 } },
      { new: true }
    );

    if (!updatedTutor) {
      return res.status(400).json({
        message: "This session is fully booked. You can't join at the moment.",
      });
    }

    const booking = await Booking.create({
      tutorId: tutor._id,
      tutorName: tutor.tutorName,
      tutorSubject: tutor.subject,
      tutorPhoto: tutor.photo,
      sessionStartDate: tutor.sessionStartDate,
      studentName,
      studentEmail,
      studentUid: req.user.uid,
      phone,
      status: "booked",
      sessionToken: createSessionToken(),
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/cancel", verifyToken, async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      studentEmail: req.user.email,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    if (booking.status === "cancelled") {
      return res
        .status(400)
        .json({ message: "This session has already been cancelled." });
    }

    booking.status = "cancelled";
    await booking.save();
    await Tutor.findByIdAndUpdate(booking.tutorId, { $inc: { totalSlot: 1 } });

    res.json({
      message: "Booking cancelled successfully.",
      booking,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
