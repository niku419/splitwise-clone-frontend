import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCookie } from '../middleware/middleware';
import SecureRoute from './SecureRoute';
import axios from 'axios';

export default function Groups({ data, onGroupDelete }) {
  const deleteGroup = async (groupId) => {
    try {
        const jwtToken = getCookie('nikcookie');
        if (jwtToken) {
            const response = await axios.delete(`http://localhost:8080/splitwise/group/${groupId}/delete`, {
                withCredentials: true,
                headers: {
                    Cookie: `nikcookie=${jwtToken}`,
                }
            });
            console.log(response);
            const updatedData = data.filter((group) => group.id !== groupId);
            onGroupDelete(updatedData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <SecureRoute>
        <Container>
            <Row xs={1} md={2} lg={4} className="g-4">
            {data.length > 0 && data.map((group) => (
                <Col key={group.id}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{group.name}</Card.Title>
                            <Link to={`/${group.id}/expenses`} state={group.expenses}>expenses</Link>
                            <Link to={`/${group.id}/users`} state={group.users}>users</Link>
                            <Button variant="primary" onClick={() => deleteGroup(group.id)}>Delete group</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
    </SecureRoute>
  );
}
