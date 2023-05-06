import { useContext, useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const Navigate = useNavigate();
  const [PasswordType, setPasswordType] = useState('password');
  const [formdata, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false); // state to toggle spinner display
  const [isError, setIsError] = useState(false); // state to toggle error display

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
        console.log(response.data);
        const token = response.data.token;
        authCtx.onLogin(token, response.data.authdata); // update AuthContext with email, password and token values
        Navigate('/');
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
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
          <br></br>
          {isError && (<div class="alert alert-danger" role="alert">Please Check Your Email & Password
          </div>)}
        </div>
      </div>
    </>
  );
}