"use client";

import { useState } from "react";
import { Search, ChevronDown, Clock } from "lucide-react";
import Image from "next/image";
import TableViewIcon from "@/icons/table-view-icon.svg";
import FeedViewIcon from "@/icons/feed-view-icon.svg";
import GalleryViewIcon from "@/icons/gallery-view-icon.svg";
import LabelIcon from "@/icons/label-icon.svg";
import ArrowDownLongIcon from "@/icons/arrow-down-long-icon.svg";
import LinkIcon from "@/icons/link-icon.svg";
import EyeIcon from "@/icons/eye-icon2.svg";
import HeartIcon from "@/icons/heart-icon.svg";
import LikeIcon from "@/icons/like-icon.svg";
import CommentIcon from "@/icons/comment-icon.svg";
import HamburgerIcon from "@/icons/hamburger-icon.svg";
import ImagesIcon from "@/icons/images-icon.svg";
import VideoIcon from "@/icons/video-icon.svg";
import UploadIcon from "@/icons/upload-icon2.svg";
import ArrowDownIconSm from "@/icons/arrow-down-icon-sm.svg";
import SelectIcon from "@/icons/select-icon.svg";
import CrossIcon from "@/icons/cross-icon3.svg";
import ArrowDownIcon from "@/icons/arrow-down-icon3.svg";
import { useModal } from "@/context/ModalContext";
import TableView from "@/components/unassigned/TableView";

// ⬇️ MediaCard updated with selectable checkbox
function MediaCard({
  id,
  type = "text",
  title,
  description,
  image,
  topLeftIcons = [],
  topRightIcons = [],
  isSelectMode,
  isSelected,
  toggleSelect,
}) {
  const renderIcon = (icon) => {
    switch (icon) {
      case "link":
        return <LinkIcon className="w-5 h-5 text-white" />;
      case "facebook":
        return <Image src="/icons/facebook-logo.png" alt="Facebook" width={18} height={18} />;
      case "instagram":
        return <Image src="/icons/insta-logo.png" alt="Instagram" width={18} height={18} />;
      case "x":
        return <Image src="/icons/x-logo.png" alt="X" width={18} height={18} />;
      case "upload":
        return <UploadIcon className="w-5 h-5 text-white" />;
      case "images":
        return <ImagesIcon className="w-5 h-5 text-white" />;
      case "video":
        return <VideoIcon className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative w-full h-[300px] bg-[#16181B] rounded-md overflow-hidden flex flex-col cursor-pointer`}
      onClick={() => isSelectMode && toggleSelect(id)}
    >
      {/* Background Image */}
      {type === "image" && image && (
        <>
          <Image src={image} alt={title} fill className="object-cover" />
          <div className="absolute top-0 left-0 w-full h-[70px] bg-gradient-to-b from-black/30 to-transparent"></div>
        </>
      )}

      {/* Checkbox */}
      {isSelectMode && (
        <div className="absolute top-3 left-3 z-20">
          <div
            className={`w-5 h-5 rounded-md flex border-white border-2 items-center justify-center transition-colors
        ${isSelected ? " bg-white" : " bg-transparent"}`}
          >
            {isSelected && <ArrowDownIcon className="w-4 h-4" />}
          </div>
        </div>
      )}


      {/* Overlay when in select mode but not selected */}
      {isSelectMode && (
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      )}

      {/* Top Left */}
      {!isSelectMode && (<>
        <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
          {topLeftIcons.map((icon, idx) => (
            <span key={idx}>{renderIcon(icon)}</span>
          ))}
          <span className="text-white text-sm sm:text-base font-semibold">{title}</span>
        </div>
        {/* Top Right */}
        {topRightIcons.length > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
            {topRightIcons.map((icon, idx) => (
              <span key={idx}>{renderIcon(icon)}</span>
            ))}
          </div>
        )}
      </>
      )}

      {/* Body Text */}
      {type !== "image" && (
        <div className="flex flex-col pt-12 flex-1 px-4 z-20">
          <p className={`text-gray-300 text-sm sm:text-base line-clamp-4 ${isSelectMode ? " text-gray-500" : " text-gray-300"}`}>{description}</p>
        </div>
      )}

      {/* Footer */}
      {!isSelectMode && (
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white z-20">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-lg">21.5K</span>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-lg">8K</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <HamburgerIcon />
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <span className="text-sm sm:text-lg">4</span>
              <LikeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <span className="text-sm sm:text-lg">2</span>
              <CommentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default function UnassignedPage() {
  const [view, setView] = useState("gallery");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { openModal } = useModal();

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setIsSelectMode(false);
    setSelectedItems([]);
  };

  return (
    <div className="flex flex-col w-full h-full px-2 sm:px-4 py-3 bg-white relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between w-full px-2 sm:px-3 py-2">
        <h1 className="text-xl sm:text-[27px] font-bold leading-[30px] sm:leading-[40px] text-[#110C22]">
          Unassigned Items
        </h1>
      </div>

      {/* Tabs + Select Items */}
      <div className="relative flex flex-wrap items-center justify-between w-full border-b border-[#C5C5C5]">
        <div className="flex items-end gap-3 sm:gap-5 px-2 pb-1 overflow-x-auto">
          {/* Tabs */}
          {["table", "feed", "gallery"].map((tab) => (
            <button
              key={tab}
              onClick={() => setView(tab)}
              className={`flex items-center gap-2 py-2 sm:py-3 whitespace-nowrap ${view === tab
                ? "text-[#8B75FF] border-b-2 border-[#8B75FF]"
                : "text-black/85 border-b-2 border-transparent"
                }`}
            >
              {tab === "table" && <TableViewIcon />}
              {tab === "feed" && <FeedViewIcon />}
              {tab === "gallery" && <GalleryViewIcon />}
              <span className="text-sm capitalize">{tab} View</span>
            </button>
          ))}
        </div>

        {isSelectMode ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-white bg-[#0156D0] rounded-lg"
            >
              {/* Checkbox inside button */}
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
          ${selectedItems.length > 0 ? "bg-white border-white" : "bg-transparent border-white"}`}
              >
                {selectedItems.length > 0 && (
                  <div className="w-2.5 h-0.5 bg-[#0156D0] rounded-sm" /> // horizontal line for "indeterminate"
                )}
              </div>

              {/* Items count */}
              <span className="text-sm font-medium border-r border-[#FFFFFF80] pr-2 sm:pr-3">
                {selectedItems.length} items are selected
              </span>

              {/* Dropdown arrow */}
              <ArrowDownIconSm className="w-2.5 h-3" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#0156D0] rounded-lg shadow-lg p-2 text-white z-50">
                <button
                  className="w-full text-left px-2 py-2 rounded hover:bg-[#F8F8F8] hover:text-[#4F4B5C]"
                  onClick={() => openModal("moveItems", { count: selectedItems.length })}
                >
                  Move to
                </button>
                <button
                  className="w-full text-left px-2 py-2 mt-1 rounded hover:bg-[#F8F8F8] hover:text-[#4F4B5C]"
                  onClick={() => openModal("duplicateItems", { count: selectedItems.length })}
                >
                  Duplicate to
                </button>
                <button
                  className="w-full text-left px-2 py-2 mt-1 rounded hover:bg-[#F8F8F8] hover:text-[#4F4B5C]"
                  onClick={() => openModal("deleteItems", { count: selectedItems.length })}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-white bg-[#0156D0] rounded-lg mt-2 sm:mt-0"
            onClick={() => setIsSelectMode(true)}
          >
            <span className="text-sm font-medium border-r border-[#FFFFFF80] pr-2 sm:pr-3">
              Select Items
            </span>
            <ArrowDownIconSm className="w-2.5 h-3" />
          </button>
        )}

      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between w-full gap-2 px-2 py-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-1 border border-[#D9D8DC] rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8F7AFF]"
            />
          </div>


          <div className="flex items-center gap-2 px-2 sm:px-3 py-1 border rounded-lg bg-[#F3F1FD] border-[#8F7AFF]">
            <Clock size={16} className="text-[#8F7AFF]" />
            <span className="text-[#8F7AFF] text-sm font-medium">07/10/2025</span>
            <ChevronDown size={16} className="text-[#8F7AFF]" />
          </div>

          <div className="flex items-center gap-2 px-2 sm:px-3 py-1 border rounded-lg border-[#8F7AFF]">
            <LabelIcon className="text-[#8F7AFF] w-4 h-4" />
            <span className="text-[#8F7AFF] text-sm font-medium">Label</span>
            <ChevronDown size={16} className="text-[#8F7AFF]" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1 border rounded-lg border-[#8F7AFF]">
            <span className="text-[#8F7AFF] text-sm font-medium">Input type</span>
            <ChevronDown size={16} className="text-[#8F7AFF]" />
          </div>


          <div className="flex items-center gap-2 px-3 py-1 border rounded-lg border-[#8F7AFF]">
            <span className="text-[#8F7AFF] text-sm font-medium">Data type</span>
            <ChevronDown size={16} className="text-[#8F7AFF]" />
          </div>
        </div>

        <div className="flex items-center gap-2 px-2 sm:px-3 py-2 bg-[#F3F1FD] rounded-md">
          <span className="text-[#8B75FF] text-sm font-medium">Oldest</span>
          <ArrowDownLongIcon className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 w-full p-3 sm:p-6 mt-2 bg-[#F8F8F8] border border-[#D9D8DC] rounded-xl relative">
        {view === "gallery" && (
          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[
              { id: 1, type: "text", title: "Title of Contents ...", description: "#vegan ...", topLeftIcons: ["link"] },
              { id: 2, type: "text", title: "This is Title ...", description: "Description text: ...", topLeftIcons: ["cross"] },
              { id: 3, type: "image", title: "Samsung0928...", image: "/images/post-img1.jpg", topLeftIcons: ["upload"], topRightIcons: ["images"] },
              { id: 4, type: "image", title: "Title of Contents ...", image: "/images/post-img2.jpg", topLeftIcons: ["facebook"], topRightIcons: ["video"] },
              { id: 5, type: "image", title: "Title of Contents ...", image: "/images/post-img3.jpg", topLeftIcons: ["instagram"] },
              { id: 6, type: "image", title: "Title of Contents ...", image: "/images/post-img4.jpg", topLeftIcons: ["link", "facebook"] },
              { id: 7, type: "image", title: "Title of Contents ...", image: "/images/post-img2.jpg", topLeftIcons: ["link", "instagram"], topRightIcons: ["images"] },
              { id: 8, type: "image", title: "Title of Contents ...", image: "/images/post-img3.jpg", topLeftIcons: ["link", "x"], topRightIcons: ["video"] },
              { id: 9, type: "text", title: "This is Title ...", description: "#vegan ...", topLeftIcons: ["link"], topRightIcons: ["images"] },
              { id: 10, type: "image", title: "Title of Contents ...", image: "/images/post-img1.jpg", topLeftIcons: ["upload", "instagram"] },
              { id: 11, type: "text", title: "This is Title ...", description: "Description text: ...", topLeftIcons: ["cross", "link"] },
              { id: 12, type: "image", title: "Title of Contents ...", image: "/images/post-img4.jpg", topLeftIcons: ["x"], topRightIcons: ["images"] },
            ].map((card) => (
              <MediaCard
                key={card.id}
                {...card}
                id={card.id}
                isSelectMode={isSelectMode}
                isSelected={selectedItems.includes(card.id)}
                toggleSelect={toggleSelect}
              />
            ))}
          </div>)}
        {view === "table" && <TableView />}{view === "feed" && (
          <div className="p-6 text-gray-500 italic">Feed view coming soon...</div>
        )}
      </div>

      {/* Floating Close Button */}
      {isSelectMode ? (
        <button
          onClick={clearSelection}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg z-50 border-4 border-[#0156D0]"
        >
          <CrossIcon className="w-6 h-6 text-white" />
        </button>
      ) : (<button
        onClick={() => setIsSelectMode(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#0156D0] flex items-center justify-center shadow-lg z-50"
      >
        <SelectIcon className="w-6 h-6 text-white" />
      </button>)
      }
    </div>
  );
}


