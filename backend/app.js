const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const TMDB_BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

app.get("/api/tmdb/*path", async (req, res) => {
  try {
    const tmdbPath = req.params.path.join("/");
    const queryParams = { ...req.query, api_key: API_KEY };

    const response = await axios.get(`${TMDB_BASE}/${tmdbPath}`, {
      params: queryParams,
    });

    res.json(response.data);
  } catch (error) {
    console.log("Full error:", error.code, error.message, error.response?.status);
    res.status(500).json({
      error: error.message,
      code: error.code
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));