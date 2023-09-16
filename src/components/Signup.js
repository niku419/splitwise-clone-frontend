import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios';

export default function Signup() {
    const [formData, setFormData] = useState({
        emailId: '',
        password: '',
        name: '',
        phoneNumber: ''
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
        setFormData({
            ...formData,
            roles: ["ROLE_USER"]
        });
        try {
            const response = await axios.post('http://localhost:8080/signup', formData);
            setResponse(response);
            localStorage.setItem("user", response.data.id);
        } catch (error) {
            console.error('Login error:', error);
        }
    }
return (
    <Container>
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
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button type="submit">Login</Button>
        </Form>
        <div>{JSON.stringify(response)}</div>
    </Container>
  )
}
