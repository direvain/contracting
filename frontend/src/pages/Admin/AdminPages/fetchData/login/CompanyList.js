async function  CompanyList()
    {
        try {
            const response = await fetch('http://localhost:8080/auth/company/companyData', {
                headers: { Authorization: localStorage.getItem('token') },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch suppliers');
            }
            const data = await response.json();
            return data[0] || []; // Return the first element which should be the array of suppliers
        } catch (error) {
            console.error(error.message);
            return []; // Return an empty array in case of error
        }
    
    };


export default CompanyList;
