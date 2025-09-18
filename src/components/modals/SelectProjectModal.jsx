"use client";

import { useState } from "react";
import BaseModal from "./BaseModal";
import SearchIcon from "@/icons/search-icon.svg";
import ArrowRightIcon from "@/icons/arrow-right-icon.svg";

const tabs = ["Current Project", "Private Space", "Team Space"];

export default function SelectProjectModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("Current Project");
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [newProject, setNewProject] = useState("");

  return (
    <BaseModal onClose={onClose}>
      <div className="w-[600px] h-[554px] flex flex-col rounded-2xl bg-white p-6 shadow-[0px_4px_50px_rgba(33,33,33,0.08),0px_4px_6px_rgba(33,33,33,0.04)]">
        {/* Title */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[18px] font-semibold">Select Project</h2>
        </div>
        <div className="border-t border-[#efefef] mb-4"></div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="flex items-center bg-[#f0f0f0] border border-[#d5d7da] rounded-lg px-3 py-2 shadow-sm text-[#717680]">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for Project"
              className="ml-2 flex-1 bg-transparent text-[16px] focus:outline-none"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#d5d7da] mb-4 text-sm font-medium text-[#717680]">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`relative px-3 py-2 text-[14px] ${
                activeTab === tab ? "text-[#8b75ff]" : ""
              }`}
              onClick={() => {
                setActiveTab(tab);
                setSelectedSpace(null);
              }}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8b75ff]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "Current Project" && (
            <div role="table" className="w-full">
              {[
                { name: "Project 1", edited: "15 minutes ago" },
                { name: "Marketing References", edited: "3 days ago" },
                { name: "Beauty Products", edited: "7 days ago" },
                { name: "SaaS SNS Tutorials", edited: "1 month ago" },
                { name: "26 S/S Season - Tom Ford", edited: "9 months ago" },
              ].map((p) => (
                <div
                  key={p.name}
                  role="row"
                  className="grid grid-cols-[1fr_150px_150px] items-center py-3 text-sm"
                >
                  {/* Name */}
                  <div role="cell" className="font-medium truncate">
                    {p.name}
                  </div>

                  {/* Edited text */}
                  <div
                    role="cell"
                    className="text-xs text-[#afafaf] flex items-center"
                  >
                    Edited {p.edited}
                  </div>

                  {/* Action */}
                  <div role="cell" className="flex justify-end">
                    <button className="border border-[#6f6f6f] text-[#3d3d3d] px-4 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Private Space" && !selectedSpace && (
            <div role="table" className="w-full">
              {[
                { name: "Private Space 1", count: "6 Projects" },
                { name: "Private Space 2", count: "0 Projects" },
                { name: "Private Space 3", count: "2 Projects" },
                { name: "Private Space 4", count: "12 Projects" },
                { name: "Private Space 5", count: "3 Projects" },
              ].map((s) => (
                <div
                  key={s.name}
                  role="row"
                  className="grid grid-cols-[1fr_120px_120px] items-center py-3 text-sm cursor-pointer"
                  onClick={() => setSelectedSpace(s.name)}
                >
                  {/* Name */}
                  <div role="cell" className="font-medium truncate">
                    {s.name}
                  </div>

                  {/* Project count */}
                  <div
                    role="cell"
                    className="text-xs text-[#afafaf] flex items-center"
                  >
                    {s.count}
                  </div>

                  {/* Arrow */}
                  <div role="cell" className="flex justify-end">
                    <ArrowRightIcon />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Private Space" &&
            selectedSpace === "Private Space 1" && (
              <div className="space-y-4">
                <div className="bg-[#f1eeff] px-3 py-2 font-bold text-[#8b75ff] rounded">
                  Private Space 1
                </div>
                <div role="table" className="w-full">
                  {[
                    { name: "New Arrival", edited: "Created just now" },
                    { name: "Project 1", edited: "15 minutes ago" },
                    { name: "Marketing References", edited: "3 days ago" },
                    { name: "Beauty Products", edited: "7 days ago" },
                    { name: "SaaS SNS Tutorials", edited: "1 month ago" },
                    { name: "26 S/S Season - Tom Ford", edited: "9 months ago" },
                  ].map((p) => (
                    <div
                      key={p.name}
                      role="row"
                      className="grid grid-cols-[1fr_150px_90px] items-center py-3 border-b text-sm"
                    >
                      {/* Name */}
                      <div role="cell" className="font-medium truncate">
                        {p.name}
                      </div>

                      {/* Edited */}
                      <div
                        role="cell"
                        className="text-xs text-[#afafaf] flex items-center"
                      >
                        {p.edited}
                      </div>

                      {/* Action */}
                      <div role="cell" className="flex justify-end">
                        <button className="border border-[#6f6f6f] text-[#3d3d3d] px-4 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input + Button */}
                <div className="flex mt-4">
                  <input
                    type="text"
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    placeholder="Write New Project Name"
                    className="flex-1 border border-[#d5d7da] bg-[#f0f0f0] px-3 py-2 rounded-l-lg text-sm focus:outline-none"
                  />
                  <button className="bg-[#7357ff] text-white px-4 py-2 rounded-r-lg text-sm font-semibold">
                    Create New Project Here
                  </button>
                </div>
              </div>
            )}

          {activeTab === "Team Space" && (
            <div className="flex justify-center items-center h-full text-[#afafaf]">
              Team Space content here...
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
}
