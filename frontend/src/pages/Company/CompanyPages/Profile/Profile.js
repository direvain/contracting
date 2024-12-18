import React, { useEffect, useState } from 'react'
import {jwtDecode} from "jwt-decode";
import { handleError, handleSuccess } from '../../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import Navbar from '../../../../Components/navbar/Navbar';
import Footer from '../../../../Components/footer/Footer';

function Profile() {
    const token = localStorage.getItem("token");
    const decodedData = jwtDecode(token);

    const [companyCommercialRegister, setCompanyCommercialRegister] = useState('');
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/company-login');
        }, 500)
    }

    useEffect(() => {
        const fetchCommercialRegister = async () => {
            try {
                const url = `http://localhost:8080/auth/company/company-commercial-register`;
                const headers = {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                    }
                }
                const response = await fetch(url, headers);
                const result = await response.json();
                console.log(result);
                setCompanyCommercialRegister(result);
            } catch (err) {
                handleError(err);
            }
        }
        fetchCommercialRegister();
    }, []);

    return(
        <section className={styles.profileBody}>
            <Navbar 
                one="Home"
                pathOne="/company/home"
                two="Orders"
                two1="Under preparing orders"
                pathTwo1="/company/home/under-preparing-orders"
                two2="Pending orders"
                pathTwo2="/company/home/pending-orders"
                two3="Old orders"
                pathTwo3="/company/home/old-orders"
                three="Cement"
                pathThree="/company/home/cement-order"
                four="Concrete"
                pathFour="/company/home/concrete-order"
                five="Profile"
                pathFive="/company/home/profile"
                logout={handleLogout}
            />

            <div className={styles.profileContainer}>
                <div className={styles.profileRow}>
                    <h1 className={styles.profileH1}>{decodedData.companyName} Profile</h1>
                    <p><strong>Company Name:</strong> {decodedData.companyName}</p>
                    <p><strong>Company ID:</strong> {decodedData.companyID}</p>
                    <p><strong>Email:</strong> {decodedData.email}</p>
                    <p><strong>Phone:</strong> {decodedData.companyPhone}</p>
                    <p>
                        <strong>Commercial Register: </strong> 
                        <a href={`http://localhost:5000/uploads/${companyCommercialRegister.commercialRegister}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                    </p>
                </div>
            </div>

            <Footer 
                one="Home"
                pathOne="/company/home"
                two="Orders"
                two1="Under preparing orders"
                pathTwo1="/company/home/under-preparing-orders"
                two2="Pending orders"
                pathTwo2="/company/home/pending-orders"
                two3="Old orders"
                pathTwo3="/company/home/old-orders"
                three="Cement"
                pathThree="/company/home/cement-order"
                four="Concrete"
                pathFour="/company/home/concrete-order"
                five="Profile"
                pathFive="/company/home/profile"
                logout={handleLogout}
            />
            <ToastContainer />
        </section>
    );
}

export { Profile };