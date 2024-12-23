import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import NavBar from '../../../components/navbar/Navbar';

function AdminHome() {
  const navigate = useNavigate();


  const handleLogout = (e) => {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('role');
      handleSuccess('User Loggedout');
      setTimeout(() => {
          navigate('/admin');
      }, 1000)
  }

  return (
    <div>
      <NavBar
        three="Approved"
        pathThree="/admin/home/approve-order"
        four="Rejected"
        pathFour="/admin/home/reject-order"

        five="Pending"
        pathFive="/admin/home/request-order"

        six="Add Admin"
        pathSix="/admin/home/Add-admin"

        logout={handleLogout}
      />
            
            <div>
            </div>
            
            <ToastContainer />

    </div>
  );
}

export default AdminHome;
