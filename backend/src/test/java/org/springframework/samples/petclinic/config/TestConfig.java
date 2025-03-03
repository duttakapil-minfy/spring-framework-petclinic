package org.springframework.samples.petclinic.config;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class TestConfig implements WebMvcConfigurer {
    
    @Bean
    public ClinicService clinicService() {
        return Mockito.mock(ClinicService.class);
    }
    
    // Add any other beans needed for testing
} 