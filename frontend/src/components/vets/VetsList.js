import React, { useState, useEffect } from 'react';
import { getVets } from '../../services/apiService';

const VetsList = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const response = await getVets();
        setVets(response.data);
      } catch (error) {
        console.error('Error fetching vets:', error);
        setError('Failed to fetch veterinarians. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2>Veterinarians</h2>
      
      {vets.length === 0 ? (
        <div className="alert alert-info">No veterinarians found</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialties</th>
            </tr>
          </thead>
          <tbody>
            {vets.map((vet) => (
              <tr key={vet.id}>
                <td>{vet.firstName} {vet.lastName}</td>
                <td>
                  {vet.specialties && vet.specialties.length > 0 ? (
                    vet.specialties.map((specialty, index) => (
                      <span key={specialty.id}>
                        {index > 0 && ', '}
                        {specialty.name}
                      </span>
                    ))
                  ) : (
                    <span>none</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VetsList;