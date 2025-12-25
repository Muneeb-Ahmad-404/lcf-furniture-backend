import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

dotenv.config();

const adminEmail = "admin@example.com";
const adminPassword = "admin123";

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await Admin.create({
      email: adminEmail,
      password: hashedPassword
    });

    console.log("Admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error("Admin seeding failed:", err);
    process.exit(1);
  }
}

seedAdmin();
