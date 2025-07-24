const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Storage config for multer
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('billPdf'), async (req, res) => {
  const { email } = req.body;
  const file = req.file;

  if (!email || !file) {
    return res.status(400).json({ message: 'Email and PDF file required' });
  }

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send mail
  const mailOptions = {
    from: `"Auto Bill Generator" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Bill PDF',
    text: 'Here is your bill.',
    attachments: [
      {
        filename: 'bill.pdf',
        path: file.path,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);

    // Remove file after sending
    fs.unlinkSync(file.path);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email sending failed' });
  }
});

module.exports = router;
