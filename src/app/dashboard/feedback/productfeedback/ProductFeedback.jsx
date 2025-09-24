'use client';
import { useEffect, useState } from "react";
import { LOCAL_URL } from "../../../../../API_URL";

export default function OrderFeedback() {
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
  }, []);


  const filteredData = orders.filter(item =>
    (item.customer?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (item.feedback?.productSuggestion || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (item.feedback?.reason || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <p className="p-4 text-gray-600">Loading orders...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Feedback</h1>

      <div className="flex flex-col md:flex-row justify-between mb-4 items-start md:items-center gap-4">
        <input
          type="text"
          placeholder="Search feedback..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-blue-100 text-blue-800 uppercase text-xs sticky top-0">
            <tr>
              <th className="px-4 py-3 text-gray-1000 text-base">Customer</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Reason</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Suggestion</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Service</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Quality</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Packaging</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Delivery</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Total</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Status</th>
              <th className="px-4 py-3 text-gray-1000 text-base ">Submitted At</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">

            {filteredData.map((order, idx) => (
              <tr key={idx} className="border-b hover:bg-blue-50 transition">
                <td className="px-4 py-2 font-medium">{order.customer?.name}</td>
                <td className="px-4 py-2">{order.feedback?.reason}</td>
                <td className="px-4 py-2">{order.feedback?.productSuggestion}</td>
                <td className="px-4 py-2">{order.feedback?.serviceRating}</td>
                <td className="px-4 py-2">{order.feedback?.qualityRating}</td>
                <td className="px-4 py-2">{order.feedback?.packagingRating}</td>
                <td className="px-4 py-2">{order.feedback?.deliveryRating}</td>
                <td className="px-4 py-2">{order.feedback?.totalRating}</td>
                <td className={`px-4 py-2 font-semibold ${order.status === 'delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </td>
                <td className="px-4 py-2">{new Date(order.feedback?.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Showing {filteredData.length} {filteredData.length === 1 ? "entry" : "entries"}
      </p>
    </div>
  );
}
