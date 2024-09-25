import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

    // Fetch user info using the token
    const fetchUserInfo = async () => {
      const response = await fetch("http:127.0.0.1:5000/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data); // Store user info
      } else {
        navigate("/login"); // Redirect to login if there's an error
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (!userInfo) return <div>Loading...</div>; // Loading state

  return (
    <div>
      <h2>Welcome, {userInfo.username}</h2>
      {/* Display more user info as needed */}
    </div>
  );
}

export default Dashboard;
