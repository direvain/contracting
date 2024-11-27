import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './AdminHome.module.css';
import NavBar from '../../../Components/navbar'

function AdminHome() {
const [suppliers, setSuppliers] = useState([]); 
const [companies, setCompanies] = useState([]); 
 const [loggedInUser, setLoggedInUser] = useState('');
const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/admin');
        }, 1000)
    }
    const asd = (e) => {

        setTimeout(() => {
            navigate('/admin/home/supplier');
        }, 1000)
    }
    const fetchData = async () => 
    {
        try 
        {
            const url = `http://localhost:8080/products`; // Ensure this URL is correct
            const headers = 
            {
                headers: 
                    {
                        'Authorization': localStorage.getItem('token'),
                    }
            };
            const response = await fetch(url, headers);
            if (!response.ok) 
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json(); // fetch all data 
            console.log(result);
            const suppliersResult = result[0] || []; // access the supplier array
            const companiesResult = result[0] || []; // access the companies array
            setCompanies(companiesResult);
            setSuppliers(suppliersResult);
        } 
        catch (err) 
        {
            console.error('Failed to fetch suppliers:', err); // Debugging line
            handleError(err);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

    return (
            <div>
                <NavBar
                logo="logo"
                one="Supplier"
                two="Companies"
                three="Logout"
                four="add admin"
                />
                <h1>{loggedInUser}</h1>
                <h1>asdasdasdasd</h1>
                <div className='button-container'>
                    <button onClick={asd} className='sdf'>Supplier</button>
                    <button onClick={asd} className='sdf'>Companies</button>
                    <button onClick={handleLogout} className='sdf'>Logout</button>
                </div>
                <ToastContainer />
            </div> 
    )
}

export default AdminHome;
