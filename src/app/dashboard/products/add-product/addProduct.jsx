"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LOCAL_URL } from "../../../../../API_URL";

export default function AddProduct() {
  const [form, setForm] = useState({
    productName: "",
    barcode: "",
    brandId: "",
    categoryId: "",
    description: "",
    basePrice: "",
    Quantity: "",
    attributes: "",
    keywords: "",
    storeId: "",
    stock: "",
    display: true,
    images: []
  });
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get(`${LOCAL_URL}api/category`);
        setCategories(catRes.data.data);

        const brandRes = await axios.get(`${LOCAL_URL}api/brand/`);
        setBrands(brandRes.data.data);

        const branchRes = await axios.get(`${LOCAL_URL}api/branches`);
        setBranches(branchRes.data.branches);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, images: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "images") {
          for (let i = 0; i < form.images.length; i++) {
            formData.append("images", form.images[i]);
          }
        } else {
          formData.append(key, form[key]);
        }
      });

      await axios.post(`${LOCAL_URL}api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product added successfully!");
      setForm({
        productName: "",
        barcode: "",
        brandId: "",
        categoryId: "",
        description: "",
        basePrice: "",
        Quantity: "",
        attributes: "",
        keywords: "",
        storeId: "",
        stock: "",
        display: true,
        images: []
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
              placeholder="Barcode"
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>

            <select
              name="brandId"
              value={form.brandId}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.brandName}
                </option>
              ))}
            </select>

            <select
              name="storeId"
              value={form.storeId}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">Select Store</option>
              {branches.flatMap((branch) =>
                branch.stores.map((store) => (
                  <option key={store._id} value={store._id}>
                    {branch.branchName} - {store.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              name="basePrice"
              value={form.basePrice}
              onChange={handleChange}
              placeholder="Price"
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              name="Quantity"
              value={form.Quantity}
              onChange={handleChange}
              placeholder="Quantity (e.g., 150gm)"
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          {/* Row 4: Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            rows="3"
            className="border rounded px-3 py-2 w-full"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="attributes"
              value={form.attributes}
              onChange={handleChange}
              placeholder='Attributes (JSON: {"color":"red"})'
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              name="keywords"
              value={form.keywords}
              onChange={handleChange}
              placeholder="Keywords (comma separated)"
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              className="block w-full text-sm text-gray-500"
            />
            {form.images.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {Array.from(form.images).map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="display"
              checked={form.display}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">
              Display product in store
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
