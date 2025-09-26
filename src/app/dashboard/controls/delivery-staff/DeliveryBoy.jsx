'use client';

import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import toast from "react-hot-toast";
import { LOCAL_URL } from '../../../../../API_URL';

export default function DeliveryBoy() {
  const [staffList, setStaffList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  //  Load Delivery Staff Data
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${LOCAL_URL}api/delivery-staff`);
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

  // Search Filter
  const filteredList = staffList.filter(staff =>
    staff.name?.toLowerCase().includes(searchName.toLowerCase())
  );

  //  Save (Add / Update)
  const handleSave = async (formData) => {
    try {
      if (editData) {
        await axios.put(`${LOCAL_URL}api/delivery-staff/${editData._id}`, formData);
        toast.success("Staff updated!");
      } else {
        await axios.post(`${LOCAL_URL}api/delivery-staff`, formData);
        toast.success("Staff added!");
      }
      setShowForm(false);
      setEditData(null);
      fetchStaff();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save staff");
    }
  };

  return (
    <div className="p-6">
      {!showForm ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-gray-800"> Delivery Staff</h2>

          {/* Filters Section */}
          <div className="p-4 mb-4 border rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm">
            <div className="flex items-center justify-between gap-6 mb-6">
              {/* Search by Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">Search by Name</label>
                <input
                  type="text"
                  placeholder="Enter staff name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-80 shadow-sm focus:ring focus:ring-blue-200 outline-none"
                />
              </div>

              {/* Store Dropdown (optional filter) */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">Store</label>
                <select className="border rounded-lg px-4 py-2 w-64 shadow-sm">
                  <option value="">All Stores</option>
                </select>
              </div>
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
              <button
                onClick={() => { setShowForm(true); setEditData(null); }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                + Add Staff
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  <div className="flex items-center gap-2">
                    Name
                    <ArrowsUpDownIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Surname</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Store</th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((staff) => (
                  <tr key={staff._id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{staff.name}</td>
                    <td className="px-4 py-3">{staff.surname}</td>
                    <td className="px-4 py-3">{staff.phone}</td>
                    <td className="px-4 py-3">{staff.email}</td>
                    <td className="px-4 py-3">{staff.store?.name || "-"}</td>
                    <td className="px-4 py-3 flex gap-2 justify-center">
                      <button
                        onClick={() => { setEditData(staff); setShowForm(true); }}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-2"
                      >
                        <PencilIcon className="h-5 w-5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(staff._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-2"
                      >
                        <TrashIcon className="h-5 w-5 text-white" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No staff found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <StaffForm
          initialData={editData}
          onCancel={() => { setShowForm(false); setEditData(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

//  Staff Form Component (Full-Screen Modal)
function StaffForm({ initialData = null, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    store: "",
  });
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        surname: initialData.surname || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        store: initialData.store?._id || "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/branches");
        const branches = res.data.branches || [];
        const allStores = branches.flatMap(branch =>
          (branch.stores || []).map(store => ({
            _id: store._id,
            name: store.name,
            branchName: branch.branchName,
          }))
        );
        setStores(allStores);
      } catch (err) {
        console.error("Error fetching stores:", err);
        toast.error("Failed to load stores");
      }
    };
    fetchStores();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="w-full h-full md:h-auto max-w-5xl bg-white rounded-2xl shadow-2xl overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-3xl font-bold"
        >
          ✖
        </button>

        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
          {initialData ? "Edit Delivery Staff" : "Add New Delivery Staff"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
              className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition w-full"
            />
            <input
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Enter Last Name"
              required
              className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition w-full"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              required
              className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition w-full"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
              className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition w-full"
            />

            <select
              name="store"
              value={formData.store}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3 md:col-span-2 focus:ring-2 focus:ring-blue-400 outline-none w-full transition"
            >
              <option value="">Select Store</option>
              {stores.map(store => (
                <option key={store._id} value={store._id}>
                  {store.name} ({store.branchName})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md transition"
            >
              {initialData ? "Update Staff" : "Save Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



