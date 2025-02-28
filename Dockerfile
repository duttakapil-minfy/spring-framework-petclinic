FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.war /app/petclinic.war
EXPOSE 8080
RUN apt-get update && apt-get install -y wget && \
    wget https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-runner/9.4.46.v20220331/jetty-runner-9.4.46.v20220331.jar -O jetty-runner.jar
CMD ["java", "-jar", "jetty-runner.jar", "--port", "8080", "--path", "/", "petclinic.war"] 