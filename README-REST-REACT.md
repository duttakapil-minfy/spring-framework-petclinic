# Spring PetClinic REST API with React Frontend

This project is a conversion of the original Spring PetClinic JSP application to a modern architecture with:

1. Spring REST API backend with Swagger documentation
2. React-based frontend

## Backend (Spring REST API)

The backend has been modified to expose RESTful APIs that can be consumed by any frontend. All the business logic from the original application has been preserved.

### Key Features

- RESTful API endpoints with proper HTTP methods (GET, POST, PUT, DELETE)
- Swagger/OpenAPI documentation
- CORS configuration to allow cross-origin requests from the frontend
- Maintained the same data model and service layer
- Added missing functionality such as owner deletion

### API Endpoints

- `/api/owners` - Owner management
- `/api/pets` - Pet management
- `/api/pettypes` - Pet types
- `/api/vets` - Veterinarians information
- `/api/visits` - Visit management

### Swagger Documentation

Access the API documentation at: `http://localhost:8080/swagger-ui.html`

## Frontend (React)

The frontend is a modern React application that consumes the REST API provided by the backend.

### Key Features

- Built with React 18 and React Router
- Bootstrap for responsive UI
- Axios for API communication
- Complete UI for all functionality in the original application

### Pages and Components

- Home page
- Owner management (list, add, view, edit, delete)
- Pet management (add, edit)
- Visit management (add)
- Veterinarian listing

## Running the Application

### Backend

```
cd petclinic-original
./mvnw jetty:run-war
```

This will start the backend server on http://localhost:8080

### Frontend

```
cd petclinic-original/frontend
npm install
npm start
```

This will start the React development server on http://localhost:3000

## Implementation Notes

1. The application has been split into backend and frontend directories
2. REST endpoints use standard HTTP methods and return appropriate status codes
3. The frontend communicates with the backend via Axios
4. CORS has been configured on the backend to allow requests from the frontend