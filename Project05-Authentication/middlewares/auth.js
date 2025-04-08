const { getUser } = require("../service/auth");

async function restrictedToLoggedInUserOnly(req, res, next) {
  const userUuid = req.cookies.uid;
  if (!userUuid) {
    return res.redirect("/login");
  }

  const user = await getUser(userUuid);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = await getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictedToLoggedInUserOnly,
  checkAuth,
};
