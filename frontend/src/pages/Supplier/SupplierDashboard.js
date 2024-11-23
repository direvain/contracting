import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../utils/utils';
import { ToastContainer } from 'react-toastify';

function SupplierHome() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/supplier-login');
        }, 1000)
    }

    return<div>
        <h1>Supplier Home</h1>
        <button onClick={handleLogout}>Logout</button>
        <ToastContainer />
    </div>
}
export default SupplierHome;