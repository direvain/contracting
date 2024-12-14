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
            navigate('/company-login');
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
        <section className={styles.underPreparingOrdersBody}>
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
                                {/* show when supplier press to button complete */}
                                {/* <div className={styles.pendingOrdersDivButton}>
                                    <button className={styles.pendingOrdersButton} onClick={() => deliveredOrder(order._id)}>Delivered</button>
                                </div> */}
                            </div>
                        ))
                    ) : (
                        <p underPreparingOrdersP>No under preparing orders found</p>
                    );
                })()}
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

export { UnderPreparingOrders };