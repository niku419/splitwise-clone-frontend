import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCookie } from '../middleware/middleware';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

export default function GroupUsers() {

  const location = useLocation();
  const data = location.state || {};
  const { id } = useParams();
  const [users, setUsers] = useState(data);
  const [emails, setEmails] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      memberEmailIds: emails,
      groupId: id
    }

    try {
      const jwtToken = getCookie('nikcookie');
      if (jwtToken) {
        axios.post(`http://localhost:8080/splitwise/groups/${id}/addUsers`, formData, {
          withCredentials: true,
          headers: {
              Cookie: `nikcookie=${jwtToken}`,
          }
        })
        .then((response) => {
          console.log('Data from secured route:', response.data);
          setReloadUsers(true)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      }
    } catch (error) {
        console.error('Login error:', error);
    }
  }

  useEffect(() => {
    const jwtToken = getCookie('nikcookie');

    if (jwtToken) {
        axios.get(`http://localhost:8080/splitwise/group/${id}/users`, {
        withCredentials: true,
        headers: {
          Cookie: `nikcookie=${jwtToken}`,
        }
      })
      .then((response) => {
        setUsers(response.data);
        console.log('Data from secured route:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  }, [reloadUsers])
  
  return (
    <div>{JSON.stringify(users)} 
      <Container>
        <Form onSubmit={handleSubmit}>
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
    </div>
  )
}
