# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses **Bun** as the package manager (not npm/yarn):

- **Development**: `bun run dev` - Start Next.js development server
- **Build**: `bun run build` - Production build  
- **Start**: `bun run start` - Production server
- **Lint**: `bun run lint` - ESLint
- **Test**: `bun run test` - Jest test suite
- **Test Watch**: `bun run test:watch` - Jest in watch mode

## Architecture Overview

**marknenadov.com** is a Next.js 15 personal portfolio site using the App Router pattern with TypeScript and Tailwind CSS.

### Key Directories

- **`app/Components/`** - React components organized by type:
  - `base/` - Generic reusable components (GenericCard, GenericButton, GenericModal)
  - `modals/` - Modal components for detailed content display
  - `__tests__/` - Component unit tests
- **`app/Data/`** - Static JSON data files for projects and publications
- **`app/Models/`** - TypeScript interfaces and types
- **`app/api/`** - API routes (blog RSS feed proxy)

### Component Architecture

The site uses a **modal-based content display system** where sections open detailed information in reusable modals. Base components (GenericCard, GenericButton, GenericModal) provide consistent styling and behavior across all sections.

### Data Flow

Static data is stored in JSON files with corresponding TypeScript interfaces. External blog content is fetched via an API route that proxies RSS feeds. All data is type-safe through proper TypeScript modeling.

### Testing Strategy

Tests are co-located with components in `__tests__/` directories. Uses Jest with React Testing Library and jsdom environment. Coverage reports are generated in `/coverage/`.

## Important Notes

- **Package Manager**: Must use Bun (enforced by `.cursor/rules/forbid-npm-yarn.mdc`)
- **Component Pattern**: Always use the existing base components for consistency
- **Modal System**: Content sections use the GenericModal component for detailed displays
- **API Integration**: External content (blog) is fetched through API routes, not direct client calls
- **Performance**: Site maintains excellent Lighthouse scores - preserve optimization patterns