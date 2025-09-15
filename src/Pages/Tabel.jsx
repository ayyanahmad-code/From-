  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchComments } from "../redux/actions/authActions";
  import { Button } from "@material-tailwind/react";
  import { useNavigate } from "react-router-dom";



  export default function CommentsTable() {
    const dispatch = useDispatch();
    const { comments, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    // Fetch data once
    useEffect(() => {
      if (!comments.length) dispatch(fetchComments());
    }, [dispatch, comments.length]);

    // Filter comments based on search term
    const filteredComments = comments.filter(
      (c) =>
        c.id.toString().includes(searchTerm) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.body.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort filtered comments
    const sortedComments = [...filteredComments].sort((a, b) => {
      if (sortField === "id") {
        return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
      } else {
        return sortOrder === "asc"
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
    });

    // Pagination logic
    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentComments = sortedComments.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredComments.length / recordsPerPage);

    // Sort handler
    const handleSort = (field) => {
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
      setCurrentPage(1); // reset to first page
    };

    return (
      <div className="p-4">
    <h1 className="text-xl font-bold mb-4 text-center">Comments Table</h1>



        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by ID, Name, Email, Comment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full max-w-sm"
          />

          {/* Rows selector */}
          <div>
            <label className="mr-2 font-medium">Rows per page:</label>
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
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    ID {sortField === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => handleSort("email")}
                  >
                    Email {sortField === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th className="border p-2">Comment</th>
                </tr>
              </thead>
              <tbody>
                {currentComments.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-100">
                    <td className="border p-2">{c.id}</td>
                    <td className="border p-2">{c.name}</td>
                    <td className="border p-2">{c.email}</td>
                    <td className="border p-2">{c.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>

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

                if (endPage - startPage < 4) {
                  startPage = Math.max(endPage - 4, 1);
                }

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
                  if (startPage > 2) pageNumbers.push(<span key="dots-start">...</span>);
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
                  if (endPage < totalPages - 1) pageNumbers.push(<span key="dots-end">...</span>);
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>

              {/* Navigation Button to Tabel2 */}
   <div className="w-full max-w-5xl flex justify-end mb-2">
  <button
    onClick={() => navigate("/Tabel2")}
    className="py-1 px-3 bg-blue-500 text-white rounded-md text-sm"
  >
    Go to Table 2
  </button>
</div>


                
            </div>
          </>
        )}
      </div>
    );
  }
