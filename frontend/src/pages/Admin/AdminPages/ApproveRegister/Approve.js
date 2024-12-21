import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Approve.module.css';
import NavBar from '../../../../Components/navbar/Navbar';
import { handleSuccess } from '../../../../utils/utils';

function ApproveRegister()
{
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]); // Initialize as an empty array
    const [suppliers, setSuppliers] = useState([]); // Initialize as an empty array
    useEffect(() => {
        const getData = async () => {
            try 
            {
                const { supplierData, companyData } = await fetchdata();
                setSuppliers(supplierData || []); // Ensure fallback to an empty array if data is null/undefined
                setCompanies(companyData || []); // Ensure fallback to an empty array if data is null/undefined
            } 
            catch (error) 
            {
                console.error("Failed to fetch companies and suppliers:", error);
            }
        };

        getData();
    }, []); // Runs once when the component mounts

    const handleLogout = (e) =>
        {
            localStorage.removeItem('token');
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('role');
            handleSuccess('User Loggedout');
            setTimeout(() => 
            {
                navigate('/admin');
            }, 1000)
        };
    
        async function fetchdata() 
        {
            try {
                    const supplierResponse = await fetch('http://localhost:8080/auth/supplier/supplierData', 
                    {
                        method: 'GET',
                        headers: { Authorization: localStorage.getItem('token') },
                    });
                    const companyResponse = await fetch('http://localhost:8080/auth/company/companyData', 
                    {
                        method: 'GET',
                        headers: { Authorization: localStorage.getItem('token') },
                    });
                    if (!supplierResponse.ok) {throw new Error('Failed to fetch suppliers asd');}
                    if (!companyResponse.ok)  {throw new Error('Failed to fetch suppliers asd');}
                    const companyData  = await companyResponse.json();
                    const supplierData = await supplierResponse.json();        
                    return { supplierData, companyData };
                } catch (error) 
                {
                    console.error(error.message);
                    return { supplierData: [], companyData: [] }; // Return an empty array in case of error
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

        <h2 className={styles.List}>Companies Approved List:</h2>
        <div className={styles.profileContainer}>
            {companies.length > 0 ? (
                companies.map((field) => 
                    (
                        <div className={styles.profileRow} key={field._id}>
                            <p>
                                <strong>Company Name :</strong> {field.companyName} 
                            </p>
                            <p>
                                <strong>Company email :</strong> {field.email} 
                            </p>
                            <p>
                                <strong>Company ID :</strong> {field.companyID} 
                            </p>
                            <p>
                                <strong>Company Phone:</strong> {field.companyPhone} 
                            </p>
                            <p>
                                <strong>Commercial Register :</strong>  {JSON.stringify(field.commercialRegister)} 
                            </p>
                            <p>
                                <strong>Admin Id :</strong> {field.adminId} 
                            </p>
                        </div>
                    ))
            ) : (
                <p>No companies found.</p>
            )}
        </div>
        <h2 className={styles.List}>Supplier Approved List:</h2>
            <div className={styles.profileContainer}>
                {suppliers.length > 0 ? (
                    suppliers.map((field) => 
                        (
                            <div className={styles.profileRow} key={field._id}>
                                <p>
                                    <strong>supplier Name :</strong> {field.supplierName} 
                                </p>
                                <p>
                                    <strong>supplier email :</strong> {field.email} 
                                </p>
                                <p>
                                    <strong>supplier ID :</strong> {field.supplierID} 
                                </p>
                                <p>
                                    <strong>supplier Phone:</strong> {field.supplierPhone} 
                                </p>
                                <p>
                                    <strong>supplier Product:</strong> {field.supplierProduct} 
                                </p>
                                <p>
                                    <strong>supplier item price :</strong> {field.price} jod
                                </p>
                                <p>
                                    <strong>Commercial Register :</strong>  {JSON.stringify(field.commercialRegister)} 
                                </p>
                                <p>
                                    <strong>Admin Id :</strong> {field.adminId} 
                                </p>
                            </div>
                        ))
                ) : (
                    <p>No suppliers found.</p>
                )}
            </div>
    </div>
    );
    
}
export default ApproveRegister;