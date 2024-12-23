import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Approve.module.css';
import NavBar from '../../../../components/navbar/Navbar';
import { handleSuccess } from '../../../../utils/utils';

function ApproveRegister()
{
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]); // Initialize as an empty array
    const [suppliers, setSuppliers] = useState([]); // Initialize as an empty array
    const [mixedData, setMixedData] = useState([]); // Single array for mixed data

    useEffect(() => {
        const getData = async () => {
            try 
            {
                const { supplierData, companyData } = await fetchdata();
                setSuppliers(supplierData || []); // Ensure fallback to an empty array if data is null/undefined
                setCompanies(companyData || []); // Ensure fallback to an empty array if data is null/undefined
                const combinedData = [...supplierData, ...companyData]; // Combine data
                const shuffledData = combinedData.sort(() => -0.8456567867878946675 - 0.2); // Shuffle the array
                setMixedData(shuffledData); // Set the mixed data to state
                console.log(shuffledData)
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
        <h2 className={styles.List}>Suppliers Approved List:</h2>
            <div className={styles.profileContainer}>
                {suppliers.length > 0 ? (
                    suppliers.map((field) => 
                        (
                            <div className={styles.profileRow} key={field._id}>
                                <p>
                                    <strong>Supplier name:</strong> {field.supplierName} 
                                </p>
                                <p>
                                    <strong>Supplier email:</strong> {field.email} 
                                </p>
                                <p>
                                    <strong>Supplier ID:</strong> {field.supplierID} 
                                </p>
                                <p>
                                    <strong>Supplier phone:</strong> {field.supplierPhone} 
                                </p>
                                <p>
                                    <strong>Supplier product:</strong> {field.supplierProduct} 
                                </p>
                                <p>
                                    <strong>Supplier item price:</strong> {field.price} JD
                                </p>
                                <p>
                                    <strong>Commercial register:</strong>  {JSON.stringify(field.commercialRegister)} 
                                </p>
                                <p>
                                    <strong>Admin email:</strong> {field.adminId} 
                                </p>
                            </div>
                        ))
                ) : (
                    <p>No suppliers found.</p>
                )}
            </div>
        <h2 className={styles.List}>Companies Approved List:</h2>
        <div className={styles.profileContainer}>
            {companies.length > 0 ? (
                companies.map((field) => 
                    (
                        <div className={styles.profileRow} key={field._id}>
                            <p>
                                <strong>Company name:</strong> {field.companyName} 
                            </p>
                            <p>
                                <strong>Company email:</strong> {field.email} 
                            </p>
                            <p>
                                <strong>Company ID:</strong> {field.companyID} 
                            </p>
                            <p>
                                <strong>Company phone:</strong> {field.companyPhone} 
                            </p>
                            <p>
                                <strong>Commercial register:</strong>  {JSON.stringify(field.commercialRegister)} 
                            </p>
                            <p>
                                <strong>Admin email:</strong> {field.adminId} 
                            </p>
                        </div>
                    ))
            ) : (
                <p>No companies found.</p>
            )}
        </div>
    </div>
    );
    
}
export default ApproveRegister;