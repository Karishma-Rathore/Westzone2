'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LOCAL_URL } from '../../../../../API_URL';

export default function BulkInventoryUpload() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/branches`);
        // Ensure branches is an array
        setBranches(res.data.branches || []);
        console.log(res.data);
        
      } catch (err) {
        toast.error('Failed to fetch branches');
      }
    };
    fetchBranches();
  }, []);

  // Handle branch selection
  const handleBranchSelect = (e) => {
    const branch = branches.find(b => b._id === e.target.value);
    setSelectedBranch(branch);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle bulk upload
  const handleUpload = async () => {
    if (!selectedBranch) return toast.error('Please select a branch');
    if (!file) return toast.error('Please select a file to upload');

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await axios.post(
        `${LOCAL_URL}api/inventory/mine/bulk`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      toast.success(
        `Updated ${res.data.updated} items. Unknown barcodes: ${res.data.unknownbarcode.join(', ') || 'None'}`
      );
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Bulk upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold">Bulk Inventory Upload</h1>

      {/* Branch selection */}
      <div className="flex items-center space-x-4">
        <label className="font-medium">Select Branch:</label>
     <select
  className="border px-3 py-2 rounded"
  onChange={handleBranchSelect}
  value={selectedBranch?._id || ''}
>
  <option value="" disabled>Select branch</option>
  {branches.map(branch => (
    <option key={branch._id} value={branch._id}>
      {branch.branchName} ({branch.code})
    </option>
  ))}
</select>

      </div>

      {/* File upload */}
      <div className="flex items-center space-x-4 mt-4">
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {/* Info */}
      <p className="text-gray-500 text-sm mt-2">
        Only CSV or Excel files are supported. Make sure your file has columns: <strong>barcode, price, quantity, lowStockThreshold</strong>.
      </p>
    </div>
  );
}
