import React from "react";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('src/assets/spcf_bg.jpg')" }}
    >
      <LoginForm />
    </div>
  );
}

export default Login;
