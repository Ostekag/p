// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body; // <-- вот эта строка!

    // проверка, есть ли уже пользователь
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};