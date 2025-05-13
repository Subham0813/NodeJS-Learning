import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const handleLoginClick = () => {
    setIsOpenLogin(!isOpenLogin);
    setIsOpenRegister(!isOpenRegister);

    if (!isOpenLogin) {
      navigate("/login");
    } else navigate("/");
  };
  const handleRegisterClick = () => {
    setIsOpenRegister(!isOpenRegister);
    setIsOpenLogin(!isOpenLogin);
    if (!isOpenRegister) {
      navigate("/register");
    } else navigate("/");
  };

  return (
    <div className="nav">
      <button type="button" onClick={handleLoginClick}>
        Login
      </button>
      <button type="button" onClick={handleRegisterClick}>
        Register
      </button>
    </div>
  );
};

export default Nav;
