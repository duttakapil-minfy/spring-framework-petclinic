import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOwnerById, getPetById, createVisit } from '../../services/apiService';

const VisitForm = () => {
  const { ownerId, petId } = useParams();
  const navigate = useNavigate();
  
  const [visit, setVisit] = useState({
    date: new Date().toISOString().split('T')[0], // Today's date as default
    description: ''
  });
  
  const [owner, setOwner] = useState(null);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch owner
        const ownerResponse = await getOwnerById(ownerId);
        setOwner(ownerResponse.data);
        
        // Fetch pet
        const petResponse = await getPetById(petId);
        setPet(petResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [ownerId, petId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisit(prevVisit => ({
      ...prevVisit,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createVisit(ownerId, petId, visit);
      navigate(`/owners/${ownerId}`);
    } catch (error) {
      console.error('Error saving visit:', error);
      setError('Failed to save visit. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!owner || !pet) {
    return <div className="alert alert-warning">Owner or pet not found</div>;
  }

  return (
    <div>
      <h2>New Visit</h2>
      
      <div className="card mb-4">
        <div className="card-header">
          <h3>Pet Information</h3>
        </div>
        <div className="card-body">
          <table className="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{pet.name}</td>
              </tr>
              <tr>
                <th>Birth Date</th>
                <td>{new Date(pet.birthDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{pet.type ? pet.type.name : 'Unknown'}</td>
              </tr>
              <tr>
                <th>Owner</th>
                <td>{owner.firstName} {owner.lastName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <h3>Visit Details</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="date" className="col-sm-2 col-form-label">Date:</label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={visit.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-3 row">
          <label htmlFor="description" className="col-sm-2 col-form-label">Description:</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={visit.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        
        <div className="mb-3 row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary me-2">Add Visit</button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate(`/owners/${ownerId}`)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VisitForm; 