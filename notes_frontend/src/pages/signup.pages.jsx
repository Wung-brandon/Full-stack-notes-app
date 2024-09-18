import React from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email : "",
    username : "",
    password : "",
    confirm_password : ""
  })

  const {signUpUser, loading} = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.email.length > 1){
      if(formData.password.toLowerCase() === formData.confirm_password.toLowerCase()){
        signUpUser(formData.username, formData.email, formData.password, formData.confirm_password)
        setFormData({
          email : "",
          username : "",
          password : "",
          confirm_password : ""
        })
      }
      else{
        Swal.fire({
          title: "Password does not match",
          toast: true,
          icon: "error",
          timer: 5000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false
      });
      }
    }
  }

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#c0c0c0" }}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="shadow rounded bg-light p-4" style={{ width: '100%', maxWidth: '600px' }}>
            <h2 className="mb-4 text-center text-primary">Register User</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <FormControl
                    size="lg"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter password"
                  />
                  <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <FormControl
                    size="lg"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                    placeholder="Confirm password"
                  />
                  <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button type="submit" className="w-100 mt-3 btn-primary">
                Register
              </Button>
              <div className="mt-2">
                <p className="text-center pt-3">
                  Already have an account?
                  <Link to="/login" className="text-primary">
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUpPage;
