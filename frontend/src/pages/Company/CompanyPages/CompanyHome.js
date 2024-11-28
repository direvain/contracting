import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './CompanyHome.module.css';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

function CompanyHome() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/supplier-login');
        }, 1000)
    }

    const handleConcrete = async (e) => {
        setTimeout(() => { 
            navigate('/company/home/concrete-order') // (function) سيتم تنفيذها بعد انتهاء الوقت
        }, 1000)
    }
    
    const handleCement = async (e) => {
        setTimeout(() => { 
            navigate('/company/home/cement-order') // (function) سيتم تنفيذها بعد انتهاء الوقت
        }, 1000)
    }

    return(
        <section className={styles.companyBody}>
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
            
            <div className={styles.companyHomeContainerCard}>
                {/* First Card */}
                <Card
                    className={styles.companyHomeCard}
                    sx={{
                        width: {
                            xs: 250,  // for extra small screens
                            sm: 250,  // for small screens
                            md: 250,  // for medium screens
                            lg: 345   // for large screens
                        }
                    }}
                >
                    <CardActionArea onClick={handleCement}>
                        <CardMedia
                            className={styles.cementCardMedia}
                            component="img"
                            height="170"
                        />
                        <CardContent className={styles.cardContent}>
                            <Typography gutterBottom variant="h5" component="div">
                                Cement
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Click to start ordering cement for your construction.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                {/* Second Card */}
                <Card
                    sx={{
                        width: {
                            xs: 250,  // for extra small screens
                            sm: 250,  // for small screens
                            md: 250,  // for medium screens
                            lg: 345   // for large screens
                        }
                    }}
                >
                    <CardActionArea onClick={handleConcrete}>
                        <CardMedia
                            className={styles.concreteCardMedia}
                            component="img"
                            height="170"
                        />
                        <CardContent className={styles.cardContent}>
                            <Typography gutterBottom variant="h5" component="div">
                                Concrete
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Click to start ordering concrete for your construction.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

            <Footer 
                one="Home"
                pathOne="/company/home"
                two="Orders"
                pathTwo1="/company/home/preparing-orders"
                pathTwo2="/company/home/pending-orders"
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
export default CompanyHome;