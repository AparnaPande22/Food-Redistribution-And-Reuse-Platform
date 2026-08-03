import { useEffect, useState } from "react";
import {
    getPendingUsers,
    approveUser,
    rejectUser,
} from "../../services/adminService";

import "./dashboard.css";

function PendingUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const data = await getPendingUsers();

            setUsers(data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleApprove = async (id) => {

        await approveUser(id);

        loadUsers();

    };

    const handleReject = async (id) => {

        await rejectUser(id);

        loadUsers();

    };

    return (

        <div className="page">

            <h2>Pending User Approvals</h2>

            <table className="admin-table">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.phone}</td>

                                <td>{user.accountType}</td>

                                <td>

                                    <button
                                        className="approve-btn"
                                        onClick={() => handleApprove(user.id)}
                                    >
                                        Approve
                                    </button>

                                    <button
                                        className="reject-btn"
                                        onClick={() => handleReject(user.id)}
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