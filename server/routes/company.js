const express = require("express");
const router = express.Router();
const { getCompanyProfile,updateCompanyProfile } = require("../controllers/companyController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/profile", protect, getCompanyProfile);
router.patch("/profile", protect,updateCompanyProfile);
module.exports = router;
