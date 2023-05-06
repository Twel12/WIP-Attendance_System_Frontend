import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreateSubject = () => {
  const [isLoading, setIsLoading] = useState(false); // state to toggle spinner display
  const [isError, setIsError] = useState(false); // state to toggle error display
  const [isSuccess, setIsSuccess] = useState(false); // state to toggle success display
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    teacher: '',
    semester: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const response = await axios.post('http://localhost:3001/subjects', formData);
      console.log(response.data);
      setIsSuccess(true);
      setFormData({
        name: '',
        code: '',
        teacher: '',
        semester: ''
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
          placeholder="Enter subject name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCode">
        <Form.Label>Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter subject code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formTeacher">
        <Form.Label>Teacher</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter teacher name"
          name="teacher"
          value={formData.teacher}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formSemester">
        <Form.Label>Semester</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Subject
      </Button>
      {isLoading && (
        <div className="spinner-border m-4" role="status">
          <span className="sr-only"></span>
        </div>
      )}
      <br />
      {isError && (
        <div className="alert alert-danger" role="alert">
          There was an error creating the subject. Please try again.
        </div>
        )}
        {isSuccess && (
            <div className="alert alert-success" role="alert">
                Subject created successfully!
            </div>
        )}
    </Form>
    );
};

export default CreateSubject;