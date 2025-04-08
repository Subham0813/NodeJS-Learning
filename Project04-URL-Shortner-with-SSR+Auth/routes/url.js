const express = require("express");
const {
  handleGenerateNewShortURL,
  handleUpdateShortURL,
  handleGetAnalyticsShortURL,
  handleDeleteShortURL
} = require("../controllers/url");
const router = express.Router();


router.post("/", handleGenerateNewShortURL);
router.post("/:shortId", handleDeleteShortURL);
router.get("/:shortId", handleUpdateShortURL);
router.get("/analytics/:shortId", handleGetAnalyticsShortURL);

module.exports = router;
