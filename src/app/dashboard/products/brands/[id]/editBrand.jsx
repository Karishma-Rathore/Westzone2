"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
<<<<<<< HEAD
import { LOCAL_URL } from "../../../../../../API_URL";
=======
// import { LOCAL_URL } from "../../../../../../API_URL";
>>>>>>> origin/main

export default function EditBrand({ id }) {
  const router = useRouter();

  const [brand, setBrand] = useState({
    brandName: "",
    isInList: false,
<<<<<<< HEAD
    image: [],       // existing image URLs
    imageFiles: [],  // new files selected
  });

  const [preview, setPreview] = useState(null);
=======
    image: [],      // existing image URLs
    imageFiles: [],  // new files selected
  });

>>>>>>> origin/main
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  // Fetch brand data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/brand/${id}/products`);
=======
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://192.168.1.24:5000/api/brand/${id}/products`);
>>>>>>> origin/main
        const data = res.data.data;

        setBrand({
          brandName: data.brand.brandName || "",
          isInList: data.brand.isInList || false,
          image: data.brand.image ? [data.brand.image] : [],
          imageFiles: [],
        });

        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
<<<<<<< HEAD

        if (data.brand.image) {
          setPreview(`${LOCAL_URL}${data.brand.image}`);
        }
=======
>>>>>>> origin/main
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch brand data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

<<<<<<< HEAD
  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBrand({ ...brand, imageFiles: [file] });
    setPreview(URL.createObjectURL(file));
  };

  // Save brand
=======
  // Handle multiple image upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));
    setBrand((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...files],
      image: [...prev.image, ...previews],
    }));
  };

  // Save brand updates
>>>>>>> origin/main
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("brandName", brand.brandName);
      formData.append("isInList", brand.isInList);

<<<<<<< HEAD
      if (brand.imageFiles.length > 0) {
        brand.imageFiles.forEach((file) => formData.append("image", file));
      }

      await axios.put(`${LOCAL_URL}api/brand/${id}`, formData, {
=======
      brand.imageFiles.forEach((file) => formData.append("image", file));

      await axios.put(`http://192.168.1.24:5000/api/brand/${id}`, formData, {
>>>>>>> origin/main
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Brand updated successfully!");
      router.push("/dashboard/products/brands");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to update brand");
    }
  };

  // Search products
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  if (loading)
    return <p className="text-center mt-4 text-gray-500">Loading...</p>;

  return (
<<<<<<< HEAD
    <div className="w-full pt-10 bg-gray-100 min-h-screen p-4 flex justify-center">
      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-xl w-full max-w-6xl p-6 space-y-6">
        {/* Top Form */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Form */}
          <div className="flex-1 space-y-4">
            {/* Brand Name */}
            <div className="flex flex-col p-4 bg-white rounded-lg shadow-sm w-full">
              <label className="mb-1 font-medium text-gray-700">Brand Name</label>
              <input
                type="text"
                value={brand.brandName}
                onChange={(e) =>
                  setBrand((prev) => ({ ...prev, brandName: e.target.value }))
                }
                placeholder="Brand name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Show in List Toggle */}
            <div className="flex flex-col justify-center p-4 bg-white rounded-lg shadow-sm">
              <span className="mb-2 font-medium">Show in List</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={brand.isInList}
                  onChange={(e) =>
                    setBrand((prev) => ({ ...prev, isInList: e.target.checked }))
                  }
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative transition-colors duration-300">
                  <div
                    className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                    ${brand.isInList ? "translate-x-6" : "translate-x-0"}`}
                  ></div>
                </div>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-7">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => router.push("/dashboard/products/brands")}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Right Image Preview */}
          <div className="w-full lg:w-1/3 h-96 relative rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="Brand Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 flex items-center justify-center w-full h-full">
                No image
              </div>
            )}
            {/* Upload */}
            <label className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6m0-6l-4 4m4-4l4 4M12 4v8"
                />
              </svg>
              Upload
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h4 className="text-lg font-medium mb-3">Products under this Brand</h4>

          {/* Search Bar */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
=======
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block font-medium mb-2">Brand Name</label>
            <input
              type="text"
              value={brand.brandName}
              onChange={(e) =>
                setBrand((prev) => ({ ...prev, brandName: e.target.value }))
              }
>>>>>>> origin/main
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

<<<<<<< HEAD
          {/* Products Table */}
          {filteredProducts.length > 0 ? (
            <table className="w-full border border-gray-200 rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">Price</th>
                  <th className="border px-3 py-2">Barcode</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition">
                    <td className="border px-3 py-2">{p.productName}</td>
                    <td className="border px-3 py-2">₹{p.basePrice}</td>
                    <td className="border px-3 py-2">{p.barcode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No products found for this brand.</p>
          )}
        </div>
      </div>
    </div>
  );
}
=======
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isInList"
              checked={brand.isInList}
              onChange={(e) =>
                setBrand((prev) => ({ ...prev, isInList: e.target.checked }))
              }
              className="w-4 h-4"
            />
            <label htmlFor="isInList">Is in List</label>
          </div>

          <div>
            <label className="block font-medium mb-2">Upload image</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="border border-gray-300 rounded px-3 py-1"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => router.push("/dashboard/products/brands")}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Right: Big Image Preview */}
        <div className="flex-1 flex flex-col items-center justify-start">
          {/* {brand.image.length > 0 ? (
            <img
              src={
                brand.image[brand.image.length - 1].startsWith("blob")
                  ? brand.image[brand.image.length - 1]
                  : LOCAL_URL + brand.image[brand.image.length - 1]
              }
              alt="Brand Preview"
              className="w-full max-w-md h-80 object-cover rounded border shadow"
            />
          ) : (
            <div className="w-full max-w-md h-80 flex items-center justify-center border rounded text-gray-400">
              No Image
            </div>
          )} */}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Table */}
      <div>
        <h4 className="text-lg font-medium mb-3">Products under this Brand</h4>
        {filteredProducts.length > 0 ? (
          <table className="w-full border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Price</th>
                <th className="border px-3 py-2">Barcode</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p._id}>
                  <td className="border px-3 py-2">{p.productName}</td>
                  <td className="border px-3 py-2">₹{p.basePrice}</td>
                  <td className="border px-3 py-2">{p.barcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No products found for this brand.</p>
        )}
      </div>
    </div>
  );
}
>>>>>>> origin/main
