'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LOCAL_URL } from '../../../../../API_URL';// path adjust karo

export default function OfferZone() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/promotions`);
        // res.data assume array of promotions
        setOffers(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load promotions");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const filteredOffers = offers.filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="p-6">Loading promotions...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Promotions List</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Promotion Title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-1/3"
        />
        <div className="space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + New Promotion
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Manage Promotions
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Search
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Title</th>
            <th className="text-left px-4 py-2">Type</th>
            <th className="text-left px-4 py-2">Discount Value</th>
            <th className="text-left px-4 py-2">Coupon Code</th>
            <th className="text-left px-4 py-2">Apply On</th>
            <th className="text-left px-4 py-2">Start</th>
            <th className="text-left px-4 py-2">End</th>
            <th className="text-left px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOffers.map((offer, index) => (
            <tr key={offer._id || index} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{offer.title}</td>
              <td className="px-4 py-2">{offer.promotionType}</td>
              <td className="px-4 py-2">{offer.discountValue}</td>
              <td className="px-4 py-2">{offer.couponCode || '-'}</td>
              <td className="px-4 py-2">{offer.applyOn}</td>
              <td className="px-4 py-2">{new Date(offer.startDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">{new Date(offer.endDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">{offer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
