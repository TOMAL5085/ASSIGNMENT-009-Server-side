import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    tutorName: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    availableDays: {
      type: String,
      required: true,
      trim: true,
    },
    availableTimeSlot: {
      type: String,
      required: true,
      trim: true,
    },
    hourlyFee: {
      type: Number,
      required: true,
      min: 0,
    },
    totalSlot: {
      type: Number,
      required: true,
      min: 0,
    },
    sessionStartDate: {
      type: Date,
      required: true,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    teachingMode: {
      type: String,
      required: true,
      enum: ["Online", "Offline", "Both"],
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    creator: {
      uid: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      photoURL: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tutor || mongoose.model("Tutor", tutorSchema);
