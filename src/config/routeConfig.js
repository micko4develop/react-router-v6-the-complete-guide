import { lazy } from 'react';
import ProtectedRoute from '../common/protected-route';

// Lazy load components for better performance
const Books = lazy(() => import('../components/books/books'));
const Admin = lazy(() => import('../components/admin/admin'));
const BooksList = lazy(() => import('../components/books/books-list'));
const Book = lazy(() => import('../components/books/book'));
const BookEdit = lazy(() => import('../components/books/book-edit'));

// Enhanced route configuration with metadata
export const routeConfig = {
  // Public routes
  public: [
    {
      path: '/',
      element: Books,
      children: [
        {
          index: true,
          element: BooksList,
          meta: {
            title: 'Book Collection',
            description: 'Browse our amazing collection of books'
          }
        },
        {
          path: ':id',
          element: Book,
          meta: {
            title: 'Book Details',
            description: 'View detailed information about this book'
          }
        }
      ],
      meta: {
        title: 'StarBooks',
        description: 'Your favorite online bookstore',
        navLabel: 'Books',
        showInNav: true
      }
    }
  ],
  
  // Protected routes
  protected: [
    {
      path: '/admin',
      element: Admin,
      children: [
        {
          index: true,
          element: BooksList,
          meta: {
            title: 'Admin - Book Management',
            description: 'Manage your book collection'
          }
        },
        {
          path: 'new',
          element: BookEdit,
          props: { isEdit: false },
          meta: {
            title: 'Add New Book',
            description: 'Add a new book to your collection'
          }
        },
        {
          path: ':id',
          element: BookEdit,
          props: { isEdit: true },
          meta: {
            title: 'Edit Book',
            description: 'Edit book information'
          }
        }
      ],
      meta: {
        title: 'Admin Panel',
        description: 'Administrative interface for managing books',
        navLabel: 'Admin',
        showInNav: true,
        requiresAuth: true,
        roles: ['admin', 'editor']
      }
    }
  ]
};

// Helper function to get all routes for a given authentication state
export const getRoutesForAuth = (isAuthenticated, userRoles = []) => {
  const allRoutes = [...routeConfig.public];
  
  if (isAuthenticated) {
    // Add protected routes if user has required roles
    routeConfig.protected.forEach(route => {
      if (!route.meta.roles || route.meta.roles.some(role => userRoles.includes(role))) {
        allRoutes.push({
          ...route,
          element: (props) => (
            <ProtectedRoute 
              authenticated={isAuthenticated} 
              to="/" 
              element={<route.element {...props} />} 
            />
          )
        });
      }
    });
  }
  
  return allRoutes;
};

// Helper function to get navigation items
export const getNavigationItems = (isAuthenticated, userRoles = []) => {
  const items = [];
  
  // Add public routes
  routeConfig.public.forEach(route => {
    if (route.meta.showInNav) {
      items.push({
        path: route.path,
        label: route.meta.navLabel,
        title: route.meta.title
      });
    }
  });
  
  // Add protected routes if authenticated and authorized
  if (isAuthenticated) {
    routeConfig.protected.forEach(route => {
      if (route.meta.showInNav && 
          (!route.meta.roles || route.meta.roles.some(role => userRoles.includes(role)))) {
        items.push({
          path: route.path,
          label: route.meta.navLabel,
          title: route.meta.title
        });
      }
    });
  }
  
  return items;
};

// Helper function to find route by path
export const findRouteByPath = (path, isAuthenticated = false, userRoles = []) => {
  const routes = getRoutesForAuth(isAuthenticated, userRoles);
  
  const findInRoutes = (routeList, targetPath) => {
    for (const route of routeList) {
      if (route.path === targetPath) {
        return route;
      }
      
      if (route.children) {
        const found = findInRoutes(route.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };
  
  return findInRoutes(routes, path);
};
