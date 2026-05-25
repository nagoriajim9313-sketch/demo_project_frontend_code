import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import catagorySchema from "../Schema/CatagorySchema";
import { useParams, useNavigate } from "react-router-dom";

export default function CatagoryUpdate() {
  const { catagoryid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userid = localStorage.getItem("adminuserid");
    if (!userid) {
      navigate("/adminlogin");
    }
  }, [navigate]);

  const [catagory, setCatagory] = useState({
    catagoryname: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchCatgory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/catagory/search/${catagoryid}`,
      );
      setCatagory(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatgory();
  }, [catagoryid]);

  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `http://localhost:3000/catagory/update/${catagoryid}`,
        values,
      );
      alert("Update successfully! ✨");
      navigate("/catagorys");
    } catch (error) {
      alert("Update failed!");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning" role="status"></div>
        <p>Loading Data...</p>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-warning">
            <div className="card-header bg-warning text-dark text-center py-3">
              <h5 className="mb-0">
                <i className="bi bi-pencil-square me-2"></i>
                Edit Category
              </h5>
            </div>
            <div className="card-body p-4">
              <Formik
                enableReinitialize={true}
                initialValues={catagory}
                validationSchema={catagorySchema}
                onSubmit={handleUpdate}
              >
                <Form>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Category ID</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      value={catagoryid}
                      disabled
                    />
                    <small className="text-muted">ID cannot be changed</small>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="catagoryname"
                      className="form-label fw-bold"
                    >
                      Category Name
                    </label>
                    <Field
                      id="catagoryname"
                      name="catagoryname"
                      className="form-control form-control-lg"
                      placeholder="Enter category name"
                    />
                    <div className="text-danger small mt-1">
                      <ErrorMessage name="catagoryname" />
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-warning btn-lg fw-bold shadow-sm"
                    >
                      SAVE CHANGES
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => navigate("/catagorys")}
                    >
                      Back to List
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
