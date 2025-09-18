"use client";

import BaseModal from "./BaseModal";
import Button from "@/components/ui/Button";
import MailIcon from "@/icons/mail-icon.svg";

export default function VerifyEmailModal({ email, onClose }) {
  return (
    <BaseModal onClose={onClose}>
      <div className="w-[420px] px-8 pb-8 pt-4 flex flex-col items-center text-center gap-8">
        {/* Header */}
        <div className="border-b w-full border-[#DEE3E7] pb-4">
        <h2 className="text-[17px] font-semibold text-[#110C22]">
          Create Account
        </h2>
</div>
        {/* Icon */}
        <div className="flex items-center justify-center rounded-full bg-[#F7F7F8]">
          <MailIcon className="text-[#8D8A95]" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[17px] font-semibold text-[#110C22]">
            Verify your email address
          </h3>
          <p className="text-[14px] font-medium text-[#8D8A95] leading-6">
            You’ve entered{" "}
            <span className="text-[#0084FF] underline">{email}</span> as the email
            address for your account. <br /> Please verify by clicking button
            below
          </p>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3">
          <Button className="w-full h-10 rounded-xl bg-[#8B75FF] hover:bg-[#7a66e6] text-white font-medium">
            Verify your email
          </Button>
          <p className="text-[13px] font-medium text-[#8D8A95]">
            Didn’t receive the email?{" "}
            <button className="text-[#0084FF] underline">Resent email</button>
          </p>
        </div>
      </div>
    </BaseModal>
  );
}
