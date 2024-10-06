import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css';
import AppointmentDetails from './AppointmentDetails.jsx';
import ServiceAppointmentDetails from './ServiceAppointmentDetails.jsx';
import OrderDetails from './OrderDetails.jsx'; // Import the new OrderDetails component

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [jewels, setJewels] = useState([]);
  const [normalAppointments, setNormalAppointments] = useState([]);
  const [servicesAppointments, setServicesAppointments] = useState([]);
  const [orders, setOrders] = useState([]); // Define orders state
  const [newJewel, setNewJewel] = useState({ name: '', price: '', description: '', imageUrl: '' });
  const [selectedNormalAppointment, setSelectedNormalAppointment] = useState(null);
  const [selectedServiceAppointment, setSelectedServiceAppointment] = useState(null);
  const [showNormalDetails, setShowNormalDetails] = useState(false);
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('users');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [editingJewel, setEditingJewel] = useState(null); // State for editing a jewel

  const handleEditJewel = (jewel) => {
       setSelectedMenu('addJewel')
      setEditingJewel(jewel);
      setNewJewel(jewel); // Populate the newJewel state with the jewel to edit
  };
  
  const handleUpdateJewel = async () => {
      try {
          const response = await axios.put(`http://localhost:3001/jewels/${editingJewel._id}`, newJewel);
          setJewels(jewels.map(jewel => (jewel._id === editingJewel._id ? response.data : jewel))); // Update the jewel in the list
          setNewJewel({ name: '', price: '', description: '', imageUrl: '' }); // Reset the form
          setEditingJewel(null); // Close the edit form
      } catch (error) {
          console.error('Error updating jewel:', error);
      }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:3001/users');
        const jewelsResponse = await axios.get('http://localhost:3001/jewels');
        const normalAppointmentsResponse = await axios.get('http://localhost:3001/normalAppointments');
        const servicesAppointmentsResponse = await axios.get('http://localhost:3001/servicesAppointments');
        const ordersResponse = await axios.get('http://localhost:3001/orders');
    
        setUsers(usersResponse.data);
        setJewels(jewelsResponse.data);
        setNormalAppointments(normalAppointmentsResponse.data);
        setServicesAppointments(servicesAppointmentsResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again later.'); // User-friendly error message
      }
    };
    

    fetchData();
  }, []);



  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleConfirmOrder = () => {
    if (selectedOrder) {
      handleWhatsAppMessage(selectedOrder.customerPhone, `Your order with ID: ${selectedOrder._id} has been confirmed.`);
      setShowOrderDetails(false);
      setSelectedOrder(null);
    }
  };
  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/orders/${id}`);
      setOrders(orders.filter(order => order._id !== id)); // Update orders state
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };


  const handleAddJewel = async () => {
    try {
      const response = await axios.post('http://localhost:3001/jewels', newJewel);
      setJewels([...jewels, response.data]);
      setNewJewel({ name: '', price: '', description: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding jewel:', error);
    }
  };

  const handleDeleteJewel = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/jewels/${id}`);
      setJewels(jewels.filter(jewel => jewel._id !== id));
    } catch (error) {
      console.error('Error deleting jewel:', error);
    }
  };

  const handleDeleteAppointment = async (id, type) => {
    const endpoint = type === 'normal' ? `/normalAppointments/${id}` : `/servicesAppointments/${id}`;
    try {
      await axios.delete(`http://localhost:3001${endpoint}`);
      if (type === 'normal') {
        setNormalAppointments(normalAppointments.filter(appointment => appointment._id !== id));
      } else {
        setServicesAppointments(servicesAppointments.filter(appointment => appointment._id !== id));
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleWhatsAppMessage = (phoneNumber, message) => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) {
        throw new Error('Error updating user role');
      }
      console.log('User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  
  
  const renderContent = () => {
    switch (selectedMenu) {
      case 'users':
  return (
    <div className="content-section">
      <h3>User Details</h3>
      <ul className="user-list">
        {users.map(user => (
          <li key={user._id}>
            {user.email} - 
            <select 
              value={user.role} 
              onChange={(e) => handleRoleChange(user._id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );

        case 'addJewel':
          return (
              <div className="content-section">
                  <h3>{editingJewel ? 'Edit Jewel' : 'Add Jewel'}</h3>
                  <form className="add-jewel-form" onSubmit={(e) => { e.preventDefault(); editingJewel ? handleUpdateJewel() : handleAddJewel(); }}>
                      <input
                          type="text"
                          placeholder="Name"
                          value={newJewel.name}
                          onChange={e => setNewJewel({ ...newJewel, name: e.target.value })}
                          required
                      />
                      <input
                          type="number"
                          placeholder="Price"
                          value={newJewel.price}
                          onChange={e => setNewJewel({ ...newJewel, price: e.target.value })}
                          required
                      />
                      <textarea
                          placeholder="Description"
                          value={newJewel.description}
                          onChange={e => setNewJewel({ ...newJewel, description: e.target.value })}
                          required
                      />
                      <input
                          type="text"
                          placeholder="Image URL"
                          value={newJewel.imageUrl}
                          onChange={e => setNewJewel({ ...newJewel, imageUrl: e.target.value })}
                          required
                      />
                      <button type="submit">{editingJewel ? 'Update Jewel' : 'Add Jewel'}</button>
                      {editingJewel && <button type="button" onClick={() => { setEditingJewel(null); setNewJewel({ name: '', price: '', description: '', imageUrl: '' }); }}>Cancel</button>}
                  </form>
              </div>
          );
      
        case 'products':
          return (
              <div className="content-section">
                  <h3>Jewels</h3>
                  <ul className="jewel-list">
                      {jewels.map(jewel => (
                          <li key={jewel._id} className="jewel-item">
                              <img src={jewel.imageUrl} alt={jewel.name} className="jewel-image" />
                              <div>
                                  <p>{jewel.name} - ${jewel.price}</p>
                                  <button onClick={() => handleEditJewel(jewel)}>Edit</button> {/* Add Edit button */}
                                  <button onClick={() => handleDeleteJewel(jewel._id)}>Delete</button>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
          );
      
      case 'appointments':
        return (
          <div className="content-section">
            <h3>Normal Appointment Details</h3>
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Booking Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {normalAppointments.map(appointment => (
                  <tr key={appointment._id}>
                    <td>{appointment.name}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.phone}</td>
                    <td>{new Date(appointment.bookingDate).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => {
                        setSelectedNormalAppointment(appointment);
                        setShowNormalDetails(true);
                      }}>View Details</button>
                      <button onClick={() => handleDeleteAppointment(appointment._id, 'normal')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'servicesAppointments':
        return (
          <div className="content-section">
            <h3>Services Appointment Details</h3>
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Booking Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {servicesAppointments.map(appointment => (
                  <tr key={appointment._id}>
                    <td>{appointment.name}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.phone}</td>
                    <td>{new Date(appointment.bookingDate).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => {
                        setSelectedServiceAppointment(appointment);
                        setShowServiceDetails(true);
                      }}>View Details</button>
                      <button onClick={() => handleDeleteAppointment(appointment._id, 'services')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        case 'orders':
        return (
          <div className="content-section">
            <h3>Orders</h3>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>${order.totalPrice}</td>
                    <td>{order.status}</td>
                    <td>
                      <button onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderDetails(true);
                      }}>View Order</button>
                      <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );



      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h2>Admin Dashboard</h2>
      </header>
      <div className="admin-content">
        <aside className="sidebar">
          <ul>
            <li onClick={() => setSelectedMenu('users')}>User Details</li>
            <li onClick={() => setSelectedMenu('addJewel')}>Add Jewels</li>
            <li onClick={() => setSelectedMenu('products')}>Products</li>
            <li onClick={() => setSelectedMenu('appointments')}>Appointments</li>
            <li onClick={() => setSelectedMenu('servicesAppointments')}>Services Appointments</li>
            <li onClick={() => setSelectedMenu('orders')}>Orders</li>
          </ul>
        </aside>

        <main className="main-content">
          {renderContent()}
        </main>
      </div>

      {showNormalDetails && selectedNormalAppointment && (
        <AppointmentDetails
          appointment={selectedNormalAppointment}
          onClose={() => setShowNormalDetails(false)}
          onConfirm={() => {
            handleWhatsAppMessage(selectedNormalAppointment.phone, 'Your appointment has been confirmed successfully.');
            setShowNormalDetails(false);
          }}
          onCancel={() => {
            handleWhatsAppMessage(selectedNormalAppointment.phone, 'Your appointment was cancelled by the admin.');
            handleDeleteAppointment(selectedNormalAppointment._id, 'normal');
            setShowNormalDetails(false);
          }}
        />
      )}

      {showServiceDetails && selectedServiceAppointment && (
        <ServiceAppointmentDetails
          appointment={selectedServiceAppointment}
          onClose={() => setShowServiceDetails(false)}
          onConfirm={() => {
            handleWhatsAppMessage(selectedServiceAppointment.phone, 'Your service appointment has been confirmed successfully.');
            setShowServiceDetails(false);
          }}
          onCancel={() => {
            handleWhatsAppMessage(selectedServiceAppointment.phone, 'Your service appointment was cancelled by the admin.');
            handleDeleteAppointment(selectedServiceAppointment._id, 'services');
            setShowServiceDetails(false);
          }}
        />
      )}
    {showOrderDetails && selectedOrder && (
  <OrderDetails
    order={selectedOrder}
    onClose={() => setShowOrderDetails(false)}
    onConfirm={() => {
      // Constructing a detailed message for WhatsApp
      const itemsList = selectedOrder.items
        .map(item => `${item.itemName} (Qty: ${item.quantity}) - $${item.price.toFixed(2)}`)
        .join('\n');

      const message = `Hi ${selectedOrder.shippingInfo.name},\n\n` +
                      `Your order has been confirmed successfully.\n\n` +
                      `Order ID: ${selectedOrder._id}\n` +
                      `Items:\n${itemsList}\n\n` +
                      `Total Price: $${selectedOrder.totalPrice.toFixed(2)}\n` +
                      `Status: ${selectedOrder.status}`;

      handleWhatsAppMessage(selectedOrder.shippingInfo.phone, message);
      setShowOrderDetails(false);
    }}
  />
)}


    </div>
  );
};

export default Admin;
