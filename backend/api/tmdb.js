const axios = require("axios");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const tmdbPath = req.url.replace("/api/tmdb/", "").split("?")[0];
    const queryParams = { ...req.query, api_key: process.env.TMDB_API_KEY };

    const response = await axios.get(
      `https://api.themoviedb.org/3/${tmdbPath}`,
      { params: queryParams }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message, code: error.code });
  }
};