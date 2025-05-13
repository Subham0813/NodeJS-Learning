import jwt from "jsonwebtoken";

const secretKey = "SecretKey";

const createToken = (user) => {
  console.log("create token user : ", user)
  try{
    const payload = {
      _id: user._id,
      email: user.email,
    };
  
    return jwt.sign(payload, secretKey);
  }catch(err){
    console.log("craeteToken : " , err)
    return null
  }
};

const validateToken = (token) => {
  const payload = jwt.verify(token, secretKey);
  if (!payload) return null;
  return payload;
};

export { createToken, validateToken };
