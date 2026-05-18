import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ComponentPreviewProps {
  componentId: string;
  variantCode?: string;
}

function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}

function BadgePreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}

function CardPreview() {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>Deployed 2 hours ago · Production</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Your project is running smoothly with zero errors in the last 24 hours.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Cancel
        </Button>
        <Button size="sm" className="flex-1">
          Deploy
        </Button>
      </CardFooter>
    </Card>
  );
}

function InputPreview() {
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-col gap-4 w-72">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="prev-email">Email address</Label>
        <Input
          id="prev-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="prev-pass">Password</Label>
        <Input id="prev-pass" type="password" placeholder="••••••••" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="prev-dis" className="text-muted-foreground">Disabled field</Label>
        <Input id="prev-dis" disabled placeholder="Not editable" />
      </div>
    </div>
  );
}

function AvatarPreview() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="w-14 h-14">
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar className="w-10 h-10">
        <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
      </Avatar>
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">AB</AvatarFallback>
      </Avatar>
    </div>
  );
}

const previewMap: Record<string, React.ComponentType> = {
  button: ButtonPreview,
  badge: BadgePreview,
  card: CardPreview,
  input: InputPreview,
  avatar: AvatarPreview,
};

export function ComponentPreview({ componentId }: ComponentPreviewProps) {
  const Preview = previewMap[componentId];

  return (
    <div className="relative rounded-lg border border-border bg-card overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative flex items-center justify-center min-h-[200px] p-10">
        {Preview ? (
          <Preview />
        ) : (
          <p className="text-sm text-muted-foreground">No preview available</p>
        )}
      </div>
    </div>
  );
}
