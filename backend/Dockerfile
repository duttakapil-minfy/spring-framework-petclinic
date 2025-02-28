FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests

FROM jetty:11.0-jdk17
WORKDIR /var/lib/jetty/webapps
COPY --from=build /app/target/petclinic.war ROOT.war

EXPOSE 8080
CMD ["java", "-jar", "/usr/local/jetty/start.jar"]