import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/adminService";
import "./dashboard.css";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                loadUsers();
            } catch (error) {
                console.error("Failed to delete user", error);
            }
        }
    };

    return (

        <div className="page">

            <div className="page-header">

                <h1>User Management</h1>

                <button className="primary-btn">
                    + Add User
                </button>

            </div>

            <table className="admin-table">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>{user.status}</td>

                                <td>

                                    <button>Edit</button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(user.id || user.userId)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );
}

export default Users;