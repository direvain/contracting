import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './request.module.css';
import Navbar from '../../../../components/navbar/Navbar';
import { handleSuccess } from '../../../../utils/utils';

function RequestRegister() {
    const navigate = useNavigate();
    const [pending, setPending] = useState([]); // Initialize as an empty array
    useEffect(() => {
        const getData = async () => {
            try {
                const pendingData = await fetchData(); // Fetch company data
                setPending(pendingData || []); // Ensure fallback to an empty array if data is null/undefined
            } catch (error) {
                console.error("Failed to fetch pending request:", error);
            }
        };

        getData();
    }, []); 
    // console.log(pending); work (3) [{…}, {…}, {…}]

const handleLogout = (e) =>
    {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => 
        {
            navigate('/admin');
        }, 500)
    }

    async function fetchData()
    {
        try
        {
            const response = await fetch('http://localhost:8080/auth/register/fetchRegistrationData?status=new',
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
    };
    async function rejectUser(ID)
    {
        try
        {
            const response = await fetch(`http://localhost:8080/auth/register/rejected/${ID}`,
            {
                method:'PATCH',
                headers: { Authorization: localStorage.getItem('token') }
            });
            if (response.ok) 
                {
                    setPending(rejectedUser => rejectedUser.filter(user => user.ID !== ID)); 
                    handleSuccess('User successfully rejected'); // Show success message
                }
            else {console.error('Failed to delete user :', response.statusText); }
        }
        catch(err)
        {
            console.log("reject user faild " `${err}`)
        }
    };
    async function approveUser(ID)
    {
        try
        {
            const response = await fetch(`http://localhost:8080/auth/register/approve/${ID}`,
                {
                    method:'PATCH',
                    headers: { Authorization: localStorage.getItem('token') }
                });
            if (response.ok) 
            {
                setPending(approvetUser => approvetUser.filter(user => user.ID !== ID)); 
                handleSuccess('User successfully approved'); // Show success message
            }
            else {console.error('Failed to approve user :', response.statusText); }
        }
        catch(err)
        {
            console.log("approve user faild " `${err}`)
        }
    };
    

    return (
        <div>
            <ToastContainer />
            
            <Navbar
                three="Approved"
                pathThree="/admin/approve-user"
                four="Rejected"
                pathFour="/admin/reject-user"

                five="Pending"
                pathFive="/admin/request-user"

                six="Add Admin"
                pathSix="/admin/add-admin"

                logout={handleLogout}
            />
            <h2 className={styles.List}>Pending Registration:</h2>
            <div className={styles.profileContainer}>   
            {(() => 
            {
                const RegisterationData = Array.isArray(pending) ? pending : [];

                const filteredData = RegisterationData.length > 0 ? 
                RegisterationData.map((field) => 
                {
                    return (
                            <div className={styles.profileRow} key={field._id}>
                                <p><strong>{field.role === "company" ? "Company" : "Supplier"} name:</strong> {field.name}</p>
                                <p><strong>{field.role === "company" ? "Company" : "Supplier"} email:</strong> {field.email}</p>
                                <p><strong>{field.role === "company" ? "Company" : "Supplier"} ID:</strong> {field.ID}</p>
                                <p><strong>{field.role === "company" ? "Company" : "Supplier"} phone:</strong> {field.phone}</p>
                                {field.role === "supplier" ? 
                                (
                                    <p><strong>Supplier product:</strong> {field.supplierProduct}</p>
                                ) : (
                                    <strong></strong> 
                                    )
                                }
                                <p><strong>Commercial register:</strong> <a href={JSON.stringify(field.commercialRegister)}>view PDF</a> </p>                                

                                <button
                                    className={styles.pendingButtonAccept}
                                    onClick={() => approveUser(field.ID)}
                                >
                                    Approve
                                </button>
                                <button
                                    className={styles.pendingButtonReject}
                                    onClick={() => rejectUser(field.ID)}
                                >
                                    Reject
                                </button>
                            </div>
                    );
                
                return null;
            }) : 
            <p>No Pending registrations found.</p>;

        return filteredData;
    })()}
</div>
        </div>
    );
    
};
export default RequestRegister;