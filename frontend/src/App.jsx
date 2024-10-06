// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Register from './Register';
// import Login from './Login';
// import BridalHomePage from './BridalHomePage';
// import MainHomePage from './MainHomePage';



// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<BridalHomePage />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<MainHomePage />} />
//         <Route path="/admin" element={<MainHomePage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Register from './Register';
import Login from './Login';
import BridalHomePage from './BridalHomePage';
import MainHomePage from './MainHomePage';
import Admin from './components/Admin.jsx';
import Services from './components/services.jsx';
import About from './components/About.jsx';
import Jewels from './components/jewels.jsx';
import Location from './components/Location.jsx';
import Cart from './components/Cart.jsx';
import AdminAppointments from './components/AdminAppointments.jsx';
import Appointment from './components/Appointment.jsx';
import ShippingDetails from './components/ShippingDetails.jsx';
import Payment from './components/Payment.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<BridalHomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<MainHomePage />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/about" element={<About/>} />
        <Route path='/services' element={<Services/>}/>
        <Route path='/jewels' element={<Jewels/>}/>
        <Route path='/location' element={<Location/>}/>
        <Route path="/cart" element={<Cart/>} />   
        <Route path="/appointment" element={<Appointment/>} />   

        <Route path="/shipping-details" element={<ShippingDetails/>} />
        <Route path="/payment" element={<Payment/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
