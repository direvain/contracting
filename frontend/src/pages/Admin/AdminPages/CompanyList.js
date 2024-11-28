import React from "react";

function CompanyList({ companies }) {
    return (
        <div>
            {companies.length === 0 ? (
                <p>No companies available.</p> // Shown when the array is empty
            ) : (
                <ul>
                    {companies.map((company, index) => (
                        <li key={index}>{company.name}</li> // Adjust based on your company object structure
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CompanyList;
