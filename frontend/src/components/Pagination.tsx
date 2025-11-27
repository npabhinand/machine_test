import React from "react";
import type { PaginationProps } from "../types";

const Pagination: React.FC<PaginationProps> = ({
    setCurrentPage,
    currentPage,
    itemsPerPage,
    data,
    totalPages
}) => {

    // Generate the page numbers with ellipsis logic
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 3;

        // Always show the first page
        if (currentPage > 2) pages.push(1);

        // Show left ellipsis
        if (currentPage > 3) pages.push("...");

        // Adjacent pages
        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 1);

        for (let i = start; i <= end; i++) pages.push(i);

        // Show right ellipsis
        if (currentPage < totalPages - 2) pages.push("...");

        // Always show the last page
        if (currentPage < totalPages - 1) pages.push(totalPages);

        return pages;
    };

    return (
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Showing results text */}
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                    <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, data?.total || 0)}
                    </span>{" "}
                    of <span className="font-medium">{data?.total || 0}</span> results
                </div>

                {/* Pagination Buttons */}
                <div className="flex gap-2 items-center">

                    {/* Previous Button */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Previous
                    </button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((p, idx) => (
                        <button
                            key={idx}
                            disabled={p === "..."}
                            onClick={() => typeof p === "number" && setCurrentPage(p)}
                            className={`px-3 py-2 border rounded-lg 
                                ${p === currentPage ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 hover:bg-gray-100"} 
                                ${p === "..." ? "cursor-default opacity-60" : ""}`}
                        >
                            {p}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
