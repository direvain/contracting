import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../../../utils/utils';
import styles from './SupplierRegistration.module.css';


function SupplierRegistration() {

    const [registrationInfo, setRegistrationInfo] = useState({
        supplierName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        supplierPhone: '',
        supplierProduct: '',
        commercialRegister: ''
    })

    // const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleChange = async (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyRegistrationInfo = { ...registrationInfo };
        copyRegistrationInfo[name] = value;
        setRegistrationInfo(copyRegistrationInfo);
    }

    // const handleFileChange = async (e) => {
    //     console.log(e.target.name);
    //     console.log(e.target.files);
    //     if (e.target.files) {
    //         setFile(e.target.files[0]);
    //     }
    // }

    // Phone منع ادخال احرف مثلا في ال 
    const handleKeyPress = (e) => {
        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault(); // منع الإدخال إذا لم يكن رقماً
            handleError("Please enter a number");
        }
    };

    // input في اي paste منع عمل 
    const handlePaste = (e) => {
        e.preventDefault();
        handleError("Paste is not allowed.");
    };


    const handleRegistration = async (e) => {
        e.preventDefault();
        // تحديد الحقول المطلوبة
        const requiredFields = ['supplierName', 'email', 'username', 'supplierPhone', 'password', 'confirmPassword',  'supplierProduct', 'commercialRegister'];

        // التحقق من وجود الحقول المطلوبة
        const missingFields = requiredFields.filter(field => !registrationInfo[field]);

        if (missingFields.length > 0) {
            return handleError(`The following fields are required: ${missingFields.join(', ')}`);
        }

        // if(file == null) {
        //     return handleError(`The MISS FILE`);
        // }

        try {
            const url = `http://localhost:8080/auth/supplier/registration`;
            
            // const formData = new FormData(file);
            // formData.append('body', JSON.stringify(registrationInfo));

            // formData.append('commercialRegister', file);
            // console.log(formData);

            const response = await fetch(url, {    
                method: "POST",
                headers: {
                    // 'Content-Type': 'multipart/form-data'
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationInfo) // formData
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/supplier-login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <section className={styles.supplierBody}>
            <div className={styles.supplierRegistrationContainer}>
                <h1 className={styles.supplierRegistrationH1}>Supplier Registration</h1>
                <form className={styles.supplierFormRegistration} onSubmit={handleRegistration}>
                    <div className={styles.supplierRegistrationDiv}>
                        <label className={styles.supplierRegistrationLabel} htmlFor='supplierName'>Supplier Name</label>
                        <input
                            className={styles.supplierRegistrationInput}
                            onChange={handleChange}
                            onPaste={handlePaste}
                            type='text'
                            name='supplierName'
                            placeholder='Enter your supplier name...'
                            value={registrationInfo.supplierName}
                            autoFocus
                        />
                    </div>
                    <div className={styles.supplierRegistrationDiv}>
                        <label className={styles.supplierRegistrationLabel} htmlFor='email'>Email</label>
                        <input
                            className={styles.supplierRegistrationInput}
                            onChange={handleChange}
                            onPaste={handlePaste}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={registrationInfo.email}
                        />
                    </div>
                    <div className={styles.supplierRegistrationDiv}>
                        <label className={styles.supplierRegistrationLabel} htmlFor='username'>Username</label>
                        <input
                            className={styles.supplierRegistrationInput}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            onPaste={handlePaste}
                            type='username'
                            name='username'
                            inputmode="numeric" 
                            maxlength="9"
                            placeholder='Enter your company ID for username...'
                            value={registrationInfo.username}
                        />
                    </div>
                    <div className={styles.supplierRegistrationDiv}>
                        <label className={styles.supplierRegistrationLabel} htmlFor='supplierPhone'>Supplier Phone</label>
                        <input
                            className={styles.supplierRegistrationInput}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            onPaste={handlePaste}
                            type='tel'
                            name='supplierPhone'
                            inputmode="numeric" 
                            maxlength="10"
                            placeholder='Enter your Supplier Phone...'
                            value={registrationInfo.supplierPhone}
                        />
                    </div>
                    <div className={styles.supplierRegistrationDiv}>
                        <label className={styles.supplierRegistrationLabel} htmlFor='password'>Password</label>
                        <input
                            className={styles.supplierRegistrationInput}
                            onChange={handleChange}
                            onPaste={handlePaste}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={registrationInfo.password}
                        />
                    </div>
                    <div className={styles.supplierRegistrationDiv}>
                        <label className={styles.supplierRegistrationLabel} htmlFor='confirmPassword'>Confirm Password</label>
                        <input
                            className={styles.supplierRegistrationInput}
                            onChange={handleChange}
                            onPaste={handlePaste}
                            type='password'
                            name='confirmPassword'
                            placeholder='Enter your Confirm Password...'
                            value={registrationInfo.confirmPassword}
                        />
                    </div>
                    <div className={styles.supplierRegistrationDiv}>
                        <label className={styles.supplierRegistrationLabel} htmlFor='supplierProduct'>Supplier Product</label>
                        <select
                            className={styles.supplierRegistrationSelect}
                            name="supplierProduct" 
                            onChange={handleChange}
                            value={registrationInfo.supplierProduct} 
                        >
                            <option value="">Select an option</option>
                            <option value="Concrete">Concrete</option>
                            <option value="Cement">Cement</option>
                        </select>
                    </div>
                    <div className={styles.supplierRegistrationDiv}>
                        <label className={styles.supplierRegistrationLabel} htmlFor='commercialRegister'>Commercial Register</label>
                        <input 
                            className={styles.supplierCommercialRegister}
                            onChange={handleChange}
                            type='file'
                            name='commercialRegister'
                            accept="application/pdf"
                            value={registrationInfo.commercialRegister}
                        />
                    </div>

                    <button className={styles.supplierRegistrationButton} type='submit'>Registration</button>
                    <span className={styles.supplierRegistrationSpan}>Already have an account ?
                        <Link className={styles.supplierRegistrationLink} to="/supplier-login"> Login</Link>
                    </span>
                    <span className={styles.supplierRegistrationSpan}>If you are a contracting company?
                        <Link className={styles.supplierRegistrationLink} to="/company-registration"> Contracting Company</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </section>
    )
}

export default SupplierRegistration;