# Notabl.ai App Flow

This document provides a detailed flow of the Notabl.ai application, focusing on the YouTube content platform functionality. It covers the complete user journey from registration to content generation and subscription management.

## 1. User Authentication Flow

### 1.1. New User Registration

1. User navigates to `https://notabl.ai/`
2. User clicks "Get Started" or "Sign Up" button
3. User is directed to `/signin` page
4. User clicks "Sign in with Google" button
5. Google OAuth flow is initiated:
   - NextAuth redirects to Google authentication page
   - User grants permissions to Notabl.ai
   - Google redirects back to callback URL with OAuth code
   - NextAuth exchanges code for access token
   - User profile is retrieved from Google
6. User account is created in database:
   ```
   POST /api/auth/callback/google
   ```
7. Initial user record is created in Prisma:
   ```prisma
   User {
     id: <generated-id>,
     name: <from-google>,
     email: <from-google>,
     image: <from-google>,
     plan: "free",
     noteCount: 0
   }
   ```
8. User is redirected to `/dashboard`

### 1.2. Returning User Login

1. User navigates to `https://notabl.ai/`
2. User clicks "Login" button
3. User is directed to `/signin` page
4. User clicks "Sign in with Google" button
5. Google OAuth flow is initiated (with faster authentication for returning users)
6. Session is created and validated:
   ```
   GET /api/auth/session
   ```
7. User is redirected to `/dashboard`

### 1.3. Session Management

1. On initial page load, `useSession()` hook is called in NoteProvider:
   ```javascript
   const { data: session, status } = useSession();
   ```
2. Session status is checked:
   - `"loading"`: Display loading spinner
   - `"unauthenticated"`: Redirect to `/signin`
   - `"authenticated"`: Show dashboard
3. Middleware checks authentication for protected routes:
   ```javascript
   // middleware.ts
   export async function middleware(request: NextRequest) {
     // Check if user is authenticated
     const isAuthenticated = !!await getToken({ req: request });
     
     // Redirect if not authenticated
     if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
       return NextResponse.redirect(new URL('/signin', request.url));
     }
   }
   ```

## 2. Dashboard Initial Experience

### 2.1. Dashboard Load

1. User is directed to `/dashboard` after authentication
2. `app/dashboard/page.tsx` is rendered:
   ```javascript
   export default function Dashboard() {
     // Component code
     return (
       <div>
         <Sidebar />
         <YouTubeProcessor />
         <MainContent />
       </div>
     );
   }
   ```
3. Context initialization in `NoteProvider`:
   ```javascript
   // Load notes from localStorage or empty array
   const [notes, setNotes] = useState<Note[]>(() => {
     if (typeof window !== "undefined") {
       const savedNotes = localStorage.getItem("notes");
       return savedNotes ? JSON.parse(savedNotes) : [];
     }
     return [];
   });
   
   // Load folders
   const [folders, setFolders] = useState<Folder[]>(() => {
     // Similar localStorage logic
   });
   ```
4. Subscription status is fetched:
   ```javascript
   const fetchSubscriptionStatus = async () => {
     const response = await fetch("/api/subscriptions");
     const data = await response.json();
     
     setUserProfile(prev => ({
       ...prev,
       plan: data.plan || "free",
       subscriptionStatus: data.status,
       // Other fields
     }));
   };
   ```
5. User profile is updated with session data:
   ```javascript
   useEffect(() => {
     if (status === "authenticated" && session?.user) {
       setUserProfile(prev => ({
         ...prev,
         name: session.user.name || prev.name,
         email: session.user.email || prev.email,
         avatar: session.user.image || prev.avatar,
       }));
       
       fetchSubscriptionStatus();
     }
   }, [session, status]);
   ```

### 2.2. Dashboard Display

1. Sidebar renders folders and user profile:
   ```javascript
   <Sidebar 
     onOpenSettings={() => setSettingsOpen(true)}
     onOpenUpgrade={() => setUpgradeOpen(true)}
   />
   ```
2. User profile check determines upgrade prompts:
   ```javascript
   {userProfile.plan === "free" && (
     <Button onClick={onOpenUpgrade}>Upgrade plan</Button>
   )}
   ```
3. YouTube processor is displayed prominently:
   ```javascript
   <YouTubeProcessor onOpenUpgrade={() => setUpgradeOpen(true)} />
   ```
4. MainContent displays existing notes:
   ```javascript
   <MainContent title="All notes" folderId="folder-1" />
   ```
5. If free user is close to limits, a warning is shown:
   ```javascript
   {userProfile.plan === 'free' && userProfile.notesUsed >= 4 && (
     <UserLimitWarning onUpgrade={onOpenUpgrade} />
   )}
   ```

## 3. YouTube Content Processing Flow

### 3.1. Entering YouTube URL

1. User enters YouTube URL in the input field:
   ```javascript
   <Input
     type="text"
     placeholder="Enter YouTube video URL"
     value={youtubeUrl}
     onChange={(e) => setYoutubeUrl(e.target.value)}
     className="flex-1 pl-10 border-2 border-gray-200 focus:border-purple-500 h-12"
   />
   ```
2. User clicks "Process Video" button:
   ```javascript
   <Button 
     onClick={handleProcessYouTube}
     className="bg-black hover:bg-black/90 text-white px-4 h-12"
   >
     <Upload className="mr-2 h-4 w-4" />
     Process Video
   </Button>
   ```
3. URL validation is performed:
   ```javascript
   const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
   if (!youtubeRegex.test(youtubeUrl)) {
     toast.error("Please enter a valid YouTube URL");
     return;
   }
   ```
4. Free user limits are checked:
   ```javascript
   if (!checkAndNotifyLimits(onOpenUpgrade)) {
     return;
   }
   ```

### 3.2. Processing YouTube Video

1. Processing status is updated:
   ```javascript
   setProcessingStatus("uploading");
   ```
2. API call to transcript service:
   ```javascript
   // Client-side
   const data = await ContentGenerationService.processYouTubeVideo(youtubeUrl, setProcessingStatus);
   
   // Which calls:
   const response = await fetch("/api/transcript", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ url: youtubeUrl }),
   });
   ```
3. Server-side processing in API route:
   ```javascript
   // app/api/transcript/route.ts
   export async function POST(req: NextRequest) {
     // Check if user can generate content
     const { canGenerate, reason } = await canGenerateContent(session.user.id);
     
     // Extract YouTube ID
     const videoId = extractYouTubeId(url);
     
     // Fetch video info
     const videoInfo = await scrapeVideoInfo(videoId);
     
     // Fetch transcript
     const transcript = await scrapeTranscript(videoId);
     
     // Format transcript
     const formattedTranscript = transcript.map(segment => segment.text).join(' ');
     
     // Return data
     return NextResponse.json({
       videoDetails,
       transcript: formattedTranscript,
     });
   }
   ```
4. Processing status updates as steps progress:
   ```javascript
   setProcessingStatus("transcribing");
   // Then
   setProcessingStatus("generating");
   // Then
   setProcessingStatus("completed");
   ```
5. Video details and transcript are stored:
   ```javascript
   setVideoDetails(data.videoDetails);
   setTranscript(data.transcript);
   ```

### 3.3. Initial Content Generation

1. Based on selected content type, generate initial content:
   ```javascript
   await generateContent(selectedContentType, data.transcript, data.videoDetails);
   ```
2. API call to content generation service:
   ```javascript
   // Client-side
   const content = await ContentGenerationService.generateContent(type, transcriptText, videoData);
   
   // Which ultimately calls:
   const response = await fetch(`/api/content/${type}`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ transcript, videoDetails }),
   });
   ```
3. Server-side processing with OpenAI:
   ```javascript
   // app/api/content/[type]/route.ts
   export async function POST(req: NextRequest, { params }: { params: { type: string } }) {
     // Generate prompt based on content type
     const prompt = generatePrompt(type, transcript, videoDetails);
     
     // Call OpenAI
     const completion = await openai.chat.completions.create({
       model: "gpt-4-turbo",
       messages: [
         { role: "system", content: "You are an expert content creator..." },
         { role: "user", content: prompt }
       ],
     });
     
     // Process response
     let content = completion.choices[0].message.content || "";
     
     // Return content
     return NextResponse.json({ content });
   }
   ```
4. Initial note is created and stored:
   ```javascript
   const newNote = {
     id: `note-${Date.now()}`,
     title: videoData.title,
     content: transcriptText,
     folderId: "folder-1",
     createdAt: new Date(),
     updatedAt: new Date(),
     sourceType: "youtube",
     sourceUrl: youtubeUrl,
     [type]: content
   };
   
   addNote(newNote);
   ```
5. Success notification is shown:
   ```javascript
   toast.success(`Generated ${type} for "${videoData.title}"`);
   ```

## 4. Content Type Navigation and Generation

### 4.1. Viewing Generated Content

1. Content tabs are displayed:
   ```javascript
   <Tabs 
     value={selectedContentType} 
     onValueChange={handleTabChange}
     className="mt-6"
   >
     <TabsList>
       {CONTENT_TYPES.map(type => (
         <TabsTrigger key={type.id} value={type.id}>
           {type.icon}
           <span>{type.label}</span>
         </TabsTrigger>
       ))}
     </TabsList>
     
     {CONTENT_TYPES.map(type => (
       <TabsContent key={type.id} value={type.id}>
         {renderContent(type.id)}
       </TabsContent>
     ))}
   </Tabs>
   ```
2. Content is rendered based on type:
   ```javascript
   const renderContent = (type: string) => {
     const content = generatedContent[type];
     
     if (processingContentType === type) {
       return <LoadingView />;
     }
     
     if (!content) {
       return <EmptyView onGenerate={() => generateContent(type)} />;
     }
     
     switch (type) {
       case "transcript": return <TranscriptView content={content} />;
       case "quiz": return <QuizView questions={content} />;
       // Other content types...
     }
   };
   ```

### 4.2. On-Demand Content Generation

1. User clicks on a tab for content not yet generated:
   ```javascript
   const handleTabChange = async (type: string) => {
     setSelectedContentType(type);
     
     // If we have video details and transcript but not this content type
     if (videoDetails && transcript && !generatedContent[type]) {
       await generateContent(type, transcript, videoDetails);
     }
   };
   ```
2. Check if user can generate more content:
   ```javascript
   // For free users
   if (userProfile.plan === "free") {
     const canGenerate = checkAndNotifyLimits(onOpenUpgrade);
     if (!canGenerate) return;
   }
   ```
3. Process starts with UI feedback:
   ```javascript
   setIsGenerating(true);
   setGeneratingType(type);
   ```
4. Content generation is requested:
   ```javascript
   let content;
   switch (type) {
     case "quiz":
       content = await ContentGenerationService.generateQuiz(note.content, videoDetails);
       break;
     // Other content types...
   }
   ```
5. Note is updated with new content:
   ```javascript
   const updatedNote = {
     ...note,
     [type]: content
   };
   onSave(updatedNote);
   ```
6. Generation state is reset and success notification shown:
   ```javascript
   setIsGenerating(false);
   setGeneratingType(null);
   toast.success(`Generated ${type} successfully`);
   ```

## 5. Free User Limit Handling

### 5.1. Limit Tracking

1. Note count is updated when notes are added/removed:
   ```javascript
   useEffect(() => {
     // Update notesUsed count in userProfile
     setUserProfile(prev => ({
       ...prev,
       notesUsed: notes.length
     }));
   }, [notes]);
   ```
2. Server-side limit checking:
   ```javascript
   async function canGenerateContent(userId: string) {
     const user = await prisma.user.findUnique({
       where: { id: userId },
       select: { 
         plan: true,
         _count: { select: { notes: true } }
       }
     });
     
     // Premium users have unlimited access
     if (user.plan === "premium") {
       return { canGenerate: true };
     }
     
     // Free users are limited to 5 notes
     if (user._count.notes >= 5) {
       return { 
         canGenerate: false, 
         reason: "You've reached the limit of 5 notes for free accounts."
       };
     }
     
     return { canGenerate: true };
   }
   ```

### 5.2. Limit Warning UI

1. Warning component is shown when approaching limits:
   ```javascript
   <UserLimitWarning onUpgrade={onOpenUpgrade} />
   ```
2. Component displays usage information:
   ```javascript
   const usagePercentage = (userProfile.notesUsed / 5) * 100;
   const notesRemaining = 5 - userProfile.notesUsed;
   
   return (
     <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
       <h3>
         {notesRemaining === 0
           ? "You've reached your free plan limit"
           : `You have ${notesRemaining} note${notesRemaining === 1 ? '' : 's'} remaining`}
       </h3>
       
       <div className="mb-3">
         <ProgressBar value={userProfile.notesUsed} max={5} />
       </div>
       
       <Button onClick={onUpgrade}>
         Upgrade to Premium
       </Button>
     </div>
   );
   ```

### 5.3. Handling Limit Reached

1. When limit is reached, YouTube processor shows upgrade button:
   ```javascript
   {hasReachedLimit ? (
     <Button 
       className="bg-purple-600 hover:bg-purple-700 text-white px-4 h-12"
       onClick={onOpenUpgrade}
     >
       Upgrade to Continue
     </Button>
   ) : (
     <Button onClick={handleProcessYouTube}>
       Process Video
     </Button>
   )}
   ```
2. API requests return error when limit is reached:
   ```javascript
   // Server-side
   const { canGenerate, reason } = await canGenerateContent(session.user.id);
   
   if (!canGenerate) {
     return NextResponse.json({ error: reason }, { status: 403 });
   }
   ```
3. Upgrade modal is shown when actions are blocked:
   ```javascript
   // Client-side
   const checkAndNotifyLimits = (onUpgrade?: () => void) => {
     if (!canCreateContent) {
       toast.error("You've reached the limit of 5 notes for free accounts.", {
         description: "Upgrade to premium for unlimited notes.",
         action: {
           label: "Upgrade",
           onClick: onUpgrade
         }
       });
       return false;
     }
     return true;
   };
   ```

## 6. Premium Subscription Flow

### 6.1. Upgrade Modal Display

1. User clicks "Upgrade" button:
   ```javascript
   <Button onClick={onOpenUpgrade}>
     Upgrade to Premium
   </Button>
   ```
2. Upgrade modal is shown:
   ```javascript
   <EnhancedUpgradeModal isOpen={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
   ```
3. Modal displays plan options:
   ```javascript
   const [billingPeriod, setBillingPeriod] = useState<"yearly" | "monthly">("yearly");
   
   <div className="bg-gray-200 p-1 rounded-full flex">
     <button
       className={billingPeriod === "yearly" ? "active" : ""}
       onClick={() => setBillingPeriod("yearly")}
     >
       Yearly <span>Save 60%</span>
     </button>
     <button
       className={billingPeriod === "monthly" ? "active" : ""}
       onClick={() => setBillingPeriod("monthly")}
     >
       Monthly
     </button>
   </div>
   ```

### 6.2. Payment Initialization

1. User clicks "Upgrade now" button:
   ```javascript
   <Button onClick={handleProceedToPayment}>
     Upgrade now
   </Button>
   ```
2. Initial payment setup:
   ```javascript
   const handleProceedToPayment = async () => {
     setIsProcessing(true);
     
     try {
       // Call API to create a subscription payment intent
       const response = await fetch("/api/subscriptions", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           planId: billingPeriod,
         }),
       });
       
       const data = await response.json();
       setClientSecret(data.clientSecret);
       setStep("payment");
     } catch (error) {
       toast.error("Something went wrong with your subscription");
     } finally {
       setIsProcessing(false);
     }
   };
   ```
3. Server-side payment intent creation:
   ```javascript
   // app/api/subscriptions/route.ts
   export async function POST(req: NextRequest) {
     const { planId } = await req.json();
     
     // Determine plan details
     const isYearly = planId === 'yearly';
     const planAmount = isYearly ? 79.99 : 7.99;
     
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
     });
     
     return NextResponse.json({
       clientSecret: paymentIntent.client_secret,
       customerId: airwallexCustomer.customerId,
       amount: planAmount,
       currency: 'USD',
       interval: planInterval
     });
   }
   ```

### 6.3. Payment Processing

1. User enters payment details:
   ```javascript
   <form onSubmit={handlePayment}>
     <div className="space-y-2">
       <Label htmlFor="cardName">Cardholder Name</Label>
       <Input
         id="cardName"
         name="cardName"
         value={paymentDetails.cardName}
         onChange={handleInputChange}
         required
       />
     </div>
     
     <div className="space-y-2">
       <Label htmlFor="cardNumber">Card Number</Label>
       <Input
         id="cardNumber"
         name="cardNumber"
         value={paymentDetails.cardNumber}
         onChange={handleInputChange}
         required
       />
     </div>
     
     {/* Other fields */}
     
     <Button type="submit">
       Pay {billingPeriod === "yearly" ? "$79.99" : "$7.99"}
     </Button>
   </form>
   ```
2. Payment submission and processing:
   ```javascript
   const handlePayment = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsProcessing(true);
     
     try {
       // In a real implementation, you would use Airwallex JS SDK to tokenize the card
       // and complete the payment with the client secret
       
       // After successful payment, update subscription on the backend
       const response = await fetch("/api/subscriptions", {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           paymentIntentId: `pi_${Date.now()}`,
           planId: billingPeriod,
         }),
       });
       
       // Update local user profile state
       setUserProfile({
         ...userProfile,
         plan: "premium",
       });
       
       // Show success state
       setStep("success");
     } catch (error) {
       toast.error("Payment failed. Please try again.");
     } finally {
       setIsProcessing(false);
     }
   };
   ```
3. Server-side subscription confirmation:
   ```javascript
   // app/api/subscriptions/route.ts PUT handler
   export async function PUT(req: NextRequest) {
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
   }
   ```

### 6.4. Subscription Success

1. Success view is displayed:
   ```javascript
   const renderSuccessView = () => (
     <>
       <DialogHeader>
         <DialogTitle>Subscription Confirmed!</DialogTitle>
       </DialogHeader>
       
       <div className="flex flex-col items-center justify-center py-8">
         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
           <Check className="h-10 w-10 text-green-600" />
         </div>
         
         <h3>Thank you for your subscription</h3>
         <p>
           You now have full access to all premium features of Notabl AI.
         </p>
         
         <Button onClick={onClose}>
           Start using premium features
         </Button>
       </div>
     </>
   );
   ```
2. User profile is updated with premium status:
   ```javascript
   setUserProfile(prev => ({
     ...prev,
     plan: "premium",
     notesLimit: Infinity
   }));
   ```
3. UI elements are updated to reflect premium status:
   ```javascript
   {userProfile.plan === "premium" && (
     <Badge variant="outline" className="bg-purple-100 text-purple-800">
       Premium
     </Badge>
   )}
   ```

## 7. Webhook Handling for Subscription Lifecycle

### 7.1. Webhook Setup

1. Airwallex sends events to webhook endpoint:
   ```
   POST /api/webhooks/airwallex
   ```
2. Webhook signature is verified:
   ```javascript
   // app/api/webhooks/airwallex/route.ts
   export async function POST(req: NextRequest) {
     // Get the raw request body
     const rawBody = await req.text();
     const signature = req.headers.get('x-signature');
     
     // Verify webhook signature
     const isValid = airwallex.verifyWebhookSignature(rawBody, signature);
     
     if (!isValid) {
       return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
     }
     
     // Parse and process event
     const event = JSON.parse(rawBody);
     // Process event
   }
   ```

### 7.2. Subscription Event Processing

1. Different event types are handled:
   ```javascript
   switch (event.name) {
     case 'payment_intent.succeeded': {
       // Handle successful payment
       const { payment_intent_id, customer_id, metadata } = event.data;
       
       // Find the user by Airwallex customer ID
       const airwallexCustomer = await prisma.airwallexCustomer.findUnique({
         where: { customerId: customer_id }
       });
       
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
       break;
     }
     
     case 'subscription.payment_successful': {
       // Handle recurring payment success for subscription renewal
       break;
     }
     
     // Other event types...
   }
   ```
2. Subscription status changes:
   ```javascript
   // For subscription cancellation
   await prisma.user.update({
     where: { id: user.id },
     data: {
       subscriptionStatus: 'canceled'
     }
   });
   
   // For subscription expiration
   await prisma.user.update({
     where: { id: user.id },
     data: {
       plan: 'free',
       subscriptionId: null,
       subscriptionStatus: null,
       planExpiresAt: null
     }
   });
   ```

## 8. Note Management and Navigation

### 8.1. Viewing Notes

1. Note list is displayed in MainContent:
   ```javascript
   <div className="grid grid-cols-1 gap-4">
     {filteredNotes.map((note) => (
       <NoteCard
         key={note.id}
         note={note}
         onDelete={handleDeleteNote}
       />
     ))}
   </div>
   ```
2. User clicks on a note card:
   ```javascript
   <Link href={`/dashboard/notes/${note.id}`}>
     <div className="flex items-start justify-between">
       {/* Note card content */}
     </div>
   </Link>
   ```
3. User is directed to note detail page:
   ```
   /dashboard/notes/[noteId]
   ```
4. Note details are loaded:
   ```javascript
   // app/dashboard/notes/[noteId]/page.tsx
   export default function NotePage() {
     const params = useParams();
     const noteId = params?.noteId;
     const { notes } = useNoteContext();
     const note = notes.find((n) => n.id === noteId);
     
     // Render EnhancedNoteView
     return (
       <EnhancedNoteView 
         note={note} 
         onDelete={handleDeleteNote} 
         onSave={handleSaveNote}
         isEditing={isEditing}
         onToggleEdit={handleToggleEdit}
         onOpenUpgrade={onOpenUpgrade}
       />
     );
   }
   ```

### 8.2. Enhanced Note View

1. Note view displays with tabs for different content types:
   ```javascript
   <Tabs defaultValue="note" value={currentView} onValueChange={handleViewChange}>
     <TabsList>
       {CONTENT_TYPES.map(type => (
         <TabsTrigger key={type.id} value={type.id}>
           {type.icon}
           <span>{type.label}</span>
         </TabsTrigger>
       ))}
     </TabsList>
     
     <TabsContent value="note">{renderNoteContent()}</TabsContent>
     <TabsContent value="quiz">{renderGenericContent("quiz")}</TabsContent>
     <TabsContent value="recipe">{renderGenericContent("recipe")}</TabsContent>
     {/* Other content tabs */}
   </Tabs>
   ```
2. Note content is displayed based on the current tab:
   ```javascript
   const renderNoteContent = () => (
     <div className="space-y-4">
       <h1 className="text-4xl font-bold text-black">{note.title}</h1>
       <div className="prose max-w-none text-gray-600 whitespace-pre-line">
         {note.content}
       </div>
       
       <div className="border-t border-gray-200 pt-4 flex justify-between">
         {/* Note actions */}
       </div>
     </div>
   );
   ```

### 8.3. Note Editing

1. User clicks edit button:
   ```javascript
   <Button 
     variant="outline" 
     size="sm"
     onClick={onToggleEdit}
   >
     <FileEdit size={14} />
     <span>Edit</span>
   </Button>
   ```
2. Edit mode is activated:
   ```javascript
   const handleToggleEdit = () => {
     setIsEditing(!isEditing);
   };
   ```
3. Edit form is displayed:
   ```javascript
   {isEditing ? (
     <>
       <Input
         type="text"
         value={editedTitle}
         onChange={(e) => setEditedTitle(e.target.value)}
         className="text-4xl font-bold px-3 py-2 h-auto"
       />
       <textarea
         value={editedContent}
         onChange={(e) => setEditedContent(e.target.value)}
         className="w-full min-h-[200px] border rounded-md p-3 resize-y"
       />
     </>
   ) : (
     <>
       <h1 className="text-4xl font-bold">{note.title}</h1>
       <div className="prose max-w-none">
         {note.content}
       </div>
     </>
   )}
   ```
4. User saves the edited note:
   ```javascript
   const handleSaveNote = () => {
     if (onSave) {
       const updatedNote = {
         ...note,
         title: editedTitle,
         content: editedContent,
         updatedAt: new Date()
       };
       onSave(updatedNote);
     }
   };
   ```
5. Note context is updated:
   ```javascript
   const updateNote = (updatedNote: Note) => {
     setNotes(
       notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
     );
   };
   ```

### 8.4. Note Deletion

1. User clicks delete button:
   ```javascript
   <Button 
     variant="outline" 
     size="sm"
     className="text-red-600 border-red-200"
     onClick={() => onDelete(note.id)}
   >
     <Trash size={14} />
     <span>Delete</span>
   </Button>
   ```
2. Note is deleted from context:
   ```javascript
   const deleteNote = (noteId: string) => {
     setNotes(notes.filter((note) => note.id !== noteId));
   };
   ```
3. User is redirected to dashboard:
   ```javascript
   const handleDeleteNote = (id: string) => {
     deleteNote(id);
     toast.success("Note deleted successfully");
     router.push("/dashboard");
   };
   ```

## 9. Folder Management

### 9.1. Folder Navigation

1. Folders are displayed in sidebar:
   ```javascript
   <nav className="space-y-1">
     {folders.map((folder) => {
       const isActive = pathname === `/dashboard/folder/${folder.id}`;
       return (
         <Link
           key={folder.id}
           href={`/dashboard/folder/${folder.id}`}
           className={isActive ? "active" : ""}
         >
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <FolderIcon size={18} />
               <span>{folder.name}</span>
             </div>
             {noteCounts[folder.id] > 0 && (
               <span className="count">
                 ({noteCounts[folder.id]})
               </span>
             )}
           </div>
         </Link>
       );
     })}
   </nav>
   ```
2. User clicks on a folder:
   ```
   GET /dashboard/folder/[folderId]
   ```
3. Folder page loads with filtered notes:
   ```javascript
   // app/dashboard/folder/[folderId]/page.tsx
   const { folderId } = useParams();
   const { folders, getNotesByFolder } = useNoteContext();
   
   const currentFolder = folders.find((folder) => folder.id === folderId);
   const notesInFolder = getNotesByFolder(folderId || "folder-1");
   ```

### 9.2. Creating Folders

1. User clicks "Create new folder" button:
   ```javascript
   <button
     onClick={() => setIsCreatingFolder(true)}
     className="flex items-center w-full mt-2"
   >
     <div className="flex items-center gap-2 w-full px-3 py-2">
       <Plus size={16} />
       <span>Create new folder</span>
     </div>
   </button>
   ```
2. Folder creation form is displayed:
   ```javascript
   {isCreatingFolder ? (
     <form onSubmit={handleCreateFolder} className="mt-2">
       <input
         type="text"
         value={newFolderName}
         onChange={(e) => setNewFolderName(e.target.value)}
         placeholder="Folder name"
         className="w-full"
         autoFocus
       />
       <div className="flex justify-end mt-2">
         <button type="button" onClick={() => setIsCreatingFolder(false)}>
           Cancel
         </button>
         <button type="submit">
           Save
         </button>
       </div>
     </form>
   ) : (
     // Create folder button
   )}
   ```
3. Folder is created:
   ```javascript
   const handleCreateFolder = (e: React.FormEvent) => {
     e.preventDefault();
     if (newFolderName.trim()) {
       const newFolder = {
         id: `folder-${Date.now()}`,
         name: newFolderName.trim(),
         parentId: null,
       };
       addFolder(newFolder);
       setNewFolderName("");
       setIsCreatingFolder(false);
     }
   };
   ```
4. Folder context is updated:
   ```javascript
   const addFolder = (folder: Folder) => {
     setFolders([...folders, folder]);
   };
   ```

### 9.3. Deleting Folders

1. User clicks delete folder button:
   ```javascript
   <Button
     variant="ghost"
     size="icon"
     className="text-gray-400 hover:text-red-500"
     onClick={(e) => {
       e.preventDefault();
       e.stopPropagation();
       if (confirm("Are you sure you want to delete this folder?")) {
         deleteFolder(folder.id);
       }
     }}
   >
     <Trash className="h-4 w-4" />
   </Button>
   ```
2. Folder is deleted from context:
   ```javascript
   const deleteFolder = (folderId: string) => {
     // Don't allow deleting the "All notes" folder
     if (folderId === "folder-1") return;
     
     setFolders(folders.filter((folder) => folder.id !== folderId));
     
     // Move notes from deleted folder to "All notes"
     setNotes(
       notes.map((note) =>
         note.folderId === folderId ? { ...note, folderId: "folder-1" } : note
       )
     );
   };
   ```
3. Success notification is shown:
   ```javascript
   toast.success("Folder deleted successfully");
   ```

## 10. Error Handling

### 10.1. API Error Handling

1. Try-catch blocks in API routes:
   ```javascript
   try {
     // API logic
   } catch (error) {
     console.error("Error:", error);
     return NextResponse.json(
       { error: "Error message" },
       { status: 500 }
     );
   }
   ```
2. Client-side error handling:
   ```javascript
   try {
     const response = await fetch("/api/endpoint");
     
     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.error || "An error occurred");
     }
     
     const data = await response.json();
     // Process data
   } catch (error) {
     console.error("Error:", error);
     toast.error(error.message || "Something went wrong");
     // Handle error state
   }
   ```

### 10.2. User Feedback for Errors

1. Toast notifications for errors:
   ```javascript
   toast.error("Failed to process YouTube video");
   ```
2. Error states in UI:
   ```javascript
   {processingStatus === "error" && (
     <div className="flex items-center text-red-600">
       <AlertCircle className="mr-2 h-4 w-4" />
       <span>Error processing video. Please try again.</span>
     </div>
   )}
   ```
3. Retry mechanisms:
   ```javascript
   <Button onClick={() => handleProcessYouTube()}>
     Try Again
   </Button>
   ```

### 10.3. Loading States

1. Loading indicators for processing:
   ```javascript
   {isGenerating && (
     <div className="flex flex-col items-center justify-center py-12">
       <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
       <p className="text-gray-600">Generating {type}...</p>
     </div>
   )}
   ```
2. Button loading states:
   ```javascript
   <Button disabled={isProcessing}>
     {isProcessing ? (
       <>
         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
         Processing...
       </>
     ) : (
       "Process Video"
     )}
   </Button>
   ```
3. Sequential loading states for multi-step processes:
   ```javascript
   {processingStatus === "uploading" && (
     <div className="flex items-center text-blue-600 animate-pulse">
       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
       <span>Fetching video data...</span>
     </div>
   )}
   
   {processingStatus === "transcribing" && (
     <div className="flex items-center text-blue-600 animate-pulse">
       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
       <span>Generating transcript...</span>
     </div>
   )}
   ```

## 11. Responsive Design Handling

### 11.1. Mobile Detection

1. Custom hook for mobile detection:
   ```javascript
   // hooks/use-mobile.ts
   export function useIsMobile() {
     const [isMobile, setIsMobile] = useState(false);
     
     useEffect(() => {
       const checkIfMobile = () => {
         setIsMobile(window.innerWidth < 768);
       };
       
       checkIfMobile();
       window.addEventListener('resize', checkIfMobile);
       
       return () => window.removeEventListener('resize', checkIfMobile);
     }, []);
     
     return isMobile;
   }
   ```
2. Usage in components:
   ```javascript
   const isMobile = useIsMobile();
   ```

### 11.2. Mobile Navigation

1. Different sidebar behavior for mobile:
   ```javascript
   {/* Desktop sidebar */}
   {!isMobile && (
     <Sidebar 
       onOpenSettings={() => setSettingsOpen(true)}
       onOpenUpgrade={() => setUpgradeOpen(true)}
     />
   )}
   
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
2. Adaptive layout with Tailwind classes:
   ```javascript
   <div className="flex flex-col md:flex-row items-center justify-between">
     <div className="w-full md:w-1/2">
       {/* Content */}
     </div>
   </div>
   ```

### 11.3. Responsive UI Components

1. Different tab displays for mobile:
   ```javascript
   <TabsTrigger value="note">
     <Book className="h-4 w-4 mr-2" />
     <span className="hidden sm:inline">Note</span>
   </TabsTrigger>
   ```
2. Condensed UI for small screens:
   ```javascript
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
     {/* Grid items */}
   </div>
   ```
3. Stack elements vertically on mobile:
   ```javascript
   <div className="flex flex-col sm:flex-row items-center gap-4">
     {/* Stacked/row items */}
   </div>
   ```

## 12. Data Persistence

### 12.1. Client-Side Storage

1. LocalStorage for notes and folders:
   ```javascript
   useEffect(() => {
     if (typeof window !== "undefined") {
       localStorage.setItem("notes", JSON.stringify(notes));
       localStorage.setItem("folders", JSON.stringify(folders));
     }
   }, [notes, folders]);
   ```
2. Initial loading from localStorage:
   ```javascript
   const [notes, setNotes] = useState<Note[]>(() => {
     if (typeof window !== "undefined") {
       const savedNotes = localStorage.getItem("notes");
       return savedNotes ? JSON.parse(savedNotes) : [];
     }
     return [];
   });
   ```

### 12.2. Database Storage

1. Database operations in API routes:
   ```javascript
   // Create note in database
   await prisma.note.create({
     data: {
       title: videoDetails.title,
       content: formattedTranscript,
       sourceType: "youtube",
       sourceUrl: url,
       userId: session.user.id,
       folderId: "folder-1",
     }
   });
   ```
2. User subscription updates:
   ```javascript
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
   ```

### 12.3. Session Management

1. NextAuth session handling:
   ```javascript
   const { data: session, status } = useSession();
   ```
2. Session-based authenticated API calls:
   ```javascript
   export async function POST(req: NextRequest) {
     const session = await getServerAuthSession();
     
     if (!session?.user) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
     
     // Proceed with authenticated API logic
   }
   ```

## 13. Performance Optimization

### 13.1. Content Lazy Loading

1. Tabs only load content when selected:
   ```javascript
   const handleTabChange = async (type: string) => {
     setSelectedContentType(type);
     
     // Only generate content when tab is selected and content doesn't exist
     if (videoDetails && transcript && !generatedContent[type]) {
       await generateContent(type, transcript, videoDetails);
     }
   };
   ```
2. Memoized components:
   ```javascript
   const MemoizedNoteCard = React.memo(NoteCard);
   
   // Usage
   {filteredNotes.map((note) => (
     <MemoizedNoteCard
       key={note.id}
       note={note}
       onDelete={handleDeleteNote}
     />
   ))}
   ```

### 13.2. API Optimization

1. Transcript length management:
   ```javascript
   // Truncate transcript to fit within token limits
   function truncateTranscript(transcript: string, maxTokens: number): string {
     const tokens = encode(transcript);
     
     if (tokens.length <= maxTokens) {
       return transcript;
     }
     
     // Truncate to max tokens
     const truncatedTokens = tokens.slice(0, maxTokens);
     const truncatedText = decode(truncatedTokens);
     
     return truncatedText + "\n\n[Transcript truncated due to length...]";
   }
   ```
2. Efficient database queries:
   ```javascript
   const user = await prisma.user.findUnique({
     where: { id: userId },
     select: { 
       plan: true,
       _count: { select: { notes: true } }
     }
   });
   ```

---

This flow document provides a comprehensive overview of the Notabl.ai application's functionality, focusing on the YouTube content platform features. It details the step-by-step processes from user authentication to content generation, subscription management, and error handling.