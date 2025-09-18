"use client";

import { useState, useEffect, useRef } from "react";
import BaseModal from "@/components/modals/BaseModal";
import UnassignedIcon from "@/icons/unassigned-icon.svg";
import SearchIcon from "@/icons/search-icon.svg";

export default function AddMoreInfoModal({ onClose }) {
  const initialLabels = [
    "Develop",
    "Moda",
    "Urgent",
    "Moderate",
    "Trivial",
    "Tag Name here",
    "Vibe",
    "Priority",
    "B&B",
    "Activity",
    "Trip Inspiration",
    "SOTA",
    "High-End",
  ];

  const [allLabels, setAllLabels] = useState(initialLabels);
  const [variant, setVariant] = useState("default");
  const [labelInput, setLabelInput] = useState("");
  const [labels, setLabels] = useState([]);
  const [memo, setMemo] = useState("");
  const [project, setProject] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleFocus = () => {
    if (!labelInput) {
      setVariant("labelSearch");
      setDropdownOpen(true);
    }
  };

  const handleLabelChange = (val) => {
    setLabelInput(val);

    if (val.length === 0) {
      setVariant("labelSearch");
      setDropdownOpen(true);
      return;
    }

    const filtered = allLabels.filter(
      (l) =>
        l.toLowerCase().includes(val.toLowerCase()) &&
        !labels.includes(l)
    );

    if (filtered.length > 0) {
      setVariant("labelResults");
    } else {
      setVariant("createLabel");
    }
    setDropdownOpen(true);
  };

  const handleAddLabel = (tag) => {
    if (!labels.includes(tag)) {
      setLabels([...labels, tag]);
    }
    setLabelInput("");
    setVariant("withAllInputs");
    setDropdownOpen(false);
  };

  const handleCreateLabel = () => {
    const newLabel = labelInput.trim();
    if (newLabel) {
      if (!allLabels.includes(newLabel)) {
        setAllLabels([...allLabels, newLabel]);
      }
      handleAddLabel(newLabel);
    }
  };

  const filteredLabels = allLabels.filter(
    (l) =>
      l.toLowerCase().includes(labelInput.toLowerCase()) &&
      !labels.includes(l)
  );

  return (
    <BaseModal onClose={onClose}>
      <div
        className="w-[600px] max-w-full rounded-2xl bg-white p-6 flex flex-col gap-6 relative"
        ref={dropdownRef}
      >
        {/* Header */}
        <div>
          <b className="text-[18px] text-black tracking-[-0.01em]">
            Add more information
          </b>
        </div>
        <div className="border-t border-gray-200" />

        {/* ---------------- LABEL ---------------- */}
        <div className="flex flex-col gap-3">
          <div className="text-base font-medium">
            <b>Label </b>
            <span className="text-gray-500 text-sm">(Optional)</span>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for label"
              value={labelInput}
              onFocus={handleFocus}
              onChange={(e) => handleLabelChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && variant === "createLabel") {
                  handleCreateLabel();
                }
              }}
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {labels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {labels.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm bg-white"
                >
                  {tag}
                  <span
                    className="cursor-pointer text-gray-500"
                    onClick={() =>
                      setLabels(labels.filter((lbl) => lbl !== tag))
                    }
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Dropdowns */}
          {dropdownOpen && variant === "labelSearch" && (
            <Dropdown
              title="Recently Used"
              items={allLabels.slice(0, 6).filter((l) => !labels.includes(l))}
              onSelect={handleAddLabel}
            />
          )}

          {dropdownOpen && variant === "labelResults" && (
            <Dropdown
              title="Search Results"
              items={filteredLabels}
              onSelect={handleAddLabel}
            />
          )}

          {dropdownOpen && variant === "createLabel" && (
            <div className="absolute top-[180px] left-6 right-6 rounded-lg bg-violet-100 p-4 shadow-md text-sm text-gray-700">
              <div className="font-medium mb-2">Create</div>
              <div
                className="inline-flex items-center rounded-full border px-3 py-1 text-gray-800 bg-white mb-3 cursor-pointer"
                onClick={handleCreateLabel}
              >
                {labelInput}
              </div>
              <div className="font-medium mb-1">Search Results</div>
              <div className="text-black">No Results</div>
            </div>
          )}
        </div>

        {/* ---------------- MEMO ---------------- */}
        <div className="flex flex-col gap-3">
          <div className="text-base font-medium">
            <b>Memo </b>
            <span className="text-gray-500 text-sm">(Optional)</span>
          </div>
          <textarea
            placeholder="type your memo here"
            value={memo}
            onChange={(e) => {
              setMemo(e.target.value);
              setVariant("withAllInputs");
            }}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* ---------------- PROJECT ---------------- */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <span className="text-base font-medium">
              <b>Select a Project </b>
              <span className="text-gray-500 text-sm">(Optional)</span>
            </span>
            <span className="text-gray-500 text-sm">
              Please enter a project where this item will be included.
            </span>
          </div>
          <div className="relative">
            <UnassignedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for project"
              value={project}
              onChange={(e) => {
                setProject(e.target.value);
                setVariant("withAllInputs");
              }}
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* ---------------- FOOTER ---------------- */}
        <div className="flex justify-end gap-3">
          <button className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-sm text-gray-800">
            Skip
          </button>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-sm text-white">
            Save
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

/* Dropdown Component */
function Dropdown({ title, items, onSelect }) {
  return (
    <div className="absolute top-[180px] left-6 right-6 rounded-lg bg-violet-100 p-4 shadow-md text-sm text-gray-700">
      <div className="mb-2 font-medium">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <div
            key={item}
            className="cursor-pointer rounded-full border px-3 py-1 text-sm bg-white text-gray-800 hover:bg-gray-100"
            onClick={() => onSelect(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
