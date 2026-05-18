import { PropDefinition } from "@/data/components";

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/60 border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Prop
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
                Default
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {props.map((prop, i) => (
              <tr
                key={i}
                className="bg-card hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 align-top">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <code className="text-xs font-mono font-medium text-primary bg-accent/60 px-1.5 py-0.5 rounded">
                      {prop.name}
                    </code>
                    {prop.required && (
                      <span className="text-[10px] font-medium text-destructive bg-destructive/10 px-1.5 py-0.5 rounded uppercase tracking-wide">
                        required
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <code className="text-xs font-mono text-muted-foreground break-all">
                    {prop.type}
                  </code>
                </td>
                <td className="px-4 py-3 align-top hidden sm:table-cell">
                  {prop.defaultValue ? (
                    <code className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {prop.defaultValue}
                    </code>
                  ) : (
                    <span className="text-xs text-muted-foreground/40">—</span>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {prop.description}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
