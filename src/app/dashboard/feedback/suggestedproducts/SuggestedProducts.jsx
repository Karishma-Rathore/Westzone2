'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LOCAL_URL } from '../../../../../API_URL';

export default function SuggestedProducts() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/feedback`); // backend API
        setFeedbackData(res.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching suggested feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Suggested Products</h1>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full table-auto text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase border-b">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Surname</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Phone</th>
              <th className="px-4 py-2 border border-gray-300">Suggestion</th>
              <th className="px-4 py-2 border border-gray-300">State</th>
              <th className="px-4 py-2 border border-gray-300">Date</th>
            </tr>
          </thead>

          <tbody>
            {feedbackData.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No feedback available
                </td>
              </tr>
            )}

            {feedbackData.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                <td className="px-4 py-2 border border-gray-300">{item.surname}</td>
                <td className="px-4 py-2 border border-gray-300">{item.email}</td>
                <td className="px-4 py-2 border border-gray-300">{item.phone}</td>
                <td className="px-4 py-2 border border-gray-300">{item.suggestion}</td>
                <td className="px-4 py-2 border border-gray-300">{item.state}</td>
                <td className="px-4 py-2 border border-gray-300">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Showing {feedbackData.length} entries
      </p>
    </div>
  );
}
