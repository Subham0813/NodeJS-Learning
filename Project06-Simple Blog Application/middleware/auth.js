const{validateToken} = require('../services/auth')

function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return res.render("signup");

    const userPayload = validateToken(token);
    if (!userPayload) return res.render("signup");

    req.user = userPayload
    next()

  };
}

function checkForExistingUser(req, res, next) {
  
}

module.exports={
    checkForAuthCookie
}
