import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await API.post("/user/logout"); 
    } catch (err) {
      console.log("Logout error (safe ignore)");
    } finally {
      localStorage.removeItem("role");
      window.location.replace("/login"); 
    }
  };

  return (
    <div className="flex justify-between items-center backdrop-blur-lg bg-white/10 border border-white/20 px-6 py-3 rounded-xl">
      <h1 className="text-white font-semibold">AI Complaint</h1>

      <button
        onClick={logout}
        className="bg-white text-black px-3 py-1 rounded hover:scale-95 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;