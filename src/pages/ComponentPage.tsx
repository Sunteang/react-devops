import { useParams, Link, Navigate } from "react-router-dom";
import { componentDocs, GITHUB_BASE_URL } from "@/data/components";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { PropsTable } from "@/components/docs/PropsTable";
import { Github, ExternalLink, ArrowLeft, ArrowRight, Tag } from "lucide-react";

export default function ComponentPage() {
  const { id } = useParams<{ id: string }>();
  const doc = componentDocs.find((c) => c.id === id);

  if (!doc) return <Navigate to="/" replace />;

  const currentIndex = componentDocs.findIndex((c) => c.id === id);
  const prev = currentIndex > 0 ? componentDocs[currentIndex - 1] : null;
  const next =
    currentIndex < componentDocs.length - 1
      ? componentDocs[currentIndex + 1]
      : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-medium text-primary bg-accent px-2.5 py-1 rounded-full capitalize">
            {doc.category}
          </span>
          {doc.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
          {doc.name}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {doc.longDescription}
        </p>

        <div className="flex flex-wrap gap-3 mt-5">
          <a
            href={`${GITHUB_BASE_URL}${doc.githubPath}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground bg-secondary border border-border px-3 py-2 rounded-lg hover:bg-muted hover:border-primary/40 transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            View Source
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>
        </div>
      </div>

      <div className="space-y-10">
        {/* Live Preview */}
        <section>
          <SectionTitle>Preview</SectionTitle>
          <ComponentPreview componentId={doc.id} />
        </section>

        {/* Variants */}
        {doc.variants.length > 0 && (
          <section>
            <SectionTitle>Variants</SectionTitle>
            <div className="space-y-6">
              {doc.variants.map((variant) => (
                <div key={variant.label} className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {variant.label}
                    </h3>
                    {variant.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {variant.description}
                      </p>
                    )}
                  </div>
                  <CodeBlock code={variant.code} language="tsx" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Usage */}
        <section>
          <SectionTitle>Usage</SectionTitle>
          <p className="text-sm text-muted-foreground mb-4">
            Here's a complete example showing how to use the{" "}
            <code className="text-xs font-mono text-primary bg-accent px-1.5 py-0.5 rounded">
              {doc.name}
            </code>{" "}
            component in your project.
          </p>
          <CodeBlock
            code={doc.usageCode}
            language="tsx"
            filename={`${doc.name.toLowerCase()}-example.tsx`}
          />
        </section>

        {/* Props */}
        {doc.props.length > 0 && (
          <section>
            <SectionTitle>Props</SectionTitle>
            <PropsTable props={doc.props} />
          </section>
        )}

        {/* Source link */}
        <section className="rounded-xl border border-border bg-muted/40 p-5 flex items-start gap-4">
          <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center shrink-0">
            <Github className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Source Code
            </h3>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              View the full component source code, including all exports and
              internal helpers.
            </p>
            <a
              href={`${GITHUB_BASE_URL}${doc.githubPath}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              {doc.githubPath}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </section>

        {/* Prev/Next */}
        <nav className="flex items-center justify-between pt-4 border-t border-border">
          {prev ? (
            <Link
              to={`/components/${prev.id}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
                  Previous
                </div>
                <div className="font-medium">{prev.name}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={`/components/${next.id}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right group"
            >
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
                  Next
                </div>
                <div className="font-medium">{next.name}</div>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-base font-semibold text-foreground">{children}</h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
