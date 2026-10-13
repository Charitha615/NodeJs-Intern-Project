import { useState } from "react";
import axios from "axios";
import "./UserForm.css";

const API_URL = "http://localhost:5000/api/users";

function UserForm({ onUserCreated }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        phone: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await axios.post(API_URL, {
                name: formData.name,
                email: formData.email,
                age: Number(formData.age),
                phone: formData.phone
            });

            setMessage(response.data.message);

            setFormData({
                name: "",
                email: "",
                age: "",
                phone: ""
            });

            // Refresh user list
            if (onUserCreated) {
                onUserCreated();
            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="form-card">

            <div className="form-header">
                <h2>Create User</h2>
                <p>Add a new user to the system</p>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">

                    <div className="input-group">
                        <label>Age</label>

                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            placeholder="07XXXXXXXX"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                </div>

                <button className="create-btn" type="submit">
                    + Create User
                </button>

            </form>

            {message && (
                <div className="success-message">
                    ✓ {message}
                </div>
            )}

            {error && (
                <div className="error-message">
                    ✕ {error}
                </div>
            )}

        </div>
    );
}

export default UserForm;