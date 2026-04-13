import { useState } from "react";
import API from "../api/axios";

function CreateComplaint({ onSuccess }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!description) return alert("Enter something");

    try {
      setLoading(true);

      await API.post("/complaint", { description });

      setDescription("");
      onSuccess && onSuccess();

    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        alert("Error submitting complaint");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">
        Create Complaint
      </h3>

      <textarea
        className="w-full bg-white/10 border border-white/20 p-3 rounded-xl"
        placeholder="Describe your issue..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={submit}
        className="mt-3 bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-xl"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}

export default CreateComplaint;