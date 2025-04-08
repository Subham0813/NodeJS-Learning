const Blog = require("../models/blog");

async function handleAddingNewBlog(req, res) {
  const { title, body } = req.body;
  if (!title)
    return res.render("newBlog", {
      error: "There should be a title..",
    });
  if (!body)
    return res.render("newBlog", {
      error: "There should be some content..",
    });

  const blog = await Blog.create({
    title,
    body,
    coverImageURL: `/uploads/${req.user._id}/${req.file.filename}`,
    createdBy: req.user._id,
  });

  return res.redirect(`/user/blog/${blog._id}`);
}
module.exports = {
  handleAddingNewBlog,
};
