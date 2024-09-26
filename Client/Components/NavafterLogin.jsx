import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavafterLogin.css";
import axios from "axios";
import { BiColor } from "react-icons/bi";

const NavafterLogin = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState(""); // Will be set automatically
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically set the user ID from localStorage
    const storedUserId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
    console.log("Stored userId:", storedUserId); // Debugging log to check the value
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.warn("No userId found in localStorage.");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Clear user ID on logout
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!userId) {
      console.error("User ID is missing. Cannot upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("user_id", userId); // Automatically use the retrieved user ID

    try {
      await axios.post("http://127.0.0.1:5000/api/upload", formData);
      setSelectedFile(null);
      setIsModalOpen(false); // Close the modal after upload
      window.location.reload(); // Reload to fetch new images
      navigate("/gallery");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const goToProfile = () => {
    navigate("/dashboard");
  };

  const goToHome = () => {
    navigate("/gallery");
  };
  const sty = {
    color: "black",
  };

  return (
    <nav className="navbar">
      <h1 className="logo">KiloGram</h1>
      <div className="nav-right">
        <ul
          className={`nav-links ${isMobileMenuOpen ? "nav-links-mobile" : ""}`}
        >
          <li>
            <button id="btnn" className="profile-button" onClick={goToHome}>
              Home
            </button>
          </li>
          <li>
            <button id="btnn" onClick={() => setIsModalOpen(true)}>
              Post
            </button>
          </li>
          <li>
            <button id="btnn" className="profile-button" onClick={goToProfile}>
              Profile
            </button>
          </li>
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
        <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
          &#9776; {/* Hamburger icon */}
        </button>
      </div>

      {/* Modal for Image Upload */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 style={sty}>Upload Image</h2>
            <form onSubmit={handleUpload} style={{ marginBottom: "20px" }}>
              <input
                type="file"
                onChange={handleFileChange}
                required
                id="inp"
              />
              {/* User ID input field removed as it's set automatically */}
              <input type="submit" value="Upload" />
            </form>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavafterLogin;
