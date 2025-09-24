'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { LOCAL_URL } from "../../../../../API_URL";

export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [newBrand, setNewBrand] = useState({
    brandName: "",
    isInList: true,
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // Fetch all brands
  const fetchBrands = async () => {
    try {
      const res = await fetch(`${LOCAL_URL}api/brand`);
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
      formData.append("isInList", newBrand.isInList ? "true" : "false");
      formData.append("image", newBrand.image);

      const res = await fetch(`${LOCAL_URL}api/brand`, {
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

      setNewBrand({ brandName: "", isInList: true, image: null });
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Error adding brand");
    } finally {
      setLoading(false);
    }
  };

  // Delete brand
  const handleDelete = async () => {
    try {
      await fetch(`${LOCAL_URL}api/brand/${deleteId}`, { method: "DELETE" });
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
      await fetch(`${LOCAL_URL}api/brand/${id}`, {
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

  // Filter brands by search term
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newBrand.isInList}
                  onChange={(e) =>
                    setNewBrand({ ...newBrand, isInList: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm font-medium">Show in List</span>
              </label>
            </div>
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
                <th className="px-4 py-2 text-center">In List</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand) => (
                <tr key={brand._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 flex items-center gap-3">
                    {brand.image && (
                      <img
                        src={LOCAL_URL + brand.image}
                        alt={brand.brandName}
                        className="w-16 h-12 object-cover rounded border"
                      />
                    )}
                    <span className="font-medium">{brand.brandName}</span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={brand.isInList}
                      onChange={() => toggleInList(brand._id, brand.isInList)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    />
                  </td>
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
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
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
}
