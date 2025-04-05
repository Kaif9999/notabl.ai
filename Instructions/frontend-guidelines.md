# Notabl.ai Frontend Guidelines

This document provides comprehensive guidelines for the frontend implementation of Notabl.ai. It covers design principles, component architecture, code organization, and best practices to ensure consistency and maintainability.

## Table of Contents

1. [Design System](#1-design-system)
2. [Component Architecture](#2-component-architecture)
3. [Layout Structure](#3-layout-structure)
4. [Responsive Design Approach](#4-responsive-design-approach)
5. [State Management](#5-state-management)
6. [UI Component Library](#6-ui-component-library)
7. [Styling Guidelines](#7-styling-guidelines)
8. [Accessibility Standards](#8-accessibility-standards)
9. [Performance Optimizations](#9-performance-optimizations)
10. [Frontend Testing Strategy](#10-frontend-testing-strategy)
11. [Folder Structure](#11-folder-structure)
12. [Code Conventions](#12-code-conventions)

## 1. Design System

### 1.1. Design Tokens

Notabl.ai uses a consistent set of design tokens defined in CSS variables/Tailwind classes to ensure visual consistency.

#### Colors

```css
:root {
  /* Base colors */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  
  /* Card/UI element colors */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  
  /* Semantic colors */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  
  /* Status/utility colors */
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  
  /* UI element colors */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  
  /* Sidebar */
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  
  /* Brand Color */
  --ruby-primary: 340 82% 52%;
  
  /* Chart colors */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}
```

#### Dark Mode

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  /* ... Other dark mode values */
}
```

#### Spacing

Based on the codebase, we follow a standard spacing scale with Tailwind CSS classes:

- `p-1`, `p-2`, `p-3`, `p-4`, `p-6`, `p-8` - Padding scale
- `m-1`, `m-2`, `m-3`, `m-4`, `m-6`, `m-8` - Margin scale
- `gap-1`, `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8` - Gap scale

#### Typography

```css
/* Font families */
--font-sans: var(--font-geist-sans);
--font-mono: var(--font-geist-mono);

/* Font sizes follow Tailwind scale */
text-xs: 0.75rem;     /* 12px */
text-sm: 0.875rem;    /* 14px */
text-base: 1rem;      /* 16px */
text-lg: 1.125rem;    /* 18px */
text-xl: 1.25rem;     /* 20px */
text-2xl: 1.5rem;     /* 24px */
text-3xl: 1.875rem;   /* 30px */
text-4xl: 2.25rem;    /* 36px */
text-5xl: 3rem;       /* 48px */
```

#### Border Radius

```css
--radius: 0.625rem;
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
```

### 1.2. Design Principles

1. **Clean and Minimal**: Focus on content with clean, uncluttered interfaces
2. **Intuitive Navigation**: Clear hierarchy and consistent navigation patterns
3. **Visual Feedback**: Provide visual feedback for all user interactions
4. **Accessibility First**: Design with accessibility in mind from the beginning
5. **Responsive**: Seamless experience across all device sizes

### 1.3. Brand Elements

#### Logo & Icon

The Notabl.ai logo appears in the sidebar and consists of:
- A microphone icon in a square container
- "Notabl.ai" text in a bold purple font

```jsx
<div className="flex items-center">
  <div className="h-10 w-10 rounded-lg border-2 bg-black border-black flex items-center justify-center">
    <Mic className="h-6 w-6 text-purple-700" />
  </div>
  <span className="ml-2 text-2xl font-bold text-purple-600">Notabl.ai</span>
</div>
```

#### Brand Colors

- Primary Purple: `text-purple-600`, `text-purple-700`
- Black: `bg-black`
- White: `bg-white`
- Accent Colors: Various shades as defined in the design tokens

## 2. Component Architecture

### 2.1. Core Components

Notabl.ai uses a component-based architecture with these core components:

#### Layout Components

- `Sidebar`: Navigation and folder management
- `MainContent`: Main content area with note list or actions
- `NoteDetail`: Detailed view of a note with multiple tabs

#### Note Components

- `NoteCard`: Card representation of a note in lists
- `NoteView`/`EnhancedNoteView`: Detailed view with tabs for different content types
- `YouTubeProcessor`: Component for processing YouTube videos

#### Modal Components

- `RecordAudioModal`: Modal for recording audio
- `UploadModal`: Modal for uploading files
- `ProcessingModal`: Modal showing processing status
- `SettingsModal`: User settings configuration
- `EnhancedUpgradeModal`: Premium subscription flow

#### Form Components

These are primarily from the UI component library but are customized for Notabl.ai:

- `Button`: Multiple variants (primary, secondary, ghost, etc.)
- `Input`: Text input fields
- `Tabs`: Tab navigation for content types
- Various other form controls

### 2.2. Component Guidelines

1. **Single Responsibility**: Each component should do one thing well
2. **Composition Over Inheritance**: Use composition to build complex components
3. **Props Interface**: Define clear prop interfaces with TypeScript
4. **State Management**: Keep state at the appropriate level (local vs. context)
5. **Error Handling**: Include proper error states and fallbacks
6. **Loading States**: Always provide visual feedback during async operations

### 2.3. Component Implementation Template

```tsx
// ComponentName.tsx
import React, { useState, useEffect } from 'react';
import { SomeIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNoteContext } from "@/context/NoteContext";

interface ComponentNameProps {
  propOne: string;
  propTwo?: number;
  onAction: () => void;
}

export function ComponentName({ propOne, propTwo = 0, onAction }: ComponentNameProps) {
  // Local state
  const [localState, setLocalState] = useState<string>('');
  
  // Context
  const { someContextValue } = useNoteContext();
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Event handlers
  const handleClick = () => {
    setLocalState('new value');
    onAction();
  };
  
  // Conditional rendering
  if (!propOne) {
    return <div>Missing required prop</div>;
  }
  
  // Component rendering
  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-2">{propOne}</h2>
      <p className="text-gray-600">{someContextValue}</p>
      
      <Button onClick={handleClick} className="mt-4">
        <SomeIcon className="mr-2 h-4 w-4" />
        Take Action
      </Button>
    </div>
  );
}
```

## 3. Layout Structure

### 3.1. App Layout

The application uses a consistent layout structure:

```jsx
<div className="flex min-h-screen w-full relative">
  {/* Sidebar */}
  <Sidebar />
  
  {/* Main Content */}
  <div className="flex-1">
    <MainContent />
  </div>
</div>
```

### 3.2. Sidebar Layout

The sidebar contains:

1. App logo
2. Folders section
3. User profile and settings
4. Upgrade prompt for free users

```jsx
<div className="w-64 h-screen border-r-2 border-gray-200 flex flex-col bg-white">
  {/* Logo */}
  <div className="p-4">
    <Logo />
  </div>
  
  {/* Folders */}
  <div className="mt-6 px-4">
    <FoldersList />
  </div>
  
  {/* User section (at bottom) */}
  <div className="mt-auto px-4 py-4">
    <UserProfile />
    <UpgradePrompt />
  </div>
</div>
```

### 3.3. Main Content Layout

The main content area has this general layout:

```jsx
<div className="max-w-5xl mx-auto py-8 px-6">
  {/* Breadcrumb navigation */}
  <BreadcrumbNav />
  
  {/* Header and search */}
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
    <PageTitle />
    <SearchInput />
  </div>
  
  {/* Content blocks */}
  <YouTubeProcessor />
  
  {/* Notes grid */}
  <div className="grid grid-cols-1 gap-4">
    {notes.map(note => <NoteCard key={note.id} note={note} />)}
  </div>
</div>
```

### 3.4. Note Detail Layout

The note detail view uses tabs for different content types:

```jsx
<div className="max-w-4xl mx-auto py-8 px-4">
  <Tabs defaultValue="note">
    <TabsList>
      {contentTypes.map(type => (
        <TabsTrigger key={type.id} value={type.id}>
          {type.icon}{type.label}
        </TabsTrigger>
      ))}
    </TabsList>
    
    {contentTypes.map(type => (
      <TabsContent key={type.id} value={type.id}>
        {renderContent(type.id)}
      </TabsContent>
    ))}
  </Tabs>
</div>
```

## 4. Responsive Design Approach

### 4.1. Mobile Detection

The application uses a custom hook for detecting mobile devices:

```tsx
// hooks/use-mobile.ts
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  return isMobile;
}
```

### 4.2. Responsive Breakpoints

Following Tailwind CSS breakpoints:

- `sm`: 640px - Small devices (phones in landscape)
- `md`: 768px - Medium devices (tablets)
- `lg`: 1024px - Large devices (desktops)
- `xl`: 1280px - Extra large devices (large desktops)
- `2xl`: 1536px - Extra extra large devices

### 4.3. Mobile-First Approach

All components should be implemented with a mobile-first approach:

```jsx
// Start with mobile styles
<div className="flex flex-col p-4">
  {/* Add responsive adjustments for larger screens */}
  <div className="w-full md:w-1/2 lg:w-1/3">
    {/* Component content */}
  </div>
</div>
```

### 4.4. Mobile Navigation

For mobile view, the sidebar becomes a slide-in panel:

```jsx
{/* Mobile sidebar */}
{isMobile && showMobileSidebar && (
  <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="absolute left-0 top-0 h-full w-3/4 max-w-xs shadow-lg">
      <Sidebar 
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenUpgrade={() => setUpgradeOpen(true)}
        onClose={() => setShowMobileSidebar(false)}
      />
    </div>
  </div>
)}

{/* Mobile menu button */}
{isMobile && (
  <Button
    variant="ghost"
    size="icon"
    className="fixed left-4 top-4 z-40"
    onClick={() => setShowMobileSidebar(true)}
  >
    <Menu className="h-5 w-5" />
  </Button>
)}
```

### 4.5. Responsive Guidelines

1. **Test on real devices** - Always verify layouts on actual mobile devices
2. **No fixed widths** - Use percentages, viewport units, or Flexbox/Grid
3. **Touch targets** - Minimum 44x44px for interactive elements on mobile
4. **Font sizes** - Min 16px for body text, ensure readability on all devices
5. **Feature/content parity** - Mobile users should have access to all features

## 5. State Management

### 5.1. Local Component State

Use React's `useState` for component-specific state:

```tsx
function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  
  return (
    /* Component using isOpen and value */
  );
}
```

### 5.2. Context API

Notabl.ai uses React Context for app-wide state management:

```tsx
// context/NoteContext.tsx
export function NoteProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({/* ... */});
  
  // Methods to manipulate state
  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };
  
  // Create context value
  const contextValue = {
    notes,
    folders,
    userProfile,
    addNote,
    // Other methods
  };
  
  return (
    <NoteContext.Provider value={contextValue}>
      {children}
    </NoteContext.Provider>
  );
}

// Usage in components
export function SomeComponent() {
  const { notes, addNote } = useNoteContext();
  
  // Use notes and addNote
}
```

### 5.3. State Structure

The main pieces of state managed in the application:

- **Notes**: Collection of user's notes
- **Folders**: User's organizational folders
- **User Profile**: User data and preferences
- **Subscription Status**: User's plan and limits
- **UI State**: Modal visibility, active tabs, etc.

### 5.4. State Management Guidelines

1. **Appropriate Level**: Keep state at the lowest possible level in the component tree
2. **Context for Shared State**: Use Context only for state needed by multiple components
3. **TypeScript**: Define proper types for all state
4. **Immutability**: Always update state immutably
5. **Initial State**: Define sensible initial states

## 6. UI Component Library

### 6.1. Core UI Components

Notabl.ai uses a set of reusable UI components:

#### Button

```jsx
<Button 
  variant="default|outline|ghost|destructive" 
  size="default|sm|lg|icon"
  className="custom-class"
  onClick={handleClick}
  disabled={isDisabled}
>
  Button Text
</Button>
```

#### Input

```jsx
<Input
  type="text|email|password"
  placeholder="Enter text..."
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  className="custom-class"
  disabled={isDisabled}
/>
```

#### Tabs

```jsx
<Tabs defaultValue="tab1" onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Dialog/Modal

```jsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description here.</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>
      <Button onClick={onClose}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### DropdownMenu

```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={handleEdit}>
      <FileEdit className="mr-2 h-4 w-4" />
      <span>Edit</span>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDelete} className="text-red-600">
      <Trash className="mr-2 h-4 w-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 6.2. Custom Components

#### NoteCard

The note card is a key component that displays a note preview in the list view:

```jsx
<div className="group relative bg-white border border-gray-200 rounded-lg p-4">
  <Link href={`/dashboard/notes/${note.id}`} className="block">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2">
        {getSourceIcon()}
        <h3 className="font-medium text-gray-900 line-clamp-1">{note.title}</h3>
      </div>
      <div className="flex items-center">
        {/* Actions menu */}
      </div>
    </div>
    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{note.content}</p>
    <div className="mt-3 flex items-center justify-between">
      <span className="text-xs text-gray-500">{formatDate(new Date(note.updatedAt))}</span>
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </div>
  </Link>
</div>
```

#### UserLimitWarning

Displays warning when free users approach their limit:

```jsx
<div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
  <div className="flex items-start gap-3">
    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
    <div className="flex-1">
      <h3 className="font-medium text-amber-800 mb-2">
        {notesRemaining === 0
          ? "You've reached your free plan limit"
          : `You have ${notesRemaining} note${notesRemaining === 1 ? '' : 's'} remaining`}
      </h3>
      <p className="text-sm text-amber-700 mb-3">
        {notesRemaining === 0
          ? "Upgrade to premium to create unlimited notes and unlock all features."
          : "Free accounts are limited to 5 notes. Upgrade to premium for unlimited notes."}
      </p>
      
      <div className="mb-3">
        <ProgressBar value={userProfile.notesUsed} max={5} />
      </div>
      
      <Button
        className="bg-black hover:bg-black/90 text-white"
        onClick={onUpgrade}
      >
        Upgrade to Premium
      </Button>
    </div>
  </div>
</div>
```

### 6.3. Component Usage Guidelines

1. **Consistent Props**: Use consistent prop names across similar components
2. **Default Values**: Provide sensible defaults for optional props
3. **Composition**: Compose complex UI from simpler components
4. **Loading States**: Include loading states for async components
5. **Error States**: Handle and display errors gracefully

## 7. Styling Guidelines

### 7.1. CSS Architecture

Notabl.ai uses Tailwind CSS for styling with a few custom extensions:

```tsx
// Using Tailwind classes directly in components
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
  <h2 className="text-xl font-bold text-gray-900">Component Title</h2>
  <Button variant="outline" size="sm">Action</Button>
</div>
```

### 7.2. Class Naming Conventions

When using custom CSS classes (not Tailwind utilities):

1. Use kebab-case for class names: `my-custom-class`
2. Use BEM-like naming for component-specific styles:
   - Block: `note-card`
   - Element: `note-card__title`, `note-card__content`
   - Modifier: `note-card--featured`, `note-card--compact`

```css
.note-card {
  /* Base styles */
}

.note-card__title {
  /* Title-specific styles */
}

.note-card--featured {
  /* Featured variant styles */
}
```

### 7.3. CSS Custom Properties (Variables)

Use CSS variables for theme configuration:

```css
:root {
  --color-primary: hsl(265, 100%, 50%);
  --font-sans: 'Inter', sans-serif;
}

.selector {
  color: var(--color-primary);
  font-family: var(--font-sans);
}
```

### 7.4. Tailwind Best Practices

1. **Responsive Variants**: Use responsive prefixes (`sm:`, `md:`, `lg:`) consistently
2. **Custom Extensions**: Add custom utilities through `tailwind.config.js`
3. **Component Classes**: Create custom component classes for frequently used combinations
4. **Dark Mode**: Use dark mode variants (`dark:`) for themed components

### 7.5. Styling Order

Organize Tailwind classes in a consistent order:

1. Layout (`flex`, `grid`, `block`, etc.)
2. Positioning (`relative`, `absolute`, etc.)
3. Display (`hidden`, `visible`, etc.)
4. Spacing (`p-4`, `m-2`, etc.)
5. Sizing (`w-full`, `h-10`, etc.)
6. Typography (`text-lg`, `font-bold`, etc.)
7. Backgrounds (`bg-white`, etc.)
8. Borders (`border`, `rounded-lg`, etc.)
9. Effects (`shadow-sm`, etc.)
10. Transitions (`transition`, `hover:`, etc.)

```jsx
<div className="
  flex flex-col             /* Layout */
  relative                  /* Positioning */
  p-4 mb-6                  /* Spacing */
  w-full h-auto             /* Sizing */
  text-sm font-medium       /* Typography */
  bg-white                  /* Background */
  border border-gray-200 rounded-lg /* Borders */
  shadow-sm                 /* Effects */
  transition-all hover:bg-gray-50 /* Transitions */
">
  Content
</div>
```

## 8. Accessibility Standards

### 8.1. Core Requirements

Notabl.ai adheres to WCAG 2.1 AA standards:

1. **Perceivable**: Information must be presentable to users in ways they can perceive
2. **Operable**: User interface and navigation must be operable
3. **Understandable**: Information and operation must be understandable
4. **Robust**: Content must be robust enough to work with assistive technologies

### 8.2. Implementation Guidelines

#### Semantic HTML

Use semantic HTML elements appropriately:

```jsx
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <section>
    <h1>Page Title</h1>
    <article>
      <h2>Article Title</h2>
      <p>Content</p>
    </article>
  </section>
</main>

<footer>
  <p>Footer content</p>
</footer>
```

#### ARIA Attributes

Use ARIA attributes when needed:

```jsx
<button 
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClick}
>
  <X className="h-4 w-4" />
</button>

<div 
  role="alert"
  aria-live="assertive"
>
  Error message
</div>
```

#### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```jsx
<button 
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  tabIndex={0}
>
  Action
</button>
```

#### Focus Management

Manage focus for modal dialogs and dynamic content:

```jsx
useEffect(() => {
  if (isOpen) {
    // Set focus to first focusable element
    firstFocusableRef.current?.focus();
  }
  
  return () => {
    // Return focus to trigger element
    triggerRef.current?.focus();
  };
}, [isOpen]);
```

### 8.3. Accessibility Checklist

- [ ] Sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- [ ] Keyboard navigation for all interactive elements
- [ ] Proper focus management for modals and dynamic content
- [ ] Alt text for all images and icons
- [ ] ARIA labels for elements without visible text
- [ ] Proper heading hierarchy
- [ ] Screen reader announcements for dynamic content
- [ ] Form labels and error messages

## 9. Performance Optimizations

### 9.1. Code Splitting

Use Next.js dynamic imports to load components only when needed:

```tsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Optional: disable server-side rendering
});
```

### 9.2. Image Optimization

Use Next.js `Image` component for optimized images:

```jsx
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="User profile"
  width={64}
  height={64}
  className="rounded-full"
  priority={isAboveFold}
/>
```

### 9.3. Component Optimization

Use React.memo for pure components that render frequently:

```tsx
const MemoizedComponent = React.memo(function Component(props) {
  return <div>{props.value}</div>;
});
```

Use the `useMemo` and `useCallback` hooks to optimize expensive calculations and event handlers:

```tsx
const expensiveComputation = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

### 9.4. Virtual Lists

For long lists, consider using a virtualized list library like `react-window`:

```tsx
import { FixedSizeList } from 'react-window';

function NotesList({ notes }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <NoteCard note={notes[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={notes.length}
      itemSize={120}
    >
      {Row}
    </FixedSizeList>
  );
}
```

### 9.5. Performance Checklist

- [ ] Lazy loading for below-the-fold content
- [ ] Code splitting for large components and libraries
- [ ] Optimized images and assets
- [ ] Memoization for expensive calculations
- [ ] Debouncing for frequent events (e.g., search input)
- [ ] Virtual lists for long data sets
- [ ] Efficient re-rendering strategies (React.memo, useMemo, useCallback)

## 10. Frontend Testing Strategy

### 10.1. Testing Layers

Notabl.ai implements a comprehensive testing strategy:

1. **Unit Tests**: For individual functions and components
2. **Integration Tests**: For component interactions
3. **End-to-End Tests**: For critical user flows

### 10.2. Component Testing

Use React Testing Library for component tests:

```tsx
// NoteCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { NoteCard } from '@/components/note/NoteCard';

describe('NoteCard', () => {
  const mockNote = {
    id: 'note-1',
    title: 'Test Note',
    content: 'Test content',
    folderId: 'folder-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    sourceType: 'text'
  };
  
  const mockDelete = jest.fn();
  
  it('renders note details correctly', () => {
    render(<NoteCard note={mockNote} onDelete={mockDelete} />);
    
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  it('calls onDelete when delete button is clicked', () => {
    render(<NoteCard note={mockNote} onDelete={mockDelete} />);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDelete).toHaveBeenCalledWith('note-1');
  });
});
```

### 10.3. Context Testing

Test components that use Context:

```tsx
// With Context provider
import { NoteProvider } from '@/context/NoteContext';

function renderWithContext(ui) {
  return render(
    <NoteProvider>
      {ui}
    </NoteProvider>
  );
}

test('component using context', () => {
  renderWithContext(<ComponentUsingContext />);
  // Test assertions
});
```

### 10.4. E2E Testing

Use Cypress for end-to-end testing:

```js
// cypress/e2e/create-note.cy.js
describe('Note Creation Flow', () => {
  beforeEach(() => {
    // Login and set up test
    cy.login();
    cy.visit('/dashboard');
  });
  
  it('creates a new note from YouTube video', () => {
    // Enter a YouTube URL
    cy.get('input[placeholder="Enter YouTube video URL"]')
      .type('https://www.youtube.com/watch?v=VIDEO_ID');
    
    // Click process button
    cy.contains('button', 'Process Video').click();
    
    // Wait for processing
    cy.contains('Generating transcript...').should('be.visible');
    
    // Check that note is created
    cy.contains('h3', 'Video Title').should('be.visible');
  });
});
```

### 10.5. Testing Guidelines

1. **Prioritize User Behavior**: Test what users do, not implementation details
2. **Use Test IDs**: Add `data-testid` attributes for reliable selectors
3. **Mock External Services**: Use mock services for API calls
4. **Test Edge Cases**: Cover loading, error, and empty states
5. **Test Accessibility**: Include accessibility assertions

## 11. Folder Structure

Notabl.ai follows the Next.js App Router folder structure with additional organization:

```
app/
├── api/                       # API routes
│   ├── content/
│   ├── transcript/
│   ├── subscriptions/
│   └── webhooks/
├── dashboard/                 # Dashboard routes
│   ├── folder/
│   │   └── [folderId]/
│   ├── notes/
│   │   └── [noteId]/
│   └── page.tsx
├── (auth)/                    # Auth routes
│   ├── signin/
│   └── signup/
├── globals.css                # Global styles
├── layout.tsx                 # Root layout
└── page.tsx                   # Home page

components/
├── layout/                    # Layout components
│   ├── MainContent.tsx
│   └── Sidebar.tsx
├── modals/                    # Modal components
│   ├── ProcessingModal.tsx
│   ├── RecordAudioModal.tsx
│   └── UpgradeModal.tsx
├── note/                      # Note components
│   ├── NoteCard.tsx
│   └── NoteView.tsx
└── ui/                        # UI components
    ├── button.tsx
    ├── input.tsx
    └── ...

context/
└── NoteContext.tsx            # Application context

hooks/
├── use-mobile.ts              # Custom hooks
└── ...

lib/
├── actions/                   # Server actions
├── airwallex.ts               # Airwallex integration
└── prisma.ts                  # Prisma client

public/
├── images/                    # Static images
└── ...

types/
└── index.ts                   # TypeScript types

utils/
└── noteUtils.ts               # Utility functions
```

### 11.1. File Naming Conventions

- **Components**: PascalCase (e.g., `NoteCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useNoteContext.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Context**: PascalCase with `Context` suffix (e.g., `NoteContext.tsx`)
- **Types**: PascalCase with optional `Type` suffix (e.g., `Note.ts`, `UserProfileType.ts`)

### 11.2. Component Organization

Group related components together:

```
components/
├── note/                 # Note-related components
│   ├── NoteCard.tsx
│   ├── NoteView.tsx
│   ├── NoteActions.tsx
│   └── index.ts          # Re-export all components
```

Export all components from an `index.ts` file:

```tsx
// components/note/index.ts
export * from './NoteCard';
export * from './NoteView';
export * from './NoteActions';
```

Import grouped components:

```tsx
// Import specific components
import { NoteCard, NoteView } from '@/components/note';

// Or import all
import * as NoteComponents from '@/components/note';
```

## 12. Code Conventions

### 12.1. TypeScript Guidelines

#### Types

Define interfaces for props, state, and data structures:

```tsx
// types/index.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string;
  createdAt: Date;
  updatedAt: Date;
  sourceType: "text" | "audio" | "pdf" | "youtube";
  sourceUrl?: string;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
}

export type NoteView = "note" | "quiz" | "flashcards" | "transcript" | "mindmap";

export type ProcessingStatus = 
  | "idle" 
  | "recording" 
  | "uploading" 
  | "transcribing" 
  | "generating" 
  | "completed" 
  | "error";
```

#### Props

Always type component props:

```tsx
interface ButtonProps {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({
  variant = "default",
  size = "default",
  className,
  disabled = false,
  onClick,
  children
}: ButtonProps) {
  // Component implementation
}
```

### 12.2. JavaScript/TypeScript Style Guide

1. **Use arrow functions** for consistent syntax
2. **Destructure props** at the top of components
3. **Use async/await** instead of promise chains
4. **Prefer const** over let when possible
5. **Use optional chaining** and nullish coalescing
6. **Include proper TypeScript types** for all variables and functions

### 12.3. React Best Practices

1. **Functional Components**: Use functional components with hooks
2. **Controlled Components**: Use controlled form components
3. **Custom Hooks**: Extract reusable logic into custom hooks
4. **Error Boundaries**: Use error boundaries to catch and handle errors
5. **Fragment Shorthand**: Use `<>...</>` for fragments
6. **Destructuring Props**: Destructure props for cleaner code

### 12.4. Importing Order

```tsx
// 1. React and Next.js imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 2. Third-party libraries
import { toast } from 'sonner';
import { Menu, ChevronRight } from 'lucide-react';

// 3. Application components, grouped by directory
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NoteCard, NoteView } from '@/components/note';

// 4. Hooks, context and utilities
import { useNoteContext } from '@/context/NoteContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatDate } from '@/utils/dateUtils';

// 5. Types
import type { Note, ProcessingStatus } from '@/types';

// 6. Styles (if imported separately)
import styles from './Component.module.css';
```

### 12.5. Comments and Documentation

1. **Component Documentation**: Include JSDoc comments for components

```tsx
/**
 * NoteCard displays a preview of a note in list view.
 * 
 * @param note - The note object to display
 * @param onDelete - Optional callback when delete action is triggered
 * @example
 * <NoteCard note={noteObject} onDelete={handleDelete} />
 */
export function NoteCard({ 
  note, 
  onDelete 
}: NoteCardProps) {
  // Implementation
}
```

2. **Complex Logic**: Comment complex logic or workarounds

```tsx
// This is a workaround for a browser inconsistency
// See: https://github.com/example/issue/123
const fixedValue = originalValue.replace(/\s+/g, ' ').trim();
```

## Conclusion

These frontend guidelines establish a consistent approach to developing the Notabl.ai application. By following these standards, the team can ensure a cohesive user experience, maintainable codebase, and efficient development process.

Remember that these guidelines are a living document and should evolve as the project grows and technologies change.# Notabl.ai Frontend Guidelines

This document provides comprehensive guidelines for the frontend implementation of Notabl.ai. It covers design principles, component architecture, code organization, and best practices to ensure consistency and maintainability.

## Table of Contents

1. [Design System](#1-design-system)
2. [Component Architecture](#2-component-architecture)
3. [Layout Structure](#3-layout-structure)
4. [Responsive Design Approach](#4-responsive-design-approach)
5. [State Management](#5-state-management)
6. [UI Component Library](#6-ui-component-library)
7. [Styling Guidelines](#7-styling-guidelines)
8. [Accessibility Standards](#8-accessibility-standards)
9. [Performance Optimizations](#9-performance-optimizations)
10. [Frontend Testing Strategy](#10-frontend-testing-strategy)
11. [Folder Structure](#11-folder-structure)
12. [Code Conventions](#12-code-conventions)

## 1. Design System

### 1.1. Design Tokens

Notabl.ai uses a consistent set of design tokens defined in CSS variables/Tailwind classes to ensure visual consistency.

#### Colors

```css
:root {
  /* Base colors */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  
  /* Card/UI element colors */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  
  /* Semantic colors */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  
  /* Status/utility colors */
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  
  /* UI element colors */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  
  /* Sidebar */
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  
  /* Brand Color */
  --ruby-primary: 340 82% 52%;
  
  /* Chart colors */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}
```

#### Dark Mode

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  /* ... Other dark mode values */
}
```

#### Spacing

Based on the codebase, we follow a standard spacing scale with Tailwind CSS classes:

- `p-1`, `p-2`, `p-3`, `p-4`, `p-6`, `p-8` - Padding scale
- `m-1`, `m-2`, `m-3`, `m-4`, `m-6`, `m-8` - Margin scale
- `gap-1`, `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8` - Gap scale

#### Typography

```css
/* Font families */
--font-sans: var(--font-geist-sans);
--font-mono: var(--font-geist-mono);

/* Font sizes follow Tailwind scale */
text-xs: 0.75rem;     /* 12px */
text-sm: 0.875rem;    /* 14px */
text-base: 1rem;      /* 16px */
text-lg: 1.125rem;    /* 18px */
text-xl: 1.25rem;     /* 20px */
text-2xl: 1.5rem;     /* 24px */
text-3xl: 1.875rem;   /* 30px */
text-4xl: 2.25rem;    /* 36px */
text-5xl: 3rem;       /* 48px */
```

#### Border Radius

```css
--radius: 0.625rem;
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
```

### 1.2. Design Principles

1. **Clean and Minimal**: Focus on content with clean, uncluttered interfaces
2. **Intuitive Navigation**: Clear hierarchy and consistent navigation patterns
3. **Visual Feedback**: Provide visual feedback for all user interactions
4. **Accessibility First**: Design with accessibility in mind from the beginning
5. **Responsive**: Seamless experience across all device sizes

### 1.3. Brand Elements

#### Logo & Icon

The Notabl.ai logo appears in the sidebar and consists of:
- A microphone icon in a square container
- "Notabl.ai" text in a bold purple font

```jsx
<div className="flex items-center">
  <div className="h-10 w-10 rounded-lg border-2 bg-black border-black flex items-center justify-center">
    <Mic className="h-6 w-6 text-purple-700" />
  </div>
  <span className="ml-2 text-2xl font-bold text-purple-600">Notabl.ai</span>
</div>
```

#### Brand Colors

- Primary Purple: `text-purple-600`, `text-purple-700`
- Black: `bg-black`
- White: `bg-white`
- Accent Colors: Various shades as defined in the design tokens

## 2. Component Architecture

### 2.1. Core Components

Notabl.ai uses a component-based architecture with these core components:

#### Layout Components

- `Sidebar`: Navigation and folder management
- `MainContent`: Main content area with note list or actions
- `NoteDetail`: Detailed view of a note with multiple tabs

#### Note Components

- `NoteCard`: Card representation of a note in lists
- `NoteView`/`EnhancedNoteView`: Detailed view with tabs for different content types
- `YouTubeProcessor`: Component for processing YouTube videos

#### Modal Components

- `RecordAudioModal`: Modal for recording audio
- `UploadModal`: Modal for uploading files
- `ProcessingModal`: Modal showing processing status
- `SettingsModal`: User settings configuration
- `EnhancedUpgradeModal`: Premium subscription flow

#### Form Components

These are primarily from the UI component library but are customized for Notabl.ai:

- `Button`: Multiple variants (primary, secondary, ghost, etc.)
- `Input`: Text input fields
- `Tabs`: Tab navigation for content types
- Various other form controls

### 2.2. Component Guidelines

1. **Single Responsibility**: Each component should do one thing well
2. **Composition Over Inheritance**: Use composition to build complex components
3. **Props Interface**: Define clear prop interfaces with TypeScript
4. **State Management**: Keep state at the appropriate level (local vs. context)
5. **Error Handling**: Include proper error states and fallbacks
6. **Loading States**: Always provide visual feedback during async operations

### 2.3. Component Implementation Template

```tsx
// ComponentName.tsx
import React, { useState, useEffect } from 'react';
import { SomeIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNoteContext } from "@/context/NoteContext";

interface ComponentNameProps {
  propOne: string;
  propTwo?: number;
  onAction: () => void;
}

export function ComponentName({ propOne, propTwo = 0, onAction }: ComponentNameProps) {
  // Local state
  const [localState, setLocalState] = useState<string>('');
  
  // Context
  const { someContextValue } = useNoteContext();
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Event handlers
  const handleClick = () => {
    setLocalState('new value');
    onAction();
  };
  
  // Conditional rendering
  if (!propOne) {
    return <div>Missing required prop</div>;
  }
  
  // Component rendering
  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-2">{propOne}</h2>
      <p className="text-gray-600">{someContextValue}</p>
      
      <Button onClick={handleClick} className="mt-4">
        <SomeIcon className="mr-2 h-4 w-4" />
        Take Action
      </Button>
    </div>
  );
}
```

## 3. Layout Structure

### 3.1. App Layout

The application uses a consistent layout structure:

```jsx
<div className="flex min-h-screen w-full relative">
  {/* Sidebar */}
  <Sidebar />
  
  {/* Main Content */}
  <div className="flex-1">
    <MainContent />
  </div>
</div>
```

### 3.2. Sidebar Layout

The sidebar contains:

1. App logo
2. Folders section
3. User profile and settings
4. Upgrade prompt for free users

```jsx
<div className="w-64 h-screen border-r-2 border-gray-200 flex flex-col bg-white">
  {/* Logo */}
  <div className="p-4">
    <Logo />
  </div>
  
  {/* Folders */}
  <div className="mt-6 px-4">
    <FoldersList />
  </div>
  
  {/* User section (at bottom) */}
  <div className="mt-auto px-4 py-4">
    <UserProfile />
    <UpgradePrompt />
  </div>
</div>
```

### 3.3. Main Content Layout

The main content area has this general layout:

```jsx
<div className="max-w-5xl mx-auto py-8 px-6">
  {/* Breadcrumb navigation */}
  <BreadcrumbNav />
  
  {/* Header and search */}
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
    <PageTitle />
    <SearchInput />
  </div>
  
  {/* Content blocks */}
  <YouTubeProcessor />
  
  {/* Notes grid */}
  <div className="grid grid-cols-1 gap-4">
    {notes.map(note => <NoteCard key={note.id} note={note} />)}
  </div>
</div>
```

### 3.4. Note Detail Layout

The note detail view uses tabs for different content types:

```jsx
<div className="max-w-4xl mx-auto py-8 px-4">
  <Tabs defaultValue="note">
    <TabsList>
      {contentTypes.map(type => (
        <TabsTrigger key={type.id} value={type.id}>
          {type.icon}{type.label}
        </TabsTrigger>
      ))}
    </TabsList>
    
    {contentTypes.map(type => (
      <TabsContent key={type.id} value={type.id}>
        {renderContent(type.id)}
      </TabsContent>
    ))}
  </Tabs>
</div>
```

## 4. Responsive Design Approach

### 4.1. Mobile Detection

The application uses a custom hook for detecting mobile devices:

```tsx
// hooks/use-mobile.ts
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  return isMobile;
}
```

### 4.2. Responsive Breakpoints

Following Tailwind CSS breakpoints:

- `sm`: 640px - Small devices (phones in landscape)
- `md`: 768px - Medium devices (tablets)
- `lg`: 1024px - Large devices (desktops)
- `xl`: 1280px - Extra large devices (large desktops)
- `2xl`: 1536px - Extra extra large devices

### 4.3. Mobile-First Approach

All components should be implemented with a mobile-first approach:

```jsx
// Start with mobile styles
<div className="flex flex-col p-4">
  {/* Add responsive adjustments for larger screens */}
  <div className="w-full md:w-1/2 lg:w-1/3">
    {/* Component content */}
  </div>
</div>
```

### 4.4. Mobile Navigation

For mobile view, the sidebar becomes a slide-in panel:

```jsx
{/* Mobile sidebar */}
{isMobile && showMobileSidebar && (
  <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="absolute left-0 top-0 h-full w-3/4 max-w-xs shadow-lg">
      <Sidebar 
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenUpgrade={() => setUpgradeOpen(true)}
        onClose={() => setShowMobileSidebar(false)}
      />
    </div>
  </div>
)}

{/* Mobile menu button */}
{isMobile && (
  <Button
    variant="ghost"
    size="icon"
    className="fixed left-4 top-4 z-40"
    onClick={() => setShowMobileSidebar(true)}
  >
    <Menu className="h-5 w-5" />
  </Button>
)}
```

### 4.5. Responsive Guidelines

1. **Test on real devices** - Always verify layouts on actual mobile devices
2. **No fixed widths** - Use percentages, viewport units, or Flexbox/Grid
3. **Touch targets** - Minimum 44x44px for interactive elements on mobile
4. **Font sizes** - Min 16px for body text, ensure readability on all devices
5. **Feature/content parity** - Mobile users should have access to all features

## 5. State Management

### 5.1. Local Component State

Use React's `useState` for component-specific state:

```tsx
function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  
  return (
    /* Component using isOpen and value */
  );
}
```

### 5.2. Context API

Notabl.ai uses React Context for app-wide state management:

```tsx
// context/NoteContext.tsx
export function NoteProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({/* ... */});
  
  // Methods to manipulate state
  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };
  
  // Create context value
  const contextValue = {
    notes,
    folders,
    userProfile,
    addNote,
    // Other methods
  };
  
  return (
    <NoteContext.Provider value={contextValue}>
      {children}
    </NoteContext.Provider>
  );
}

// Usage in components
export function SomeComponent() {
  const { notes, addNote } = useNoteContext();
  
  // Use notes and addNote
}
```

### 5.3. State Structure

The main pieces of state managed in the application:

- **Notes**: Collection of user's notes
- **Folders**: User's organizational folders
- **User Profile**: User data and preferences
- **Subscription Status**: User's plan and limits
- **UI State**: Modal visibility, active tabs, etc.

### 5.4. State Management Guidelines

1. **Appropriate Level**: Keep state at the lowest possible level in the component tree
2. **Context for Shared State**: Use Context only for state needed by multiple components
3. **TypeScript**: Define proper types for all state
4. **Immutability**: Always update state immutably
5. **Initial State**: Define sensible initial states

## 6. UI Component Library

### 6.1. Core UI Components

Notabl.ai uses a set of reusable UI components:

#### Button

```jsx
<Button 
  variant="default|outline|ghost|destructive" 
  size="default|sm|lg|icon"
  className="custom-class"
  onClick={handleClick}
  disabled={isDisabled}
>
  Button Text
</Button>
```

#### Input

```jsx
<Input
  type="text|email|password"
  placeholder="Enter text..."
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  className="custom-class"
  disabled={isDisabled}
/>
```

#### Tabs

```jsx
<Tabs defaultValue="tab1" onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Dialog/Modal

```jsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description here.</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>
      <Button onClick={onClose}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### DropdownMenu

```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={handleEdit}>
      <FileEdit className="mr-2 h-4 w-4" />
      <span>Edit</span>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDelete} className="text-red-600">
      <Trash className="mr-2 h-4 w-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 6.2. Custom Components

#### NoteCard

The note card is a key component that displays a note preview in the list view:

```jsx
<div className="group relative bg-white border border-gray-200 rounded-lg p-4">
  <Link href={`/dashboard/notes/${note.id}`} className="block">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2">
        {getSourceIcon()}
        <h3 className="font-medium text-gray-900 line-clamp-1">{note.title}</h3>
      </div>
      <div className="flex items-center">
        {/* Actions menu */}
      </div>
    </div>
    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{note.content}</p>
    <div className="mt-3 flex items-center justify-between">
      <span className="text-xs text-gray-500">{formatDate(new Date(note.updatedAt))}</span>
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </div>
  </Link>
</div>
```

#### UserLimitWarning

Displays warning when free users approach their limit:

```jsx
<div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
  <div className="flex items-start gap-3">
    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
    <div className="flex-1">
      <h3 className="font-medium text-amber-800 mb-2">
        {notesRemaining === 0
          ? "You've reached your free plan limit"
          : `You have ${notesRemaining} note${notesRemaining === 1 ? '' : 's'} remaining`}
      </h3>
      <p className="text-sm text-amber-700 mb-3">
        {notesRemaining === 0
          ? "Upgrade to premium to create unlimited notes and unlock all features."
          : "Free accounts are limited to 5 notes. Upgrade to premium for unlimited notes."}
      </p>
      
      <div className="mb-3">
        <ProgressBar value={userProfile.notesUsed} max={5} />
      </div>
      
      <Button
        className="bg-black hover:bg-black/90 text-white"
        onClick={onUpgrade}
      >
        Upgrade to Premium
      </Button>
    </div>
  </div>
</div>
```

### 6.3. Component Usage Guidelines

1. **Consistent Props**: Use consistent prop names across similar components
2. **Default Values**: Provide sensible defaults for optional props
3. **Composition**: Compose complex UI from simpler components
4. **Loading States**: Include loading states for async components
5. **Error States**: Handle and display errors gracefully

## 7. Styling Guidelines

### 7.1. CSS Architecture

Notabl.ai uses Tailwind CSS for styling with a few custom extensions:

```tsx
// Using Tailwind classes directly in components
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
  <h2 className="text-xl font-bold text-gray-900">Component Title</h2>
  <Button variant="outline" size="sm">Action</Button>
</div>
```

### 7.2. Class Naming Conventions

When using custom CSS classes (not Tailwind utilities):

1. Use kebab-case for class names: `my-custom-class`
2. Use BEM-like naming for component-specific styles:
   - Block: `note-card`
   - Element: `note-card__title`, `note-card__content`
   - Modifier: `note-card--featured`, `note-card--compact`

```css
.note-card {
  /* Base styles */
}

.note-card__title {
  /* Title-specific styles */
}

.note-card--featured {
  /* Featured variant styles */
}
```

### 7.3. CSS Custom Properties (Variables)

Use CSS variables for theme configuration:

```css
:root {
  --color-primary: hsl(265, 100%, 50%);
  --font-sans: 'Inter', sans-serif;
}

.selector {
  color: var(--color-primary);
  font-family: var(--font-sans);
}
```

### 7.4. Tailwind Best Practices

1. **Responsive Variants**: Use responsive prefixes (`sm:`, `md:`, `lg:`) consistently
2. **Custom Extensions**: Add custom utilities through `tailwind.config.js`
3. **Component Classes**: Create custom component classes for frequently used combinations
4. **Dark Mode**: Use dark mode variants (`dark:`) for themed components

### 7.5. Styling Order

Organize Tailwind classes in a consistent order:

1. Layout (`flex`, `grid`, `block`, etc.)
2. Positioning (`relative`, `absolute`, etc.)
3. Display (`hidden`, `visible`, etc.)
4. Spacing (`p-4`, `m-2`, etc.)
5. Sizing (`w-full`, `h-10`, etc.)
6. Typography (`text-lg`, `font-bold`, etc.)
7. Backgrounds (`bg-white`, etc.)
8. Borders (`border`, `rounded-lg`, etc.)
9. Effects (`shadow-sm`, etc.)
10. Transitions (`transition`, `hover:`, etc.)

```jsx
<div className="
  flex flex-col             /* Layout */
  relative                  /* Positioning */
  p-4 mb-6                  /* Spacing */
  w-full h-auto             /* Sizing */
  text-sm font-medium       /* Typography */
  bg-white                  /* Background */
  border border-gray-200 rounded-lg /* Borders */
  shadow-sm                 /* Effects */
  transition-all hover:bg-gray-50 /* Transitions */
">
  Content
</div>
```

## 8. Accessibility Standards

### 8.1. Core Requirements

Notabl.ai adheres to WCAG 2.1 AA standards:

1. **Perceivable**: Information must be presentable to users in ways they can perceive
2. **Operable**: User interface and navigation must be operable
3. **Understandable**: Information and operation must be understandable
4. **Robust**: Content must be robust enough to work with assistive technologies

### 8.2. Implementation Guidelines

#### Semantic HTML

Use semantic HTML elements appropriately:

```jsx
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <section>
    <h1>Page Title</h1>
    <article>
      <h2>Article Title</h2>
      <p>Content</p>
    </article>
  </section>
</main>

<footer>
  <p>Footer content</p>
</footer>
```

#### ARIA Attributes

Use ARIA attributes when needed:

```jsx
<button 
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClick}
>
  <X className="h-4 w-4" />
</button>

<div 
  role="alert"
  aria-live="assertive"
>
  Error message
</div>
```

#### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```jsx
<button 
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  tabIndex={0}
>
  Action
</button>
```

#### Focus Management

Manage focus for modal dialogs and dynamic content:

```jsx
useEffect(() => {
  if (isOpen) {
    // Set focus to first focusable element
    firstFocusableRef.current?.focus();
  }
  
  return () => {
    // Return focus to trigger element
    triggerRef.current?.focus();
  };
}, [isOpen]);
```

### 8.3. Accessibility Checklist

- [ ] Sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- [ ] Keyboard navigation for all interactive elements
- [ ] Proper focus management for modals and dynamic content
- [ ] Alt text for all images and icons
- [ ] ARIA labels for elements without visible text
- [ ] Proper heading hierarchy
- [ ] Screen reader announcements for dynamic content
- [ ] Form labels and error messages

## 9. Performance Optimizations

### 9.1. Code Splitting

Use Next.js dynamic imports to load components only when needed:

```tsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Optional: disable server-side rendering
});
```

### 9.2. Image Optimization

Use Next.js `Image` component for optimized images:

```jsx
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="User profile"
  width={64}
  height={64}
  className="rounded-full"
  priority={isAboveFold}
/>
```

### 9.3. Component Optimization

Use React.memo for pure components that render frequently:

```tsx
const MemoizedComponent = React.memo(function Component(props) {
  return <div>{props.value}</div>;
});
```

Use the `useMemo` and `useCallback` hooks to optimize expensive calculations and event handlers:

```tsx
const expensiveComputation = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

### 9.4. Virtual Lists

For long lists, consider using a virtualized list library like `react-window`:

```tsx
import { FixedSizeList } from 'react-window';

function NotesList({ notes }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <NoteCard note={notes[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={notes.length}
      itemSize={120}
    >
      {Row}
    </FixedSizeList>
  );
}
```

### 9.5. Performance Checklist

- [ ] Lazy loading for below-the-fold content
- [ ] Code splitting for large components and libraries
- [ ] Optimized images and assets
- [ ] Memoization for expensive calculations
- [ ] Debouncing for frequent events (e.g., search input)
- [ ] Virtual lists for long data sets
- [ ] Efficient re-rendering strategies (React.memo, useMemo, useCallback)

## 10. Frontend Testing Strategy

### 10.1. Testing Layers

Notabl.ai implements a comprehensive testing strategy:

1. **Unit Tests**: For individual functions and components
2. **Integration Tests**: For component interactions
3. **End-to-End Tests**: For critical user flows

### 10.2. Component Testing

Use React Testing Library for component tests:

```tsx
// NoteCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { NoteCard } from '@/components/note/NoteCard';

describe('NoteCard', () => {
  const mockNote = {
    id: 'note-1',
    title: 'Test Note',
    content: 'Test content',
    folderId: 'folder-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    sourceType: 'text'
  };
  
  const mockDelete = jest.fn();
  
  it('renders note details correctly', () => {
    render(<NoteCard note={mockNote} onDelete={mockDelete} />);
    
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  it('calls onDelete when delete button is clicked', () => {
    render(<NoteCard note={mockNote} onDelete={mockDelete} />);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDelete).toHaveBeenCalledWith('note-1');
  });
});
```

### 10.3. Context Testing

Test components that use Context:

```tsx
// With Context provider
import { NoteProvider } from '@/context/NoteContext';

function renderWithContext(ui) {
  return render(
    <NoteProvider>
      {ui}
    </NoteProvider>
  );
}

test('component using context', () => {
  renderWithContext(<ComponentUsingContext />);
  // Test assertions
});
```

### 10.4. E2E Testing

Use Cypress for end-to-end testing:

```js
// cypress/e2e/create-note.cy.js
describe('Note Creation Flow', () => {
  beforeEach(() => {
    // Login and set up test
    cy.login();
    cy.visit('/dashboard');
  });
  
  it('creates a new note from YouTube video', () => {
    // Enter a YouTube URL
    cy.get('input[placeholder="Enter YouTube video URL"]')
      .type('https://www.youtube.com/watch?v=VIDEO_ID');
    
    // Click process button
    cy.contains('button', 'Process Video').click();
    
    // Wait for processing
    cy.contains('Generating transcript...').should('be.visible');
    
    // Check that note is created
    cy.contains('h3', 'Video Title').should('be.visible');
  });
});
```

### 10.5. Testing Guidelines

1. **Prioritize User Behavior**: Test what users do, not implementation details
2. **Use Test IDs**: Add `data-testid` attributes for reliable selectors
3. **Mock External Services**: Use mock services for API calls
4. **Test Edge Cases**: Cover loading, error, and empty states
5. **Test Accessibility**: Include accessibility assertions

## 11. Folder Structure

Notabl.ai follows the Next.js App Router folder structure with additional organization:

```
app/
├── api/                       # API routes
│   ├── content/
│   ├── transcript/
│   ├── subscriptions/
│   └── webhooks/
├── dashboard/                 # Dashboard routes
│   ├── folder/
│   │   └── [folderId]/
│   ├── notes/
│   │   └── [noteId]/
│   └── page.tsx
├── (auth)/                    # Auth routes
│   ├── signin/
│   └── signup/
├── globals.css                # Global styles
├── layout.tsx                 # Root layout
└── page.tsx                   # Home page

components/
├── layout/                    # Layout components
│   ├── MainContent.tsx
│   └── Sidebar.tsx
├── modals/                    # Modal components
│   ├── ProcessingModal.tsx
│   ├── RecordAudioModal.tsx
│   └── UpgradeModal.tsx
├── note/                      # Note components
│   ├── NoteCard.tsx
│   └── NoteView.tsx
└── ui/                        # UI components
    ├── button.tsx
    ├── input.tsx
    └── ...

context/
└── NoteContext.tsx            # Application context

hooks/
├── use-mobile.ts              # Custom hooks
└── ...

lib/
├── actions/                   # Server actions
├── airwallex.ts               # Airwallex integration
└── prisma.ts                  # Prisma client

public/
├── images/                    # Static images
└── ...

types/
└── index.ts                   # TypeScript types

utils/
└── noteUtils.ts               # Utility functions
```

### 11.1. File Naming Conventions

- **Components**: PascalCase (e.g., `NoteCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useNoteContext.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Context**: PascalCase with `Context` suffix (e.g., `NoteContext.tsx`)
- **Types**: PascalCase with optional `Type` suffix (e.g., `Note.ts`, `UserProfileType.ts`)

### 11.2. Component Organization

Group related components together:

```
components/
├── note/                 # Note-related components
│   ├── NoteCard.tsx
│   ├── NoteView.tsx
│   ├── NoteActions.tsx
│   └── index.ts          # Re-export all components
```

Export all components from an `index.ts` file:

```tsx
// components/note/index.ts
export * from './NoteCard';
export * from './NoteView';
export * from './NoteActions';
```

Import grouped components:

```tsx
// Import specific components
import { NoteCard, NoteView } from '@/components/note';

// Or import all
import * as NoteComponents from '@/components/note';
```

## 12. Code Conventions

### 12.1. TypeScript Guidelines

#### Types

Define interfaces for props, state, and data structures:

```tsx
// types/index.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string;
  createdAt: Date;
  updatedAt: Date;
  sourceType: "text" | "audio" | "pdf" | "youtube";
  sourceUrl?: string;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
}

export type NoteView = "note" | "quiz" | "flashcards" | "transcript" | "mindmap";

export type ProcessingStatus = 
  | "idle" 
  | "recording" 
  | "uploading" 
  | "transcribing" 
  | "generating" 
  | "completed" 
  | "error";
```

#### Props

Always type component props:

```tsx
interface ButtonProps {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({
  variant = "default",
  size = "default",
  className,
  disabled = false,
  onClick,
  children
}: ButtonProps) {
  // Component implementation
}
```

### 12.2. JavaScript/TypeScript Style Guide

1. **Use arrow functions** for consistent syntax
2. **Destructure props** at the top of components
3. **Use async/await** instead of promise chains
4. **Prefer const** over let when possible
5. **Use optional chaining** and nullish coalescing
6. **Include proper TypeScript types** for all variables and functions

### 12.3. React Best Practices

1. **Functional Components**: Use functional components with hooks
2. **Controlled Components**: Use controlled form components
3. **Custom Hooks**: Extract reusable logic into custom hooks
4. **Error Boundaries**: Use error boundaries to catch and handle errors
5. **Fragment Shorthand**: Use `<>...</>` for fragments
6. **Destructuring Props**: Destructure props for cleaner code

### 12.4. Importing Order

```tsx
// 1. React and Next.js imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 2. Third-party libraries
import { toast } from 'sonner';
import { Menu, ChevronRight } from 'lucide-react';

// 3. Application components, grouped by directory
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NoteCard, NoteView } from '@/components/note';

// 4. Hooks, context and utilities
import { useNoteContext } from '@/context/NoteContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatDate } from '@/utils/dateUtils';

// 5. Types
import type { Note, ProcessingStatus } from '@/types';

// 6. Styles (if imported separately)
import styles from './Component.module.css';
```

### 12.5. Comments and Documentation

1. **Component Documentation**: Include JSDoc comments for components

```tsx
/**
 * NoteCard displays a preview of a note in list view.
 * 
 * @param note - The note object to display
 * @param onDelete - Optional callback when delete action is triggered
 * @example
 * <NoteCard note={noteObject} onDelete={handleDelete} />
 */
export function NoteCard({ 
  note, 
  onDelete 
}: NoteCardProps) {
  // Implementation
}
```

2. **Complex Logic**: Comment complex logic or workarounds

```tsx
// This is a workaround for a browser inconsistency
// See: https://github.com/example/issue/123
const fixedValue = originalValue.replace(/\s+/g, ' ').trim();
```

## Conclusion

These frontend guidelines establish a consistent approach to developing the Notabl.ai application. By following these standards, the team can ensure a cohesive user experience, maintainable codebase, and efficient development process.

Remember that these guidelines are a living document and should evolve as the project grows and technologies change.