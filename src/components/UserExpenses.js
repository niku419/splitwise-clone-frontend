import React, { useEffect, useState } from 'react'
import SecureRoute from './SecureRoute';
import axios from 'axios';
import { getCookie } from '../middleware/middleware';

export default function UserExpenses() {
    const [data, setData] = useState();
    useEffect(() => {
        const jwtToken = getCookie('nikcookie');

        if (jwtToken) {
          const userId = localStorage.getItem("userId");
          console.log(userId)
          axios.get(`http://localhost:8080/splitwise/user/${userId}/expenses`, {
            withCredentials: true,
            headers: {
                Cookie: `nikcookie=${jwtToken}`,
            }
          })
          .then((response) => {
            // Handle the response data
            console.log('Data from secured route:', response.data);
            setData(response.data);
          })
          .catch((error) => {
            // Handle errors, e.g., unauthorized access
            console.error('Error fetching data:', error);
          });
        }
    }, []);
  return (
    <SecureRoute>{JSON.stringify(data)}</SecureRoute>
  )
}
