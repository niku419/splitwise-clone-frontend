import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Groups({ data }) {
    
  return (
    <Container>
        <Row xs={1} md={2} lg={4} className="g-4">
        {data.length > 0 && data.map((group, idx) => (
            <Col key={idx}>
                <Card>
                    <Card.Body>
                        <Card.Title>{group.name}</Card.Title>
                        <Link to={'/expenses'} state={group.expenses}>expenses</Link>
                        <Link to={'/users'} state={group.users}>users</Link>
                    </Card.Body>
                </Card>
            </Col>
        ))}
        </Row>
    </Container>
  );
}
