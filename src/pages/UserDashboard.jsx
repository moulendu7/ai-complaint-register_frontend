import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import CreateComplaint from "./CreateComplaint";

function UserDashboard() {
  const [data, setData] = useState([]);

  const fetch = () => {
    API.get("/complaint/my").then((res) =>
      setData(res.data.data)
    );
  };

  useEffect(() => {
    fetch();
  }, []);

  const total = data.length;
  const resolved = data.filter((c) => c.status === "Resolved").length;
  const pending = total - resolved;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6">

      <Navbar />

      <div className="mt-6 mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-white/70">
          Track and manage your complaints
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Stat title="Total" value={total} />
        <Stat title="Resolved" value={resolved} />
        <Stat title="Pending" value={pending} />
      </div>

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-5 rounded-2xl mb-6">
        <CreateComplaint onSuccess={fetch} />
      </div>

      <div>
        <h3 className="text-xl mb-3">My Complaints</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {data.map((c) => (
            <div
              key={c._id}
              className="backdrop-blur-lg bg-white/10 border border-white/20 p-4 rounded-2xl hover:scale-[1.02] transition"
            >
              <p className="font-semibold mb-2">
                {c.description}
              </p>
              <p className="text-sm text-white/70">
                Category: {c.category}
              </p>

              <p className="text-xs text-white/50 mt-1">
                AI Confidence: {(c.aiConfidence * 100).toFixed(0)}%
              </p>

              <div className="w-full bg-white/20 h-2 rounded mt-2">
                <div
                  className="bg-purple-400 h-2 rounded"
                  style={{ width: `${c.aiConfidence * 100}%` }}
                ></div>
              </div>

              <span
                className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${
                  c.status === "Resolved"
                    ? "bg-green-400 text-black"
                    : "bg-yellow-300 text-black"
                }`}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>

        {data.length === 0 && (
          <p className="text-white/70 mt-6 text-center">
            No complaints yet
          </p>
        )}
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-4 rounded-2xl text-center">
      <p className="text-sm text-white/70">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

export default UserDashboard;