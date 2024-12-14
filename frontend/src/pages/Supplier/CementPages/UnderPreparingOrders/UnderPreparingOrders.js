import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './UnderPreparingOrders.module.css';
import Navbar from '../../../../components/navbar/Navbar';
import Footer from '../../../../components/footer/Footer';

function UnderPreparingOrders() {
    const [dataCementOrder, setDataCementOrder] = useState([]);

    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/supplier-login');
        }, 500)
    }

    const deliveredOrder = async (orderId) => {
        try{
            const data = {
                "orderId": orderId,
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
        } catch (error) {
            handleError('Error dropping order:', error);
        }
    }

    useEffect(() => {
        const fetchDataCementOrder = async () => {
            try {
                const url = `http://localhost:8080/auth/company/data-cement-order`;
                const headers = {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                    }
                }
                const response = await fetch(url, headers);
                const result = await response.json();
                setDataCementOrder(result);
            } catch (err) {
                handleError(err);
            }
        }
        fetchDataCementOrder();
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
                {(() => {
                    {/* filter make in backend (send status ---> query parameter ) */}
                    const underPreparingOrders = dataCementOrder.filter(order => order.status === "under preparing"); // Filter once
                    return underPreparingOrders.length > 0 ? (
                        underPreparingOrders.map((order, index) => (
                            <div className={styles.underPreparingOrdersRow} key={order._id}> {/* Use a unique key like order._id */}
                                <div>
                                    <p className={`${styles.underPreparingOrdersData} ${styles.underPreparingOrdersSupplierName}`}><strong>Supplier name:</strong> {order.supplierName} </p>
                                </div>
                                <div className={styles.underPreparingOrdersDiv}>
                                    <p className={styles.underPreparingOrdersData}><strong>Company name:</strong> {order.companyName} </p>
                                    <p className={styles.underPreparingOrdersData}><strong>Company phone:</strong> {order.companyPhone} </p>
                                    <p className={styles.underPreparingOrdersData}><strong>Recipient's name:</strong> {order.recipientName} </p>
                                    <p className={styles.underPreparingOrdersData}><strong>Recipient's phone:</strong> {order.recipientPhone} </p>
                                    <p className={styles.underPreparingOrdersData}><strong>Delivery time:</strong> {order.deliveryTime} </p>
                                    <p className={styles.underPreparingOrdersData}><strong>Location:</strong> {order.location} </p>
                                </div>
                                <div className={styles.underPreparingOrdersDiv}>
                                    <p className={styles.underPreparingOrdersData}><strong>Cement quantity:</strong> {order.cementQuantity} ton</p>
                                    <p className={styles.underPreparingOrdersData}><strong>Number of cement bags:</strong> {order.cementNumberBags} </p>
                                    <p className={styles.underPreparingOrdersData}><strong>Cement price:</strong> {order.price} JD</p>
                                    <p className={styles.underPreparingOrdersData}><strong>Order request time:</strong> {order.orderRequestTime} </p>
                                </div>
                                <div className={styles.pendingOrdersDivButton}>
                                    <button className={styles.pendingOrdersButtonDelivered} onClick={() => deliveredOrder(order._id)}>Delivered</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p underPreparingOrdersP>No under preparing orders found</p>
                    );
                })()}
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