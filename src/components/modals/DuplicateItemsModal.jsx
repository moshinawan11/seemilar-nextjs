"use client";

import BaseModal from "./BaseModal";
import UnassignedIcon from "@/icons/unassigned-icon.svg";

export default function DuplicateItemsModal({ count = 0, onClose }) {
  return (
    <BaseModal onClose={onClose}>
      <div className="w-[420px] flex flex-col rounded-2xl bg-white p-6 shadow-[0px_4px_50px_rgba(33,33,33,0.08),0px_4px_6px_rgba(33,33,33,0.04)]">
        {/* Title */}
        <h2 className="text-[18px] font-bold mb-2">Select a project for duplication</h2>
        <p className="text-[14px] text-[#6D6D6D] mb-4">
          Please enter a project where <span className="font-bold">{count} items</span> will be duplicated.
        </p>

        {/* Search box with icon */}
        <div className="flex items-center bg-white border border-[#D5D7DA] rounded-lg px-3 py-2 shadow-sm text-[#717680] mb-4">
          <UnassignedIcon className="w-5 h-5 mr-2 text-[#717680]" />
          <input
            type="text"
            placeholder="Search for project"
            className="flex-1 bg-transparent text-[16px] focus:outline-none text-[#717680]"
          />
        </div>

        {/* Footer button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#7357FF] text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Duplicate Items
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
