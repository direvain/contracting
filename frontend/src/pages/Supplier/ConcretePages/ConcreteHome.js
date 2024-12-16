import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './ConcreteHome.module.css';

function ConcreteHome() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('role');
        localStorage.removeItem('supplierProduct');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/supplier-login');
        }, 500)
    }

    return<div>
        <h1>Concrete Home</h1>
        <button onClick={handleLogout}>Logout</button>
        <ToastContainer />
    </div>
}
export default ConcreteHome;