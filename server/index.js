

const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  // Cloud name from your Cloudinary account
  api_key: process.env.API_KEY,        // API key from your Cloudinary account
  api_secret: process.env.API_SECRET   // API secret from your Cloudinary account
});

console.log("📡 Required modules loaded.");

const app = express();
app.use(cors());

const PORT = 3000;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error("❌ Missing Cloudinary credentials. Check .env file.");
  process.exit(1); // Stop execution if env variables are missing
}

console.log(`✅ Using Cloudinary account: ${CLOUD_NAME}`);
console.log(`✅ Using Cloudinary account: ${API_SECRET}`);

app.get("/api/images", async (req, res) => {
  const folder = req.query.folder;
  console.log(`📷 Fetching images from Cloudinary folder: ${folder}...`);

  if (!folder) {
    // ❌ Don't throw here; just respond once
    return res.status(400).json({ error: 'Folder name is required' });
  }

  try {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload`;

    const response = await axios.get(url, {
      auth: { username: API_KEY, password: API_SECRET },
      params: {
        prefix: `${folder}/`,
        type: 'upload',
        max_results: 100,
      }
    });

    const images = response.data.resources.map((img) => ({
      url: img.secure_url,
      public_id: img.public_id
    }));

    res.json(images); // ✅ Only response here
  } catch (error) {
    console.error("❌ Error fetching images:", error.response?.data || error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to fetch images", details: error.message });
    }
  }
});


app.delete("/api/delete", async (req, res) => {
  const public_id = req.query.public_id;

  if (!public_id) {
    return res.status(400).json({ error: "Missing public_id" });
  }

  try {
    // Generate a signature for security
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { public_id, timestamp },
      process.env.API_SECRET
    );

    // Call Cloudinary to delete the image
    const result = await cloudinary.uploader.destroy(public_id, {
      invalidate: true,  // Optionally invalidate the cache
    });

    if (result.result === "ok") {
      res.json({ message: "Image deleted successfully", result });
    } else {
      res.status(500).json({ error: "Image deletion failed", result });
    }
  } catch (error) {
    console.error("❌ Error deleting image:", error.message);
    res.status(500).json({ error: "Failed to delete image", details: error.message });
  }
});





app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
