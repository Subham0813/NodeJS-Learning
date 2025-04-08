const express = require("express");
const { connectMongoDB } = require("./dbConnection");
const urlRoutes = require("./routes/url");
const URL = require("./models/url")

const app = express();
const PORT = 4007;

connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongoDb connected")
);

app.use(express.json())
app.use("/url", urlRoutes);

app.get('/analytics/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) return res.status(400).json({ message: "Data not found" });
  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory
  });
})

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  

  const entry = await URL.findOneAndUpdate({
    shortId
  }, {
    $push :
    {
      visitHistory : {
        timeStamp: Date.now()
      }
    }
  })
  if (!entry) return res.status(400).json({message: "Invalid short-id"})
  res.redirect(entry.redirectUrl)
})

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
