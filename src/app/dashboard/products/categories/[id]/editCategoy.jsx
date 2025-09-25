"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { LOCAL_URL } from "../../../../../../API_URL";

export default function EditCategory({ id }) {
  const router = useRouter();

  const [category, setCategory] = useState({
    categoryName: "",
    isSubCategory: false,
    subCategories: [],
    isGramBased: false,
    isInList: false,
    priority: 1,
    categoryImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [editingSub, setEditingSub] = useState(null); 
  const [addingSub, setAddingSub] = useState(false);  
  const [newSubName, setNewSubName] = useState("");
  const [newSubPriority, setNewSubPriority] = useState(1);
  const [deleteSub, setDeleteSub] = useState(null);

  // Fetch category details
  const fetchCategory = async () => {
    try {
      const res = await fetch(`${LOCAL_URL}api/category/${id}`);
      const data = await res.json();
      const cat = data.data;

      setCategory({
        categoryName: cat.categoryName || "",
        isSubCategory: cat.isSubCategory || false,
        subCategories: cat.subCategories || [],
        isGramBased: cat.isGramBased || false,
        isInList: cat.isInList || false,
        priority: cat.priority || 1,
        categoryImage: null,
      });

      setPreview(cat.categoryImage ? `${LOCAL_URL}${cat.categoryImage}` : null);
    } catch (err) {
      toast.error("Failed to load category");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  // Handle image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCategory({ ...category, categoryImage: file });
    setPreview(URL.createObjectURL(file));
  };

  // Delete subcategory
  const deleteSubCategory = async () => {
    try {
      const res = await fetch(
        `${LOCAL_URL}api/category/${id}/subcategories/${deleteSub._id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete subcategory");
      toast.success("Subcategory deleted");
      setCategory((prev) => ({
        ...prev,
        subCategories: prev.subCategories.filter((s) => s._id !== deleteSub._id),
      }));
      setDeleteSub(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // Save edited subcategory
  const saveEditedSub = async () => {
    if (!editingSub.name.trim()) return toast.error("Name cannot be empty");
    try {
      const res = await fetch(
        `${LOCAL_URL}api/category/${id}/subcategories/${editingSub._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newName: editingSub.name, priority: editingSub.priority }),
        }
      );
      if (!res.ok) throw new Error("Failed to update subcategory");

      toast.success("Subcategory updated");
      setCategory((prev) => ({
        ...prev,
        subCategories: prev.subCategories.map((s) =>
          s._id === editingSub._id ? editingSub : s
        ),
      }));
      setEditingSub(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // Add new subcategory (POST request)
  const addNewSubCategory = async () => {
    if (!newSubName.trim()) return toast.error("Name cannot be empty");
    try {
      const res = await fetch(`${LOCAL_URL}api/category/${id}/subcategories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subCategoryName: newSubName,
          priority: newSubPriority,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add subcategory");

      toast.success("Subcategory added!");
      setCategory((prev) => ({
        ...prev,
        subCategories: data.data.subCategories,
      }));

      setAddingSub(false);
      setNewSubName("");
      setNewSubPriority(1);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // Submit category update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("categoryName", category.categoryName);
      formData.append("isSubCategory", category.isSubCategory.toString());
      formData.append("isGramBased", category.isGramBased.toString());
      formData.append("isInList", category.isInList.toString());
      formData.append("priority", category.priority);
      if (category.categoryImage instanceof File)
        formData.append("categoryImage", category.categoryImage);
      if (category.isSubCategory)
        formData.append("subCategories", JSON.stringify(category.subCategories));

      const res = await fetch(`${LOCAL_URL}api/category/${id}`, { method: "PUT", body: formData });
      if (!res.ok) throw new Error("Update failed");
      toast.success("Category updated successfully!");
      router.push("/dashboard/products/categories");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-10 bg-gray-100 min-h-screen p-4 flex justify-center">
      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-xl w-full max-w-6xl p-6 space-y-6">
        {/* Top Form */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Form */}
          <div className="flex-1 space-y-4">
            {/* Category Name */}
            <div className="flex flex-col p-4 bg-white rounded-lg shadow-sm w-full ">
              <label className="mb-1 font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                placeholder="Category name"
                value={category.categoryName}
                onChange={(e) => setCategory({ ...category, categoryName: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Priority */}
            <div className="flex flex-col p-4 bg-white rounded-lg shadow-sm w-full ">
              <label className="mb-1 font-medium text-gray-700">Priority</label>
              <input
                type="number"
                min="1"
                value={category.priority}
                onChange={(e) => setCategory({ ...category, priority: Math.max(1, Number(e.target.value)) })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-4">
              {/* Has Subcategories */}
              <div className="flex flex-col justify-center p-4 bg-white rounded-lg shadow-sm h-23">
                <span className="mb-2 font-medium">Has Subcategories</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={category.isSubCategory}
                    onChange={(e) => setCategory({ ...category, isSubCategory: e.target.checked })}
                  />
                  <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-orange-600 relative transition-colors duration-300">
                    <div
                      className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                      ${category.isSubCategory ? "translate-x-6" : "translate-x-0"}`}
                    ></div>
                  </div>
                </label>
              </div>

              {/* Gram Based */}
              <div className="flex flex-col justify-center p-4 bg-white rounded-lg shadow-sm h-23">
                <span className="mb-2 font-medium">Gram Based</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={category.isGramBased}
                    onChange={(e) => setCategory({ ...category, isGramBased: e.target.checked })}
                  />
                  <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 relative transition-colors duration-300">
                    <div
                      className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                      ${category.isGramBased ? "translate-x-6" : "translate-x-0"}`}
                    ></div>
                  </div>
                </label>
              </div>

              {/* Show in List */}
              <div className="flex flex-col justify-center p-4 bg-white rounded-lg shadow-sm h-23">
                <span className="mb-2 font-medium">Show in List</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={category.isInList}
                    onChange={(e) => setCategory({ ...category, isInList: e.target.checked })}
                  />
                  <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-orange-600 relative transition-colors duration-300">
                    <div
                      className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                      ${category.isInList ? "translate-x-6" : "translate-x-0"}`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-7">
              {category.isSubCategory && (
                <button
                  onClick={() => setAddingSub(true)}
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                >
                  Add Subcategory
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => router.push("/dashboard/products/categories")}
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
                alt="Category Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 flex items-center justify-center w-full h-full">
                No image
              </div>
            )}
            {/* Upload */}
            <label className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6m0-6l-4 4m4-4l4 4M12 4v8" />
              </svg>
              Upload
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        </div>

      {/* Subcategory Table */}
{category.isSubCategory && (
  <div className="w-full overflow-x-auto mt-4">
    <table className="w-full text-sm border border-gray-200 rounded overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-3 py-2 border-b border-gray-300 text-left">Name</th>
          <th className="px-3 py-2 border-b border-gray-300 text-left">Priority</th>
          <th className="px-3 py-2 border-b border-gray-300 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {category.subCategories.map((sub, i) => (
          <tr
            key={sub._id || sub.name}
            className={`${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            } hover:bg-gray-100 transition`}
          >
            <td className="px-3 py-2">{sub.name}</td>

            <td className="px-3 py-2">
  <div className="min-w-[60px] px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 font-medium">
    {sub.priority || 1}
  </div>
</td>


            <td className="px-3 py-2 flex justify-center gap-2">
              {/* Edit Button */}
              <button
                onClick={() => setEditingSub(sub)}
                className="px-3 py-1 border border-blue-400 rounded text-blue-700 hover:bg-gray-100 text-sm transition"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => setDeleteSub(sub)}
                className="px-3 py-1 border border-red-500 rounded text-red-500 hover:bg-red-50 text-sm transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        {/* Add Subcategory Modal */}
        {addingSub && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-96 p-6 z-10">
              <h3 className="text-lg font-semibold mb-3">Add Subcategory</h3>
              <input
                type="text"
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Subcategory Name"
              />
              <input
                type="number"
                min="1"
                value={newSubPriority}
                onChange={(e) => setNewSubPriority(Math.max(1, Number(e.target.value)))}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex justify-end gap-2">
                <button onClick={addNewSubCategory} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                <button onClick={() => setAddingSub(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Subcategory Modal */}
        {editingSub && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-96 p-6 z-10">
              <h3 className="text-lg font-semibold mb-3">Edit Subcategory</h3>
              <input
                type="text"
                value={editingSub.name}
                onChange={(e) => setEditingSub({ ...editingSub, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Subcategory Name"
              />
              <input
                type="number"
                min="1"
                value={editingSub.priority || 1}
                onChange={(e) => setEditingSub({ ...editingSub, priority: Math.max(1, Number(e.target.value)) })}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex justify-end gap-2">
                <button onClick={saveEditedSub} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                <button onClick={() => setEditingSub(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteSub && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-96 p-6 z-10">
              <h3 className="text-lg font-semibold mb-3 text-red-600">Delete Subcategory</h3>
              <p>Are you sure you want to delete <strong>{deleteSub.name}</strong>?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={deleteSubCategory} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                <button onClick={() => setDeleteSub(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
