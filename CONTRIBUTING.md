# Contributing to Weather App

First off, thank you for considering contributing to Weather App! It's people like you that make Weather App such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How Can I Contribute?](#how-can-i-contribute)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/your-username/weather.git
cd weather
```

3. Add the upstream repository:
```bash
git remote add upstream https://github.com/original-owner/weather.git
```

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file for your API key:
```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

3. Start the development server:
```bash
npm start
```

4. Run tests:
```bash
npm test
```

5. Build for production:
```bash
npm run build
```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. Windows 10, macOS 12.0]
- Browser: [e.g. Chrome 95, Firefox 93]
- Node Version: [e.g. 16.13.0]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title** - Use a clear and descriptive title
- **Detailed description** - Provide a step-by-step description of the enhancement
- **Examples** - Provide specific examples to demonstrate the enhancement
- **Current behavior** - Explain the current behavior
- **Desired behavior** - Explain the desired behavior and why it's useful

### Your First Code Contribution

Unsure where to begin? You can start by looking through these issue labels:

- `good-first-issue` - Issues that are good for newcomers
- `help-wanted` - Issues that need assistance
- `bug` - Bug fixes
- `enhancement` - New features or improvements

### Pull Requests

1. Create a new branch for your feature:
```bash
git checkout -b feature/amazing-feature
```

2. Make your changes and commit them:
```bash
git add .
git commit -m "Add amazing feature"
```

3. Push to your fork:
```bash
git push origin feature/amazing-feature
```

4. Open a Pull Request on GitHub

## Style Guidelines

### JavaScript Style Guide

We follow modern JavaScript best practices:

#### General Rules

- Use ES6+ syntax (arrow functions, destructuring, etc.)
- Use `const` by default, `let` only when reassignment is needed
- Never use `var`
- Use meaningful variable and function names
- Keep functions small and focused on a single task
- Add comments for complex logic

#### Code Examples

**Good:**
```javascript
// Fetch weather data for a specific city
const getWeatherInfo = async (cityName) => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    throw error;
  }
};
```

**Bad:**
```javascript
// Don't use var
var city = "London";

// Don't use unclear names
const gwd = async (c) => {
  var r = await fetch(url);
  return r.json();
};
```

### React Component Guidelines

#### Component Structure

```jsx
import React, { useState, useEffect } from 'react';

/**
 * Component description
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Prop description
 */
const MyComponent = ({ name }) => {
  // State declarations
  const [value, setValue] = useState('');
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

#### Component Best Practices

1. **Use Functional Components** with hooks
2. **Props destructuring** in function parameters
3. **PropTypes** for type checking (optional but recommended)
4. **Meaningful names** for components and props
5. **Single Responsibility** - each component should do one thing well
6. **Reusability** - create reusable components when possible

### CSS Style Guide

- Use meaningful class names
- Follow BEM naming convention when applicable
- Group related styles together
- Use CSS variables for repeated values
- Mobile-first responsive design

**Example:**
```css
/* Component-specific styles */
.weather-card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
}

.weather-card__title {
  font-size: var(--font-size-lg);
  font-weight: bold;
}

.weather-card__content {
  margin-top: var(--spacing-sm);
}
```

### Documentation Style Guide

#### JSDoc Comments

Use JSDoc comments for all functions and components:

```javascript
/**
 * Fetches weather data from the API
 * 
 * @async
 * @function getWeatherInfo
 * @param {string} city - The city name to fetch weather for
 * @returns {Promise<WeatherInfo>} Weather information object
 * @throws {Error} If the API request fails
 * 
 * @example
 * const weather = await getWeatherInfo('London');
 * console.log(weather.temp);
 */
const getWeatherInfo = async (city) => {
  // Implementation
};
```

#### Inline Comments

- Use comments to explain "why", not "what"
- Keep comments concise and relevant
- Update comments when updating code

**Good:**
```javascript
// Convert Unix timestamp to local time for display
const timeStr = new Date(sunset * 1000).toLocaleTimeString();
```

**Bad:**
```javascript
// Set timeStr variable
const timeStr = new Date(sunset * 1000).toLocaleTimeString();
```

## Commit Messages

### Commit Message Format

We follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type

Must be one of:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding or correcting tests
- **chore**: Changes to build process or auxiliary tools

#### Examples

```
feat(weathercard): add temperature unit toggle

Add ability to switch between Celsius and Fahrenheit.
Users can now click a button to toggle temperature units.

Closes #123
```

```
fix(api): handle 404 errors gracefully

Previously, 404 errors would crash the app. Now they display
a user-friendly error message.

Fixes #456
```

```
docs(readme): update installation instructions

Add more detailed steps for setting up the development environment.
```

### Commit Best Practices

- Write clear, concise commit messages
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the subject line to 50 characters
- Wrap the body at 72 characters
- Reference issues and pull requests in the footer

## Pull Request Process

### Before Submitting

1. **Test your changes** - Ensure all tests pass
2. **Update documentation** - Update README, API docs, or comments
3. **Follow style guidelines** - Run linting and fix any issues
4. **Write tests** - Add tests for new features
5. **Update CHANGELOG** - Add entry for your changes

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe the tests you ran:
- Test 1
- Test 2

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
```

### Review Process

1. Submit your PR with a clear description
2. Wait for maintainer review (usually within 2-3 days)
3. Address review comments
4. Once approved, a maintainer will merge your PR

## Documentation

### When to Update Documentation

Update documentation when you:
- Add a new feature
- Change an API
- Fix a bug that affects usage
- Change configuration options
- Update dependencies

### Documentation Files

- `README.md` - General project information and quick start
- `API_DOCUMENTATION.md` - Comprehensive API reference
- `QUICK_REFERENCE.md` - Quick reference guide
- `CONTRIBUTING.md` - This file
- Code comments - JSDoc comments in source files

### Documentation Standards

- Write clear, concise explanations
- Include code examples
- Keep documentation up-to-date with code changes
- Use proper markdown formatting
- Add links to related documentation

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

Write tests for:
- New features
- Bug fixes
- Edge cases
- API integrations

**Example Test:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Weathercard from './weathercard';

describe('Weathercard Component', () => {
  const mockProps = {
    temp: 25,
    humidity: 60,
    pressure: 1013,
    weathermood: "Clear",
    name: "London",
    speed: 5.5,
    country: "UK",
    sunset: 1699200000
  };

  test('renders temperature correctly', () => {
    render(<Weathercard {...mockProps} />);
    expect(screen.getByText(/25°/)).toBeInTheDocument();
  });

  test('displays city and country', () => {
    render(<Weathercard {...mockProps} />);
    expect(screen.getByText(/London, UK/)).toBeInTheDocument();
  });
});
```

## Community

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and discussions
- **Pull Requests** - Code contributions

### Getting Help

If you need help:
1. Check the [API Documentation](./API_DOCUMENTATION.md)
2. Search existing issues
3. Ask in GitHub Discussions
4. Create a new issue with the `question` label

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to Weather App! 🌤️

**Happy Coding!** 🚀
