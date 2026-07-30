import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

function PendingUsers() {

    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        loadPendingUsers();
    }, []);

    const loadPendingUsers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/admin/pending-users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const approveUser = async (id) => {

        try {

            await axios.put(
                `http://localhost:8080/api/admin/users/${id}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            loadPendingUsers();

        } catch (error) {

            console.error(error);

        }

    };

    const rejectUser = async (id) => {

        try {

            await axios.put(
                `http://localhost:8080/api/admin/users/${id}/reject`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            loadPendingUsers();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="page">

            <h1>Pending User Approvals</h1>

            <table className="admin-table">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.fullName}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>

                                    <button
                                        className="approve-btn"
                                        onClick={() => approveUser(user.id)}
                                    >
                                        Approve
                                    </button>

                                    <button
                                        className="reject-btn"
                                        onClick={() => rejectUser(user.id)}
                                    >
                                        Reject
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

export default PendingUsers;