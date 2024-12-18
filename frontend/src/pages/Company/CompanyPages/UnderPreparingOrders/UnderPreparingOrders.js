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

    const orderDelivered = async (id) => {
        try{
            const data = {
                "id": id,
                "status": "delivered"
            }
            const url = 'http://localhost:8080/auth/company/update-cement-order';
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
                handleSuccess(message + "Order has been delivered");
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
            fetchDataCementOrder();
        } catch (error) {
            handleError('Error dropping order:', error);
        }
    }

    const fetchDataCementOrder = async () => {
        try {
            const statuses = "under_preparing,completed";
            const url = `http://localhost:8080/auth/company/order-cement-data?statuses=${statuses}`;
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

    useEffect(() => {
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
                {dataCementOrder && dataCementOrder.length > 0 ? (
                    dataCementOrder.map((order, index) => (
                        <div className={styles.underPreparingOrdersRow} key={index}>
                            <p className={`${styles.underPreparingOrdersData} ${styles.underPreparingOrdersSupplierName}`}>
                                <strong>Supplier name:</strong> {order.supplierName} 
                            </p>
                            <div className={styles.underPreparingOrdersDiv}>
                                <p className={`${styles.underPreparingOrdersData} ${styles.underPreparingOrdersStatus}`}>
                                    <strong>Order status:</strong> {order.status} 
                                </p>
                                <p className={`${styles.underPreparingOrdersData} ${styles.underPreparingOrdersType}`}>
                                    <strong>Order type:</strong> {order.type} 
                                </p>
                            </div>
                            <hr />
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
                            {order.status === 'completed' && (
                                <div className={styles.pendingOrdersDivButton}>
                                    <button className={styles.pendingOrdersButtonDelivered} onClick={() => orderDelivered(order.id)}>Delivered</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className={styles.underPreparingOrdersP} >No under preparing orders found</p>
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

export { UnderPreparingOrders };