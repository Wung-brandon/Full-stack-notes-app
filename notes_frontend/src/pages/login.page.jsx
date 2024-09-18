import React, { useContext } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {loginUser} = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email : "",
    password : ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.email.length > 1){
        loginUser(formData.email, formData.password)
        setFormData({
            email : "",
            password : ""
        })
    }
    
  }
 

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name] : e.target.value
    })
    
    
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#c0c0c0" }}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="shadow rounded bg-light p-4" style={{ width: '100%', maxWidth: '600px' }}>
            <h2 className="mb-4 text-center text-primary">Login User</h2>
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


              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <FormControl
                    size="lg"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="Enter password"
                  />
                  <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button type="submit" className="w-100 mt-3 btn-primary">
                Login
              </Button>
              <div className="mt-2">
                <p className="text-center pt-3">
                  Don't have an account?
                  <Link to="/signup" className="text-primary">
                    Signup
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
