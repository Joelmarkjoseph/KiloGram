import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]); // Initialize state for images
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/images");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

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
    setUserId(""); // Reset user ID
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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Image Gallery</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Post</button>{" "}
      {/* Add Post Button */}
      {/* Modal for Uploading Image */}
      {isModalOpen && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <span
              onClick={() => setIsModalOpen(false)}
              style={closeButtonStyles}
            >
              &times;
            </span>{" "}
            {/* Close button */}
            <h2>Upload Image</h2>
            <form onSubmit={handleUpload} style={{ marginBottom: "20px" }}>
              <input type="file" onChange={handleFileChange} required />
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                style={{ margin: "0 10px" }} // Add some space between inputs
              />
              <input type="submit" value="Upload" />
            </form>
          </div>
        </div>
      )}
      <h2>Uploaded Images</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {Array.isArray(images) && images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              style={{
                margin: "10px",
                border: "1px solid #ccc",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <p>User ID: {image.user_id}</p>
              <p>Uploaded at: {timeAgo(image.upload_time)}</p>
              <img
                src={`http://127.0.0.1:5000/static/images/${image.filename}`}
                alt="Gallery"
                style={{ width: "200px", height: "auto" }}
              />
              <button onClick={() => deleteImage(image.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
    </div>
  );
};

// Styles for modal
const modalStyles = {
  position: "fixed",
  zIndex: 1,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Black background with transparency
};

const modalContentStyles = {
  backgroundColor: "#fefefe",
  margin: "15% auto",
  padding: "20px",
  border: "1px solid #888",
  width: "80%",
  maxWidth: "500px", // Set a max width for the modal
  borderRadius: "8px", // Rounded corners
};

const closeButtonStyles = {
  color: "#aaa",
  float: "right",
  fontSize: "28px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Gallery;
