'use client';

import React from 'react';

export default function OfferZone() {
  const dummyOffers = [
    {
      title: 'Fasting treats',
      description: 'Fasting treats',
      typeOfOffer: 'ProductRow Section',
      start: '29/07/2025 12:43 PM',
      end: '31/08/2025 12:43 PM',
      priority: 164,
    },
    {
      title: 'Pooja Essentials',
      description: 'Pooja Essentials 🙏',
      typeOfOffer: 'ProductRow Section',
      start: '28/07/2025 02:47 PM',
      end: '31/08/2025 02:47 PM',
      priority: 163,
    },
    {
      title: 'Back to School, Back to Awesome!',
      description: 'School time offers for kids',
      typeOfOffer: 'ProductRow Section',
      start: '28/07/2025 03:11 PM',
      end: '31/08/2025 03:11 PM',
      priority: 162,
    },
    {
      title: 'Beat the Heat with Every Sip 🍹☀️',
      description: 'Summer Juices You\'ll Love!',
      typeOfOffer: 'ProductRow Section',
      start: '05/06/2025 04:50 PM',
      end: '31/08/2025 04:50 PM',
      priority: 161,
    },
    {
      title: 'Sparkle Your Summer Mood! 🍁😎✨',
      description: 'Stay cool and refreshed',
      typeOfOffer: 'ProductRow Section',
      start: '05/06/2025 04:43 PM',
      end: '31/08/2025 04:43 PM',
      priority: 160,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Top Offer's List</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Promotion Title"
          className="border rounded px-4 py-2 w-1/3"
        />
        <div className="space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + New Top Offer
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Offer Zone Product Rows
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
            <th className="text-left px-4 py-2">Description</th>
            <th className="text-left px-4 py-2">Type Of Offer</th>
            <th className="text-left px-4 py-2">Start</th>
            <th className="text-left px-4 py-2">End</th>
            <th className="text-left px-4 py-2">Priority</th>
            <th className="text-left px-4 py-2">Index</th>
            <th className="text-left px-4 py-2">Edit</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-left px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {dummyOffers.map((offer, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{offer.title}</td>
              <td className="px-4 py-2">{offer.description}</td>
              <td className="px-4 py-2">{offer.typeOfOffer}</td>
              <td className="px-4 py-2">{offer.start}</td>
              <td className="px-4 py-2">{offer.end}</td>
              <td className="px-4 py-2">{offer.priority}</td>
              <td className="px-4 py-2">
                <button className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500">
                  ⭕
                </button>
              </td>
              <td className="px-4 py-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  ✎ Edit
                </button>
              </td>
              <td className="px-4 py-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                  ▶ Start
                </button>
              </td>
              <td className="px-4 py-2">
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
