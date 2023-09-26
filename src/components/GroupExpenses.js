import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getBalances, getCookie } from '../middleware/middleware';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function GroupExpenses() {

  const location = useLocation();
  const data = location.state || {};
  const { id } = useParams();
  const [expenses, setExpenses] = useState(data);
  const [expenseData, setExpenseData] = useState({
    description: '',
    payer: '',
    participants: [{ participant: '', amount: '' }],
    amount: 0
  });
  const [reloadExpenses, setReloadExpenses] = useState(false);

  const handleDescriptionChange = (e) => {
    setExpenseData({ ...expenseData, description: e.target.value });
  };

  const handlePayerChange = (e) => {
    setExpenseData({ ...expenseData, payer: e.target.value });
  };

  const handleParticipantChange = (e, index) => {
    const updatedParticipants = [...expenseData.participants];
    updatedParticipants[index].participant = e.target.value;
    setExpenseData({ ...expenseData, participants: updatedParticipants });
  };

  const handleAmountChange = (e, index) => {
    const updatedParticipants = [...expenseData.participants];
    updatedParticipants[index].amount = e.target.value;
    setExpenseData({ ...expenseData, participants: updatedParticipants });
  };

  const handleAddSplit = () => {
    setExpenseData({
      ...expenseData,
      participants: [...expenseData.participants, { participant: '', amount: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var participantsMap = {};
    var amount = 0;
    for(const split of expenseData.participants) {
      participantsMap[split.participant] = split.amount;
      amount += split.amount;
    }
    const formData = {
      description: expenseData.description,
      payerEmailId: expenseData.payer,
      amount,
      participants: participantsMap,
      groupId: id
    }
    try {
      const jwtToken = getCookie('nikcookie');
      if (jwtToken) {
          axios.post(`http://localhost:8080/splitwise/createExpense`, formData, {
            withCredentials: true,
            headers: {
              Cookie: `nikcookie=${jwtToken}`,
            }
          })
          .then((response) => {
            setReloadExpenses(true);
            console.log('Data from secured route:', response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        }
  } catch (error) {
    console.error('Login error:', error);
  }
    console.log('Form submitted:', formData);
  };

  useEffect(() => {
    const userId = localStorage.getItem("user");
    const userExpenses = getBalances(data, userId);
    const jwtToken = getCookie('nikcookie');

    if (jwtToken) {
        axios.get(`http://localhost:8080/splitwise/groups/${id}/expenses`, {
        withCredentials: true,
        headers: {
          Cookie: `nikcookie=${jwtToken}`,
        }
      })
      .then((response) => {
        setExpenses(response.data);
        console.log('Data from secured route:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  }, [reloadExpenses])
  
  return (
    <div>
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
                  placeholder="Enter payer's email"
                  value={expenseData.payer}
                  onChange={handlePayerChange}
                  required
                />
              </Form.Group>

              {expenseData.participants.map((participant, index) => (
                <div key={index}>
                  <Row>
                    <Form.Group as={Col}>
                      <Form.Label>Participant</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter participant's email"
                        value={participant.participant}
                        onChange={(e) => handleParticipantChange(e, index)}
                        required
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter amount"
                        value={participant.amount}
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
    </div>
  )
}
