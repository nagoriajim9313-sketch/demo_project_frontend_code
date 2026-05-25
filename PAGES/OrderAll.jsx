import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function OrderAll() {

  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userid = localStorage.getItem("adminuserid");
    if (!userid) {
      navigate("/adminlogin");
    }
  }, [navigate]);

  const fetchOrder = async () => {
    const response = await axios.get("http://localhost:3000/order");
    setOrder(response.data.data);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleAdd = () => {
    navigate("/order");
  };

  const handleComplate = async(orderid)=>{
    const response = await axios.put(`http://localhost:3000/order/status/${orderid}`);
    console.log(response);
    alert("order complated")
  }

  return (
    <>
    <Navbar/>
      <table className="table table-warning">
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>USER ID</th>
            <th>STATUS</th>
            <th>PRODUCT ID</th>
            <th>QTY</th>
             
          </tr>
        </thead>

        <tbody>
          {order?.map((element) => (
            <tr key={element.orderid}>
              <td>{element.orderid}</td>
              <td>{element.userid}<br/>
              {element.user.username}<br/>
              {element.user.mobileno}



              </td>

              <td>
                
                <button type='button' onClick={()=>handleComplate(element.orderid)} className='btn btn-primary' >
                  {element.status}
                  </button>
              </td>   

              <td>
              {element.product.productname}<br/>
              Price:- {element.product.price} Rs.



              </td>
              <td>{element.qty}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
