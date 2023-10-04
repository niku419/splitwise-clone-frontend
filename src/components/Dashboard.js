import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { getCookie } from '../middleware/middleware';
import Groups from './Groups';
import CreateGroup from './CreateGroup';
import SecureRoute from './SecureRoute';
import { Card } from 'react-bootstrap';

export default function Dashboard() {

    const [data, setData] = useState([]);
    const [groups, setGroups] = useState([]);

    const onCreateGroup = (group) => {
      setGroups([...groups, group]);
      setData([...data, group]);
    }

    const onGroupDelete = (updatedGroups) => {
      setGroups(updatedGroups);
      setData(updatedGroups);
    }

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

    useEffect(() => {
      setGroups([...data]);
    }, [data])
    
  return (
    <SecureRoute>
        {groups.length > 0 && <Groups data={groups} onGroupDelete={onGroupDelete}/>}
        <Card>
          <CreateGroup onCreateGroup={onCreateGroup} />
        </Card>
    </SecureRoute>
  )
}
