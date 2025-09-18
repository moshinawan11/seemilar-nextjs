"use client";

import clsx from "clsx";

export default function Button({ 
  children, 
  type = "button", 
  onClick, 
  className, 
  ...props 
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "w-full bg-primary-purple text-white font-semibold h-12 rounded-xl shadow-sm hover:bg-primary-purpleDark transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
