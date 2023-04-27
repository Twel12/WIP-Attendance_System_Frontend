import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  onLogin: (email, password, token,data) => {},
  onLogout: () => {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setData(JSON.parse(localStorage.getItem('data')));
    }
  }, []);

  const loginHandler = (email, password, token,data) => {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem('token', token);
    setData(data);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem('token');
    data = null;
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
