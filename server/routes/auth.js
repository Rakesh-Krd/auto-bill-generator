const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


const { signup, verifyOtp, login, forgotPassword, resetPassword } = authController;

// console.log("Loaded controller:", authController); 
// Auth Routes
router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
