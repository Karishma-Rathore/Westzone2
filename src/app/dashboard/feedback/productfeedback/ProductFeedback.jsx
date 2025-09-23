'use client'
import { useEffect, useState } from "react";
import { LOCAL_URL } from "../../../../../API_URL";

export default function ProductFeedback() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const res = await fetch(`${LOCAL_URL}api/feedback`); // API endpoint
        const data = await res.json();
        if (data.success) {
          setProductData(data.data);
        } else {
          console.error("Failed to fetch feedback");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedback();
  }, []);

  // Search filter
  const filteredData = productData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.suggestion.toLowerCase().includes(search.toLowerCase()) ||
    item.comment.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="p-4">Loading feedback...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Product Feedback List</h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Feedback search"
          className="border rounded px-4 py-2 w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full table-auto text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase border-b">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email/Phone</th>
              <th className="px-4 py-2">Suggestion</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Service Rating</th>
              <th className="px-4 py-2">Packaging Rating</th>
              <th className="px-4 py-2">Quality Rating</th>
              <th className="px-4 py-2">Comment</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.name} {item.surname || ""}</td>
                <td className="px-4 py-2">{item.emailPhone}</td>
                <td className="px-4 py-2">{item.suggestion}</td>
                <td className="px-4 py-2">{item.reason}</td>
                <td className="px-4 py-2">{item.serviceRating}</td>
                <td className="px-4 py-2">{item.packingRating}</td>
                <td className="px-4 py-2">{item.qualityRating}</td>
                <td className="px-4 py-2">{item.comment}</td>
                <td className="px-4 py-2">{item.orderId}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Showing {filteredData.length} entries
      </p>
    </div>
  );
}
