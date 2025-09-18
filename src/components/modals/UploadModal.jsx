"use client";

import { useState, useRef } from "react";
import BaseModal from "@/components/modals/BaseModal";
import CrossIcon from "@/icons/cross-icon2.svg";
import RetryIcon from "@/icons/retry-icon.svg";
import TrashIcon from "@/icons/trash-icon2.svg";
import UploadIcon from "@/icons/upload-icon.svg";

export default function UploadModal({ onClose }) {
    const [url, setUrl] = useState("");
    const [files, setFiles] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024; // 10 MB
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "video/mp4",
        "video/quicktime", // mov
        "video/x-msvideo", // avi
        "video/webm",
    ];

    function handleFiles(selectedFiles) {
        if (!selectedFiles) return;
        const newFiles = [];

        for (const f of Array.from(selectedFiles)) {
            // reject disallowed formats
            if (!allowedTypes.includes(f.type)) {
                continue;
            }

            const preview = f.type.startsWith("image") ? URL.createObjectURL(f) : "";
            if (f.size > maxSize) {
                newFiles.push({
                    id: crypto.randomUUID(),
                    file: f,
                    name: f.name,
                    size: f.size,
                    progress: 0,
                    status: "error",
                    preview,
                });
            } else {
                newFiles.push({
                    id: crypto.randomUUID(),
                    file: f,
                    name: f.name,
                    size: f.size,
                    progress: 0,
                    status: "uploading",
                    preview,
                });
            }
        }

        const combined = [...files, ...newFiles].slice(0, maxFiles);
        setFiles(combined);
        simulateUpload(combined);
    }

    function simulateUpload(fileStates) {
        fileStates.forEach((f) => {
            if (f.status === "uploading") {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 20;
                    setFiles((prev) =>
                        prev.map((x) =>
                            x.id === f.id
                                ? {
                                    ...x,
                                    progress: Math.min(progress, 100),
                                    status: progress >= 100 ? "success" : "uploading",
                                }
                                : x
                        )
                    );
                    if (progress >= 100) clearInterval(interval);
                }, 500);
            }
        });
    }

    function removeFile(id) {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    }

    function retryFile(id) {
        setFiles((prev) =>
            prev.map((f) =>
                f.id === id ? { ...f, status: "uploading", progress: 0 } : f
            )
        );
        simulateUpload(
            files.map((f) =>
                f.id === id ? { ...f, status: "uploading", progress: 0 } : f
            )
        );
    }

    function formatSize(size) {
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(0)}kb`;
        return `${(size / 1024 / 1024).toFixed(1)} MB`;
    }

    function getFileIcon(f) {
        if (f.preview) return <img src={f.preview} alt={f.name} className="w-8 h-8 rounded object-cover" />;
        if (f.file?.type.startsWith("video")) {
            return <div className="w-8 h-8 flex items-center justify-center rounded bg-[#F3F3F4] text-xs">🎥</div>;
        }
        if (f.file?.type === "image/gif" || f.file?.type === "image/webp") {
            return <div className="w-8 h-8 flex items-center justify-center rounded bg-[#F3F3F4] text-xs">🖼️</div>;
        }
        // fallback = file extension
        const ext = f.name.split(".").pop()?.toUpperCase() || "FILE";
        return <div className="w-8 h-8 flex items-center justify-center rounded bg-[#F3F3F4] text-[10px] font-bold">{ext}</div>;
    }

    const hasAnyFiles = files.length > 0;

    return (
        <BaseModal onClose={onClose}>
            <div className="w-[600px] bg-white rounded-xl p-6 pt-4 flex flex-col gap-6">
                {/* Header */}
                <h2 className="text-lg font-semibold text-[#110C22]">Upload from URL</h2>
                <input
                    type="text"
                    placeholder="Add file URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-[14px] focus:outline-none focus:border-[#8B75FF]"
                />

                {/* Divider */}
                <div className="flex items-center gap-2 text-[#8D8A95] text-xs font-medium">
                    <div className="flex-1 h-px bg-[#E4E6EB]" />
                    OR
                    <div className="flex-1 h-px bg-[#E4E6EB]" />
                </div>

                {/* Media Upload */}
                <div className="flex flex-col gap-3">
                    <div>
                        <h3 className="text-sm font-semibold text-[#110C22]">Media Upload</h3>
                        <p className="text-xs text-[#606368]">
                            Add your documents here, and you can upload up to 5 files max
                        </p>
                    </div>
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragActive(true);
                        }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setDragActive(false);
                            handleFiles(e.dataTransfer.files);
                        }}
                        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-8 transition cursor-pointer ${dragActive ? "border-[#8B75FF] bg-[#F8F7FF]" : "border-[#D6BBFB]"
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="flex flex-col items-center gap-1 text-center">
                            <span className="text-[#8B75FF] text-xl"><UploadIcon /></span>
                            <p className="text-sm text-[#606368]">
                                Drag your file(s) or{" "}
                                <span className="text-[#8B75FF]">browse</span>
                            </p>
                            <p className="text-xs text-[#98999B]">Max 10 MB files are allowed</p>
                        </div>
                        <input
                            type="file"
                            multiple
                            hidden
                            ref={fileInputRef}
                            accept=".jpg,.jpeg,.png,.gif,.webp,.mp4,.mov,.avi,.webm"
                            onChange={(e) => handleFiles(e.target.files)}
                        />
                    </div>

                    <p className="text-xs text-[#8D8A95] mt-1">
                        Supported format: jpg, jpeg, png, gif, webp, mp4, mov, avi, webm
                    </p>
                </div>

                {/* File List */}
                {files.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {files.map((f) => (
                            <div
                                key={f.id}
                                className="flex items-center justify-between border border-[#E4E6EB] rounded-lg px-3 py-2"
                            >
                                <div className="flex items-center gap-3">
                                    {getFileIcon(f)}
                                    <div>
                                        <p className="text-[13px] font-medium text-[#3B3C3F]">
                                            {f.name}
                                        </p>
                                        <p
                                            className={`text-[11px] ${f.status === "error" ? "text-red-500" : "text-[#98999B]"
                                                }`}
                                        >
                                            {f.status === "error"
                                                ? "Upload failed"
                                                : formatSize(f.size)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {f.status === "uploading" && (
                                        <>
                                            <div className="w-24 h-2 bg-[#EAEAEA] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#8B75FF] transition-all"
                                                    style={{ width: `${f.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-[#606368]">{f.progress}%</span>
                                        </>
                                    )}
                                    {f.status === "error" && (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => removeFile(f.id)}
                                                className="text-xs text-[#98999B]"
                                            >
                                                <TrashIcon />
                                            </button>
                                            <button
                                                onClick={() => retryFile(f.id)}
                                                className="text-xs text-[#98999B]"
                                            >
                                                <RetryIcon />
                                            </button>
                                        </div>
                                    )}
                                    {f.status === "success" && (
                                        <button
                                            onClick={() => removeFile(f.id)}
                                            className="text-[#98999B] hover:text-red-500 text-sm"
                                        >
                                            <CrossIcon />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-2">
                    <button
                        disabled={!hasAnyFiles && !url}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${hasAnyFiles || url
                                ? "bg-white border border-[#E4E6EB] text-[#110C22] hover:bg-[#F8F7FF]"
                                : "bg-[#F5F5F5] text-[#98999B] cursor-not-allowed"
                            }`}
                    >
                        Save with Details
                    </button>
                    <button
                        disabled={!hasAnyFiles && !url}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${hasAnyFiles || url
                                ? "bg-[#8B75FF] text-white hover:bg-[#7a66e6]"
                                : "bg-[#C6C6CA] text-white cursor-not-allowed"
                            }`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </BaseModal>
    );
}
