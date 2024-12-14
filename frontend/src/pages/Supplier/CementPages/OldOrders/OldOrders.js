import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './OldOrders.module.css';
import Navbar from '../../../../components/navbar/Navbar';
import Footer from '../../../../components/footer/Footer';

function OldOrders() {
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
        <section className={styles.OldOrdersBody}>
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

            
            <div className={styles.OldOrdersTitle}>
                <h2 className={styles.OldOrdersH2}>Old Orders</h2>
            </div>
            <div className={styles.OldOrdersContainer}>
                {(() => {
                    {/* filter make in backend (send status ---> query parameter ) */}
                    const OldOrders = dataCementOrder.filter(order => order.status === "old"); // Filter once
                    return OldOrders.length > 0 ? (
                        OldOrders.map((order, index) => (
                            <div className={styles.OldOrdersRow} key={order._id}> {/* Use a unique key like order._id */}
                                <div>
                                    <p className={`${styles.OldOrdersData} ${styles.OldOrdersSupplierName}`}><strong>Supplier name:</strong> {order.supplierName} </p>
                                </div>
                                <div className={styles.OldOrdersDiv}>
                                    <p className={styles.OldOrdersData}><strong>Company name:</strong> {order.companyName} </p>
                                    <p className={styles.OldOrdersData}><strong>Company phone:</strong> {order.companyPhone} </p>
                                    <p className={styles.OldOrdersData}><strong>Recipient's name:</strong> {order.recipientName} </p>
                                    <p className={styles.OldOrdersData}><strong>Recipient's phone:</strong> {order.recipientPhone} </p>
                                    <p className={styles.OldOrdersData}><strong>Delivery time:</strong> {order.deliveryTime} </p>
                                    <p className={styles.OldOrdersData}><strong>Location:</strong> {order.location} </p>
                                </div>
                                <div className={styles.OldOrdersDiv}>
                                    <p className={styles.OldOrdersData}><strong>Cement quantity:</strong> {order.cementQuantity} ton</p>
                                    <p className={styles.OldOrdersData}><strong>Number of cement bags:</strong> {order.cementNumberBags} </p>
                                    <p className={styles.OldOrdersData}><strong>Cement price:</strong> {order.price} JD</p>
                                    <p className={styles.OldOrdersData}><strong>Order request time:</strong> {order.orderRequestTime} </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p OldOrdersP>No old orders found</p>
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

export { OldOrders };