import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ message: "Email or username already in use" });

    const user = await User.create({ username, email, password });
    res.status(201).json({ user: { id: user._id, username: user.username, email: user.email }, token: generateToken(user) });
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Provide username and password" });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ user: { id: user._id, username: user.username, email: user.email }, token: generateToken(user) });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${resetToken}`;
    res.json({ message: "Reset token created", resetURL });
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "Password required" });

    const hashed = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ resetPasswordToken: hashed, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Token invalid or expired" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: "Password reset successful", token: generateToken(user) });
};
