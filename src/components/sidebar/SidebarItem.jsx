export default function SidebarItem({ icon, label, active, collapsed }) {
  return (
    <button
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium tracking-[-0.03em] w-full
        ${active ? "bg-[#F1EEFF] text-[#7357FF]" : "text-[#4F4B5C] hover:bg-gray-100"}
      `}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {!collapsed && label}
    </button>
  );
}
