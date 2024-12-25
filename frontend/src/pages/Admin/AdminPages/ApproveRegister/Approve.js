import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            try 
            {
                const  supplierData = await fetchSuppliersdata();
                const  companyData  = await fetchCompaniesData();
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
        {console.log("Suppliers Data:", suppliers);
console.log("Companies Data:", companies);

            localStorage.removeItem('token');
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('role');
            handleSuccess('User Loggedout');
            setTimeout(() => 
            {
                navigate('/admin');
            }, 1000)
        };
    


    return (
    <div>
        <ToastContainer />
        
        <NavBar
        two="Pending"
        two1="Request"
        pathTwo1="/admin/home/request-order"
        two2="Approve"
        pathTwo2="/admin/home/approve-order"
        two3="Reject"
        pathTwo3="/admin/home/reject-order"

        three="Add Admin"
        pathThree="/admin/home/Add-admin"
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
                                    <strong>Commercial register:</strong>  <a href={JSON.stringify(field.commercialRegister)}>view PDF</a> 
                                    
                                </p>
                                <p>
                                    <strong>Admin email:</strong> {field.adminId} 
                                </p>
                                <button
                                    className={styles.pendingButtonDrop}
                                    
                                    onClick={() =>deleteSupplier(field.supplierID)}
                                >
                                    Delete Supplier
                                </button>
                            </div>
                        ))
                ) : (
                    <p>No suppliers found.</p>
                )}
            </div>
        <h2 className={styles.List}>Companies Approved List:</h2>
        <div className={styles.profileContainer}>
            {console.log(companies)}
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
                                    <strong>Commercial register:</strong> <a href={JSON.stringify(field.commercialRegister)}>view PDF</a> 
                                </p>
                                <p>
                                    <strong>Admin email:</strong> {field.adminId} 
                                </p>
                                <button
                                        className={styles.pendingButtonDrop}
                                        onClick={() => deleteCompany(field.companyID)}
                                    >
                                        Delete Company
                                    </button>
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
