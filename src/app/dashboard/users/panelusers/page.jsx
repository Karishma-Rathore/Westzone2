"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { LOCAL_URL } from "../../../../../API_URL";


export default function PanelUserPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [storeSearch, setStoreSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [users, setUsers] = useState([]); // backend se data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch backend data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${LOCAL_URL}api/users/getdata`); 
        // ✅ Populate branch data is already done in backend
        setUsers(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔹 Filter users dynamically (safe version)
  const filteredUsers = Array.isArray(users)
    ? users.filter((u) => {
        const term = searchTerm.toLowerCase();
        const storeMatch = storeSearch ? u?.branch?.name === storeSearch : true;

        return (
          storeMatch &&
          (u?.name?.toLowerCase().includes(term) ||
            u?.surname?.toLowerCase().includes(term) ||
            u?.email?.toLowerCase().includes(term) ||
            u?.branch?.name?.toLowerCase().includes(term))
        );
      })
    : [];

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIdx, startIdx + rowsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold text-gray-700 mb-4">User List</h1>

      {/* Loading & Error */}
      {loading && <p className="text-gray-500">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {/* Search + Actions */}
          <div className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <input
                type="text"
                placeholder="Search by name, email or branch..."
                className="border px-3 py-2 rounded w-full outline-none"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <select
                className="border px-3 py-2 rounded w-full outline-none"
                value={storeSearch}
                onChange={(e) => {
                  setStoreSearch(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Select Store...</option>
                {Array.isArray(users) &&
                  [...new Set(users.map(u => u?.branch?.name).filter(Boolean))].map((branch, i) => (
                    <option key={i} value={branch}>
                      {branch}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button className="border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">
                + New PanelUser
              </button>
              <button className="border px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white">
                🗑 Delete
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-500">
                  <th className="px-4 py-3 text-start">First Name</th>
                  <th className="px-4 py-3 text-start">Last Name</th>
                  <th className="px-4 py-3 text-start">Email</th>
                  <th className="px-4 py-3 text-start">Branch</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No data available.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((u, i) => (
                    <tr key={i} className="border-b border-gray-500 hover:bg-gray-50">
                      <td className="px-4 py-3">{u.name}</td>
                      <td className="px-4 py-3">{u.surname}</td>
                      <td className="px-4 py-3">{u.email}</td>
                      <td className="px-4 py-3">{u.branch|| "N/A"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm">Rows per page:</label>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded px-2 py-1"
              >
                {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === currentPage || p === currentPage - 1 || p === currentPage + 1)
                .map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-3 py-1 border rounded ${currentPage === p ? "bg-cyan-600 text-white" : "bg-white"}`}
                  >
                    {p}
                  </button>
                ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

            <div className="text-sm text-gray-600">
              {`Showing ${filteredUsers.length === 0 ? 0 : startIdx + 1} to ${Math.min(startIdx + rowsPerPage, filteredUsers.length)} of ${filteredUsers.length} entries`}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
