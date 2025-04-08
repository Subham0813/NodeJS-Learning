const express = require("express");
const { handleNewUserSignup, handleUserLogin } = require("../controllers/user");

const router = express.Router();

router.post("/", handleNewUserSignup);
router.post('/login', handleUserLogin)

module.exports = router;
