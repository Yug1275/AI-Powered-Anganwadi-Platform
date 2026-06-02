Anganwadi Saathi — Full App Prototype Spec (Figma AI Prompt)

Global Design System
App Name: Anganwadi Saathi
Primary Color: Deep Purple (#5C35C0)
Secondary Color: Teal Green (#1A9E6E)
Accent: Warm Amber (#E8A020)
Background: Off-white (#F7F5F0)
Card Background: White (#FFFFFF)
Text Primary: #1C1C1C
Text Secondary: #6B6B6B
Font: Noto Sans (supports Hindi/Gujarati/Tamil/Telugu/Marathi/English)
Border Radius: 12px (cards), 8px (buttons), 24px (FAB)
Spacing Unit: 8px
Bottom Nav Height: 64px
Status Bar: Light content on dark bg

Screen 1 — Splash Screen
Layout: Full screen, centered, vertical stack
Background: Deep purple gradient (#5C35C0 → #3A1E8A)

Elements (top to bottom):
- App icon: White lotus + child silhouette, 80x80px
- App name: "Anganwadi Saathi" (white, 28px bold)
- Tagline: "हर बच्चे का साथी" / "Every Child's Companion" (white, 14px)
- Loading indicator: Thin white progress bar at bottom
- Version text: "v1.0" (bottom, white, 11px)

Transition: Auto-advance to Language Selection after 2.5s

Screen 2 — Language Selection
Layout: Full screen, white background, centered content

Header:
- Back arrow (top left)
- Title: "Choose Your Language / भाषा चुनें" (18px, bold, centered)
- Subtitle: "You can change this later in settings" (12px, gray)

Language Grid: 2x3 grid of cards
Each card (160x72px, rounded 12px, border 1px #E0E0E0):
- Language name in that language (18px bold, primary color)
- Language name in English below (12px gray)

Cards:
1. हिंदी / Hindi
2. ગુજરાતી / Gujarati
3. मराठी / Marathi
4. தமிழ் / Tamil
5. తెలుగు / Telugu
6. English / English

Selected state: Purple border (2px), light purple fill (#F0ECFF)

CTA: "Continue" button (full width, purple, 52px height) — disabled until selection made

Screen 3 — Login
Layout: White background, top illustration area + form below

Top section (40% height):
- Illustrated banner: Anganwadi worker with children (flat illustration style, warm colors)
- Overlay text: "Welcome back" (white, 20px bold)

Form section:
- Title: "Login to continue" (18px bold)

Tab switcher: "Mobile OTP" | "Worker ID"

Tab 1 — Mobile OTP:
  - Label: "Mobile Number"
  - Input field: +91 prefix, 10-digit number, numeric keyboard
  - Button: "Send OTP" (purple, full width)
  - OTP fields: 4 boxes side by side (after OTP sent)
  - Resend timer: "Resend in 30s" (gray, small)

Tab 2 — Worker ID:
  - Input: "Worker ID" (e.g. GJ-2024-1847)
  - Input: "Password" (with show/hide toggle)
  - "Forgot Password?" link (right aligned, purple)

Below form:
  - Primary CTA: "Login" (purple, full width, 52px)
  - Support text: "Need help? Call 1800-XXX-XXXX" (gray, 12px, centered)

Screen 4 — Unified Smart Dashboard (MAIN SCREEN)
Layout: Scrollable, sticky top bar + floating FAB

Status Bar: Purple background

Top Bar (sticky, 56px, purple bg):
  Left: Hamburger menu icon
  Center: "Saathi" wordmark (white)
  Right: Notification bell (white, badge count) + Profile avatar (circle, 32px)

--- SECTION 1: AI Morning Briefing Card ---
Card (full width, mx-16px, rounded 16px, purple gradient bg):
  - Greeting: "Good morning, Sunita Ji 🌅" (white, 18px bold)
  - Date: "Tuesday, 3 June 2025" (white, 12px, 70% opacity)
  Divider
  Stats row (4 chips, horizontal scroll):
    Chip 1: "32 children" — blue bg
    Chip 2: "5 home visits due" — amber bg
    Chip 3: "2 reports pending" — red bg
    Chip 4: "Nutrition day" — green bg
  
  Bottom of card:
    "AI tip: Start with nutrition distribution before 10am — 8 children haven't received this month's ration." (white, 12px, italic)

--- SECTION 2: Quick Action Grid ---
Section header: "Quick Actions" (16px bold, left aligned, mt-24px)
Grid: 2 columns, auto rows, gap 12px, mx-16px

Card layout each (rounded 12px, white bg, shadow-sm, padding 16px):
  - Emoji icon (28px) OR colored icon circle (40x40px)
  - Title (14px bold, dark)
  - Subtitle (12px gray, 1 line)

Grid cards (8 total, 4 rows of 2):

Row 1:
  [Smart Attendance]        [Child Profiles]
  📍 Mark attendance         👶 Children
  Voice · group · manual     Progress · growth · vaccine

Row 2:
  [AI Activity Planner]     [Activity Walkthrough]
  🎨 Today's activity        ▶ Step-by-step guide
  AI generated for today     Audio · video · print

Row 3:
  [Home Visit Assistant]    [Parent Connect]
  🏠 Visit schedule          👨‍👩‍👧 Parent reminders
  Priority visits today      Send alerts & meetings

Row 4:
  [AI Report Generator]     [Worker Wellness]
  📄 Generate report         🧠 Workload status
  One-tap daily report       AI prioritization

--- SECTION 3: Offline Sync Status Banner ---
Banner (full width, mx-16px, rounded 8px, height 44px):
  Left icon: 🟢 (green dot)
  Text: "All data synced · Last sync 2 mins ago"
  Right: "Sync now" text button (purple, 12px)

  States:
    Synced: green dot, light green bg (#F0FFF4)
    Waiting: amber dot, light amber bg (#FFFBEB)
    Failed: red dot, light red bg (#FFF5F5), "Retry" button shown

--- FLOATING ACTION BUTTON ---
Position: Fixed bottom right (24px from edge, 80px from bottom)
Size: 56x56px circle, deep purple
Icon: Microphone (white, 24px)
Label badge: "AI" (white, 9px, small pill above icon)
On press: Expands to full-screen voice assistant overlay

Screen 5 — Smart Attendance
Layout: Scrollable, white bg

App Bar: Back arrow + "Mark Attendance" title + date chip

--- Method Selector ---
3 tabs (segmented control, full width):
  [📍 Location]  [📸 Group Photo]  [✏️ Manual]

--- LOCATION TAB (default) ---
Map preview (full width, 200px height, rounded 12px):
  Shows current location pin
  "Within centre radius ✓" badge (green, bottom left of map)

Status card:
  "Ready to mark" / "Outside centre range" 
  Distance shown: "12m from ICDS Centre 04"

Children list (scrollable):
  Section header: "32 Children · 0 marked"
  
  Each row (72px height, border bottom):
    Left: Child avatar (circle, 40px, colored initials)
    Middle: Name (14px bold) + Age (12px gray)
    Right: Toggle switch (off by default)
  
  "Mark All Present" button (outlined, purple, full width, mt-16px)

Bottom sticky:
  "Submit Attendance" button (purple, full width, 52px)
  "0 / 32 marked" counter above button

--- PHOTO TAB ---
Camera viewfinder (300px height, rounded 12px, centered)
Instruction: "Take a group photo — AI will auto-detect faces"
"Open Camera" button (purple)
After photo: Detected count shown, confirm or retake option

--- MANUAL TAB ---
Searchable list of all children with individual toggles
Search bar at top: "Search child name..."

Screen 6 — Child Profile Details
Layout: Scroll, white bg

App Bar: Back + child name + "Edit" icon (top right)

--- Profile Header Card ---
Card (full width, teal gradient bg, rounded 16px, padding 20px):
  Row: Circle photo placeholder (64px) + Name (20px bold, white) + Age (14px, white)
  Row: "Centre: ICDS 04  ·  ID: CH-2847" (12px, white 70%)
  
  Stats row (3 columns, white cards inside):
    Weight: "12.4 kg" / Normal
    Height: "89 cm" / Normal
    Age: "2yr 4mo"

--- Tabs ---
4 tabs: Growth | Nutrition | Vaccination | Notes

GROWTH TAB:
  Growth chart (line chart, 200px height):
    X-axis: months, Y-axis: weight
    Line: child's data in purple
    Reference lines: WHO standard (green = healthy zone)
  
  Latest measurements card:
    Date · Weight · Height · MUAC (mid-upper arm circumference)
    Status badge: "Healthy" (green) / "Moderate Malnutrition" (amber) / "Severe" (red)
  
  "Add New Measurement" button (outlined, purple)

NUTRITION TAB:
  Monthly meal distribution tracker (calendar grid view)
  Color codes: Green = received, Red = missed, Gray = holiday
  Summary: "Received 18/22 days this month"
  Special nutrition schemes: THR, Iron tablets, Vitamin A — checkboxes

VACCINATION TAB:
  Timeline list of vaccines:
    Each item: Vaccine name · Due date · Status (Done/Pending/Overdue)
    Status badge colors: Green/Gray/Red
  "Send reminder to parent" button per overdue item

NOTES TAB:
  Timeline of worker notes (most recent first):
    Each: Date + worker name + note text
  "Add Note" FAB (bottom right)

Screen 7 — AI Activity Planner
Layout: Scroll, white bg

App Bar: Back + "Activity Planner" + calendar icon

--- Today's Activity Card ---
Large card (full width, warm amber gradient, rounded 16px, padding 20px):
  Tag: "AI Recommended · Age 2-3 years"
  Activity name: "Colour Sorting Game" (22px bold, white)
  Duration: "20 minutes" (chip, white border)
  Materials: "Red/blue/yellow blocks · 3 bowls" (12px white)
  
  "Start Activity" button (white bg, amber text, rounded 8px, full width)

--- Weekly Planner ---
Section header: "This Week"
Horizontal scroll cards (7 day cards, each ~110px wide):
  Day name · Activity name (truncated) · Duration
  Today's card: highlighted (purple border)

--- Activity Library ---
Section header: "Browse Activities"
Filter chips (horizontal scroll): All · Language · Math · Motor Skills · Stories · Songs

Activity list (each row 80px):
  Left: Color-coded category icon circle (40px)
  Middle: Activity name (14px bold) + Category + Duration (12px gray)
  Right: Chevron arrow

"Generate Custom Activity" card (dashed border, centered):
  AI sparkle icon + "Generate for your children's age group" (purple text)

Screen 8 — Activity Walkthrough
Layout: Full screen step-by-step, white bg

App Bar: "X" close + activity name + progress indicator ("Step 2 of 5")

--- Progress bar ---
Thin linear progress (purple fill, 4px height, full width below app bar)

--- Step card (takes 60% of screen height) ---
Card (white, rounded 16px, mx-16px, shadow-md, padding 24px):
  Step number: "Step 2" (purple chip, top left)
  Instruction text: Large, readable (18px, line-height 1.6)
    "Ask children to sort the red blocks into the red bowl. Say: 'Lal rangke pathar idhar rakhein!'"
  
  Illustration area (140px height, rounded 12px, light gray bg):
    Simple flat illustration of the step

--- Audio/Video controls ---
Row (below card):
  [▶ Play Audio]  [📷 Show Video]  (both outlined buttons)
  Language selector: Hindi | Gujarati (pill toggle)

--- Navigation ---
Bottom fixed row:
  "← Previous" (outlined, left) + "Next Step →" (purple, right)
  On last step: "Complete Activity ✓" (green, full width)

--- Notes input (collapsed by default) ---
"Add note about this session" — expands inline text field

Screen 9 — Home Visit Assistant
Layout: Scroll, white bg

App Bar: Back + "Home Visits" + filter icon

--- Summary Strip ---
3 stat chips (horizontal, purple bg):
  "5 Due Today" · "3 Overdue" · "12 This Month"

--- Priority Queue ---
Section header: "Priority Visits Today" (AI badge alongside)

Each visit card (white, rounded 12px, border left 4px color-coded):
  Left border colors: Red = overdue, Amber = due today, Green = scheduled

  Card content:
    Row 1: Child name (14px bold) + Age + Risk badge
    Row 2: Address (12px gray) + "2.3 km away"
    Row 3: Last visit date + Reason for visit
    Action row: [Call Parent 📞] [Mark Visited ✓] [Navigate 🗺️]

--- AI Recommendation Banner ---
Card (amber bg, rounded 12px):
  AI icon + "Visit Priya Patel first — missed 2 consecutive months, weight concern flagged"

--- Completed Visits ---
Section header: "Completed This Month" (collapsible)
Compact list (name + date + tick icon)

Screen 10 — Parent Reminder System
Layout: Scroll, white bg

App Bar: Back + "Parent Connect"

--- Tabs ---
3 tabs: Send Reminder | Message History | Events

SEND REMINDER TAB:
  --- Recipient Selector ---
  Toggle: "All Parents" / "Select Children"
  If select: Checklist of children (search + multi-select)

  --- Reminder Type ---
  Section: "Reminder Type"
  Grid of type cards (2 col):
    💉 Vaccination due
    🍽️ Nutrition distribution
    📅 Parent meeting
    ⚠️ Health alert
    🎉 Event / celebration
    ✏️ Custom message

  --- Message Preview ---
  Auto-generated message shown in card:
    "Dear parent, Vaccination (Measles) for [Child Name] is due on [Date]. Please visit ICDS Centre 04 between 9am-12pm."
  Language toggle: Hindi | Gujarati | English
  Edit option: "Edit message" link

  --- Send Options ---
  "Send via WhatsApp" button (green, WhatsApp icon)
  "Send via SMS" button (outlined)
  "Schedule for later" link (gray, small)

Screen 11 — AI Report Generator
Layout: Scroll, white bg

App Bar: Back + "Report Generator"

--- Report Type Selector ---
3 large cards (vertical stack, each 80px):
  Each card: Icon + Report type title + Description + "Generate" arrow
  
  [📅 Daily Report] — "Attendance, nutrition, activities for today"
  [📊 Weekly Report] — "Summary for Mon–Sun with trends"
  [🗓️ Monthly Report] — "Full month data with charts — MIS format"

--- Generated Report Preview ---
(Appears after type selection)
Card (white, rounded 16px, border):
  Report header: Centre name · Date range · Worker name
  
  Section previews (collapsed):
  ▼ Attendance Summary
  ▼ Nutrition Distribution
  ▼ Home Visits Completed
  ▼ Vaccination Updates
  ▼ Remarks

  Status: "AI auto-filled · Review before submitting"

--- Action Row ---
[👁 Preview Full Report]  [📤 Share]  [📥 Download PDF]

Supervisor submit button:
  "Submit to Supervisor" (green, full width, 52px)
  "Submitted ✓" state (disabled, grayed, checkmark)

Screen 12 — Worker Wellness / Seasonal AI Engine
Layout: Scroll, white bg

App Bar: Back + "My Wellness"

--- Workload Gauge ---
Circular gauge chart (200px, centered):
  Colored arc: Green (low) → Amber (medium) → Red (high)
  Center text: "Moderate" (16px bold) + "Workload" (12px gray)
  
  Status chip below: "🟡 7 pending tasks"

--- AI Priority Suggestions ---
Card (purple-tinted bg, rounded 16px):
  Header: "AI Prioritization for Today" (14px bold, purple)
  
  Ordered list (numbered, 1–4):
  1. ✅ Complete nutrition distribution (9:00 – 10:30am)
  2. 📍 Mark attendance (10:30am)
  3. 🏠 2 priority home visits (2:00 – 4:00pm)
  4. 📄 Submit daily report (5:00pm)
  
  "Rearrange" button (outlined, small, right)

--- Stress Indicators ---
Section: "How are you feeling today?"
Emoji row (5 options): 😫 😟 😐 🙂 😊
Selection highlights chosen emoji with purple ring

--- Self-care Tip ---
Card (green tint, rounded 12px):
  "Tip: You've had 6 consecutive working days. Remember to take breaks between home visits."

--- Monthly Workload Trend ---
Bar chart (weekly bars, 5 weeks, colored by load level):
  Below: "Your busiest day: Wednesday · Lightest: Saturday"

Screen 13 — Supervisor Dashboard
Layout: Scroll, white bg, separate login entry

App Bar: Back + "Supervisor View" + logout icon

--- Centre Selector ---
Dropdown (full width): "ICDS Block 4 — Gandhinagar" ▼

--- Key Metrics Strip ---
4 stat cards (2x2 grid, each with icon + number + label):
  Total children: 156
  Attendance today: 78%
  Pending reports: 3
  High-risk children: 7 (red badge)

--- Charts Section ---
Attendance trend: Line chart (last 30 days, purple line)
Nutrition coverage: Horizontal bar chart (by scheme)

--- High-Risk Children List ---
Section header: "Children Needing Intervention" (red badge with count)
Each row: Child name · Centre · Risk reason · Last visit date · "Assign visit" button

--- Worker Performance ---
Section header: "Worker Activity This Week"
Table rows (worker name · attendance marked · reports submitted · visits done):
  Status icons: ✅ ⚠️ ❌

--- AI Insights Banner ---
Card (amber gradient, rounded 12px):
  "Centre A has below-average attendance for 3 weeks. 5 children show growth faltering. Recommend targeted home visits."
  "View Details →" link (white, small)

Bottom Navigation Bar (Global — Worker App)
5 tabs, fixed bottom, white bg, 64px height, shadow above

Tab 1: Home (house icon) — "Dashboard"
Tab 2: Children (person icon) — "Children"
Tab 3: Activities (star icon) — "Activities"
Tab 4: Reports (document icon) — "Reports"
Tab 5: Assistant (mic icon) — "AI Help"

Active tab: Purple icon + purple label + purple dot indicator above icon
Inactive: Gray icon + gray label

Voice Assistant Overlay (Global — floats over all screens)
Triggered by: FAB mic button on Dashboard (visible on all screens)

Layout: Full screen modal, dark overlay (70% black)

Center card (white, rounded 24px, padding 28px, 90% width):
  Top: Animated waveform (purple, pulsing while listening)
  Status text: "Listening..." / "Processing..." / "Done ✓"
  
  Recognized text box: Shows what was heard in real-time (14px, gray border, rounded)
  
  Example commands shown below (3 chips):
    "Mark attendance"  "Show pending tasks"  "Generate report"
  
  AI response area: Card (light purple bg, rounded 12px) — appears after command
    Shows action taken or result text
  
  Bottom: "Cancel" button (gray, full width)