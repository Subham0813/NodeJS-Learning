const ShortUniqueId = require("short-unique-id");
const { randomUUID } = new ShortUniqueId({ length: 10 });

const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = randomUUID();
  try {
    await URL.create({
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory: []
    });

    res.status(201).json({
      message: "ShortURL Created",
      id: shortID
    });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  
};
