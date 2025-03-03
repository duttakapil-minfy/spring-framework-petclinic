import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOwners } from '../../services/apiService';

const OwnersList = () => {
  const [owners, setOwners] = useState([]);
  const [searchLastName, setSearchLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOwners = async (lastName = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOwners(lastName);
      console.log('Raw response:', response);     
      console.log('Response data type:', typeof response.data);
      console.log('Is array?', Array.isArray(response.data));
      
      // First, ensure we have valid data to work with
      let dataToProcess = response.data;
      
      // If the data is a string (JSON), try to parse it
      if (typeof dataToProcess === 'string') {
        try {
          dataToProcess = JSON.parse(dataToProcess);
        } catch (e) {
          console.error('Failed to parse JSON string:', e);
        }
      }
      
      // Handle both array and single object responses
      const dataArray = Array.isArray(dataToProcess) ? dataToProcess : 
                       dataToProcess && typeof dataToProcess === 'object' ? [dataToProcess] : [];
      
      console.log('Data array to process:', dataArray);
      
      // Extract and clean up owner data to prevent recursion issues
      const cleanOwners = dataArray.map(owner => {
        console.log('Processing owner:', owner);
        return {
          id: owner?.id,
          firstName: owner?.firstName,
          lastName: owner?.lastName,
          address: owner?.address,
          city: owner?.city,
          telephone: owner?.telephone,
          pets: Array.isArray(owner?.pets) ? owner.pets.map(pet => {
            console.log('Processing pet:', pet);
            return {
              id: pet?.id,
              name: pet?.name,
              birthDate: pet?.birthDate,
              type: pet?.type ? {
                id: pet.type?.id,
                name: pet.type?.name
              } : null
            };
          }) : []
        };
      });

      console.log('Final cleaned owners:', cleanOwners);
      setOwners(cleanOwners);
    } catch (error) {
      console.error('Error fetching owners:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        data: error.response?.data
      });
      setError('Failed to fetch owners. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOwners(searchLastName);
  };

  // Early return for loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Early return for error state
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Ensure owners is always an array
  const ownersList = Array.isArray(owners) ? owners : [];

  return (
    <div>
      <h2>Find Owners</h2>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="row mb-3">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">Last name:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last name"
              value={searchLastName}
              onChange={(e) => setSearchLastName(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary me-2">Find Owner</button>
        <Link to="/owners/new" className="btn btn-success">Add Owner</Link>
      </form>

      {ownersList.length === 0 ? (
        <div className="alert alert-info">No owners found</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Telephone</th>
              <th>Pets</th>
            </tr>
          </thead>
          <tbody>
            {ownersList.map((owner) => (
              <tr key={owner.id}>
                <td>
                  <Link to={`/owners/${owner.id}`}>
                    {owner.firstName} {owner.lastName}
                  </Link>
                </td>
                <td>{owner.address}</td>
                <td>{owner.city}</td>
                <td>{owner.telephone}</td>
                <td>
                  {owner.pets && owner.pets.map((pet, index) => (
                    <span key={pet.id}>
                      {index > 0 && ', '}
                      {pet.name}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnersList;