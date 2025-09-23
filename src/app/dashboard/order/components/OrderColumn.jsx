import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineFilePdf } from "react-icons/ai";
import { LOCAL_URL } from "../../../../../API_URL";

export const OrderColumn = ({ title, backgroundColor }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get( `${LOCAL_URL}api/orders`);
        setOrders(response.data.orders || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filtered = orders.filter((item) => {
    const id = item._id?.toString() || "";
    const name = item.customer?.name || "";
    const address = item.customer?.address || "";
    return (
      id.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase()) ||
      address.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) return <p className="text-gray-500">Loading orders...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="w-full md:flex-1 min-w-[300px]">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-3xl mb-2 text-gray-500">{title}</h2>
        {title === "Delivered Order List" && (
          <button className="flex items-center gap-1 py-2 px-4 bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all">
            <AiOutlineFilePdf />
            <span>Print Delivered Order</span>
          </button>
        )}
      </div>

      <div className="bg-white shadow-xl p-5">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <div className="max-h-[400px] mx-auto overflow-y-auto overflow-x-auto">
          <table className="w-full min-w-[600px] h-full border-collapse text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="text-left text-md" style={{ backgroundColor }}>
                <th className="px-2 py-4">Order Id</th>
                <th className="px-2 py-4">Name</th>
                <th className="px-2 py-4">Address</th>
                <th className="px-2 py-4">Time</th>
                <th className="px-2 py-4">Total</th>
              </tr>
            </thead>
           <tbody>
  {filtered.map((order) =>
    order.items.map((item) => (
      <tr key={order._id + item.productId}>
        <td className="p-2 font-mono">{order._id}</td>
        <td className="p-2">{order.customer?.name || "-"}</td>
        <td className="p-2">{order.customer?.address || "-"}</td>
        <td className="p-2">{item.productName}</td>
        <td className="p-2 font-semibold">{item.price * item.qty}</td>
      </tr>
    ))
  )}
</tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-gray-500 text-center py-2">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};
