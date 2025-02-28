# Spring Petclinic Commands & Guidelines

## Build Commands
- Build project: `./mvnw clean install`
- Run application: `./mvnw jetty:run-war`
- Run with specific DB: `./mvnw jetty:run-war -P MySQL` (options: H2 [default], HSQLDB, MySQL, PostgreSQL)
- Run with specific persistence: `./mvnw jetty:run-war -Dspring.profiles.active=jdbc` (options: jpa [default], jdbc, spring-data-jpa)
- Compile CSS: `./mvnw generate-resources -P css`
- Run single test: `./mvnw test -Dtest=OwnerControllerTests#testShowOwner`
- Run test class: `./mvnw test -Dtest=OwnerControllerTests`

## Code Style Guidelines
- **Naming**: CamelCase for classes (OwnerController), camelCase for variables (ownerService)
- **Imports**: Organize imports with static imports last
- **Types**: Use validation annotations (@NotEmpty, @Digits) on model properties
- **Error Handling**: Validate form inputs through model annotations
- **Formatting**: 4-space indentation, no trailing whitespace
- **Architecture**: Follow 3-layer architecture (controller -> service -> repository)
- **Testing**: Use JUnit 5 with MockMvc for controllers, use appropriate assertions
- **Spring Best Practices**: Use appropriate annotations, dependency injection through constructors