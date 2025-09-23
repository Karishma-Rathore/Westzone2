'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LOCAL_URL } from "../../../../../API_URL";

export default function LowStockAlert() {
  const [lowStockData, setLowStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const threshold = 10;

  useEffect(() => {
    const fetchLowStock = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${LOCAL_URL}api/reports/low-stock?threshold=${threshold}`);
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

  if (loading)
    return <p className="p-4 text-black text-center font-medium">Loading...</p>;

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-500 mb-2">Low Stock Alert</h1>
        <p className="text-black mb-6">Items running low across branches</p>

        <div className="space-y-4">
          {lowStockData.length === 0 ? (
            <p className="text-white text-center">No low stock items</p>
          ) : (
            lowStockData.map((item) => (
              <div
                key={item._id}
                className="bg-white-50 border-l-4 border-orange-500 p-4 rounded-md shadow-md flex justify-between items-center"
              >
                <div>
                  <h2 className="text-black font-semibold text-lg">
                    {item.productId.barcode}
                  </h2>
                  <p className="text-black/70 text-sm">{item.branchId.address}</p>
                </div>
<div className="text-orange-500 border-2 border-orange-500 bg-white px-3 py-0  rounded-2xl font-normal text-lg">
  {item.quantity} left
</div>


              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
