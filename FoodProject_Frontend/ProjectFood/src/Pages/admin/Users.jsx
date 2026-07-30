import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {

            // Replace with your backend API
            const response = await axios.get(
                "http://localhost:8080/api/admin/users"
            );

            setUsers(response.data);

        } catch (error) {
            console.log(error);
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

                                    <button className="delete-btn">
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