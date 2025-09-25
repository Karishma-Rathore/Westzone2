"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { LOCAL_URL } from "../../../../../API_URL";

export default function EditProduct({ id }) {
  const router = useRouter();
  const [form, setForm] = useState({
    productName: "",
    barcode: "",
    brandId: "",
    categoryId: "",
    description: "",
    basePrice: "",
    Quantity: "",
    attributes: [],
    keywords: "",
    stock: "",
    display: true,
    images: [],
    imageFiles: [],
    storeIds: [],
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [branches, setBranches] = useState([]);
  const [inventoryData, setInventoryData] = useState([]); 
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes, branchRes] = await Promise.all([
          axios.get(`${LOCAL_URL}api/products/${id}`),
          axios.get(`${LOCAL_URL}api/category`),
          axios.get(`${LOCAL_URL}api/brand`),
          axios.get(`${LOCAL_URL}api/branches`),
        ]);

        const prod = prodRes.data.product;
        setForm({
          productName: prod.productName || "",
          barcode: prod.barcode || "",
          brandId: prod.brandId || "",
          categoryId: prod.categoryId || "",
          description: prod.description || "",
          basePrice: prod.basePrice || "",
          Quantity: prod.Quantity || "",
          attributes: prod.attributes
            ? Object.entries(prod.attributes).map(([option, value]) => ({ option, value }))
            : [],
          keywords: (prod.keywords || []).join(", "),
          stock: prod.stock || "",
          display: prod.display ?? true,
          images: (prod.images || []).map((img) => LOCAL_URL + img),
          imageFiles: [],
          storeIds: prod.storeId || [],
        });

        setCategories(catRes.data.data || []);
        setBrands(brandRes.data.data || []);
        setBranches(branchRes.data.branches || []);

        const invRes = await axios.get(`${LOCAL_URL}api/inventory/get-inventory/${id}`);
        setInventoryData(invRes.data || []);
        console.log(invRes.data);
        
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") setForm({ ...form, [name]: checked });
    else if (type === "file") {
      const newFiles = Array.from(files);
      const previews = newFiles.map((f) => URL.createObjectURL(f));
      setForm(prev => ({
        ...prev,
        imageFiles: [...prev.imageFiles, ...newFiles],
        images: [...prev.images, ...previews],
      }));
    } else setForm({ ...form, [name]: value });
  };

  const removeImage = (index) => {
    setForm(prev => {
      const newImages = [...prev.images];
      const newFiles = [...prev.imageFiles];
      if (index >= prev.images.length - prev.imageFiles.length) {
        newFiles.splice(index - (prev.images.length - prev.imageFiles.length), 1);
      }
      newImages.splice(index, 1);
      return { ...prev, images: newImages, imageFiles: newFiles };
    });
    if (selectedImageIndex >= form.images.length - 1) setSelectedImageIndex(0);
  };

  const toggleStore = (storeId) => {
    setForm(prev => ({
      ...prev,
      storeIds: prev.storeIds.includes(storeId)
        ? prev.storeIds.filter(id => id !== storeId)
        : [...prev.storeIds, storeId],
    }));
  };

  const updateInventoryField = (storeId, field, value) => {
    setInventoryData(prev =>
      prev.map(inv =>
        inv.storeId === storeId ? { ...inv, [field]: value } : inv
      )
    );
  };

  const addAttribute = () => setForm(prev => ({ ...prev, attributes: [...prev.attributes, { option: "", value: "" }] }));
  const updateAttribute = (i, field, value) => setForm(prev => {
    const updated = [...prev.attributes];
    updated[i][field] = value;
    return { ...prev, attributes: updated };
  });
  const removeAttribute = (i) => setForm(prev => {
    const updated = [...prev.attributes];
    updated.splice(i, 1);
    return { ...prev, attributes: updated };
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();

    const existingImages = form.images
      .filter((img, idx) => idx < form.images.length - form.imageFiles.length) // only existing ones
      .map(img => img.replace(LOCAL_URL, "")); 
    formData.append("images", JSON.stringify(existingImages)); 

    form.imageFiles.forEach(file => formData.append("images", file));

    Object.keys(form).forEach((key) => {
      if (["images", "imageFiles", "storeIds", "attributes"].includes(key)) return;

      formData.append(key, form[key]);
    });

    const attrObj = {};
    form.attributes.forEach(a => { if(a.option) attrObj[a.option] = a.value; });
    formData.append("attributes", JSON.stringify(attrObj));

    form.storeIds.filter(id => id).forEach(id => formData.append("storeId", id));

    await axios.put(`${LOCAL_URL}api/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    toast.success("Product updated!");
    router.push("/dashboard/products");

  } catch (err) {
    console.error(err.response?.data || err);
    toast.error(err.response?.data?.message || "Failed to update product");
  } finally {
    setLoading(false);
  }
};

  if (loading) return <p className="text-center mt-4 text-gray-500">Loading...</p>;

  return (
    <div className="w-full bg-gray-100 min-h-screen p-4 flex justify-center">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-6xl p-6 space-y-6">
        <h1 className="text-2xl font-bold border-b pb-3">Edit Product</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            {/* Product Name */}
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <label className="block font-medium mb-1">Product Name</label>
              <input type="text" name="productName" value={form.productName} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500" required />
            </div>

            {/* Category & Brand */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <label className="block font-medium mb-1">Category</label>
                <select name="categoryId" value={form.categoryId} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.categoryName}</option>)}
                </select>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <label className="block font-medium mb-1">Brand</label>
                <select name="brandId" value={form.brandId} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                  <option value="">Select Brand</option>
                  {brands.map(b => <option key={b._id} value={b._id}>{b.brandName}</option>)}
                </select>
              </div>
            </div>

            {/* Attributes */}
            <div className="p-4 bg-white rounded-lg shadow-sm space-y-2">
              <label className="block font-medium mb-1">Attributes</label>
              {form.attributes.map((attr, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="text" placeholder="Option" value={attr.option} onChange={(e) => updateAttribute(i, "option", e.target.value)} className="border px-2 py-1 rounded w-32"/>
                  <input type="text" placeholder="Value" value={attr.value} onChange={(e) => updateAttribute(i, "value", e.target.value)} className="border px-2 py-1 rounded w-32"/>
                  <button type="button" onClick={() => removeAttribute(i)} className="text-red-500 font-bold">×</button>
                </div>
              ))}
              <button type="button" onClick={addAttribute} className="text-blue-500 mt-2">+ Add Attribute</button>
            </div>

            {/* Keywords */}
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <label className="block font-medium mb-1">Keywords</label>
              <input type="text" name="keywords" value={form.keywords} onChange={handleChange} placeholder="Comma separated" className="w-full border rounded px-3 py-2"/>
            </div>

            {/* Display */}
            <div className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-between">
              <span className="font-medium">Display in Store</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={form.display} onChange={handleChange} name="display"/>
                <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative transition">
                  <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${form.display ? "translate-x-6" : "translate-x-0"}`} />
                </div>
              </label>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => router.push("/dashboard/products")} className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update </button>
            </div>
          </form>

          {/* Right Images */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="h-96 relative flex items-center justify-center overflow-hidden">
              {form.images.length > 0 ? (
                <>
                  <img src={form.images[selectedImageIndex]} className="w-full h-full object-cover rounded-xl shadow-lg" alt="Product" />
                  <button type="button" onClick={() => removeImage(selectedImageIndex)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow">×</button>
                  {form.images.length > 1 && (
                    <>
                      <button type="button" onClick={() => setSelectedImageIndex(prev => prev === 0 ? form.images.length - 1 : prev - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full w-8 h-8 flex items-center justify-center shadow">‹</button>
                      <button type="button" onClick={() => setSelectedImageIndex(prev => prev === form.images.length - 1 ? 0 : prev + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full w-8 h-8 flex items-center justify-center shadow">›</button>
                    </>
                  )}
                </>
              ) : <span className="text-gray-400">No Image</span>}
            </div>
            <label className="mt-3 w-16 h-16 border border-dashed rounded flex items-center justify-center cursor-pointer text-gray-400 shadow">
              +
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleChange} />
            </label>
          </div>
        </div>
{/* Inventory Table */}
<div className="overflow-x-auto mt-6">
  <table className="w-full border rounded-lg text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2 border-b">Select</th>
        <th className="px-4 py-2 border-b text-left">Branch - Store</th>
        <th className="px-4 py-2 border-b text-left">Stock</th>
        <th className="px-4 py-2 border-b text-left">Price</th>
        <th className="px-4 py-2 border-b text-left">Low Stock</th>
      </tr>
    </thead>
    <tbody>
      {branches.flatMap((branch) =>
        branch.stores.map((store, i) => {
          // Find inventory for this branch
          const inv = inventoryData.find(item => item.branchId === branch._id);

          // If inventory exists for this branch, disable editing
          const hasInventory = !!inv;

          return (
            <tr
              key={store._id}
              className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
            >
              <td className="px-4 py-2 border-b text-center">
                <input
                  type="checkbox"
                  checked={form.storeIds.includes(store._id)}
                  disabled={hasInventory} // Cannot select if inventory exists
                  onChange={() => toggleStore(store._id)}
                />
              </td>
              <td className="px-4 py-2 border-b">{branch.branchName} - {store.name}</td>
              
              <td className="px-4 py-2 border-b">
                <input
                  type="number"
                  disabled={hasInventory || !form.storeIds.includes(store._id)}
                  className="w-24 border rounded px-2 py-1 disabled:bg-gray-100"
                  value={inv?.quantity ?? ""}
                  onChange={(e) => updateInventoryField(store._id, "quantity", Number(e.target.value))}
                />
              </td>

              <td className="px-4 py-2 border-b">
                <input
                  type="number"
                  disabled={hasInventory || !form.storeIds.includes(store._id)}
                  className="w-24 border rounded px-2 py-1 disabled:bg-gray-100"
                  value={inv?.price ?? ""}
                  onChange={(e) => updateInventoryField(store._id, "price", Number(e.target.value))}
                />
              </td>

              <td className="px-4 py-2 border-b">
                <input
                  type="number"
                  disabled={hasInventory || !form.storeIds.includes(store._id)}
                  className="w-28 border rounded px-2 py-1 disabled:bg-gray-100"
                  value={inv?.lowStockThreshold ?? ""}
                  onChange={(e) => updateInventoryField(store._id, "lowStockThreshold", Number(e.target.value))}
                />
              </td>
            </tr>
          );
        })
      )}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
}
