"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
  variant?: "header" | "hero";
  placeholder?: string;
  defaultValue?: string;
};

export function SearchBar({
  variant = "header",
  placeholder = "Search home, clothing, gifts, and more",
  defaultValue = "",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form
      className={`search-bar search-bar-${variant}`}
      role="search"
      onSubmit={onSubmit}
    >
      <Search size={variant === "hero" ? 20 : 18} aria-hidden />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
      />
      <button type="submit" className="btn primary search-submit">
        Search
      </button>
    </form>
  );
}
