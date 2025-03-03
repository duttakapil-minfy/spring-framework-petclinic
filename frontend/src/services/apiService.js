import axios from 'axios';

// Create a custom axios instance with specific configuration
const api = axios.create({
  baseURL: '/api', // Use relative URL for proxying
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Enable sending cookies with requests for CORS with credentials
});

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log('API Request:', config);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  },
  error => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  }
);

// Owner API
export const getOwners = (lastName = '') => {
  // Use the correct search endpoint when lastName is provided
  const endpoint = lastName ? `/owners/search?lastName=${lastName}` : '/owners';
  return api.get(endpoint);
};

export const getOwnerById = (id) => {
  return api.get(`/owners/${id}`);
};

export const createOwner = (owner) => {
  return api.post('/owners', owner);
};

export const updateOwner = (id, owner) => {
  return api.put(`/owners/${id}`, owner);
};

export const deleteOwner = (id) => {
  return api.delete(`/owners/${id}`);
};

// Pet API
export const getPetTypes = () => {
  return api.get('/pettypes');
};

export const getPetById = (id) => {
  return api.get(`/pets/${id}`);
};

export const createPet = (ownerId, pet) => {
  return api.post(`/owners/${ownerId}/pets`, pet);
};

export const updatePet = (ownerId, petId, pet) => {
  return api.put(`/owners/${ownerId}/pets/${petId}`, pet);
};

// Visit API
export const getVisitsByPetId = (petId) => {
  return api.get(`/pets/${petId}/visits`);
};

export const createVisit = (ownerId, petId, visit) => {
  return api.post(`/owners/${ownerId}/pets/${petId}/visits`, visit);
};

// Vet API
export const getVets = () => {
  return api.get('/vets');
};