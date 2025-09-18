"use client";

import React, { useState, useRef, useEffect } from "react";

const BookmarkCard = ({ item }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "project":
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "space / private":
        return (
          <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "space / team":
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const getUserAvatar = (userName) => {
    // Create different colored avatars based on username
    const colors = [
      "from-blue-400 to-blue-600",
      "from-green-400 to-green-600",
      "from-purple-400 to-purple-600",
      "from-pink-400 to-pink-600",
      "from-indigo-400 to-indigo-600",
      "from-red-400 to-red-600",
      "from-yellow-400 to-yellow-600",
      "from-teal-400 to-teal-600",
    ];
    const colorIndex = userName.length % colors.length;

    return (
      <div
        className={`w-8 h-8 bg-gradient-to-br ${colors[colorIndex]} rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white dark:border-gray-800`}
      >
        {userName.charAt(0).toUpperCase()}
      </div>
    );
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} months ago`;
    }
  };

  // Sample member data for demo
  const getMemberCount = () => {
    return Math.floor(Math.random() * 6) + 2; // 2-7 members
  };

  const getRandomMembers = () => {
    const allMembers = [
      "Heavy User",
      "Alex Ray",
      "jaeyoung",
      "Bruce Choi",
      "Minsu Kim",
      "Jiwon Jeong",
      "Garone",
    ];
    const memberCount = getMemberCount();
    const shuffled = allMembers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, memberCount);
  };

  const members = getRandomMembers();

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      {/* Header with Icon and More Options */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getTypeIcon(item.type)}
          <span className="text-sm text-gray-600 dark:text-gray-400">{item.owner}</span>
        </div>

        {/* Bookmark and More Options */}
        <div className="flex items-center gap-1">
          <button className="p-1 text-gray-400 hover:text-yellow-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 top-6 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Move
                  </button>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{item.name}</h3>

      {/* Last Edited */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Edited {formatTimeAgo(item.editedAt)}
      </p>

      {/* Preview Images Area */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-32 mb-4 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-1 w-full h-full p-2">
          <div className="bg-gray-200 dark:bg-gray-600 rounded"></div>
          <div className="bg-gray-200 dark:bg-gray-600 rounded"></div>
          <div className="bg-gray-200 dark:bg-gray-600 rounded"></div>
          <div className="bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Members */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Members:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {members.length}
          </span>
        </div>

        <div className="flex items-center -space-x-2">
          {members.slice(0, 3).map((member, index) => (
            <div key={index} className="relative">
              {getUserAvatar(member)}
            </div>
          ))}
          {members.length > 3 && (
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800">
              +{members.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
