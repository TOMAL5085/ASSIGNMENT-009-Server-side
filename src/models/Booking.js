import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    tutorName: {
      type: String,
      required: true,
      trim: true,
    },
    tutorSubject: {
      type: String,
      required: true,
      trim: true,
    },
    tutorPhoto: {
      type: String,
      required: true,
      trim: true,
    },
    sessionStartDate: {
      type: Date,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentEmail: {
      type: String,
      required: true,
      trim: true,
    },
    studentUid: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "booked",
      enum: ["booked", "cancelled"],
    },
    sessionToken: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
