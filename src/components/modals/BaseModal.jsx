"use client";

import { motion } from "framer-motion";

export default function BaseModal({ onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white rounded-xl shadow-[0px_20px_24px_-10px_rgba(17,12,34,0.1)] relative"
      >
        {/* Each modal defines its own header/content/footer */}
        {children}

        {/* Close button (absolute, for flexibility) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#292D32] hover:text-black"
        >
          ✕
        </button>
      </motion.div>
    </div>
  );
}
