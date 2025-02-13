import React, { useEffect, useState } from "react";
import "../../adminCss/user/alluser.css";
import { makeApi } from "../../api/callApi";
import { useNavigate } from "react-router-dom";

function Alluser() {
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState("all"); // "admin", "user", or "all"
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (filter === "all") {
            setFilteredUsers(allUsers);
        } else {
            setFilteredUsers(allUsers.filter(user => user.role === filter));
        }
    }, [filter, allUsers]);

    const fetchUser = async () => {
        try {
            const response = await makeApi("/api/get-all-users", "GET");
            setAllUsers(response.data.users);
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggle = (role) => {
        setFilter(role);
    };

    const handleViewMore = (userId) => {
        navigate(`/user-details/${userId}`);
    };

    const totalAdmins = allUsers.filter(user => user.role === "admin").length;
    const totalUsers = allUsers.filter(user => user.role === "user").length;

    return (
        <div className="all-user-page">
            <div className="toggle-filter">
                <button
                    className={`filter-btn ${filter === "all" ? "active" : ""}`}
                    onClick={() => handleToggle("all")}
                >
                    All ({allUsers.length})
                </button>
                <button
                    className={`filter-btn ${filter === "admin" ? "active" : ""}`}
                    onClick={() => handleToggle("admin")}
                >
                    Admins ({totalAdmins})
                </button>
                <button
                    className={`filter-btn ${filter === "user" ? "active" : ""}`}
                    onClick={() => handleToggle("user")}
                >
                    Users ({totalUsers})
                </button>
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Country</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user._id}>
                            <td>
                                <img
                                    src={user.userImage}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="user-image"
                                />
                            </td>
                            <td>{`${user.firstName} ${user.lastName}`}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.country}</td>
                            <td>
                                <button
                                    className="view-more-btn"
                                    onClick={() => handleViewMore(user._id)}
                                >
                                    View More
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Alluser;
