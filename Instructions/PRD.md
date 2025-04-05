# Notabl.ai Project Requirements Document

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [User Personas](#2-user-personas)
3. [Functional Requirements](#3-functional-requirements)
4. [Technical Requirements](#4-technical-requirements)
5. [UI/UX Requirements](#5-uiux-requirements)
6. [API Specifications](#6-api-specifications)
7. [Subscription Management Requirements](#7-subscription-management-requirements)
8. [Data Security and Privacy Requirements](#8-data-security-and-privacy-requirements)
9. [Testing Requirements](#10-testing-requirements)
10. [Performance Requirements](#11-performance-requirements)
11. [Deployment and Infrastructure](#12-deployment-and-infrastructure)
12. [Analytics and Monitoring](#13-analytics-and-monitoring)
13. [Project Timeline and Milestones](#14-project-timeline-and-milestones)
14. [Appendices](#15-appendices)

## 1. Project Overview

### 1.1 Product Vision

Notabl.ai is an intelligent note-taking platform that transforms YouTube videos into various content formats using AI. The platform enables users to efficiently extract valuable information from videos and convert them into structured notes, quizzes, recipes, workout plans, travel guides, and chat-like conversations.

### 1.2 Project Goals

1. Create a user-friendly platform that simplifies information extraction from YouTube videos
2. Implement AI-powered content generation to transform video transcripts into multiple formats
3. Provide a freemium model with clear upgrade paths for premium features
4. Ensure cross-device compatibility with responsive design
5. Build a scalable infrastructure that can handle increasing user demand
6. Implement secure authentication and payment processing

### 1.3 Key Features

1. YouTube video processing and transcript extraction
2. Multiple content generation types (notes, quizzes, recipes, workouts, travel guides, chat)
3. Organized folder structure for content management
4. Subscription management with Airwallex integration
5. User authentication via Google OAuth
6. Responsive UI for desktop and mobile devices

### 1.4 Success Metrics

1. User acquisition: Target 10,000 free users in the first 3 months
2. Conversion rate: 5% of free users converting to premium subscriptions
3. Retention rate: 70% monthly retention for premium users
4. User satisfaction: Average rating of 4.5/5 in user feedback
5. Processing performance: Average processing time under 30 seconds per video

## 2. User Personas

### 2.1 Primary Persona: Student (Sarah)

**Demographics:**
- 18-24 years old
- University student
- Limited budget
- Tech-savvy

**Goals:**
- Take comprehensive notes from educational YouTube videos
- Create study materials from online lectures
- Organize educational content by subject
- Access notes across multiple devices

**Pain Points:**
- Time-consuming to manually take notes from videos
- Difficult to organize information from multiple sources
- Limited budget for premium tools
- Needs to generate quizzes for effective studying

### 2.2 Secondary Persona: Professional (Michael)

**Demographics:**
- 30-45 years old
- Knowledge worker (consultant, manager, analyst)
- Willing to pay for productivity tools
- Moderately tech-savvy

**Goals:**
- Extract key insights from industry webinars and talks
- Organize professional development resources
- Create actionable summaries from lengthy presentations
- Share processed content with colleagues

**Pain Points:**
- Limited time to watch full videos
- Needs structured formats for extracted information
- Requires professional-looking outputs
- Values efficiency over cost

### 2.3 Tertiary Persona: Content Creator (Alex)

**Demographics:**
- 25-35 years old
- Content creator (blogger, YouTuber, social media influencer)
- Moderate technical skills
- Focused on content production efficiency

**Goals:**
- Research content from other creators
- Extract ideas and information to inform own content
- Organize research materials systematically
- Generate content outlines from video research

**Pain Points:**
- Spends too much time on research
- Needs to process multiple videos for single content pieces
- Requires various content formats for different platforms
- Values creative content transformation

## 3. Functional Requirements

### 3.1 User Authentication and Account Management

#### 3.1.1 User Registration and Login
- **FR-1.1:** Users must be able to sign up using Google OAuth
- **FR-1.2:** Authentication must use secure JWT tokens for session management
- **FR-1.3:** User profiles must store name, email, avatar, and subscription details
- **FR-1.4:** User authentication state must persist across browser sessions

#### 3.1.2 User Profile Management
- **FR-1.5:** Users must be able to view their profile information
- **FR-1.6:** Users must be able to see their current subscription status
- **FR-1.7:** Users must be able to log out of their account
- **FR-1.8:** Users must receive visual feedback on authentication status

### 3.2 YouTube Video Processing

#### 3.2.1 Video URL Input and Validation
- **FR-2.1:** System must accept and validate YouTube video URLs
- **FR-2.2:** System must extract the video ID from various YouTube URL formats
- **FR-2.3:** System must provide error feedback for invalid URLs
- **FR-2.4:** System must check user limits before processing (5 videos for free users)

#### 3.2.2 Transcript Extraction
- **FR-2.5:** System must extract transcript from valid YouTube videos
- **FR-2.6:** System must handle videos without available transcripts
- **FR-2.7:** System must extract video metadata (title, channel, duration, etc.)
- **FR-2.8:** System must provide visual feedback during transcript extraction
- **FR-2.9:** System must store extracted transcripts in the database

### 3.3 Content Generation

#### 3.3.1 Note Generation
- **FR-3.1:** System must generate structured notes from video transcripts
- **FR-3.2:** Notes must include headings, paragraphs, and bullet points
- **FR-3.3:** Notes must maintain context and key information from the video
- **FR-3.4:** Notes must be stored and associated with the user account

#### 3.3.2 Quiz Generation
- **FR-3.5:** System must generate quiz questions from video transcripts
- **FR-3.6:** Quizzes must include multiple-choice questions with correct answers
- **FR-3.7:** Each quiz must contain at least 10 questions (when possible)
- **FR-3.8:** Questions must cover key concepts from the video content
- **FR-3.9:** Questions must be presented in a user-friendly format

#### 3.3.3 Recipe Generation
- **FR-3.10:** System must extract recipe information from cooking videos
- **FR-3.11:** Recipes must include ingredients, quantities, and step-by-step instructions
- **FR-3.12:** Recipe format must be consistent and well-structured
- **FR-3.13:** System must differentiate cooking videos from other content types

#### 3.3.4 Workout Plan Generation
- **FR-3.14:** System must extract workout information from fitness videos
- **FR-3.15:** Workout plans must include exercises, sets, reps, and timing
- **FR-3.16:** Workout content must be formatted for easy following
- **FR-3.17:** System must identify fitness content appropriately

#### 3.3.5 Travel Guide Generation
- **FR-3.18:** System must extract travel information from travel videos
- **FR-3.19:** Travel guides must include destinations, attractions, and practical tips
- **FR-3.20:** Travel content must be organized by location and activities
- **FR-3.21:** System must identify travel content appropriately

#### 3.3.6 Chat/Discussion Generation
- **FR-3.22:** System must transform video content into a Q&A conversation format
- **FR-3.23:** Chat format must include questions and detailed answers
- **FR-3.24:** Chat must maintain the core information from the video
- **FR-3.25:** Chat format must be visually distinctive from other formats

### 3.4 Content Management

#### 3.4.1 Folder Organization
- **FR-4.1:** Users must be able to create, rename, and delete folders
- **FR-4.2:** System must provide a default "All notes" folder
- **FR-4.3:** Users must be able to move notes between folders
- **FR-4.4:** System must prevent deletion of the default folder
- **FR-4.5:** System must display folder contents in a clear list view

#### 3.4.2 Note Management
- **FR-4.6:** Users must be able to view, edit, and delete notes
- **FR-4.7:** System must provide different views for each content type (note, quiz, recipe, etc.)
- **FR-4.8:** Users must be able to switch between different content views
- **FR-4.9:** System must display note metadata (creation date, update date, source)
- **FR-4.10:** System must allow searching and filtering of notes

### 3.5 Subscription Management

#### 3.5.1 Free Tier Limitations
- **FR-5.1:** Free users must be limited to 5 YouTube video processes
- **FR-5.2:** System must clearly display remaining free tier quota
- **FR-5.3:** System must prompt upgrade when free limit is reached
- **FR-5.4:** System must prevent additional processing beyond the free limit

#### 3.5.2 Premium Subscription
- **FR-5.5:** Users must be able to purchase monthly ($7.99) or yearly ($79.99) subscriptions
- **FR-5.6:** System must integrate with Airwallex for payment processing
- **FR-5.7:** Premium users must have unlimited video processing
- **FR-5.8:** System must handle subscription lifecycle (purchase, renewal, cancellation)
- **FR-5.9:** System must provide clear confirmation of subscription status

## 4. Technical Requirements

### 4.1 Technology Stack

#### 4.1.1 Frontend
- **TR-1.1:** Next.js 15.x with App Router architecture
- **TR-1.2:** React 19.x for UI components
- **TR-1.3:** TypeScript for type safety and developer experience
- **TR-1.4:** Tailwind CSS for styling
- **TR-1.5:** Radix UI components for accessible UI elements

#### 4.1.2 Backend
- **TR-1.6:** Next.js API routes for server-side logic
- **TR-1.7:** Prisma ORM for database operations
- **TR-1.8:** PostgreSQL for data storage
- **TR-1.9:** NextAuth.js for authentication
- **TR-1.10:** Vercel for deployment and hosting

#### 4.1.3 External Services
- **TR-1.11:** Google OAuth for authentication
- **TR-1.12:** OpenAI API for content generation
- **TR-1.13:** Scrapegoat for YouTube transcript extraction
- **TR-1.14:** Airwallex API for payment processing

### 4.2 Database Schema

#### 4.2.1 Core Models
- **TR-2.1:** User model must include authentication and subscription data
- **TR-2.2:** Note model must support multiple content types and metadata
- **TR-2.3:** Folder model must support hierarchical organization
- **TR-2.4:** Subscription model must track payment status and expiration

#### 4.2.2 Database Performance
- **TR-2.5:** Database queries must be optimized for performance
- **TR-2.6:** Indexes must be created for frequently queried fields
- **TR-2.7:** Database connections must be properly pooled and managed
- **TR-2.8:** Database migrations must be versioned and applied automatically

### 4.3 API Architecture

#### 4.3.1 API Design
- **TR-3.1:** REST API principles must be followed for all endpoints
- **TR-3.2:** API responses must use consistent JSON structure
- **TR-3.3:** API errors must follow standard error format with appropriate HTTP status codes
- **TR-3.4:** API endpoints must be secured with authentication where appropriate
- **TR-3.5:** API must include rate limiting to prevent abuse

#### 4.3.2 API Documentation
- **TR-3.6:** All API endpoints must be documented
- **TR-3.7:** API documentation must include request/response examples
- **TR-3.8:** API documentation must be updated with each release
- **TR-3.9:** API versioning strategy must be defined

### 4.4 Security Requirements

#### 4.4.1 Authentication Security
- **TR-4.1:** Authentication must use industry standard protocols (OAuth 2.0)
- **TR-4.2:** Sessions must be securely managed with HTTP-only cookies
- **TR-4.3:** All authentication tokens must have appropriate expiration
- **TR-4.4:** CSRF protection must be implemented for all form submissions

#### 4.4.2 Data Security
- **TR-4.5:** All API requests must use HTTPS
- **TR-4.6:** Sensitive data must be encrypted at rest
- **TR-4.7:** Payment information must never be stored in the application database
- **TR-4.8:** API keys and secrets must be securely managed using environment variables

#### 4.4.3 Authorization
- **TR-4.9:** Role-based access control must be implemented
- **TR-4.10:** User actions must be authorized based on subscription status
- **TR-4.11:** API endpoints must verify user permissions before processing requests
- **TR-4.12:** Admin functions must be secured with appropriate permissions

## 5. UI/UX Requirements

### 5.1 Design System

#### 5.1.1 Visual Design
- **UR-1.1:** UI must follow the established design system with consistent colors, typography, and spacing
- **UR-1.2:** Dark mode support must be implemented for the entire application
- **UR-1.3:** Brand elements (logo, colors) must be consistently applied
- **UR-1.4:** Visual hierarchy must guide users to important actions

#### 5.1.2 Design Components
- **UR-1.5:** UI component library must include all common elements (buttons, inputs, cards, etc.)
- **UR-1.6:** Components must support multiple variants (primary, secondary, outline, etc.)
- **UR-1.7:** Components must be responsive and adapt to different screen sizes
- **UR-1.8:** Icon system must be consistent using Lucide icons

### 5.2 Layout Requirements

#### 5.2.1 Responsive Design
- **UR-2.1:** Application must support desktop, tablet, and mobile screen sizes
- **UR-2.2:** Layout must adapt fluidly to different screen dimensions
- **UR-2.3:** Mobile navigation must utilize a slide-in sidebar pattern
- **UR-2.4:** Elements must have appropriate touch targets on mobile devices

#### 5.2.2 Core Layouts
- **UR-2.5:** Application must use a consistent layout with sidebar and main content areas
- **UR-2.6:** Note detail view must include tabs for different content types
- **UR-2.7:** Dashboard must display YouTube processor and note list
- **UR-2.8:** Landing page must effectively communicate product value proposition

### 5.3 User Experience Flows

#### 5.3.1 Onboarding
- **UR-3.1:** First-time users must receive clear guidance on how to use the app
- **UR-3.2:** Authentication flow must be streamlined and intuitive
- **UR-3.3:** Empty states must provide helpful actions for new users
- **UR-3.4:** Returning users must be able to quickly resume their previous activity

#### 5.3.2 Core Workflows
- **UR-3.5:** YouTube video processing workflow must be clearly guided
- **UR-3.6:** Content type navigation must be intuitive with clear tabs
- **UR-3.7:** Note management workflow must support common user actions
- **UR-3.8:** Subscription upgrade flow must be clear and compelling

### 5.4 Accessibility Requirements

#### 5.4.1 WCAG Compliance
- **UR-4.1:** Application must meet WCAG 2.1 AA standards
- **UR-4.2:** Color contrast must meet accessibility standards
- **UR-4.3:** Text must be resizable without breaking layouts
- **UR-4.4:** All interactive elements must be keyboard accessible

#### 5.4.2 Assistive Technology Support
- **UR-4.5:** All images must have appropriate alt text
- **UR-4.6:** ARIA attributes must be used where appropriate
- **UR-4.7:** Screen reader support must be implemented for all content
- **UR-4.8:** Focus management must follow accessibility best practices

## 6. API Specifications

### 6.1 Authentication API

#### 6.1.1 Google OAuth Endpoints
- **API-1.1:** `/api/auth/signin/google` - Initiate Google OAuth flow
- **API-1.2:** `/api/auth/callback/google` - OAuth callback handler
- **API-1.3:** `/api/auth/session` - Get current session
- **API-1.4:** `/api/auth/signout` - Sign out user

### 6.2 YouTube Processing API

#### 6.2.1 Transcript Extraction Endpoint
- **API-2.1:** `POST /api/transcript`
  - **Request Body:**
    ```json
    {
      "url": "https://www.youtube.com/watch?v=VIDEO_ID"
    }
    ```
  - **Response:**
    ```json
    {
      "videoDetails": {
        "title": "Video Title",
        "channel": "Channel Name",
        "publishDate": "2023-01-01T00:00:00Z",
        "viewCount": "123456",
        "duration": "PT15M30S",
        "thumbnailUrl": "https://..."
      },
      "transcript": "Full video transcript text..."
    }
    ```
  - **Error Responses:**
    - 400: Invalid YouTube URL
    - 401: Unauthorized (user not logged in)
    - 403: Free tier limit reached
    - 404: No transcript available for video
    - 500: Server error

### 6.3 Content Generation API

#### 6.3.1 Content Type Generation Endpoints
- **API-3.1:** `POST /api/content/[type]`
  - **Path Parameter:** `type` = "note" | "quiz" | "recipe" | "workout" | "travel" | "chat"
  - **Request Body:**
    ```json
    {
      "transcript": "Video transcript...",
      "videoDetails": {
        "title": "Video Title",
        "channel": "Channel Name"
      }
    }
    ```
  - **Response:**
    ```json
    {
      "content": "Generated content..." // Format depends on type
    }
    ```
  - **Error Responses:**
    - 400: Invalid request
    - 401: Unauthorized
    - 403: Free tier limit reached
    - 500: Content generation failed

### 6.4 Note Management API

#### 6.4.1 Note CRUD Endpoints
- **API-4.1:** `GET /api/notes` - List user's notes
  - **Query Parameters:**
    - `folderId`: Filter by folder
    - `search`: Search term
    - `page`: Pagination page number
    - `limit`: Results per page
  - **Response:**
    ```json
    {
      "notes": [
        {
          "id": "note1",
          "title": "Note Title",
          "content": "Note content...",
          "folderId": "folder1",
          "sourceType": "youtube",
          "createdAt": "2023-01-01T00:00:00Z",
          "updatedAt": "2023-01-01T00:00:00Z"
        }
      ],
      "total": 10,
      "page": 1,
      "limit": 20
    }
    ```

- **API-4.2:** `POST /api/notes` - Create a new note
  - **Request Body:**
    ```json
    {
      "title": "Note Title",
      "content": "Note content...",
      "folderId": "folder1",
      "sourceType": "youtube",
      "sourceUrl": "https://youtube.com/watch?v=VIDEO_ID"
    }
    ```
  - **Response:**
    ```json
    {
      "id": "note1",
      "title": "Note Title",
      "content": "Note content...",
      "folderId": "folder1",
      "sourceType": "youtube",
      "sourceUrl": "https://youtube.com/watch?v=VIDEO_ID",
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
    ```

- **API-4.3:** `GET /api/notes/:id` - Get note by ID
  - **Response:** Note object

- **API-4.4:** `PUT /api/notes/:id` - Update note
  - **Request Body:** Note object with updates
  - **Response:** Updated note object

- **API-4.5:** `DELETE /api/notes/:id` - Delete note
  - **Response:** Success confirmation

#### 6.4.2 Folder Management Endpoints
- **API-4.6:** `GET /api/folders` - List user's folders
- **API-4.7:** `POST /api/folders` - Create a new folder
- **API-4.8:** `PUT /api/folders/:id` - Update folder
- **API-4.9:** `DELETE /api/folders/:id` - Delete folder

### 6.5 Subscription API

#### 6.5.1 Subscription Management Endpoints
- **API-5.1:** `GET /api/subscriptions` - Get current subscription status
  - **Response:**
    ```json
    {
      "plan": "free", // or "premium"
      "status": "active", // or "past_due", "canceled", null
      "expiryDate": "2023-12-31T00:00:00Z", // or null
      "noteCount": 3,
      "noteLimit": 5 // or null for premium users
    }
    ```

- **API-5.2:** `POST /api/subscriptions` - Create a new subscription
  - **Request Body:**
    ```json
    {
      "planId": "monthly" // or "yearly"
    }
    ```
  - **Response:**
    ```json
    {
      "clientSecret": "pi_client_secret_...",
      "customerId": "cus_...",
      "amount": 7.99, // or 79.99 for yearly
      "currency": "USD",
      "interval": "month" // or "year"
    }
    ```

- **API-5.3:** `PUT /api/subscriptions` - Confirm subscription after payment
  - **Request Body:**
    ```json
    {
      "paymentIntentId": "pi_...",
      "planId": "monthly" // or "yearly"
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "expiryDate": "2023-12-31T00:00:00Z"
    }
    ```

- **API-5.4:** `DELETE /api/subscriptions` - Cancel subscription
  - **Response:**
    ```json
    {
      "success": true
    }
    ```

### 6.6 Webhook API

#### 6.6.1 Airwallex Webhook
- **API-6.1:** `POST /api/webhooks/airwallex` - Handle Airwallex payment events
  - **Webhook Events:**
    - `payment_intent.succeeded`
    - `payment_intent.failed`
    - `subscription.payment_successful`
    - `subscription.payment_failed`
    - `subscription.canceled`
    - `subscription.expired`
  - **Response:** Acknowledgment of receipt

## 7. Subscription Management Requirements

### 7.1 Free Tier Specifications

#### 7.1.1 Free Tier Limitations
- **SR-1.1:** Free users must be limited to processing 5 YouTube videos
- **SR-1.2:** All content generation types must be available to free users
- **SR-1.3:** Free users must be able to organize content in folders
- **SR-1.4:** Free users must be shown clear upgrade prompts when approaching limits

#### 7.1.2 Free Tier UI Indicators
- **SR-1.5:** System must display remaining video quota prominently
- **SR-1.6:** Progress bar must visualize usage against the limit
- **SR-1.7:** When limit is reached, clear messaging must explain the limitation
- **SR-1.8:** Upgrade buttons must be available in multiple relevant locations

### 7.2 Premium Tier Specifications

#### 7.2.1 Premium Features
- **SR-2.1:** Premium users must have unlimited YouTube video processing
- **SR-2.2:** Premium users must have access to all content generation types
- **SR-2.3:** Premium users must have all folder organization capabilities
- **SR-2.4:** Future premium-only features must be easily flagged in the UI

#### 7.2.2 Premium Plan Options
- **SR-2.5:** Monthly subscription must be priced at $7.99/month
- **SR-2.6:** Annual subscription must be priced at $79.99/year (equivalent to $6.67/month)
- **SR-2.7:** Annual plan must be presented as saving 60% compared to monthly
- **SR-2.8:** Trial periods may be offered for promotional purposes

### 7.3 Payment Processing

#### 7.3.1 Airwallex Integration
- **SR-3.1:** Airwallex API must be used for payment processing
- **SR-3.2:** Payment form must collect necessary information securely
- **SR-3.3:** Card information must never be stored in the application database
- **SR-3.4:** Payment errors must be handled gracefully with clear user messaging

#### 7.3.2 Subscription Lifecycle
- **SR-3.5:** New subscriptions must be created with appropriate start and end dates
- **SR-3.6:** Renewal process must be handled via Airwallex automatic billing
- **SR-3.7:** Subscription cancellations must allow access until the end of the paid period
- **SR-3.8:** Failed payments must trigger appropriate notifications
- **SR-3.9:** Subscription status changes must update user permissions immediately

### 7.4 Subscription UI

#### 7.4.1 Upgrade Flow
- **SR-4.1:** Upgrade modal must clearly present plan options
- **SR-4.2:** Plan selection must highlight annual savings
- **SR-4.3:** Payment form must be clean and trustworthy
- **SR-4.4:** Successful payment must show clear confirmation
- **SR-4.5:** Users must be returned to their workflow after upgrade

#### 7.4.2 Subscription Management
- **SR-4.6:** Users must be able to view current subscription details
- **SR-4.7:** Users must be able to cancel subscription
- **SR-4.8:** Users must be able to change between monthly and annual plans
- **SR-4.9:** Billing history must be available for review

## 8. Data Security and Privacy Requirements

### 8.1 Authentication Security

#### 8.1.1 Authentication Mechanisms
- **DSP-1.1:** Google OAuth integration must follow security best practices
- **DSP-1.2:** Session management must use secure HTTP-only cookies
- **DSP-1.3:** CSRF protection must be implemented for all forms
- **DSP-1.4:** Sessions must expire after appropriate timeouts

#### 8.1.2 Authorization Controls
- **DSP-1.5:** API endpoints must verify user authentication
- **DSP-1.6:** Role-based access control must be implemented
- **DSP-1.7:** Subscription status must be verified for premium features
- **DSP-1.8:** Rate limiting must be implemented to prevent abuse

### 8.2 Data Protection

#### 8.2.1 Data Encryption
- **DSP-2.1:** All data in transit must be encrypted using HTTPS
- **DSP-2.2:** Sensitive data at rest must be encrypted
- **DSP-2.3:** Database backups must be encrypted
- **DSP-2.4:** API keys and secrets must be securely managed

#### 8.2.2 Data Retention
- **DSP-2.5:** User data retention policies must be defined and implemented
- **DSP-2.6:** Account deletion must remove or anonymize personal data
- **DSP-2.7:** Data backup and recovery procedures must be defined
- **DSP-2.8:** Data handling must comply with relevant regulations (GDPR, CCPA)

### 8.3 Payment Security

#### 8.3.1 PCI Compliance
- **DSP-3.1:** Credit card data must never be stored on application servers
- **DSP-3.2:** Airwallex integration must follow PCI DSS guidelines
- **DSP-3.3:** Payment forms must use appropriate security measures
- **DSP-3.4:** Payment processing must occur on secure, isolated systems

## 9. Testing Requirements

### 9.1 Testing Approach

#### 9.1.1 Test Types
- **TR-1.1:** Unit tests must be implemented for core functions
- **TR-1.2:** Component tests must verify UI component behavior
- **TR-1.3:** Integration tests must verify component interactions
- **TR-1.4:** E2E tests must verify critical user flows
- **TR-1.5:** API tests must verify endpoint functionality
- **TR-1.6:** Performance tests must verify system responsiveness

#### 9.1.2 Testing Environment
- **TR-1.7:** Development environment must include testing infrastructure
- **TR-1.8:** CI pipeline must run tests automatically on code changes
- **TR-1.9:** Test coverage reporting must be implemented
- **TR-1.10:** Test data generation tools must be available

### 9.2 Test Coverage

#### 9.2.1 Code Coverage Requirements
- **TR-2.1:** Unit test coverage must exceed 80% for core business logic
- **TR-2.2:** Component test coverage must exceed 70% for UI components
- **TR-2.3:** API endpoint test coverage must be 100%
- **TR-2.4:** Critical user flows must have E2E test coverage

#### 9.2.2 Critical Path Testing
- **TR-2.5:** Authentication flow must have comprehensive test coverage
- **TR-2.6:** YouTube processing flow must have comprehensive test coverage
- **TR-2.7:** Content generation must have comprehensive test coverage
- **TR-2.8:** Subscription and payment flow must have comprehensive test coverage

### 9.3 Acceptance Criteria

#### 9.3.1 Acceptance Test Definition
- **TR-3.1:** Each user story must include clear acceptance criteria
- **TR-3.2:** Acceptance criteria must be testable
- **TR-3.3:** Acceptance criteria must be defined before development starts
- **TR-3.4:** Automated acceptance tests must be implemented where feasible

## 10. Performance Requirements

### 10.1 Application Performance

#### 10.1.1 Page Load Performance
- **PR-1.1:** Initial page load time must be under 2 seconds
- **PR-1.2:** Time to interactive must be under 3 seconds
- **PR-1.3:** First contentful paint must be under 1 second
- **PR-1.4:** Pages must achieve a Lighthouse performance score of 85+

#### 10.1.2 Runtime Performance
- **PR-1.5:** UI must remain responsive during background operations
- **PR-1.6:** Animations and transitions must be smooth (60fps)
- **PR-1.7:** Input responsiveness must be immediate
- **PR-1.8:** Long-running operations must provide progress feedback

### 10.2 API Performance

#### 10.2.1 Response Times
- **PR-2.1:** API endpoints must respond within 300ms (95th percentile)
- **PR-2.2:** API endpoints must have a timeout of 10 seconds maximum
- **PR-2.3:** Long-running operations must use background processing
- **PR-2.4:** API rate limiting must be implemented to prevent abuse

#### 10.2.2 Content Generation Performance
- **PR-2.5:** Transcript extraction must complete within 30 seconds
- **PR-2.6:** Content generation must complete within 60 seconds
- **PR-2.7:** Users must receive progress updates during processing
- **PR-2.8:** System must handle concurrent content generation requests efficiently

### 10.3 Scalability Requirements

#### 10.3.1 User Scalability
- **PR-3.1:** System must support 10,000 concurrent users
- **PR-3.2:** System must support 1,000 concurrent content generation processes
- **PR-3.3:** Database must scale to handle 1 million notes
- **PR-3.4:** Performance must degrade gracefully under heavy load

#### 10.3.2 Infrastructure Scalability
- **PR-3.5:** Application must be deployable across multiple regions
- **PR-3.6:** Database must support horizontal scaling
- **PR-3.7:** Content generation services must scale horizontally
- **PR-3.8:** CDN must be used for static asset delivery

## 11. Deployment and Infrastructure

### 11.1 Deployment Pipeline

#### 11.1.1 CI/CD Pipeline
- **DI-1.1:** Continuous integration must run on every code push
- **DI-1.2:** Automated testing must be part of the CI pipeline
- **DI-1.3:** Continuous deployment must be set up for production
- **DI-1.4:** Deployment artifacts must be versioned

#### 11.1.2 Environment Setup
- **DI-1.5:** Development, staging, and production environments must be distinct
- **DI-1.6:** Environment configuration must be managed securely
- **DI-1.7:** Database migrations must be automated as part of deployment
- **DI-1.8:** Rollback procedures must be defined and tested

### 11.2 Infrastructure Requirements

#### 11.2.1 Hosting Platform
- **DI-2.1:** Application must be hosted on Vercel
- **DI-2.2:** Database must be hosted on a managed PostgreSQL service
- **DI-2.3:** Content generation services must use appropriate compute resources
- **DI-2.4:** Static assets must be served via CDN

#### 11.2.2 Monitoring and Logging
- **DI-2.5:** Application monitoring must be implemented
- **DI-2.6:** Error tracking and reporting must be implemented
- **DI-2.7:** Performance monitoring must be implemented
- **DI-2.8:** Log aggregation and analysis must be implemented

### 11.3 Security Infrastructure

#### 11.3.1 Security Practices
- **DI-3.1:** SSL/TLS must be configured for all environments
- **DI-3.2:** Network security must follow best practices
- **DI-3.3:** Infrastructure access must be restricted to authorized personnel
- **DI-3.4:** Security scanning must be part of the CI/CD pipeline

## 12. Analytics and Monitoring

### 12.1 User Analytics

#### 12.1.1 Usage Tracking
- **AM-1.1:** User sign-ups must be tracked
- **AM-1.2:** YouTube video processing must be tracked
- **AM-1.3:** Content generation by type must be tracked
- **AM-1.4:** Subscription conversions must be tracked
- **AM-1.5:** User retention must be tracked

#### 12.1.2 Conversion Funnel
- **AM-1.6:** Sign-up to first video processing conversion must be tracked
- **AM-1.7:** Free tier limit to upgrade conversion must be tracked
- **AM-1.8:** Upgrade intent to completed payment conversion must be tracked
- **AM-1.9:** Funnel drop-off points must be identified and analyzed

### 12.2 Technical Monitoring

#### 12.2.1 Performance Monitoring
- **AM-2.1:** Frontend performance metrics must be tracked
- **AM-2.2:** API response times must be monitored
- **AM-2.3:** Database performance must be monitored
- **AM-2.4:** Content generation service performance must be monitored

#### 12.2.2 Error Monitoring
- **AM-2.5:** Frontend errors must be tracked and reported
- **AM-2.6:** API errors must be tracked and reported
- **AM-2.7:** Background job failures must be tracked and reported
- **AM-2.8:** Error notifications must be configured for critical issues

### 12.3 Business Analytics

#### 12.3.1 Revenue Metrics
- **AM-3.1:** Monthly recurring revenue (MRR) must be tracked
- **AM-3.2:** Annual recurring revenue (ARR) must be tracked
- **AM-3.3:** Revenue by plan type must be tracked
- **AM-3.4:** Churn rate must be tracked
- **AM-3.5:** Customer lifetime value (CLV) must be calculated

#### 12.3.2 User Behavior Analysis
- **AM-3.6:** Most popular content types must be analyzed
- **AM-3.7:** User session duration and frequency must be tracked
- **AM-3.8:** Feature usage patterns must be analyzed
- **AM-3.9:** User feedback and satisfaction must be measured

## 13. Project Timeline and Milestones

### 13.1 Development Phases

#### 13.1.1 Phase 1: MVP Development (Weeks 1-4)
- **TM-1.1:** Set up project infrastructure and codebase
- **TM-1.2:** Implement authentication with Google OAuth
- **TM-1.3:** Develop basic YouTube processing functionality
- **TM-1.4:** Implement note generation and storage
- **TM-1.5:** Create basic UI with note list and detail views

#### 13.1.2 Phase 2: Core Functionality (Weeks 5-8)
- **TM-2.1:** Implement all content generation types
- **TM-2.2:** Develop folder organization system
- **TM-2.3:** Create enhanced note view with tabs
- **TM-2.4:** Implement search and filtering
- **TM-2.5:** Add responsive design for mobile

#### 13.1.3 Phase 3: Subscription and Payment (Weeks 9-12)
- **TM-3.1:** Implement free tier limitations
- **TM-3.2:** Integrate Airwallex payment processing
- **TM-3.3:** Develop subscription management flows
- **TM-3.4:** Create upgrade prompts and UI
- **TM-3.5:** Implement webhook handling for payment events

#### 13.1.4 Phase 4: Polish and Launch (Weeks 13-16)
- **TM-4.1:** Implement analytics and monitoring
- **TM-4.2:** Conduct performance optimization
- **TM-4.3:** Complete comprehensive testing
- **TM-4.4:** Prepare marketing and launch materials
- **TM-4.5:** Deploy to production and launch

### 13.2 Key Deliverables

#### 13.2.1 Technical Deliverables
- **TM-5.1:** Authentication system
- **TM-5.2:** YouTube processing API
- **TM-5.3:** Content generation system
- **TM-5.4:** Note management system
- **TM-5.5:** Subscription and payment system
- **TM-5.6:** Responsive UI components
- **TM-5.7:** Analytics and monitoring system

#### 13.2.2 Business Deliverables
- **TM-6.1:** Landing page and marketing materials
- **TM-6.2:** Subscription pricing and plans
- **TM-6.3:** User onboarding flow
- **TM-6.4:** Product documentation
- **TM-6.5:** Launch strategy

## 14. Appendices

### 14.1 Technology Stack Detail

#### 14.1.1 Frontend Technologies
- **Next.js 15.x**: React framework with App Router
- **React 19.x**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide Icons**: Icon library
- **SWR/React Query**: Data fetching and caching
- **Zod**: Schema validation

#### 14.1.2 Backend Technologies
- **Next.js API Routes**: Backend API endpoints
- **Prisma ORM**: Database ORM
- **PostgreSQL**: Relational database
- **NextAuth.js**: Authentication library
- **OpenAI API**: AI content generation
- **Scrapegoat**: YouTube transcript extraction
- **Airwallex API**: Payment processing

### 14.2 Third-Party Service Integration Details

#### 14.2.1 Google OAuth
- **Service**: Google Cloud Platform
- **Authentication Flow**: OAuth 2.0
- **Data Access**: Basic profile information
- **API Version**: Latest stable version

#### 14.2.2 OpenAI API
- **Service**: OpenAI API
- **Models**: GPT-4 Turbo
- **API Usage**: Content generation from transcripts
- **Request Format**: Chat completion API
- **Rate Limits**: Managed by application

#### 14.2.3 Scrapegoat
- **Purpose**: YouTube transcript extraction
- **Implementation**: Server-side processing
- **Limitations**: Depends on YouTube's transcript availability
- **Error Handling**: Graceful fallbacks

#### 14.2.4 Airwallex API
- **Service**: Airwallex Payments
- **Integration Type**: Direct API integration
- **Payment Methods**: Credit/debit cards
- **Subscription Management**: Recurring billing
- **Webhook Events**: Payment status updates

### 14.3 Data Schema Details

#### 14.3.1 User Schema
```prisma
model User {
  id                String          @id @default(cuid())
  name              String?
  email             String?         @unique
  emailVerified     DateTime?
  image             String?
  
  // Subscription fields
  plan              String          @default("free") // "free" or "premium"
  subscriptionId    String?         @unique
  subscriptionStatus String?        // "active", "past_due", "canceled", etc.
  planExpiresAt     DateTime?
  noteCount         Int             @default(0)
  
  // Relations
  accounts          Account[]
  sessions          Session[]
  notes             Note[]
  // Other relations
}
```

#### 14.3.2 Note Schema
```prisma
model Note {
  id            String    @id @default(cuid())
  title         String
  content       String    @db.Text
  summary       String?   @db.Text
  folderId      String?
  sourceType    String    // "text", "audio", "pdf", "youtube"
  sourceUrl     String?
  
  // Additional content fields stored as JSON
  quiz          Json?
  recipe        Json?
  workout       Json?
  travel        Json?
  chat          Json?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

#### 14.3.3 Folder Schema
```prisma
model Folder {
  id          String    @id @default(cuid())
  name        String
  parentId    String?
  
  // Relations
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 14.4 API Error Codes and Messages

| Error Code | HTTP Status | Description | User Message |
|------------|-------------|-------------|--------------|
| AUTH_001 | 401 | Unauthenticated user | Please log in to continue |
| AUTH_002 | 403 | Unauthorized access | You don't have permission to access this resource |
| LIMIT_001 | 403 | Free tier limit reached | You've reached the limit of 5 videos for free accounts |
| PAYMENT_001 | 400 | Invalid payment details | Please check your payment information |
| PAYMENT_002 | 502 | Payment gateway error | There was an issue processing your payment |
| VIDEO_001 | 400 | Invalid YouTube URL | Please enter a valid YouTube URL |
| VIDEO_002 | 404 | No transcript available | This video doesn't have a transcript available |
| CONTENT_001 | 500 | Content generation failed | We couldn't generate content for this video |
| API_001 | 429 | Rate limit exceeded | Too many requests, please try again later |
| SERVER_001 | 500 | Internal server error | Something went wrong, please try again |

---

This document outlines the comprehensive requirements for the Notabl.ai project. It serves as the definitive reference for all development, testing, and deployment activities. Requirements should be reviewed and updated as the project progresses.

Last Updated: May 2025