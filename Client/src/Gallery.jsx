import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]); // Initialize state for images
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/images");
        console.log(response.data); // Log the response data
        setImages(response.data); // Set the images state
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
    await axios.post("http://127.0.0.1:5000/api/upload", formData);
    setSelectedFile(null);
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

  return (
    <div>
      <h1>Image Gallery</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <input type="submit" value="Upload" />
      </form>
      <h2>Uploaded Images</h2>
      <div>
        {Array.isArray(images) && images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              style={{ display: "inline-block", margin: "10px" }}
            >
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
