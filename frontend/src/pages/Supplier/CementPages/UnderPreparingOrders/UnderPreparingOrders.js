import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './UnderPreparingOrders.module.css';
import Navbar from '../../../../components/navbar/Navbar';
import Footer from '../../../../components/footer/Footer';
function UnderPreparingOrders() {
    const [orderData, setOrderData] = useState([]);

    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/supplier-login');
        }, 500)
    }

    const orderCompleted = async () => {
        try{
            const data = {
                "status": "old"
            }
            const url = 'http://localhost:8080/auth/supplier/update-cement-order';
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message + 'Order has been delivered');
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
            fetchOrderData();
        } catch (error) {
            handleError('Error dropping order:', error);
        }
    }

    const fetchOrderData = async () => {
        try {
            const statuses = "under preparing,completed";
            const url = `http://localhost:8080/auth/supplier/order-data?status=${statuses}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const result = await response.json();
            setOrderData(result);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchOrderData();
    }, []);

    return(
        <section className={styles.underPreparingOrdersBody}>
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

            
            <div className={styles.underPreparingOrdersTitle}>
                <h2 className={styles.underPreparingOrdersH2}>Under Preparing Orders</h2>
            </div>
            <div className={styles.underPreparingOrdersContainer}>
                {orderData && orderData.length > 0 ? (
                    orderData.map((order) => (
                        <div className={styles.underPreparingOrdersRow} key={order._id}> {/* Use a unique key like order._id */}
                            <div className={styles.underPreparingOrdersDiv}>
                                <p className={`${styles.underPreparingOrdersData} ${styles.underPreparingOrdersSupplierName}`}>
                                    <strong>Supplier name:</strong> {order.supplierName} 
                                </p>
                                <p className={`${styles.underPreparingOrdersData} ${styles.underPreparingOrdersType}`}>
                                    <strong>Order type:</strong> {order.type} 
                                </p>
                            </div>
                            <div className={styles.underPreparingOrdersDiv}>
                                <p className={styles.underPreparingOrdersData}>
                                    <strong>Company name:</strong> {order.companyName} 
                                </p>
                                <p className={styles.underPreparingOrdersData}>
                                    <strong>Company phone:</strong> {order.companyPhone} 
                                </p>
                                <p className={styles.underPreparingOrdersData}>
                                    <strong>Recipient's name:</strong> {order.recipientName} 
                                </p>
                                <p className={styles.underPreparingOrdersData}>
                                    <strong>Recipient's phone:</strong> {order.recipientPhone} 
                                </p>
                                <p className={styles.underPreparingOrdersData}>
                                    <strong>Delivery time:</strong> {order.deliveryTime} 
                                </p>
                                <p className={styles.underPreparingOrdersData}>
                                    <strong>Location:</strong> {order.location} 
                                </p>
                            </div>
                            <div className={styles.underPreparingOrdersDiv}>
                                <p className={styles.underPreparingOrdersData}>
                                    <strong>Cement quantity:</strong> {order.cementQuantity} ton
                                </p>
                                <p className={styles.underPreparingOrdersData}>
                                    <strong>Number of cement bags:</strong> {order.cementNumberBags} 
                                </p>
                                <p className={styles.underPreparingOrdersData}>
                                    <strong>Cement price:</strong> {order.price} JD
                                </p>
                                <p className={styles.underPreparingOrdersData}>
                                    <strong>Order request time:</strong> {order.orderRequestTime} 
                                </p>
                            </div>
                            <div className={styles.pendingOrdersDivButton}>
                                {/* {if (status = 'under preparing') } */}
                                <button className={styles.pendingOrdersButtonCompleted} onClick={() => orderCompleted()}>completed</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.underPreparingOrdersP}>No under preparing orders found</p>
                )}
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

export { UnderPreparingOrders };