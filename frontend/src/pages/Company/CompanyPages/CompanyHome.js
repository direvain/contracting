import {Link, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../../utils/utils';
import { ToastContainer } from 'react-toastify';
import styles from './CompanyHome.module.css';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';


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
            <button onClick={handleLogout}>Logout</button>
            
            <div className={styles.companyHomeContainerCard}>
                <Card className={styles.companyHomeCard} sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        {/* <Link to="" style={{ textDecoration: 'none' }} /> */}
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
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card> 
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        {/* <Link to="" style={{ textDecoration: 'none' }} /> */}
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
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>    
            </div>
            <ToastContainer />
        </section>
    );
}
export default CompanyHome;