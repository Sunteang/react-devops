import { Link } from "react-router-dom";
import { componentDocs, categories } from "@/data/components";
import { ArrowRight, Box, Zap, Github, Code2, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 py-20 lg:py-28">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-accent px-3 py-1.5 rounded-full mb-6">
            <Zap className="w-3 h-3" />
            Personal Component Library
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 text-balance">
            Beautiful, reusable{" "}
            <span className="text-primary">UI components</span>{" "}
            for modern interfaces
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            A curated collection of accessible, composable, and customizable
            React components. Browse live previews, copy source code, and
            reference detailed API documentation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/components/${componentDocs[0].id}`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-primary hover:-translate-y-0.5"
            >
              Browse Components
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/Sunteang?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-all"
            >
              <Github className="w-4 h-4" />
              GitHub Repository
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-wrap gap-8">
          {[
            { label: "Components", value: componentDocs.length.toString() },
            { label: "Categories", value: categories.length.toString() },
            { label: "Open Source", value: "100%" },
            { label: "TypeScript", value: "✓" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          What's included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Box,
              title: "Live Previews",
              desc: "Every component ships with an interactive preview so you see exactly what you get.",
            },
            {
              icon: Code2,
              title: "Source Code",
              desc: "Syntax-highlighted code with one-click copy. Link directly to GitHub for the full file.",
            },
            {
              icon: Layers,
              title: "Props API",
              desc: "Complete props documentation with types, defaults, and descriptions for every component.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Component grid */}
      {categories.map((cat) => {
        const comps = componentDocs.filter((c) => c.category === cat.id);
        if (comps.length === 0) return null;
        return (
          <section key={cat.id} className="max-w-3xl mx-auto px-6 pb-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              {cat.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {comps.map((comp) => (
                <Link
                  key={comp.id}
                  to={`/components/${comp.id}`}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/10 transition-colors">
                    <Box className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {comp.name}
                      </span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {comp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {comp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
