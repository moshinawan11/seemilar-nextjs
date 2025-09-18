import Image from "next/image";

export default function SidebarNotification() {
    const notifications = [
        {
            id: 1,
            user: "Hsiao Li",
            action: "deleted “2024 Marketing Strategy” Workspace",
            time: "5 min ago",
            avatar: "/images/user-image2.svg",
        },
        {
            id: 2,
            user: "Aiwan",
            action: "added a new photo in “2024 Marketing Strategy” Workspace",
            time: "22 min ago",
            avatar: "/images/user-image3.svg",
        },
        {
            id: 3,
            user: "Jiwon Kim",
            action: "edited “2024 Marketing Strategy” Workspace",
            time: "30 min ago",
            avatar: "/images/user-image4.svg",
        },
        {
            id: 4,
            user: "Jaheekim",
            action: "updated “Seemilar AI Instagram” Workspace",
            time: "12 min ago",
            avatar: "/images/user-image5.svg",
        },
        {
            id: 5,
            user: "Jay Kang",
            action: "created “AI Marketing” Workspace",
            time: "12 min ago",
            avatar: "/images/user-image6.svg",
        },
        {
            id: 5,
            user: "Jay Kang",
            action: "created “AI Marketing” Workspace",
            time: "12 min ago",
            avatar: "/images/user-image6.svg",
        },
        {
            id: 5,
            user: "Jay Kang",
            action: "created “AI Marketing” Workspace",
            time: "12 min ago",
            avatar: "/images/user-image6.svg",
        },
        {
            id: 5,
            user: "Jay Kang",
            action: "created “AI Marketing” Workspace",
            time: "12 min ago",
            avatar: "/images/user-image6.svg",
        },
        {
            id: 5,
            user: "Jay Kang",
            action: "created “AI Marketing” Workspace",
            time: "12 min ago",
            avatar: "/images/user-image6.svg",
        },
    ];

    return (
        <div className="w-[480px] h-[472px] bg-white border border-[#E2E2E4] shadow-[0px_20px_24px_rgba(0,0,0,0.1)] rounded-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-[#E7EAF0]">
                <h3 className="text-[15px] font-medium text-[#141516] tracking-[-0.03em]">
                    Notifications
                </h3>
                <button className="text-[13px] font-medium text-[#0084FF] underline tracking-[-0.03em]">
                    Mark all as read
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-5 px-5 py-[14px] border-b border-[#E2E2E4]">
                <button className="flex items-center gap-1 px-3 py-1 rounded-md bg-[#F3F5F8] text-[13px] font-medium text-[#141516]">
                    All
                </button>
                <button className="flex items-center gap-2 px-3 py-1 rounded-md text-[13px] font-medium text-[#676472]">
                    Notifications
                    <span className="bg-[#8B75FF] text-white text-[11px] px-2 py-[2px] rounded-full">
                        2
                    </span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 rounded-md text-[13px] font-medium text-[#676472]">
                    Read
                </button>
            </div>

            {/* Feed */}
            <div className="flex flex-col gap-2 px-5 py-4 overflow-y-auto">
                {notifications.map((n) => (
                    <div
                        key={n.id}
                        className="flex items-center justify-between w-full h-[64px] bg-white rounded-xl px-3 py-2"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#E7EAF0] overflow-hidden">
                                <Image src={n.avatar} alt={n.user} width={40} height={40} />
                            </div>
                            <p className="text-[13px] font-medium text-[#110C22] leading-5 tracking-[-0.03em]">
                                {n.user} <span className="font-normal">{n.action}</span>
                            </p>
                        </div>
                        <span className="text-[13px] text-end text-[#4C5155] tracking-[-0.03em] min-w-20">
                            {n.time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
