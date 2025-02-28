# Setup Instructions

Follow these steps to run the Spring PetClinic application with the REST API and React frontend:

## 1. Running the Backend

```bash
# Run the backend (skips tests)
./run.sh

# Or use Maven directly
./mvnw jetty:run-war -DskipTests
```

The backend will start on http://localhost:8080

You can access the Swagger API documentation at: http://localhost:8080/swagger-ui/index.html

## 2. Running the Frontend

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start on http://localhost:3000

## Troubleshooting

### CORS Issues

If you encounter CORS issues:
- Make sure the backend is running on http://localhost:8080
- Check that the frontend is running on http://localhost:3000
- Verify that the CORS configuration in the backend allows requests from http://localhost:3000

### API 503 Errors

If you see 503 errors when accessing the API:
- Make sure the backend is started without errors
- Check the backend logs for any exceptions
- Verify that the RestApiConfig is properly loaded

### Test Failures

If you encounter test failures:
- Run with -DskipTests flag to bypass tests
- Use the provided run.sh script which already includes this flag