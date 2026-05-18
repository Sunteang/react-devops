# Component Showcase

A modern React component documentation and preview app built with Vite, TypeScript, Tailwind CSS, and Radix UI primitives.

This project is a local component library explorer that showcases reusable UI components, their props, usage examples, and live previews. It is ideal for demoing custom design-system components and validating implementation patterns.

## Features

- Interactive component documentation pages
- Live preview variants and usage code snippets
- Prop tables and metadata for each component
- Category-based navigation and routing
- Icon gallery page
- Built with Radix UI, React Router, React Query, and Tailwind CSS

## Included UI Components

The project contains a broad set of components under `src/components/ui/`, including:

- `Button`
- `Badge`
- `Card`
- `Accordion`
- `Alert`
- `AlertDialog`
- `Avatar`
- `Breadcrumb`
- `Calendar`
- `Carousel`
- `Checkbox`
- `Collapsible`
- `Command`
- `ContextMenu`
- `Dialog`
- `Drawer`
- `DropdownMenu`
- `Form`
- `HoverCard`
- `Input`
- `Label`
- `Menubar`
- `NavigationMenu`
- `Pagination`
- `Popover`
- `Progress`
- `RadioGroup`
- `ScrollArea`
- `Select`
- `Separator`
- `Sheet`
- `Skeleton`
- `Slider`
- `Switch`
- `Tabs`
- `Textarea`
- `Toast`
- `Tooltip`
- `Toggle`
- `ToggleGroup`
- `Sidebar`
- `Resizable`
- `Chart`

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Router DOM
- React Query
- Zod
- Vitest for testing

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run tests

```bash
npm run test
```

## Project Structure

- `src/App.tsx` – application root and route definitions
- `src/components/layout/` – documentation layout and navigation
- `src/components/ui/` – reusable UI component implementations
- `src/data/components.ts` – component metadata, docs, and examples
- `src/pages/` – page-level views for home, component details, icons, and 404
- `src/hooks/` – shared custom hooks
- `src/lib/` – utility functions
- `src/test/` – testing setup and examples

## Notes

- The app uses a component-driven docs model, with `componentDocs` defined in `src/data/components.ts`.
- Each component page renders usage examples, variant previews, and a prop table.

## License

This repository does not specify a license. Add one if you want to share or distribute the project publicly.
