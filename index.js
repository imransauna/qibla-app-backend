const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
require("./supertokens-config");

const app = express();

// SuperTokens middleware
app.use(middleware());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Max 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/zip" || file.mimetype === "application/x-zip-compressed") {
      cb(null, true);
    } else {
      cb(new Error("Only ZIP files are allowed"));
    }
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Qibla App Backend is running! By Girijesh",
    timestamp: new Date().toISOString()
  });
});

// Basic API endpoint for testing
app.get("/api/qibla", (req, res) => {
  res.json({ 
    message: "Qibla direction endpoint - to be implemented by developer" 
  });
});

// POST API to upload ZIP file with email parameter
app.post("/api/upload-zip", upload.single("file"), (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ error: "Email parameter is required" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "ZIP file is required" });
  }

  // You can process the file here (e.g., save info to DB, send email, etc.)
  res.json({
    message: "File uploaded successfully",
    email: email,
    fileName: req.file.filename,
    filePath: req.file.path
  });
});

app.use(errorHandler());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Qibla App API listening on port ${PORT}`);
});
