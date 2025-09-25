'use client';
import React, { useState, useEffect } from 'react';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LOCAL_URL } from '../../../../../API_URL';

export default function BulkUpdate() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch branches from backend
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = localStorage.getItem('token'); // your auth token
        const res = await axios.get(`${LOCAL_URL}api/branches`);
        setBranches(Array.isArray(res.data.branches ? res.data.branches : res.data) ? res.data.branches || res.data : []);
      } catch (err) {
        console.error(err);
        toast.error('Error fetching branches');
      }
    };
    fetchBranches();
  }, []);

  const storeOptions = branches.flatMap(branch =>
    Array.isArray(branch.stores)
      ? branch.stores.map(store => ({
          branchId: branch._id,
          storeId: store._id,
          name: store.name,
        }))
      : []
  );

  const handleBranchSelect = (e) => {
    const store = storeOptions.find(s => s.storeId === e.target.value);
    setSelectedBranch(store || null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedBranch) return toast.error('Please select a branch');
    if (!file) return toast.error('Please select a file');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('branchId', selectedBranch.branchId);

    const token = localStorage.getItem('token');
    if (!token) return toast.error('No auth token found');

    setLoading(true);
    try {
      const res = await axios.post(
        `${LOCAL_URL}api/inventory/mine/bulk`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // send token
          },
        }
      );

      toast.success(`Updated ${res.data.updated} items`);

      if (res.data.unknownBarcodes && res.data.unknownBarcodes.length > 0) {
        toast.error(`Unknown Barcodes: ${res.data.unknownBarcodes.join(', ')}`);
      }

      setFile(null);
      setSelectedBranch(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Bulk upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Bulk Update</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          <ArrowDownTrayIcon className="h-4 w-4" /> Download Excel
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full space-y-4">
        {/* Branch dropdown */}
        <label className="block w-full md:w-1/2">
          <span className="text-sm font-semibold block mb-1">Branch/Store</span>
          <select
            value={selectedBranch?.storeId || ''}
            onChange={handleBranchSelect}
            className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Please select branch/store...</option>
            {storeOptions.map(s => (
              <option key={s.storeId} value={s.storeId}>
                {s.name} 
              </option>
            ))}
          </select>
        </label>

        {/* File upload */}
        <label className="w-full md:w-1/2 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 cursor-pointer hover:border-blue-400">
          <ArrowUpTrayIcon className="h-5 w-5 text-gray-500" />
          <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className="hidden" />
          <span className="text-gray-700">{file ? file.name : 'Please select Excel file...'}</span>
        </label>

        {/* Buttons */}
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
          <button
            onClick={() => { setFile(null); setSelectedBranch(null); }}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-2">
          Only CSV or Excel files are supported. Required columns: <strong>barcode, price, quantity, lowStockThreshold</strong>.
        </p>
      </div>
    </div>
  );
}
