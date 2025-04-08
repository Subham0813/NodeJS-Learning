const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser, getUser } = require("../service/auth");

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
    const loggedUser = await User.findOne({
      email,
      password,
    });

    if (!loggedUser)
      return res.render("login", { message: "Invalid email or password" });

    // let token = req.cookies?.uid;
    // console.log("cookies", req.cookies);
    // let existUser = {};
    // if (!token) {
    //   token = setUser(loggedUser);
    //   return res.cookie("uid", token).redirect("/");
    // }
    // else {
    //   existUser = await getUser(token);
    //   if (
    //     existUser &&
    //     existUser.email !== loggedUser.email &&
    //     existUser.password !== loggedUser.password
    //   ){

    //   }
    //   else{
    //     return res.redirect("/");
    //   }
    const token = setUser(loggedUser);
    return res.cookie("uid", token).redirect("/");
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

module.exports = {
  handleNewUserSignup,
  handleUserLogin,
};
