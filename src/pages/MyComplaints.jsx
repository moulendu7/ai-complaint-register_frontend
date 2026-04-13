import { useEffect, useState } from "react";
import API from "../api/axios";

function MyComplaints() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/complaint/my").then((res) => setData(res.data.data));
  }, []);

  return (
    <div>
      <h3 className="mb-3">My Complaints</h3>

      {data.map((c) => (
        <div
          key={c._id}
          className="bg-white/10 border border-white/20 p-3 rounded mb-2"
        >
          <p>{c.description}</p>
          <p>{c.category}</p>
          <p>{c.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyComplaints;
