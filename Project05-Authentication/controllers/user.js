const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleNewUserSignup(req, res) {
  const { firstname, lastname, email, password } = req.body;

  //validate email , password etc

  try {
    await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    return res.redirect("/login");
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  //validate email , password etc

  try {
    const user = await User.findOne({
      email,
      password,
    });

    if (!user)
      return res.render("login", { message: "Invalid email or password" });

    const sessiodId = uuidv4();

    setUser(sessiodId, user);

    res.cookie("uid", sessiodId);
    return res.redirect("/");
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

module.exports = {
  handleNewUserSignup,
  handleUserLogin,
};
