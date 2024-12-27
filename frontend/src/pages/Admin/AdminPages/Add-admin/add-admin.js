import React, { useState } from 'react'; // Ensure useState is imported
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../../../../utils/utils';
import styles from './add-admin.module.css';
import Navbar from '../../../../components/navbar/Navbar';

function AddAdmin() {
    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/admin');
        }, 500);
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
            const url = `http://localhost:8080/auth/add-admin`;
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
                    navigate('/admin/request-order');
                }, 500);
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
            <Navbar
                three="Approved"
                pathThree="/admin/home/approve-user"
                four="Rejected"
                pathFour="/admin/home/reject-user"

                five="Pending"
                pathFive="/admin/home/request-user"

                six="Add Admin"
                pathSix="/admin/add-admin"

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
                    </form>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
}

export default AddAdmin;
