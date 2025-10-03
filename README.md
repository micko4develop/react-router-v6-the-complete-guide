# React Router v6 - Object-Based Routing Guide

A comprehensive React application demonstrating modern routing patterns with React Router v6, featuring object-based route configuration, authentication, and lazy loading.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-router-v6-the-complete-guide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. Optimized for best performance.

### `npm run eject`
**Note: This is a one-way operation!** Removes the single build dependency and copies configuration files into your project.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── admin/           # Admin panel components
│   └── books/           # Book-related components
├── common/              # Shared components (Nav, ProtectedRoute, etc.)
├── config/              # Route configurations
│   ├── routes.js        # Basic route configuration
│   └── routeConfig.js   # Enhanced route configuration
├── utils/               # Route utilities and helpers
├── examples/            # Example implementations
└── docs/                # Documentation
```

## 🛣️ Object-Based Routing

This project demonstrates modern React Router v6 patterns using object-based route configuration.

### Current Implementation (useRoutes Hook)

The app uses the `useRoutes` hook for clean, centralized routing:

```javascript
const App = () => {
  const [authenticated] = useState(true);
  const routes = useRoutes([
    {
      path: "/",
      element: <Books />,
      children: [
        {
          index: true,
          element: <BooksList />,
        },
        {
          path: ":id",
          element: <Book />,
        },
      ],
    },
    {
      path: "/admin",
      element: authenticated ? <Admin /> : <Navigate to="/" />,
      children: [
        {
          index: true,
          element: <BooksList />,
        },
        {
          path: "new",
          element: <BookEdit isEdit={false} />,
        },
        {
          path: ":id",
          element: <BookEdit isEdit={true} />,
        },
      ],
    },
  ]);

  return routes;
};
```

### Route Structure

- **`/`** - Main books page with list of books
- **`/:id`** - Individual book details
- **`/admin`** - Admin panel (protected route)
- **`/admin/new`** - Add new book
- **`/admin/:id`** - Edit existing book

## 🔐 Authentication & Authorization

The app includes a basic authentication system:

- **Protected Routes**: Admin routes require authentication
- **Route Guards**: Automatic redirection for unauthorized access
- **Role-based Access**: Support for different user roles

## ⚡ Features

### 🎯 Centralized Route Configuration
All routes are defined in configuration objects for easy maintenance.

### 🔒 Authentication Support
Built-in authentication and authorization with route protection.

### 📱 Responsive Design
Modern UI with styled-components and responsive layout.

### 🚀 Performance Optimized
- Lazy loading support
- Code splitting ready
- Optimized bundle size

### 🛠️ Developer Experience
- Hot reloading
- ESLint configuration
- Modern React patterns

## 📖 Advanced Routing Patterns

### Object-Based Configuration

The project includes multiple routing approaches:

1. **Basic Object-Based** (`src/config/routes.js`)
2. **Enhanced Configuration** (`src/config/routeConfig.js`)
3. **useRoutes Hook** (Current implementation)

### Route Metadata

Routes can include metadata for navigation, SEO, and other purposes:

```javascript
{
  path: '/admin',
  element: Admin,
  meta: {
    title: 'Admin Panel',
    navLabel: 'Admin',
    requiresAuth: true,
    roles: ['admin', 'editor']
  }
}
```

### Dynamic Navigation

Navigation is generated automatically based on route configuration:

```javascript
const navigationItems = getNavigationItems(isAuthenticated, userRoles);
```

## 🔧 Customization

### Adding New Routes

1. **Update route configuration** in `App.js`
2. **Create component** in appropriate directory
3. **Add navigation link** if needed

### Authentication

Modify the authentication logic in `App.js`:

```javascript
const [authenticated, setAuthenticated] = useState(false);
```

### Styling

The app uses styled-components. Modify styles in individual component files.

## 📚 Learning Resources

- [React Router v6 Documentation](https://reactrouter.com/)
- [React Documentation](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.

## 🆘 Troubleshooting

### Common Issues

**App won't start:**
- Ensure Node.js v14+ is installed
- Run `npm install` to install dependencies
- Check for port conflicts (default: 3000)

**Routes not working:**
- Verify route configuration in `App.js`
- Check browser console for errors
- Ensure all components are properly imported

**Styling issues:**
- Verify styled-components is installed
- Check for CSS conflicts
- Ensure proper component imports

### Getting Help

- Check the browser console for error messages
- Review the component structure
- Refer to React Router v6 documentation

---

**Happy Coding! 🎉**

For more detailed documentation, see `src/docs/OBJECT_BASED_ROUTING.md`