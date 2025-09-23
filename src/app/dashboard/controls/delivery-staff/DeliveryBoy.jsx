'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { __userapi } from '../../../../../API_URL';

export default function DeliveryBoys() {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryBoys = async () => {
      try {
        const res = await axios.get(`${__userapi}/delivery-boys`); 
        setDeliveryBoys(res.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching delivery boys');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryBoys();
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;

  if (deliveryBoys.length === 0) {
    return <p className="p-4 text-gray-600">No delivery boys found.</p>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Delivery Staff</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 border border-gray-200">Name</th>
              <th className="px-4 py-2 border border-gray-200">Email</th>
              <th className="px-4 py-2 border border-gray-200">Phone</th>
            </tr>
          </thead>

          <tbody>
            {deliveryBoys.map((boy, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-2 border border-gray-200">{boy.name}</td>
                <td className="px-4 py-2 border border-gray-200">{boy.email}</td>
                <td className="px-4 py-2 border border-gray-200">{boy.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Showing {deliveryBoys.length} delivery staff
      </p>
    </div>
  );
}
