# Contributing to TeaHost

First off, thank you for considering contributing to TeaHost! It's people like you that make TeaHost such a great platform.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. iOS, Windows]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- A clear and descriptive title
- A detailed description of the proposed functionality
- Explain why this enhancement would be useful
- List any alternatives you've considered

### Pull Requests

#### Process

1. Fork the repo and create your branch from `main` or `develop`
2. Follow the coding standards outlined below
3. Make your changes
4. Write or update tests as needed
5. Ensure all tests pass
6. Update documentation as needed
7. Submit a pull request

#### Pull Request Template
```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested on multiple browsers (if applicable)

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] Any dependent changes have been merged and published

## Related Issues
Closes #(issue number)
```

## Coding Standards

### JavaScript/TypeScript

**Style Guide**: We follow the Airbnb JavaScript Style Guide with some modifications

#### General Rules

```javascript
// Use 2 spaces for indentation
function example() {
  console.log('Hello');
}

// Use single quotes for strings
const name = 'TeaHost';

// Use template literals for string interpolation
const greeting = `Welcome to ${name}`;

// Use const for variables that won't be reassigned
const MAX_USERS = 100;

// Use let for variables that will be reassigned
let count = 0;

// Use descriptive variable names
// Bad
const x = getUserData();

// Good
const userData = getUserData();

// Use async/await instead of callbacks
// Bad
getUser(id, (error, user) => {
  // handle user
});

// Good
async function loadUser(id) {
  try {
    const user = await getUser(id);
    return user;
  } catch (error) {
    console.error(error);
  }
}
```

#### Naming Conventions

```javascript
// Variables and functions: camelCase
const userName = 'John';
function getUserProfile() {}

// Classes and Components: PascalCase
class UserService {}
const ProfileCard = () => {};

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.teahost.com';

// Private variables/methods: underscore prefix (optional)
const _privateVariable = 'private';
function _privateMethod() {}

// Boolean variables: descriptive and question-like
const isAuthenticated = true;
const hasPermission = false;
const shouldRender = true;
```

#### Functions

```javascript
// Use arrow functions for short callbacks
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// Use regular functions for methods that need 'this'
const user = {
  name: 'John',
  greet() {
    return `Hello, ${this.name}`;
  }
};

// Always use async/await for asynchronous operations
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Destructure objects in function parameters
// Bad
function renderUser(user) {
  return `${user.firstName} ${user.lastName}`;
}

// Good
function renderUser({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

#### Comments

```javascript
// Use JSDoc for functions
/**
 * Fetches user data from the API
 * @param {string} userId - The ID of the user to fetch
 * @returns {Promise<Object>} User data object
 * @throws {Error} If user is not found
 */
async function fetchUser(userId) {
  // Implementation
}

// Use inline comments sparingly and only when necessary
// Explain WHY, not WHAT
// Bad
// Set count to 0
let count = 0;

// Good
// Reset count before starting new batch
let count = 0;
```

### React/JSX

```jsx
// Components should be in PascalCase
const UserProfile = ({ user }) => {
  // Hooks at the top
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  // Event handlers with 'handle' prefix
  const handleClick = () => {
    console.log('Clicked');
  };

  // Early returns for conditionals
  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <EmptyState />;
  }

  // Main render
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <button onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
};

// PropTypes or TypeScript for type checking
UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
```

### CSS/Styling

```css
/* Use BEM naming convention or CSS Modules */
.user-profile {}
.user-profile__header {}
.user-profile__avatar {}
.user-profile__name--highlighted {}

/* Use CSS variables for theming */
:root {
  --primary-color: #e07a5f;
  --secondary-color: #81b29a;
  --font-family: 'Inter', sans-serif;
}

/* Mobile-first approach */
.component {
  /* Mobile styles */
  padding: 1rem;
}

@media (min-width: 768px) {
  /* Tablet styles */
  .component {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  /* Desktop styles */
  .component {
    padding: 3rem;
  }
}
```

### Git Commit Messages

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(auth): add social login with Google

Implemented OAuth2 flow for Google authentication.
Users can now sign in using their Google account.

Closes #123

---

fix(booking): correct price calculation for multiple guests

The total price was not multiplying correctly when
guests > 1. Fixed the calculation logic.

Fixes #456

---

docs(readme): update installation instructions

Added Docker setup instructions and troubleshooting section.
```

## Testing

### Writing Tests

#### Unit Tests

```javascript
// backend/tests/services/auth.test.js
describe('AuthService', () => {
  describe('register', () => {
    it('should create a new user with hashed password', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe'
      };

      const user = await AuthService.register(userData);

      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password); // Should be hashed
      expect(user.id).toBeDefined();
    });

    it('should throw error if email already exists', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
      };

      await expect(
        AuthService.register(userData)
      ).rejects.toThrow('Email already in use');
    });
  });
});
```

#### Integration Tests

```javascript
// backend/tests/api/auth.test.js
describe('POST /api/auth/register', () => {
  it('should register new user and return tokens', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'newuser@example.com',
        password: 'SecurePass123!',
        firstName: 'Jane',
        lastName: 'Smith'
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('accessToken');
    expect(response.body.data).toHaveProperty('refreshToken');
    expect(response.body.data.user).toHaveProperty('email', 'newuser@example.com');
  });
});
```

#### Component Tests (React)

```jsx
// frontend/tests/components/HostCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import HostCard from '../components/HostCard';

describe('HostCard', () => {
  const mockHost = {
    id: '1',
    name: 'Maria Garcia',
    city: 'Barcelona',
    rating: 4.8,
    reviewCount: 23,
    pricePerSession: 25,
  };

  it('renders host information correctly', () => {
    render(<HostCard host={mockHost} />);

    expect(screen.getByText('Maria Garcia')).toBeInTheDocument();
    expect(screen.getByText('Barcelona')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
  });

  it('calls onFavorite when favorite button is clicked', () => {
    const onFavorite = jest.fn();
    render(<HostCard host={mockHost} onFavorite={onFavorite} />);

    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    fireEvent.click(favoriteButton);

    expect(onFavorite).toHaveBeenCalledWith(mockHost.id);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- auth.test.js

# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test
```

## Database Migrations

When making database changes:

1. Create a new migration file
```bash
npm run migration:create -- add_user_preferences
```

2. Write up and down migrations
```javascript
// migrations/20240101000000-add_user_preferences.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'preferences', {
      type: Sequelize.JSONB,
      defaultValue: {},
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'preferences');
  },
};
```

3. Test migration
```bash
npm run migrate
npm run migrate:undo
```

## Documentation

- Update README.md if you change setup or usage
- Add JSDoc comments to all public functions
- Update API documentation if you add/modify endpoints
- Create or update architectural diagrams if needed
- Add inline comments for complex logic

## Review Process

1. All pull requests require at least one approval
2. CI/CD tests must pass
3. Code coverage should not decrease
4. No linting errors
5. Documentation updated as needed

## Getting Help

- Check existing documentation
- Search existing issues
- Ask in discussions
- Join our community chat (link TBD)
- Email: dev@teahost.com

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project README
- Community highlights

Thank you for contributing to TeaHost! 🎉
