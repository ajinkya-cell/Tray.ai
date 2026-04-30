"use client";

import { env } from "@workspace/env/client";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

import type { ColumnLink, NavColumn, NavigationData } from "@/types";
import { MenuLink } from "./elements/menu-link";
import { SanityButtons } from "./elements/sanity-buttons";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

// Fetcher function
const fetcher = async (url: string): Promise<NavigationData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch navigation data");
  }
  return response.json();
};

function DesktopColumnDropdown({
  column,
}: {
  column: Extract<NavColumn, { type: "column" }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
        type="button"
      >
        {column.title}
        <ChevronDown
          className="size-3.5 transition-transform duration-200 group-hover:rotate-180"
          strokeWidth={2.5}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-1/2 z-50 mt-1 min-w-[240px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#111827] p-2 shadow-2xl shadow-black/40"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          role="menu"
        >
          <div className="grid gap-0.5">
            {column.links?.map((link: ColumnLink) => (
              <MenuLink
                description={link.description || ""}
                href={link.href || ""}
                icon={link.icon}
                key={link._key}
                name={link.name || ""}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopColumnLink({
  column,
}: {
  column: Extract<NavColumn, { type: "link" }>;
}) {
  if (!column.href) return null;

  return (
    <Link
      className="px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
      href={column.href}
    >
      {column.name}
    </Link>
  );
}

function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0F172B]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="h-8 w-28 animate-pulse rounded bg-white/10" />
          <div className="h-10 w-10 animate-pulse rounded bg-white/10 md:hidden" />
        </div>
      </div>
    </header>
  );
}

export function Navbar({
  navbarData: initialNavbarData,
  settingsData: initialSettingsData,
}: NavigationData) {
  const { data, error, isLoading } = useSWR<NavigationData>(
    "/api/navigation",
    fetcher,
    {
      fallbackData: {
        navbarData: initialNavbarData,
        settingsData: initialSettingsData,
      },
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: true,
      refreshInterval: 30_000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  const navigationData = data || {
    navbarData: initialNavbarData,
    settingsData: initialSettingsData,
  };
  const { navbarData, settingsData } = navigationData;
  const { columns, buttons } = navbarData || {};
  const navbarLogo = navbarData?.logo ?? null;
  const { logo: settingsLogo, siteTitle } = settingsData || {};
  const logo = navbarLogo ?? settingsLogo ?? null;

  if (isLoading && !data && !(initialNavbarData && initialSettingsData)) {
    return <NavbarSkeleton />;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0F172B]/95 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 md:px-6">

        {/* Left — Logo */}
        <div className="flex items-center scale-78 md:scale-100 invert ">
          {logo ? (
            <Logo
              alt={siteTitle || ""}
              height={36}
              image={logo}
              priority
              width={110}
            />
          ) : (
            <span className="text-lg font-semibold text-white">
              {siteTitle}
            </span>
          )}
        </div>

        {/* Center — Nav links (truly centered via grid) */}
        <nav className="hidden items-center justify-center gap-0.5 md:flex">
          {columns?.map((column) => {
            if (column.type === "column") {
              return (
                <DesktopColumnDropdown column={column} key={column._key} />
              );
            }
            if (column.type === "link") {
              return <DesktopColumnLink column={column} key={column._key} />;
            }
            return null;
          })}
        </nav>

        {/* Right — Action buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <SanityButtons
            buttonClassName={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-all",
              "first:bg-indigo-600 first:text-white first:hover:bg-indigo-500",
              "last:border last:border-white/20 last:bg-transparent last:text-white last:hover:bg-white/10"
            )}
            buttons={(buttons || []) as Parameters<typeof SanityButtons>[0]["buttons"]}
            className="flex items-center gap-2"
          />
        </div>

        {/* Mobile — hamburger */}
        <div className="flex items-center gap-2 md:hidden col-start-3">
          <MobileMenu navbarData={navbarData} settingsData={settingsData} />
        </div>
      </div>

      {/* Dev error indicator */}
      {error && env.NODE_ENV === "development" && (
        <div className="border-red-500/20 border-b bg-red-500/10 px-4 py-1 text-red-400 text-xs">
          Navigation fetch error: {error.message}
        </div>
      )}
    </header>
  );
}
