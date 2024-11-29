import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import Navbar from '../../../../components/navbar/Navbar';
import Footer from '../../../../components/footer/Footer';

function Profile() {
    const [dataCompany, setDataCompany] = useState('');
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/company-login');
        }, 1000)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = `http://localhost:8080/auth/company/data-company`;
                const headers = {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                    }
                }
                const response = await fetch(url, headers);
                const result = await response.json();
                console.log(result);
                setDataCompany(result[0]);
            } catch (err) {
                handleError(err);
            }
        }
            fetchProducts();
    }, []);

    return(
        <section className={styles.profileBody}>
            <Navbar 
                one="Home"
                pathOne="/company/home"
                two="Orders"
                two1="Preparing orders"
                pathTwo1="/company/home/preparing-orders"
                two2="Pending orders"
                pathTwo2="/company/home/pending-orders"
                two3="Past orders"
                pathTwo3="/company/home/past-orders"
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
                    <h1 className={styles.profileH1}>{dataCompany?.companyName} Profile</h1>
                    <p><strong>Company Name:</strong> {dataCompany?.companyName}</p>
                    <p><strong>Username:</strong> {dataCompany?.username}</p>
                    <p><strong>Email:</strong> {dataCompany?.email}</p>
                    <p><strong>Phone:</strong> {dataCompany?.companyPhone}</p>
                    <p>
                        <strong>Commercial Register: </strong> 
                        {dataCompany?.commercialRegister && (
                            <a href={`http://localhost:5000/uploads/${dataCompany.commercialRegister}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                        )}
                    </p>
                </div>
            </div>

            <Footer 
                one="Home"
                pathOne="/company/home"
                two="Orders"
                two1="Preparing orders"
                pathTwo1="/company/home/preparing-orders"
                two2="Pending orders"
                pathTwo2="/company/home/pending-orders"
                two3="Past orders"
                pathTwo3="/company/home/past-orders"
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

export default Profile;