import React, { useEffect, useState } from "react";

export default function CommentsTable() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch comments API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data.slice(0, 1000)); // limit to first 1000 comments
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        setLoading(false);
      });
  }, []);

  // Filtered data
  const filteredComments = comments.filter(
    (c) =>
      c.id.toString().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages =
    recordsPerPage === "all"
      ? 1
      : Math.ceil(filteredComments.length / recordsPerPage);

  const indexOfLast =
    recordsPerPage === "all" ? filteredComments.length : currentPage * recordsPerPage;
  const indexOfFirst = recordsPerPage === "all" ? 0 : indexOfLast - recordsPerPage;
  const currentComments =
    recordsPerPage === "all"
      ? filteredComments
      : filteredComments.slice(indexOfFirst, indexOfLast);

  // Generate visible page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(totalPages, maxVisible);
    }
    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - (maxVisible - 1));
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Comments Table
        </h2>

        {/* Search (left) + Dropdown (right) */}
        <div className="flex justify-between items-center mb-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by ID, name, email, or comment..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Dropdown */}
          <select
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(
                e.target.value === "all" ? "all" : parseInt(e.target.value)
              );
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={70}>70</option>
            <option value="all">All</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading comments...</p>
        ) : (
          <>
            <table className="w-full border border-gray-300 text-left text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 border border-gray-300">ID</th>
                  <th className="p-3 border border-gray-300">Name</th>
                  <th className="p-3 border border-gray-300">Email</th>
                  <th className="p-3 border border-gray-300">Comment</th>
                </tr>
              </thead>
              <tbody>
                {currentComments.map((comment) => (
                  <tr
                    key={comment.id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-3 border border-gray-300">{comment.id}</td>
                    <td className="p-3 border border-gray-300">{comment.name}</td>
                    <td className="p-3 border border-gray-300 text-blue-600">
                      {comment.email}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {comment.body}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Records info + Pagination in one row */}
            <div className="flex justify-between items-center mt-4">
              {/* Records info (left) */}
              <p className="text-gray-600 text-sm">
                Showing{" "}
                {filteredComments.length === 0 ? 0 : indexOfFirst + 1} –{" "}
                {Math.min(indexOfLast, filteredComments.length)} of{" "}
                {filteredComments.length}
              </p>

              {/* Pagination (center) */}
              <div className="flex justify-center flex-1 gap-2">
                <button
                  className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                {/* First Page */}
                {getPageNumbers()[0] > 1 && (
                  <>
                    <button
                      className={`px-3 py-1 rounded ${
                        currentPage === 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => setCurrentPage(1)}
                    >
                      1
                    </button>
                    <span>...</span>
                  </>
                )}

                {/* Middle Pages */}
                {getPageNumbers().map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`px-3 py-1 rounded ${
                      currentPage === num
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}

                {/* Last Page */}
                {getPageNumbers().slice(-1)[0] < totalPages && (
                  <>
                    <span>...</span>
                    <button
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
