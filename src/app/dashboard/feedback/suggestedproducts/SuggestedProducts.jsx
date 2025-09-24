'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LOCAL_URL } from '../../../../../API_URL';

export default function SuggestedProducts() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/orders`);
        const data = res.data;

        if (data.orders && Array.isArray(data.orders)) {
          // Only keep orders with feedback
          const ordersWithFeedback = data.orders.filter(
            (order) => order.feedback && Object.keys(order.feedback).length > 0
          );
          setOrders(ordersWithFeedback);
        } else {
          console.error('No orders found in response', data);
          toast.error('No orders found with feedback');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching orders with feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders by search
  const filteredOrders = orders.filter(order =>
    (order.customer?.name || '')
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (order.feedback?.productSuggestion || '')
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (order.items?.some(item => item.productName.toLowerCase().includes(search.toLowerCase())))
  );

  if (loading) return <p className="p-4 text-gray-600">Loading orders...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Suggested Products</h1>

      {/* Search input */}
      <div className="flex flex-col md:flex-row justify-between mb-4 items-start md:items-center gap-4">
        <input
          type="text"
          placeholder="Search by customer, product, or suggestion..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="px-4 py-3 border border-gray-300 font-bold text-gray-1000 text-lg">Name</th>
              <th className="px-4 py-3 border border-gray-300 font-bold text-gray-1000 text-lg"  >Surname</th>
              <th className="px-4 py-3 border border-gray-300 font-bold text-gray-1000 text-lg">Email</th>
              <th className="px-4 py-3 border border-gray-300 font-bold text-gray-1000 text-lg">Phone</th>
              <th className="px-4 py-3 border border-gray-300 font-bold text-gray-1000 text-lg" >Suggestion</th>
              <th className="px-4 py-3 border border-gray-300 font-bold text-gray-1000 text-lg">State</th>
              <th className="px-4 py-3 border border-gray-300 font-bold text-gray-1000 text-lg">Date</th>
            </tr>
          </thead>


          <tbody className="text-gray-1000">
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No orders with feedback
                </td>
              </tr>
            )}

            {filteredOrders.map((order, idx) => (
              <tr key={idx} className="border-b hover:bg-blue-50 transition">
                <td className="px-4 py-2 border border-gray-300 font-medium">{order.customer?.name}</td>
                <td className="px-4 py-2 border border-gray-300">{order.customer?.surname || '-'}</td>
                <td className="px-4 py-2 border border-gray-300">{order.customer?.email || '-'}</td>
                <td className="px-4 py-2 border border-gray-300">{order.customer?.phone || '-'}</td>

                {/* Suggestion column with products + feedback */}
                <td className="px-4 py-2 border border-gray-300">
                  {order.items?.map((item, i) => (
                    <div key={i}>
                      {item.productName} (ID: {item._id})
                    </div>
                  ))}

                  {order.feedback?.productSuggestion && (
                    <div className="mt-1 text-blue-600 font-medium">
                      Suggestion: {order.feedback.productSuggestion}
                    </div>
                  )}
                </td>

                <td className="px-4 py-2 border border-gray-300">{order.state || order.status}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {order.feedback?.submittedAt
                    ? new Date(order.feedback.submittedAt).toLocaleString()
                    : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Showing {filteredOrders.length} {filteredOrders.length === 1 ? 'entry' : 'entries'}
      </p>
    </div>
  );
}
