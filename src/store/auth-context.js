import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  onLogin: (email, password, token) => {},
  onLogout: () => {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const loginHandler = (email, password, token) => {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem('token');
  };

  const contextValue = {
    isLoggedIn: isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
