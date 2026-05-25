import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import productSchema from '../Schema/ProductSchema';

export default function ProductUpdate() {
    const { productid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const userid = localStorage.getItem("adminuserid");
      if (!userid) {
        navigate("/adminlogin");
      }
    }, [navigate]);

    const [product, setProduct] = useState({
        productname: "",
        description: "",
        catagoryid: "",
        price: ""
    });

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/product/search/${productid}`);
            const data = response.data.data;
            setProduct({
                productname: data.productname,
                description: data.description,
                catagoryid: data.catagoryid,
                price: data.price
            });
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [productid]);

    const handleUpdate = async (values) => {
        try {
            await axios.put(`http://localhost:3000/product/update/${productid}`, values);
            alert('Product updated successfully! ✅');
            navigate('/products');
        } catch (error) {
            alert('Update failed. Please try again.');
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0">
                        {/* Header Section */}
                        <div className="card-header bg-warning py-3">
                            <h4 className="card-title mb-0 text-dark text-center fw-bold">
                                <i className="bi bi-pencil-square me-2"></i> Update Product Details
                            </h4>
                        </div>

                        <div className="card-body p-4">
                            <Formik
                                enableReinitialize={true}
                                initialValues={product}
                                validationSchema={productSchema}
                                onSubmit={handleUpdate}
                            >
                                <Form>
                                    {/* Product Name */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Product Name</label>
                                        <Field 
                                            name='productname' 
                                            className='form-control form-control-lg' 
                                            placeholder='e.g. iPhone 15 Pro' 
                                        />
                                        <div className="text-danger small mt-1">
                                            <ErrorMessage name='productname' />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Description</label>
                                        <Field 
                                            as="textarea"
                                            name='description' 
                                            className='form-control' 
                                            rows="3"
                                            placeholder='Enter product details...' 
                                        />
                                        <div className="text-danger small mt-1">
                                            <ErrorMessage name='description' />
                                        </div>
                                    </div>

                                    <div className="row">
                                        {/* Category ID */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold">Category ID</label>
                                            <Field 
                                                name='catagoryid' 
                                                className='form-control' 
                                                placeholder='Enter ID' 
                                            />
                                            <div className="text-danger small mt-1">
                                                <ErrorMessage name='catagoryid' />
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold">Price (₹)</label>
                                            <Field 
                                                name='price' 
                                                type="number"
                                                className='form-control' 
                                                placeholder='0.00' 
                                            />
                                            <div className="text-danger small mt-1">
                                                <ErrorMessage name='price' />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buttons Section */}
                                    <div className="d-grid gap-2 mt-4">
                                        <button type='submit' className='btn btn-warning btn-lg fw-bold shadow-sm'>
                                            SAVE CHANGES
                                        </button>
                                        <button 
                                            type='button' 
                                            className='btn btn-outline-secondary'
                                            onClick={() => navigate('/products')}
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
    );
}