import { createElement } from 'react';
import { Route } from 'react-router-dom';

/**
 * Recursively renders routes from route configuration object
 * @param {Array} routes - Array of route configuration objects
 * @returns {Array} Array of React Route elements
 */
export const renderRoutes = (routes) => {
  if (!routes || !Array.isArray(routes)) {
    return [];
  }

  return routes.map((route, index) => {
    const { path, element, children, index: isIndex, ...otherProps } = route;
    
    const routeProps = {
      key: `${path}-${index}`,
      path: isIndex ? undefined : path,
      index: isIndex,
      element: element,
      ...otherProps
    };

    // If there are children, recursively render them
    if (children && children.length > 0) {
      return createElement(Route, routeProps, renderRoutes(children));
    }

    return createElement(Route, routeProps);
  });
};

/**
 * Creates a route element with proper key
 * @param {Object} route - Route configuration object
 * @param {number} index - Index for key generation
 * @returns {React.Element} Route element
 */
export const createRouteElement = (route, index) => {
  const { path, element, children, index: isIndex, ...otherProps } = route;
  
  const routeProps = {
    key: `${path || 'index'}-${index}`,
    path: isIndex ? undefined : path,
    index: isIndex,
    element: element,
    ...otherProps
  };

  if (children && children.length > 0) {
    return createElement(Route, routeProps, renderRoutes(children));
  }

  return createElement(Route, routeProps);
};

/**
 * Filters routes based on authentication status
 * @param {Array} routes - Array of route configuration objects
 * @param {boolean} isAuthenticated - Current authentication status
 * @returns {Array} Filtered routes
 */
export const filterAuthenticatedRoutes = (routes, isAuthenticated) => {
  return routes.filter(route => {
    // If route requires authentication, check if user is authenticated
    if (route.requiresAuth && !isAuthenticated) {
      return false;
    }
    
    // Recursively filter children
    if (route.children) {
      route.children = filterAuthenticatedRoutes(route.children, isAuthenticated);
    }
    
    return true;
  });
};

/**
 * Finds a route by path
 * @param {Array} routes - Array of route configuration objects
 * @param {string} targetPath - Path to find
 * @returns {Object|null} Found route or null
 */
export const findRouteByPath = (routes, targetPath) => {
  for (const route of routes) {
    if (route.path === targetPath) {
      return route;
    }
    
    if (route.children) {
      const found = findRouteByPath(route.children, targetPath);
      if (found) return found;
    }
  }
  
  return null;
};
