import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, redirectTo }: any) => {
  let isAuthenticated = JSON.parse(sessionStorage.getItem('auth') || 'false');
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
