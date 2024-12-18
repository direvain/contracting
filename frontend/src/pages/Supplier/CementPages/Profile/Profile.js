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

    const [isDisabled, setIsDisabled] = useState(true);
    const [supplierData, setSupplierData] = useState('');
    const [inputValue, setInputValue] = useState({
            price: '',
    });

    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/supplier-login');
        }, 500)
    }

    const handleCheckboxChange = (event) => {
        setIsDisabled(event.target.checked);
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // تحقق من حقل "amountOfCement" فقط
        if (name === "price") {
            if (value === ".") {
                handleError("Dots alone are not acceptable input");
                return;
            } else if (/[^0-9.]/.test(value)) {
                handleError("Positive numbers only! Letters are not allowed");
                return;
            } else if ((value.match(/\./g) || []).length > 1) {
                handleError("Please ensure the input contains at most one decimal point");
                return;
            } else if (value.includes(".")) {
                const decimalPlaces = value.split(".")[1];
                if (decimalPlaces && decimalPlaces.length > 1) {
                    handleError("Ensure the number contains only one digit after the decimal point");
                    return;
                }
            }
        }

        // تحديث الكائن بشكل ديناميكي
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleUpdatePrice = async (e) => {
            e.preventDefault();
            
            // Check if the input field is empty
            if (!inputValue.price) {
                handleError(`Please enter cement price`);
                return;
            }
    
            try {
                const url = `http://localhost:8080/auth/supplier/update-cement-price`;
                const response = await fetch(url, {
                    method: "PATCH",
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({price: inputValue.price})
                });
                const result = await response.json();
                const { success, message, error } = result;
                if (success) {
                    handleSuccess(message);
                } else if (error) {
                    const details = error?.details[0].message;
                    handleError(details);
                } else if (!success) {
                    handleError(message);
                }
                console.log(result);
                fetchSupplierData();
            } catch (err) {
                handleError(err);
            }
            
        }

    const fetchSupplierData = async () => {
        try {
            const url = `http://localhost:8080/auth/supplier/supplier-data`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setSupplierData(result);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchSupplierData();
    }, []);

    return(
        <section className={styles.profileBody}>
            <Navbar 
                two="Orders"
                two1="Under preparing orders"
                pathTwo1="/supplier/cement/under-preparing-orders"
                two2="Pending orders"
                pathTwo2="/supplier/cement/pending-orders"
                two3="Old orders"
                pathTwo3="/supplier/cement/old-orders"
                four="Profile"
                pathFour="/supplier/cement/profile"
                logout={handleLogout}
            />

            <div className={styles.profileContainer}>
                <div className={styles.profileRow}>
                    <h1 className={styles.profileH1}>{decodedData.supplierName} Profile</h1>
                    <p><strong>Supplier Name:</strong> {decodedData.supplierName}</p>
                    <p><strong>Supplier ID:</strong> {decodedData.supplierID}</p>
                    <p><strong>Email:</strong> {decodedData.email}</p>
                    <p><strong>Phone:</strong> {decodedData.supplierPhone}</p>
                    <p><strong>Product:</strong> {decodedData.supplierProduct}</p>
                    <p>
                        <strong>Commercial Register: </strong> 
                        <a href={`http://localhost:5000/uploads/${supplierData.commercialRegister}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                    </p>
                    
                    <form className={styles.profileForm} onSubmit= {handleUpdatePrice}>
                        <div className={styles.profileDiv}>
                            <label className={styles.profileLabel} htmlFor='price'><strong>Change the cement price:</strong></label>
                            <input
                                className={styles.profileInput}
                                onChange= {handleChange}
                                type='text'
                                name='price' 
                                disabled={isDisabled}
                                placeholder= {supplierData.price}
                                value={inputValue.price}
                                autoFocus
                            />
                        </div>
                        <div className={styles.profileDiv}>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                    checked={isDisabled} 
                                />
                                Update Input
                            </label>
                        </div>
                        <button className={styles.profileButton} type='submit'>Upadte</button>
                    </form>

                </div>
            </div>

            <Footer 
                two="Orders"
                two1="Under preparing orders"
                pathTwo1="/supplier/cement/under-preparing-orders"
                two2="Pending orders"
                pathTwo2="/supplier/cement/pending-orders"
                two3="Old orders"
                pathTwo3="/supplier/cement/old-orders"
                four="Profile"
                pathFour="/supplier/cement/profile"
                logout={handleLogout}
            />
            <ToastContainer />
        </section>
    );
}

export { Profile };