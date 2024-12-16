import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyList from '../fetchData/register/CompanyList';
import SupplierList from '../fetchData/register/SupplierList';
import styles from './Approve.module.css';
import NavBar from '../../../../Components/navBAr/Navbar';
import { handleSuccess } from '../../../../utils/utils';

function RequestRegister() {
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
    
    async function supplierApprove(id) {
        try {
            const response = await fetch(`http://localhost:8080/auth/supplier/approve/${id}`, {
                method: "PATCH",
            });
            if (response.ok) {
                setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier._id !== id));
                console.log("Supplier approved successfully.");
            } else {
                console.error("Failed to approve supplier:", response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    async function supplierReject(id) {
        try {
            const response = await fetch(`http://localhost:8080/auth/supplier/request/reject/${id}`, {
                method: "PATCH",
            });
            if (response.ok) {
                setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier._id !== id));
                console.log("Supplier rejected successfully.");
            } else {
                console.error("Failed to reject supplier:", response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    };

    
    async function companyApprove(id) {
        try {
            const response = await fetch(`http://localhost:8080/auth/company/approve/${id}`, {
                method: "PATCH",
            });
            if (response.ok) {
                setCompanies(prevCompany => prevCompany.filter(company => company._id !== id));
                console.log("company approved successfully.");
            } else {
                console.error("Failed to approve company:", response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    };
    
    async function companyReject(id) {
        try {
            const response = await fetch(`http://localhost:8080/auth/company/request/reject/${id}`, {
                method: "PATCH",
            });
            if (response.ok) {
                setCompanies(prevCompany => prevCompany.filter(company => company._id !== id));
                console.log("company rejected successfully.");
            } else {
                console.error("Failed to reject company:", response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    };

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
                {(() => 
                {
                    const filteredCompanies = companies.filter(company => company.state === "new"); // Filter once
                    return filteredCompanies.length > 0 ? 
                    (
                        filteredCompanies.map((company, index) => 
                        (
                            <div className={styles.profileRow} key={index}>
                                {Object.entries(company).map(([key, value]) => 
                                (
                                    key !== "__v" && key !== "_id" && key !== "state" && key !== "role" && 
                                    (
                                        <div key={key}>
                                            <strong>{key}:</strong> {value?.toString()}
                                        </div>
                                    )
                                ))}
                                <button
                                    className={styles.button32}
                                    onClick={() => companyApprove(company._id)}
                                >
                                    Approve
                                </button>
                                <button
                                    className={styles.button24}
                                    onClick={() => companyReject(company._id)}
                                >
                                    Reject
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No companies found.</p>
                    );
                })()}
            </div>
            <h2 className={styles.List}>Supplier List:</h2>
            <div className={styles.profileContainer}>
                {(() => 
                {
                    const filteredSuppliers = suppliers.filter(supplier => supplier.state === "new"); // Filter once
                    return filteredSuppliers.length > 0 ? 
                    (
                        filteredSuppliers.map((supplier, index) => 
                        (
                            <div className={styles.profileRow} key={index}>
                                {Object.entries(supplier).map(([key, value]) => 
                                (
                                    key !== "__v" && key !== "_id" && key !== "state" && key !== "role" && 
                                    (
                                        <div key={key}>
                                            <strong>{key}:</strong> {value?.toString()}
                                        </div>
                                    )
                                ))}
                                <button
                                    className={styles.button32}
                                    onClick={() => supplierApprove(supplier._id)}
                                >
                                    Approve
                                </button>
                                <button
                                    className={styles.button24}
                                    onClick={() => supplierReject(supplier._id)}
                                >
                                    Reject
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No suppliers found.</p>
                    );
                })()}
            </div>
        </div>
    );
    
}
export default RequestRegister;