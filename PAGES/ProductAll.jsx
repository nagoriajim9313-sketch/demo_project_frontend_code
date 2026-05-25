import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Page/Navbar'

export default function ProductAll() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const userid = localStorage.getItem("adminuserid");
    if (!userid) {
      navigate("/adminlogin");
    }
  }, [navigate]);

  const fetchProduct = async () => {
    const response = await axios.get("http://localhost:3000/product");
    setProduct(response.data.data);
  };

  useEffect(() => { fetchProduct(); }, []);

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
          <h4 className="mb-0">Product Inventory</h4>
          <button className="btn btn-light btn-sm fw-bold" onClick={() => navigate("/product")}>
            + ADD NEW PRODUCT
          </button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th className="text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {product?.map((element) => (
                  <tr key={element.productid}>
                    <td>{element.productid}</td>
                    <td>
                      <div className="fw-bold">{element.productname}</div>
                      <small className="text-muted">{element.description}</small>
                    </td>
                    <td>₹{element.price}</td>
                    <td>
                      <span className={`badge ${element.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                        {element.status || 'Active'}
                      </span>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/productedit/${element.productid}`)}>
                        Edit
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