'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function OutOfStock() {
  const [lowStockData, setLowStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchBranch, setSearchBranch] = useState("");
  const threshold = 5;

  useEffect(() => {
    const fetchLowStock = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://192.168.1.24:5000/api/reports/low-stock?threshold=${threshold}`
        );
        setLowStockData(res.data.lowStock || []);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching low stock data");
      } finally {
        setLoading(false);
      }
    };
    fetchLowStock();
  }, []);

  // ✅ Filter data by product name or branch
  const filteredData = lowStockData.filter((item) => {
    const matchesName = item.productId?.barcode
      ?.toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesBranch = item.branchId?.address
      ?.toLowerCase()
      .includes(searchBranch.toLowerCase());
    return matchesName && matchesBranch;
  });

  if (loading)
    return <p className="p-4 text-black text-center font-medium">Loading...</p>;

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-orange-500 mb-4">Low Stock / Out Of Stock</h2>

      {/* Filters */}
      <div className="p-4 mb-4 bg-white rounded shadow space-y-4">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Branch</label>
            <input
              type="text"
              placeholder="Search branch"
              value={searchBranch}
              onChange={(e) => setSearchBranch(e.target.value)}
              className="border rounded px-4 py-2 w-64"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              placeholder="Search product"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="border rounded px-4 py-2 w-64"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Search
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 flex items-center gap-2">
                Product <ArrowsUpDownIcon className="h-5 w-5 text-gray-600" />
              </th>
              <th className="text-left px-4 py-2">Branch</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-left px-4 py-2">Price</th>
              <th className="text-left px-4 py-2">Quantity Left</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No low stock items found
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{item.productId?.barcode}</td>
                  <td className="px-4 py-2">{item.branchId?.address}</td>
                  <td className="px-4 py-2">{item.productId?.category}</td>
                  <td className="px-4 py-2">{item.productId?.price}</td>
                  <td className="px-4 py-2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-xl">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {item.quantity <= 0 ? (
                      <span className="text-red-600 font-semibold">Out of Stock</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Low Stock</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      href={`/edit-product/${item.productId?._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
