#!/bin/bash
set -e

echo "Building PetClinic backend..."
mvn clean package -DskipTests

echo "Build completed successfully!" 