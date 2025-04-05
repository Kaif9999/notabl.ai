Notabl.ai Technology Stack
Table of Contents

Frontend Framework
Backend Technologies
Database & Data Management
Authentication & Security
Styling & UI Components
State Management
External Services & APIs
Performance Optimization
Development Workflow
Testing
Deployment & Infrastructure
Monitoring & Analytics

Frontend Framework
Next.js 15.x

App Router Architecture: Utilizing the modern App Router pattern for improved routing and layouts
Server Components: Mixing client and server components for optimal performance
API Routes: Using Next.js API routes for backend functionality
Middleware: Custom middleware for authentication and request handling
Image Optimization: Next.js Image component for automatic optimization

React 19.x

Hooks: Extensive use of React hooks (useState, useEffect, useContext, etc.)
Function Components: All components built using functional components
Suspense & Server Components: Leveraging React's latest features for improved UX
Custom Hooks: Multiple custom hooks for reusable logic (useIsMobile, useUserLimits, etc.)

TypeScript

Strong Typing: Comprehensive type definitions for components, API responses, and state
Interface Definitions: Clear interface definitions for component props
Type Guards: For safe type narrowing across the application
Custom Type Utilities: For complex type transformations

Backend Technologies
Next.js API Routes

Route Handlers: API implementations using Next.js route handlers
Request/Response Handling: Leveraging NextRequest and NextResponse types
Middleware: Authentication and rate limiting middleware

Server Actions

Server-side Functions: Implementation of Next.js server actions for server-side business logic
Form Handling: Using server actions for form submissions

Database & Data Management
PostgreSQL

Relational Database: Primary data store for structured application data
Complex Relations: Supporting relationships between users, notes, folders, etc.
JSON Support: For storing semi-structured data like generated content

Prisma ORM

Schema Definition: Type-safe database schema using Prisma Schema Language
Database Migrations: Automated migration generation and application
Query Building: Type-safe query building with the Prisma Client
Relation Management: Handling one-to-many and many-to-many relationships
Connection Pooling: Optimized database connections

Data Models

User Model: Authentication, profile, and subscription information
Note Model: Content, metadata, and relations to users and folders
Folder Model: Organizational structure for notes
Transcript Model: Storage of YouTube transcripts
Subscription Model: Payment and subscription tracking

Authentication & Security
NextAuth.js 5.x

JWT Strategy: Using JSON Web Tokens for session management
Google OAuth Provider: Social authentication with Google
Adapter Architecture: Using Prisma adapter for database integration
Custom Callbacks: For enhancing user session data
Middleware Integration: Protecting routes based on auth status

Security Features

CSRF Protection: Cross-Site Request Forgery protection
HTTP-Only Cookies: For secure session storage
Environment Variable Management: For securing API keys and secrets
Input Validation: Validating user inputs to prevent injection attacks
Rate Limiting: For preventing abuse of API endpoints

Styling & UI Components
Tailwind CSS 4.x

Utility-First CSS: Using utility classes for rapid styling
Custom Theme Configuration: Extended Tailwind theme with custom values
Dark Mode Support: System for toggling between light and dark modes
Responsive Design: Mobile-first approach with responsive breakpoints

shadcn/ui

Component Library: Customizable UI components built on Radix UI
Accessibility: ARIA compliant component implementations
Theming: Consistent design tokens across components
Form Components: Form controls with validation support

Lucide React

Icon Library: Modern icon set with React components
Consistent Styling: Integration with the design system

Custom Components

Layout Components: Sidebar, MainContent, etc.
Modal System: Various modal implementations for different purposes
Card Components: Note cards and information displays
Interactive Elements: Custom buttons, inputs, and interactive components

State Management
React Context API

NoteContext: Central state management for notes and folders
Context Providers: Scoped context providers for different parts of the app
Custom Hooks: Accessor hooks for context consumption

Local State Management

Component-Level State: Using useState and useReducer for component-specific state
Form State: State management for form inputs and validation
UI State: Managing UI state like modals, sidebars, etc.

Server State Management

Data Fetching: Fetching and caching server data
Optimistic Updates: Improving UX through optimistic UI updates
Error Handling: Consistent error handling for server operations

External Services & APIs
OpenAI API

GPT-4 Integration: Using GPT-4 for content generation
Prompt Engineering: Crafted prompts for different content types
Token Management: Optimizing API usage with token counting
Error Handling: Graceful handling of API limitations and errors

Scrapegoat

YouTube Transcript Extraction: For fetching video transcripts
Video Metadata: Extracting titles, channels, and other metadata

Airwallex

Payment Processing: Handling subscription payments
Customer Management: Storing and managing customer information
Webhook Integration: Processing payment events

Performance Optimization
Code Splitting

Dynamic Imports: Lazy loading components and pages
Route-Based Splitting: Automatically splitting code by routes

Image Optimization

Next.js Image Component: For automatic image optimization
Responsive Images: Serving appropriate sizes based on viewport

Caching Strategies

Response Caching: Caching API responses where appropriate
Static Page Generation: For landing and marketing pages

Development Workflow
Package Management

npm/yarn: Dependency management
Package.json Scripts: Custom scripts for development tasks

Git Workflow

Feature Branches: Development organized by feature branches
Pull Requests: Code review through pull requests
Conventional Commits: Standardized commit messages

ESLint & Prettier

Code Linting: Enforcing code quality standards
Automatic Formatting: Consistent code style

Testing
Jest

Unit Testing: Testing individual functions and hooks
Mock Functions: Mocking external dependencies

Playwright

End-to-End Testing: Testing full user flows
Cross-Browser Testing: Ensuring compatibility across browsers

React Testing Library

Component Testing: Testing React components in isolation
User Event Simulation: Testing user interactions

Deployment & Infrastructure
Vercel

Production Deployment: Hosting the production application
Preview Deployments: Automatic deployments for pull requests
Environment Variables: Managing environment configuration

Neon Database

Serverless PostgreSQL: Cloud database for production
Branching: Database branching for development and staging

GitHub Actions

CI/CD Pipeline: Continuous integration and deployment
Automated Testing: Running tests on pull requests

Monitoring & Analytics
Sentry

Error Tracking: Capturing and reporting frontend and backend errors
Performance Monitoring: Tracking application performance

Vercel Analytics

Usage Metrics: Tracking page views and user engagement
Performance Insights: Monitoring Core Web Vitals

Custom Analytics

User Journey Tracking: Following user paths through the application
Conversion Metrics: Tracking free-to-paid conversions
Feature Usage: Monitoring which features are most used

Technical Decisions & Rationale
Why Next.js?
Next.js was chosen for its powerful combination of server and client rendering capabilities, which allows for optimal performance and SEO. The App Router provides a more intuitive way to structure the application, while API routes eliminate the need for a separate backend service.
Why Prisma?
Prisma provides type-safe database access with automatic migrations, significantly reducing the risk of runtime errors related to database operations. Its schema definition language makes it easy to model complex relationships and enforce database constraints.
Why Tailwind CSS?
Tailwind's utility-first approach enables rapid UI development without context switching between files. The design system can be extended through Tailwind's configuration, ensuring consistent styling throughout the application.
Why NextAuth.js?
NextAuth.js provides a comprehensive authentication solution with minimal configuration. It integrates well with Next.js and supports multiple authentication providers, making it easy to add social login options.
Why PostgreSQL?
PostgreSQL offers a robust, feature-rich relational database with excellent JSON support, making it ideal for storing both structured data (users, notes) and semi-structured content (generated AI content).
Why TypeScript?
TypeScript adds static type checking to JavaScript, catching errors during development rather than at runtime. This is particularly valuable for a complex application with many interconnected components.
Future Technical Considerations
Potential Scaling Challenges

Database Scaling: As user content grows, database partitioning and read replicas may be necessary
API Rate Limits: Implementation of more sophisticated rate limiting and queuing for external API calls
Content Storage: Potential migration to dedicated storage services for user-generated content

Technical Debt Management

Regular Dependency Updates: Schedule for updating dependencies
Code Refactoring: Ongoing refactoring to maintain code quality
Performance Monitoring: Continuous monitoring to identify bottlenecks

Feature Roadmap Technical Impact

Collaborative Editing: Will require WebSocket integration or similar real-time technologies
Mobile Apps: Potential React Native implementation leveraging shared business logic
API Access: Building a public API would require additional authentication and rate limiting systems