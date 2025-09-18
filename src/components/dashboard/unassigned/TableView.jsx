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
  const { openModal } = useModal();

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedItems([]);

  return (
    <div className="relative w-full bg-white">
      <div className="overflow-x-auto border border-[#C5C6D0] rounded-lg">
        <table className="w-full text-left text-[#1B1B1F]">
          {/* ===== Table Header ===== */}
          <thead className="bg-[#FEFBFF] text-[16px] font-semibold tracking-[0.5px] border-b-2 border-[#C5C6D0]">
            <tr className="h-[72px]">
              {/* Checkbox header */}
              <th className="w-12 px-3">
                <input
                  type="checkbox"
                  className="w-6 h-6 border-2 border-[#1B1B1F] rounded-md opacity-40 accent-[#8B75FF]"
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
                  className="px-3 font-semibold whitespace-nowrap border-r border-[#C5C6D0] last:border-r-0"
                >
                  <div className="flex items-center gap-1">
                    <span>{head}</span>
                    <ChevronDown size={18} className="text-gray-500" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* ===== Table Body ===== */}
          <tbody>
            {mockData.map((row) => {
              const isSelected = selectedItems.includes(row.id);
              return (
                <tr
                  key={row.id}
                  className={`h-[64px] border-b border-[#E1E0E5] hover:bg-[#F9F9FB] ${
                    isSelected ? "bg-[#F3F1FD]" : "bg-white"
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(row.id)}
                      className="w-6 h-6 border-2 border-[#1B1B1F] rounded-md accent-[#8B75FF]"
                    />
                  </td>

                  {/* Input Type */}
                  <td className="px-3 border-r border-[#C5C6D0]">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-6 h-6 text-[#1B1B1F]" />
                      <span className="text-[16px] leading-6 tracking-[0.5px] truncate">
                        {row.inputType}
                      </span>
                    </div>
                  </td>

                  {/* Data Type */}
                  <td className="px-3 border-r border-[#C5C6D0] hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <ImagesIcon className="w-6 h-6 text-[#1B1B1F]" />
                      <span className="truncate">{row.dataType}</span>
                    </div>
                  </td>

                  {/* Title */}
                  <td className="px-3 border-r border-[#C5C6D0] text-[#0156D0] underline cursor-pointer">
                    {row.title}
                  </td>

                  {/* Description */}
                  <td className="px-3 border-r border-[#C5C6D0] hidden md:table-cell max-w-xs truncate">
                    {row.description}
                  </td>

                  {/* Labels */}
                  <td className="px-3 border-r border-[#C5C6D0] hidden lg:table-cell">
                    {row.labels}
                  </td>

                  {/* Memo */}
                  <td className="px-3 border-r border-[#C5C6D0] hidden lg:table-cell">
                    {row.memo}
                  </td>

                  {/* Created At */}
                  <td className="px-3 border-r border-[#C5C6D0] whitespace-nowrap">
                    {row.createdAt}
                  </td>

                  {/* Image */}
                  <td className="px-3 border-r border-[#C5C6D0] hidden sm:table-cell">
                    <div className="flex -space-x-2">
                      {row.images.map((img, idx) => (
                        <Image
                          key={idx}
                          src={img}
                          alt="preview"
                          width={40}
                          height={40}
                          className="rounded-md object-cover border border-[#E1E0E5]"
                        />
                      ))}
                    </div>
                  </td>

                  {/* Edited At */}
                  <td className="px-3 whitespace-nowrap hidden md:table-cell">
                    {row.editedAt}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ===== Floating Buttons ===== */}
      {selectedItems.length > 0 ? (
        <button
          onClick={clearSelection}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg z-50 border-4 border-[#0156D0]"
        >
          <CrossIcon className="w-6 h-6 text-[#0156D0]" />
        </button>
      ) : (
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
