import { Navigate } from 'react-router-dom'

const LoginProtected = ({ children, redirectTo, condition }: any) => {
  return condition ? children : <Navigate to={redirectTo} />
}

export default LoginProtected
