const Bill = require("../models/bill");
const mongoose = require("mongoose");

// Create a new bill

const createBill = async (req, res) => {
  try {
    console.log("Logged in user:", req.user.userId);
    const userId = req.user.userId;
    const {
      customerName,
      customerEmail,
      items,
      totalAmount,
      template,
      companyDetails,
    } = req.body;

    const newBill = new Bill({
      user: userId,
      customerName,
      customerEmail,
      items,
      totalAmount,
      template,
      companyDetails,
    });

    await newBill.save();
    res.status(201).json({ message: "Bill created successfully", bill: newBill });
  } catch (error) {
    res.status(500).json({ message: "Failed to create bill", error: error.message });
  }
};

// Get all bills for the logged-in company
const getBillsByCompany = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bills = await Bill.find({ user: userId }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bills", error: error.message });
  }
};

const getBillById = async (req, res) => {
  try {
    const billId = req.params.id;
    const userId = req.user.userId;

    // console.log("GET /api/bills/:id HIT");
    // console.log("Requested Bill ID:", billId);
    // console.log("Authenticated User ID:", userId);

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(billId)) {
      return res.status(400).json({ message: "Invalid Bill ID" });
    }

    const bill = await Bill.findOne({
      _id: billId,
      user: userId,
    });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json(bill);
  } catch (error) {
    console.error("Error in getBillById:", error);
    res.status(500).json({ message: "Failed to fetch bill", error: error.message });
  }
};



// Export the functions
module.exports = {
  createBill,
  getBillsByCompany,
  getBillById,
};
