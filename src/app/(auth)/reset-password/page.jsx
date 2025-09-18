"use client";

import { useState } from "react";
import TooltipIcon from "@/icons/tooltip-icon.svg";
import EyeSlashIcon from "@/icons/eye-slash-icon.svg";
import EyeIcon from "@/icons/eye-icon.svg";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { openModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // For now: no API, just alert
    alert("Password reset successfully (frontend only).");
  };

  return (
    <section className="flex flex-col items-center justify-center flex-1 px-4">
      <h1 className="text-[30px] font-semibold text-[#110C22] mb-2 tracking-[-0.03em]">
        RESET PASSWORD
      </h1>
      <p className="text-sm text-[#5D5D5D] mb-10">
        Enter new password and save
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-6">
        {/* New Password */}
        <div className="relative">
          <label htmlFor="newPassword" className="block text-sm text-[#676472] mb-3">
            New password
          </label>
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setShowTooltip(false)}
            className="w-full h-12 px-4 py-3 border border-[#D9D8DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
          {/* Icons */}
          <div className="absolute right-3 top-11 flex gap-2">
            {/* Info icon */}
            <button
              type="button"
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-[#8D8A95]"
            >
              <TooltipIcon className={`w-5 h-5 ${showTooltip ? " text-[#8D8A95]" : " text-[#C6C5CA]"}`} />
            </button>
            {/* Eye toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#8D8A95]"
            >
              {showPassword ? <EyeIcon className="h-6 w-6" /> : <EyeSlashIcon className="h-6 w-6" />}

            </button>
          </div>
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute left-[calc(100%+10px)] top-8 w-56 bg-[#2E293D] text-white text-xs rounded-xl shadow-lg p-3">
              <ol className="list-disc pl-4 space-y-1">
                <li>Contains at least one special symbol</li>
                <li>Contains at least one uppercase letter</li>
                <li>Contains 3 or more numbers</li>
                <li>At least 8 characters</li>
              </ol>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label htmlFor="confirmPassword" className="block text-sm text-[#676472] mb-3">
            Entered password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-12 px-4 py-3 border border-[#D9D8DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
        </div>

        {/* Save Button */}
        <Button onClick={() => openModal("search")} type="submit">Save</Button>
      </form>
    </section>
  );
}
