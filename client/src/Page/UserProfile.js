import React, { useEffect, useState } from 'react';





function UserProfile() {
  const [userData, setUserData] = useState(null);



 
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        // Fetch user data from the backend API endpoint
        const response = await fetch('http://localhost:3306/api/userDetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Optionally, you can include the JWT token if available
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include', // Include cookies in the request
        });

        // Check if the response is successful
        if (response.ok) {
          // Parse JSON response
          const userData = await response.json();
          setUserData(userData);
        } else {
          // If response is not successful, throw an error
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        // Handle errors
        console.error('Error fetching user data:', error.message);
      }
    }

    fetchData();
  }, []); 

  return (
    <div>
      <h1>User Details</h1>
      {userData ? (
        <div>
          <p>Employee ID: {userData.EmployeeID}</p>
          <p>Username: {userData.Username}</p>
          <p>Role: {userData.Role}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default UserProfile;
