import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOwnerById, getPetById, getPetTypes, createPet, updatePet } from '../../services/apiService';

const PetForm = () => {
  const { ownerId, petId } = useParams();
  const navigate = useNavigate();
  const isNewPet = !petId;
  
  const [pet, setPet] = useState({
    name: '',
    birthDate: '',
    typeId: ''
  });
  
  const [owner, setOwner] = useState(null);
  const [petTypes, setPetTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch owner
        const ownerResponse = await getOwnerById(ownerId);
        setOwner(ownerResponse.data);
        
        // Fetch pet types
        const typesResponse = await getPetTypes();
        setPetTypes(typesResponse.data);
        
        // Fetch pet if editing
        if (!isNewPet) {
          const petResponse = await getPetById(petId);
          const petData = petResponse.data;
          
          // Format date for input field (YYYY-MM-DD)
          let formattedDate = '';
          if (petData.birthDate) {
            // Handle different date formats
            let birthDate;
            if (Array.isArray(petData.birthDate)) {
              // Handle [year, month, day] format
              birthDate = new Date(
                petData.birthDate[0], 
                petData.birthDate[1] - 1, // Month is 0-indexed in JS Date
                petData.birthDate[2]
              );
            } else {
              // Handle string format
              birthDate = new Date(petData.birthDate);
            }
            
            // Format as YYYY-MM-DD for input field
            formattedDate = birthDate.toISOString().split('T')[0];
          }
          
          setPet({
            name: petData.name || '',
            birthDate: formattedDate,
            typeId: petData.type ? petData.type.id : ''
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [ownerId, petId, isNewPet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet(prevPet => ({
      ...prevPet,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const petData = {
        ...pet,
        // Ensure typeId is sent as a number
        typeId: pet.typeId ? parseInt(pet.typeId, 10) : null
      };
      
      if (isNewPet) {
        await createPet(ownerId, petData);
      } else {
        await updatePet(ownerId, petId, petData);
      }
      navigate(`/owners/${ownerId}`);
    } catch (error) {
      console.error('Error saving pet:', error);
      setError('Failed to save pet. Please try again later.');
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
      <h2>{isNewPet ? 'Add Pet' : 'Edit Pet'}</h2>
      <h3>Owner: {owner.firstName} {owner.lastName}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={pet.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-3 row">
          <label htmlFor="birthDate" className="col-sm-2 col-form-label">Birth Date:</label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="birthDate"
              name="birthDate"
              value={pet.birthDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-3 row">
          <label htmlFor="typeId" className="col-sm-2 col-form-label">Type:</label>
          <div className="col-sm-10">
            <select
              className="form-select"
              id="typeId"
              name="typeId"
              value={pet.typeId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Type --</option>
              {petTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-3 row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary me-2">Save</button>
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

export default PetForm; 