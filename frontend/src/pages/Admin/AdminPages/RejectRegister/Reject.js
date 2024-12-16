import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyList from '../fetchData/register/CompanyList';
import SupplierList from '../fetchData/register/SupplierList';
import styles from './Approve.module.css';
import NavBar from '../../../../Components/navBAr/Navbar';
import { handleSuccess } from '../../../../utils/utils';

function RejectRegister() {
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
        localStorage.removeItem('role');
        handleSuccess('User Loggedout');
        setTimeout(() => 
        {
            navigate('/admin');
        }, 1000)
    }
    async function supplierDrop(supplierId) {
        try {
            const response = await fetch(`http://localhost:8080/auth/supplier/${supplierId}`, {
                headers: { Authorization: localStorage.getItem('token') },
                method: 'DELETE',
            });
    
            if (response.ok) {
                // Update the suppliers state to remove the deleted supplier
                setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier._id !== supplierId));
            } else {
                console.error('Failed to delete supplier:', response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function CompanyDrop(companyId) {
        try {
            const response = await fetch(`http://localhost:8080/auth/company/${companyId}`, {
                headers: { Authorization: localStorage.getItem('token') },
                method: 'DELETE',
            });
    
            if (response.ok) {
                // Update the suppliers state to remove the deleted supplier
                setCompanies(prevCompany => prevCompany.filter(company => company._id !== companyId));
            } else {
                console.error('Failed to delete company:', response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    }
/*  */
    return (
        <div>
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

            <h2 className={styles.List}>Companies List:</h2>
            <div className={styles.profileContainer}>
                {(() => {
                    const filteredCompanies = companies.filter(company => company.state === "reject"); // Filter for rejected companies
                    return filteredCompanies.length > 0 ? (
                        filteredCompanies.map((company, index) => (
                            <div className={styles.profileRow} key={index}>
                                {Object.entries(company).map(([key, value]) =>
                                    key !== "__v" && key !== "_id" && key !== "state" && key !== "role" &&
                                    (
                                        <div key={key}>
                                            <strong>{key}:</strong> {value?.toString()}
                                        </div>
                                    )
                                )}
                                <button
                                    className={styles.button24}
                                    onClick={() => CompanyDrop(company._id)}
                                >
                                    Drop
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No rejected companies found.</p>
                    );
                })()}
            </div>

            <h2 className={styles.List}>Supplier List:</h2>
            <div className={styles.profileContainer}>
                {(() => {
                    const filteredSuppliers = suppliers.filter(supplier => supplier.state === "reject"); // Filter for rejected suppliers
                    return filteredSuppliers.length > 0 ? (
                        filteredSuppliers.map((supplier, index) => (
                            <div className={styles.profileRow} key={index}>
                                {Object.entries(supplier).map(([key, value]) =>
                                    key !== "__v" && key !== "_id" && key !== "state" && key !== "role" && (
                                        <div key={key}>
                                            <strong>{key}:</strong> {value?.toString()}
                                        </div>
                                    )
                                )}
                                <button
                                    className={styles.button24}
                                    onClick={() => supplierDrop(supplier._id)}
                                >
                                    Drop
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No rejected suppliers found.</p>
                    );
                })()}
            </div>
        </div>

    );
    
}
export default RejectRegister;