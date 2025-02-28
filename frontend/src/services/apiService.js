import axios from 'axios';

const API_URL = '/api';

// Owner API
export const getOwners = (lastName = '') => {
    return axios.get(`${API_URL}/owners`, { params: { lastName } });
};

export const getOwnerById = (id) => {
    return axios.get(`${API_URL}/owners/${id}`);
};

export const createOwner = (owner) => {
    return axios.post(`${API_URL}/owners`, owner);
};

export const updateOwner = (id, owner) => {
    return axios.put(`${API_URL}/owners/${id}`, owner);
};

export const deleteOwner = (id) => {
    return axios.delete(`${API_URL}/owners/${id}`);
};

// Pet API
export const getPetTypes = () => {
    return axios.get(`${API_URL}/pettypes`);
};

export const getPetById = (id) => {
    return axios.get(`${API_URL}/pets/${id}`);
};

export const createPet = (ownerId, pet) => {
    return axios.post(`${API_URL}/owners/${ownerId}/pets`, pet);
};

export const updatePet = (ownerId, petId, pet) => {
    return axios.put(`${API_URL}/owners/${ownerId}/pets/${petId}`, pet);
};

// Visit API
export const getVisitsByPetId = (petId) => {
    return axios.get(`${API_URL}/pets/${petId}/visits`);
};

export const createVisit = (ownerId, petId, visit) => {
    return axios.post(`${API_URL}/owners/${ownerId}/pets/${petId}/visits`, visit);
};

// Vet API
export const getVets = () => {
    return axios.get(`${API_URL}/vets`);
};