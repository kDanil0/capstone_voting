import React from "react";
import VerifyOTP from "../components/VerifyOTP";

function Verify_OTP() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('src/assets/spcf_bg.jpg')" }}
    >
      <VerifyOTP />
    </div>
  );
}

export default Verify_OTP;
