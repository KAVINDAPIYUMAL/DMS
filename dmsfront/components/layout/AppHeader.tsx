

import Link from "next/link";
import NavMenu from "./NavMenu";

export default function AppHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#1a8fa8] shadow-md"
      role="banner"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2
                       focus-visible:ring-white rounded"
            aria-label="DGI DMS home"
          >
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded
                         bg-white/20 text-white font-bold text-xs select-none"
              aria-hidden="true"
            >
              DGI
            </span>
            <span className="text-white font-semibold text-base tracking-wide select-none">
              DGI&nbsp;|&nbsp;DMS
            </span>
          </Link>

          <NavMenu />
        </div>
      </div>
    </header>
  );
}
