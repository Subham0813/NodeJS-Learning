// const sessionIdToUsermap = new Map();
const jwt = require("jsonwebtoken");
const secretKey = "$upramna$";

function setUser(user) {
  // sessionIdToUsermap.set(id, user);
  // console.log("map", sessionIdToUsermap);
  // return;

  const payload = {
    _id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "30m" });
}
function getUser(token) {
  // return sessionIdToUsermap.get(id);
  if (!token) return null;
  return jwt.verify(token, secretKey);
}

module.exports = {
  setUser,
  getUser,
};
