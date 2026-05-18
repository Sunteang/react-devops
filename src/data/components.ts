export interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
}

export interface ComponentVariant {
  label: string;
  description?: string;
  code: string;
}

export interface ComponentDoc {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  githubPath: string;
  tags: string[];
  props: PropDefinition[];
  variants: ComponentVariant[];
  usageCode: string;
  installCode?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "inputs", label: "Inputs", icon: "FormInput" },
  { id: "display", label: "Display", icon: "LayoutGrid" },
  { id: "feedback", label: "Feedback", icon: "Bell" },
  { id: "navigation", label: "Navigation", icon: "Navigation" },
  { id: "overlay", label: "Overlay", icon: "Layers" },
];

export const componentDocs: ComponentDoc[] = [
  {
    id: "button",
    name: "Button",
    category: "inputs",
    description: "Triggers an action or event with a single click.",
    longDescription:
      "The Button component is one of the most fundamental UI elements. It supports multiple visual variants, sizes, and states including loading and disabled. Built on top of Radix UI's Slot primitive for maximum composability.",
    githubPath: "components/ui/button.tsx",
    tags: ["interaction", "form", "action"],
    usageCode: `import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="flex gap-2">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}`,
    variants: [
      {
        label: "Default",
        description: "The primary action button using brand color.",
        code: `<Button>Click me</Button>`,
      },
      {
        label: "Outline",
        description: "Bordered button for secondary actions.",
        code: `<Button variant="outline">Outline</Button>`,
      },
      {
        label: "Ghost",
        description: "Minimal button that only shows on hover.",
        code: `<Button variant="ghost">Ghost</Button>`,
      },
      {
        label: "Destructive",
        description: "For irreversible or dangerous actions.",
        code: `<Button variant="destructive">Delete</Button>`,
      },
      {
        label: "Sizes",
        description: "Available in sm, default, and lg sizes.",
        code: `<div className="flex items-center gap-2">
  <Button size="sm">Small</Button>
  <Button>Default</Button>
  <Button size="lg">Large</Button>
</div>`,
      },
    ],
    props: [
      { name: "variant", type: '"default" | "outline" | "ghost" | "destructive" | "link" | "secondary"', defaultValue: '"default"', description: "Visual style of the button." },
      { name: "size", type: '"sm" | "default" | "lg" | "icon"', defaultValue: '"default"', description: "Controls padding and font size." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Prevents interaction and applies muted styling." },
      { name: "asChild", type: "boolean", defaultValue: "false", description: "Merge props with child component using Radix Slot." },
      { name: "onClick", type: "React.MouseEventHandler<HTMLButtonElement>", description: "Handler called when the button is clicked." },
      { name: "className", type: "string", description: "Additional CSS classes for customization." },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    category: "display",
    description: "Small status descriptor for UI elements and labels.",
    longDescription:
      "Badges are compact labels used to highlight status, categories, or metadata. They support multiple color variants and integrate seamlessly with other components like cards, tables, and list items.",
    githubPath: "components/ui/badge.tsx",
    tags: ["label", "status", "tag"],
    usageCode: `import { Badge } from "@/components/ui/badge";

export default function Example() {
  return (
    <div className="flex gap-2 flex-wrap">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}`,
    variants: [
      {
        label: "Default",
        description: "Uses the primary brand color.",
        code: `<Badge>New</Badge>`,
      },
      {
        label: "Secondary",
        description: "Subtle secondary styling.",
        code: `<Badge variant="secondary">Beta</Badge>`,
      },
      {
        label: "Outline",
        description: "Bordered with no background fill.",
        code: `<Badge variant="outline">Draft</Badge>`,
      },
      {
        label: "Destructive",
        description: "Indicates an error or danger state.",
        code: `<Badge variant="destructive">Error</Badge>`,
      },
    ],
    props: [
      { name: "variant", type: '"default" | "secondary" | "outline" | "destructive"', defaultValue: '"default"', description: "Visual style of the badge." },
      { name: "children", type: "React.ReactNode", required: true, description: "The content to display inside the badge." },
      { name: "className", type: "string", description: "Additional CSS classes for customization." },
    ],
  },
  {
    id: "card",
    name: "Card",
    category: "display",
    description: "A flexible container component for grouping related content.",
    longDescription:
      "The Card component provides a structured surface to contain related groups of content. It comprises sub-components—CardHeader, CardTitle, CardDescription, CardContent, CardFooter—for maximum flexibility and semantic structure.",
    githubPath: "components/ui/card.tsx",
    tags: ["container", "layout", "surface"],
    usageCode: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>Deployed 2 hours ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your project is running smoothly in production.</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}`,
    variants: [
      {
        label: "Basic",
        description: "Simple card with header and content.",
        code: `<Card className="w-72">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description here.</CardDescription>
  </CardHeader>
  <CardContent>Content goes here.</CardContent>
</Card>`,
      },
      {
        label: "With Footer",
        description: "Card with action buttons in the footer.",
        code: `<Card className="w-72">
  <CardHeader>
    <CardTitle>Confirm Action</CardTitle>
  </CardHeader>
  <CardContent>Are you sure you want to proceed?</CardContent>
  <CardFooter className="flex gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>`,
      },
    ],
    props: [
      { name: "className", type: "string", description: "Additional CSS classes for the card container." },
      { name: "children", type: "React.ReactNode", required: true, description: "The content to render inside the card." },
    ],
  },
  {
    id: "input",
    name: "Input",
    category: "inputs",
    description: "A styled text input component for forms and data entry.",
    longDescription:
      "The Input component wraps the native HTML input element with consistent styling and supports all standard attributes. Pair it with Label and form validation libraries like react-hook-form for complete form experiences.",
    githubPath: "components/ui/input.tsx",
    tags: ["form", "text", "data-entry"],
    usageCode: `import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Example() {
  return (
    <div className="flex flex-col gap-4 w-72">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
      </div>
    </div>
  );
}`,
    variants: [
      {
        label: "Default",
        description: "Standard text input with placeholder.",
        code: `<Input placeholder="Search components..." />`,
      },
      {
        label: "With Label",
        description: "Paired with a Label for accessibility.",
        code: `<div className="flex flex-col gap-1.5 w-64">
  <Label htmlFor="name">Name</Label>
  <Input id="name" placeholder="John Doe" />
</div>`,
      },
      {
        label: "Disabled",
        description: "Non-interactive state.",
        code: `<Input disabled placeholder="Disabled input" className="w-64" />`,
      },
    ],
    props: [
      { name: "type", type: "string", defaultValue: '"text"', description: "HTML input type (text, email, password, number, etc.)." },
      { name: "placeholder", type: "string", description: "Placeholder text shown when the input is empty." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Prevents user interaction with the input." },
      { name: "value", type: "string", description: "Controlled value of the input." },
      { name: "onChange", type: "React.ChangeEventHandler<HTMLInputElement>", description: "Called when the input value changes." },
      { name: "className", type: "string", description: "Additional CSS classes for the input element." },
    ],
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "display",
    description: "A circular image component for displaying user profile pictures.",
    longDescription:
      "Avatar renders a circular image with graceful fallback support. If the image fails to load, it displays initials or a generic fallback icon. Built on Radix UI Avatar primitive for reliable image loading behavior.",
    githubPath: "components/ui/avatar.tsx",
    tags: ["user", "image", "profile"],
    usageCode: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Example() {
  return (
    <div className="flex gap-3 items-center">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  );
}`,
    variants: [
      {
        label: "With Image",
        description: "Avatar with a profile image.",
        code: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
  <AvatarFallback>SC</AvatarFallback>
</Avatar>`,
      },
      {
        label: "Fallback Initials",
        description: "Shows initials when image is unavailable.",
        code: `<Avatar>
  <AvatarFallback>AB</AvatarFallback>
</Avatar>`,
      },
    ],
    props: [
      { name: "src", type: "string", description: "URL of the avatar image (passed to AvatarImage)." },
      { name: "alt", type: "string", description: "Alt text for the avatar image (accessibility)." },
      { name: "children", type: "React.ReactNode", description: "AvatarImage and/or AvatarFallback components." },
      { name: "className", type: "string", description: "Additional CSS classes for the root element." },
    ],
  },
];

export const GITHUB_BASE_URL = "https://github.com/yourusername/your-repo/blob/main/src/";
