import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { componentDocs, categories } from "@/data/components";
import {
  FormInput,
  LayoutGrid,
  Bell,
  Navigation,
  Layers,
  ChevronDown,
  Box,
  Github,
  Search,
  X,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FormInput,
  LayoutGrid,
  Bell,
  Navigation,
  Layers,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map((c) => c.id)
  );

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const filtered = search.trim()
    ? componentDocs.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : null;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full flex flex-col
          bg-sidebar border-r border-sidebar-border
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-0 lg:z-auto lg:h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ width: "var(--sidebar-width)" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-topnav px-5 border-b border-sidebar-border shrink-0">
          <Link to="/" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="w-7 h-7 rounded-md bg-gradient-primary flex items-center justify-center">
              <Box className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground text-sm tracking-tight">
              Sunteang UI Docs
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-sidebar-muted hover:text-sidebar-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-sidebar-border shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sidebar-muted" />
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full pl-8 pr-3 py-1.5 text-xs rounded-md
                bg-sidebar-hover border border-sidebar-border
                text-sidebar-foreground placeholder:text-sidebar-muted
                focus:outline-none focus:ring-1 focus:ring-primary
                transition-colors
              "
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3 space-y-1">
          {/* Home link */}
          <Link
            to="/"
            onClick={onClose}
            className={`
              flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium
              transition-colors duration-150
              ${
                location.pathname === "/"
                  ? "sidebar-active-bg sidebar-active-fg"
                  : "text-sidebar-muted hover:sidebar-hover-bg hover:text-sidebar-foreground"
              }
            `}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Overview
          </Link>

          {/* Icons link */}
          <Link
            to="/icons"
            onClick={onClose}
            className={`
              flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium
              transition-colors duration-150
              ${
                location.pathname === "/icons"
                  ? "sidebar-active-bg sidebar-active-fg"
                  : "text-sidebar-muted hover:sidebar-hover-bg hover:text-sidebar-foreground"
              }
            `}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Icons
          </Link>

          <div className="pt-2" />

          {/* Filtered search results */}
          {filtered ? (
            <div className="space-y-0.5">
              {filtered.length === 0 ? (
                <p className="px-3 py-2 text-xs text-sidebar-muted">
                  No components found
                </p>
              ) : (
                filtered.map((comp) => {
                  const isActive = location.pathname === `/components/${comp.id}`;
                  return (
                    <Link
                      key={comp.id}
                      to={`/components/${comp.id}`}
                      onClick={onClose}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-md text-xs
                        transition-colors duration-150
                        ${
                          isActive
                            ? "sidebar-active-bg sidebar-active-fg font-medium"
                            : "text-sidebar-foreground hover:sidebar-hover-bg"
                        }
                      `}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
                      {comp.name}
                    </Link>
                  );
                })
              )}
            </div>
          ) : (
            /* Categorized navigation */
            categories.map((cat) => {
              const comps = componentDocs.filter((c) => c.category === cat.id);
              if (comps.length === 0) return null;
              const Icon = iconMap[cat.icon] || LayoutGrid;
              const isExpanded = expandedCategories.includes(cat.id);

              return (
                <div key={cat.id}>
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="
                      w-full flex items-center justify-between px-3 py-2 rounded-md
                      text-xs font-semibold uppercase tracking-widest
                      text-sidebar-muted hover:text-sidebar-foreground
                      transition-colors duration-150
                    "
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" />
                      {cat.label}
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isExpanded ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="mt-0.5 ml-2 space-y-0.5 animate-fade-in">
                      {comps.map((comp) => {
                        const isActive =
                          location.pathname === `/components/${comp.id}`;
                        return (
                          <Link
                            key={comp.id}
                            to={`/components/${comp.id}`}
                            onClick={onClose}
                            className={`
                              flex items-center gap-2 px-3 py-2 rounded-md text-xs
                              transition-colors duration-150
                              ${
                                isActive
                                  ? "sidebar-active-bg sidebar-active-fg font-medium"
                                  : "text-sidebar-foreground hover:sidebar-hover-bg"
                              }
                            `}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                isActive ? "bg-primary" : "bg-sidebar-muted"
                              }`}
                            />
                            {comp.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border px-4 py-3 shrink-0">
          <a
            href="https://github.com/Sunteang"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-sidebar-muted hover:text-sidebar-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </aside>
    </>
  );
}
