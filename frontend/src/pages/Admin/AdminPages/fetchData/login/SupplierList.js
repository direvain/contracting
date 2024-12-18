async function SupplierList() {
    try {
        const response = await fetch('http://localhost:8080/auth/supplier/supplierData', {
            headers: { Authorization: localStorage.getItem('token') },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch suppliers');
        }
        const data = await response.json();        
        // Extract the suppliers from the first element of the array
        return data[0] || []; // Return the first element which should be the array of suppliers
    } catch (error) {
        console.error(error.message);
        return []; // Return an empty array in case of error
    }
};




export default SupplierList;
