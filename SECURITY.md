# Security Policy

## Reporting a Vulnerability

The TeaHost team takes security vulnerabilities seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities to:
- **Email**: security@teahost.com
- **Subject Line**: [SECURITY] Brief description

### What to Include

Please include the following information:
- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity (critical issues within 48 hours)

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Best Practices for Contributors

When contributing to TeaHost, please follow these security guidelines:

### 1. Authentication & Authorization

```javascript
// ✅ Good: Always validate user authentication
app.get('/api/users/:id', authenticate, async (req, res) => {
  // Verify user can access this resource
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  // ... rest of code
});

// ❌ Bad: No authentication check
app.get('/api/users/:id', async (req, res) => {
  // Anyone can access any user's data
});
```

### 2. Input Validation

```javascript
// ✅ Good: Validate and sanitize all inputs
const { body } = require('express-validator');

app.post('/api/bookings',
  body('hostId').isUUID(),
  body('date').isISO8601(),
  body('guests').isInt({ min: 1, max: 10 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ... rest of code
  }
);

// ❌ Bad: No validation
app.post('/api/bookings', async (req, res) => {
  const booking = await Booking.create(req.body);
});
```

### 3. SQL Injection Prevention

```javascript
// ✅ Good: Use parameterized queries
const user = await User.findOne({
  where: { email: req.body.email }
});

// ❌ Bad: String concatenation
const user = await sequelize.query(
  `SELECT * FROM users WHERE email = '${req.body.email}'`
);
```

### 4. XSS Prevention

```javascript
// ✅ Good: Sanitize user input
const sanitizeHtml = require('sanitize-html');

const cleanDescription = sanitizeHtml(userInput, {
  allowedTags: ['b', 'i', 'em', 'strong', 'p'],
  allowedAttributes: {}
});

// ❌ Bad: Direct HTML rendering
const description = userInput; // Could contain <script> tags
```

### 5. Password Security

```javascript
// ✅ Good: Hash passwords with bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashedPassword = await bcrypt.hash(password, saltRounds);

// ❌ Bad: Store plain text passwords
const user = await User.create({
  email: email,
  password: password // Never do this!
});
```

### 6. Sensitive Data Exposure

```javascript
// ✅ Good: Exclude sensitive fields
const user = await User.findByPk(userId, {
  attributes: { exclude: ['password', 'resetToken'] }
});

// ❌ Bad: Return all fields
const user = await User.findByPk(userId);
res.json(user); // Exposes password hash!
```

### 7. CSRF Protection

```javascript
// ✅ Good: Use CSRF tokens
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.post('/api/bookings', csrfProtection, async (req, res) => {
  // Protected from CSRF attacks
});
```

### 8. Rate Limiting

```javascript
// ✅ Good: Implement rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 9. Environment Variables

```javascript
// ✅ Good: Use environment variables
const dbPassword = process.env.DB_PASSWORD;

// ❌ Bad: Hard-coded secrets
const dbPassword = 'mySecretPassword123';
```

### 10. Error Handling

```javascript
// ✅ Good: Generic error messages
try {
  await authenticateUser(email, password);
} catch (error) {
  return res.status(401).json({
    error: 'Invalid credentials'
  });
}

// ❌ Bad: Detailed error messages
try {
  await authenticateUser(email, password);
} catch (error) {
  return res.status(401).json({
    error: error.message // "User not found" or "Invalid password"
  });
}
```

## Common Vulnerabilities to Avoid

### 1. SQL Injection
- Always use parameterized queries
- Use ORM query builders
- Never concatenate user input into SQL

### 2. Cross-Site Scripting (XSS)
- Sanitize all user input
- Use Content Security Policy headers
- Encode output

### 3. Cross-Site Request Forgery (CSRF)
- Implement CSRF tokens
- Use SameSite cookie attribute
- Verify Origin/Referer headers

### 4. Insecure Direct Object References (IDOR)
- Always verify authorization
- Use UUIDs instead of sequential IDs
- Check user permissions

### 5. Security Misconfiguration
- Keep dependencies updated
- Use security headers (Helmet.js)
- Disable unnecessary features
- Use HTTPS everywhere

### 6. Sensitive Data Exposure
- Encrypt data at rest and in transit
- Don't log sensitive information
- Use secure session management
- Implement proper access controls

### 7. Broken Authentication
- Use strong password requirements
- Implement account lockout
- Use multi-factor authentication
- Secure password reset flow

### 8. Using Components with Known Vulnerabilities
- Regular dependency updates
- Use `npm audit` or `yarn audit`
- Monitor security advisories
- Automated dependency scanning

## Security Headers

Our application uses the following security headers:

```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## Data Protection

### User Data
- Personal data encrypted at rest
- TLS 1.3 for data in transit
- Regular security audits
- GDPR compliant data handling

### Payment Data
- PCI DSS compliance via Stripe
- No credit card data stored on our servers
- Tokenized payment processing

## Incident Response

In case of a security incident:

1. **Immediate Actions**
   - Identify and contain the breach
   - Assess the scope and impact
   - Preserve evidence

2. **Communication**
   - Notify security team immediately
   - Inform affected users within 72 hours
   - Coordinate with legal team

3. **Resolution**
   - Deploy patches
   - Update security measures
   - Conduct post-mortem

4. **Follow-up**
   - Implement preventive measures
   - Update security documentation
   - Train team members

## Security Checklist for Code Reviews

- [ ] Authentication and authorization checks in place
- [ ] Input validation on all user inputs
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (input sanitization, output encoding)
- [ ] CSRF protection on state-changing operations
- [ ] Rate limiting on sensitive endpoints
- [ ] Sensitive data not exposed in responses
- [ ] Error messages don't leak information
- [ ] Passwords properly hashed (bcrypt)
- [ ] Environment variables for sensitive config
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Dependencies up to date
- [ ] Logging doesn't include sensitive data

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

## Contact

For security concerns, please contact:
- **Email**: security@teahost.com
- **PGP Key**: [Link to public key]

Thank you for helping keep TeaHost and our users safe!
