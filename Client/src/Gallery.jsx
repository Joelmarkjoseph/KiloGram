import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]); // Initialize state for images
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState("");

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
    <div>
      <h1>Image Gallery</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input type="submit" value="Upload" />
      </form>
      <h2>Uploaded Images</h2>
      <div>
        {Array.isArray(images) && images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              style={{
                margin: "10px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <p>User ID: {image.user_id}</p>
              <p>Uploaded at: {timeAgo(image.upload_time)}</p>{" "}
              {/* Display time ago */}
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

export default Gallery;
