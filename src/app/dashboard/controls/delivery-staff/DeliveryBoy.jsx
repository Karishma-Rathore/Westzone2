'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link"; 
import { PencilIcon, TrashIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import toast from "react-hot-toast";
import { LOCAL_URL } from '../../../../../API_URL';

export default function DeliveryBoy() {
  const [staffList, setStaffList] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
  fetchStaff();
}, []);

const fetchStaff = async () => {
  try {
    const res = await axios.get(`${LOCAL_URL}/api/delivery-staff`);
    setStaffList(res.data.data || []); 
  } catch (error) {
    console.error("Error fetching staff:", error);
    toast.error("Failed to load staff list");
  }
};


  // Delete Staff
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${LOCAL_URL}api/delivery-staff/${id}`);
      setStaffList(staffList.filter(item => item._id !== id));
      toast.success("Staff deleted!");
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.error("Failed to delete staff");
    }
  };

  // Filter for Search
  const filteredList = staffList.filter(staff =>
    staff.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Delivery Staff List</h2>

      {/* Filters Section */}
      <div className="p-4 mb-4 border rounded bg-gray-50">
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Name Search */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Please enter the name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="border rounded px-4 py-2 w-80"
            />
          </div>

          {/* Store Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Store</label>
            <select id="store" className="border rounded px-4 py-2 w-64">
              <option value="">All Stores</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <Link
            href="/delivery-staff/add"
            className="bg-white text-gray-800 px-4 py-2 rounded border hover:bg-blue-700 hover:text-white"
          >
            + Add New
          </Link>
          <button className="bg-white text-gray-800 px-4 py-2 rounded border hover:bg-red-600 hover:text-white">
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className='text-left px-4 py-2'>
              <div className='flex items-center gap-2'>
                Name
                <ArrowsUpDownIcon className='h-5 w-5 text-gray-500' />
              </div>
            </th>
            <th className='text-left px-4 py-2'>
              <div className='flex items-center gap-2'>
                Surname
                <ArrowsUpDownIcon className='h-5 w-5 text-gray-500' />
              </div>
            </th>
            <th className='text-left px-4 py-2'>Phone</th>
            <th className='text-left px-4 py-2'>Email</th>
            <th className='px-4 py-2 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.length > 0 ? (
            filteredList.map((staff) => (
              <tr key={staff._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{staff.name}</td>
                <td className="px-4 py-2">{staff.surname}</td>
                <td className="px-4 py-2">{staff.phone}</td>
                <td className="px-4 py-2">{staff.email}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link
                    href={`/delivery-staff/edit/${staff._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-2"
                  >
                    <PencilIcon className="h-5 w-5" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(staff._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-2"
                  >
                    <TrashIcon className="h-5 w-5 text-white" />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No staff found
              </td>
            </tr>
          )}
        </tbody>

        {/* Footer */}
        <tfoot className="bg-gray-50">
          <tr>
            <td colSpan="9" className="px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Showing {filteredList.length} of {staffList.length} entries
                </span>
                <div className="space-x-2">
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">Prev</button>
                  <button className="px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600">1</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
