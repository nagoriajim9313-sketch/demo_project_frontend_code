import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



import Navbar from '../Page/Navbar'

export default function CatagoryAll() {
  const [catagory, setCatagory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userid = localStorage.getItem("adminuserid");
    if (!userid) {
      navigate("/adminlogin");
    }
  }, [navigate]);

  const fetchCatagory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/catagory");
      setCatagory(response.data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCatagory();
  }, []);

  const handleUpdate = (catagoryid) => {
    navigate(`/catagoryedit/${catagoryid}`);
  };

  const handleDelete = async (catagoryid) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await axios.delete(`http://localhost:3000/catagory/${catagoryid}`);
      fetchCatagory(); // List refresh karne ke liye
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0 text-primary fw-bold">Category Management</h4>
          <button
            type="button"
            className="btn btn-success shadow-sm"
            onClick={() => navigate("/catagory")}
          >
            <i className="bi bi-plus-circle me-2"></i> Add New Category
          </button>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">ID</th>
                  <th>CATEGORY NAME</th>
                  <th>STATUS</th>
                  <th className="text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {catagory.map((element, index) => (
                  <tr key={index}>
                    <td className="ps-4 text-muted">{element.catagoryid}</td>
                    <td>
                      <span className="fw-bold">{element.catagoryname}</span>
                    </td>
                    <td>
                      <span className={`badge ${element.status === 'active' ? 'bg-light-success text-success' : 'bg-light text-dark'} border`}>
                        {element.status || 'Active'}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => handleUpdate(element.catagoryid)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(element.catagoryid)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}