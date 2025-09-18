"use client";

import React from "react";
import BookmarkCard from "./BookmarkCard";

const BookmarksGalleryView = ({ bookmarks = [] }) => {
  // Group bookmarks by type
  const groupedBookmarks = bookmarks.reduce((groups, bookmark) => {
    const type = bookmark.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(bookmark);
    return groups;
  }, {});

  const getTypeDisplayName = (type) => {
    switch (type) {
      case "Space / Team":
        return "Space";
      case "Space / Private":
        return "Space";
      default:
        return type;
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "project":
        return (
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "space / private":
      case "space / team":
        return (
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-12">
        <div className="flex flex-col items-center text-center">
          <svg
            className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4"
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
          <p className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No bookmarks found
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Get started by creating your first bookmark
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-b-lg border-b border-gray-200 overflow-hidden">
      {Object.entries(groupedBookmarks).map(([type, items], groupIndex) => (
        <div
          key={type}
          className={groupIndex > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}
        >
          {/* Section Header */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-2">
              {getTypeIcon(type)}
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {getTypeDisplayName(type)}
              </h2>
              <button className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((bookmark, index) => (
                <BookmarkCard key={bookmark.id || index} item={bookmark} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarksGalleryView;
