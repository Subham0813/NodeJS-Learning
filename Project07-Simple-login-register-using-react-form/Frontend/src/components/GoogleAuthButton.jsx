const GoogleAuthButton = () => {
  return (
    <button
    type="button"
      onClick={() => {
        window.location.href = "http://localhost:3000/api/auth/google";
      }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        style={{ width: 15, paddingRight: 4 }}
        alt="Google logo"
      />
      <span>Google</span>
    </button>
  );
};

export default GoogleAuthButton;
