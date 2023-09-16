import React from 'react'

export default function UserExpenses() {
    useEffect(() => {
        const jwtToken = getCookie('nikcookie');

        if (jwtToken) {
          const userId = localStorage.getItem("user");
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
    <div>UserExpenses</div>
  )
}
