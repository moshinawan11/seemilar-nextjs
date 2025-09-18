import React from "react";
import BookmarksHeader from "../../../components/bookmarks/BookmarksHeader";
import BookmarksTable from "../../../components/bookmarks/BookmarksTable";

const BookmarksPage = () => {
  // Sample data to match the design
  const sampleBookmarks = [
    {
      id: 1,
      type: "Project",
      name: "Project 1",
      createdAt: "2025-01-09T03:00:00Z",
      editedAt: "2025-01-09T03:00:00Z",
      editedBy: "Alex Ray",
      owner: "Heavy User",
    },
    {
      id: 2,
      type: "Project",
      name: "Marketing References",
      createdAt: "2025-01-09T03:00:00Z",
      editedAt: "2025-01-09T03:00:00Z",
      editedBy: "Bruce Choi",
      owner: "jaeyoung",
    },
    {
      id: 3,
      type: "Project",
      name: "SaaS SNS Tutorials",
      createdAt: "2025-01-09T03:00:00Z",
      editedAt: "2025-01-09T03:00:00Z",
      editedBy: "Minsu Kim",
      owner: "Alex Ray",
    },
    {
      id: 4,
      type: "Project",
      name: "Beauty Products",
      createdAt: "2025-01-09T03:00:00Z",
      editedAt: "2025-01-09T03:00:00Z",
      editedBy: "Jiwon Jeong",
      owner: "Garone",
    },
    {
      id: 5,
      type: "Project",
      name: "24 S/S Season - Tom Ford",
      createdAt: "2025-01-09T03:00:00Z",
      editedAt: "2025-01-09T03:00:00Z",
      editedBy: "Heavy User",
      owner: "Heavy User",
    },
    {
      id: 6,
      type: "Space / Private",
      name: "Private Space 1",
      createdAt: "2025-01-09T03:00:00Z",
      editedAt: "2025-01-09T03:00:00Z",
      editedBy: "Alex Ray",
      owner: "jaeyoung",
    },
    {
      id: 7,
      type: "Space / Private",
      name: "Private Space 2",
      createdAt: "2025-01-09T03:00:00Z",
      editedAt: "2025-01-09T03:00:00Z",
      editedBy: "Bruce Choi",
      owner: "Alex Ray",
    },
    {
      id: 8,
      type: "Space / Team",
      name: "Team Space 1",
      createdAt: "2025-01-09T03:00:00Z",
      editedAt: "2025-01-09T03:00:00Z",
      editedBy: "Minsu Kim",
      owner: "Garone",
    },
    {
      id: 9,
      type: "Space / Team",
      name: "Team Space 2",
      createdAt: "2025-01-09T03:00:00Z",
      editedAt: "2025-01-09T03:00:00Z",
      editedBy: "Jiwon Jeong",
      owner: "Heavy User",
    },
    {
      id: 10,
      type: "Space / Team",
      name: "Team Space 3",
      createdAt: "2025-01-09T03:00:00Z",
      editedAt: "2025-01-09T03:00:00Z",
      editedBy: "Heavy User",
      owner: "Heavy User",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BookmarksHeader />
        <BookmarksTable bookmarks={sampleBookmarks} />
      </div>
    </div>
  );
};

export default BookmarksPage;
