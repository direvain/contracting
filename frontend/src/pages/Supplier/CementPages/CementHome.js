import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './CementHome.module.css';

function CementHome() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('role');
        localStorage.removeItem('supplierProduct');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/supplier-login');
        }, 1000)
    }

    return<div>
        <h1>Cement Home</h1>
        <button onClick={handleLogout}>Logout</button>
        <ToastContainer />
    </div>
}
export default CementHome;