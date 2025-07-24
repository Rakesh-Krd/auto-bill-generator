// models/bill.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
});

const billSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName: String,
  customerEmail: String,
  items: [itemSchema],
  totalAmount: Number,
  template: {
    type: String,
    default: "default",
  },
  companyDetails: {
    name: String,
    address: String,
    gst: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Bill", billSchema);
