Design a complete mobile app prototype called "Anganwadi Saathi" with 13 screens. This is a government health worker app for India. Use the following design system throughout:

DESIGN SYSTEM:
- Primary: #5C35C0 (deep purple)
- Secondary: #1A9E6E (teal green)
- Accent: #E8A020 (warm amber)
- Background: #F7F5F0 (off-white)
- Card bg: #FFFFFF
- Text primary: #1C1C1C
- Text secondary: #6B6B6B
- Font: Noto Sans (multilingual)
- Border radius: 12px cards, 8px buttons, 56px FAB
- All screens: 390x844px (iPhone 14 size)
- Bottom navigation: 64px fixed, white, shadow above
- Status bar: white icons on purple bg

---

SCREEN 1 — SPLASH SCREEN
Full screen purple gradient background (#5C35C0 to #3A1E8A). Centered vertically. White lotus + child silhouette icon (80x80px) at center. Below icon: "Anganwadi Saathi" in white bold 28px. Below that: "हर बच्चे का साथी · Every Child's Companion" in white 14px. Thin white horizontal progress bar at very bottom of screen. "v1.0" in white 11px above the progress bar.

---

SCREEN 2 — LANGUAGE SELECTION
White background. Top: back arrow left, centered title "Choose Your Language / भाषा चुनें" bold 18px, subtitle "You can change this later in settings" gray 12px. Below: 2-column grid of 6 language cards (each 160x72px, rounded 12px, 1px #E0E0E0 border). Cards: (1) हिंदी / Hindi, (2) ગુજરાતી / Gujarati, (3) मराठी / Marathi, (4) தமிழ் / Tamil, (5) తెలుగు / Telugu, (6) English. Each card: language name in that script (18px bold purple) + English name below (12px gray). Selected state: 2px purple border + #F0ECFF fill. Bottom: full-width "Continue" purple button 52px height, disabled until selection.

---

SCREEN 3 — LOGIN
White background. Top 40% height: warm illustrated banner (flat style, anganwadi worker with children, warm colors) with "Welcome back" in white bold 20px overlaid. Below: "Login to continue" 18px bold. Tab switcher: "Mobile OTP" | "Worker ID". Mobile OTP tab (default): label "Mobile Number", input field with +91 prefix, "Send OTP" full-width purple button 52px. After OTP: 4 OTP input boxes side by side, "Resend in 30s" gray small text below. Worker ID tab: "Worker ID" input, "Password" input with show/hide eye icon, "Forgot Password?" right-aligned purple link. Bottom: "Login" full-width purple button 52px. Below button: "Need help? Call 1800-XXX-XXXX" centered gray 12px.

---

SCREEN 4 — UNIFIED SMART DASHBOARD (main hub screen)
Purple status bar. Sticky top bar 56px purple: hamburger icon left, "Saathi" white wordmark center, notification bell + profile avatar (32px circle) right.

Scrollable content below:

SECTION A — AI Morning Briefing Card (16px horizontal margin, purple gradient card, rounded 16px, padding 20px): "Good morning, Sunita Ji 🌅" white bold 18px. Date "Tuesday, 3 June 2025" white 12px 70% opacity. Horizontal scrolling stat chips row: "32 children" blue chip, "5 home visits due" amber chip, "2 reports pending" red chip, "Nutrition day" green chip. Bottom of card: italic white 12px text "AI tip: Start with nutrition distribution before 10am."

SECTION B — Quick Action Grid header "Quick Actions" 16px bold left. 2-column grid with 16px margins and 12px gap, 8 white rounded-12px shadow cards:
Row 1: [📍 Smart Attendance — "Voice · group · manual"] [👶 Child Profiles — "Progress · growth · vaccine"]
Row 2: [🎨 Activity Planner — "AI generated for today"] [▶ Activity Walkthrough — "Audio · video · print"]
Row 3: [🏠 Home Visits — "Priority visits today"] [👨‍👩‍👧 Parent Connect — "Send alerts & meetings"]
Row 4: [📄 AI Reports — "One-tap daily report"] [🧠 Worker Wellness — "AI prioritization"]
Each card: colored emoji icon 28px top-left, title 14px bold below, subtitle 12px gray.

SECTION C — Offline Sync Banner (16px margins, 44px height, rounded 8px, light green bg): green dot left, "All data synced · Last sync 2 mins ago" 13px, "Sync now" purple text right.

FLOATING ACTION BUTTON: 56x56px circle, deep purple, bottom-right 24px from edge 88px from bottom, white microphone icon 24px, small white "AI" pill badge above it.

BOTTOM NAVIGATION BAR: 5 tabs — Home (house, active purple), Children (person), Activities (star), Reports (document), AI Help (mic). Active: purple icon + purple label + purple dot above. Inactive: gray.

---

SCREEN 5 — SMART ATTENDANCE
Purple status bar. App bar: back arrow, "Mark Attendance" bold center, today's date chip right. 3-tab segmented control full-width: [📍 Location] [📸 Group Photo] [✏️ Manual]. 

Location tab (default): Map preview 200px height rounded 12px (gray placeholder with location pin), "Within centre radius ✓" green badge bottom-left of map. Status card below: "Ready to mark · 12m from ICDS Centre 04". Section header "32 Children · 0 marked". Scrollable child list rows (72px each, border-bottom): colored initial circle avatar 40px left, child name 14px bold + age 12px gray center, toggle switch right (off by default). "Mark All Present" outlined purple button full-width. Sticky bottom: "0 / 32 marked" counter above "Submit Attendance" purple full-width 52px button.

---

SCREEN 6 — CHILD PROFILE DETAILS
App bar: back arrow, child name bold center, "Edit" icon right. 

Header card (full-width, teal gradient, rounded 16px, padding 20px): circle photo 64px + "Ananya Patel" white 20px bold + "2 yr 4 mo" white 14px. Below: "Centre: ICDS 04  ·  ID: CH-2847" white 12px 70%. 3 inner white stat cards in a row: Weight "12.4 kg Normal", Height "89 cm Normal", Age "2yr 4mo".

4 tabs: Growth | Nutrition | Vaccination | Notes.

Growth tab (default): Line chart 200px height (child weight line in purple, WHO reference green zone). Latest measurement card: Date · Weight · Height · MUAC with "Healthy" green status badge. "Add New Measurement" outlined purple button.

Nutrition tab: Calendar grid of this month (green=received, red=missed, gray=holiday). "Received 18/22 days" summary. Checkboxes for THR, Iron tablets, Vitamin A.

Vaccination tab: Vertical timeline list (vaccine name + due date + status badge: green Done / gray Pending / red Overdue). "Send reminder to parent" button on overdue items.

Notes tab: Reverse-chronological note cards (date + worker name + note text). "Add Note" FAB bottom-right.

---

SCREEN 7 — AI ACTIVITY PLANNER
App bar: back, "Activity Planner" bold, calendar icon right.

Today's Activity hero card (full-width, warm amber gradient, rounded 16px, padding 20px): "AI Recommended · Age 2-3 years" small white tag. "Colour Sorting Game" white bold 22px. "20 minutes" white outlined chip. "Materials: Red/blue/yellow blocks · 3 bowls" white 12px. "Start Activity" white-bg amber-text button full-width below.

Weekly planner section header "This Week". Horizontal scroll 7 day cards (110px wide each): day name + activity name truncated + duration. Today highlighted with purple border.

Activity Library section header "Browse Activities". Filter chips horizontal scroll: All · Language · Math · Motor Skills · Stories · Songs. Vertical list of activity rows (80px each): color-coded category circle icon 40px left, activity name 14px bold + category + duration 12px gray center, chevron right. Dashed-border "Generate Custom Activity" card at bottom: AI sparkle icon + "Generate for your children's age group" purple text.

---

SCREEN 8 — ACTIVITY WALKTHROUGH
Full-screen step layout. App bar: X close left, activity name center, "Step 2 of 5" chip right. Thin purple progress bar full-width below app bar (40% filled for step 2).

Step card (white, rounded 16px, mx-16px, strong shadow, padding 24px, takes 55% of screen height): "Step 2" purple chip top-left. Instruction text 18px line-height 1.6: "Ask children to sort the red blocks into the red bowl. Say: 'Lal rangke pathar idhar rakhein!'" Illustration area 140px height light-gray rounded-12px with simple flat illustration of children sorting blocks.

Audio/Video row below card: [▶ Play Audio] [📷 Show Video] both outlined buttons. Language toggle: Hindi | Gujarati pill.

Bottom fixed navigation: "← Previous" outlined left, "Next Step →" purple right, both 48px height.

Collapsed section: "Add note about this session" gray link at bottom.

---

SCREEN 9 — HOME VISIT ASSISTANT
App bar: back, "Home Visits", filter icon right.

Summary strip: 3 colored chips — "5 Due Today" (red), "3 Overdue" (amber), "12 This Month" (purple).

AI Recommendation banner (amber bg, rounded 12px, mx-16px): AI sparkle icon + "Visit Priya Patel first — missed 2 consecutive months, weight concern flagged."

Section header "Priority Visits Today" with small "AI" purple badge.

Visit cards (white, rounded 12px, mx-16px, mb-12px, 4px left border color-coded):
Card 1 (red border, overdue): "Ananya Patel · 2yr 4mo" bold + "HIGH RISK" red badge. "12 Moti Nagar, Near Temple · 2.3 km" gray 12px. "Last visit: 28 Apr · Reason: Weight faltering". Action row: [📞 Call] [✓ Mark Visited] [🗺️ Navigate] — 3 outlined small buttons.
Card 2 (amber border, due today): Similar layout, amber badge "DUE TODAY".
Card 3 (green border, scheduled): Green badge "SCHEDULED".

"Completed This Month" collapsible section below — compact rows with name + date + green tick.

---

SCREEN 10 — PARENT REMINDER SYSTEM
App bar: back, "Parent Connect".

3 tabs: Send Reminder | Message History | Events.

Send Reminder tab (default):
Recipient selector: Toggle row "All Parents" (active) / "Select Children".
Section "Reminder Type" — 2-column grid of 6 type cards (rounded 10px, border, 72px height each): 💉 Vaccination due, 🍽️ Nutrition distribution, 📅 Parent meeting, ⚠️ Health alert, 🎉 Event, ✏️ Custom. Selected: purple border + light purple fill.
Message Preview card (light purple bg, rounded 12px): auto-generated message text 14px. Language toggle: Hindi | Gujarati | English. "Edit message" small link.
Send options: "Send via WhatsApp" green button full-width, "Send via SMS" outlined button full-width, "Schedule for later" gray small link.

---

SCREEN 11 — AI REPORT GENERATOR
App bar: back, "Report Generator".

3 large report type cards (white, rounded 12px, full-width mx-16px, 80px height each, mb-12px):
[📅 Daily Report — "Attendance, nutrition, activities for today" — Generate →]
[📊 Weekly Report — "Summary for Mon–Sun with trends" — Generate →]
[🗓️ Monthly Report — "Full month data in MIS format" — Generate →]
Each: icon left (40px colored circle), title 16px bold, description 12px gray, purple chevron right.

Generated Report Preview section (appears selected, card with rounded 16px border):
Report header: Centre name · Date range · Worker name — 12px gray.
Collapsed accordion sections: ▼ Attendance Summary · ▼ Nutrition Distribution · ▼ Home Visits · ▼ Vaccination Updates · ▼ Remarks.
"AI auto-filled · Review before submitting" amber status chip.

Action row: [👁 Preview] [📤 Share] [📥 Download PDF] — 3 equal outlined buttons.
"Submit to Supervisor" full-width green 52px button at bottom.

---

SCREEN 12 — WORKER WELLNESS
App bar: back, "My Wellness".

Workload gauge (centered, 200px): circular arc chart, green-to-amber-to-red, needle pointing to amber zone. Center: "Moderate" bold 16px + "Workload" gray 12px. "🟡 7 pending tasks" chip below.

AI Priority Suggestions card (light purple bg, rounded 16px, mx-16px, padding 20px):
Header: ✨ "AI Prioritization for Today" purple bold 14px.
Numbered list:
1. ✅ Complete nutrition distribution (9:00–10:30am)
2. 📍 Mark attendance (10:30am)
3. 🏠 2 priority home visits (2:00–4:00pm)
4. 📄 Submit daily report (5:00pm)
"Rearrange" outlined small button right-aligned below list.

"How are you feeling today?" section: 5 emoji options in a row 😫 😟 😐 🙂 😊, each 44x44px circle, selected one has purple ring.

Self-care tip card (light green bg, rounded 12px): "Tip: You've had 6 consecutive working days. Take breaks between home visits."

Monthly workload bar chart (5 weekly bars, colored by load: green/amber/red). "Busiest: Wednesday · Lightest: Saturday" 12px gray below.

---

SCREEN 13 — SUPERVISOR DASHBOARD
App bar: back, "Supervisor View" bold, logout icon right. Note: This is a SEPARATE login — no bottom nav bar on this screen.

Centre selector: Full-width dropdown "ICDS Block 4 — Gandhinagar ▼" (white, rounded 8px, border).

Key Metrics 2x2 grid (white cards, rounded 12px, shadow-sm):
[👶 156 Total Children] [📊 78% Attendance Today]
[📄 3 Pending Reports] [⚠️ 7 High-Risk Children (red badge)]

Attendance Trend: Line chart 180px height, purple line, last 30 days, labeled axes.

High-Risk Children section header (red badge with count "7"):
3 rows: Child name + Centre + Risk reason + Last visit + "Assign Visit" small purple button.

Worker Performance table (3 rows): Worker name | Attendance ✅ | Reports ✅/⚠️ | Visits ✅.

AI Insights banner (amber gradient, rounded 12px, full-width): "Centre A has below-average attendance for 3 weeks. 5 children show growth faltering." "View Details →" white small link right-aligned.

---

CONNECTIONS / PROTOTYPE FLOW:
Screen 1 (Splash) → auto to Screen 2 after 2.5s
Screen 2 (Language) → tap Continue → Screen 3
Screen 3 (Login) → tap Login → Screen 4
Screen 4 (Dashboard) → tap Smart Attendance card → Screen 5
Screen 4 (Dashboard) → tap Child Profiles card → Screen 6
Screen 4 (Dashboard) → tap Activity Planner card → Screen 7
Screen 4 (Dashboard) → tap Home Visits card → Screen 9
Screen 4 (Dashboard) → tap Parent Connect card → Screen 10
Screen 4 (Dashboard) → tap AI Reports card → Screen 11
Screen 4 (Dashboard) → tap Worker Wellness card → Screen 12
Screen 7 (Activity Planner) → tap Start Activity → Screen 8
Screen 13 is accessible via separate supervisor login on Screen 3 (Worker ID tab, role = supervisor)
Bottom nav "Home" tab on all worker screens → Screen 4
Bottom nav "Children" tab → Screen 6
Bottom nav "Activities" tab → Screen 7
Bottom nav "Reports" tab → Screen 11
Bottom nav "AI Help" tab → show voice overlay on current screen