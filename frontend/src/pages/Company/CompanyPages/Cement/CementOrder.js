import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './CementOrder.module.css';
import Navbar from '../../../../Components/navbar/Navbar';
import Footer from '../../../../Components/footer/Footer';

function CementOrder() {
    const [dataSupplier, setDataSupplier] = useState([]);
    const [inputValue, setInputValue] = useState({
        supplierName: '',
        amountOfCement: ''
    });
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/company-login');
        }, 500)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // تحقق من حقل "amountOfCement" فقط
        if (name === "amountOfCement") {
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
                const decimalPlaces = value.split(".")[2];
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
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        
        // Check if the select field is empty
        if (!inputValue.supplierName) {
            handleError("Please select a supplier name");
            return;
        }
        
        // Check if the input field is empty
        if (!inputValue.amountOfCement) {
            handleError("Please enter the required quantity of cement");
            return;
        }

        setTimeout(() => { 
            navigate(`/company/home/cement-order/cement-bill?supplierName=${inputValue.supplierName}&amountOfCement=${inputValue.amountOfCement}`) // (function) سيتم تنفيذها بعد انتهاء الوقت
        }, 500)
    }

    useEffect(() => {
        const fetchDataSupplier = async () => {
            try {
                const url = `http://localhost:8080/auth/company/data-supplier`;
                const headers = {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                    }
                }
                const response = await fetch(url, headers);
                const result = await response.json();
                console.log(result);
                
                setDataSupplier(result); // Set dataSupplier to the entire array
                
            } catch (err) {
                handleError(err);
            }
        }
        fetchDataSupplier();
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

            <div className={styles.cementOrderContainer}>
                <div className={styles.cementOrderRow}>
                    <h1 className={styles.cementOrderH1}>Cement Order</h1>
                    <form className={styles.cementOrderForm} onSubmit= {handleCheckout}>
                        <div className={styles.cementOrderDiv}>
                            <label className={styles.cementOrderLabel} htmlFor='supplierName'>Supplier name</label>
                            <select
                                className={styles.cementOrderSelect}
                                name="supplierName" 
                                onChange={handleChange}
                                value={inputValue.supplierName} 
                            >
                                <option value="">Select an option</option>
                                {dataSupplier.map((supplier, index) => (
                                    <option key={index} value={supplier.supplierName}>
                                        {supplier.supplierName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.cementOrderDiv}>
                            <label className={styles.cementOrderLabel} htmlFor='amountOfCement'>Enter the required amount of cement in ton</label>
                            <input
                                className={styles.cementOrderInput}
                                onChange= {handleChange}
                                type='text'
                                name='amountOfCement' 
                                placeholder='Enter the required amount of cement in ton...'
                                value={inputValue.amountOfCement}
                                autoFocus
                            />
                        </div>
                        <div className={styles.cementOrderDiv}>
                            <p className={styles.cementOrderP}>20 bags of cement equals 1 ton</p>
                        </div>
                        <button className={styles.cementOrderButton} type='submit'>checkout</button>
                    </form>
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
export default CementOrder;