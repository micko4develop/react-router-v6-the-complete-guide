# Object-Based Routing Setup

This document explains the object-based routing configuration implemented in this React Router v6 application.

## Overview

The object-based routing system provides a centralized, maintainable way to manage routes with support for:
- Authentication and authorization
- Lazy loading
- Route metadata
- Dynamic navigation generation
- Role-based access control

## File Structure

```
src/
├── config/
│   ├── routes.js              # Basic route configuration
│   └── routeConfig.js         # Enhanced route configuration with metadata
├── utils/
│   ├── routeUtils.js          # Basic route utilities
│   └── enhancedRouteUtils.js  # Enhanced utilities with lazy loading
├── examples/
│   └── RoutingExample.jsx     # Example implementation
└── docs/
    └── OBJECT_BASED_ROUTING.md # This documentation
```

## Basic Setup

### 1. Route Configuration (`src/config/routes.js`)

```javascript
export const routes = [
  {
    path: '/',
    element: <Books />,
    children: [
      {
        index: true,
        element: <BooksList />
      },
      {
        path: ':id',
        element: <Book />
      }
    ]
  }
];
```

### 2. Route Utilities (`src/utils/routeUtils.js`)

```javascript
import { renderRoutes } from './utils/routeUtils';

// In your App component
<Routes>
  {renderRoutes(routes)}
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
```

## Enhanced Setup

### 1. Enhanced Route Configuration (`src/config/routeConfig.js`)

```javascript
export const routeConfig = {
  public: [
    {
      path: '/',
      element: Books,
      meta: {
        title: 'StarBooks',
        navLabel: 'Books',
        showInNav: true
      }
    }
  ],
  protected: [
    {
      path: '/admin',
      element: Admin,
      meta: {
        title: 'Admin Panel',
        navLabel: 'Admin',
        showInNav: true,
        requiresAuth: true,
        roles: ['admin', 'editor']
      }
    }
  ]
};
```

### 2. Enhanced Route Rendering

```javascript
import { renderEnhancedRoutes } from './utils/enhancedRouteUtils';

// In your App component
<Routes>
  {renderEnhancedRoutes(isAuthenticated, userRoles)}
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
```

## Features

### Authentication & Authorization

Routes can be marked as requiring authentication and specific roles:

```javascript
{
  path: '/admin',
  element: Admin,
  meta: {
    requiresAuth: true,
    roles: ['admin', 'editor']
  }
}
```

### Lazy Loading

Components are automatically lazy-loaded for better performance:

```javascript
const Books = lazy(() => import('../components/books/books'));
```

### Route Metadata

Each route can have metadata for navigation, titles, and descriptions:

```javascript
meta: {
  title: 'Book Collection',
  description: 'Browse our amazing collection of books',
  navLabel: 'Books',
  showInNav: true
}
```

### Dynamic Navigation

Navigation items are generated automatically based on route configuration:

```javascript
import { getNavigationItems } from './config/routeConfig';

const navigationItems = getNavigationItems(isAuthenticated, userRoles);
```

## Usage Examples

### Basic Usage

```javascript
import { routes } from './config/routes';
import { renderRoutes } from './utils/routeUtils';

function App() {
  return (
    <Router>
      <Routes>
        {renderRoutes(routes)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
```

### With Authentication

```javascript
import { renderEnhancedRoutes } from './utils/enhancedRouteUtils';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState(['user']);
  
  return (
    <Router>
      <Routes>
        {renderEnhancedRoutes(isAuthenticated, userRoles)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
```

### Dynamic Navigation

```javascript
import { getNavigationItems } from './config/routeConfig';

function Navigation() {
  const navigationItems = getNavigationItems(isAuthenticated, userRoles);
  
  return (
    <nav>
      {navigationItems.map(item => (
        <NavLink key={item.path} to={item.path}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
```

## Benefits

1. **Centralized Configuration**: All routes are defined in one place
2. **Type Safety**: Route configuration can be easily typed with TypeScript
3. **Maintainability**: Easy to add, remove, or modify routes
4. **Reusability**: Route utilities can be used across different components
5. **Performance**: Lazy loading reduces initial bundle size
6. **Security**: Built-in authentication and authorization support
7. **SEO**: Route metadata can be used for SEO optimization

## Migration from Traditional Routing

### Before (Traditional)
```javascript
<Routes>
  <Route path="/" element={<Books />}>
    <Route index element={<BooksList />} />
    <Route path=":id" element={<Book />} />
  </Route>
  <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
    <Route index element={<BooksList />} />
    <Route path="new" element={<BookEdit isEdit={false} />} />
    <Route path=":id" element={<BookEdit isEdit={true} />} />
  </Route>
</Routes>
```

### After (Object-Based)
```javascript
<Routes>
  {renderEnhancedRoutes(isAuthenticated, userRoles)}
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
```

## Best Practices

1. **Keep route configuration separate** from component logic
2. **Use meaningful metadata** for better maintainability
3. **Implement proper error boundaries** for lazy-loaded components
4. **Test route configurations** thoroughly
5. **Use TypeScript** for better type safety
6. **Document route requirements** clearly
