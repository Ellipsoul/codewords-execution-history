"use client";

import React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

import { CodewordsLogo } from "./constants";
import Link from "next/link";

export default function HeaderComponent(): JSX.Element {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="flex flex-row justify-between items-center h-24 px-12">
      <Link href="/">
        <CodewordsLogo />
      </Link>

      <button
        type="button"
        className="rounded-full bg-emerald-600 p-1 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        onPointerDown={toggleTheme}
      >
        {theme === "light" ? (
          <SunIcon className="h-8 w-8" aria-hidden="true" />
        ) : (
          <MoonIcon className="h-8 w-8" aria-hidden="true" />
        )}
      </button>
    </header>
  );
}
