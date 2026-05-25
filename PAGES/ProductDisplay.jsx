import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import Navbar from './Navbar';

export default function ProductAll() {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product");
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleOrder = async (values, { resetForm }) => {
    try {
      await axios.post("http://localhost:3000/order", values);
      alert("Order placed successfully ✅");
      resetForm();
    } catch (error) {
      alert("Failed to place order ❌");
    }
  };

  

  return (
    <>
    <Navbar/> 
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Products</h2>
      
      {/* Bootstrap Row for Grid */}
      <div className="row">
        {product?.map((element) => (
          <div key={element.productid} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            
            {/* Card Start */}
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-header bg-primary text-white text-center py-3">
                <h5 className="card-title mb-0">{element.productname}</h5>
              </div>

              <div className="card-body d-flex flex-column">
                <p className="card-text text-muted flex-grow-1">
                  {element.description}
                </p>
                <h4 className="text-primary mb-3">₹ {element.price}</h4>

                <Formik
                  initialValues={{
                    userid: localStorage.getItem("userid"),
                    productid: element.productid,
                    qty: ""
                  }}
                  enableReinitialize={true} // Taki data update hone pe form refresh ho
                  onSubmit={handleOrder}
                >
                  <Form>
                    <div className="input-group mb-2">
                      <span className="input-group-text bg-light">Qty</span>
                      <Field
                        type="number"
                        name="qty"
                        min="1"
                        max="10"
                        className="form-control"
                        placeholder="0"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-warning w-100 fw-bold"
                    >
                      🛒 Order Now
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
            {/* Card End */}

          </div>
        ))}
      </div>
    </div>
  </>
  );
}