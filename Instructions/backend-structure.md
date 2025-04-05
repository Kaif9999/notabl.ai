# Notabl.ai Backend Structure

This document outlines the backend architecture of Notabl.ai, detailing the database schema, API endpoints, authentication mechanisms, and service integrations.

## 1. Database Schema

The application uses PostgreSQL with Prisma ORM for database interactions. The schema is defined in `prisma/schema.prisma`.

### 1.1. Core Models

#### User Model
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
  authenticators    Authenticator[]
  notes             Note[]
  transcripts       Transcript[]
  quizzes           Quiz[]
  recipes           Recipe[]
  travelPlans       TravelPlan[]
  workouts          Workout[]
  chats             Chat[]
  airwallexCustomer AirwallexCustomer?
  
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  @@map("users")
}
```

#### Note Model
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
  
  @@index([userId])
  @@index([folderId])
}
```

#### Transcript Model
```prisma
model Transcript {
  id          String   @id @default(cuid())
  title       String
  content     String   @db.Text
  sourceUrl   String?
  sourceName  String?  @default("YouTube")
  thumbnail   String?
  duration    Int?     // Duration in seconds
  
  // Metadata
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}
```

#### Authentication Models
```prisma
model Account {
  id                String   @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?  @db.Text
  access_token      String?  @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?  @db.Text
  session_state     String?
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
 
  @@unique([provider, providerAccountId])
  @@map("accounts")
}
 
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("sessions")
}
```

#### Payment Integration Models
```prisma
model AirwallexCustomer {
  id            String    @id @default(cuid())
  userId        String    @unique
  customerId    String    @unique
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@map("airwallex_customers")
}
```

### 1.2. Content Models

```prisma
model Quiz {
  id          String   @id @default(cuid())
  title       String
  questions   String   @db.Text
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

model Recipe {
  id          String   @id @default(cuid())
  title       String
  ingredients String   @db.Text
  instructions String  @db.Text
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

model TravelPlan {
  id          String   @id @default(cuid())
  title       String
  destination String
  itinerary   String   @db.Text
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

model Workout {
  id          String   @id @default(cuid())
  title       String
  exercises   String   @db.Text
  duration    Int?     // Duration in minutes
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

model Chat {
  id          String   @id @default(cuid())
  title       String
  messages    String   @db.Text
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}
```

## 2. API Structure

The API follows Next.js App Router convention with route handlers located in the `app/api` directory.

### 2.1. Authentication Endpoints

- **Google OAuth**
  - `POST /api/auth/signin/google` - Initiate Google OAuth flow
  - `GET /api/auth/callback/google` - OAuth callback handler
  - `GET /api/auth/session` - Get current session
  - `DELETE /api/auth/signout` - Sign out user

### 2.2. Note Management Endpoints

- **Notes**
  - `GET /api/notes` - List user's notes
  - `POST /api/notes` - Create a new note
  - `GET /api/notes/:id` - Get note by ID
  - `PUT /api/notes/:id` - Update note
  - `DELETE /api/notes/:id` - Delete note

- **Folders**
  - `GET /api/folders` - List user's folders
  - `POST /api/folders` - Create a new folder
  - `PUT /api/folders/:id` - Update folder
  - `DELETE /api/folders/:id` - Delete folder

### 2.3. Content Generation Endpoints

- **YouTube Processing**
  - `POST /api/transcript` - Process YouTube URL to extract transcript
    ```typescript
    // Request body
    {
      "url": "https://www.youtube.com/watch?v=VIDEO_ID"
    }
    
    // Response
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

- **Content Generation**
  - `POST /api/content/[type]` - Generate specific content type from transcript
    ```typescript
    // Path parameter: type = "note" | "quiz" | "recipe" | "workout" | "travel" | "chat"
    
    // Request body
    {
      "transcript": "Video transcript...",
      "videoDetails": {
        "title": "Video Title",
        // Other video metadata
      }
    }
    
    // Response
    {
      "content": "Generated content..." // Format depends on type
    }
    ```

### 2.4. Subscription Management Endpoints

- **Subscriptions**
  - `GET /api/subscriptions` - Get current subscription status
    ```typescript
    // Response
    {
      "plan": "free" | "premium",
      "status": "active" | "past_due" | "canceled" | null,
      "expiryDate": "2023-01-01T00:00:00Z" | null,
      "noteCount": 3,
      "noteLimit": 5 | null
    }
    ```
  
  - `POST /api/subscriptions` - Create a new subscription
    ```typescript
    // Request body
    {
      "planId": "monthly" | "yearly"
    }
    
    // Response
    {
      "clientSecret": "pi_client_secret_...",
      "customerId": "cus_...",
      "amount": 7.99 | 79.99,
      "currency": "USD",
      "interval": "month" | "year"
    }
    ```
  
  - `PUT /api/subscriptions` - Confirm subscription after payment
    ```typescript
    // Request body
    {
      "paymentIntentId": "pi_...",
      "planId": "monthly" | "yearly"
    }
    
    // Response
    {
      "success": true,
      "expiryDate": "2023-01-01T00:00:00Z"
    }
    ```
  
  - `DELETE /api/subscriptions` - Cancel subscription
    ```typescript
    // Response
    {
      "success": true
    }
    ```

### 2.5. Webhook Endpoints

- **Airwallex Webhooks**
  - `POST /api/webhooks/airwallex` - Handle Airwallex payment events
    ```typescript
    // Processes various webhook events:
    // - payment_intent.succeeded
    // - payment_intent.failed
    // - subscription.payment_successful
    // - subscription.payment_failed
    // - subscription.canceled
    // - subscription.expired
    ```

## 3. Authentication Implementation

Notabl.ai uses NextAuth.js (Auth.js) for authentication with Google OAuth.

### 3.1. NextAuth Configuration

```typescript
// auth.config.ts
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
} satisfies NextAuthConfig
```

### 3.2. Auth.js Implementation

```typescript
// auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "@/auth.config"

// Only use PrismaAdapter in non-edge environments
const adapter = process.env.NEXT_RUNTIME === 'edge' 
  ? undefined 
  : PrismaAdapter(prisma)

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  session: {
    strategy: "jwt",
  },
  callbacks:{
    session({token, session}){
      if(session.user && token.sub){
        session.user.id = token.sub
        
        if (token.picture) {
          session.user.image = token.picture
        }
        if (token.name) {
          session.user.name = token.name
        }
        if (token.email) {
          session.user.email = token.email
        }
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.sub = user.id
      }
      
      if (account && profile && account.provider === "google") {
        token.picture = profile.picture
        token.name = profile.name
        token.email = profile.email
      }
      
      return token
    }
  },
  ...authConfig,
})

// Separate server-side auth function
export const getServerAuthSession = auth
```

### 3.3. Authentication Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Skip auth check for auth-related routes
  if (
    request.nextUrl.pathname.startsWith('/api/auth') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }
  
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })
  
  const isAuthenticated = !!token
  const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  
  // Redirect unauthenticated users from dashboard to signin
  if (isOnDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
  
  // Allow authenticated users to access dashboard
  return NextResponse.next()
}

// Specify which routes should be protected
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/protected/:path*',
  ]
}
```

## 4. Core Services

### 4.1. Prisma Client

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
```

### 4.2. YouTube Transcript Service

```typescript
// app/api/transcript/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "@/auth";
import { prisma } from "@/lib/prisma";
import { scrapeTranscript, scrapeVideoInfo } from "scrapegoat";

// Extract YouTube ID from URL
function extractYouTubeId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

// Check if user can generate content based on plan limits
async function canGenerateContent(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      plan: true,
      _count: { select: { notes: true } }
    }
  });

  if (!user) return { canGenerate: false, reason: "User not found" };
  
  // Premium users have unlimited access
  if (user.plan === "premium") {
    return { canGenerate: true };
  }

  // Free users are limited to 5 notes
  if (user._count.notes >= 5) {
    return { 
      canGenerate: false, 
      reason: "You've reached the limit of 5 notes for free accounts. Upgrade to premium for unlimited notes." 
    };
  }

  return { canGenerate: true };
}

export async function POST(req: NextRequest) {
  const session = await getServerAuthSession();
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user can generate content
  const { canGenerate, reason } = await canGenerateContent(session.user.id);
  
  if (!canGenerate) {
    return NextResponse.json({ error: reason }, { status: 403 });
  }

  try {
    const { url } = await req.json();
    
    // Extract YouTube video ID
    const videoId = extractYouTubeId(url);
    
    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }
    
    // 1. Fetch video details using scrapegoat
    const videoInfo = await scrapeVideoInfo(videoId);
    
    if (!videoInfo) {
      return NextResponse.json({ error: "Failed to fetch video information" }, { status: 500 });
    }
    
    // 2. Fetch transcript using scrapegoat
    const transcript = await scrapeTranscript(videoId);
    
    if (!transcript) {
      return NextResponse.json({ error: "No transcript available for this video" }, { status: 404 });
    }
    
    // Format transcript as a clean text string
    const formattedTranscript = transcript
      .map(segment => segment.text)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Format video details
    const videoDetails = {
      title: videoInfo.title,
      channel: videoInfo.channelTitle,
      description: videoInfo.description,
      publishDate: videoInfo.publishDate,
      viewCount: videoInfo.viewCount,
      duration: videoInfo.lengthSeconds,
      thumbnailUrl: videoInfo.thumbnails.high?.url || videoInfo.thumbnails.default?.url,
    };

    // 3. Record this in the database for the user
    await prisma.note.create({
      data: {
        title: videoDetails.title,
        content: formattedTranscript,
        sourceType: "youtube",
        sourceUrl: url,
        userId: session.user.id,
        folderId: "folder-1", // Default folder
      }
    });
    
    // 4. Return video details and transcript
    return NextResponse.json({
      videoDetails,
      transcript: formattedTranscript,
    });
  } catch (error) {
    console.error("Error processing YouTube transcript:", error);
    return NextResponse.json(
      { error: "Failed to process YouTube video" },
      { status: 500 }
    );
  }
}
```

### 4.3. Content Generation Service

```typescript
// services/contentGenerator.ts
import OpenAI from 'openai';
import { ProcessingStatus } from "@/types";
import { encode } from 'gpt-tokenizer';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});

// Core content generation service that processes YouTube videos
export class ContentGenerationService {
  // Process content for a specific type
  static async generateContent(type: string, transcript: string, videoDetails: any, onStatusUpdate?: (status: ProcessingStatus) => void) {
    try {
      if (onStatusUpdate) onStatusUpdate("generating");
      
      // Truncate transcript if too long to fit in model context
      const truncatedTranscript = truncateTranscript(transcript, 8000); // Allow room for prompt & response
      
      // Generate prompt based on content type
      const prompt = generatePrompt(type, truncatedTranscript, videoDetails);
      
      // Call OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: "You are an expert content creator specializing in transforming transcripts into various content formats." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      });
      
      // Parse the response
      let content = response.choices[0].message.content || "";
      
      // Handle JSON responses for quiz and chat content types
      if (type === "quiz" || type === "chat") {
        try {
          return JSON.parse(content);
        } catch (error) {
          console.error(`Error parsing JSON for ${type}:`, error);
          // Return as plain text if JSON parsing fails
          return content;
        }
      }
      
      // Return as text for other types
      return content;
    } catch (error) {
      console.error(`Error generating ${type}:`, error);
      throw error;
    }
  }
}

// Helper to generate appropriate prompts based on content type
function generatePrompt(type: string, transcript: string, videoDetails: any): string {
  const title = videoDetails.title || "the video";
  
  switch (type) {
    case "note":
      return `Generate a comprehensive, well-structured educational note from this transcript of a YouTube video titled "${title}". 
      Include key concepts, definitions, and important points. 
      Format with markdown using headers, bullet points, and sections for clarity.
      Transcript: ${transcript}`;
    
    case "quiz":
      return `Create 10 quiz questions based on this YouTube video transcript titled "${title}".
      Each question should have 4 multiple-choice options with one correct answer.
      Format as a JSON array of objects with "question", "options" (array), and "correctAnswerIndex" (0-3).
      Transcript: ${transcript}`;
    
    // Other content type prompts...
    
    default:
      return `Summarize the key points from this transcript of "${title}". 
      Format with clear sections and bullet points.
      Transcript: ${transcript}`;
  }
}

// Truncate transcript to fit within token limits
function truncateTranscript(transcript: string, maxTokens: number): string {
  const tokens = encode(transcript);
  
  if (tokens.length <= maxTokens) {
    return transcript;
  }
  
  // Truncate to max tokens and add an indicator
  const truncatedTokens = tokens.slice(0, maxTokens);
  const truncatedText = decodeTokens(truncatedTokens);
  
  return truncatedText + "\n\n[Transcript truncated due to length...]";
}

// Helper to decode tokens
function decodeTokens(tokens: number[]): string {
  // This is a simplified decode just for demonstration
  // In production, you'd want a proper decoding method
  return tokens.map(t => String.fromCharCode(t % 256)).join('');
}

// API wrapper functions for easier usage in components
export async function generateNote(transcript: string, videoDetails: any, onStatusUpdate?: (status: ProcessingStatus) => void) {
  return ContentGenerationService.generateContent("note", transcript, videoDetails, onStatusUpdate);
}

export async function generateQuiz(transcript: string, videoDetails: any, onStatusUpdate?: (status: ProcessingStatus) => void) {
  return ContentGenerationService.generateContent("quiz", transcript, videoDetails, onStatusUpdate);
}

// Other content generation exports...

export default {
  generateNote,
  generateQuiz,
  // Other exports...
};
```

### 4.4. Content Type API Route

```typescript
// app/api/content/[type]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "@/auth";
import { prisma } from "@/lib/prisma";
import { OpenAI } from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Check if user can generate content based on plan limits
async function canGenerateContent(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      plan: true,
      _count: { select: { notes: true } }
    }
  });

  if (!user) return { canGenerate: false, reason: "User not found" };
  
  // Premium users have unlimited access
  if (user.plan === "premium") {
    return { canGenerate: true };
  }

  // Free users are limited to 5 notes
  if (user._count.notes >= 5) {
    return { 
      canGenerate: false, 
      reason: "You've reached the limit of 5 notes for free accounts. Upgrade to premium for unlimited notes." 
    };
  }

  return { canGenerate: true };
}

export async function POST(
  req: NextRequest,
  { params }: { params: { type: string } }
) {
  const session = await getServerAuthSession();
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check user's plan limits
  const { canGenerate, reason } = await canGenerateContent(session.user.id);
  
  if (!canGenerate) {
    return NextResponse.json({ error: reason }, { status: 403 });
  }

  try {
    const { transcript, videoDetails } = await req.json();
    const { type } = params;

    // Prepare prompt based on content type
    let prompt = "";
    let model = "gpt-4-turbo";

    switch (type) {
      case "note":
        prompt = `Generate a comprehensive, well-structured educational note from this transcript of a YouTube video titled "${videoDetails.title}". 
        Include key concepts, definitions, and important points. 
        Format with markdown using headers, bullet points, and sections for clarity.
        Transcript: ${transcript}`;
        break;
      
      case "quiz":
        prompt = `Create 10 quiz questions based on this YouTube video transcript titled "${videoDetails.title}".
        Each question should have 4 multiple-choice options with one correct answer.
        Format as a JSON array of objects with "question", "options" (array), and "correctAnswerIndex" (0-3).
        Transcript: ${transcript}`;
        break;
      
      // Other content types...
      
      default:
        return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    // Generate content using OpenAI
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let content = completion.choices[0].message.content || "";

    // For quiz and chat types, parse the JSON
    if (type === "quiz" || type === "chat") {
      try {
        content = JSON.parse(content);
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        // If parsing fails, return the raw text
      }
    }

    // If this is the first content being generated for a note, create a new note
    if (type === "note") {
      const noteExists = await prisma.note.findFirst({
        where: {
          userId: session.user.id,
          title: videoDetails.title,
        }
      });

      if (!noteExists) {
        await prisma.note.create({
          data: {
            title: videoDetails.title,
            content: content,
            userId: session.user.id,
            folderId: "folder-1", // Default folder
          }
        });
      }
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error(`Error generating ${params.type}:`, error);
    return NextResponse.json(
      { error: `Failed to generate ${params.type}` },
      { status: 500 }
    );
  }
}
```

## 5. Payment Integration

### 5.1. Airwallex Integration Service

```typescript
// lib/airwallex.ts
import { AuthService, PaymentIntentService, CustomerService } from '@airwallex/api';
import crypto from 'crypto';

// Airwallex API configuration
const CLIENT_ID = process.env.AIRWALLEX_CLIENT_ID!;
const API_KEY = process.env.AIRWALLEX_API_KEY!;
const WEBHOOK_SECRET = process.env.AIRWALLEX_WEBHOOK_SECRET!;

// Initialize Airwallex services
const authService = new AuthService({
  clientId: CLIENT_ID,
  apiKey: API_KEY,
  environment: process.env.NODE_ENV === 'production' ? 'prod' : 'demo',
});

const paymentIntentService = new PaymentIntentService({
  authService,
});

const customerService = new CustomerService({
  authService,
});

// Create a customer in Airwallex
export async function createCustomer(customerData: { email: string; name?: string }) {
  try {
    const customer = await customerService.create({
      request_id: `customer_${Date.now()}`,
      email: customerData.email,
      name: customerData.name || 'Notabl User',
      metadata: {
        source: 'notabl.ai'
      }
    });
    
    return customer;
  } catch (error) {
    console.error('Failed to create Airwallex customer:', error);
    throw new Error('Failed to create customer');
  }
}

// Create a payment intent
export async function createPaymentIntent(paymentData: {
  amount: number;
  currency: string;
  customer_id?: string;
  payment_method_options?: any;
  metadata?: Record<string, any>;
}) {
  try {
    const paymentIntent = await paymentIntentService.create({
      request_id: `payment_${Date.now()}`,
      amount: paymentData.amount,
      currency: paymentData.currency,
      merchant_order_id: `order_${Date.now()}`,
      customer_id: paymentData.customer_id,
      metadata: paymentData.metadata || {},
    });
    
    return paymentIntent;
  } catch (error) {
    console.error('Failed to create Airwallex payment intent:', error);
    throw new Error('Failed to process payment');
  }
}

// Confirm payment intent
export async function confirmPaymentIntent(paymentIntentId: string, paymentMethodId: string) {
  try {
    const confirmedPayment = await paymentIntentService.confirm(paymentIntentId, {
      payment_method: {
        type: 'card',
        card: {
          payment_method_id: paymentMethodId
        }
      }
    });
    
    return confirmedPayment;
  } catch (error) {
    console.error('Failed to confirm Airwallex payment:', error);
    throw new Error('Failed to confirm payment');
  }
}

// Get payment intent details
export async function getPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await paymentIntentService.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Failed to get Airwallex payment intent:', error);
    throw new Error('Failed to retrieve payment details');
  }
}

// Verify webhook signature
export function verifyWebhookSignature(payload: string, signature: string) {
  try {
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    hmac.update(payload);
    const calculatedSignature = hmac.digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(calculatedSignature, 'hex'),
      Buffer.from(signature, 'hex')
    );
  } catch (error) {
    console.error('Failed to verify webhook signature:', error);
    return false;
  }
}

export default {
  createCustomer,
  createPaymentIntent,
  confirmPaymentIntent,
  getPaymentIntent,
  verifyWebhookSignature,
};
```

### 5.2. Subscription API Route

```typescript
// app/api/subscriptions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerAuthSession } from '@/auth';
import { prisma } from '@/lib/prisma';
import airwallex from '@/lib/airwallex';

// Create a new subscription
export async function POST(req: NextRequest) {
  const session = await getServerAuthSession();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { planId } = await req.json();
    
    // Determine plan details
    const isYearly = planId === 'yearly';
    const planAmount = isYearly ? 79.99 : 7.99;
    const planName = isYearly ? 'Notabl.ai Yearly' : 'Notabl.ai Monthly';
    const planInterval = isYearly ? 'year' : 'month';
    
    // Create or retrieve Airwallex customer
    let airwallexCustomer = await prisma.airwallexCustomer.findUnique({
      where: { userId: session.user.id }
    });
    
    if (!airwallexCustomer) {
      const customerData = await airwallex.createCustomer({
        email: session.user.email!,
        name: session.user.name || 'Notabl User'
      });
      
      airwallexCustomer = await prisma.airwallexCustomer.create({
        data: {
          userId: session.user.id,
          customerId: customerData.id
        }
      });
    }
    
    // Create payment intent
    const paymentIntent = await airwallex.createPaymentIntent({
      amount: planAmount,
      currency: 'USD',
      customer_id: airwallexCustomer.customerId,
      metadata: {
        userId: session.user.id,
        planId,
        planName
      }
    });
    
    // Return client secret for frontend to complete payment
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      customerId: airwallexCustomer.customerId,
      amount: planAmount,
      currency: 'USD',
      interval: planInterval
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}

// Confirm subscription after payment
export async function PUT(req: NextRequest) {
  const session = await getServerAuthSession();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { paymentIntentId, planId } = await req.json();
    
    // Determine plan expiry
    const isYearly = planId === 'yearly';
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (isYearly ? 365 : 30));
    
    // Update user's subscription details
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        plan: 'premium',
        subscriptionId: paymentIntentId,
        subscriptionStatus: 'active',
        planExpiresAt: expiryDate
      }
    });
    
    return NextResponse.json({
      success: true,
      expiryDate: user.planExpiresAt
    });
  } catch (error) {
    console.error('Error confirming subscription:', error);
    return NextResponse.json(
      { error: 'Failed to confirm subscription' },
      { status: 500 }
    );
  }
}

// Get subscription status
export async function GET(req: NextRequest) {
  const session = await getServerAuthSession();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        plan: true,
        subscriptionStatus: true,
        planExpiresAt: true,
        _count: { select: { notes: true } }
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      plan: user.plan,
      status: user.subscriptionStatus,
      expiryDate: user.planExpiresAt,
      noteCount: user._count.notes,
      noteLimit: user.plan === 'premium' ? null : 5 // Free users limited to 5 notes
    });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription status' },
      { status: 500 }
    );
  }
}

// Cancel subscription
export async function DELETE(req: NextRequest) {
  const session = await getServerAuthSession();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { subscriptionId: true }
    });
    
    if (!user?.subscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }
    
    // Cancel subscription in Airwallex
    await airwallex.cancelSubscription(user.subscriptionId);
    
    // Update user's subscription status
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        subscriptionStatus: 'canceled'
        // Don't change plan yet - access continues until expiry date
      }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
```

### 5.3. Webhook API Route

```typescript
// app/api/webhooks/airwallex/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import airwallex from '@/lib/airwallex';

export async function POST(req: NextRequest) {
  // Get the raw request body
  const rawBody = await req.text();
  const signature = req.headers.get('x-signature');
  
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }
  
  // Verify webhook signature
  const isValid = airwallex.verifyWebhookSignature(rawBody, signature);
  
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  
  try {
    const event = JSON.parse(rawBody);
    
    // Handle different webhook events
    switch (event.name) {
      case 'payment_intent.succeeded': {
        // Handle successful payment
        const { payment_intent_id, customer_id, metadata } = event.data;
        
        if (!metadata?.userId) {
          console.error('Payment intent metadata missing userId:', event);
          return NextResponse.json({ error: 'Missing user ID in metadata' }, { status: 400 });
        }
        
        // Find the user by Airwallex customer ID
        const airwallexCustomer = await prisma.airwallexCustomer.findUnique({
          where: { customerId: customer_id }
        });
        
        if (!airwallexCustomer) {
          console.error('Airwallex customer not found:', customer_id);
          return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        }
        
        // Calculate subscription expiry based on plan
        const isYearly = metadata.planId === 'yearly';
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + (isYearly ? 365 : 30));
        
        // Update user subscription details
        await prisma.user.update({
          where: { id: airwallexCustomer.userId },
          data: {
            plan: 'premium',
            subscriptionId: payment_intent_id,
            subscriptionStatus: 'active',
            planExpiresAt: expiryDate
          }
        });
        
        break;
      }
      
      case 'payment_intent.failed': {
        // Handle failed payment
        const { metadata, customer_id } = event.data;
        
        if (!customer_id) break;
        
        const airwallexCustomer = await prisma.airwallexCustomer.findUnique({
          where: { customerId: customer_id }
        });
        
        if (!airwallexCustomer) break;
        
        // Update user subscription status
        await prisma.user.update({
          where: { id: airwallexCustomer.userId },
          data: {
            subscriptionStatus: 'payment_failed'
          }
        });
        
        break;
      }
      
      case 'subscription.payment_successful': {
        // Handle recurring payment success for subscription renewal
        const { id, current_period_end } = event.data;
        
        // Find user by subscription ID
        const user = await prisma.user.findUnique({
          where: { subscriptionId: id }
        });
        
        if (!user) break;
        
        // Update subscription expiry date
        await prisma.user.update({
          where: { id: user.id },
          data: {
            planExpiresAt: new Date(current_period_end * 1000),
            subscriptionStatus: 'active'
          }
        });
        
        break;
      }
      
      case 'subscription.payment_failed': {
        // Handle recurring payment failure
        const { id } = event.data;
        
        // Find user by subscription ID
        const user = await prisma.user.findUnique({
          where: { subscriptionId: id }
        });
        
        if (!user) break;
        
        // Update subscription status
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionStatus: 'payment_failed'
          }
        });
        
        break;
      }
      
      case 'subscription.canceled': {
        // Handle subscription cancellation
        const { id } = event.data;
        
        // Find user by subscription ID
        const user = await prisma.user.findUnique({
          where: { subscriptionId: id }
        });
        
        if (!user) break;
        
        // Update subscription status
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionStatus: 'canceled'
          }
        });
        
        break;
      }
      
      case 'subscription.expired': {
        // Handle subscription expiration
        const { id } = event.data;
        
        // Find user by subscription ID
        const user = await prisma.user.findUnique({
          where: { subscriptionId: id }
        });
        
        if (!user) break;
        
        // Downgrade to free plan
        await prisma.user.update({
          where: { id: user.id },
          data: {
            plan: 'free',
            subscriptionId: null,
            subscriptionStatus: null,
            planExpiresAt: null
          }
        });
        
        break;
      }
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
```

## 6. Error Handling

### 6.1. Global Error Handler

```typescript
// lib/error.ts
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return {
      error: error.message,
      statusCode: error.statusCode
    };
  }

  console.error("Unhandled error:", error);
  return {
    error: "An unexpected error occurred",
    statusCode: 500
  };
}
```

### 6.2. API Error Handling Pattern

```typescript
// Example API endpoint with error handling
export async function POST(req: NextRequest) {
  try {
    // API logic here
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const { error: errorMessage, statusCode } = handleApiError(error);
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
```

## 7. Security Considerations

### 7.1. Authentication

- Uses NextAuth.js with JWT strategy
- Secure cookies with appropriate flags (httpOnly, secure, etc.)
- OAuth flow with Google for secure authentication

### 7.2. Authorization

- Middleware protection for restricted routes
- Server-side session validation for API routes
- Plan-based access control for premium features

### 7.3. Payment Security

- Airwallex SDK for secure payment handling
- Webhook signature verification
- No storing of sensitive payment details

### 7.4. Data Protection

- Proper error handling to prevent leaking sensitive information
- Input validation for all API endpoints
- Rate limiting for sensitive operations

## 8. Environment Configuration

```
# .env.local

# App
NODE_ENV=development

# Authentication
AUTH_SECRET=your-auth-secret
AUTH_GOOGLE_ID=your-google-oauth-client-id
AUTH_GOOGLE_SECRET=your-google-oauth-client-secret

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/notabl

# OpenAI for content generation
OPENAI_API_KEY=your-openai-api-key

# Airwallex (for payments)
AIRWALLEX_CLIENT_ID=your-airwallex-client-id
AIRWALLEX_API_KEY=your-airwallex-api-key
AIRWALLEX_WEBHOOK_SECRET=your-airwallex-webhook-secret
```

## 9. Deployment Considerations

### 9.1. Environment Setup

- Production variables must be set in hosting platform
- Database migration should be run before deployment
- API keys and secrets must be properly secured

### 9.2. Database Migration

Run the following commands during deployment:

```bash
# Generate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate deploy
```

### 9.3. Production Optimizations

- Enable edge functions where possible for faster global performance
- Configure proper caching headers for static assets
- Set up monitoring and error tracking

### 9.4. Scalability Considerations

- Database connection pooling for handling increased load
- Consider caching frequently accessed data
- Rate limiting to prevent abuse of AI-generated content

## 10. Dependencies

```json
{
  "dependencies": {
    "@airwallex/api": "^1.x.x",
    "@auth/pg-adapter": "^1.8.0",
    "@auth/prisma-adapter": "^2.8.0",
    "@prisma/client": "^6.5.0",
    "gpt-tokenizer": "^2.x.x",
    "next": "15.2.2",
    "next-auth": "^5.0.0-beta.25",
    "openai": "^4.x.x",
    "scrapegoat": "^1.x.x"
  },
  "devDependencies": {
    "prisma": "^6.5.0",
    "typescript": "^5"
  }
}
```

This backend structure documentation provides a comprehensive overview of the Notabl.ai application's server-side implementation, covering database schema, API endpoints, authentication mechanisms, content generation, subscription management, and deployment considerations.