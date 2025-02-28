package org.springframework.samples.petclinic.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class to enable REST API controllers and config
 */
@Configuration
@ComponentScan(basePackages = {
    "org.springframework.samples.petclinic.rest",
    "org.springframework.samples.petclinic.config"
})
public class RestApiConfig {
    // This class serves as a marker for component scanning
}