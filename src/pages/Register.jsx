import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user/register", {
        name,
        email,
        password,
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white opacity-20 rounded-full blur-3xl"></div>

      <div className="backdrop-blur-lg bg-white/10 p-10 rounded-3xl border border-white/20 w-full max-w-md text-white shadow-xl">

        <h2 className="text-4xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-white/70 mb-6 text-sm">
          Register as a student to submit complaints
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:outline-none"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:outline-none"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl font-semibold hover:scale-[1.02] transition">
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-white/80 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer hover:text-white"
          >
            Login
          </span>
        </div>

        <p className="text-center text-white/50 text-xs mt-4">
          Admin accounts are managed by the system
        </p>

      </div>
    </div>
  );
};

export default Register;