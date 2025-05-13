import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      setSuccessMsg("Login successful!");
      console.log("res data : ", res.data);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || "Login failed");
      console.log(
        "reg. error : ",
        error.response?.data?.msg,
        error.response?.data?.code
      );
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
      <GoogleAuthButton />
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
    </form>
  );
};

export default Login;
