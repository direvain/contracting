import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../../../../utils/utils.js';
import styles from './CompanyLogin.module.css';


function CompanyLogin() {

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })

    // React تستخدم للتنقل بين المسارات في navigation function يستخدم للحصول على React Router من مكتبة Hook هي عباره عن
    const navigate = useNavigate(); 

    // نقوم بحفظها user القيم التي يقوم بتدخيلها ال
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value); // console شو بتدخل بعطيك على ال
        const copyLoginInfo = { ...loginInfo }; // نسخ معلومات تسجيل الدخول
        copyLoginInfo[name] = value; // تحديث قيمة معينة
        setLoginInfo(copyLoginInfo); // نقوم بتحديث الحالة باستخدام دالة
    }

    // input في اي paste منع عمل 
    const handlePaste = (e) => {
        e.preventDefault();
        handleError("Paste is not allowed.");
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // يمنع إعادة تحميل الصفحة عند ارسال النموذج
        const { username, password } = loginInfo;
        if (!username || !password) { // يتحقق مما اذا كانت القيمة غير موجوده (ان تكون فارغة او غير معرفه)
            return handleError('username and password are required')
        }

        // this code sends login information to a local server using a POST request in JSON format.
        try {
            const url = `http://localhost:8080/auth/company/login`; // مكان ارسال الطلب
            const response = await fetch(url, { // HTTP لارسال طلب fetch
                method: "POST", // نوع الطلب
                headers: { 
                    'Content-Type': 'application/json' // نوع البيانات ( هنا بتنسيق json )
                },
                body: JSON.stringify(loginInfo) // وارسالها JSON string  الى loginInfo يتم تحويل  
            });
            const result = await response.json(); // وتخزينها في متغير JSON لتحويل استجابة الخادم ال
            const { success, message, jwtToken, role } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken); // يقوم بتخزين المعلومات داخل المتصفح ( -Application in browser للتأكد من انه تم الحفظ تذهب الى - key 'token' تحت مفتاح localStorage في jwt هنا خزن قيمة )
                localStorage.setItem('role', role);
                setTimeout(() => { 
                    navigate('/company/home') // (function) سيتم تنفيذها بعد انتهاء الوقت
                }, 1000) // الوقت الذي سيتم الانتظار فيه قبل تنفيذ الدالة، وهو 1000 مللي ثانية، أي 1 ثانية
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <section className={styles.companyBody}>
            <div className={styles.companyLoginContainer}>
                <h1 className={styles.companyLoginH1}>Contracting <br />Company Login</h1>
                <form className={styles.companyFormLogin} onSubmit={handleLogin}>
                    <div className={styles.companyLoginDiv}>
                        <label className={styles.companyLoginLabel} htmlFor='username'>Username</label>
                        <input
                            className={styles.companyLoginInput}
                            onChange={handleChange}
                            onPaste={handlePaste}
                            type='username'
                            name='username'
                            placeholder='Enter your company ID for username...'
                            value={loginInfo.username}
                        />
                    </div>
                    <div className={styles.companyDiv}>
                        <label className={styles.companyLoginLabel} htmlFor='password'>Password</label>
                        <input
                            className={styles.companyLoginInput}
                            onChange={handleChange}
                            onPaste={handlePaste}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={loginInfo.password}
                        />
                    </div>
                    <button className={styles.companyLoginButton} type='submit'>Login</button>
                    <span className={styles.companyLoginSpan}>Does't have an account?
                        <Link className={styles.companyLoginLink} to="/company-registration"> Registration</Link>
                    </span>
                    <span className={styles.companyLoginSpan}>If you are a supplier?
                        <Link className={styles.companyLoginLink} to="/supplier-login"> Supplier</Link>
                    </span>
                </form>
                <ToastContainer /> {/* يتم استخدامه لعرض رسائل النجاح أو الخطأ أو أي نوع آخر من الإشعارات التي يحتاج المستخدم لرؤيتها */}
            </div>
        </section>
    )
}

export default CompanyLogin;
