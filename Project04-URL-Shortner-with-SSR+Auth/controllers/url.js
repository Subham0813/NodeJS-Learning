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
      visitHistory: [],
      createdBy: req.user._id,
    });

    // res.status(201).json({
    //   message: "ShortURL Created",
    //   id: shortID
    // });
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render("main", {
      id: shortID,
      urls: allUrls,
    });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
}

async function handleUpdateShortURL(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  if (!entry) return res.status(400).json({ message: "Invalid short-id" });
  res.redirect(entry.redirectUrl);
}

async function handleGetAnalyticsShortURL(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) return res.status(400).json({ message: "Data not found" });
  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleDeleteShortURL(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOneAndDelete({ shortId });
  if (!result) return res.status(400).json({ message: "Data not found" });
  return res.status(200).json({
    message: "URL deleted",
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleUpdateShortURL,
  handleGetAnalyticsShortURL,
  handleDeleteShortURL,
};
