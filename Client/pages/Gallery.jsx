import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarAfterLogin from "../Components/NavafterLogin";
import "./Gallery.css"; // Import the CSS file

const Gallery = () => {
  const [imageList, setImageList] = useState([]); // Initialize state for images
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(""); // Set the logged-in user ID
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/images");
        setImageList(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    // Fetch images when the component mounts
    fetchImages();

    // Retrieve the logged-in user ID from local storage
    const loggedInUserId = localStorage.getItem("userId"); // Example of retrieving userId
    setCurrentUserId(loggedInUserId); // Set the logged-in user ID
  }, []);

  const handleFileChange = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", uploadedFile);
    formData.append("user_id", currentUserId); // Include user ID

    await axios.post("http://127.0.0.1:5000/api/upload", formData);
    setUploadedFile(null);
    setIsUploadModalOpen(false); // Close the modal after upload
    window.location.reload(); // Reload to fetch new images
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/delete/${id}`);
      // Update the state to remove the deleted image
      setImageList(imageList.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Utility function to format the time ago
  const formatTimeAgo = (timestamp) => {
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
    <>
      <NavbarAfterLogin />
      <div className="gallery-wrapper">
        <div className="upload-button-container">
          {/* <button
            className="upload-button"
            onClick={() => setIsUploadModalOpen(true)}
          >
            Add Post
          </button> */}
        </div>

        {/* Modal for Uploading Image */}
        {isUploadModalOpen && (
          <div className="modal-overlay">
            <div className="modal-box">
              <span
                onClick={() => setIsUploadModalOpen(false)}
                className="modal-close-button"
              >
                &times;
              </span>
              <h2>Upload Image</h2>
              <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} required />
                <input
                  type="text"
                  placeholder="User ID"
                  value={currentUserId}
                  className="user-id-input"
                  readOnly
                />
                <input
                  type="submit"
                  className="submit-upload-button"
                  value="Upload"
                />
              </form>
            </div>
          </div>
        )}

        <div className="image-gallery">
          {Array.isArray(imageList) && imageList.length > 0 ? (
            imageList.map((image) => (
              <div className="image-item" key={image.id}>
                <div className="image-details">
                  <p>User ID: {image.user_id}</p>
                  <p>Uploaded at: {formatTimeAgo(image.upload_time)}</p>
                </div>
                <img
                  src={`http://127.0.0.1:5000/static/images/${image.filename}`}
                  alt="Gallery"
                  className="image-thumbnail"
                />
                {/* Uncomment below to add delete functionality */}
                {/* {image.user_id === currentUserId && ( 
                  <button className="delete-button" onClick={() => deleteImage(image.id)}>
                    Delete
                  </button>
                )} */}
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

export default Gallery;
