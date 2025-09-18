"use client";

import BaseModal from "./BaseModal";

export default function DeleteItemsModal({ count = 0, onClose }) {
  return (
    <BaseModal onClose={onClose}>
      <div className="w-[420px] flex flex-col rounded-2xl bg-white p-6 shadow-[0px_4px_50px_rgba(33,33,33,0.08),0px_4px_6px_rgba(33,33,33,0.04)]">
        {/* Title */}
        <h2 className="text-[18px] font-bold mb-2">Move to Trash</h2>
        <p className="text-[14px] text-[#6D6D6D] mb-4">
          <span className="font-bold">{count} items</span> will be moved to trash.
          <br />
          Deleted items in trash can be restored in 30 days.
        </p>

        {/* Footer button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#B3261E] text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
