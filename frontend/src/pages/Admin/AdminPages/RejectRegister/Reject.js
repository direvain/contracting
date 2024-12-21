import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Reject.module.css';
import NavBar from '../../../../Components/navbar/Navbar';
import { handleSuccess } from '../../../../utils/utils';

function RejectRegister() {
    const navigate = useNavigate();
    const [rejected, setRejected] = useState([]); // Initialize as an empty array
    useEffect(() => {
        const getData = async () => 
        {
            try 
            {
                const rejectedData = await fetchdata(); // Fetch company data
                setRejected(rejectedData || []); // Ensure fallback to an empty array if data is null/undefined
            } 
            catch (error) 
            {
                console.error("Failed to fetch rejected data :", error);
            }
        };

        getData();
    }, []); // Runs once when the component mounts
const handleLogout = (e) =>
    {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => 
        {
            navigate('/admin');
        }, 1000)
    }
    async function fetchdata()
    {
        try
        {
            const response = await fetch('http://localhost:8080/auth/register/fetchRegistrationData?status=rejected',
            {
                method:'GET',
                headers: { Authorization: localStorage.getItem('token') }
            });
            const data = await response.json();
            return data;
        }
        catch(err)
        {
            console.log(err.message);
        }
    }

    async function dropUser(Id) {
        try {
            const response = await fetch(`http://localhost:8080/auth/register/delete/${Id}`,
            {
                method: 'DELETE',            
                headers: { Authorization: localStorage.getItem('token') },
            });
    
            if (response.ok) {
                // Update the suppliers state to remove the deleted supplier
                setRejected(deleteUser => deleteUser.filter(user => user._id !== Id));
            } else {
                console.error('Failed to delete user :', response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    }
/*  */


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

            <h2 className={styles.List}>Companies Rejected List:</h2>
            <div className={styles.profileContainer}>
                {(() => 
                {
                    const companies = rejected.filter(field => field.role === "company");
                    return companies.length > 0  ? (
                        companies.map((field) => 
                            field.role === "company"&&(
                            <div className={styles.profileRow} key={field._id}>
                                <p>
                                    <strong>Company Name :</strong> {field.Name} 
                                </p>
                                <p>
                                    <strong>Company email :</strong> {field.email} 
                                </p>
                                <p>
                                    <strong>Company Id :</strong> {field.Id} 
                                </p>
                                <p>
                                    <strong>Company Phone :</strong> {field.Phone} 
                                </p>
                                <p>
                                    <strong>Commercial Register :</strong> {JSON.stringify(field.commercialRegister)} 
                                </p>
                                <p>
                                    <strong>Admin Id :</strong> {field.AdminId}
                                </p>
                                <button
                                    className={styles.button24}
                                    onClick={() => dropUser(field._id)}
                                >
                                    Drop
                                </button>
                            </div>
                        )
                    )
                    ) : (
                        <p>No rejected companies found.</p>
                    );
                })()}
            </div>

            <h2 className={styles.List}>Suppliers Rejected List:</h2>
            <div className={styles.profileContainer}>
                {(() => {
                    const suppliers = rejected.filter(field => field.role === "supplier");
                    return  suppliers.length > 0  ? (
                        suppliers.map((field) => 
                            field.role === "supplier"&&(
                            <div className={styles.profileRow} key={field._id}>
                                <p>
                                    <strong>supplier Name :</strong> {field.Name} 
                                </p>
                                <p>
                                    <strong>supplier email :</strong> {field.email} 
                                </p>
                                <p>
                                    <strong>supplier Id :</strong> {field.Id} 
                                </p>
                                <p>
                                    <strong>supplier Phone :</strong> {field.Phone} 
                                </p>
                                <p>
                                    <strong>Commercial Register :</strong> {JSON.stringify(field.commercialRegister)} 
                                </p>
                                <p>
                                    <strong>Supplier Product :</strong> {field.supplierProduct}
                                </p>
                                <p>
                                    <strong>Admin Id :</strong> {field.AdminId}
                                </p>
                                <button
                                    className={styles.button24}
                                    onClick={() => dropUser(field._id)}
                                >
                                    Drop
                                </button>
                            </div>
                        )
                    )
                    ) : (
                        <p>No rejected suppliers found.</p>
                    );
                })()}
            </div>
        </div>

    );
    
}
export default RejectRegister;