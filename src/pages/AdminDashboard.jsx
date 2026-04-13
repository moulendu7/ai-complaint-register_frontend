import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetch = () => {
    API.get("/complaint/all").then((res) =>
      setData(res.data.data)
    );
  };

  useEffect(() => {
    fetch();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/complaint/${id}`, { status });
    fetch();
  };

  const filteredData = data.filter((c) => {
    const matchesSearch = c.description
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || c.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6">

      <Navbar />

      <h2 className="text-2xl font-bold mt-6 mb-4">
        Admin Dashboard
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white/10 border border-white/20 px-4 py-2 rounded-xl"
        />

        <div className="flex bg-white/10 border border-white/20 rounded-xl p-1">
          {["All", "Pending", "Resolved"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-lg ${
                filter === f ? "bg-white text-black" : "text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filteredData.map((c) => (
          <div
            key={c._id}
            className="backdrop-blur-lg bg-white/10 border border-white/20 p-5 rounded-2xl hover:scale-[1.02] transition"
          >
            <p className="text-lg font-semibold mb-2">
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
                className="bg-green-400 h-2 rounded"
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

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateStatus(c._id, "Resolved")}
                className="flex-1 bg-green-400 text-black py-1 rounded"
              >
                Resolve
              </button>

              <button
                onClick={() => updateStatus(c._id, "Pending")}
                className="flex-1 bg-white/20 border border-white/30 py-1 rounded"
              >
                Pending
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <p className="text-center mt-10 text-white/70">
          No complaints found
        </p>
      )}
    </div>
  );
}

export default AdminDashboard;