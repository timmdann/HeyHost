# TeaHost - Development Roadmap

## Overview

This document provides a detailed, actionable roadmap for implementing the TeaHost platform from MVP to full-scale launch.

## Timeline Overview

```
Month 1-2:  Foundation & Core Backend
Month 3-4:  Frontend Development & Integration
Month 5:    Testing, Security & Payment Integration
Month 6:    Beta Testing & Soft Launch
Month 7-8:  Feedback Integration & Mobile Apps
Month 9-12: Scaling & Feature Enhancement
```

---

## Phase 1: Project Setup (Week 1-2)

### Week 1: Infrastructure Setup

#### Day 1-2: Repository & Environment
- [ ] Create Git repository structure
- [ ] Set up monorepo or separate repos (frontend/backend)
- [ ] Initialize package.json files
- [ ] Configure .gitignore files
- [ ] Set up branch protection rules
- [ ] Create development, staging, production branches

#### Day 3-4: Development Environment
- [ ] Set up Docker Compose for local development
- [ ] Configure PostgreSQL container
- [ ] Configure Redis container
- [ ] Set up local environment variables
- [ ] Create database initialization scripts
- [ ] Document local setup process

#### Day 5: Project Documentation
- [ ] Create README.md with setup instructions
- [ ] Document coding standards
- [ ] Set up ESLint and Prettier
- [ ] Create CONTRIBUTING.md
- [ ] Set up issue templates
- [ ] Create pull request template

### Week 2: Backend Foundation

#### Day 1-2: Backend Structure
- [ ] Initialize Node.js/Express project
- [ ] Set up TypeScript (optional but recommended)
- [ ] Create folder structure (controllers, services, models, etc.)
- [ ] Set up logging (Winston)
- [ ] Configure environment variables (dotenv)
- [ ] Set up error handling middleware

#### Day 3-4: Database Setup
- [ ] Set up Sequelize/TypeORM
- [ ] Create database configuration
- [ ] Implement connection pooling
- [ ] Set up migration system
- [ ] Create initial migration for users table
- [ ] Test database connection

#### Day 5: Testing Framework
- [ ] Set up Jest
- [ ] Configure test environment
- [ ] Create sample unit test
- [ ] Set up test database
- [ ] Configure code coverage
- [ ] Set up CI/CD pipeline (GitHub Actions)

---

## Phase 2: Core Backend Development (Week 3-6)

### Week 3: Authentication System

#### User Model & Migration
```javascript
// Priority: HIGH
- [ ] Create User model with all fields
- [ ] Create migration for users table
- [ ] Add indexes (email, phone)
- [ ] Implement password hashing with bcrypt
- [ ] Add validation rules
```

#### Authentication Endpoints
```javascript
// Priority: HIGH
- [ ] POST /api/auth/register
  - Validate input data
  - Hash password
  - Create user record
  - Send verification email
  - Return JWT tokens

- [ ] POST /api/auth/login
  - Validate credentials
  - Check if user is active
  - Generate access & refresh tokens
  - Update last_login timestamp
  - Return user data + tokens

- [ ] POST /api/auth/refresh
  - Validate refresh token
  - Generate new access token
  - Return new token

- [ ] POST /api/auth/logout
  - Invalidate tokens (blacklist)
  - Clear server-side session

- [ ] POST /api/auth/forgot-password
  - Generate reset token
  - Send email with reset link
  - Store token in Redis (15 min expiry)

- [ ] POST /api/auth/reset-password
  - Validate reset token
  - Update password
  - Invalidate all user sessions
```

#### Testing
```
- [ ] Unit tests for auth service
- [ ] Integration tests for auth endpoints
- [ ] Test password hashing
- [ ] Test JWT generation/validation
- [ ] Test error cases
```

### Week 4: User Profile Management

#### User Profile Endpoints
```javascript
// Priority: HIGH
- [ ] GET /api/users/me
  - Return current user profile
  - Include verification status
  - Include user_type

- [ ] PUT /api/users/me
  - Update profile fields
  - Validate input
  - Return updated profile

- [ ] POST /api/users/me/photo
  - Generate presigned S3 URL
  - Validate file type
  - Store photo URL
  - Return photo URL

- [ ] GET /api/users/:id
  - Return public user profile
  - Hide sensitive data
  - Include reviews received
```

#### Email Verification
```javascript
// Priority: HIGH
- [ ] POST /api/auth/verify-email
  - Validate verification token
  - Update is_email_verified
  - Send welcome email

- [ ] POST /api/auth/resend-verification
  - Generate new token
  - Send verification email
  - Rate limit (1 per 5 minutes)
```

#### Phone Verification
```javascript
// Priority: HIGH
- [ ] POST /api/users/me/verify-phone
  - Generate 6-digit OTP
  - Send via Twilio
  - Store in Redis (5 min expiry)
  - Rate limit

- [ ] POST /api/users/me/confirm-phone
  - Validate OTP
  - Update is_phone_verified
  - Remove OTP from Redis
```

### Week 5: Host Profile System

#### Host Profile Model
```javascript
// Priority: HIGH
- [ ] Create HostProfile model
- [ ] Create migration
- [ ] Add PostGIS extension for location
- [ ] Create indexes
- [ ] Add validation rules
```

#### Host Profile Endpoints
```javascript
// Priority: HIGH
- [ ] POST /api/hosts/profile
  - Create host profile
  - Validate required fields
  - Geocode address to lat/lng
  - Set is_published = FALSE initially
  - Return profile

- [ ] GET /api/hosts/profile
  - Return own host profile
  - Include all fields

- [ ] PUT /api/hosts/profile
  - Update host profile
  - Re-geocode if address changed
  - Validate price range
  - Return updated profile

- [ ] GET /api/hosts/:id
  - Return public host profile
  - Include photos
  - Include average rating
  - Include sample reviews
  - Hide exact address (show neighborhood only)

- [ ] DELETE /api/hosts/profile
  - Soft delete (set is_published = FALSE)
  - Cancel future bookings
  - Notify affected tourists
```

#### Host Photos
```javascript
// Priority: HIGH
- [ ] POST /api/hosts/photos
  - Generate presigned S3 URL
  - Validate file type/size
  - Create photo record
  - Queue for moderation
  - Return photo data

- [ ] PUT /api/hosts/photos/:id
  - Update caption
  - Update display_order
  - Update is_primary

- [ ] DELETE /api/hosts/photos/:id
  - Delete from S3
  - Delete record
  - Reorder remaining photos
```

### Week 6: Search & Discovery

#### Search Service
```javascript
// Priority: HIGH
- [ ] Implement basic PostgreSQL search
  - Filter by city
  - Filter by neighborhood
  - Filter by price range
  - Filter by languages
  - Filter by topics
  - Sort by rating, price, reviews

- [ ] GET /api/hosts/search
  - Accept query parameters
  - Apply filters
  - Paginate results
  - Return host cards data

- [ ] GET /api/hosts/nearby
  - Accept lat/lng or address
  - Use PostGIS for geo queries
  - Find hosts within radius
  - Return sorted by distance
```

#### Favorites
```javascript
// Priority: MEDIUM
- [ ] POST /api/favorites
  - Add host to favorites
  - Check for duplicates
  - Return success

- [ ] DELETE /api/favorites/:hostId
  - Remove from favorites
  - Return success

- [ ] GET /api/favorites
  - List user's favorites
  - Include host details
  - Paginate
```

---

## Phase 3: Booking System (Week 7-9)

### Week 7: Availability Management

#### Availability Model
```javascript
// Priority: HIGH
- [ ] Create AvailabilitySlot model
- [ ] Create migration
- [ ] Add indexes
- [ ] Implement validation
```

#### Availability Endpoints
```javascript
// Priority: HIGH
- [ ] POST /api/hosts/availability
  - Create availability slots
  - Support single and recurring
  - Validate time ranges
  - Return created slots

- [ ] GET /api/hosts/availability
  - Get own availability
  - Filter by date range
  - Group by date

- [ ] PUT /api/hosts/availability/:id
  - Update slot
  - Check for existing bookings
  - Validate changes

- [ ] DELETE /api/hosts/availability/:id
  - Delete if not booked
  - Return error if booked

- [ ] GET /api/hosts/:id/available-slots
  - Public endpoint
  - Get available slots for host
  - Filter by date range
  - Exclude booked slots
```

### Week 8: Booking Flow

#### Booking Model
```javascript
// Priority: HIGH
- [ ] Create Booking model
- [ ] Create migration
- [ ] Add indexes
- [ ] Add constraints
- [ ] Implement validation
```

#### Booking Endpoints
```javascript
// Priority: HIGH
- [ ] POST /api/bookings
  - Validate slot availability
  - Create booking (status: pending)
  - Lock availability slot
  - Calculate fees
  - Create payment intent
  - Send notification to host
  - Return booking + payment details

- [ ] GET /api/bookings
  - List user's bookings
  - Filter by status, date
  - Separate as tourist/as host
  - Paginate
  - Include related data

- [ ] GET /api/bookings/:id
  - Get booking details
  - Check authorization
  - Include all related data
  - Include messages

- [ ] PUT /api/bookings/:id/confirm
  - Host only
  - Update status to confirmed
  - Send notification to tourist
  - Create reminder job
  - Return updated booking

- [ ] PUT /api/bookings/:id/decline
  - Host only
  - Update status to declined
  - Release availability slot
  - Send notification to tourist
  - Refund payment
  - Return updated booking

- [ ] PUT /api/bookings/:id/cancel
  - Check cancellation policy
  - Calculate refund amount
  - Update status to cancelled
  - Release availability slot
  - Process refund
  - Notify other party
  - Return updated booking

- [ ] PUT /api/bookings/:id/complete
  - Check if visit happened
  - Update status to completed
  - Trigger review request
  - Capture payment
  - Queue payout
  - Return updated booking
```

### Week 9: Messaging System

#### Message Model
```javascript
// Priority: HIGH
- [ ] Create Message model
- [ ] Create migration
- [ ] Add indexes
```

#### Messaging Endpoints
```javascript
// Priority: HIGH
- [ ] GET /api/messages/conversations
  - List all conversations
  - Group by booking
  - Show unread count
  - Show last message
  - Paginate

- [ ] GET /api/messages/booking/:bookingId
  - Get all messages for booking
  - Check authorization
  - Mark as read
  - Paginate (load more)

- [ ] POST /api/messages
  - Create message
  - Validate booking access
  - Send real-time via WebSocket
  - Send email notification
  - Return message

- [ ] PUT /api/messages/:id/read
  - Mark as read
  - Update read_at timestamp
  - Send read receipt via WebSocket
```

#### WebSocket Implementation
```javascript
// Priority: HIGH
- [ ] Set up Socket.io server
- [ ] Implement authentication
- [ ] Create room system (per booking)
- [ ] Handle message events
- [ ] Handle typing indicators
- [ ] Handle read receipts
- [ ] Handle disconnection
```

---

## Phase 4: Payment Integration (Week 10)

### Stripe Setup
```javascript
// Priority: HIGH
- [ ] Create Stripe account
- [ ] Get API keys
- [ ] Set up Stripe Connect for hosts
- [ ] Configure webhooks
- [ ] Test in development mode
```

### Payment Endpoints
```javascript
// Priority: HIGH
- [ ] POST /api/payments/create-intent
  - Create Stripe PaymentIntent
  - Calculate amounts
  - Store payment record
  - Return client_secret

- [ ] POST /api/payments/confirm
  - Confirm payment
  - Update booking payment_status
  - Update payment record
  - Return success

- [ ] POST /api/payments/refund
  - Create refund
  - Update booking
  - Update payment record
  - Return refund details

- [ ] POST /api/webhooks/stripe
  - Verify webhook signature
  - Handle payment_intent.succeeded
  - Handle payment_intent.failed
  - Handle charge.refunded
  - Update records accordingly
```

### Payout System
```javascript
// Priority: MEDIUM
- [ ] Implement host onboarding to Stripe Connect
- [ ] POST /api/hosts/stripe/onboard
- [ ] GET /api/hosts/stripe/status
- [ ] Implement payout calculation
- [ ] Implement payout scheduling (weekly)
- [ ] Create payout records
- [ ] GET /api/hosts/payouts
```

---

## Phase 5: Review System (Week 11)

### Review Model
```javascript
// Priority: HIGH
- [ ] Create Review model
- [ ] Create migration
- [ ] Add indexes
- [ ] Add constraints
```

### Review Endpoints
```javascript
// Priority: HIGH
- [ ] POST /api/reviews
  - Create review
  - Validate booking is completed
  - Check not already reviewed
  - Calculate rating averages
  - Update host statistics
  - Send notification
  - Return review

- [ ] GET /api/reviews/booking/:bookingId
  - Get reviews for booking
  - Return both parties' reviews

- [ ] GET /api/reviews/user/:userId
  - Get reviews for user
  - Filter by received/given
  - Paginate
  - Calculate statistics

- [ ] PUT /api/reviews/:id/response
  - Add response to review
  - Reviewee only
  - Send notification
  - Return updated review

- [ ] POST /api/reviews/:id/flag
  - Flag inappropriate review
  - Create report
  - Queue for moderation
  - Return success
```

---

## Phase 6: Frontend Development (Week 12-16)

### Week 12: Frontend Setup & Core Components

```javascript
// Priority: HIGH
- [ ] Initialize Next.js project
- [ ] Set up Tailwind CSS / Material-UI
- [ ] Configure routing
- [ ] Set up state management (Redux/Context)
- [ ] Create theme and global styles
- [ ] Set up Axios for API calls
- [ ] Implement error handling
- [ ] Create utility functions

// Common Components
- [ ] Button, Input, Textarea
- [ ] Modal, Dialog
- [ ] Card, Badge
- [ ] Loader, Skeleton
- [ ] Alert, Toast notifications
- [ ] Dropdown, Select
- [ ] DatePicker, TimePicker
- [ ] Rating component
- [ ] Avatar component
```

### Week 13: Authentication UI

```javascript
// Priority: HIGH
// Pages
- [ ] Landing page (/)
- [ ] Login page (/login)
- [ ] Register page (/register)
- [ ] Forgot password (/forgot-password)
- [ ] Reset password (/reset-password/:token)
- [ ] Email verification (/verify-email/:token)

// Features
- [ ] Form validation
- [ ] Error handling
- [ ] Loading states
- [ ] Social login buttons (future)
- [ ] Remember me functionality
- [ ] Redirect after login
```

### Week 14: Host Profile UI

```javascript
// Priority: HIGH
// Pages
- [ ] Create host profile (/become-host)
- [ ] Edit host profile (/host/profile/edit)
- [ ] Host dashboard (/host/dashboard)
- [ ] Host public profile (/host/:id)

// Components
- [ ] Profile form (multi-step)
- [ ] Photo uploader
- [ ] Amenities selector
- [ ] Topics selector
- [ ] Language selector
- [ ] Pricing input
- [ ] Address autocomplete (Google Maps)
- [ ] Preview mode

// Features
- [ ] Form validation
- [ ] Image upload with preview
- [ ] Drag-and-drop photo reordering
- [ ] Progress indicator
- [ ] Save draft functionality
```

### Week 15: Search & Discovery UI

```javascript
// Priority: HIGH
// Pages
- [ ] Search page (/search)
- [ ] Host detail page (/host/:id)

// Components
- [ ] Search bar with autocomplete
- [ ] Filter panel
  - Price range slider
  - Date picker
  - Language checkboxes
  - Topics checkboxes
  - Rating filter
- [ ] Host card component
- [ ] Map view (Mapbox/Google Maps)
- [ ] List view
- [ ] Sort dropdown
- [ ] Pagination

// Features
- [ ] Real-time search
- [ ] Filter state management
- [ ] URL query parameters
- [ ] Map markers
- [ ] Hover effects
- [ ] Favorite button
```

### Week 16: Booking UI

```javascript
// Priority: HIGH
// Pages
- [ ] Booking page (/book/:hostId)
- [ ] Booking confirmation (/bookings/:id/confirm)
- [ ] My bookings (/bookings)
- [ ] Booking details (/bookings/:id)

// Components
- [ ] Availability calendar
- [ ] Time slot selector
- [ ] Guest counter
- [ ] Booking summary
- [ ] Price breakdown
- [ ] Payment form (Stripe Elements)
- [ ] Booking card
- [ ] Status badge

// Features
- [ ] Calendar date selection
- [ ] Dynamic price calculation
- [ ] Payment processing
- [ ] Confirmation page
- [ ] Booking filters
- [ ] Status management
```

---

## Phase 7: Testing & Quality Assurance (Week 17-18)

### Week 17: Backend Testing

```javascript
// Priority: HIGH
- [ ] Unit tests for services
  - Auth service
  - User service
  - Host service
  - Booking service
  - Payment service
  - Review service

- [ ] Integration tests for API endpoints
  - Auth endpoints
  - User endpoints
  - Host endpoints
  - Booking endpoints
  - Payment endpoints
  - Review endpoints

- [ ] Test edge cases
- [ ] Test error handling
- [ ] Test validation
- [ ] Test authorization
- [ ] Achieve >80% code coverage
```

### Week 18: Frontend Testing & E2E

```javascript
// Priority: HIGH
- [ ] Unit tests for components
- [ ] Integration tests for pages
- [ ] E2E tests with Playwright/Cypress
  - User registration flow
  - Login flow
  - Create host profile flow
  - Search and book flow
  - Payment flow
  - Review flow

- [ ] Accessibility testing
- [ ] Performance testing
- [ ] Cross-browser testing
- [ ] Responsive design testing
- [ ] Fix all critical bugs
```

---

## Phase 8: Security & Compliance (Week 19)

### Security Audit
```javascript
// Priority: HIGH
- [ ] SQL injection testing
- [ ] XSS vulnerability testing
- [ ] CSRF protection verification
- [ ] Authentication bypass testing
- [ ] Authorization testing
- [ ] Rate limiting verification
- [ ] Input validation review
- [ ] Dependency vulnerability scan (npm audit)
- [ ] Security headers verification
- [ ] SSL/TLS configuration
```

### Compliance
```javascript
// Priority: HIGH
- [ ] GDPR compliance
  - Privacy policy
  - Cookie consent
  - Data export functionality
  - Data deletion functionality
  - User consent management

- [ ] Terms of Service
- [ ] Content policy
- [ ] Cancellation policy
- [ ] Refund policy
```

---

## Phase 9: Beta Testing (Week 20-22)

### Week 20: Beta Preparation

```javascript
// Priority: HIGH
- [ ] Deploy to staging environment
- [ ] Set up error tracking (Sentry)
- [ ] Set up analytics (Google Analytics, Mixpanel)
- [ ] Create beta user documentation
- [ ] Create feedback form
- [ ] Set up support email
- [ ] Recruit beta testers (30-50 users)
```

### Week 21-22: Beta Testing

```javascript
// Priority: HIGH
- [ ] Onboard beta users
- [ ] Monitor system performance
- [ ] Track user behavior
- [ ] Collect feedback
- [ ] Fix critical bugs
- [ ] Implement quick wins
- [ ] Iterate based on feedback
- [ ] Prepare for launch
```

---

## Phase 10: Launch (Week 23-24)

### Week 23: Pre-Launch

```javascript
// Priority: HIGH
- [ ] Final security review
- [ ] Performance optimization
- [ ] Load testing
- [ ] Set up monitoring alerts
- [ ] Prepare launch materials
  - Blog post
  - Social media posts
  - Press release
  - Launch video
- [ ] Brief support team
- [ ] Set up support ticketing system
```

### Week 24: Launch

```javascript
// Priority: HIGH
- [ ] Deploy to production
- [ ] Smoke testing in production
- [ ] Launch marketing campaign
- [ ] Monitor closely for 24-48 hours
- [ ] Quick response to issues
- [ ] Collect user feedback
- [ ] Track key metrics
- [ ] Celebrate! 🎉
```

---

## Post-Launch Roadmap (Month 7-12)

### Month 7-8: Mobile Apps

```javascript
// Priority: HIGH
- [ ] Set up React Native project
- [ ] Implement authentication
- [ ] Implement main screens
- [ ] Implement push notifications
- [ ] Test on iOS and Android
- [ ] Submit to App Store
- [ ] Submit to Google Play
```

### Month 9-10: Advanced Features

```javascript
// Priority: MEDIUM
- [ ] Instant booking
- [ ] Video profile introductions
- [ ] Advanced search filters
- [ ] Recommendation engine
- [ ] Host training resources
- [ ] Tourist tips and guides
- [ ] Multi-language support
- [ ] Multi-currency support
```

### Month 11-12: Scaling & Optimization

```javascript
// Priority: MEDIUM
- [ ] Implement Elasticsearch for search
- [ ] Set up CDN for images
- [ ] Implement Redis caching
- [ ] Database optimization
- [ ] Horizontal scaling setup
- [ ] Geographic expansion to more cities
- [ ] Partnership integrations
- [ ] Advanced analytics
```

---

## Success Metrics to Track

### Week 1 Metrics
- [ ] 100 registered users
- [ ] 20 host profiles created
- [ ] 10 bookings made

### Month 1 Metrics
- [ ] 500 registered users
- [ ] 100 host profiles
- [ ] 50 completed bookings
- [ ] 4.0+ average rating
- [ ] <5% cancellation rate

### Month 3 Metrics
- [ ] 2,000 registered users
- [ ] 300 host profiles
- [ ] 200 completed bookings
- [ ] 4.2+ average rating
- [ ] 20% repeat booking rate

### Month 6 Metrics
- [ ] 5,000 registered users
- [ ] 500 host profiles
- [ ] 1,000 completed bookings
- [ ] 4.5+ average rating
- [ ] 30% repeat booking rate
- [ ] $50,000 GMV

### Year 1 Metrics
- [ ] 10,000 registered users
- [ ] 1,000 host profiles
- [ ] 5,000 completed bookings
- [ ] 4.5+ average rating
- [ ] 30%+ repeat booking rate
- [ ] 10 active cities
- [ ] $100,000+ GMV

---

## Risk Mitigation Plan

### Technical Risks
- **Risk**: Server downtime
  - **Mitigation**: Redundant servers, monitoring, auto-scaling
  
- **Risk**: Data breach
  - **Mitigation**: Encryption, security audits, compliance

- **Risk**: Payment failures
  - **Mitigation**: Robust error handling, retry logic, monitoring

### Business Risks
- **Risk**: Low host signup
  - **Mitigation**: Marketing, incentives, partnerships
  
- **Risk**: Low tourist bookings
  - **Mitigation**: Competitive pricing, quality hosts, marketing
  
- **Risk**: Safety incidents
  - **Mitigation**: Verification, insurance, clear policies

---

## Conclusion

This roadmap provides a structured approach to building TeaHost from concept to launch. The key is to:

1. **Stay focused** on MVP features first
2. **Test early and often**
3. **Iterate based on feedback**
4. **Maintain code quality**
5. **Keep security top of mind**
6. **Monitor metrics closely**
7. **Be ready to adapt**

With disciplined execution and focus on user needs, TeaHost can successfully launch and scale to become the leading platform for cultural home visits.
