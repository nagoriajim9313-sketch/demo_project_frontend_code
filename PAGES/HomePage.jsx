import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import NavbarHome from './NavbarHome';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

  const navigate = useNavigate();

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    if (!userid) {
      navigate("/login");
    }
  }, [navigate]);

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
      <NavbarHome />

      {/* 🔹 NASTA IMAGE SLIDER */}
      <div id="foodSlider" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950"
              className="d-block w-100"
              style={{ height: "400px", objectFit: "cover" }}
              alt="Samosa"
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>Hot & Crispy Samosa</h3>
            </div>
          </div>

          <div className="carousel-item">
            <img
  src="https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg"
  className="d-block w-100"
  style={{ height: "400px", objectFit: "cover" }}
  alt="Pizza"
/>
            <div className="carousel-caption d-none d-md-block">
              <h3>Cheesy Pizza</h3>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1628840042765-356cda07504e"
              className="d-block w-100"
              style={{ height: "400px", objectFit: "cover" }}
              alt="Nasta"
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>Fresh Indian Nasta</h3>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#foodSlider" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#foodSlider" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* 🔹 PRODUCTS */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Our Products</h2>

        <div className="row">
          {product?.map((element) => (
            <div key={element.productid} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100 shadow-sm border-0">

                <div className="card-header bg-primary text-white text-center">
                  <h5 className="mb-0">{element.productname}</h5>
                </div>

                <div className="card-body d-flex flex-column">
                  <p className="text-muted flex-grow-1">
                    {element.description}
                  </p>

                  <h4 className="text-success mb-3">₹ {element.price}</h4>

                  <Formik
                    initialValues={{
                      userid: localStorage.getItem("userid"),
                      productid: element.productid,
                      qty: ""
                    }}
                    enableReinitialize
                    onSubmit={handleOrder}
                  >
                    <Form>
                      <div className="input-group mb-2">
                        <span className="input-group-text">Qty</span>
                        <Field
                          type="number"
                          name="qty"
                          min="1"
                          className="form-control"
                          required
                        />
                      </div>

                      <button type="submit" className="btn btn-warning w-100 fw-bold">
                        🛒 Order Now
                      </button>
                    </Form>
                  </Formik>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 FOOTER */}
      <footer className="bg-dark text-white mt-5 pt-4 pb-3">
        <div className="container text-center">
          <h5 className="mb-3">🍕 Nasta Point</h5>
          <p className="mb-1">Fresh • Tasty • Affordable</p>
          <p className="mb-2">📍 India | 📞 9876543210</p>

          <hr className="border-secondary" />

          <p className="mb-0">
            © {new Date().getFullYear()} Nasta Point. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
