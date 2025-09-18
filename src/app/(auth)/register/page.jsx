"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GoogleIcon from "@/icons/google-icon.svg";
import EyeIcon from "@/icons/eye-icon.svg";
import EyeSlashIcon from "@/icons/eye-slash-icon.svg";
import TooltipIcon from "@/icons/tooltip-icon.svg";
import TickIcon from "@/icons/tick-icon.svg";
import CrossIcon from "@/icons/cross-icon.svg";
import WarningIcon from "@/icons/warning-icon.svg"; // ← reuse for caps lock
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";

// ✅ Validation rules
const rules = {
    length: {
        test: (v) => v.length >= 8,
        label: "At least 8 characters",
    },
    lowercase: {
        test: (v) => /[a-z]/.test(v),
        label: "At least 1 Lowercase",
    },
    number: {
        test: (v) => /\d/.test(v),
        label: "At least 1 number",
    },
    uppercase: {
        test: (v) => /[A-Z]/.test(v),
        label: "At least 1 Uppercase",
    },
};

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [password, setPassword] = useState("");
    const [showValidations, setShowValidations] = useState(false);
    const [capsLock, setCapsLock] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const { openModal } = useModal();

    const isEmailValid = /^\S+@\S+\.\S+$/.test(email);

    useEffect(() => {
        const handleKey = (e) => {
            if (typeof e.getModifierState === "function") {
                setCapsLock(e.getModifierState("CapsLock"));
            }
        };
        window.addEventListener("keydown", handleKey);
        window.addEventListener("keyup", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
            window.removeEventListener("keyup", handleKey);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEmailValid) {
            setEmailTouched(true);
            return;
        }
        openModal("verifyEmail", { email });
    };

    return (
        <section className="flex flex-col items-center justify-center flex-1 px-4">
            {/* Title */}
            <h1 className="text-[30px] font-semibold text-[#110C22] tracking-[-0.03em] mb-2">
                Create Account
            </h1>

            {/* Login link */}
            <p className="text-sm text-[#4F4B5C] mb-10 tracking-[-0.01em]">
                Already have an account?{" "}
                <Link href="/login" className="text-primary-purple underline">
                    Log in
                </Link>
            </p>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-5"
            >
                {/* Google Register */}
                <button
                    type="button"
                    className="flex items-center justify-center border border-[#D9D8DC] rounded-xl h-12 gap-3"
                >
                    <GoogleIcon width={26} height={26} />
                    <span className="text-base text-[#110C22] tracking-[-0.03em]">
                        Create with Google
                    </span>
                </button>
                <div className="flex justify-center">
                    <span className="text-sm text-[#4F4B5C]">Or</span>
                </div>

                {/* Divider */}
                <span className="w-full border-t border-[#C6C5CA]" />

                {/* Email */}
                <div className="relative">
                    <label htmlFor="email" className="block text-sm text-[#676472] mb-3">
                        Your email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        required
                        className={`w-full h-12 px-4 py-3 text-base tracking-[-0.01em] rounded-xl focus:outline-none focus:ring-2 ${emailTouched && !isEmailValid
                            ? "border border-[#F03D3D] focus:ring-[#F03D3D]"
                            : "border border-[#D9D8DC] focus:ring-primary-purple"
                            }`}
                    />
                    {/* Error message */}
                    {emailTouched && !isEmailValid && (
                        <p className="mt-1 text-[13px] text-[#F03D3D] flex items-center gap-1">
                            <WarningIcon className="text-[#F03D3D]" />
                            Please type valid email address
                        </p>
                    )}
                </div>

                {/* Password with tooltip */}
                <div className="relative">
                    <label htmlFor="password" className="block text-sm text-[#676472] mb-3">
                        New password
                    </label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setShowValidations(e.target.value.length > 0);
                        }}
                        onFocus={() => {
                            setPasswordFocused(true);
                            if (password.length > 0) setShowValidations(true);
                        }}
                        onBlur={() => {
                            setPasswordFocused(false);      // we don't reset capsLock; render is gated by focus
                            if (!password) setShowValidations(false);
                            setShowTooltip(false);
                        }}
                        className="w-full h-12 px-4 py-3 text-base tracking-[-0.01em] border border-[#D9D8DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />


                    {/* Icons */}
                    <div className="absolute right-3 top-11 flex gap-2">
                        <button
                            type="button"
                            onClick={() => setShowTooltip(!showTooltip)}
                            className="text-[#8D8A95]"
                        >
                            <TooltipIcon
                                className={`w-5 h-5 ${showTooltip ? "text-[#8D8A95]" : "text-[#C6C5CA]"
                                    }`}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-[#8D8A95]"
                        >
                            {showPassword ? (
                                <EyeIcon className="h-6 w-6" />
                            ) : (
                                <EyeSlashIcon className="h-6 w-6" />
                            )}
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

                    {/* Caps Lock warning — shows ONLY when focused AND caps is on */}
                    {passwordFocused && capsLock && (
                        <p className="mt-2 text-[13px] text-[#676472] flex items-center gap-1">
                            <WarningIcon className="text-[#676472]" />
                            Caps Lock is on
                        </p>
                    )}

                    {/* Validation rules */}
                    {showValidations && (
                        <div className="mt-2 space-y-1 text-sm">
                            {Object.entries(rules).map(([key, rule]) => {
                                const valid = rule.test(password);
                                return (
                                    <div
                                        key={key}
                                        className={`flex items-center gap-2 ${valid ? "text-[#0BAA60]" : "text-[#F03D3D]"
                                            }`}
                                    >
                                        {valid ? <TickIcon /> : <CrossIcon />} {rule.label}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <label
                        htmlFor="confirm-password"
                        className="block text-sm text-[#676472] mb-3"
                    >
                        Confirm password
                    </label>
                    <input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="w-full h-12 px-4 py-3 text-base tracking-[-0.01em] border border-[#D9D8DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-11 text-[#8D8A95]"
                    >
                        {showConfirmPassword ? (
                            <EyeIcon className="h-6 w-6" />
                        ) : (
                            <EyeSlashIcon className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Submit */}
                <Button type="submit">Create</Button>
            </form>
        </section>
    );
}
