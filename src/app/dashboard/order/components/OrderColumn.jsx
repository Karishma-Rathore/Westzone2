'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineFilePdf } from "react-icons/ai";
import toast from "react-hot-toast";
import { LOCAL_URL } from "../../../../../API_URL";

export const OrderColumn = ({ title, backgroundColor }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ Selected order for modal

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/orders`); // backend API
        setOrders(res.data.orders || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filtered = orders.filter((order) => {
    const id = order._id?.toString() || "";
    const name = order.customer?.name || "";
    const address = order.customer?.address || "";
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
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-3xl text-gray-500">{title}</h2>
        {title === "Delivered Order List" && (
          <button className="flex items-center gap-1 py-2 px-4 bg-gray-200 hover:bg-gray-300">
            <AiOutlineFilePdf />
            Print Delivered Order
          </button>
        )}
      </div>

      <div className="bg-white shadow-xl p-5 rounded-lg">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="max-h-[400px] overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0" style={{ backgroundColor }}>
              <tr>
                <th className="px-2 py-2">Order Id</th>
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2">Address</th>
                <th className="px-2 py-2">Time</th>
                <th className="px-2 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) =>
                order.items.map((item) => (
                  <tr
                    key={order._id + item.productId}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="p-2 font-mono">{order._id}</td>
                    <td className="p-2">{order.customer?.name || "-"}</td>
                    <td className="p-2">{order.customer?.address || "-"}</td>
                    <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="p-2 font-semibold">{item.price * item.qty}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-gray-500 text-center py-2">No orders found</p>
          )}
        </div>
      </div>

      {/* ✅ Modal */}
      {selectedOrder && (
        <OrderFormModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

// -------------------- Modal Component --------------------
function OrderFormModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Order Details: {order._id}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">✖</button>
        </div>

        {/* Customer */}
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Customer Info</h4>
          <p><strong>Name:</strong> {order.customer?.name}</p>
          <p><strong>Phone:</strong> {order.customer?.phone}</p>
          <p><strong>Address:</strong> {order.customer?.address}</p>
        </div>

        {/* Items */}
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Items</h4>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1">Product</th>
                <th className="border px-2 py-1">Qty</th>
                <th className="border px-2 py-1">Price</th>
                <th className="border px-2 py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.productId}>
                  <td className="border px-2 py-1">{item.productName}</td>
                  <td className="border px-2 py-1">{item.qty}</td>
                  <td className="border px-2 py-1">{item.price}</td>
                  <td className="border px-2 py-1">{item.qty * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delivery */}
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Delivery Info</h4>
          <p><strong>Zone Id:</strong> {order.delivery?.zoneId || "-"}</p>
          <p><strong>Fee:</strong> {order.delivery?.fee}</p>
          <p><strong>ETA:</strong> {order.delivery?.etaMinutes} mins</p>
        </div>

        {/* Payment */}
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Payment</h4>
          <p><strong>Method:</strong> {order.payment?.method}</p>
          <p><strong>Paid:</strong> {order.payment?.paid ? "Yes" : "No"}</p>
        </div>

        {/* Status */}
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Status</h4>
          <p>{order.status}</p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
