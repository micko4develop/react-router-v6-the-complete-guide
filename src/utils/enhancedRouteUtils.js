import { createElement, Suspense } from 'react';
import { getRoutesForAuth } from '../config/routeConfig';

/**
 * Enhanced route renderer with lazy loading and authentication support
 * @param {boolean} isAuthenticated - Current authentication status
 * @param {Array} userRoles - User roles for authorization
 * @returns {Array} Array of React Route elements
 */
export const renderEnhancedRoutes = (isAuthenticated = false, userRoles = []) => {
  const routes = getRoutesForAuth(isAuthenticated, userRoles);
  
  return routes.map((route, index) => {
    return createRouteElement(route, index, isAuthenticated, userRoles);
  });
};

/**
 * Creates a route element with lazy loading and authentication
 * @param {Object} route - Route configuration object
 * @param {number} index - Index for key generation
 * @param {boolean} isAuthenticated - Authentication status
 * @param {Array} userRoles - User roles
 * @returns {React.Element} Route element
 */
export const createRouteElement = (route, index, isAuthenticated = false, userRoles = []) => {
  const { path, element: Element, children, index: isIndex, props = {}, meta = {}, ...otherProps } = route;
  
  // Create the element with proper props
  const elementWithProps = typeof Element === 'function' ? 
    createElement(Element, { ...props, ...otherProps }) : 
    Element;
  
  // Wrap with Suspense for lazy loading
  const elementWithSuspense = createElement(
    Suspense,
    { 
      fallback: createElement('div', { 
        style: { 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px' 
        } 
      }, 'Loading...') 
    },
    elementWithProps
  );
  
  const routeProps = {
    key: `${path || 'index'}-${index}`,
    path: isIndex ? undefined : path,
    index: isIndex,
    element: elementWithSuspense,
    ...otherProps
  };

  // If there are children, recursively render them
  if (children && children.length > 0) {
    const childRoutes = children.map((child, childIndex) => 
      createRouteElement(child, childIndex, isAuthenticated, userRoles)
    );
    
    return createElement('Route', routeProps, childRoutes);
  }

  return createElement('Route', routeProps);
};

/**
 * Creates a route guard component
 * @param {Object} route - Route configuration
 * @param {boolean} isAuthenticated - Authentication status
 * @param {Array} userRoles - User roles
 * @returns {React.Element} Protected route element
 */
export const createRouteGuard = (route, isAuthenticated, userRoles) => {
  const { meta = {} } = route;
  
  // Check authentication
  if (meta.requiresAuth && !isAuthenticated) {
    return createElement('Navigate', { to: '/login', replace: true });
  }
  
  // Check roles
  if (meta.roles && !meta.roles.some(role => userRoles.includes(role))) {
    return createElement('Navigate', { to: '/unauthorized', replace: true });
  }
  
  return null; // No guard needed
};

/**
 * Generates breadcrumbs for a given path
 * @param {string} path - Current path
 * @param {boolean} isAuthenticated - Authentication status
 * @param {Array} userRoles - User roles
 * @returns {Array} Breadcrumb items
 */
export const generateBreadcrumbs = (path, isAuthenticated = false, userRoles = []) => {
  const routes = getRoutesForAuth(isAuthenticated, userRoles);
  const pathSegments = path.split('/').filter(Boolean);
  const breadcrumbs = [];
  
  let currentPath = '';
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    const route = findRouteByPath(currentPath, isAuthenticated, userRoles);
    if (route && route.meta) {
      breadcrumbs.push({
        path: currentPath,
        label: route.meta.title || segment,
        isLast: index === pathSegments.length - 1
      });
    }
  });
  
  return breadcrumbs;
};

/**
 * Helper function to find route by path (imported from routeConfig)
 */
import { findRouteByPath } from '../config/routeConfig';
