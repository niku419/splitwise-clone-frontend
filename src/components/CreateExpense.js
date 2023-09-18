import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function CreateExpense() {
  const [expenseData, setExpenseData] = useState({
    description: '',
    payer: '',
    splits: [{ participant: '', amount: '' }],
  });

  const handleDescriptionChange = (e) => {
    setExpenseData({ ...expenseData, description: e.target.value });
  };

  const handlePayerChange = (e) => {
    setExpenseData({ ...expenseData, payer: e.target.value });
  };

  const handleParticipantChange = (e, index) => {
    const updatedSplits = [...expenseData.splits];
    updatedSplits[index].participant = e.target.value;
    setExpenseData({ ...expenseData, splits: updatedSplits });
  };

  const handleAmountChange = (e, index) => {
    const updatedSplits = [...expenseData.splits];
    updatedSplits[index].amount = e.target.value;
    setExpenseData({ ...expenseData, splits: updatedSplits });
  };

  const handleAddSplit = () => {
    setExpenseData({
      ...expenseData,
      splits: [...expenseData.splits, { participant: '', amount: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log('Form submitted:', expenseData);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="description">
              <Form.Label>Expense Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={expenseData.description}
                onChange={handleDescriptionChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="payer">
              <Form.Label>Payer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter payer's name or email"
                value={expenseData.payer}
                onChange={handlePayerChange}
                required
              />
            </Form.Group>

            {expenseData.splits.map((split, index) => (
              <div key={index}>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Participant</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter participant's name or email"
                      value={split.participant}
                      onChange={(e) => handleParticipantChange(e, index)}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter amount"
                      value={split.amount}
                      onChange={(e) => handleAmountChange(e, index)}
                      required
                    />
                  </Form.Group>
                </Row>
              </div>
            ))}

            <Button
              variant="secondary"
              onClick={handleAddSplit}
            >
              Add Split
            </Button>

            <Button variant="primary" type="submit">
              Create Expense
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>    
  )
}

