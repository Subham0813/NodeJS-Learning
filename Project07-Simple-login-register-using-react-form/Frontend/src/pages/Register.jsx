import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("/register", {
        name,
        email,
        password,
      });
      setSuccessMsg("Registration successful!");
      console.log("res data : ", res.data);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || "Registration failed");
      console.log(
        "reg. error : ",
        error.response?.data?.msg,
        error.response?.data?.code
      );
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <label htmlFor="name">Your Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
      <GoogleAuthButton />
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
    </form>
  );
};

export default Register;
