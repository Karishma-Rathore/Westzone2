'use client'
import { useEffect, useState } from "react";
import axios from "axios";

export default function ServiceFeedback() {
  const [serviceData, setServiceData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/feedback`);
        setServiceData(res.data.data || []);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };
    fetchFeedback();
  }, []);

  // Filtered data for search
  const filteredData = serviceData.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.orderId.toString().includes(search)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Service Feedback List</h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Feedback search"
          className="border rounded px-4 py-2 w-1/3"
          value={search}
          onChange={e => setSearch(e.target.value)}
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
              <th className="px-4 py-2">Quality Rating</th>
              <th className="px-4 py-2">Delivery Rating</th>
              <th className="px-4 py-2">Comment</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.email}/{item.phone}</td>
                <td className="px-4 py-2">{item.suggestion}</td>
                <td className="px-4 py-2">{item.reason}</td>
                <td className="px-4 py-2">{item.serviceRating}</td>
                <td className="px-4 py-2">{item.qualityRating}</td>
                <td className="px-4 py-2">{item.deliveryRating}</td>
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
