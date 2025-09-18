import { useState } from "react";
import ArrowDown from "@/icons/arrow-down-icon.svg";
import PrivateSpaceIcon from "@/icons/private-space-icon.svg";
import TeamSpaceIcon from "@/icons/team-space-icon.svg";

export default function SidebarDropdown({ title, items }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <div
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between bg-[#F3F3F3] rounded-lg px-3 py-2 font-semibold text-[#444] text-base cursor-pointer"
            >
                <div className="flex flex-row items-center gap-2">
                    {title === "Team Space" ? <TeamSpaceIcon /> : <PrivateSpaceIcon />}
                    {title}
                </div>

                <ArrowDown className={`w-4 h-4 transform transition ${open ? "rotate-180" : ""}`} />
            </div>
            {open && (
                <div className="flex flex-col pl-6 gap-2">
                    {items.map((item, i) => (
                        <span key={i} className="text-[14px] font-medium text-[#4F4B5C] hover:text-[#7357FF] cursor-pointer px-3 py-1.5">
                            {item}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
