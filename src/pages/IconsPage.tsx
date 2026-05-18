import { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Search, Copy, Check } from "lucide-react";

// Curated list of commonly-used Lucide icons grouped by category
const iconGroups: { label: string; icons: string[] }[] = [
  {
    label: "General",
    icons: [
      "Home", "Settings", "User", "Users", "Bell", "Star", "Heart", "Bookmark",
      "Share", "Download", "Upload", "Link", "Globe", "Mail", "Phone", "Map",
      "Calendar", "Clock", "Timer", "AlarmClock", "Sun", "Moon", "Cloud",
      "CloudRain", "Zap", "Flame", "Snowflake", "Wind",
    ],
  },
  {
    label: "Navigation",
    icons: [
      "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "ChevronLeft",
      "ChevronRight", "ChevronUp", "ChevronDown", "ChevronsLeft", "ChevronsRight",
      "MoveLeft", "MoveRight", "CornerDownLeft", "CornerDownRight", "RefreshCw",
      "RotateCcw", "RotateCw", "Navigation", "Compass", "Menu", "X", "Plus",
      "Minus", "MoreHorizontal", "MoreVertical",
    ],
  },
  {
    label: "Actions",
    icons: [
      "Edit", "Edit2", "Edit3", "Pencil", "PenTool", "Trash", "Trash2",
      "Copy", "Clipboard", "ClipboardCheck", "ClipboardList", "Scissors",
      "Lock", "Unlock", "Eye", "EyeOff", "Search", "Filter", "SortAsc",
      "SortDesc", "Sliders", "ToggleLeft", "ToggleRight", "Repeat", "Shuffle",
    ],
  },
  {
    label: "Files & Media",
    icons: [
      "File", "FileText", "FilePlus", "FileMinus", "FileSearch", "FileImage",
      "FileVideo", "FileAudio", "FileCode", "FileJson", "FileSpreadsheet",
      "Folder", "FolderOpen", "FolderPlus", "FolderMinus", "Image", "Video",
      "Music", "Mic", "Camera", "Film", "Play", "Pause", "Stop", "Volume2",
      "VolumeX", "Radio",
    ],
  },
  {
    label: "UI & Layout",
    icons: [
      "LayoutGrid", "LayoutList", "LayoutDashboard", "Sidebar", "PanelLeft",
      "PanelRight", "PanelTop", "PanelBottom", "Columns", "Rows", "Grid",
      "Table", "List", "AlignLeft", "AlignCenter", "AlignRight", "AlignJustify",
      "Maximize", "Maximize2", "Minimize", "Minimize2", "Expand", "Shrink",
      "Box", "Square", "Circle", "Triangle",
    ],
  },
  {
    label: "Communication",
    icons: [
      "MessageSquare", "MessageCircle", "Messages", "Send", "AtSign", "Hash",
      "Rss", "Wifi", "WifiOff", "Bluetooth", "Signal", "Satellite",
      "PhoneCall", "PhoneOff", "PhoneIncoming", "PhoneOutgoing", "Voicemail",
      "Inbox", "MailOpen", "MailPlus", "Reply", "ReplyAll", "Forward",
    ],
  },
  {
    label: "Commerce",
    icons: [
      "ShoppingCart", "ShoppingBag", "Package", "PackageOpen", "Gift",
      "Tag", "Tags", "Receipt", "CreditCard", "Banknote", "Wallet",
      "DollarSign", "Euro", "PoundSterling", "Bitcoin", "TrendingUp",
      "TrendingDown", "BarChart", "BarChart2", "LineChart", "PieChart",
    ],
  },
  {
    label: "Development",
    icons: [
      "Code", "Code2", "Terminal", "Cpu", "HardDrive", "Server", "Database",
      "Cloud", "CloudUpload", "CloudDownload", "Git", "GitBranch", "GitCommit",
      "GitMerge", "GitPullRequest", "Bug", "Wrench", "Tool", "Cog", "Binary",
      "Braces", "Brackets", "Variable",
    ],
  },
];

const allIcons = iconGroups.flatMap((g) => g.icons);

function IconCard({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{ className?: string }>;

  if (!Icon) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`<${name} />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      title={`Copy <${name} />`}
      className="group flex flex-col items-center gap-2.5 p-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all duration-150"
    >
      <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
        {copied ? (
          <Check className="w-4.5 h-4.5 text-primary" />
        ) : (
          <Icon className="w-4.5 h-4.5 text-foreground group-hover:text-primary transition-colors" />
        )}
      </div>
      <span className="text-[10px] font-mono text-muted-foreground group-hover:text-foreground transition-colors leading-tight text-center break-all max-w-full">
        {name}
      </span>
      <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? (
          <Check className="w-3 h-3 text-primary" />
        ) : (
          <Copy className="w-3 h-3 text-muted-foreground" />
        )}
      </span>
    </button>
  );
}

export default function IconsPage() {
  const [search, setSearch] = useState("");

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return iconGroups;
    const q = search.toLowerCase();
    return iconGroups
      .map((group) => ({
        ...group,
        icons: group.icons.filter((name) => name.toLowerCase().includes(q)),
      }))
      .filter((g) => g.icons.length > 0);
  }, [search]);

  const totalShown = filteredGroups.reduce((sum, g) => sum + g.icons.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-medium text-primary bg-accent px-2.5 py-1 rounded-full">
            icons
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
            lucide-react
          </span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
          Icons
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          A curated set of{" "}
          <span className="text-foreground font-medium">{allIcons.length}</span>{" "}
          icons from{" "}
          <a
            href="https://lucide.dev"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            Lucide
          </a>{" "}
          — click any icon to copy its JSX snippet to the clipboard.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={`Search ${allIcons.length} icons…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
        />
        {search && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {totalShown} result{totalShown !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Icon groups */}
      {filteredGroups.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No icons found for "{search}"</p>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredGroups.map((group) => (
            <section key={group.label}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-base font-semibold text-foreground">
                  {group.label}
                </h2>
                <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  {group.icons.length}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2">
                {group.icons.map((name) => (
                  <div key={name} className="relative">
                    <IconCard name={name} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Usage note */}
      <div className="mt-12 rounded-xl border border-border bg-muted/40 p-5">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Installation
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Icons are provided by{" "}
          <code className="font-mono text-primary">lucide-react</code>. Import
          any icon by name:
        </p>
        <pre className="text-xs font-mono bg-background border border-border rounded-lg px-4 py-3 overflow-x-auto text-foreground">
          {`import { Home, Settings, User } from "lucide-react";

// Use as a React component
<Home className="w-5 h-5" />`}
        </pre>
      </div>
    </div>
  );
}
