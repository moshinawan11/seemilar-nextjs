"use client";

import { useState } from "react";
import BaseModal from "./BaseModal";

import SearchIcon from "@/icons/search-icon.svg";
import ArrowDownIcon from "@/icons/arrow-down-icon.svg";
import FileIcon from "@/icons/file-icon.svg";
import UserIcon from "@/icons/users-icon.svg";
import DateIcon from "@/icons/date-icon.svg";

const dummyResults = [
  { id: 1, title: "First Project", createdBy: "Jane Doe", lastViewed: "5 minutes ago" },
  { id: 2, title: "Second Project", createdBy: "Matt Smith", lastViewed: "10 months ago" },
  { id: 3, title: "Title of Post", createdBy: "Matt Smith", lastViewed: "10 months ago" },
];

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const results =
    query.length > 0
      ? dummyResults.filter((r) =>
          r.title.toLowerCase().includes(query.toLowerCase())
        )
      : dummyResults;

  return (
    <BaseModal onClose={onClose}>
      <div className="w-[640px] p-6 pt-4">
        {/* Header */}
        <h2 className="text-[15px] font-medium text-[#110C22] mb-4 pb-2 border-b border-[#DEE3E7]">
          Search - Spaces / Projects / Items
        </h2>

        {/* Search bar */}
        <div className="flex items-center gap-2 px-3 py-2 border border-[#DEE3E7] rounded-lg bg-[#FCFCFC]">
          <SearchIcon className="text-[#667085]" />
          <input
            type="text"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-[13px] text-[#606368] bg-transparent focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="mt-5">
          <p className="text-[11px] font-medium text-[#8D8A95] mb-2">
            Filter results
          </p>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F6F6F6] text-[12px] font-semibold text-[#3B3C3F]">
              <DateIcon /> Date <ArrowDownIcon />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F6F6F6] text-[12px] font-semibold text-[#3B3C3F]">
              <UserIcon /> Created by <ArrowDownIcon />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F6F6F6] text-[12px] font-semibold text-[#3B3C3F]">
              <FileIcon /> Type <ArrowDownIcon />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mt-5">
          <p className="text-[11px] font-medium text-[#8D8A95] mb-2">
            {query ? "Results" : "Recent"}
          </p>
          <div className="flex flex-col gap-2">
            {results.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-2 p-2 rounded-lg hover:bg-[#F6F6F6] cursor-pointer"
              >
                <FileIcon className="text-[#667085]" />
                <div>
                  <p className="text-[13px] font-semibold text-[#3B3C3F]">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-[#98999B]">
                    Created by {item.createdBy} · Last viewed {item.lastViewed}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
