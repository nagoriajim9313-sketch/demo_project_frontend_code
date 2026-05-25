import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();
     

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Brand Logo/Name */}
          <a className="navbar-brand" href="#">MyStore</a>

          {/* Mobile Toggle Button */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/catagorys">Categories</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/products">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/orders">Orders</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/adminlogin">Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}