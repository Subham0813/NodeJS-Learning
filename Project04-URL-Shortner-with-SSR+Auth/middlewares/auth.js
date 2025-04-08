const { getUser } = require("../services/auth");

async function restrictedToLoggedInUserOnly(req, res, next) {
  const userid = req.cookies.userid;
  if (!userid) return res.redirect("/login");

  const user = await getUser(userid);
  if (!user) return res.redirect("/login");

  req.user = user;
  
  next();
}

async function checkAuth(req, res, next) {
  const sessionToken = req.cookies?.userid;

  if (!sessionToken) {
    return res.redirect("/login");
  }

  const user = await getUser(sessionToken);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

module.exports = {
  restrictedToLoggedInUserOnly,
  checkAuth,
};
