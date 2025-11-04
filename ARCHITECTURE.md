# TeaHost - Technical Architecture

## System Architecture Overview

TeaHost follows a modern, scalable microservices-inspired architecture with a monolithic MVP approach that can be broken into microservices as the platform grows.

## Architecture Diagram (Text Representation)

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  Web App (React/Next.js)  │  Mobile Apps (React Native)         │
│  - Progressive Web App     │  - iOS                              │
│  - Responsive Design       │  - Android                          │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CDN / LOAD BALANCER                          │
│                    (CloudFlare / AWS CloudFront)                  │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API GATEWAY / NGINX                         │
│  - Rate Limiting                                                  │
│  - Request Routing                                                │
│  - SSL Termination                                                │
│  - DDoS Protection                                                │
└─────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
┌─────────────────────────────────┐   ┌──────────────────────────┐
│    APPLICATION SERVER            │   │   WEBSOCKET SERVER       │
│    (Node.js/Express)             │   │   (Socket.io)            │
│                                  │   │                          │
│  ┌────────────────────────────┐ │   │  - Real-time Messaging   │
│  │   API Routes Layer         │ │   │  - Notifications         │
│  │   - RESTful Endpoints      │ │   │  - Presence Status       │
│  │   - GraphQL (optional)     │ │   │                          │
│  └────────────────────────────┘ │   └──────────────────────────┘
│                                  │
│  ┌────────────────────────────┐ │
│  │   Middleware Layer         │ │
│  │   - Authentication         │ │
│  │   - Authorization          │ │
│  │   - Validation             │ │
│  │   - Error Handling         │ │
│  │   - Logging                │ │
│  └────────────────────────────┘ │
│                                  │
│  ┌────────────────────────────┐ │
│  │   Business Logic Layer     │ │
│  │   - User Service           │ │
│  │   - Booking Service        │ │
│  │   - Payment Service        │ │
│  │   - Review Service         │ │
│  │   - Verification Service   │ │
│  │   - Search Service         │ │
│  │   - Notification Service   │ │
│  └────────────────────────────┘ │
│                                  │
│  ┌────────────────────────────┐ │
│  │   Data Access Layer        │ │
│  │   - ORM (Sequelize/TypeORM)│ │
│  │   - Query Builders         │ │
│  │   - Database Transactions  │ │
│  └────────────────────────────┘ │
└─────────────────────────────────┘
                    │
    ┌───────────────┼───────────────────────────┐
    ▼               ▼                           ▼
┌──────────┐  ┌──────────┐  ┌─────────────────────────┐
│ PostgreSQL│  │  Redis   │  │   Elasticsearch         │
│           │  │          │  │                         │
│ - Users   │  │ - Cache  │  │ - Full-text Search      │
│ - Bookings│  │ - Session│  │ - Host Search           │
│ - Reviews │  │ - Queue  │  │ - Advanced Filters      │
│ - Messages│  │ - Rate   │  │                         │
└──────────┘  │   Limit  │  └─────────────────────────┘
              └──────────┘
                    │
┌──────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                          │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Stripe    │  │   Twilio    │  │   SendGrid  │          │
│  │  (Payments) │  │   (SMS)     │  │   (Email)   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ AWS S3      │  │  Google     │  │  Sentry     │          │
│  │ (Storage)   │  │  Maps API   │  │  (Errors)   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    BACKGROUND JOBS                            │
├──────────────────────────────────────────────────────────────┤
│  - Email Notifications (Bull Queue)                          │
│  - Payment Processing                                         │
│  - Search Index Updates                                       │
│  - Data Analytics                                             │
│  - Content Moderation                                         │
│  - Scheduled Tasks (cron)                                     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                   MONITORING & LOGGING                        │
├──────────────────────────────────────────────────────────────┤
│  - Application Logs (Winston/Bunyan)                         │
│  - Error Tracking (Sentry)                                    │
│  - Performance Monitoring (New Relic/DataDog)                │
│  - Analytics (Google Analytics, Mixpanel)                    │
└──────────────────────────────────────────────────────────────┘
```

## Technology Stack Details

### Frontend Architecture

#### Web Application (React + Next.js)
```
frontend/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Loader.jsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Navigation.jsx
│   │   ├── host/             # Host-specific components
│   │   │   ├── HostProfile.jsx
│   │   │   ├── AvailabilityCalendar.jsx
│   │   │   ├── BookingList.jsx
│   │   │   └── EarningsChart.jsx
│   │   ├── tourist/          # Tourist-specific components
│   │   │   ├── SearchBar.jsx
│   │   │   ├── HostCard.jsx
│   │   │   ├── MapView.jsx
│   │   │   └── BookingCard.jsx
│   │   └── shared/           # Shared between host/tourist
│   │       ├── MessageThread.jsx
│   │       ├── ReviewForm.jsx
│   │       ├── UserProfile.jsx
│   │       └── VerificationBadge.jsx
│   ├── pages/                # Next.js pages (routes)
│   │   ├── index.jsx         # Landing page
│   │   ├── search.jsx        # Search hosts
│   │   ├── host/
│   │   │   ├── [id].jsx      # Host profile page
│   │   │   └── dashboard.jsx # Host dashboard
│   │   ├── bookings/
│   │   │   ├── index.jsx     # Bookings list
│   │   │   └── [id].jsx      # Booking details
│   │   ├── messages.jsx      # Messages page
│   │   ├── profile.jsx       # User profile
│   │   └── auth/
│   │       ├── login.jsx
│   │       ├── register.jsx
│   │       └── forgot-password.jsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useBooking.js
│   │   ├── useSearch.js
│   │   └── useWebSocket.js
│   ├── services/             # API client services
│   │   ├── api.js            # Axios instance
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── hostService.js
│   │   ├── bookingService.js
│   │   └── messageService.js
│   ├── store/                # State management (Redux/Context)
│   │   ├── store.js
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── userSlice.js
│   │   │   └── bookingSlice.js
│   ├── utils/                # Utility functions
│   │   ├── validation.js
│   │   ├── formatting.js
│   │   ├── constants.js
│   │   └── helpers.js
│   └── styles/               # Global styles
│       ├── globals.css
│       └── themes.js
├── public/                   # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
└── package.json
```

**Key Technologies**:
- **React 18**: Component library
- **Next.js 13+**: SSR, routing, API routes
- **Tailwind CSS / Material-UI**: Styling
- **Redux Toolkit / Zustand**: State management
- **React Query**: Data fetching and caching
- **Socket.io-client**: WebSocket connection
- **React Hook Form**: Form management
- **Yup / Zod**: Form validation
- **date-fns / day.js**: Date manipulation
- **Mapbox GL JS**: Interactive maps

### Backend Architecture

#### Application Server (Node.js + Express)
```
backend/
├── src/
│   ├── api/                  # API route definitions
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── host.routes.js
│   │   │   ├── booking.routes.js
│   │   │   ├── review.routes.js
│   │   │   ├── message.routes.js
│   │   │   └── payment.routes.js
│   │   └── index.js          # Route aggregator
│   ├── controllers/          # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── hostController.js
│   │   ├── bookingController.js
│   │   ├── reviewController.js
│   │   └── paymentController.js
│   ├── services/             # Business logic
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── hostService.js
│   │   ├── bookingService.js
│   │   ├── paymentService.js
│   │   ├── notificationService.js
│   │   ├── verificationService.js
│   │   ├── searchService.js
│   │   └── moderationService.js
│   ├── models/               # Database models (ORM)
│   │   ├── User.js
│   │   ├── HostProfile.js
│   │   ├── Booking.js
│   │   ├── Review.js
│   │   ├── Message.js
│   │   ├── Payment.js
│   │   └── Verification.js
│   ├── middleware/           # Express middleware
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── error.middleware.js
│   │   ├── upload.middleware.js
│   │   └── rateLimit.middleware.js
│   ├── utils/                # Utility functions
│   │   ├── jwt.js
│   │   ├── email.js
│   │   ├── sms.js
│   │   ├── encryption.js
│   │   ├── validation.js
│   │   └── logger.js
│   ├── config/               # Configuration files
│   │   ├── database.js
│   │   ├── redis.js
│   │   ├── stripe.js
│   │   ├── aws.js
│   │   └── env.js
│   ├── jobs/                 # Background jobs
│   │   ├── emailQueue.js
│   │   ├── paymentQueue.js
│   │   ├── indexQueue.js
│   │   └── scheduledJobs.js
│   ├── websocket/            # WebSocket handlers
│   │   ├── socketServer.js
│   │   ├── messageHandler.js
│   │   └── notificationHandler.js
│   └── app.js                # Express app setup
├── tests/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── package.json
└── .env.example
```

**Key Technologies**:
- **Node.js 18+**: Runtime
- **Express.js**: Web framework
- **Sequelize / TypeORM**: ORM
- **Socket.io**: WebSocket server
- **Bull**: Job queue (Redis-based)
- **Passport.js**: Authentication
- **JWT**: Token-based auth
- **bcrypt**: Password hashing
- **Joi / Yup**: Validation
- **Winston**: Logging
- **Jest / Mocha**: Testing
- **Supertest**: API testing

### Database Architecture

#### PostgreSQL Schema Design

**Design Principles**:
1. **Normalization**: 3NF to reduce redundancy
2. **Indexing**: On foreign keys, search columns
3. **Constraints**: Enforce data integrity
4. **Audit Trails**: created_at, updated_at timestamps
5. **Soft Deletes**: is_active flags instead of DELETE

**Key Relationships**:
```sql
-- One-to-One
User (1) --- (1) HostProfile

-- One-to-Many
User (1) --- (N) Bookings
HostProfile (1) --- (N) AvailabilitySlots
HostProfile (1) --- (N) Photos
Booking (1) --- (N) Messages
Booking (1) --- (N) Reviews

-- Many-to-Many
User (N) --- (N) Languages (through UserLanguages)
User (N) --- (N) Favorites (through Favorites)
```

**Indexes Strategy**:
```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- Host search
CREATE INDEX idx_host_profiles_location ON host_profiles(city, neighborhood);
CREATE INDEX idx_host_profiles_price ON host_profiles(price_per_session);
CREATE INDEX idx_host_profiles_rating ON host_profiles(average_rating);

-- Booking queries
CREATE INDEX idx_bookings_host_id ON bookings(host_id);
CREATE INDEX idx_bookings_tourist_id ON bookings(tourist_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Message queries
CREATE INDEX idx_messages_booking_id ON messages(booking_id);
CREATE INDEX idx_messages_receiver_unread ON messages(receiver_id, is_read);

-- Full-text search (PostgreSQL)
CREATE INDEX idx_host_profiles_description ON host_profiles 
USING gin(to_tsvector('english', home_description));
```

#### Redis Cache Strategy

**Use Cases**:
1. **Session Storage**: User session data
2. **Rate Limiting**: API request counters
3. **Job Queue**: Background job processing
4. **Search Cache**: Popular search results
5. **Temporary Data**: OTP codes, reset tokens

**Cache Keys Design**:
```
session:user:{userId}           -> User session data (30 min TTL)
ratelimit:ip:{ip}:{endpoint}   -> Rate limit counter (1 min TTL)
search:results:{query}:{filters} -> Search results (10 min TTL)
otp:{phone}                     -> Phone verification OTP (5 min TTL)
reset-token:{email}             -> Password reset token (15 min TTL)
host:availability:{hostId}:{date} -> Host availability (1 hour TTL)
```

#### Elasticsearch Index Design

**Host Index Structure**:
```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "user_id": { "type": "keyword" },
      "name": { "type": "text", "analyzer": "standard" },
      "bio": { "type": "text", "analyzer": "english" },
      "home_description": { "type": "text", "analyzer": "english" },
      "city": { "type": "keyword" },
      "neighborhood": { "type": "keyword" },
      "location": { "type": "geo_point" },
      "languages": { "type": "keyword" },
      "topics": { "type": "keyword" },
      "price": { "type": "float" },
      "average_rating": { "type": "float" },
      "total_reviews": { "type": "integer" },
      "instant_booking": { "type": "boolean" },
      "verified": { "type": "boolean" },
      "created_at": { "type": "date" },
      "availability_dates": { "type": "date" }
    }
  }
}
```

**Search Queries**:
- Full-text search on description and bio
- Geo-distance queries for location
- Range queries for price and rating
- Term queries for languages and topics
- Bool queries for complex filters

### API Design

#### RESTful API Conventions

**URL Structure**:
```
/api/v1/{resource}/{id?}/{action?}
```

**HTTP Methods**:
- `GET`: Retrieve resources
- `POST`: Create resources
- `PUT`: Update entire resource
- `PATCH`: Partial update
- `DELETE`: Remove resource

**Response Format**:
```json
{
  "success": true,
  "data": { /* resource data */ },
  "message": "Operation successful",
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

**Error Format**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

**Status Codes**:
- `200 OK`: Successful GET, PUT, PATCH
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

#### Authentication Flow

**JWT Token Strategy**:
```
1. User logs in with credentials
2. Server validates credentials
3. Server generates:
   - Access Token (15 min expiry)
   - Refresh Token (7 days expiry)
4. Client stores tokens
5. Client sends Access Token in headers:
   Authorization: Bearer {accessToken}
6. When Access Token expires:
   - Client requests new token with Refresh Token
   - Server validates and issues new Access Token
7. When Refresh Token expires:
   - User must login again
```

**Token Payload**:
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "tourist",
  "iat": 1234567890,
  "exp": 1234568790
}
```

### Real-time Architecture (WebSocket)

#### Socket.io Implementation

**Events Structure**:
```javascript
// Client -> Server
socket.emit('message:send', { bookingId, text })
socket.emit('typing:start', { bookingId })
socket.emit('typing:stop', { bookingId })

// Server -> Client
socket.on('message:received', (message) => {})
socket.on('message:read', ({ messageId }) => {})
socket.on('notification', (notification) => {})
socket.on('booking:updated', (booking) => {})
socket.on('typing:indicator', ({ userId, bookingId }) => {})
```

**Connection Management**:
```javascript
// Authenticate on connection
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  const user = await verifyToken(token);
  socket.userId = user.id;
  next();
});

// Join user-specific room
socket.on('connection', (socket) => {
  socket.join(`user:${socket.userId}`);
});

// Send to specific user
io.to(`user:${userId}`).emit('notification', data);
```

**Scaling Considerations**:
- Use Redis adapter for multi-server Socket.io
- Sticky sessions for load balancing
- Horizontal scaling with Redis pub/sub

### File Upload Architecture

#### Image Upload Flow

```
1. Client requests presigned URL from backend
   POST /api/upload/presigned-url
   { fileType, fileSize, purpose: 'profile' }

2. Server generates presigned URL for S3
   - Validates file type and size
   - Generates unique filename
   - Returns presigned URL

3. Client uploads directly to S3
   PUT {presignedUrl}
   - No load on application server
   - Fast upload

4. Client notifies backend of completion
   POST /api/upload/complete
   { fileUrl, purpose }

5. Server saves file URL to database
   - Associates with user/host profile
   - Updates image moderation queue
```

**File Validation**:
- Allowed types: JPEG, PNG, WebP
- Max size: 5MB per image
- Max images: 10 per host profile
- Malware scanning (ClamAV or cloud service)
- Content moderation (AWS Rekognition / Google Cloud Vision)

### Payment Architecture

#### Stripe Integration Flow

**Booking Payment**:
```
1. Tourist creates booking
   - Booking status: PENDING
   - Payment status: PENDING

2. Backend creates Stripe PaymentIntent
   - Amount: booking price + platform fee
   - Hold funds (authorization)

3. Client confirms payment
   - Stripe Elements UI
   - 3D Secure authentication

4. Host confirms booking
   - Booking status: CONFIRMED
   - Funds remain held

5. Visit completes
   - Booking status: COMPLETED
   - Capture payment
   - Transfer to host (minus platform fee)

6. Payout to host
   - Weekly/monthly payout schedule
   - Stripe Connect for host payouts
```

**Refund Policy**:
- Cancel >48h before: 100% refund
- Cancel 24-48h before: 50% refund
- Cancel <24h before: No refund
- Host cancellation: 100% refund + penalty

**Security**:
- PCI DSS compliance via Stripe
- No credit card data on our servers
- Webhook signature verification
- Idempotency keys for duplicate prevention

### Search Architecture

#### Search Service Design

**Two-tier Search Strategy**:

**Tier 1: Simple Search (PostgreSQL)**
- Basic filters (city, date, price range)
- Fast for small datasets
- No additional infrastructure

**Tier 2: Advanced Search (Elasticsearch)**
- Full-text search
- Geo-spatial queries
- Complex filters and scoring
- Scalable for large datasets

**Search Flow**:
```
1. User enters search query
2. Frontend sends to /api/hosts/search
3. Backend determines search complexity
4. If simple: Query PostgreSQL
5. If complex: Query Elasticsearch
6. Combine with availability from Redis cache
7. Apply filters and sorting
8. Return paginated results
```

**Search Ranking Algorithm**:
```
Score = (
  relevance_score * 0.4 +
  rating_score * 0.3 +
  review_count_score * 0.1 +
  response_rate_score * 0.1 +
  recency_score * 0.1
)
```

### Background Jobs Architecture

#### Bull Queue Implementation

**Job Types**:

1. **Email Jobs**
   - Welcome emails
   - Booking confirmations
   - Reminders
   - Review requests
   - Priority: Medium
   - Retry: 3 times

2. **SMS Jobs**
   - Phone verification
   - Booking reminders
   - Priority: High
   - Retry: 2 times

3. **Payment Jobs**
   - Payment processing
   - Payout processing
   - Priority: High
   - Retry: 5 times with backoff

4. **Search Index Jobs**
   - Update Elasticsearch index
   - Priority: Low
   - Retry: 1 time

5. **Moderation Jobs**
   - Image content check
   - Text content check
   - Priority: Medium
   - Retry: 2 times

**Queue Configuration**:
```javascript
const emailQueue = new Bull('email', {
  redis: redisConfig,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    },
    removeOnComplete: true,
    removeOnFail: false
  }
});

// Process jobs
emailQueue.process(async (job) => {
  const { to, template, data } = job.data;
  await sendEmail(to, template, data);
});
```

**Scheduled Jobs (Cron)**:
```javascript
// Every day at 2 AM
cron.schedule('0 2 * * *', async () => {
  await sendBookingReminders();
  await processScheduledPayouts();
  await cleanupExpiredSessions();
});

// Every hour
cron.schedule('0 * * * *', async () => {
  await updateSearchIndex();
  await calculateHostRankings();
});
```

### Security Architecture

#### Defense in Depth Strategy

**Layer 1: Network Security**
- WAF (Web Application Firewall)
- DDoS protection (CloudFlare)
- Rate limiting at CDN level
- IP whitelisting for admin

**Layer 2: Application Gateway**
- SSL/TLS termination
- Request validation
- Rate limiting per endpoint
- Request size limits

**Layer 3: Authentication & Authorization**
- JWT token verification
- Role-based access control (RBAC)
- Permission checking middleware
- Session management

**Layer 4: Input Validation**
- Schema validation (Joi/Yup)
- SQL injection prevention (ORM)
- XSS prevention (sanitization)
- CSRF tokens

**Layer 5: Data Security**
- Encryption at rest (database)
- Encryption in transit (TLS)
- Sensitive data encryption (AES)
- Password hashing (bcrypt)

**Layer 6: Monitoring & Logging**
- Security event logging
- Failed login tracking
- Suspicious activity detection
- Real-time alerts

#### API Security Best Practices

```javascript
// Rate limiting
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests'
});

// Input validation
const validateBooking = [
  body('hostId').isUUID(),
  body('date').isISO8601(),
  body('startTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
  body('guests').isInt({ min: 1, max: 10 })
];

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true,
  optionsSuccessStatus: 200
};

// Helmet security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

### Monitoring & Observability

#### Logging Strategy

**Log Levels**:
- ERROR: Application errors, exceptions
- WARN: Warning conditions, deprecated usage
- INFO: General information, state changes
- DEBUG: Detailed debug information (dev only)

**Structured Logging**:
```javascript
logger.info('Booking created', {
  bookingId: booking.id,
  hostId: booking.hostId,
  touristId: booking.touristId,
  amount: booking.totalAmount,
  timestamp: new Date().toISOString()
});
```

**Log Aggregation**:
- Centralized logging (ELK Stack / Splunk)
- Log retention policy (30 days)
- Searchable and filterable
- Real-time log streaming

#### Performance Monitoring

**Metrics to Track**:
- Request/response times
- Database query performance
- API endpoint latency
- Error rates
- WebSocket connection count
- Job queue length
- Cache hit/miss ratio

**APM Integration**:
```javascript
// New Relic / DataDog
const newrelic = require('newrelic');

app.use((req, res, next) => {
  newrelic.setTransactionName(`${req.method} ${req.path}`);
  next();
});
```

**Alerts**:
- Error rate > 5%
- Response time > 2s
- Database connection pool exhausted
- Queue length > 1000
- Server CPU > 80%
- Memory usage > 85%

### Deployment Architecture

#### Infrastructure

**Development Environment**:
- Local development with Docker Compose
- Hot reload for rapid iteration
- Mock external services

**Staging Environment**:
- Mirrors production setup
- For final testing before release
- Uses staging credentials for services

**Production Environment**:
- Load balanced application servers
- Redundant database instances
- CDN for static assets
- Auto-scaling based on load

#### Containerization

**Docker Configuration**:
```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=teahost
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - backend
```

#### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          npm install
          npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker image
        run: docker build -t teahost:${{ github.sha }} .
      - name: Push to registry
        run: docker push teahost:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          kubectl set image deployment/teahost \
            teahost=teahost:${{ github.sha }}
```

### Scalability Considerations

#### Horizontal Scaling

**Application Servers**:
- Stateless design for easy scaling
- Load balancer distributes traffic
- Auto-scaling groups (AWS/GCP)
- Session stored in Redis (shared state)

**Database Scaling**:
- Read replicas for read-heavy operations
- Connection pooling
- Query optimization
- Caching layer (Redis)

**File Storage**:
- CDN for image delivery
- S3 for unlimited storage
- Image optimization pipeline

**Search Scaling**:
- Elasticsearch cluster
- Sharding for large datasets
- Replica nodes for high availability

#### Performance Optimization

**Frontend**:
- Code splitting and lazy loading
- Image optimization (WebP, lazy load)
- CDN for static assets
- Service worker for PWA
- React.memo for component optimization

**Backend**:
- Database query optimization
- N+1 query prevention
- Eager loading of relations
- Database indexes
- Redis caching
- Response compression (gzip)

**Database**:
- Query execution plan analysis
- Index optimization
- Materialized views for complex queries
- Partitioning for large tables

### Disaster Recovery

#### Backup Strategy

**Database Backups**:
- Daily full backups
- Hourly incremental backups
- 30-day retention
- Offsite backup storage
- Regular restore testing

**File Backups**:
- S3 versioning enabled
- Cross-region replication
- Lifecycle policies

**Configuration Backups**:
- Infrastructure as code (Terraform)
- Version controlled

#### Recovery Procedures

**RTO (Recovery Time Objective)**: 2 hours
**RPO (Recovery Point Objective)**: 1 hour

**Incident Response**:
1. Detect and alert
2. Assess severity
3. Activate response team
4. Execute recovery plan
5. Post-incident review

## Conclusion

This architecture provides a solid foundation for TeaHost that is:
- **Scalable**: Can handle growth from MVP to millions of users
- **Secure**: Multi-layered security approach
- **Maintainable**: Clean separation of concerns
- **Resilient**: Fault-tolerant design with backups
- **Performant**: Optimized for speed and efficiency

The modular design allows for incremental improvements and the ability to scale specific components as needed.
