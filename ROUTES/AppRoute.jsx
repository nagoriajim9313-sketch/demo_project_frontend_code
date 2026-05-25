import React from 'react'
import { Routes, Route } from 'react-router-dom'

import CagoryForm from '../Page/CagoryForm'
import CatagoryAll from '../Page/CatagoryAll'
import CatagoryUpdate from '../Page/CatagoryUpdate'
import ProductAll from '../Page/ProductAll'
import ProductForm from '../Page/ProductForm'
import OrderAll from '../Page/OrderAll'
import ProductDisplay from '../Page/ProductDisplay'
import UserForm from '../Page/UserForm'
import RegistrationForm from '../Page/RegistrationForm'
import AdminRegistration from '../Page/AdminRegistration'
 
import ProductUpdate from '../Page/ProductUpdate'
import AdminLogin from '../Page/AdminLogin'
import Navbar from '../Page/Navbar'
import HomePage from '../Page/HomePage'

export default function AppRoute() {
  return (
      <Routes>
{/* navbar */}
   
     <Route path='/navbar' element={<Navbar/>} />

{/* Admin Registrationn */}

      <Route path='/admin' element={<AdminRegistration/>} />
      <Route path='/adminlogin' element={<AdminLogin/>} />

{/* Sign Up         */}
       
       <Route path='/registration' element={<RegistrationForm/>} />

{/* User Login         */}

       <Route path='/login' element={<UserForm/>} />
       

{/* catagory routes */}

        <Route path='/catagory' element={<CagoryForm/>} />
        <Route path='/catagorys' element={<CatagoryAll/>} />
        <Route path='/catagoryedit/:catagoryid' element={<CatagoryUpdate/>}/>

{/* product routes */}
        
        <Route path='/product' element={<ProductForm/>} />
        <Route path='/products' element={<ProductAll/>} />
        <Route path='/productedit/:productid' element={<ProductUpdate/>} />
        <Route path='/productdisplay' element={<ProductDisplay/>} />

{/* order routes */}

        
       <Route path='/orders' element={<OrderAll/>} />

{/* home routes        */}

      <Route path='/homepage' element={<HomePage/>} />

      </Routes>
  )
}
