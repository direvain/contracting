import {Link, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './CompanyHome.module.css';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Navbar from '../../../Components/navBAr/Navbar';
import Footer from '../../../Components/footer/Footer';


function CompanyHome() {
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

    return(
        <section className={styles.companyBody}>
            <Navbar 
                one="Home"
                two="nkladkj"
                three="About Us"

            />
            <button onClick={handleLogout}>Logout</button>
            
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
                    <CardActionArea>
                        <CardMedia
                            className={styles.cementCardMedia}
                            component="img"
                            height="140"
                        />
                        <CardContent className={styles.cardContent}>
                            <Typography gutterBottom variant="h5" component="div">
                                Cement
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                                ranging across all continents except Antarctica.
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
                    <CardActionArea>
                        <CardMedia
                            className={styles.concreteCardMedia}
                            component="img"
                            height="140"
                        />
                        <CardContent className={styles.cardContent}>
                            <Typography gutterBottom variant="h5" component="div">
                                Concrete
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                                ranging across all continents except Antarctica.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

            <Footer 
                one="Home"
                two="About Us"
                three="Contact Us"
            />
            <ToastContainer />
        </section>
    );
}
export default CompanyHome;