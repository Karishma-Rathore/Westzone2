"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { LOCAL_URL } from "../../../../API_URL";

export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${LOCAL_URL}api/products`);
      const data = await res.json();
      setProducts(data.items || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      await fetch(`${LOCAL_URL}api/products/delete/${deleteId}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p._id !== deleteId));
      toast.success("Product deleted successfully");
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const handleToggleDisplay = async (productId, value) => {
    try {
      const res = await fetch(`${LOCAL_URL}api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ display: value }),
      });
      if (!res.ok) throw new Error("Failed to update display status");

      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? { ...p, display: value } : p))
      );
      toast.success("Display status updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update display status");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Products Dashboard</h1>

      {/* ADD PRODUCT BUTTON */}
      <div className="flex justify-end mb-4">
        <Link
          href="/dashboard/products/add-product"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* PRODUCTS TABLE */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden h-[75vh]">
        <div className="overflow-y-auto h-full">
          <table className="w-full text-sm border-collapse">
            {/* TABLE HEADER */}
            <thead className="bg-gray-900 text-white sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Barcode</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-center">Display</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY with STRIPED ROWS */}
            <tbody>
              {filteredProducts.map((p, index) => (
                <tr
                  key={p._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-b hover:bg-gray-100`}
                >
                  <td className="px-4 py-3">{p.productName}</td>
                  <td className="px-4 py-3">{p.barcode}</td>
                  <td className="px-4 py-3">{p.categoryId}</td>
                  <td className="px-4 py-3">{p.basePrice}</td>
                  <td className="px-4 py-3">{p.Quantity}</td>
                  <td className="px-4 py-3">{p.stock}</td>

                  {/* iOS Toggle Switch */}
                  <td className="px-4 py-3 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={p.display}
                        onChange={(e) =>
                          handleToggleDisplay(p._id, e.target.checked)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>
                      <div
                        className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                          p.display ? "translate-x-5" : ""
                        }`}
                      ></div>
                    </label>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/products/${p._id}`}
                        className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition text-sm"
                      >
                        ✏ Edit
                      </Link>
                      <button
                        onClick={() => setDeleteId(p._id)}
                        className="px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition text-sm"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE MODAL */}
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
              <p>Are you sure you want to delete this product?</p>
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
