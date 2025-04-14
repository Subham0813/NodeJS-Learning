const Blog = require("../models/blog");
const { Router } = require("express");
const { handleSignIn, handleSignUp } = require("../controllers/user");
const { checkForAuthCookie } = require("../middleware/auth");
const { handleGetBlog } = require("../controllers/blog");

const router = Router();

router.get("/", async (req, res) => {

  const allBlogs = await Blog.find({})

  return res.render("home", {
    blogs: allBlogs,
  });
});

router.get('/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findOne({ _id: blogId }).populate("createdBy");
  console.log(blog);
  return res.render("viewBlog", {
    blog: blog,
  });
})

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);

module.exports = router;
