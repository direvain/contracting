import React, { useState } from 'react'; // Ensure useState is imported
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../../../../utils/utils';
import styles from './add-admin.module.css';
import NavBar from '../../../../Components/navbar/Navbar';

function AddAdmin() {
    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/admin');
        }, 1000);
    }

    const [registrationInfo, setRegistrationInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyRegistrationInfo = { ...registrationInfo };
        copyRegistrationInfo[name] = value;
        setRegistrationInfo(copyRegistrationInfo);
    }

    const handleRegistration = async (e) => {
        e.preventDefault();

        // تحديد الحقول المطلوبة
        const requiredFields = ['email', 'password'];

        // التحقق من وجود الحقول المطلوبة
        const missingFields = requiredFields.filter(field => !registrationInfo[field]);

        if (missingFields.length > 0) {
            return handleError(`The following fields are required: ${missingFields.join(', ')}`);
        }

        try {
            const url = `http://localhost:8080/auth/addAdmin`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate(0);
                }, 1000);
            } else if (error) {
                // Check for details and handle accordingly
                const errorMsg = error?.details?.[0]?.message || result.message || 'An unknown error occurred';
                handleError(errorMsg);
            } else if (!success) {
                handleError(message);
            }

            console.log(result);
        } catch (err) {
            handleError(`An error occurred: ${err.message}`);
        }
    }

    return (
        <div>
            <NavBar
                two="Pending"
                two1="Request"
                pathTwo1="/admin/home/request-order"
                two2="Approve"
                pathTwo2="/admin/home/approve-order"
                two3="Reject"
                pathTwo3="/admin/home/reject-order"
                three="Add Admin"
                pathThree="/admin/home/Add-admin"
                logout={handleLogout}
            />
            <section className={styles.adminBody}>
                <div className={styles.adminRegistrationContainer}>
                    <h1 className={styles.adminRegistrationH1}>Add Admin</h1>
                    <form className={styles.adminFormRegistration} onSubmit={handleRegistration}>
                        <div className={styles.adminRegistrationDiv}>
                            <label className={styles.adminRegistrationLabel} htmlFor='email'>Email</label>
                            <input
                                className={styles.adminRegistrationInput}
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='Enter admin email...'
                                value={registrationInfo.email}
                                required
                            />
                        </div>
                        <br></br>
                        <div className={styles.adminRegistrationDiv}>
                            <label className={styles.adminRegistrationLabel} htmlFor='password'>Password</label>
                            <input
                                className={styles.adminRegistrationInput}
                                onChange={handleChange}
                                type='password'
                                name='password'
                                placeholder='Enter admin password...'
                                value={registrationInfo.password}
                                required
                            />
                        </div>
                        <button className={styles.adminRegistrationButton} type='submit'>Add Admin</button>
                        <ToastContainer />
                    </form>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
}

export default AddAdmin;
