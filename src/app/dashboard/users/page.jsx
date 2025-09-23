"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [storeFilter, setStoreFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://192.168.1.24:5000/api/users/getdata");
        setUsers(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter users
  const filteredUsers = users.filter(u => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      u.name?.toLowerCase().includes(search) ||
      u.surname?.toLowerCase().includes(search) ||
      u.email?.toLowerCase().includes(search) ||
      u.branch?.branchName?.toLowerCase().includes(search);

    const matchesStore = storeFilter ? u.branch?.branchName === storeFilter : true;

    return matchesSearch && matchesStore;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIdx, startIdx + rowsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Users List</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name, email or branch..."
          className="border px-3 py-2 rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />

        <select
          className="border px-3 py-2 rounded w-full md:w-1/4"
          value={storeFilter}
          onChange={(e) => { setStoreFilter(e.target.value); setCurrentPage(1); }}
        >
          <option value="">All Stores</option>
          {[...new Set(users.map(u => u.branch?.branchName).filter(Boolean))].map((b, i) => (
            <option key={i} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm border-b border-gray-300">
            <thead>
              <tr>
                {["Name","Surname","Email","Branch","Stores","Points","Order Count","Total Order","Last Order Date","Nationality","Actions"].map(col => (
                  <th key={col} className="px-3 py-2 border-b">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-3">No users found</td>
                </tr>
              ) : paginatedUsers.map(u => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">{u.name}</td>
                  <td className="px-3 py-2 border-b">{u.surname}</td>
                  <td className="px-3 py-2 border-b">{u.email}</td>
                  <td className="px-3 py-2 border-b">{u.branch?.branchName || "N/A"}</td>
                  <td className="px-3 py-2 border-b">{u.branch?.stores?.map(s => s.name).join(", ") || "N/A"}</td>
                  <td className="px-3 py-2 border-b">{u.points}</td>
                  <td className="px-3 py-2 border-b">{u.orderCount}</td>
                  <td className="px-3 py-2 border-b">{u.totalOrderAmount}</td>
                  <td className="px-3 py-2 border-b">{new Date(u.lastOrderDate)?.toLocaleDateString() || "-"}</td>
                  <td className="px-3 py-2 border-b">{u.nationality}</td>
                  <td className="px-3 py-2 border-b">
                    <button className="px-3 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 flex items-center gap-2 text-xs md:text-sm">
                      <FiEdit /> Orders
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Rows per page: 
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="ml-2 border px-2 py-1 rounded"
          >
            {[10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="flex gap-2">
          <button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)} className="px-3 py-1 border rounded">Prev</button>
          {Array.from({length: totalPages}, (_,i)=>i+1)
            .filter(p=>p===currentPage||p===currentPage-1||p===currentPage+1)
            .map(p=>(
              <button key={p} onClick={()=>setCurrentPage(p)} 
                className={`px-3 py-1 border rounded ${currentPage===p?"bg-cyan-600 text-white":""}`}>
                {p}
              </button>
            ))}
          <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
