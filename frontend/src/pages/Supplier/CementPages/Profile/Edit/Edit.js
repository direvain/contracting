import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../../../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Edit.module.css';
import Navbar from '../../../../../components/navbar/Navbar';
import Footer from '../../../../../components/footer/Footer';

function Edit() {
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
        <section className={styles.editBody}>
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

            <div className={styles.editContainer}>
                <div className={styles.editRow}>
                    <h1 className={styles.editH1}>Edit</h1>
                    <form className={styles.editForm} onSubmit= {handleUpdatePrice}>
                        <div className={styles.editDiv}>
                            <label className={styles.editLabel} htmlFor='price'><strong>Change the cement price:</strong></label>
                            <input
                                className={styles.editInput}
                                onChange= {handleChange}
                                type='text'
                                name='price' 
                                placeholder= {supplierData.price}
                                value={inputValue.price}
                                autoFocus
                            />
                        </div>
                        <button className={styles.editButton} type='submit'>Upadte</button>
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

export { Edit };