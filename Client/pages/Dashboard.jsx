import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import NavafterLogin from "../Components/NavafterLogin";
import "./Dashboard.css"; // Import the CSS file for styling

const Dashboard = () => {
  const [images, setImages] = useState([]); // Initialize state for images
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState(""); // Set the logged-in user ID
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const sty = {
    color: "white",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

    // Fetch user info
    const fetchUserInfo = async () => {
      const response = await fetch("http://127.0.0.1:5000/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data); // Store user info
        setUserId(data.username); // Set logged-in user ID
      } else {
        navigate("/login"); // Redirect to login if there's an error
      }
    };

    fetchUserInfo();
  }, [navigate]); // Dependency on navigate

  // Fetch images when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/images");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages(); // Fetch images without userId check to get all images initially
  }, []); // Run only once when the component mounts

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("user_id", userId); // Include user ID

    await axios.post("http://127.0.0.1:5000/api/upload", formData);
    setSelectedFile(null);
    setIsModalOpen(false); // Close the modal after upload
    window.location.reload(); // Reload to fetch new images
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/delete/${id}`);
      // Update the state to remove the deleted image
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Utility function to format the time ago
  const timeAgo = (timestamp) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(timestamp)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    return `${seconds} seconds ago`;
  };

  if (!userInfo) return <div>Loading...</div>; // Loading state

  return (
    <>
      <NavafterLogin />
      <div className="gallery-container">
        <h2 align="left" style={sty}>
          Welcome, {userInfo.username}
        </h2>

        {/* Modal for Uploading Image */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span onClick={() => setIsModalOpen(false)} className="close-btn">
                &times;
              </span>
              <h2>Upload Image</h2>
              <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} required />
                <input type="submit" className="upload-btn" value="Upload" />
              </form>
            </div>
          </div>
        )}

        <h3 style={sty}>My Posts</h3>
        <div className="image-list">
          {Array.isArray(images) && images.length > 0 ? (
            images
              .filter((image) => image.user_id === userId) // Filter images by logged-in user ID
              .map((image) => (
                <div className="image-card" key={image.id}>
                  <div className="image-meta">
                    <p>User ID: {image.user_id}</p>
                    <p>Uploaded at: {timeAgo(image.upload_time)}</p>
                  </div>
                  <img
                    src={`http://127.0.0.1:5000/static/images/${image.filename}`}
                    alt="Gallery"
                    className="gallery-img"
                  />
                  <button
                    className="delete-btn"
                    onClick={() => deleteImage(image.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
          ) : (
            <p>No images available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
