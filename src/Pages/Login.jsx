import React from "react";
import LoginForm from "../Components/LoginForm";

function Login() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-95"
        style={{ backgroundImage: "url('src/assets/spcf_bg.jpg')" }}
      />
      {/* Content */}
      <div className="relative flex items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
