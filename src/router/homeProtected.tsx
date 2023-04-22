import { Navigate } from 'react-router-dom';

const HomeProtected = ({ children, redirectTo, condition }: any) => {
  return condition ? children : <Navigate to={redirectTo} />;
};

export default HomeProtected;
