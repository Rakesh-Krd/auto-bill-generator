const User = require("../models/user");

const getCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const company = await User.findById(userId).select("-password"); // exclude password

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

const updateCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { companyAddress, companyGST } = req.body;

    console.log("Received update:", { companyAddress, companyGST });

    const updated = await User.findByIdAndUpdate(
      userId,
      { companyAddress, companyGST },
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "Company not found" });
    }

    console.log("Updated user:", updated);

    res.json(updated);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};


module.exports = {
  getCompanyProfile,
  updateCompanyProfile
};
