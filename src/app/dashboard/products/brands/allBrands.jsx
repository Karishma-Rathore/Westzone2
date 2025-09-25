<<<<<<< HEAD
"use client";
=======
'use client';
>>>>>>> origin/main

import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
<<<<<<< HEAD
import { LOCAL_URL } from "../../../../../API_URL";
=======
// import { LOCAL_URL } from "../../../../../API_URL";
>>>>>>> origin/main

export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [newBrand, setNewBrand] = useState({
    brandName: "",
<<<<<<< HEAD
    priority: 1, 
=======
>>>>>>> origin/main
    isInList: true,
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // Fetch all brands
  const fetchBrands = async () => {
    try {
<<<<<<< HEAD
      const res = await fetch(`${LOCAL_URL}api/brand`);
=======
      const res = await fetch(` http://192.168.1.24:5000/api/brand`);
>>>>>>> origin/main
      const data = await res.json();
      setBrands(data.data || data || []);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching brands");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBrand({ ...newBrand, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Add new brand
  const addBrand = async (e) => {
    e.preventDefault();

    if (!newBrand.brandName.trim()) return toast.error("Brand name is required");
    if (!newBrand.image) return toast.error("Please select an image");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("brandName", newBrand.brandName);
<<<<<<< HEAD
      formData.append("priority", newBrand.priority); 
      formData.append("isInList", newBrand.isInList ? "true" : "false");
      formData.append("image", newBrand.image);

      const res = await fetch(`${LOCAL_URL}api/brand`, {
=======
      formData.append("isInList", newBrand.isInList ? "true" : "false");
      formData.append("image", newBrand.image);

      const res = await fetch(`http://192.168.1.24:5000/api/brand`, {
>>>>>>> origin/main
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.text();
        console.error("Server Error:", errData);
        throw new Error("Failed to add brand");
      }

      const data = await res.json();
      setBrands((prev) => [...prev, data.data || data]);
      toast.success("Brand added successfully");

<<<<<<< HEAD
      setNewBrand({ brandName: "", priority: 1, isInList: true, image: null });
=======
      setNewBrand({ brandName: "", isInList: true, image: null });
>>>>>>> origin/main
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Error adding brand");
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const updatePriority = async (id, newPriority) => {
  try {
    await fetch(`${LOCAL_URL}api/brand/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority: Number(newPriority) }),
    });

    setBrands((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, priority: Number(newPriority) } : b
      )
    );
    toast.success("Priority updated");
  } catch (err) {
    console.error(err);
    toast.error("Error updating priority");
  }
};


  // Delete brand
  const handleDelete = async () => {
    try {
      await fetch(`${LOCAL_URL}api/brand/${deleteId}`, { method: "DELETE" });
=======
  // Delete brand
  const handleDelete = async () => {
    try {
      await fetch(` http://192.168.1.24:5000/api/brand/${deleteId}`, { method: "DELETE" });
>>>>>>> origin/main
      setBrands((prev) => prev.filter((b) => b._id !== deleteId));
      toast.success("Brand deleted successfully");
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting brand");
    }
  };

  // Toggle brand visibility
  const toggleInList = async (id, currentValue) => {
    try {
<<<<<<< HEAD
      await fetch(`${LOCAL_URL}api/brand/${id}`, {
=======
      await fetch(` http://192.168.1.24:5000/api/brand/${id}`, {
>>>>>>> origin/main
        method: "PUT",
        body: JSON.stringify({ isInList: !currentValue }),
        headers: { "Content-Type": "application/json" },
      });

      setBrands((prev) =>
        prev.map((b) => (b._id === id ? { ...b, isInList: !currentValue } : b))
      );
      toast.success("Brand updated");
    } catch (err) {
      console.error(err);
      toast.error("Error updating brand visibility");
    }
  };

<<<<<<< HEAD
  // Filter brands
=======
  // Filter brands by search term
>>>>>>> origin/main
  const filteredBrands = brands.filter((brand) =>
    brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Brand Management</h2>

      {/* SEARCH BAR */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by brand name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ADD BRAND FORM */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold mb-4">Add New Brand</h4>
        <form onSubmit={addBrand} className="space-y-4">
<<<<<<< HEAD
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Brand Name */}
=======
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
>>>>>>> origin/main
            <div>
              <label className="block text-sm font-medium mb-1">Brand Name</label>
              <input
                type="text"
                value={newBrand.brandName}
                onChange={(e) =>
                  setNewBrand({ ...newBrand, brandName: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
<<<<<<< HEAD

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <input
                type="number"
                min="1"
                value={newBrand.priority}
                onChange={(e) =>
                  setNewBrand({ ...newBrand, priority: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Show in List (toggle) */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-medium mb-1">Show in List</span>
              <label className="relative inline-flex items-center cursor-pointer">
=======
            <div className="flex items-center">
              <label className="flex items-center gap-2">
>>>>>>> origin/main
                <input
                  type="checkbox"
                  checked={newBrand.isInList}
                  onChange={(e) =>
                    setNewBrand({ ...newBrand, isInList: e.target.checked })
                  }
<<<<<<< HEAD
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 relative transition-colors duration-300">
                  <div
                    className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      newBrand.isInList ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </label>
            </div>

            {/* Image Upload */}
=======
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm font-medium">Show in List</span>
              </label>
            </div>
>>>>>>> origin/main
            <div>
              <label className="block text-sm font-medium mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {preview && (
            <div className="mt-4 flex justify-center">
              <img
                src={preview}
                alt="preview"
                className="w-44 h-32 object-cover rounded-lg border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 bg-green-600 text-white px-6 py-2 rounded-lg shadow transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? "Adding..." : "Add Brand"}
          </button>
        </form>
      </div>

      {/* BRAND LIST */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-4">Brand List</h4>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm text-left">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">Brand</th>
<<<<<<< HEAD
<th className="px-6 py-1 w-32">Priority</th>
=======
>>>>>>> origin/main
                <th className="px-4 py-2 text-center">In List</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand) => (
                <tr key={brand._id} className="border-b hover:bg-gray-50">
<<<<<<< HEAD
                  {/* Brand column */}
                  <td className="px-4 py-2 flex items-center gap-3">
=======
                  {/* <td className="px-4 py-2 flex items-center gap-3">
>>>>>>> origin/main
                    {brand.image && (
                      <img
                        src={LOCAL_URL + brand.image}
                        alt={brand.brandName}
                        className="w-16 h-12 object-cover rounded border"
                      />
                    )}
                    <span className="font-medium">{brand.brandName}</span>
<<<<<<< HEAD
                  </td>

                  {/* Priority column */}
<td className="px-4 py-2">
  <input
    type="number"
    value={brand.priority || 1}
    onChange={(e) => updatePriority(brand._id, e.target.value)}
    className="w-28 px-3 py-1 border border-gray-300 rounded text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500"
    min={1}
  />
</td>


                  {/* iOS toggle */}
                  <td className="px-4 py-2 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={brand.isInList}
                        onChange={() => toggleInList(brand._id, brand.isInList)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 relative transition-colors duration-300">
                        <div
                          className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                            brand.isInList ? "translate-x-6" : "translate-x-0"
                          }`}
                        ></div>
                      </div>
                    </label>
                  </td>

                  {/* Action buttons */}
=======
                  </td> */}
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={brand.isInList}
                      onChange={() => toggleInList(brand._id, brand.isInList)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    />
                  </td>
>>>>>>> origin/main
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/products/brands/${brand._id}`}
                        className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                      >
                        ✏ Edit
                      </Link>
                      <button
                        onClick={() => setDeleteId(brand._id)}
                        className="px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredBrands.length === 0 && (
                <tr>
<<<<<<< HEAD
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
=======
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
>>>>>>> origin/main
                    No brands found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h5 className="text-lg font-semibold">Confirm Delete</h5>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setDeleteId(null)}
              >
                ✖
              </button>
            </div>
            <div className="p-4">
              <p>Are you sure you want to delete this brand?</p>
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/main
