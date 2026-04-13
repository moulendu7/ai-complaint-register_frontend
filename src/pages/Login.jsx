import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const url = role === "admin" ? "/admin/login" : "/user/login";

      const res = await API.post(url, { email, password });

      const userRole = res.data?.user?.role;

      if (!userRole) throw new Error();

      localStorage.setItem("role", userRole);

      navigate(userRole === "admin" ? "/admin" : "/user");

    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="backdrop-blur-lg bg-white/10 p-10 rounded-3xl border border-white/20 w-full max-w-md text-white">
        <h2 className="text-4xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="flex bg-white/10 border border-white/20 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`w-1/2 py-2 rounded-lg transition ${
                role === "student" ? "bg-white text-black" : "text-white"
              }`}
            >
              User
            </button>

            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`w-1/2 py-2 rounded-lg transition ${
                role === "admin" ? "bg-white text-black" : "text-white"
              }`}
            >
              Admin
            </button>
          </div>

          <input
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-2 rounded-xl">
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;