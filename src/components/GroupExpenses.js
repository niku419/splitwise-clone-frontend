import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getBalances } from '../middleware/middleware';

export default function GroupExpenses() {
  const location = useLocation();
  const { data } = location.state || {};
  useEffect(() => {
    const userId = localStorage.getItem("user");
    const userExpenses = getBalances(data, userId);
    console.log(userExpenses);
  }, [])
  
  return (
    <div> {JSON.stringify(data)}</div>
  )
}
