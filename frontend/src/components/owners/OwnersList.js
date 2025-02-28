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
      setOwners(response.data);
    } catch (error) {
      console.error('Error fetching owners:', error);
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

      {loading && <p>Loading...</p>}
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {!loading && !error && owners.length === 0 && (
        <div className="alert alert-info">No owners found</div>
      )}
      
      {!loading && !error && owners.length > 0 && (
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
            {owners.map((owner) => (
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