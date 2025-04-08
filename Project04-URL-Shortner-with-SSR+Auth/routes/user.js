const express = require("express");
const { handleCreateNewUser, handleUserLogin } = require("../controllers/user");
const{checkAuth} = require('../middlewares/auth')
const URL = require("../models/url");

const router = express.Router();

router.get("/main", checkAuth, async (req, res) => {
  if(!req.user) return res.redirect('/login')
  const allUrls = await URL.find({createdBy: req.user._id});
  res.render("main", {
    urls: allUrls,
  });
});
router.post("/signup", handleCreateNewUser);
router.post("/login", handleUserLogin);

module.exports = router;
