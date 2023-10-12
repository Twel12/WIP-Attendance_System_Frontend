import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import { AuthContextProvider } from './store/auth-context';
import AuthContext from './store/auth-context';
import { useEffect, useState, useContext } from 'react';
import Admin2 from './pages/AdminAddSubject';

function App() {
  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  );
}

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setIsAuthenticated(authCtx.isLoggedIn);
  }, [authCtx.isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <HomePage />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/addsubject" element = {<Admin2/>}/>
      </Routes>
    </Router>
  );
}

export default App;
