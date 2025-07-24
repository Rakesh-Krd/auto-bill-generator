const User = require('../models/user');
const OTP = require('../models/otp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP } = require('../utils/generateOTP');
const { sendEmail } = require('../utils/sendEmail');

const signup = async (req, res) => {
  const { companyName, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered.' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ companyName, email, password: hashed });
    await user.save();

    const code = generateOTP();
    await OTP.create({ email, code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) }); // 10 min

    await sendEmail(email, "Verify your email", `Your OTP is ${code}`);
    res.status(201).json({ message: 'OTP sent for verification.' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

const verifyOtp = async (req, res) => {
  const { email, code } = req.body;
  try {
    const otpEntry = await OTP.findOne({ email, code });
    if (!otpEntry || otpEntry.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    await User.updateOne({ email }, { verified: true });
    await OTP.deleteMany({ email }); // remove all OTPs

    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Verification failed', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.verified) return res.status(401).json({ message: 'Invalid credentials or email not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const code = generateOTP();
    await OTP.create({ email, code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) });

    await sendEmail(email, "Reset Password", `Your OTP to reset password is ${code}`);
    res.json({ message: 'OTP sent to reset password' });
  } catch (err) {
    res.status(500).json({ message: 'Request failed', error: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    const otpEntry = await OTP.findOne({ email, code });
    if (!otpEntry || otpEntry.expiresAt < Date.now()) return res.status(400).json({ message: 'Invalid or expired OTP' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashed });

    await OTP.deleteMany({ email });
    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Reset failed', error: err.message });
  }
};

// Export all at once
module.exports = {
  signup,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword
};
