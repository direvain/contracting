import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './PendingOrders.module.css';
import Navbar from '../../../../Components/navbar/Navbar';
import Footer from '../../../../Components/footer/Footer';

function PendingOrders() {
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

    const acceptOrder = async () => {
        try{
            const data = {
                "status": "under preparing"
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
                handleSuccess(message + "Order has been accepted");
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

    const rejectOrder = async () => {
        try{
            const data = {
                "status": "rejected"
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
                handleSuccess(message + "Order has been rejected");
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
            const status = "pending";
            const url = `http://localhost:8080/auth/supplier/order-data?status=${status}`;
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
        <section className={styles.PendingOrdersBody}>
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

            
            <div className={styles.pendingOrdersTitle}>
                <h2 className={styles.pendingOrdersH2}>Pending Orders</h2>
            </div>
            <div className={styles.pendingOrdersContainer}>
                {orderData && orderData.length > 0 ? (
                    orderData.map((order) => (
                        <div className={styles.pendingOrdersRow} key={order._id}> {/* Use a unique key like order._id */}
                            <div className={styles.pendingOrdersDiv}>
                                <p className={`${styles.pendingOrdersData} ${styles.pendingOrdersSupplierName}`}>
                                    <strong>Supplier name:</strong> {order.supplierName} 
                                </p>
                                <p className={`${styles.pendingOrdersData} ${styles.pendingOrdersType}`}>
                                    <strong>Order Type:</strong> {order.type} 
                                </p>
                            </div>
                            <div className={styles.pendingOrdersDiv}>
                                <p className={styles.pendingOrdersData}>
                                    <strong>Company name:</strong> {order.companyName} 
                                </p>
                                <p className={styles.pendingOrdersData}>
                                    <strong>Company phone:</strong> {order.companyPhone} 
                                </p>
                                <p className={styles.pendingOrdersData}>
                                    <strong>Recipient's name:</strong> {order.recipientName} 
                                </p>
                                <p className={styles.pendingOrdersData}>
                                    <strong>Recipient's phone:</strong> {order.recipientPhone} 
                                </p>
                                <p className={styles.pendingOrdersData}>
                                    <strong>Delivery time:</strong> {order.deliveryTime} 
                                </p>
                                <p className={styles.pendingOrdersData}>
                                    <strong>Location:</strong> {order.location} 
                                </p>
                            </div>
                            <div className={styles.pendingOrdersDiv}>
                                <p className={styles.pendingOrdersData}>
                                    <strong>Cement quantity:</strong> {order.cementQuantity} ton
                                </p>
                                <p className={styles.pendingOrdersData}>
                                    <strong>Number of cement bags:</strong> {order.cementNumberBags} 
                                </p>
                                <p className={styles.pendingOrdersData}>
                                    <strong>Cement price:</strong> {order.price} JD
                                </p>
                                <p className={styles.pendingOrdersData}>
                                    <strong>Order request time:</strong> {order.orderRequestTime} 
                                </p>
                            </div>
                            <div className={styles.pendingOrdersDivButton}>
                                <button className={styles.pendingOrdersButtonAccept} onClick={() => acceptOrder()}>Accept</button>
                                <button className={styles.pendingOrdersButtonReject} onClick={() => rejectOrder()}>Reject</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.pendingOrdersP}>No pending orders found</p>
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

export { PendingOrders };