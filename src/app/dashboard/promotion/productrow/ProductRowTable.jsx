'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LOCAL_URL } from '../../../../../API_URL'; // adjust karo path

export default function ProductRowTable() {
  const [productRows, setProductRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProductRows = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/promotions`);
        // sirf product type promotions filter karo
        const productPromotions = (res.data || []).filter(p => p.promotionType === 'products');
        setProductRows(productPromotions);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product rows");
      } finally {
        setLoading(false);
      }
    };

    fetchProductRows();
  }, []);

  const filteredRows = productRows.filter(row =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="p-6">Loading product rows...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Offer Zone Product Row List</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Row Name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-1/3"
        />
        <div className="space-x-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Search
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Row Name</th>
            <th className="text-left px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, index) => (
            <tr key={row._id || index} className="border-t">
              <td className="px-4 py-2 font-semibold">{row.title}</td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
