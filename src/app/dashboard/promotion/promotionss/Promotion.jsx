'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import toast from "react-hot-toast";
import { LOCAL_URL } from "../../../../../API_URL";

// ✅ Fullscreen modal form
function PromotionForm({ isOpen, onClose, onCreated, addPromotion }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [promotionType, setPromotionType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [status, setStatus] = useState("active");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [applyOn, setApplyOn] = useState("allBranches");

  // Reset form on open
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setPromotionType("percentage");
      setDiscountValue("");
      setStatus("active");
      setStartDate("");
      setEndDate("");
      setApplyOn("allBranches");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !discountValue || !startDate || !endDate) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post(`${LOCAL_URL}api/promotions`, {
        title,
        description,
        promotionType,
        discountValue: Number(discountValue),
        status,
        startDate,
        endDate,
        applyOn,
      });

      toast.success("Promotion created!");
      onClose();

      // Add newly created promotion to the list immediately
      addPromotion(res.data);

    } catch (err) {
      console.error(err);
      toast.error("Failed to create promotion");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-100 bg-opacity-90">
      <div className="w-full md:w-3/4 lg:w-2/3 bg-white rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">New Promotion</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none w-full"
            />
            <input
              name="discountValue"
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder="Discount Value"
              required
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none w-full"
            />
            <select
              name="promotionType"
              value={promotionType}
              onChange={(e) => setPromotionType(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none w-full"
            >
              <option value="percentage">Percentage</option>
              <option value="flat">Flat</option>
            </select>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none w-full"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input
              name="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none w-full"
            />
            <input
              name="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none w-full"
            />
            <select
              name="applyOn"
              value={applyOn}
              onChange={(e) => setApplyOn(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none w-full"
            >
              <option value="allBranches">All Branches</option>
              <option value="specificBranches">Specific Branches</option>
              <option value="products">Products</option>
              <option value="categories">Categories</option>
            </select>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none w-full md:col-span-2 resize-none h-24"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ✅ Main Component
export default function Promotion() {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await axios.get(`${LOCAL_URL}api/promotions`);
      setPromotions(res.data.promotions || res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load promotions");
    }
  };

  const addPromotion = (newPromotion) => {
    setPromotions(prev => [newPromotion, ...prev]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${LOCAL_URL}api/promotions/${id}`);
      toast.success("Promotion deleted");
      setPromotions(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete promotion");
    }
  };

  const filteredPromotions = promotions.filter(promo =>
    promo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Promotions</h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/3"
        />
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + New Promotion
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Start</th>
            <th className="px-4 py-2 text-left">End</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Discount</th>
            <th className="px-4 py-2 text-left">Edit</th>
            <th className="px-4 py-2 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredPromotions.length > 0 ? (
            filteredPromotions.map(promo => (
              <tr key={promo._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{promo.title}</td>
                <td className="px-4 py-2">{promo.description}</td>
                <td className="px-4 py-2">{promo.startDate ? new Date(promo.startDate).toLocaleDateString() : "-"}</td>
                <td className="px-4 py-2">{promo.endDate ? new Date(promo.endDate).toLocaleDateString() : "-"}</td>
                <td className="px-4 py-2">{promo.promotionType}</td>
                <td className="px-4 py-2">{promo.discountValue}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/promotion/promotionss/${promo._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                  >
                    <PencilIcon className="h-5 w-5" /> Edit
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                    onClick={() => handleDelete(promo._id)}
                  >
                    <TrashIcon className="h-4 w-4" /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No promotions found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <PromotionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        addPromotion={addPromotion} // Pass function for instant UI update
      />
    </div>
  );
}
