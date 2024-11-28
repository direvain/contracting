import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import CompanyList from './CompanyList';
import SupplierList from './SupplierList';
import styles from './AdminHome.module.css';
import NavBar from '../../../Components/navBAr/Navbar';

function AdminHome() {
  const [view, setView] = useState("home"); // Manage current view
  const [suppliers, setSuppliers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('role');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/admin');
    }, 1000);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const fetchProducts = async () => {
    try {
        const url = `http://localhost:8080/products`;
        const token = localStorage.getItem('token');
        const headers = {
            headers: {
                Authorization: token,
            },
        };
        const response = await fetch(url, headers);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Result:", result); // Add this to debug
        const suppliersResult = result[0] || [];
        const companiesResult = result[1] || [];
        setSuppliers(suppliersResult);
        setCompanies(companiesResult);
    } catch (err) {
        handleError(err);
    }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.adminBody}>
      <NavBar
        logo="Admin Panel"
        one="Suppliers"
        two="Companies"
        three="Logout"
        four="Add Admin"
        five="Dashboard"
        onClickOne={() => handleViewChange("suppliers")}
        onClickTwo={() => handleViewChange("companies")}
        onClickThree={handleLogout}
        onClickFour={() => handleViewChange("add-admin")}
        onClickFive={() => handleViewChange("home")}
      />

      <div>
        {view === "home" && <h2>Welcome, Admin!</h2>}
        {view === "suppliers" && <SupplierList suppliers={suppliers} />}
        {view === "companies" && <CompanyList companies={companies} />}
        {view === "add-admin" && <h2>Add Admin Feature Coming Soon!</h2>}
      </div>

      <ToastContainer />
    </div>
  );
}

export default AdminHome;
