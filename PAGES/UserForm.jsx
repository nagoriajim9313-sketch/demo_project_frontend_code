import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"; // Validation ke liye

export default function UserForm() {
  const navigate = useNavigate();

  const initialValues = {
    mobileno: "",
    password: "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    mobileno: Yup.string().required("Mobile number is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        values,
      );
      localStorage.setItem("userid", response.data.data.userid);
      navigate("/homepage");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">User Login</h3>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                <Form>
                  {/* Mobile Number Field */}
                  <div className="mb-3">
                    <label htmlFor="mobileno" className="form-label">
                      Mobile Number
                    </label>
                    <Field
                      id="mobileno"
                      name="mobileno"
                      className="form-control"
                      placeholder="Enter mobile no"
                    />
                    <div className="text-danger small">
                      <ErrorMessage name="mobileno" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                    />
                    <div className="text-danger small">
                      <ErrorMessage name="password" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>

                  {/* Register Link */}
                  <div className="text-center mt-3">
                    <span>New user? </span>
                    <a
                      href="/registration"
                      className="text-decoration-none fw-semibold"
                    >
                      Register here
                    </a>
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
