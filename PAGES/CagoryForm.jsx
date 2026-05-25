import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import catagorySchema from "../Schema/CatagorySchema";
import { useNavigate } from "react-router-dom";

export default function CagoryForm() {
  const navigate = useNavigate();


useEffect(() => {
  const userid = localStorage.getItem("adminuserid");
  if (!userid) {
    navigate("/adminlogin");
  }
}, [navigate]);

  const initialValues = {
    catagoryname: "",
  };

  const handlePost = async (values) => {
    try {
      await axios.post("http://localhost:3000/catagory", values);
      alert("Category added successfully! ✅");
      navigate("/catagorys");
    } catch (error) {
      console.error("Error posting category", error);
      alert("Failed to add category.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Card for better UI */}
          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white py-3">
              <h5 className="mb-0 text-center">Add New Category</h5>
            </div>
            <div className="card-body p-4">
              <Formik
                initialValues={initialValues}
                validationSchema={catagorySchema}
                onSubmit={handlePost}
              >
                <Form>
                  <div className="mb-4">
                    <label htmlFor="catagoryname" className="form-label fw-bold">
                      Category Name
                    </label>
                    <Field
                      id="catagoryname"
                      name="catagoryname"
                      className="form-control form-control-lg"
                      placeholder="e.g. Electronics, Fashion, etc."
                    />
                    {/* Error Message Styling */}
                    <div className="text-danger small mt-1">
                      <ErrorMessage name="catagoryname" />
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary px-4 shadow-sm">
                      <i className="bi bi-plus-lg me-1"></i> Save Category
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary px-4"
                      onClick={() => navigate("/catagorys")}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
          
          {/* Helpful Tip */}
          <div className="mt-3 text-center">
            <small className="text-muted">
              Make sure the category name is unique to avoid duplicates.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}