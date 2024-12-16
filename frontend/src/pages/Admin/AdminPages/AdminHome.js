import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './AdminHome.module.css';
import NavBar from '../../../Components/navBAr/Navbar';

function AdminHome() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();


<<<<<<< HEAD
  const handleLogout = (e) => {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('role');
      handleSuccess('User Loggedout');
      setTimeout(() => {
          navigate('/admin');
      }, 1000)
  }
=======
    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/admin');
        }, 500)
    }
>>>>>>> a5572ed6e3751fba9d15c732b6f9bd7c5846724d

  return (
    <div>
      <NavBar
        two="Pending"
        two1="Request"
        pathTwo1="/admin/home/request-order"
        two2="Approve"
        pathTwo2="/admin/home/approve-order"
        two3="Reject"
        pathTwo3="/admin/home/reject-order"

        three="Add Admin"
        pathThree="/admin/home/Add-admin"

        logout={handleLogout}
      />
            
            <div>
            </div>
            
            <ToastContainer />
      <ToastContainer />
    </div>
  );
}

export default AdminHome;
