import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

import { createAccessToken } from "../libs/jwt.js";
import { passwordCheck } from "../libs/auth.utils.js";

export const register = async (req, res) => {
  const userData = req.body;

  try {
    // Hash the password before saving
    const passwordHashed = await bcrypt.hash(userData.password, 10);
    userData.password = passwordHashed;

    // save the user to the database
    const newUser = new User(userData);
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    // Set the access token in a cookie and respond with the user data
    res.cookie("accessToken", token);
    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const userData = req.body;

  try {
    const user = await User.findOne({ username: userData.username });

    const validPassword = await passwordCheck(
      userData.password,
      user?.password
    );

    if (!user || !validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // generare an access token
    const token = await createAccessToken({ id: user._id });

    // Set the access token in a cookie and respond with the user data
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logged out successfully" });
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    id: user._id,
    username: user.username,
    email: user.email,
  });
};
