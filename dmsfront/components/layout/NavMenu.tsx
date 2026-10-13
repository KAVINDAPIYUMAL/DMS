"use client";


import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface DropdownItem {
  label: string;
  href?: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
}

function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-3 py-2 rounded text-sm font-medium text-white
                   hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                   transition-colors"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 mt-1 w-52 rounded-lg shadow-xl bg-white border border-gray-100
                     py-1 z-50 text-sm text-gray-700 animate-[fadeIn_0.1s_ease]"
        >
          {items.map((item) =>
            item.href ? (
              <li key={item.label} role="menuitem">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-[#e8f7fa] hover:text-[#1a8fa8] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.label} role="menuitem">
                <span
                  aria-disabled="true"
                  title="Coming soon"
                  className="block px-4 py-2 text-gray-400 cursor-not-allowed select-none"
                >
                  {item.label}
                </span>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default function NavMenu() {
  const requestManagementItems: DropdownItem[] = [
    { label: "Submit new request", href: "/request-management/submit-request" },
    { label: "My Requests" },
    { label: "My Assignments" },
    { label: "View Requests" },
  ];

  const userItems: DropdownItem[] = [
    { label: "My Profile" },
    { label: "Sign Out" },
  ];

  return (
    <nav aria-label="Main navigation" className="flex items-center gap-1">
      <Link
        href="/"
        className="px-3 py-2 rounded text-sm font-medium text-white
                   hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                   transition-colors"
      >
        Home
      </Link>

      <NavDropdown label="Request Management" items={requestManagementItems} />

      <span className="text-white/40 mx-1 select-none" aria-hidden="true">|</span>

      <NavDropdown label="Hi | SLT Admin" items={userItems} />
    </nav>
  );
}
