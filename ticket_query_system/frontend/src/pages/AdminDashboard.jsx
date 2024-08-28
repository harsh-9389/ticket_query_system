// src/pages/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [complaints, setComplaints] = useState([]);
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchComplaints = async () => {
            const res = await axios.get('/api/admin/complaints', {});
            setComplaints(res.data);
        };

        fetchComplaints();
    }, []);

    const handleAssign = async (id) => {
        try {
            const res = await axios.put(
                `/api/admin/complaints/${id}`,
                { assignedTo, status },
                {
                    headers: { 'x-auth-token': localStorage.getItem('token') },
                }
            );
            setComplaints((prevComplaints) =>
                prevComplaints.map((complaint) =>
                    complaint._id === id ? res.data : complaint
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {complaints.map((complaint) => (
                <div key={complaint._id}>
                    <h3>{complaint.title}</h3>
                    <p>{complaint.description}</p>
                    <p>Status: {complaint.status}</p>
                    <p>Assigned To: {complaint.assignedTo ? complaint.assignedTo.name : 'None'}</p>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                    <input
                        type="text"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        placeholder="Assign to (Admin ID)"
                    />
                    <button onClick={() => handleAssign(complaint._id)}>Update</button>
                </div>
            ))}
        </div>
    );
}

export default AdminDashboard;
