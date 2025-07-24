const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");
const { protect } = require("../middlewares/authMiddleware");

const {createBill, getBillsByCompany,getBillById} = billController;

router.post("/create", protect, createBill);
router.get("/history", protect, getBillsByCompany);
router.get("/:id", protect, getBillById);

module.exports = router;
