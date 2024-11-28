import React, { useEffect, useState } from 'react';

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch suppliers data
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://localhost:8080/suppliers', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        if (!response.ok) throw new Error('Failed to fetch suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div>
      <h2>Supplier List</h2>
      <ul>
        {suppliers.length > 0
          ? suppliers.map((supplier, index) => (
              <li key={index}>{supplier.name}</li>
            ))
          : 'No suppliers available.'}
      </ul>
    </div>
  );
}

export default SupplierList;
