const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");
const User = require("../models/user");

async function handleCreateNewUser(req, res) {
  const { name, email, password } = req.body;

  //validate email, password

  try {
    await User.create({
      name,
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
  //validate email, password
  try {
    const signedUser = await User.findOne({
      email,
      password,
    });

    console.log("signedUser", signedUser)
    if (!signedUser)
      return res.render("login", { message: "Invalid email or password" });

    const sessionID = uuidv4();
    // setUser(sessionID, signedUser)
    // res.cookie('userid', sessionID)
    // return res.redirect("/user/main");

    const token = setUser(signedUser);
    const userid = `uid${sessionID.slice(0, 7)}`;

    return res.cookie(userid, token).render("main", {
      uid: userid,
    });
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

module.exports = {
  handleCreateNewUser,
  handleUserLogin,
};
