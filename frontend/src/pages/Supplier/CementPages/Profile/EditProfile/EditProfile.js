import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../../../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './EditProfile.module.css';
import Navbar from '../../../../../components/navbar/Navbar';
import Footer from '../../../../../components/footer/Footer';

function EditProfile() {
    const [supplierData, setSupplierData] = useState('');
    const [inputValue, setInputValue] = useState({
            price: '',
            password: '',
            confirmPassword: '',
            supplierPhone: '',
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
        if (name==="phone"){
            if (value=""){}
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
                const url = `http://localhost:8080/auth/supplier/update-price`;
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
                    setTimeout(() => {
                        navigate("/supplier/cement/profile");
                    }, 500);
                } else if (error) {
                    const details = error?.details[0].message;
                    handleError(details);
                } else if (!success) {
                    handleError(message);
                }
                console.log(result);
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
        <section className={styles.editPriceBody}>
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

            <div className={styles.editPriceContainer}>
                <div className={styles.editPriceRow}>
                    <h1 className={styles.editPriceH1}>Edit information</h1>
                    <form className={styles.editPriceForm} onSubmit= {handleUpdatePrice}>
                        <div className={styles.editPriceDiv}>
                            <label className={styles.editPriceLabel} ><strong>Change the Cement price:</strong></label>
                            <input
                                className={styles.editPriceInput}
                                onChange= {handleChange}
                                type='text'
                                name='price' 
                                placeholder= {supplierData.price}
                                value={inputValue.price}
                                autoFocus
                            />
                            <br></br>
                            <label className={styles.editPriceLabel} ><strong>Change the phone number:</strong></label>
                            <input
                                className={styles.editPriceInput}
                                onChange= {handleChange}
                                type='text'
                                name='phone'
                                placeholder= {supplierData.supplierPhone}
                                autoFocus
                            />
                            <br></br>
                            <label className={styles.editPriceLabel} ><strong>Change the password:</strong></label>
                            <input
                                className={styles.editPriceInput}
                                onChange= {handleChange}
                                type='text'
                                name='password' 
                                placeholder= 'password'
                                autoFocus
                            />
                            <br></br>
                            <label className={styles.editPriceLabel}><strong>Change the confirm password:</strong></label>
                            <input
                                className={styles.editPriceInput}
                                onChange= {handleChange}
                                type='text'
                                name='password' 
                                placeholder= 'confirm password'
                                autoFocus
                            />
                        </div>
                        <button className={styles.editPriceButton} type='submit'>Update</button>
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

export { EditProfile };