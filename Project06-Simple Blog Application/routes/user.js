const Blog = require("../models/blog");
const { Router } = require("express");
const { handleSignIn, handleSignUp } = require("../controllers/user");
const { checkForAuthCookie } = require("../middleware/auth");

const router = Router();

router.get("/", checkForAuthCookie("token"), async(req, res) => {

  const allBlogs = await Blog.find({})

  return res.render("home", {
    blogs: allBlogs,
    user: req.user,
  });
});


router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);

module.exports = router;
