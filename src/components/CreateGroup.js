import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { getCookie } from '../middleware/middleware';

export default function CreateGroup({ onCreateGroup }) {
    const [emails, setEmails] = useState(['']);
    const [groupName, setGroupName] = useState('');
    
    const handleAddEmail = () => {
        setEmails([...emails, '']);
    };
    
    const handleRemoveEmail = (index) => {
        const updatedEmails = [...emails];
        updatedEmails.splice(index, 1);
        setEmails(updatedEmails);
    };
    
    const handleEmailChange = (index, value) => {
        const updatedEmails = [...emails];
        updatedEmails[index] = value;
        setEmails(updatedEmails); 
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            memberEmailIds: emails,
            name: groupName
        }
        try {
            const jwtToken = getCookie('nikcookie');
            if (jwtToken) {
                const userId = localStorage.getItem("user");
                axios.post(`http://localhost:8080/splitwise/createGroup`, formData, {
                  withCredentials: true,
                  headers: {
                      Cookie: `nikcookie=${jwtToken}`,
                  }
                })
                .then((response) => {
                  console.log('Data from secured route:', response.data);
                  onCreateGroup(response.data);
                })
                .catch((error) => {
                  console.error('Error fetching data:', error);
                });
              }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

  return (
    <Container>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Control
                type="text"
                id="groupName"
                name="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
            />
        </Form.Group>
        {emails.map((email, index) => (
          <div key={index} className='d-flex'>
            <Form.Group>
                <Form.Control
                    type="email"
                    id="emailId"
                    name="emailId"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                />
            </Form.Group>
            <Button type="button" onClick={() => handleRemoveEmail(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={handleAddEmail}>Add Email</Button>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}
