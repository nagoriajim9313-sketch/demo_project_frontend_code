import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import productSchema from "../Schema/ProductSchema";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProductForm() {
  const navigate = useNavigate();
  useEffect(() => {
    const userid = localStorage.getItem("adminuserid");
    if (!userid) {
      navigate("/adminlogin");
    }
  }, [navigate]);
  const [catagoryData, setCatagoryData] = useState([]);

  const fetchCatagory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/catagory");
      setCatagoryData(response.data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCatagory();
  }, []);

  const initialValues = {
    productname: "",
    description: "",
    catagoryid: "",
    price: "",
  };

  const handlePost = async (values) => {
    try {
      await axios.post("http://localhost:3000/product", values);
      alert("Product added successfully! ✅");
      navigate("/products");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-sm border-0">
            {/* Form Header */}
            <div className="card-header bg-primary text-white py-3 text-center">
              <h4 className="mb-0">Add New Product</h4>
            </div>

            <div className="card-body p-4">
              <Formik
                initialValues={initialValues}
                onSubmit={handlePost}
                validationSchema={productSchema}
              >
                <Form>
                  {/* Product Name */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Product Name</label>
                    <Field
                      name="productname"
                      className="form-control"
                      placeholder="e.g. Wireless Mouse"
                    />
                    <div className="text-danger small mt-1">
                      <ErrorMessage name="productname" />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control"
                      rows="3"
                      placeholder="Brief details about the product..."
                    />
                    <div className="text-danger small mt-1">
                      <ErrorMessage name="description" />
                    </div>
                  </div>

                  {/* Category & Price Row */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Category</label>
                      <Field as="select" name="catagoryid" className="form-select">
                        <option value="">Select category</option>
                        {catagoryData.map((catagory) => (
                          <option value={catagory.catagoryid} key={catagory.catagoryid}>
                            {catagory.catagoryname}
                          </option>
                        ))}
                      </Field>
                      <div className="text-danger small mt-1">
                        <ErrorMessage name="catagoryid" />
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Price (₹)</label>
                      <Field
                        name="price"
                        type="number"
                        className="form-control"
                        placeholder="0.00"
                      />
                      <div className="text-danger small mt-1">
                        <ErrorMessage name="price" />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid gap-2 mt-4">
                    <button type="submit" className="btn btn-primary btn-lg fw-bold">
                      Add Product
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/products")}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}