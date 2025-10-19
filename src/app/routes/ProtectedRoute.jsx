import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ user, allowedRoles, children }) => {
  if (!user) return <Navigate to="/login" />;
  const canAccess = user.roles.some(role =>(allowedRoles.includes(role)));
  if (!canAccess) return <Navigate to="/" />;
  return children;
};