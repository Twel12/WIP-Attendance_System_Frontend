import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false); // state to toggle spinner display
  const [isError, setIsError] = useState(false); // state to toggle error display
  const [isSuccess, setIsSuccess] = useState(false); // state to toggle success display
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    SysID: '',
    password: '',
    isAdmin: false,
    isStudent: { value: true, Batch: '' },
    isTeacher: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let value = checked;

    // Ensure only one checkbox is ticked at a time
    if (name === 'isStudent.value') {
      setFormData((prevState) => ({
        ...prevState,
        isStudent: { value: value, Batch: '' },
        isTeacher: false,
        isAdmin: false
      }));
    } else if (name === 'isTeacher') {
      setFormData((prevState) => ({
        ...prevState,
        isStudent: { value: false, Batch: '' },
        isTeacher: value,
        isAdmin: false
      }));
    } else if (name === 'isAdmin') {
      setFormData((prevState) => ({
        ...prevState,
        isStudent: { value: false, Batch: '' },
        isTeacher: false,
        isAdmin: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const response = await axios.post('http://localhost:3001/auth/signup', formData);
      console.log(response.data);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        SysID: '',
        password: '',
        isAdmin: false,
        isStudent: { value: true, Batch: '' },
        isTeacher: false
      });
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formSysID">
        <Form.Label>System ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter system ID"
          name="SysID"
          value={formData.SysID}
          onChange={handleChange}
          required
        />
      </Form.Group>
    
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>
    
      <Form.Group controlId="formIsStudent">
        <Form.Check
          type="checkbox"
          label="Student"
          name="isStudent.value"
          checked={formData.isStudent.value}
          onChange={handleCheckboxChange}
        />
        {formData.isStudent.value && (
          <Form.Control
            type="text"
            placeholder="Enter batch"
            name="isStudent.Batch"
            value={formData.isStudent.Batch}
            onChange={handleChange}
            required
          />
        )}
      </Form.Group>
    
      <Form.Group controlId="formIsTeacher">
        <Form.Check
          type="checkbox"
          label="Teacher"
          name="isTeacher"
          checked={formData.isTeacher}
          onChange={handleCheckboxChange}
        />
      </Form.Group>
    
      <Form.Group controlId="formIsAdmin">
        <Form.Check
          type="checkbox"
          label="Admin"
          name="isAdmin"
          checked={formData.isAdmin}
          onChange={handleCheckboxChange}
        />
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {isLoading && (
        <div className="spinner-border m-4" role="status">
          <span className="sr-only"></span>
        </div>
      )}
      <br />
      {isError && (
        <div className="alert alert-danger" role="alert">
          Please Insert Valid Data
        </div>
        )}
        {isSuccess && (
            <div className="alert alert-success" role="alert">
                User Added Successfully
            </div>
        )}
    </Form>
    );
};

export default SignUpForm;