// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "sa2$43jkb%cs$js";

function setUser(user) {
  // sessionIdToUserMap.set(id, user);
  const payload = {
    _id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, secret);
}

function getUser(token) {
  // return sessionIdToUserMap.get(id);
  if (!token) return;
  return jwt.verify(token, secret);
}

module.exports = {
  setUser,
  getUser,
};
