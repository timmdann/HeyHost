# TeaHost - Quick Start Guide

## What is TeaHost?

TeaHost connects tourists with local residents for short home visits (1-2 hours) over tea, coffee, or wine. It's about authentic cultural exchange, not accommodation.

## Key Differentiators

- ✅ **Short visits only** (1-2 hours) - not overnight stays
- ✅ **Cultural exchange focus** - conversation and connection
- ✅ **Flexible scheduling** - hosts choose their availability
- ✅ **Trust & Safety** - verification and reviews
- ✅ **Easy booking** - by neighborhood, time, and interests

## Documentation Quick Links

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Project overview and getting started |
| [PROJECT_PLAN.md](./PROJECT_PLAN.md) | Complete development plan and strategy |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technical architecture and design |
| [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) | Database structure and schema |
| [ROADMAP.md](./ROADMAP.md) | Week-by-week implementation plan |
| [UI_WIREFRAMES.md](./UI_WIREFRAMES.md) | UI/UX design specifications |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | How to contribute |
| [SECURITY.md](./SECURITY.md) | Security guidelines |

## For Developers

### Setup in 5 Minutes

```bash
# Clone repository
git clone https://github.com/timmdann/HeyHost.git
cd HeyHost

# Using Docker (recommended)
docker-compose up -d

# Or manual setup
cd backend && npm install
cd ../frontend && npm install
```

### Tech Stack at a Glance

**Frontend**: React + Next.js + Tailwind CSS
**Backend**: Node.js + Express + PostgreSQL
**Real-time**: Socket.io
**Payments**: Stripe
**Storage**: AWS S3

### First Steps

1. Read [ROADMAP.md](./ROADMAP.md) for implementation order
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for technical design
3. Check [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for data structure
4. Follow [CONTRIBUTING.md](./CONTRIBUTING.md) for coding standards

## For Project Managers

### Timeline

- **Weeks 1-2**: Setup and foundation
- **Weeks 3-6**: Core backend (auth, profiles, search)
- **Weeks 7-9**: Booking system
- **Weeks 10-11**: Payments and reviews
- **Weeks 12-16**: Frontend development
- **Weeks 17-19**: Testing and security
- **Weeks 20-24**: Beta testing and launch

### Budget

- **Development**: $20,000
- **Marketing**: $12,000
- **Operations**: $8,000
- **Legal**: $5,000
- **Contingency**: $5,000
- **Total**: $50,000

### Success Metrics

**Month 1**: 500 users, 20 hosts, 10 bookings
**Month 3**: 2,000 users, 100 hosts, 200 bookings
**Month 6**: 5,000 users, 500 hosts, 1,000 bookings
**Year 1**: 10,000 users, 1,000 hosts, 5,000 bookings

## For Designers

### Design System

**Colors**:
- Primary: Terracotta `#E07A5F`
- Secondary: Sage Green `#81B29A`
- Accent: Golden Yellow `#F4A261`

**Typography**:
- Primary: Inter (sans-serif)
- Secondary: Merriweather (serif)

**Key Pages to Design**:
1. Landing page
2. Search & discovery
3. Host profile
4. Booking flow
5. User dashboards
6. Messaging

See [UI_WIREFRAMES.md](./UI_WIREFRAMES.md) for complete specifications.

## For Business/Marketing

### Target Markets

**Tourists**:
- Millennials & Gen Z (25-40 years)
- Solo travelers and digital nomads
- Cultural experience seekers
- 400-500M potential users globally

**Hosts**:
- Urban residents in tourist cities
- Cultural enthusiasts
- Students, retirees, creative professionals
- 5-10M potential hosts globally

### Competitive Advantage

| Competitor | Their Focus | Our Advantage |
|------------|-------------|---------------|
| Airbnb Experiences | Tours & activities outside | Home visits, more intimate |
| Couchsurfing | Overnight stays | Short visits, no hosting burden |
| EatWith | Dinners with prep | Simple tea/coffee, no cooking |

### Marketing Strategy

**Pre-Launch**:
- Build waitlist
- Social media presence
- Influencer partnerships
- Press coverage

**Launch**:
- Pilot city (e.g., Barcelona)
- Recruit 50-100 hosts
- Digital advertising
- Local partnerships

**Growth**:
- Referral program
- Content marketing
- Geographic expansion
- Strategic partnerships

### Monetization

- **Primary**: 15% service fee on bookings
- **Secondary**: Premium host subscriptions
- **Additional**: Promotions, partnerships, advertising

## Core User Flows

### For Tourists

1. **Discover** → Search hosts by city/neighborhood
2. **Explore** → View host profiles and availability
3. **Book** → Select time, send request, pay
4. **Visit** → Meet host, enjoy conversation
5. **Review** → Leave feedback

### For Hosts

1. **Sign Up** → Create host profile
2. **Set Availability** → Choose when you're free
3. **Receive Requests** → Accept/decline bookings
4. **Host** → Welcome tourists to your home
5. **Earn** → Get paid, receive reviews

## Key Features Summary

### MVP (Months 1-3)
✅ User registration & profiles
✅ Host profiles with photos
✅ Search & filtering
✅ Booking system
✅ Payments (Stripe)
✅ Reviews & ratings
✅ Messaging
✅ Email/phone verification

### Phase 2 (Months 4-6)
- Enhanced search (Elasticsearch)
- Mobile apps (React Native)
- Advanced analytics
- Multi-language support
- Instant booking option

### Phase 3 (Months 7-12)
- Video profiles
- Recommendation engine
- Premium subscriptions
- Partnership integrations
- Advanced moderation (AI)

## FAQs

**Q: How is this different from Airbnb?**
A: We focus on short cultural visits (1-2 hours), not accommodation. No overnight stays, just meaningful conversations.

**Q: How do we ensure safety?**
A: Multi-level verification (email, phone, ID), reviews, user reports, content moderation, and clear safety guidelines.

**Q: What's the business model?**
A: Service fee on bookings (15%), plus premium subscriptions for hosts and tourists.

**Q: When will this launch?**
A: Following the roadmap, soft launch in 6 months (Week 24), with beta testing beforehand.

**Q: What cities will we target first?**
A: Major tourist cities with high cultural tourism: Barcelona, Paris, Rome, Berlin, Amsterdam, Lisbon, Prague, Tokyo, Bangkok.

## Next Steps

### For This Week

**Development Team**:
1. Review all documentation
2. Set up development environment
3. Create project board (Jira/Trello)
4. Begin Week 1 tasks from roadmap

**Design Team**:
1. Review wireframes document
2. Start creating high-fidelity mockups in Figma
3. Build component library
4. Create design system

**Business Team**:
1. Finalize budget and funding
2. Start legal entity setup
3. Begin host recruitment strategy
4. Plan launch marketing campaign

## Contact

**Questions?** Email: team@teahost.com

**Want to Contribute?** See [CONTRIBUTING.md](./CONTRIBUTING.md)

**Security Issues?** Email: security@teahost.com

---

**Ready to build something amazing?** Let's make authentic cultural exchange accessible to everyone! 🌍✨
