import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../redux/actions/authActions";

export default function CommentsTableWithAlias() {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // alias map: what UI clicks vs. actual object keys
  const sortAliases = {
    id: "id",
    alias: "alias",
    name: "name",
    email: "email",
  };

  // Fetch data once
  useEffect(() => {
    if (!comments.length) dispatch(fetchComments());
  }, [dispatch, comments.length]);

  // 🔍 Filter comments only by name
  const filteredComments = comments.filter((c) => {
    const term = searchTerm.toLowerCase();
    return c.name && c.name.toLowerCase().indexOf(term) !== -1;
  });

  // Sort filtered comments (with alias + direction)
  const sortedComments = [...filteredComments].sort((a, b) => {
    const direction = sortOrder === "asc" ? 1 : -1;

    if (sortField === "id") {
      return (a.id - b.id) * direction;
    } else {
      return a[sortField].localeCompare(b[sortField]) * direction;
    }
  });

  // Pagination
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentComments = sortedComments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredComments.length / recordsPerPage);

  // Sorting handler (with alias)
  const handleSort = (alias) => {
    const field = sortAliases[alias]; // translate alias → actual field

    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Rows per page handler
  const handleRowsChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Comments Table (Filter by Name Only)
      </h2>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 w-full max-w-5xl">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/2"
        />

        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <label className="font-medium">Rows per page:</label>
          <select
            value={recordsPerPage}
            onChange={handleRowsChange}
            className="p-2 border rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto w-full max-w-5xl">
            <table className="w-full border-collapse border border-gray-300 text-center">
              <thead>
                <tr>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    ID{" "}
                    {sortField === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => handleSort("alias")}
                  >
                    Alias{" "}
                    {sortField === "alias"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name{" "}
                    {sortField === "name"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => handleSort("email")}
                  >
                    Email{" "}
                    {sortField === "email"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                  <th className="border p-2">Comment</th>
                </tr>
              </thead>
              <tbody>
                {currentComments.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-100">
                    <td className="border p-2">{c.id}</td>
                    <td className="border p-2">{c.alias || "-"}</td>
                    <td className="border p-2">{c.name}</td>
                    <td className="border p-2">{c.email}</td>
                    <td className="border p-2">{c.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center gap-2 flex-wrap">
            {/* Prev button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {/* Page numbers (max 5 visible) */}
            {(() => {
              const pageNumbers = [];
              let startPage = Math.max(currentPage - 2, 1);
              let endPage = Math.min(startPage + 4, totalPages);
              if (endPage - startPage < 4) startPage = Math.max(endPage - 4, 1);

              if (startPage > 1) {
                pageNumbers.push(
                  <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === 1 ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    1
                  </button>
                );
                if (startPage > 2)
                  pageNumbers.push(<span key="dots-start">...</span>);
              }

              for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === i ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {i}
                  </button>
                );
              }

              if (endPage < totalPages) {
                if (endPage < totalPages - 1)
                  pageNumbers.push(<span key="dots-end">...</span>);
                pageNumbers.push(
                  <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === totalPages ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {totalPages}
                  </button>
                );
              }

              return pageNumbers;
            })()}

            {/* Next button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
