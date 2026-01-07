import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination Component
 * Displays pagination controls at the end of feed/content
 */
const Pagination = ({ 
    currentPage = 1, 
    totalPages = 10, 
    onPageChange = () => {},
    totalItems = 0,
    itemsPerPage = 5,
    isLoading = false
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="py-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                {/* Info Section */}
                <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Showing {startItem}-{endItem} of {totalItems} items
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Page {currentPage} of {totalPages}
                    </p>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    {/* Previous Button */}
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1 || isLoading}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            currentPage === 1 || isLoading
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white'
                        }`}
                        title="Previous page"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                        {getPageNumbers().map((page) => (
                            <button
                                key={page}
                                onClick={() => {
                                    onPageChange(page);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                disabled={isLoading}
                                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                                    page === currentPage
                                        ? 'bg-primary-600 text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                title={`Go to page ${page}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages || isLoading}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            currentPage === totalPages || isLoading
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white'
                        }`}
                        title="Next page"
                    >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {totalPages > 1 
                            ? `${totalPages} pages total • Jump to any page using the numbers above`
                            : 'All items displayed on this page'
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
