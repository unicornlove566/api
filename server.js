// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = 3001;

// Middleware to parse JSON requests
app.use(cors());

app.use(bodyParser.json());

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this to any SMTP service you are using
  auth: {
    user: "recruitmentupdate9@gmail.com", // Replace with your email
    pass: "mnvn eoyd saqs xgor", // Replace with your email password or app-specific password
  },
});

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  // Write some text to the response
  res.end("Welcome to my simple API");
});

// Email sending route
app.post("/send-email", (req, res) => {
  const { subject, message } = req.body;

  // Validate request body
  if (!subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const mailOptions = {
    from: "recruitmentupdate9@gmail.com", // Sender email
    to: "recruitmentupdate9@gmail.com", // Use `to` to define the recipient
    subject: subject, // Subject of the email
    text: message, // Email body content
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: "Email sent successfully", info });
  });

  // Set the response header
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
