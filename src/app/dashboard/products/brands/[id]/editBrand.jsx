"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
// import { LOCAL_URL } from "../../../../../../API_URL";

export default function EditBrand({ id }) {
  const router = useRouter();

  const [brand, setBrand] = useState({
    brandName: "",
    isInList: false,
    image: [],      // existing image URLs
    imageFiles: [],  // new files selected
  });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://192.168.1.24:5000/api/brand/${id}/products`);
        const data = res.data.data;

        setBrand({
          brandName: data.brand.brandName || "",
          isInList: data.brand.isInList || false,
          image: data.brand.image ? [data.brand.image] : [],
          imageFiles: [],
        });

        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch brand data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("brandName", brand.brandName);
      formData.append("isInList", brand.isInList);

      brand.imageFiles.forEach((file) => formData.append("image", file));

      await axios.put(`http://192.168.1.24:5000/api/brand/${id}`, formData, {
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
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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