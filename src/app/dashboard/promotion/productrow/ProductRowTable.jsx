'use client';

import React from 'react';


export default function ProductRowTable() {
  const productRows = [
    { rowName: "Catch our always discounted prices" },
    { rowName: "Elevate Our Exclusive Brand" },
    { rowName: "Pick by Dietary:" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Offer Zone Product Row List</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Row Name"
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
          {productRows.map((row, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 font-semibold">{row.rowName}</td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
