import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import Application from "./models/ApplicationModel";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// API Routes
app.post("/api/apply", upload.single("resume"), async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, coverLetter, skills, availability, accessibilityRequirements } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const application = new Application({
      fullName,
      email,
      phone,
      resume: req.file.path,
      coverLetter,
      skills: skills ? JSON.parse(skills) : [],
      availability,
      accessibilityRequirements,
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    console.error("Error saving application:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
