'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { LOCAL_URL } from "../../../../../API_URL";
export default function ServiceFeedback() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
     async function fetchOrders() {
      try {
        const res = await fetch(`${LOCAL_URL}api/orders`);
        const data = await res.json();

        if (data.orders && Array.isArray(data.orders)) {
          // Filter orders that are delivered and have feedback
          const deliveredWithFeedback = data.orders.filter(order => {
            if (order.status?.toLowerCase() !== "delivered") return false;
            const fb = order.feedback;
            if (!fb) return false;

            return fb.reason || fb.productSuggestion || fb.serviceRating || fb.qualityRating || fb.packagingRating || fb.deliveryRating || fb.totalRating;
          });

          setOrders(deliveredWithFeedback);
        } else {
          console.error("No orders found in response", data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
    },[])
  // Filtered data for search
  const filteredData = orders.filter(order =>
    (order.customer?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (order.feedback?.productSuggestion || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (order.feedback?.reason || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
      (order.customer?.email || "").toLowerCase().includes(search.toLocaleLowerCase())
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
            {filteredData.map((order, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{order.customer?.name}</td>
                <td className="px-4 py-2">{order.customer?.email || "-"}/{order.customer.phone}</td>
                <td className="px-4 py-2">{order.feedback?.productSuggestion  }</td>
                <td className="px-4 py-2">{order.reason}</td>
                <td className="px-4 py-2">{order.serviceRating}</td>
                <td className="px-4 py-2">{order.qualityRating}</td>
                <td className="px-4 py-2">{order.deliveryRating}</td>
                <td className="px-4 py-2">{order.comment}</td>
                <td className="px-4 py-2">{order.orderId}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{order.date}</td>
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
