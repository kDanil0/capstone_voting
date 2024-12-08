import React, { useState, useEffect } from "react";
import { verifyUser } from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../utils/AuthContext";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useAuthContext();
  const [formData, setFormData] = useState({
    code: "",
    email: location.state?.email || "",
    student_id: location.state?.student_id || "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    // Redirect if no email is provided
    if (!location.state?.email) {
      navigate("/login");
      return;
    }

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.state?.email, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleChange = (e) => {
    const value = e.target.value.slice(0, 6);
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await verifyUser(formData);
      console.log("Verification response:", response); // Debug log
      if (response.success) {
        setSuccessMessage("Verification successful!");
        // Store the token in localStorage
        localStorage.setItem("token", response.access_token);
        // Update the AuthContext
        setToken(response.access_token);
        console.log("Token set in context:", response.access_token); // Debug log
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-2xl">
      {/* Logo Section - Matching LoginForm */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-climate tracking-widest font-bold text-[#3F51B5]">
          SPCF
        </h2>
        <h5 className="text-md font-bebas tracking-widest font-bold text-[#3F51B5]">
          ELECTORAL SYSTEM
        </h5>
        <h2 className="text-3xl font-bebas mt-4 font-bold text-[#3F51B5]">
          Verify OTP
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
          {successMessage}
        </div>
      )}

      <div className="mb-4 text-center">
        <p className="text-gray-700">
          Please enter the verification code sent to
        </p>
        <p className="font-medium text-[#3F51B5]">{formData.email}</p>
      </div>

      <div className="mb-4 text-center">
        <p className="text-sm text-gray-500">
          Time remaining:{" "}
          <span className="font-medium text-[#3F51B5]">
            {formatTime(timeLeft)}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="code"
          >
            Verification Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#F5F5F5] border border-gray-200
                     focus:border-[#3F51B5] focus:ring-1 focus:ring-[#3F51B5] outline-none
                     transition-all text-center text-2xl tracking-widest"
            placeholder="Enter 6-character code"
            required
            maxLength="6"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || timeLeft === 0 || formData.code.length !== 6}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white
                     ${
                       isLoading || timeLeft === 0 || formData.code.length !== 6
                         ? "bg-gray-400 cursor-not-allowed"
                         : "bg-[#3F51B5] hover:bg-[#4B5FCD] transition-colors"
                     }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying...
            </span>
          ) : (
            "Verify Code"
          )}
        </button>
      </form>

      {timeLeft === 0 && (
        <div className="mt-6 text-center">
          <p className="text-red-600 text-sm">Code expired</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-2 text-[#3F51B5] hover:text-[#4B5FCD]"
          >
            Request new code
          </button>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/login")}
          className="text-[#3F51B5] hover:text-[#4B5FCD]"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
