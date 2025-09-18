"use client";

import React, { useState } from "react";
import BookmarkRow from "./BookmarkRow";

const BookmarksTableView = ({ bookmarks = [] }) => {
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return (
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }

    return sortDirection === "asc" ? (
      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort("type")}
                className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider hover:text-gray-700 dark:hover:text-gray-200"
              >
                Type
                <SortIcon field="type" />
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort("name")}
                className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider hover:text-gray-700 dark:hover:text-gray-200"
              >
                Name
                <SortIcon field="name" />
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort("createdAt")}
                className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider hover:text-gray-700 dark:hover:text-gray-200"
              >
                Created At
                <SortIcon field="createdAt" />
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort("editedAt")}
                className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider hover:text-gray-700 dark:hover:text-gray-200"
              >
                Edited At
                <SortIcon field="editedAt" />
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort("owner")}
                className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider hover:text-gray-700 dark:hover:text-gray-200"
              >
                Owner
                <SortIcon field="owner" />
              </button>
            </th>
            <th className="px-4 py-3 text-right">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"></span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark, index) => (
              <BookmarkRow key={bookmark.id || index} item={bookmark} />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                <div className="flex flex-col items-center">
                  <svg
                    className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <p className="text-lg font-medium mb-1">No bookmarks found</p>
                  <p className="text-sm">Get started by creating your first bookmark</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookmarksTableView;
