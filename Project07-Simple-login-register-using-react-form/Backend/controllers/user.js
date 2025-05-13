import { createToken } from "../services/auth.js";
import USER from "../models/user.js";
import { createHmac, randomBytes } from "node:crypto";

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await USER.findOne({ email: email });
    if (!user)
      return new error({ success: false, msg: "Invalid Email Address" });
    console.log("user : ", user);
    const salt = user.salt;
    const userPassword = user.password;
    console.log("salt, userPass", salt, userPassword);
    const currentHashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    console.log("currntHashedPAss : ", currentHashedPassword);
    if (currentHashedPassword !== userPassword)
      return new error({ success: false, msg: "Invalid Credentials" });

    const token = createToken(user);
    console.log("Token : ", token);
    return res
      .status(200)
      .cookie("token", token)
      .send({ success: true, msg: "User logged-in successfully" });
  } catch (err) {
    console.log("error at login : ", err);
    return res.status(500).send({ success: false, msg: "Server error" });
  }
};

const handleRegister = async (req, res) => {
  console.log("req.body : ", req.body);

  const { name, email, password } = req.body;
  try {
    const user = await USER.create({
      name,
      email,
      password,
    });
    console.log("user created : ", user);
    res.status(201).send({ success: true, msg: "User created successfully" });
  } catch (err) {
    console.log("error at register : ", err);
    return res
      .status(500)
      .send({ success: false, msg: "Server error", code: err.code });
  }
};

export { handleLogin, handleRegister };
