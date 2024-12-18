import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './OldOrders.module.css';
import Navbar from '../../../../Components/navbar/Navbar';
import Footer from '../../../../Components/footer/Footer';

function OldOrders() {
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
                const status = "old";
                const url = `http://localhost:8080/auth/company/order-data?status=${status}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                const result = await response.json();
                setDataCementOrder(result);
            } catch (err) {
                handleError(err);
            }
        }
        fetchDataCementOrder();
    }, []);

    return(
        <section className={styles.oldOrdersBody}>
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

            
            <div className={styles.oldOrdersTitle}>
                <h2 className={styles.oldOrdersH2}>Old Orders</h2>
            </div>
            <div className={styles.oldOrdersContainer}>
                {dataCementOrder && dataCementOrder.length > 0 ? (
                    dataCementOrder.map((order) => (
                        <div className={styles.oldOrdersRow} key={order._id}> 
                            <div className={styles.oldOrdersDiv}>
                                <p className={`${styles.oldOrdersData} ${styles.oldOrdersSupplierName}`}>
                                    <strong>Supplier name:</strong> {order.supplierName} 
                                </p>
                                <p className={`${styles.oldOrdersData} ${styles.oldOrdersType}`}>
                                    <strong>Order type:</strong> {order.type} 
                                </p>
                            </div>
                            <hr />
                            <div className={styles.oldOrdersDiv}>
                                <p className={styles.oldOrdersData}>
                                    <strong>Company name:</strong> {order.companyName} 
                                </p>
                                <p className={styles.oldOrdersData}>
                                    <strong>Company phone:</strong> {order.companyPhone} 
                                </p>
                                <p className={styles.oldOrdersData}>
                                    <strong>Recipient's name:</strong> {order.recipientName} 
                                </p>
                                <p className={styles.oldOrdersData}>
                                    <strong>Recipient's phone:</strong> {order.recipientPhone} 
                                </p>
                                <p className={styles.oldOrdersData}>
                                    <strong>Delivery time:</strong> {order.deliveryTime} 
                                </p>
                                <p className={styles.oldOrdersData}>
                                    <strong>Location:</strong> {order.location} 
                                </p>
                            </div>
                            <div className={styles.oldOrdersDiv}>
                                <p className={styles.oldOrdersData}>
                                    <strong>Cement quantity:</strong> {order.cementQuantity} ton
                                </p>
                                <p className={styles.oldOrdersData}>
                                    <strong>Number of cement bags:</strong> {order.cementNumberBags} 
                                </p>
                                <p className={styles.oldOrdersData}>
                                    <strong>Cement price:</strong> {order.price} JD
                                </p>
                                <p className={styles.oldOrdersData}>
                                    <strong>Order request time:</strong> {order.orderRequestTime} 
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.oldOrdersP}>No old orders found</p>
                )}
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

export { OldOrders };
