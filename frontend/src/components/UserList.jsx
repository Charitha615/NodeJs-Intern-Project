import { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";

const API_URL = "http://localhost:5000/api/users";

function UserList({ refresh }) {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [editingUser, setEditingUser] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Get all users
    const fetchUsers = async () => {
        try {

            const response = await axios.get(API_URL);

            setUsers(response.data.users);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load users"
            );
        }
    };

    // Load users when page opens
    // Also refresh after creating a user
    useEffect(() => {
        fetchUsers();
    }, [refresh]);


    // DELETE USER
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            const response = await axios.delete(
                `${API_URL}/${id}`
            );

            setMessage(response.data.message);
            setError("");

            fetchUsers();

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to delete user"
            );
        }
    };


    // UPDATE USER
    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.put(
                `${API_URL}/${editingUser._id}`,
                {
                    name: editingUser.name,
                    email: editingUser.email,
                    age: Number(editingUser.age),
                    phone: editingUser.phone
                }
            );

            setMessage(response.data.message);
            setError("");

            setEditingUser(null);

            fetchUsers();

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to update user"
            );
        }
    };


    // SEARCH
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search)
    );


    return (

        <div className="users-section">

            {/* HEADER */}

            <div className="users-header">

                <div>
                    <h2>Users</h2>
                    <p>Manage all registered users</p>
                </div>

                <input
                    className="search-input"
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            {/* MESSAGES */}

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


            {/* USER TABLE */}

            <div className="table-container">

                <table>

                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>

                    </thead>


                    <tbody>

                        {filteredUsers.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="5"
                                    className="no-users"
                                >
                                    No users found
                                </td>
                            </tr>

                        ) : (

                            filteredUsers.map((user) => (

                                <tr key={user._id}>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>{user.age}</td>

                                    <td>{user.phone}</td>

                                    <td>

                                        <div className="action-buttons">

                                            {/* EDIT */}

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    setEditingUser({
                                                        ...user
                                                    })
                                                }
                                            >
                                                Edit
                                            </button>


                                            {/* DELETE */}

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(user._id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>


            {/* EDIT MODAL */}

            {editingUser && (

                <div className="modal-overlay">

                    <div className="edit-modal">

                        <div className="modal-header">

                            <div>
                                <h2>Edit User</h2>
                                <p>Update user information</p>
                            </div>

                            <button
                                className="close-btn"
                                onClick={() =>
                                    setEditingUser(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <form onSubmit={handleUpdate}>

                            {/* NAME */}

                            <div className="input-group">

                                <label>Name</label>

                                <input
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) =>
                                        setEditingUser({
                                            ...editingUser,
                                            name: e.target.value
                                        })
                                    }
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="input-group">

                                <label>Email</label>

                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) =>
                                        setEditingUser({
                                            ...editingUser,
                                            email: e.target.value
                                        })
                                    }
                                    required
                                />

                            </div>


                            {/* AGE + PHONE */}

                            <div className="form-row">

                                <div className="input-group">

                                    <label>Age</label>

                                    <input
                                        type="number"
                                        value={editingUser.age}
                                        onChange={(e) =>
                                            setEditingUser({
                                                ...editingUser,
                                                age: e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>


                                <div className="input-group">

                                    <label>Phone</label>

                                    <input
                                        type="text"
                                        value={editingUser.phone}
                                        onChange={(e) =>
                                            setEditingUser({
                                                ...editingUser,
                                                phone: e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>

                            </div>


                            {/* MODAL BUTTONS */}

                            <div className="modal-buttons">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() =>
                                        setEditingUser(null)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="update-btn"
                                >
                                    Update User
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default UserList;