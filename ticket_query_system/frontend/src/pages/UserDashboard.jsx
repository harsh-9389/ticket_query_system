import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            const res = await axios.get('/api/user/complaints', { });
            setComplaints(res.data);
        };

        fetchComplaints();
    }, []);

    return (
        <div>
            <h2>Your Complaints</h2>
            {complaints.map((complaint) => (
                <div key={complaint._id}>
                    <h3>{complaint.title}</h3>
                    <p>{complaint.description}</p>
                    <p>Status: {complaint.status}</p>
                </div>
            ))}
        </div>
    );
}

export default UserDashboard;
