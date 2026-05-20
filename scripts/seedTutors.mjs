import "dotenv/config";
import mongoose from "mongoose";
import Tutor from "../src/models/Tutor.js";

const creator = {
  uid: "seed-admin-001",
  name: "MediQueue Seed Team",
  email: "seed@mediqueue.app",
  photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
};

const tutors = [
  {
    _id: new mongoose.Types.ObjectId("6a0cb37fe16e2703f4d0eea2"),
    tutorName: "Farzana Kabir",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
    subject: "English",
    availableDays: "Sun - Thu",
    availableTimeSlot: "8:00 AM - 11:00 AM",
    hourlyFee: 15,
    totalSlot: 14,
    sessionStartDate: new Date("2026-05-16"),
    institution: "BRAC University",
    experience: "8 years teaching grammar, writing, and spoken English.",
    location: "Banani, Dhaka",
    teachingMode: "Both",
    description: "Farzana helps students improve fluency, grammar accuracy, and confident writing through guided practice.",
  },
  {
    _id: new mongoose.Types.ObjectId("6a0cb37fe16e2703f4d0eea4"),
    tutorName: "Israt Faria",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    subject: "Accounting",
    availableDays: "Sun - Wed",
    availableTimeSlot: "3:30 PM - 6:30 PM",
    hourlyFee: 18,
    totalSlot: 10,
    sessionStartDate: new Date("2026-05-14"),
    institution: "University of Chittagong",
    experience: "6 years teaching principles of accounting and business finance.",
    location: "Agrabad, Chattogram",
    teachingMode: "Both",
    description: "Israt emphasizes ledger accuracy, journal flow, and exam-ready shortcuts for commerce students.",
  },
  {
    _id: new mongoose.Types.ObjectId("6a0cb37fe16e2703f4d0eea5"),
    tutorName: "Rafiul Karim",
    photo: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=900&q=80",
    subject: "Economics",
    availableDays: "Sat - Thu",
    availableTimeSlot: "5:30 PM - 7:30 PM",
    hourlyFee: 17,
    totalSlot: 13,
    sessionStartDate: new Date("2026-05-13"),
    institution: "University of Rajshahi",
    experience: "5 years working with micro, macro, and graph-based economics preparation.",
    location: "Khulshi, Chattogram",
    teachingMode: "Both",
    description: "Rafiul teaches economics with real-life examples so theories and graphs stay easier to understand.",
  },
  {
    _id: new mongoose.Types.ObjectId("6a0cb37fe16e2703f4d0eea6"),
    tutorName: "Samia Chowdhury",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    subject: "Mathematics",
    availableDays: "Sun - Fri",
    availableTimeSlot: "9:00 PM - 11:00 PM",
    hourlyFee: 21,
    totalSlot: 7,
    sessionStartDate: new Date("2026-05-11"),
    institution: "Shahjalal University of Science and Technology",
    experience: "9 years teaching SSC, HSC, and engineering admission mathematics.",
    location: "Sylhet Sadar, Sylhet",
    teachingMode: "Online",
    description: "Samia is known for fast error correction, sharp practice sets, and step-by-step admission math coaching.",
  },
  {
    _id: new mongoose.Types.ObjectId("6a0cb37fe16e2703f4d0eea3"),
    tutorName: "Sabbir Ahmed",
    photo: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
    subject: "ICT",
    availableDays: "Fri - Tue",
    availableTimeSlot: "6:00 PM - 8:00 PM",
    hourlyFee: 19,
    totalSlot: 8,
    sessionStartDate: new Date("2026-05-15"),
    institution: "North South University",
    experience: "5 years supporting HSC ICT and beginner programming learners.",
    location: "Bashundhara, Dhaka",
    teachingMode: "Online",
    description: "Sabbir makes ICT practical with spreadsheets, logic-building exercises, and simple coding walkthroughs.",
  },
  {
    _id: new mongoose.Types.ObjectId("6a0cb37fe16e2703f4d0eea1"),
    tutorName: "Tanvir Alam",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    subject: "Biology",
    availableDays: "Mon - Thu",
    availableTimeSlot: "7:00 PM - 9:30 PM",
    hourlyFee: 16,
    totalSlot: 11,
    sessionStartDate: new Date("2026-05-17"),
    institution: "Rajshahi Medical College",
    experience: "4 years preparing students for medical admission biology.",
    location: "Mohammadpur, Dhaka",
    teachingMode: "Online",
    description: "Tanvir combines diagram-based teaching with chapter-wise quizzes to strengthen recall and confidence.",
  },
  {
    _id: new mongoose.Types.ObjectId("6a0cb37fe16e2703f4d0eea0"),
    tutorName: "Nusrat Jahan",
    photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
    subject: "Chemistry",
    availableDays: "Sun - Tue",
    availableTimeSlot: "4:30 PM - 7:00 PM",
    hourlyFee: 17,
    totalSlot: 9,
    sessionStartDate: new Date("2026-05-18"),
    institution: "Jahangirnagar University",
    experience: "5 years teaching organic, inorganic, and practical chemistry.",
    location: "Uttara, Dhaka",
    teachingMode: "Both",
    description: "Nusrat focuses on concept clarity, reaction mapping, and short memorization systems for fast revision.",
  },
  {
    _id: new mongoose.Types.ObjectId("6a0cb37fe16e2703f4d0ee9f"),
    tutorName: "Mahmud Hasan",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    subject: "Physics",
    availableDays: "Sat - Wed",
    availableTimeSlot: "6:30 PM - 9:00 PM",
    hourlyFee: 20,
    totalSlot: 10,
    sessionStartDate: new Date("2026-05-12"),
    institution: "BUET",
    experience: "7 years coaching board and university admission physics.",
    location: "Mirpur, Dhaka",
    teachingMode: "Online",
    description: "Mahmud uses visual explanations and exam-style practice to make mechanics and electricity easier to retain.",
  },
  {
    _id: new mongoose.Types.ObjectId("6a0cb37fe16e2703f4d0ee9e"),
    tutorName: "Ayesha Rahman",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    subject: "Mathematics",
    availableDays: "Sun - Thu",
    availableTimeSlot: "5:00 PM - 8:00 PM",
    hourlyFee: 18,
    totalSlot: 12,
    sessionStartDate: new Date("2026-05-01"),
    institution: "University of Dhaka",
    experience: "6 years helping HSC and admission candidates master advanced math.",
    location: "Dhanmondi, Dhaka",
    teachingMode: "Both",
    description: "Ayesha breaks complex algebra and calculus into calm, structured lessons with regular problem-solving drills.",
  },
];

async function seedTutors() {
  await mongoose.connect(process.env.MONGODB_URI);

  const ids = tutors.map((tutor) => tutor._id);
  await Tutor.deleteMany({
    _id: { $in: ids },
  });

  for (const tutor of tutors) {
    await Tutor.create({
      ...tutor,
      creator,
    });
    // Tiny delay to ensure unique createdAt timestamps
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  console.log(`Inserted ${tutors.length} tutors.`);

  await mongoose.disconnect();
}

seedTutors().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
