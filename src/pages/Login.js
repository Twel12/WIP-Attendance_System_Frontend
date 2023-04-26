import { useContext, useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import AuthContext from '../store/auth-context';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const Navigate = useNavigate();
  const [PasswordType, setPasswordType] = useState('password');
  const [formdata, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false); // state to toggle spinner display

  const authCtx = useContext(AuthContext);

  const PasswordToggle = () => {
    setPasswordType((prevType) =>
      prevType === 'password' ? 'text' : 'password'
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        {
          email: formdata.email,
          password: formdata.password,
        }
      );
      if (response.status === 200) {
        const token = response.data.token;
        authCtx.onLogin(formdata.email, formdata.password, token); // update AuthContext with email, password and token values
        Navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  useEffect(() => {
    if (authCtx.isLoggedIn) {
      Navigate('/');
    }
  }, [authCtx.isLoggedIn, Navigate]);

  return (
    <>
      <div className="App">
        <div className="LoginBox">
          <h1 id="login_heading">Login</h1>
          <br></br>
          Current Auth state is: {authCtx.isLoggedIn.toString()}
          <form className="login_form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="user email"
              aria-label="user email"
              onChange={handleChange}
              value={formdata.email}
            ></input>
            <br></br>
            <input
              type={PasswordType}
              className="form-control"
              name="password"
              placeholder="password"
              aria-label="Password"
              onChange={handleChange}
              value={formdata.password}
            ></input>
            <br></br>
            <button
              type="button"
              className="btn btn-primary"
              onClick={PasswordToggle}
            >
              Toggle Password
            </button>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          {isLoading && ( // display spinner when isLoading is true
            <div className="spinner-border m-4" role="status">
              <span className="sr-only"></span>
            </div>
          )}
        </div>
        {/* Bootstrap JS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossOrigin="anonymous"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
          crossOrigin="anonymous"
        ></script>
      </div>
    </>
  );
}
