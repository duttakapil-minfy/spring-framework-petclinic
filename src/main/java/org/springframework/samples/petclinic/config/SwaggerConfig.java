package org.springframework.samples.petclinic.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI petClinicOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Spring PetClinic API")
                .description("REST API for Spring PetClinic")
                .version("v1.0.0")
                .contact(new Contact()
                    .name("Spring PetClinic")
                    .url("https://spring-petclinic.github.io/"))
                .license(new License()
                    .name("Apache 2.0")
                    .url("https://www.apache.org/licenses/LICENSE-2.0")))
            .externalDocs(new ExternalDocumentation()
                .description("Spring PetClinic GitHub")
                .url("https://github.com/spring-petclinic/spring-framework-petclinic"));
    }
}