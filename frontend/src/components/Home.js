import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="row">
      <div className="col-md-12 text-center">
        <h1>Welcome to Spring PetClinic</h1>
        <img src="/images/pets.png" alt="pets" className="img-fluid my-4" />
        
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Find Owners</h5>
                <p className="card-text">Find owners and their pets in our database.</p>
                <Link to="/owners" className="btn btn-primary">
                  Find Owners Now
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Add a New Owner</h5>
                <p className="card-text">Register a new pet owner in our system.</p>
                <Link to="/owners/new" className="btn btn-primary">
                  Register Owner
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Veterinarians</h5>
                <p className="card-text">View all of our veterinarians and their specialties.</p>
                <Link to="/vets" className="btn btn-primary">
                  View Vets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;