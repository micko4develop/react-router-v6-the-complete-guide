import Books from '../components/books/books';
import Admin from '../components/admin/admin';
import BooksList from '../components/books/books-list';
import Book from '../components/books/book';
import BookEdit from '../components/books/book-edit';
import ProtectedRoute from '../common/protected-route';

// Main route configuration object
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
  },
  {
    path: '/admin',
    element: <ProtectedRoute authenticated={true} to="/" element={<Admin />} />,
    children: [
      {
        index: true,
        element: <BooksList />
      },
      {
        path: 'new',
        element: <BookEdit isEdit={false} />
      },
      {
        path: ':id',
        element: <BookEdit isEdit={true} />
      }
    ]
  }
];

// Route metadata for navigation and other purposes
export const routeMetadata = {
  '/': {
    title: 'Books',
    description: 'Browse our collection of books',
    navLabel: 'Books'
  },
  '/admin': {
    title: 'Admin',
    description: 'Admin panel for managing books',
    navLabel: 'Admin',
    requiresAuth: true
  }
};

// Helper function to get route metadata
export const getRouteMetadata = (path) => {
  return routeMetadata[path] || {};
};

// Helper function to get all navigation routes
export const getNavigationRoutes = (isAuthenticated = true) => {
  return Object.entries(routeMetadata)
    .filter(([_, metadata]) => !metadata.requiresAuth || isAuthenticated)
    .map(([path, metadata]) => ({
      path,
      ...metadata
    }));
};
