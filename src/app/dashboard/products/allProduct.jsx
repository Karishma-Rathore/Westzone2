'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { LOCAL_URL } from "../../../../API_URL";


export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${LOCAL_URL}api/products`)
      setProducts(res.data.items || []);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${LOCAL_URL}api/products/delete/${productId}`);
      toast.success("Product deleted successfully");
      fetchProducts(); 
    } catch (err) {
      console.error("Failed to delete product", err);
      toast.error("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };


  if (loading) return <p className="p-4 text-gray-600">Loading products...</p>;

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products Dashboard</h1>
        <Link href="/dashboard/products/add-product">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Add Product
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0">
            <tr>
              <th className="px-4 py-3 text-gray-1000 text-base">Name</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Barcode</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Category</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Price</th>
                            <th className="px-4 py-3 text-gray-1000 text-base">Quantity</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Stock</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Display</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Created At</th>
              <th className="px-4 py-3 text-gray-1000 text-base">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2 font-medium">{product.productName}</td>
                <td className="px-4 py-2">{product.barcode}</td>
                <td className="px-4 py-2">{product.categoryId}</td>
                <td className="px-4 py-2">{product.basePrice}</td>
                <td className="px-4 py-2">{product.Quantity}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">{product.display ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{new Date(product.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 flex space-x-2">
             <Link href={"/edit-product"}>  <button
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button></Link>   
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
        
    </div>
  );
}
