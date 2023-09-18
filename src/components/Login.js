import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

export default function Login() {
    const [formData, setFormData] = useState({
        emailId: '',
        password: '',
    });
    const [response, setResponse] = useState();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/signin', formData);
            setResponse(response);
            localStorage.setItem("userId", response.data.id);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

  return (
    <Container className='mt-3'>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                    type="email"
                    id="emailId"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button type="submit">Login</Button>
        </Form>
        <div>{JSON.stringify(response)}</div>
    </Container>
  )
}
 