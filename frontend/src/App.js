import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import OwnersList from './components/owners/OwnersList';
import OwnerDetails from './components/owners/OwnerDetails';
import OwnerForm from './components/owners/OwnerForm';
import VetsList from './components/vets/VetsList';
import PetForm from './components/pets/PetForm';
import VisitForm from './components/visits/VisitForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/owners" element={<OwnersList />} />
            <Route path="/owners/new" element={<OwnerForm />} />
            <Route path="/owners/:ownerId" element={<OwnerDetails />} />
            <Route path="/owners/:ownerId/edit" element={<OwnerForm />} />
            <Route path="/owners/:ownerId/pets/new" element={<PetForm />} />
            <Route path="/owners/:ownerId/pets/:petId/edit" element={<PetForm />} />
            <Route path="/owners/:ownerId/pets/:petId/visits/new" element={<VisitForm />} />
            <Route path="/vets" element={<VetsList />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;