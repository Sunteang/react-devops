import { Menu, Github, ExternalLink } from "lucide-react";

interface TopNavProps {
  onMenuClick: () => void;
  title?: string;
}

export function TopNav({ onMenuClick, title }: TopNavProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-topnav px-4 lg:px-6 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>
        {title && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Components</span>
            <span className="opacity-40">/</span>
            <span className="text-foreground font-medium">{title}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://github.com/yourusername/your-repo"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-muted"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
          <ExternalLink className="w-3 h-3 opacity-50" />
        </a>
      </div>
    </header>
  );
}
