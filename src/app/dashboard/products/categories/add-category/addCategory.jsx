"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { LOCAL_URL } from "../../../../../../API_URL";

export default function AddCategory() {
  const router = useRouter();
  const [category, setCategory] = useState({
    categoryName: "",
    isSubCategory: false,
    isGramBased: false,
    isInList: true,
    priority: 1,
    categoryImage: null,
    subCategories: [],
  });
  const [preview, setPreview] = useState(null);
  const [subCatInput, setSubCatInput] = useState("");
  const [subCatPriority, setSubCatPriority] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Upload a valid image");
    if (file.size > 2 * 1024 * 1024) return toast.error("Max 2MB allowed");

    setCategory({ ...category, categoryImage: file });
    setPreview(URL.createObjectURL(file));
  };

  const addSubCategory = () => {
    if (!subCatInput.trim()) return toast.error("Subcategory cannot be empty");

    setCategory(prev => ({
      ...prev,
      subCategories: [...prev.subCategories, { name: subCatInput.trim(), priority: Math.max(1, subCatPriority) }]
    }));

    setSubCatInput("");
    setSubCatPriority(1);
  };

  const removeSubCategory = (index) => {
    setCategory(prev => ({
      ...prev,
      subCategories: prev.subCategories.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (category.isSubCategory && category.subCategories.length === 0)
      return toast.error("Add at least one subcategory");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("categoryName", category.categoryName);
      formData.append("isSubCategory", category.isSubCategory);
      formData.append("isGramBased", category.isGramBased);
      formData.append("isInList", category.isInList);
      formData.append("priority", category.priority);
      if (category.categoryImage) formData.append("categoryImage", category.categoryImage);
      formData.append("subCategories", JSON.stringify(category.subCategories));

      const res = await fetch(`${LOCAL_URL}api/category`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed to add category");

      toast.success("Category added!");
      setCategory({
        categoryName: "",
        isSubCategory: false,
        isGramBased: false,
        isInList: true,
        priority: 1,
        categoryImage: null,
        subCategories: [],
      });
      setPreview(null);
      setSubCatInput("");
      setSubCatPriority(1);
      router.push("/dashboard/products/categories");
    } catch (err) {
      console.error(err);
      toast.error("Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <div className="text-2xl font-bold mb-6 text-gray-800">Add New Category</div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5" encType="multipart/form-data">

          {/* Category Name */}
          <div>
            <label className="block mb-1 font-semibold">Category Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              value={category.categoryName}
              onChange={(e) => setCategory({ ...category, categoryName: e.target.value })}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-1 font-semibold">Priority</label>
            <input
              type="number"
              min="1"
              value={category.priority}
              onChange={(e) => setCategory({ ...category, priority: Math.max(1, Number(e.target.value)) })}
              placeholder="1"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={category.isSubCategory} onChange={(e) => setCategory({ ...category, isSubCategory: e.target.checked })} className="w-4 h-4"/>
              Has Subcategories
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={category.isGramBased} onChange={(e) => setCategory({ ...category, isGramBased: e.target.checked })} className="w-4 h-4"/>
              Gram Based
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={category.isInList} onChange={(e) => setCategory({ ...category, isInList: e.target.checked })} className="w-4 h-4"/>
              Show in List
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-semibold">Category Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border border-gray-300 rounded px-2 py-1"/>
            {preview && <img src={preview} alt="preview" className="mt-2 w-56 h-36 object-cover rounded shadow mx-auto" />}
          </div>

          {/* Subcategories */}
          {category.isSubCategory && (
            <div>
              <label className="block mb-1 font-semibold">Subcategories</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Enter subcategory"
                  value={subCatInput}
                  onChange={(e) => setSubCatInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Priority"
                  value={subCatPriority}
                  onChange={(e) => setSubCatPriority(Math.max(1, Number(e.target.value)))}
                  className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="button" onClick={addSubCategory} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.subCategories.map((sub, i) => (
                  <div key={i} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2">
                    {sub.name} (P: {sub.priority})
                    <button type="button" onClick={() => removeSubCategory(i)} className="text-gray-700 hover:text-red-600 font-bold">×</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded font-semibold text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mx-auto" /> : "Add Category"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
