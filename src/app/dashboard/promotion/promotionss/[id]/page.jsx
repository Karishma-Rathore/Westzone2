"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LOCAL_URL } from "../../../../../../API_URL";
import { Percent, Tag, Gift } from "lucide-react";

export default function PromotionEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [promotion, setPromotion] = useState(null);
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  useEffect(() => {
    // Fetch promotion
    const fetchPromotion = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/promotions/${id}`);
        setPromotion(res.data);
        setSelectedBranches(Array.isArray(res.data.branches) ? res.data.branches : []);
        setSelectedProducts(Array.isArray(res.data.products) ? res.data.products : []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load promotion");
      }
    };

    // Fetch branches
    const fetchBranches = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/branches`);
        const data = Array.isArray(res.data.branches)
        ? res.data.branches
          : Array.isArray(res.data)
          ? res.data
          : [];
        setBranches(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load branches");
      }
    };
    
    // Fetch products
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/products`);
        
        const data = Array.isArray(res.data.products)
          ? res.data.products
          : Array.isArray(res.data)
          ? res.data
          : [];
          setProducts(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      }
    };
    
    if (id) fetchPromotion();
    fetchBranches();
    fetchProducts();
  }, [id]);

  const handleChange = (e) => {
    setPromotion({ ...promotion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${LOCAL_URL}api/promotions/${id}`, {
        ...promotion,
        branches: selectedBranches.map(b => b._id),
        products: selectedProducts.map(p => p._id),
      });
      toast.success("Promotion updated!");
      router.push("/promotions");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  const handleCancel = () => router.push("/promotions");

  if (!promotion) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Edit Promotion</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Title */}
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={promotion.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
            <input
              type="text"
              name="description"
              value={promotion.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Sub Title */}
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sub Title</label>
            <input
              type="text"
              name="subtitle"
              value={promotion.subtitle || ""}
              onChange={handleChange}
              placeholder="Enter sub title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sub Description */}
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sub Description</label>
            <input
              type="text"
              name="subDescription"
              value={promotion.subDescription || ""}
              onChange={handleChange}
              placeholder="Enter sub description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Promotion Type */}
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Promotion Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { type: "percentage", icon: <Percent size={30} />, label: "Percentage" },
                { type: "flat", icon: <Tag size={30} />, label: "Flat" },
                { type: "gift", icon: <Gift size={30} />, label: "Gift" },
                { type: "products", icon: <Percent size={30} />, label: "Products" },
                { type: "categories", icon: <Tag size={30} />, label: "Categories" },
              ].map(opt => (
                <label
                  key={opt.type}
                  className={`flex flex-col items-center border rounded-lg p-3 cursor-pointer transition 
                    ${promotion.promotionType === opt.type ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
                >
                  {opt.icon}
                  <span className="mt-1 text-xs">{opt.label}</span>
                  <input
                    type="radio"
                    name="promotionType"
                    value={opt.type}
                    checked={promotion.promotionType === opt.type}
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Product Selection */}
          {promotion.promotionType === "products" && (
            <div className="bg-white rounded-lg shadow p-4">
              <label className="block text-sm font-semibold mb-2">Select Products</label>
              <select
                multiple
                value={selectedProducts.map(p => p._id)}
                onChange={e =>
                  setSelectedProducts(
                    [...e.target.selectedOptions].map(o => products.find(p => p._id === o.value))
                  )
                }
                className="w-full border rounded px-3 py-2"
              >
                {products.map(product => (
                  <option key={product._id} value={product._id}>{product.productName}</option>
                ))}
              </select>
            </div>
          )}

          {/* Branch Selection */}
          {(promotion.promotionType === "products" || promotion.promotionType === "categories") && (
            <div className="bg-white rounded-lg shadow p-4">
              <label className="block text-sm font-semibold mb-2">Select Branches</label>
              <select
                multiple
                value={selectedBranches.map(b => b._id)}
                onChange={e =>
                  setSelectedBranches(
                    [...e.target.selectedOptions].map(o => branches.find(b => b._id === o.value))
                  )
                }
                className="w-full border rounded px-3 py-2"
              >
                {branches.map(branch => (
                  <option key={branch._id} value={branch._id}>{branch.branchName}</option>
                ))}
              </select>
            </div>
          )}

          {/* Start Date */}
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={promotion.startDate?.split("T")[0] || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* End Date */}
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">End Date *</label>
            <input
              type="date"
              name="endDate"
              value={promotion.endDate?.split("T")[0] || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Image Upload */}
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image *</label>
            <img
              src={promotion.image || "/fruits.jpg"}
              alt="Preview"
              className="w-full h-56 object-cover border rounded mb-3"
            />
            <input
              type="file"
              onChange={e => setPromotion({...promotion, image: URL.createObjectURL(e.target.files[0])})}
              className="block w-full text-sm text-gray-600 file:mr-3 file:py-1 file:px-3
                         file:rounded-md file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Phone Mockup */}
          <div className="relative w-64 h-128 mx-auto bg-black rounded-3xl border-4 border-gray-800 overflow-hidden shadow-lg">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-gray-900 rounded-b-lg"></div>
            <img
              src={promotion.image || "/fruits.jpg"}
              alt="Phone Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg text-center text-sm">
              {promotion.title}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-span-2 flex justify-end gap-4">
          <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600">Save</button>
        </div>
      </form>
    </div>
  );
}
