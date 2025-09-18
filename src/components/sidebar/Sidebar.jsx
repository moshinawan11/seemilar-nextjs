"use client";

import { useState } from "react";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";
import SidebarNotification from "./SidebarNotification";
import UserMenu from "./UserMenu";

// Icons
import BellIcon from "@/icons/notification-icon.svg";
import TrashIcon from "@/icons/trash-icon.svg";
import SearchIcon from "@/icons/search-icon.svg";
import FolderIcon from "@/icons/private-space-icon.svg";
import BookmarksIcon from "@/icons/bookmarks-icon.svg";
import FavoritesIcon from "@/icons/favorites-icon.svg";
import LabelIcon from "@/icons/label-icon.svg";
import UnassignedIcon from "@/icons/unassigned-icon.svg";
import ShareIcon from "@/icons/share-icon.svg";
import AddIcon from "@/icons/add-icon.svg";
import CollapseIcon from "@/icons/collapse-icon.svg";

export default function Sidebar({ collapsed, setCollapsed }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-[80px]" : "w-[312px]"
      } fixed left-0 top-0 h-screen border-r border-[#E2E2E4] flex flex-col justify-between bg-white transition-all duration-300`}
    >
      {/* Make inside scrollable */}
      <div className="flex flex-col gap-6 flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        {/* Profile + Actions */}
        <div className="flex items-center justify-between gap-4 relative">
          {!collapsed && <UserMenu />}

                    {/* Notifications */}
          {!collapsed && (
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative"
            >
              <BellIcon className="w-6 h-6 text-[#4F4B5C]" />
              <span className="absolute -top-1 w-3 h-3 bg-[#8B75FF] border-2 border-white rounded-full"></span>
            </button>
          )}

          <button onClick={() => setCollapsed(!collapsed)}>
            <CollapseIcon
              className={`text-[#4F4B5C] transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>

          {isNotifOpen && !collapsed && (
            <div className="fixed top-32 left-[260px] z-50">
              <SidebarNotification />
            </div>
          )}
        </div>

        {/* Add Item Button */}
        {!collapsed && (
          <button className="w-full flex items-center justify-center gap-2 bg-[#F1EEFF] text-primary-purple py-2 rounded-lg font-semibold text-base">
            <AddIcon /> Add Item
          </button>
        )}

        {/* Navigation */}
        <nav className="flex flex-col gap-2 border-b border-[#ECECED] pb-4">
          <SidebarItem icon={<SearchIcon />} label="Search" collapsed={collapsed} />
          <SidebarItem icon={<UnassignedIcon />} label="Unassigned Items" collapsed={collapsed} />
          <SidebarItem icon={<BookmarksIcon />} label="Bookmarks" collapsed={collapsed} />
          <SidebarItem icon={<FavoritesIcon />} label="Favorites" collapsed={collapsed} />
          <SidebarItem icon={<LabelIcon />} label="Labels" collapsed={collapsed} />
        </nav>

        {/* Spaces */}
        {!collapsed && (
          <>
            <SidebarDropdown
              title="Private Space"
              items={["My Space 1", "My Space 2", "My Space 3"]}
            />
            <SidebarDropdown
              title="Team Space"
              items={["Team Space 1", "Team Space 2", "Team Space 3", "Team Space 4"]}
            />
          </>
        )}

        {/* Trash */}
        <SidebarItem icon={<TrashIcon />} label="Trash" collapsed={collapsed} />
      </div>

      {/* Bottom CTA */}
      {!collapsed && (
        <div className="bg-gradient-to-r from-[#F56A00] via-[#7357FF] to-[#348BE8] flex gap-3 items-center justify-center rounded-lg px-4 py-4 text-white text-center text-sm font-medium mx-4 mb-4">
          <ShareIcon /> Share with Team members <br /> & Expand your Ideas!
        </div>
      )}
    </aside>
  );
}
