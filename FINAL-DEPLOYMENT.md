# PetClinic REST API + React Frontend - Deployment Guide

This document provides instructions for deploying the modernized PetClinic application with a REST API backend and React frontend.

## Solution Overview

1. **Backend**: Spring Framework with REST API endpoints
   - Located in `/backend` directory
   - Uses Swagger/OpenAPI for API documentation
   - Runs in Jetty container

2. **Frontend**: React SPA (Single Page Application)
   - Located in `/frontend` directory
   - Communicates with backend via REST API
   - Served by Nginx

## Deployment Using Docker Compose

1. **Build and start the containers**:
   ```bash
   docker-compose up -d --build
   ```

2. **Access the application**:
   - Frontend: http://localhost
   - Backend API: http://localhost:8080/api
   - Swagger UI: http://localhost:8080/swagger-ui/index.html

3. **Stop the application**:
   ```bash
   docker-compose down
   ```

## Key Changes Made

1. **Backend**:
   - Moved from MVC+JSP to REST API architecture
   - Added Swagger documentation
   - Configured CORS to allow cross-origin requests
   - Set up Docker container with Jetty

2. **Frontend**:
   - Created React application structure
   - Implemented API service layer with Axios
   - Used React Router for navigation
   - Dockerized with Nginx for static file serving and API proxying

3. **Deployment**:
   - Used Docker Compose for service orchestration
   - Set up networking between containers
   - Configured proper container dependencies

## Troubleshooting

If you encounter 404 errors:
1. Make sure both containers are running: `docker-compose ps`
2. Check backend logs: `docker logs petclinic-backend`
3. Check frontend logs: `docker logs petclinic-frontend`
4. Verify API endpoints are accessible: http://localhost:8080/api/
5. Ensure frontend is properly configured to call the API

---

The application now provides a modern, decoupled architecture with a clean separation between the frontend and backend services.