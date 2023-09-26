import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { getCookie } from '../middleware/middleware';
import Groups from './Groups';

export default function Dashboard() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const jwtToken = getCookie('nikcookie');

        if (jwtToken) {
            const userId = localStorage.getItem("userId");
            axios.get(`http://localhost:8080/splitwise/user/${userId}/groups`, {
            withCredentials: true,
            headers: {
                Cookie: `nikcookie=${jwtToken}`,
            }
          })
          .then((response) => {
            console.log('Data from secured route:', response.data);
            setData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        }
    }, []);
    
  return (
    <div>
        {data.length > 0 && <Groups data={data}/>}
    </div>
  )
}
