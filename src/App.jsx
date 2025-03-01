import React, { useState } from "react";
import "./XModal.css"; // Import CSS for styling

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, dob, phone } = formData;

    if (!username || !email || !dob || !phone) {
      alert("All fields are required.");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit numeric phone number.");
      return;
    }

    const selectedDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
    const dayDiff = currentDate.getDate() - selectedDate.getDate();

    if (selectedDate > currentDate) {
      alert("Invalid date of birth. Please enter a past date.");
      return;
    }

    if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      alert("You must be at least 18 years old.");
      return;
    }

    setIsOpen(false);
    setFormData({ username: "", email: "", dob: "", phone: "" });
  };

  return (
    <>
      <h1>User Details Modal</h1>
      <div className="app-container">
        <button onClick={() => setIsOpen(true)}>Open Form</button>
        {isOpen && (
          <div className="modal" onClick={() => setIsOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Fill the Form</h2>
              <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <label>Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
                <label>Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />
                <button type="submit" className="submit-button">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default XModal;
