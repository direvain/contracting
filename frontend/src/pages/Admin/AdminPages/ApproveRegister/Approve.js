import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyList from '../fetchData/login/CompanyList';
import SupplierList from '../fetchData/login/SupplierList';
import styles from './Approve.module.css';
import NavBar from '../../../../components/navbar/Navbar';
import { handleSuccess } from '../../../../utils/utils';

function ApproveRegister()
{
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]); // Initialize as an empty array
    const [suppliers, setSuppliers] = useState([]); // Initialize as an empty array
    useEffect(() => {
        const getData = async () => {
            try {
                const companyData = await CompanyList(); // Fetch company data
                setCompanies(companyData || []); // Ensure fallback to an empty array if data is null/undefined
                const supplierData = await SupplierList(); // Fetch supplier data
                setSuppliers(supplierData || []); // Ensure fallback to an empty array if data is null/undefined
            } catch (error) {
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
            }, 500)
        };
    
    return (
        <div>
        <NavBar
            two="Pending"
            two1="Request"
            pathTwo1="/admin/request-order"
            two2="Approve"
            pathTwo2="/admin/approve-order"
            two3="Reject"
            pathTwo3="/admin/reject-order"
            three="Add Admin"
            pathThree="/admin/add-admin"
            logout={handleLogout}
        />

        <h2 className={styles.List}>Companies List:</h2>
        <div className={styles.profileContainer}>
            {companies.length > 0 ? (
                companies
                    .map((company, index) => (
                        <div className={styles.profileRow} key={index}>
                            {/* Now each company will be in a separate div */}
                            {Object.entries(company).map(([key, value]) => (
                                // Check if the key is not "__v" or "_id" before rendering
                                key !== "__v" && key !== "_id"  && key !== "role" &&  (
                                    <div key={key}>
                                        <strong>{key}:</strong> {value?.toString()}
                                        
                                    </div>
                                )
                            ))}
                        </div>
                    ))
            ) : (
                <p>No companies found.</p>
            )}
        </div>
        <h2 className={styles.List}>Supplier List:</h2>
            <div className={styles.profileContainer}>
                {suppliers.length > 0 ? (
                    suppliers
                        .map((supplier, index) => (
                            <div className={styles.profileRow} key={index}>
                                {/* Now each supplier will be in a separate div */}
                                {Object.entries(supplier).map(([key, value]) => (
                                    // Check if the key is not "__v" or "_id" before rendering
                                    key !== "__v" && key !== "_id"  && key !== "role" && (
                                        <div key={key}>
                                            <strong>{key}:</strong> {value?.toString()}
                                        </div>
                                    )
                                ))}
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