# TeaHost - UI/UX Design Specifications

## Design Philosophy

TeaHost's design focuses on **warmth, trust, and authenticity**. The interface should feel welcoming like being invited into someone's home, while maintaining professional trust signals for safety and reliability.

### Design Principles

1. **Warmth & Approachability**: Friendly, inviting, human-centered
2. **Trust & Safety**: Clear verification badges, reviews prominently displayed
3. **Simplicity**: Easy booking flow, minimal friction
4. **Cultural Diversity**: Inclusive design supporting multiple languages and cultures
5. **Mobile-First**: Responsive design optimized for all devices

### Brand Colors

**Primary Palette**:
- **Primary**: Warm Terracotta `#E07A5F` - Represents warmth and hospitality
- **Secondary**: Sage Green `#81B29A` - Represents nature and authenticity
- **Accent**: Golden Yellow `#F4A261` - Represents energy and optimism

**Neutral Palette**:
- **Dark**: Charcoal `#2D3142` - Text and headers
- **Medium Gray**: `#6C757D` - Secondary text
- **Light Gray**: `#F8F9FA` - Backgrounds
- **White**: `#FFFFFF` - Cards and containers

**Status Colors**:
- **Success**: Green `#28A745`
- **Warning**: Amber `#FFC107`
- **Error**: Red `#DC3545`
- **Info**: Blue `#17A2B8`

### Typography

**Primary Font**: Inter (sans-serif)
- Clean, modern, excellent readability
- Supports multiple languages

**Secondary Font**: Merriweather (serif)
- For headings and emphasis
- Adds warmth and character

**Font Scale**:
- H1: 2.5rem (40px) - Bold
- H2: 2rem (32px) - Bold
- H3: 1.5rem (24px) - SemiBold
- H4: 1.25rem (20px) - SemiBold
- Body: 1rem (16px) - Regular
- Small: 0.875rem (14px) - Regular
- Tiny: 0.75rem (12px) - Regular

### Spacing System

Based on 8px grid:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

---

## Page Wireframes

### 1. Landing Page (/)

**Purpose**: Convert visitors into users (tourists or hosts)

**Layout**:
```
┌─────────────────────────────────────────────────┐
│  [Logo] TeaHost    Home  How It Works  [Login] │ ← Header
├─────────────────────────────────────────────────┤
│                                                  │
│         HERO SECTION                             │
│  "Experience Authentic Local Life"               │
│  "Connect with locals over tea, coffee, wine"   │
│                                                  │
│  [Search: Where do you want to visit?]          │
│  [Explore Hosts Button]  [Become a Host]        │
│                                                  │
│  [Hero Image: People having tea together]       │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  HOW IT WORKS (3 columns)                       │
│  ┌──────┐  ┌──────┐  ┌──────┐                 │
│  │Search│  │ Book │  │Visit │                  │
│  │      │  │      │  │      │                  │
│  └──────┘  └──────┘  └──────┘                 │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  FEATURED HOSTS (Carousel)                      │
│  ┌────────┐  ┌────────┐  ┌────────┐           │
│  │ Host 1 │  │ Host 2 │  │ Host 3 │           │
│  │ Photo  │  │ Photo  │  │ Photo  │           │
│  │ Name   │  │ Name   │  │ Name   │           │
│  │ City   │  │ City   │  │ City   │           │
│  │ ★4.8   │  │ ★4.9   │  │ ★4.7   │           │
│  └────────┘  └────────┘  └────────┘           │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  POPULAR CITIES (Grid)                          │
│  [Barcelona] [Paris] [Rome] [Tokyo]             │
│  [New York] [Berlin] [London] [Prague]          │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  WHY TEAHOST? (2 columns)                       │
│  For Tourists        │  For Hosts               │
│  • Authentic         │  • Flexible              │
│  • Affordable        │  • Earn Income           │
│  • Safe              │  • Share Culture         │
│                                                  │
├─────────────────────────────────────────────────┤
│  TESTIMONIALS (Slider)                          │
│  "Amazing experience..." - Sarah, USA            │
│                                                  │
├─────────────────────────────────────────────────┤
│  FOOTER                                         │
│  About | Contact | Terms | Privacy | Support    │
│  [Social Media Icons]                            │
└─────────────────────────────────────────────────┘
```

**Key Elements**:
- Clear value proposition above the fold
- Search bar for immediate engagement
- Trust signals (verified badges, ratings)
- Social proof (testimonials)
- CTA buttons for both tourists and hosts

---

### 2. Search & Discovery (/search)

**Purpose**: Help tourists find the perfect host

**Layout**:
```
┌─────────────────────────────────────────────────┐
│  [Logo] TeaHost    [Search Bar]    [Profile ▼] │ ← Header
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐  ┌────────────────────────────┐ │
│  │ FILTERS  │  │  RESULTS (Map/List Toggle) │ │
│  │          │  │                             │ │
│  │ Location │  │  ┌────────────────────┐    │ │
│  │ ☐ Gothic │  │  │ Host Card          │    │ │
│  │ ☐ Born   │  │  │ [Photo]            │    │ │
│  │          │  │  │ Maria Garcia       │    │ │
│  │ Price    │  │  │ Barcelona, Spain   │    │ │
│  │ $-$$$$   │  │  │ ★ 4.8 (23 reviews) │    │ │
│  │ ◄─────►  │  │  │ $25/visit          │    │ │
│  │          │  │  │ Speaks: ES, EN, CA │    │ │
│  │ Date     │  │  │ Topics: Culture,   │    │ │
│  │ [Pick]   │  │  │ Food, History      │    │ │
│  │          │  │  │ [❤ Save] [View]    │    │ │
│  │ Language │  │  └────────────────────┘    │ │
│  │ ☑ English│  │                             │ │
│  │ ☐ Spanish│  │  ┌────────────────────┐    │ │
│  │ ☐ French │  │  │ Host Card          │    │ │
│  │          │  │  │ [Photo]            │    │ │
│  │ Topics   │  │  │ ...                │    │ │
│  │ ☑ Culture│  │  └────────────────────┘    │ │
│  │ ☐ Food   │  │                             │ │
│  │ ☐ History│  │  [Load More]                │ │
│  │          │  │                             │ │
│  │ Rating   │  │                             │ │
│  │ ☑ 4.5+   │  │  OR                         │ │
│  │          │  │                             │ │
│  │ [Apply]  │  │  [MAP VIEW with pins]       │ │
│  └──────────┘  └────────────────────────────┘ │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Key Features**:
- Persistent filter panel (collapsible on mobile)
- Toggle between map and list view
- Real-time filtering
- Sort options (rating, price, distance)
- Save/favorite functionality
- Clear visual hierarchy in host cards

**Host Card Design**:
- Large profile photo (builds trust)
- Name and location
- Rating with review count
- Price per session
- Languages and topics (key matching criteria)
- Quick actions (save, view details)

---

### 3. Host Profile Page (/host/:id)

**Purpose**: Provide detailed information to help tourists make booking decisions

**Layout**:
```
┌─────────────────────────────────────────────────┐
│  [Logo] TeaHost    [Search Bar]    [Profile ▼] │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌────────────────────┐  ┌──────────────────┐ │
│  │ PHOTO GALLERY      │  │ BOOKING CARD     │ │
│  │ [Main Photo]       │  │                  │ │
│  │ [▢][▢][▢][▢]      │  │ $25 per visit    │ │
│  └────────────────────┘  │                  │ │
│                           │ [Select Date]    │ │
│  Maria Garcia             │ [Select Time]    │ │
│  ★ 4.8 (23 reviews)      │ [Guests: 1 ▼]   │ │
│  [✓ Verified]            │                  │ │
│                           │ Total: $28.75    │ │
│  Barcelona, Gothic Q.     │ (incl. fees)    │ │
│  📍 [View on map]        │                  │ │
│                           │ [Request Booking]│ │
│  ─────────────────────   │ or               │ │
│                           │ [Instant Book]   │ │
│  ABOUT                    │                  │ │
│  "Welcome to my cozy..." │ [❤ Save]        │ │
│  [Read more]              └──────────────────┘ │
│                                                  │
│  WHAT I OFFER                                   │
│  ☕ Coffee/Tea  🗣️ Conversation  🏠 Home Visit │
│                                                  │
│  LANGUAGES                                      │
│  Spanish (Native) • English (Fluent) •          │
│  Catalan (Native)                               │
│                                                  │
│  TOPICS WE CAN DISCUSS                         │
│  🎨 Art  🍷 Food & Wine  📚 History             │
│  🏛️ Culture  🎭 Local Life                     │
│                                                  │
│  AMENITIES & DETAILS                            │
│  • WiFi Available                               │
│  • Wheelchair Accessible                        │
│  • Pet-Friendly                                 │
│  • Max 2 guests                                 │
│                                                  │
│  HOUSE RULES                                    │
│  • Please remove shoes                          │
│  • No smoking                                   │
│  • Respect quiet hours after 10pm             │
│                                                  │
│  ─────────────────────                         │
│                                                  │
│  REVIEWS (23)             [Sort: Recent ▼]     │
│                                                  │
│  ┌─────────────────────────────────────┐       │
│  │ Sarah J.  ★★★★★  2 weeks ago       │       │
│  │ "Amazing experience! Maria was..."  │       │
│  │ [Read more]                          │       │
│  └─────────────────────────────────────┘       │
│                                                  │
│  ┌─────────────────────────────────────┐       │
│  │ John D.  ★★★★☆  1 month ago        │       │
│  │ "Great conversation about local..." │       │
│  └─────────────────────────────────────┘       │
│                                                  │
│  [Load More Reviews]                            │
│                                                  │
│  ─────────────────────                         │
│                                                  │
│  LOCATION                                       │
│  [Map showing neighborhood, not exact address] │
│  Gothic Quarter, Barcelona                      │
│                                                  │
│  ─────────────────────                         │
│                                                  │
│  AVAILABILITY CALENDAR                          │
│  [Calendar with available dates highlighted]    │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Key Elements**:
- Professional photo gallery (inspires trust)
- Sticky booking card (always accessible)
- Verification badges prominently displayed
- Clear pricing with breakdown
- Rich profile information
- Social proof (reviews)
- Map showing general area (not exact address)
- Available time slots

---

### 4. Booking Flow (/book/:hostId)

**Step 1: Select Date & Time**
```
┌─────────────────────────────────────────────────┐
│  Book Your Visit with Maria                     │
├─────────────────────────────────────────────────┤
│                                                  │
│  STEP 1 OF 3: When do you want to visit?       │
│                                                  │
│  ┌────────────────┐  ┌────────────────────┐   │
│  │ SELECT DATE    │  │ SELECT TIME        │   │
│  │                │  │                     │   │
│  │ [Calendar]     │  │ ○ 10:00 - 12:00   │   │
│  │                │  │ ○ 14:00 - 16:00   │   │
│  │ June 15, 2024  │  │ ● 17:00 - 19:00   │   │
│  │                │  │ ○ 19:00 - 21:00   │   │
│  └────────────────┘  └────────────────────┘   │
│                                                  │
│  NUMBER OF GUESTS                               │
│  [- 1 +]                                        │
│                                                  │
│  [← Back] [Continue →]                         │
└─────────────────────────────────────────────────┘
```

**Step 2: Add Message**
```
┌─────────────────────────────────────────────────┐
│  STEP 2 OF 3: Introduce yourself                │
├─────────────────────────────────────────────────┤
│                                                  │
│  Tell Maria a bit about yourself and why you   │
│  want to visit:                                 │
│                                                  │
│  ┌─────────────────────────────────────────┐  │
│  │ Hi Maria!                               │  │
│  │                                          │  │
│  │ I'm visiting Barcelona for the first    │  │
│  │ time and would love to learn about...   │  │
│  │                                          │  │
│  └─────────────────────────────────────────┘  │
│                                                  │
│  [← Back] [Continue →]                         │
└─────────────────────────────────────────────────┘
```

**Step 3: Payment**
```
┌─────────────────────────────────────────────────┐
│  STEP 3 OF 3: Confirm and Pay                   │
├─────────────────────────────────────────────────┤
│                                                  │
│  BOOKING SUMMARY                                │
│  ┌─────────────────────────────────────────┐  │
│  │ Visit with Maria Garcia                 │  │
│  │ June 15, 2024 at 17:00                  │  │
│  │ Duration: 2 hours                       │  │
│  │ Guests: 1                               │  │
│  │                                          │  │
│  │ Session Price:        $25.00            │  │
│  │ Service Fee:          $3.75             │  │
│  │ ─────────────────────────               │  │
│  │ Total:                $28.75            │  │
│  └─────────────────────────────────────────┘  │
│                                                  │
│  PAYMENT METHOD                                 │
│  [Stripe Payment Element]                       │
│  [💳 Card Number]                               │
│  [📅 MM/YY] [🔒 CVC]                           │
│                                                  │
│  ☑ I agree to the cancellation policy          │
│  ☑ I agree to the terms of service             │
│                                                  │
│  [← Back] [Confirm & Pay →]                    │
└─────────────────────────────────────────────────┘
```

---

### 5. User Dashboard - Tourist View (/dashboard)

**Layout**:
```
┌─────────────────────────────────────────────────┐
│  [Logo] TeaHost    [Search]    [Profile ▼]     │
├─────────────────────────────────────────────────┤
│  ┌──────┐                                       │
│  │      │  Welcome back, John!                  │
│  │ [📷] │                                       │
│  │      │  ✓ Email verified                     │
│  └──────┘  ○ Phone not verified [Verify]       │
│                                                  │
│  ═══════════════════════════════════════════   │
│                                                  │
│  UPCOMING VISITS (2)                            │
│                                                  │
│  ┌────────────────────────────────────────┐    │
│  │ [Photo] Maria Garcia                   │    │
│  │         Barcelona, Spain               │    │
│  │         📅 June 15 at 17:00           │    │
│  │         [Message] [View] [Cancel]     │    │
│  └────────────────────────────────────────┘    │
│                                                  │
│  ┌────────────────────────────────────────┐    │
│  │ [Photo] Jean Dupont                    │    │
│  │         Paris, France                  │    │
│  │         📅 June 22 at 14:00           │    │
│  │         [Message] [View] [Cancel]     │    │
│  └────────────────────────────────────────┘    │
│                                                  │
│  ─────────────────────                         │
│                                                  │
│  PAST VISITS (5)                               │
│                                                  │
│  ┌────────────────────────────────────────┐    │
│  │ [Photo] Anna Schmidt                   │    │
│  │         Berlin, Germany                │    │
│  │         ✓ Completed on May 10          │    │
│  │         ⭐ Leave Review                │    │
│  └────────────────────────────────────────┘    │
│                                                  │
│  [View All]                                     │
│                                                  │
│  ─────────────────────                         │
│                                                  │
│  SAVED HOSTS (8)                               │
│  [Grid of saved host cards]                    │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

### 6. User Dashboard - Host View (/host/dashboard)

**Layout**:
```
┌─────────────────────────────────────────────────┐
│  [Logo] TeaHost    [Search]    [Profile ▼]     │
├─────────────────────────────────────────────────┤
│                                                  │
│  HOST DASHBOARD                                 │
│                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ EARNINGS │ │ BOOKINGS │ │ RATING   │       │
│  │ $450     │ │ 18       │ │ ★ 4.8    │       │
│  │ this mth │ │ this mth │ │ 23 rev.  │       │
│  └──────────┘ └──────────┘ └──────────┘       │
│                                                  │
│  ═══════════════════════════════════════════   │
│                                                  │
│  PENDING REQUESTS (3)                           │
│                                                  │
│  ┌────────────────────────────────────────┐    │
│  │ [Photo] Sarah J. wants to visit        │    │
│  │         📅 June 20 at 15:00           │    │
│  │         💬 "Hi! I'm visiting..."      │    │
│  │         [Accept] [Decline] [Message]   │    │
│  └────────────────────────────────────────┘    │
│                                                  │
│  ─────────────────────                         │
│                                                  │
│  UPCOMING VISITS (2)                            │
│  [Similar cards showing confirmed visits]       │
│                                                  │
│  ─────────────────────                         │
│                                                  │
│  AVAILABILITY                                   │
│  ┌────────────────────────────────────────┐    │
│  │ [Calendar with availability marked]    │    │
│  │ [+ Add Availability]                   │    │
│  └────────────────────────────────────────┘    │
│                                                  │
│  ─────────────────────                         │
│                                                  │
│  YOUR LISTING                                   │
│  ┌────────────────────────────────────────┐    │
│  │ [Preview of your host profile]         │    │
│  │ [Edit Profile] [View Public Profile]  │    │
│  └────────────────────────────────────────┘    │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

### 7. Messaging Interface (/messages)

**Layout**:
```
┌─────────────────────────────────────────────────┐
│  [Logo] TeaHost    [Search]    [Profile ▼]     │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────┐ ┌──────────────────────────┐ │
│  │CONVERSATIONS│ │ MESSAGE THREAD           │ │
│  │             │ │                           │ │
│  │● Maria G.   │ │ Conversation with Maria  │ │
│  │  "Thanks!"  │ │ Visit: June 15 at 17:00  │ │
│  │  2m ago     │ │                           │ │
│  │             │ │ ┌─────────────────────┐  │ │
│  │○ Jean D.    │ │ │ Hi Maria! Looking   │  │ │
│  │  "See you"  │ │ │ forward to...       │  │ │
│  │  1h ago     │ │ └─────────────────────┘  │ │
│  │             │ │      You, 2 hours ago     │ │
│  │○ Anna S.    │ │                           │ │
│  │  "Great!"   │ │ ┌─────────────────────┐  │ │
│  │  1d ago     │ │ │ Thank you! Me too!  │  │ │
│  │             │ │ │ See you soon 😊     │  │ │
│  │             │ │ └─────────────────────┘  │ │
│  │             │ │      Maria, 2m ago        │ │
│  │             │ │                           │ │
│  │             │ │ ─────────────────────     │ │
│  │             │ │                           │ │
│  │             │ │ [Type message...      ]   │ │
│  │             │ │ [📎] [😊] [Send]         │ │
│  └─────────────┘ └──────────────────────────┘ │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## Mobile Design Considerations

### Navigation
- **Bottom Tab Bar** for main navigation:
  - 🏠 Explore
  - 🔍 Search
  - 💬 Messages
  - 👤 Profile

### Touch Targets
- Minimum 44x44px for all interactive elements
- Adequate spacing between clickable items

### Mobile-Specific Features
- Swipe gestures for image galleries
- Pull-to-refresh for lists
- Bottom sheets for filters
- Native date/time pickers

---

## Component Library

### Buttons

**Primary Button**
- Background: Primary color
- Text: White
- Rounded corners (8px)
- Shadow for depth
- Hover: Darken by 10%
- States: Default, Hover, Active, Disabled

**Secondary Button**
- Border: Primary color
- Text: Primary color
- Background: Transparent
- Same hover and states

**Icon Button**
- Circular or square
- Icon only
- Used for actions like favorite, share

### Cards

**Host Card**
```
┌─────────────────┐
│ [Photo]         │
│ Name            │
│ Location        │
│ ★ Rating (N)    │
│ $Price          │
│ [Tags...]       │
│ [❤] [→]        │
└─────────────────┘
```

**Booking Card**
```
┌─────────────────┐
│ [Photo] Name    │
│ Date & Time     │
│ Status Badge    │
│ [Actions...]    │
└─────────────────┘
```

### Forms

**Input Fields**
- Border: Light gray
- Focus: Primary color border
- Label: Above or floating
- Error: Red border + message below
- Success: Green border + checkmark

**Validation**
- Real-time validation
- Clear error messages
- Success indicators

### Badges & Tags

**Verification Badge**
- ✓ Blue checkmark in circle
- "Verified" text

**Status Badges**
- Pending: Orange
- Confirmed: Green
- Completed: Blue
- Cancelled: Gray

**Topic Tags**
- Pill-shaped
- Light background
- Primary color text

### Modals & Dialogs

**Modal Structure**
- Centered overlay
- White background
- Shadow
- Close button (X) top-right
- Title, content, actions
- Mobile: Full-screen or bottom sheet

### Loading States

**Skeleton Screens**
- Gray placeholder shapes
- Pulsing animation
- Maintains layout

**Spinners**
- Circular progress indicator
- Used for async actions

### Empty States

- Friendly illustration
- Helpful message
- Call-to-action button
- Example: "No bookings yet. Start exploring!"

---

## Accessibility

### WCAG 2.1 AA Compliance

1. **Color Contrast**
   - Text: Minimum 4.5:1 ratio
   - Large text: Minimum 3:1 ratio
   - UI components: Minimum 3:1 ratio

2. **Keyboard Navigation**
   - All interactive elements focusable
   - Clear focus indicators
   - Logical tab order
   - Skip links for navigation

3. **Screen Reader Support**
   - Semantic HTML
   - ARIA labels where needed
   - Alt text for images
   - Descriptive link text

4. **Forms**
   - Labels associated with inputs
   - Error messages announced
   - Required fields indicated
   - Clear instructions

5. **Images**
   - All images have alt text
   - Decorative images: alt=""
   - Complex images: longer descriptions

---

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

### Layout Adjustments

**Mobile**:
- Single column
- Stacked elements
- Hamburger menu
- Bottom navigation
- Full-width cards

**Tablet**:
- Two columns where appropriate
- Visible navigation
- Sidebar filters (collapsible)

**Desktop**:
- Multi-column layouts
- Persistent sidebar
- Wider max-width (1200px)
- Larger images

---

## Animation & Micro-interactions

### Transitions
- Duration: 200-300ms
- Easing: ease-in-out
- Used for: hover states, page transitions, modal open/close

### Hover Effects
- Scale up: Images (1.05x)
- Color change: Buttons
- Shadow: Cards
- Underline: Links

### Feedback
- Button click: Scale down briefly
- Like/Save: Heart animation
- Success: Checkmark animation
- Loading: Progress indicator

---

## Icons

**Icon Library**: Feather Icons or Heroicons
- Consistent stroke width
- 24x24px default size
- Scale appropriately

**Common Icons**:
- 🔍 Search
- 💬 Message
- ❤️ Favorite
- ⭐ Rating
- 📅 Calendar
- 📍 Location
- ✓ Verified
- ⚙️ Settings
- 🔔 Notifications

---

## Design Resources

### Figma Mockups
- High-fidelity mockups should be created in Figma
- Component library for reusability
- Interactive prototype for user testing

### Design System
- Documented components
- Usage guidelines
- Code examples
- Accessibility notes

---

This comprehensive UI/UX specification provides a solid foundation for designing and building the TeaHost platform with a focus on user experience, trust, and conversion.
