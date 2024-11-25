import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils/utils';

function CompanyRegistration() {

    const [registrationInfo, setRegistrationInfo] = useState({
        companyName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        companyPhone: '',
        commercialRegister: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyRegistrationInfo = { ...registrationInfo };
        copyRegistrationInfo[name] = value;
        setRegistrationInfo(copyRegistrationInfo);
    }

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
        const requiredFields = ['companyName', 'email', 'username', 'password', 'confirmPassword', 'companyPhone', 'commercialRegister'];

        // التحقق من وجود الحقول المطلوبة
        const missingFields = requiredFields.filter(field => !registrationInfo[field]);

        if (missingFields.length > 0) {
            return handleError(`The following fields are required: ${missingFields.join(', ')}`);
        }

        try {
            const url = `http://localhost:8080/auth/company/registration`;
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
                    navigate('/company-login')
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
        <div className='container registration'>
            <h1>Contracting Company Registration</h1>
            <form onSubmit={handleRegistration}>
                <div>
                    <label htmlFor='companyName'>Company Name</label>
                    <input
                        onChange={handleChange}
                        onPaste={handlePaste}
                        type='text'
                        name='companyName'
                        placeholder='Enter your company name...'
                        value={registrationInfo.companyName}
                        autoFocus
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        onPaste={handlePaste}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={registrationInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input
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
                <div>
                    <label htmlFor='companyPhone'>Company Phone</label>
                    <input
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        onPaste={handlePaste}
                        type='tel'
                        name='companyPhone'
                        inputmode="numeric" 
                        maxlength="10"
                        placeholder='Enter your Company Phone...'
                        value={registrationInfo.companyPhone}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        onPaste={handlePaste}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={registrationInfo.password}
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        onChange={handleChange}
                        onPaste={handlePaste}
                        type='password'
                        name='confirmPassword'
                        placeholder='Enter your Confirm Password...'
                        value={registrationInfo.confirmPassword}
                    />
                </div>
                <div>
                    <label htmlFor='commercialRegister'>Commercial Register</label>
                    <input
                        className='commercialRegister'
                        onChange={handleChange}
                        type='file'
                        name='commercialRegister'
                        accept=".pdf"
                        value={registrationInfo.commercialRegister}
                    />
                </div>

                <button type='submit'>Registration</button>
                <span>Already have an account ?
                    <Link to="/company-login"> Login</Link>
                </span>
                <span>If you are a supplier?
                    <Link to="/supplier-registration"> Supplier</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default CompanyRegistration;
