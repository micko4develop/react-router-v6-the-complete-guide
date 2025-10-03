import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { renderEnhancedRoutes } from '../utils/enhancedRouteUtils';
import { getNavigationItems } from '../config/routeConfig';

/**
 * Example component demonstrating object-based routing
 * This shows how to use the enhanced routing system with:
 * - Authentication state management
 * - Role-based access control
 * - Lazy loading
 * - Dynamic navigation
 */
const RoutingExample = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState(['user']); // Default role
  
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };
  
  const toggleAdminRole = () => {
    if (userRoles.includes('admin')) {
      setUserRoles(userRoles.filter(role => role !== 'admin'));
    } else {
      setUserRoles([...userRoles, 'admin']);
    }
  };
  
  const navigationItems = getNavigationItems(isAuthenticated, userRoles);
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Object-Based Routing Example</h1>
      
      {/* Authentication Controls */}
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>Authentication Controls</h3>
        <label>
          <input 
            type="checkbox" 
            checked={isAuthenticated} 
            onChange={toggleAuth}
          />
          Authenticated
        </label>
        <br />
        <label>
          <input 
            type="checkbox" 
            checked={userRoles.includes('admin')} 
            onChange={toggleAdminRole}
          />
          Admin Role
        </label>
        <p>Current roles: {userRoles.join(', ')}</p>
      </div>
      
      {/* Dynamic Navigation */}
      <nav style={{ marginBottom: '20px' }}>
        <h3>Available Routes:</h3>
        {navigationItems.map(item => (
          <a 
            key={item.path} 
            href={item.path}
            style={{ 
              marginRight: '10px', 
              padding: '5px 10px', 
              backgroundColor: '#f0f0f0',
              textDecoration: 'none',
              borderRadius: '3px'
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      
      {/* Router with Object-Based Routes */}
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {renderEnhancedRoutes(isAuthenticated, userRoles)}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default RoutingExample;
