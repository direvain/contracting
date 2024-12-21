import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Approve.module.css';
import NavBar from '../../../../Components/navbar/Navbar';
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
        }, 1000)
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
    async function rejectUser(Id)
    {
        try
        {
            const response = await fetch(`http://localhost:8080/auth/register/rejected/${Id}`,
            {
                method:'PATCH',
                headers: { Authorization: localStorage.getItem('token') }
            });
            if (response.ok) {setPending(rejectedUser => rejectedUser.filter(user => user.Id !== Id)); }
            else {console.error('Failed to delete user :', response.statusText); }
        }
        catch(err)
        {
            console.log("reject user faild " `${err}`)
        }
    };
    async function approveUser(Id)
    {
        try
        {
            const response = await fetch(`http://localhost:8080/auth/register/approve/${Id}`,
                {
                    
                    method:'PATCH',
                    headers: { Authorization: localStorage.getItem('token') }
                });
            if (response.ok) {setPending(approvetUser => approvetUser.filter(user => user.Id !== Id)); }
            else {console.error('Failed to approve user :', response.statusText); }
        }
        catch(err)
        {
            console.log("approve user faild " `${err}`)
        }
    };
    

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
            <h2 className={styles.List}>Companies Pending List:</h2>
            <div className={styles.profileContainer}>
                {(() => 
                {
                    const companies = pending.filter(field => field.role === "company");
                    return companies.length > 0  ? 
                    (
                        companies.map((field) =>
                            field.role === "company"&&
                            (
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
                                    <button
                                        className={styles.button32}
                                        onClick={() => approveUser(field.Id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className={styles.button24}
                                        onClick={() => rejectUser(field.Id)}
                                    >
                                        Reject
                                    </button> 
                                </div>
                            ))
                    ) :(<p>No Pending companies found.</p>)
                })()}
            </div>


            <h2 className={styles.List}>suppliers Pending List:</h2>
            <div className={styles.profileContainer}>
                {(() => 
                {
                    const suppliers = pending.filter(field => field.role === "supplier");
                    return suppliers.length > 0  ? 
                    (
                        suppliers.map((field) =>
                            field.role === "supplier"&&
                            (
                                <div className={styles.profileRow} key={field._id}>
                                    <p>
                                        <strong>Supplier Name :</strong> {field.Name} 
                                    </p> 
                                    <p>
                                        <strong>Supplier email :</strong> {field.email} 
                                    </p>
                                    <p>
                                        <strong>Supplier Id :</strong> {field.Id} 
                                    </p>
                                    <p>
                                        <strong>Supplier Phone :</strong> {field.Phone} 
                                    </p>
                                    <p>
                                        <strong>Supplier Product :</strong> {field.supplierProduct} 
                                    </p>
                                    <p>
                                        <strong>Commercial Register :</strong> {JSON.stringify(field.commercialRegister)} 
                                    </p>
                                    <button
                                        className={styles.button32}
                                        onClick={() => approveUser(field.Id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className={styles.button24}
                                        onClick={() => rejectUser(field.Id)}
                                    >
                                        Reject
                                    </button>

                                </div>
                            ))
                    ) :(<p>No Pending companies found.</p>)
                })()}
            </div>   
        </div>
    );
    
};
export default RequestRegister;