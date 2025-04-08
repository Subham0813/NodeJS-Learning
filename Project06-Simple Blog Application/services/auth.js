const jwt = require("jsonwebtoken");

const secretKey = "$Y0urbr0wn5uga$";

const createTokenForUser = (user) => {

  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

const validateToken = (token) => {
  const payload = jwt.verify(token, secretKey);
  return payload;
};

module.exports = {
  createTokenForUser,
  validateToken,
};
