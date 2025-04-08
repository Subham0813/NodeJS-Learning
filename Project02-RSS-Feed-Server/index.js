import express from "express";
import RSSParser from "rss-parser";
import cors from "cors"; //Middlewares

const feedURL = "https://techcrunch.com/feed/";

const parser = new RSSParser();
const app = express();
const PORT = 4005;
app.use(cors());

const parseFeed = async url => {
  try {
    const feed = await parser.parseURL(url);
    const items = feed.items.map(item => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    isoDate: item.isoDate
  }));
  console.log(typeof items)
  return items;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    return [];
  }
};

app.get("/", async (req, res) => {
  try {
    const processedData = await parseFeed(feedURL);
    res.json(processedData);
  } catch (err) {
    console.error("error fetching RSS feed :", err);
    res.status(500).send("Failed to load feed");
  }
});

const server = app.listen(
  PORT,
  console.log(`server started..
visit http://localhost:4005/`)
);

export default server;
