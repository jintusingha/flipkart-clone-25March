import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login"); 
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="list-group mt-4">
        <Link to="/admin/products" className="list-group-item list-group-item-action">
          Manage Products
        </Link>
        <Link to="#" className="list-group-item list-group-item-action">
          Manage Orders
        </Link>
      </div>

      
      <div className="mt-4">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
