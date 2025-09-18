"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import LinkIcon from "@/icons/link-icon.svg";
import ImagesIcon from "@/icons/images-icon.svg";
import VideoIcon from "@/icons/video-icon.svg";
import ArrowDownIconSm from "@/icons/arrow-down-icon-sm.svg";
import SelectIcon from "@/icons/select-icon.svg";
import CrossIcon from "@/icons/cross-icon3.svg";
import { useModal } from "@/context/ModalContext";

const mockData = [
  {
    id: 1,
    inputType: "Link",
    dataType: "Social:Instagram",
    title: "X에서 Geoffrey Hinton...",
    description: "meta data from link ...",
    labels: "AI, Keywords for AI...",
    memo: "memo is created...",
    createdAt: "09/01/2025 | 03:00",
    images: ["/images/post-img1.jpg", "/images/post-img2.jpg"],
    editedAt: "09/01/2025",
  },
  {
    id: 2,
    inputType: "Image",
    dataType: "Image",
    title: "Web Application with...",
    description: "meta data from link ...",
    labels: "Application, Apps...",
    memo: "memo is created...",
    createdAt: "09/01/2025 | 03:00",
    images: ["/images/post-img3.jpg"],
    editedAt: "09/01/2025",
  },
  {
    id: 3,
    inputType: "Video",
    dataType: "Video",
    title: "Signal Processing (sci...)",
    description: "meta data from link ...",
    labels: "keyword, is more...",
    memo: "N/A",
    createdAt: "09/01/2025 | 03:00",
    images: ["/images/post-img4.jpg"],
    editedAt: "09/01/2025",
  },
];

export default function TableView() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { openModal } = useModal();

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  return (
    <div className="relative w-full bg-white">
      {/* Table Actions */}
      <div className="flex justify-end items-center mb-3">
        {selectedItems.length > 0 ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#0156D0] rounded-lg"
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                  selectedItems.length > 0
                    ? "bg-white border-white"
                    : "bg-transparent border-white"
                }`}
              >
                {selectedItems.length > 0 && (
                  <div className="w-2.5 h-0.5 bg-[#0156D0] rounded-sm" />
                )}
              </div>
              <span className="text-sm font-medium border-r border-[#FFFFFF80] pr-2">
                {selectedItems.length} items are selected
              </span>
              <ArrowDownIconSm className="w-3 h-3" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#0156D0] rounded-lg shadow-lg p-2 text-white z-50">
                <button
                  className="w-full text-left px-2 py-2 rounded hover:bg-[#F8F8F8] hover:text-[#4F4B5C]"
                  onClick={() =>
                    openModal("moveItems", { count: selectedItems.length })
                  }
                >
                  Move to
                </button>
                <button
                  className="w-full text-left px-2 py-2 mt-1 rounded hover:bg-[#F8F8F8] hover:text-[#4F4B5C]"
                  onClick={() =>
                    openModal("duplicateItems", { count: selectedItems.length })
                  }
                >
                  Duplicate to
                </button>
                <button
                  className="w-full text-left px-2 py-2 mt-1 rounded hover:bg-[#F8F8F8] hover:text-[#4F4B5C]"
                  onClick={() =>
                    openModal("deleteItems", { count: selectedItems.length })
                  }
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-[#0156D0] rounded-lg">
            <span className="text-sm font-medium border-r border-[#FFFFFF80] pr-2">
              Select Items
            </span>
            <ArrowDownIconSm className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#D9D8DC] rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-[#F3F1FD] text-[#4F4B5C] text-xs">
            <tr>
              <th className="p-3 w-10">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded"
                />
              </th>
              {[
                "Input Type",
                "Data Type",
                "Title",
                "Description",
                "Labels",
                "Memo",
                "Created At",
                "Image",
                "Edited At",
              ].map((head) => (
                <th
                  key={head}
                  className="px-4 py-3 font-medium whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <span>{head}</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockData.map((row) => {
              const isSelected = selectedItems.includes(row.id);
              return (
                <tr
                  key={row.id}
                  className={`border-b hover:bg-gray-50 ${
                    isSelected ? "bg-[#F3F6FF]" : "bg-white"
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(row.id)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    {row.inputType}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <ImagesIcon className="w-4 h-4" />
                    {row.dataType}
                  </td>
                  <td className="px-4 py-3 text-[#0156D0] underline cursor-pointer">
                    {row.title}
                  </td>
                  <td className="px-4 py-3">{row.description}</td>
                  <td className="px-4 py-3">{row.labels}</td>
                  <td className="px-4 py-3">{row.memo}</td>
                  <td className="px-4 py-3">{row.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex -space-x-2">
                      {row.images.map((img, idx) => (
                        <Image
                          key={idx}
                          src={img}
                          alt="preview"
                          width={32}
                          height={32}
                          className="rounded object-cover border"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.editedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Floating close button */}
      {selectedItems.length > 0 && (
        <button
          onClick={clearSelection}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg z-50 border-4 border-[#0156D0]"
        >
          <CrossIcon className="w-6 h-6 text-[#0156D0]" />
        </button>
      )}
      {selectedItems.length === 0 && (
        <button
          onClick={() => {}}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#0156D0] flex items-center justify-center shadow-lg z-50"
        >
          <SelectIcon className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
}
