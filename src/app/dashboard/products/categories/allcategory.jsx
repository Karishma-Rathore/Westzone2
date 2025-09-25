"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LOCAL_URL } from "../../../../../API_URL";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${LOCAL_URL}api/category`);
            const data = await res.json();
            setCategories(data.data || data || []);
        } catch (err) {
            console.error("Error fetching categories", err);
        }
    };


    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async () => {
        try {
            await fetch(`${LOCAL_URL}api/category/${deleteId}`, {
                method: "DELETE",
            });
            setCategories((prev) => prev.filter((c) => c._id !== deleteId));
            setDeleteId(null);
        } catch (err) {
            console.error("Error deleting category", err);
        }
    };

    const toggleInList = async (category) => {
        try {
            setCategories((prev) =>
                prev.map((c) =>
                    c._id === category._id ? { ...c, isInList: !c.isInList } : c
                )
            );

            await fetch(`${LOCAL_URL}api/category/${category._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    categoryName: category.categoryName,
                    isInList: !category.isInList,
                }),
            });
        } catch (err) {
            console.error("Error updating category", err);
            // Revert in case of error
            setCategories((prev) =>
                prev.map((c) =>
                    c._id === category._id ? { ...c, isInList: category.isInList } : c
                )
            );
        }
    };
    const updatePriority = async (id, value) => {
        setCategories((prev) =>
            prev.map((c) => (c._id === id ? { ...c, priority: value } : c))
        );

        try {
            const cat = categories.find((c) => c._id === id);

            await fetch(`${LOCAL_URL}api/category/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...cat, priority: value }),
            });

        } catch (err) {
            console.error("Failed to update priority", err);
        }
    };


    const filtered = categories.filter((c) =>
        c.categoryName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Category Management</h2>
                <Link
                    href="/dashboard/products/categories/add-category"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    + Add Category
                </Link>
            </div>

            {/* Search */}
            <input
                type="text"
                className="w-full p-2 border rounded-lg mb-4"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

          <div className="overflow-x-auto rounded-lg shadow">
  <table className="w-full border border-gray-200 bg-white">
    <thead>
      <tr className="bg-gray-800 text-white text-left">
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">In List</th> 
        <th className="px-4 py-2">Priority</th>
        <th className="px-4 py-2 text-center w-40">Action</th>
      </tr>
    </thead>
    <tbody>
      {filtered.map((cat, i) => (
        <tr
          key={cat._id}
          className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b hover:bg-gray-100`}
        >
          {/* Name */}
          <td className="px-4 py-2">{cat.categoryName}</td>

          {/* In List (toggle shifted left) */}
          <td className="px-4 py-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={cat.isInList}
                onChange={() => toggleInList(cat)}
              />
              <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
              <div
                className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                  cat.isInList ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </label>
          </td>

          {/* Priority */}
          <td className="px-4 py-2">
            <input
              type="number"
              min={1}
              max={50}
              value={cat.priority ?? 1}
              onChange={(e) => updatePriority(cat._id, Number(e.target.value))}
              className="w-30 px-2 py-1 border rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </td>

          {/* Actions */}
          <td className="px-4 py-2 text-center">
            <div className="flex justify-center gap-2">
              <Link
                href={`/dashboard/products/categories/${cat._id}`}
                className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => setDeleteId(cat._id)}
                className="px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition text-sm"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}

      {filtered.length === 0 && (
        <tr>
          <td colSpan="4" className="text-center text-gray-500 py-6">
            No categories found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


            {/* DELETE CONFIRM MODAL */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Black overlay */}
                    <div
                        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
                        onClick={() => setDeleteId(null)}
                    ></div>

                    {/* Modal content */}
                    <div className="relative bg-black  rounded-lg shadow-lg w-80 p-5 z-10">
                        <h3 className="text-lg font-semibold mb-3 text-white  ">Confirm Delete</h3>
                        <p className="mb-4 text-white">Are you sure you want to delete this category?</p>
                        <div className="flex justify-end gap-2">
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
