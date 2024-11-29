import { handleSuccess } from '../../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './CementOrder.module.css';
import Navbar from '../../../../components/navbar/Navbar';
import Footer from '../../../../components/footer/Footer';

function CementOrder() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/company-login');
        }, 1000)
    }

    return(
        <section className={styles.profileBody}>
            <Navbar 
                one="Home"
                pathOne="/company/home"
                two="Orders"
                two1="Preparing orders"
                pathTwo1="/company/home/preparing-orders"
                two2="Pending orders"
                pathTwo2="/company/home/pending-orders"
                two3="Past orders"
                pathTwo3="/company/home/past-orders"
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
                    <form className={styles.cementOrderForm} onSubmit= '' /*{handleLogin}*/>
                        <div className={styles.cementOrderDiv}>
                            <label className={styles.cementOrderLabel} htmlFor=''>Enter the required amount of cement  in tonne</label>
                            <input
                                className={styles.cementOrderInput}
                                onChange='' // {handleChange}
                                type=''
                                name=''
                                placeholder='Enter the required amount of cement  in tonne...'
                                value=''  //{loginInfo.username}
                            />
                        </div>
                        <div className={styles.cementOrderDiv}>
                            <p className={styles.cementOrderP}>20 bags of cement equals 1 tonne</p>
                        </div>
                        <button className={styles.cementOrderButton} type='submit'>checkout</button>
                    </form>
                </div>
            </div>

            <Footer 
                one="Home"
                pathOne="/company/home"
                two="Orders"
                two1="Preparing orders"
                pathTwo1="/company/home/preparing-orders"
                two2="Pending orders"
                pathTwo2="/company/home/pending-orders"
                two3="Past orders"
                pathTwo3="/company/home/past-orders"
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