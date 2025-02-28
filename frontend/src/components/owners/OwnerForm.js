import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOwnerById, createOwner, updateOwner } from '../../services/apiService';

const OwnerForm = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const isNewOwner = !ownerId;
  
  const [owner, setOwner] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    telephone: ''
  });
  
  const [loading, setLoading] = useState(!isNewOwner);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isNewOwner) {
      const fetchOwner = async () => {
        try {
          const response = await getOwnerById(ownerId);
          setOwner(response.data);
        } catch (error) {
          console.error('Error fetching owner:', error);
          setError('Failed to fetch owner details. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchOwner();
    }
  }, [ownerId, isNewOwner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner(prevOwner => ({
      ...prevOwner,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isNewOwner) {
        await createOwner(owner);
        navigate('/owners');
      } else {
        await updateOwner(ownerId, owner);
        navigate(`/owners/${ownerId}`);
      }
    } catch (error) {
      console.error('Error saving owner:', error);
      setError('Failed to save owner. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{isNewOwner ? 'Add Owner' : 'Edit Owner'}</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={owner.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-3 row">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={owner.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-3 row">
          <label htmlFor="address" className="col-sm-2 col-form-label">Address:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={owner.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-3 row">
          <label htmlFor="city" className="col-sm-2 col-form-label">City:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={owner.city}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-3 row">
          <label htmlFor="telephone" className="col-sm-2 col-form-label">Telephone:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="telephone"
              name="telephone"
              value={owner.telephone}
              onChange={handleChange}
              required
              pattern="[0-9]+"
              title="Please enter only numbers"
            />
          </div>
        </div>
        
        <div className="mb-3 row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary me-2">Save</button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => isNewOwner ? navigate('/owners') : navigate(`/owners/${ownerId}`)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OwnerForm; 