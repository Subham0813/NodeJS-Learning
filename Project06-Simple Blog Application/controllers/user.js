const User = require("../models/user");
const { createHmac } = require("crypto");
const { createTokenForUser } = require("../services/auth");

async function handleSignUp(req, res) {
  const { fullname, email, password } = req.body;

  try {
    await User.create({
      fullname,
      email,
      password,
    });
    return res.redirect("/signin");
  } catch (err) {
    console.log(err)
    return res.status(500).render('signup',{ error: err });
  }
}
async function handleSignIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user)
      return res.render("signin", {
        error: "Incorrect email, User not found..",
      });

    const salt = user.salt;
    const hashedPassword = user.password;

    const currentHashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== currentHashedPassword)
      return res.render("signin", { error: "Incorrect password.." });

    // res.json({ user: user });

    const token = createTokenForUser(user);
    return res.cookie("token", token).redirect("/");
  } catch (e) {
    console.log(e)
    return res.render("signin", {
      error: "Incorrect Email or Password..",
    });
  }
}



module.exports = {
  handleSignUp,
  handleSignIn,
  
};
