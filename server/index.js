

const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

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
  const folder = req.query.folderName;
  console.log(`📷 Fetching images from Cloudinary folder: ${folder}...`);

  try {
    if(!folder) {
      throw new Error('specify folder name')
    }
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload`;

    const response = await axios.get(url, {
      auth: { username: API_KEY, password: API_SECRET },
      params: {
        prefix: `${folder}/`,
        type: 'upload',
        max_results: 100,
      }
    });

    const images = response.data.resources.map((img) => img.secure_url);
    res.json(images);
  } catch (error) {
    console.error("❌ Error fetching images:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch images", details: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
