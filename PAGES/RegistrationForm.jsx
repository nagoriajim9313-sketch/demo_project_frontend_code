import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userSchema from "../Schema/UserSchema";

export default function RegistrationForm() {
  const navigate = useNavigate();

  const initialValues = {
    mobileno: "",
    username: "",
    password: "",
  };

  const handleSignUp = async (values) => {
    try {
      await axios.post("http://localhost:3000/user", values);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4>User Registration</h4>
            </div>
            <div className="card-body p-4">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSignUp}
                validationSchema={userSchema}
              >
                <Form>
                  {/* Mobile Number */}
                  <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <Field
                      name="mobileno"
                      placeholder="Enter mobile no"
                      className="form-control"
                    />
                    <div className="text-danger small">
                      <ErrorMessage name="mobileno" />
                    </div>
                  </div>

                  {/* Username */}
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <Field
                      name="username"
                      placeholder="Enter user name"
                      className="form-control"
                    />
                    <div className="text-danger small">
                      <ErrorMessage name="username" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className="form-control"
                    />
                    <div className="text-danger small">
                      <ErrorMessage name="password" />
                    </div>
                  </div>

                  {/* Signup Button */}
                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary">
                      SignUp
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <small>
                      Already have an account? <a href="/login">Login</a>
                    </small>
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
