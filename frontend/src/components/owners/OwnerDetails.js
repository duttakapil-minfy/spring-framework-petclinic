import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getOwnerById, deleteOwner } from '../../services/apiService';

const OwnerDetails = () => {
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ownerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [ownerId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this owner?')) {
      try {
        await deleteOwner(ownerId);
        navigate('/owners');
      } catch (error) {
        console.error('Error deleting owner:', error);
        setError('Failed to delete owner. Please try again later.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!owner) {
    return <div className="alert alert-warning">Owner not found</div>;
  }

  return (
    <div>
      <h2>Owner Information</h2>
      
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{owner.firstName} {owner.lastName}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{owner.address}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{owner.city}</td>
          </tr>
          <tr>
            <th>Telephone</th>
            <td>{owner.telephone}</td>
          </tr>
        </tbody>
      </table>
      
      <div className="mb-4">
        <Link to={`/owners/${ownerId}/edit`} className="btn btn-primary me-2">
          Edit Owner
        </Link>
        <button onClick={handleDelete} className="btn btn-danger me-2">
          Delete Owner
        </button>
        <Link to={`/owners/${ownerId}/pets/new`} className="btn btn-success">
          Add New Pet
        </Link>
      </div>
      
      <h3 className="mt-4">Pets and Visits</h3>
      
      {owner.pets && owner.pets.length === 0 ? (
        <div className="alert alert-info">No pets registered for this owner</div>
      ) : (
        <div>
          {owner.pets && owner.pets.map((pet) => (
            <div key={pet.id} className="card mb-4">
              <div className="card-header">
                <h4>{pet.name}</h4>
              </div>
              <div className="card-body">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Type</th>
                      <td>{pet.type ? pet.type.name : 'Unknown'}</td>
                    </tr>
                    <tr>
                      <th>Birth Date</th>
                      <td>{new Date(pet.birthDate).toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="mb-3">
                  <Link to={`/owners/${ownerId}/pets/${pet.id}/edit`} className="btn btn-primary me-2">
                    Edit Pet
                  </Link>
                  <Link to={`/owners/${ownerId}/pets/${pet.id}/visits/new`} className="btn btn-success">
                    Add Visit
                  </Link>
                </div>
                
                <h5 className="mt-3">Visits</h5>
                
                {pet.visits && pet.visits.length === 0 ? (
                  <div className="alert alert-info">No visits recorded</div>
                ) : (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Visit Date</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pet.visits && pet.visits.map((visit) => (
                        <tr key={visit.id}>
                          <td>{new Date(visit.date).toLocaleDateString()}</td>
                          <td>{visit.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDetails;