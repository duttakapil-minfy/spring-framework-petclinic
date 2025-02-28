package org.springframework.samples.petclinic.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.Visit;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api")
@Tag(name = "Visits", description = "the Visits API")
public class VisitRestController {

    private final ClinicService clinicService;

    @Autowired
    public VisitRestController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping("/pets/{petId}/visits")
    @Operation(summary = "Find visits by pet ID",
        description = "Returns all visits for a pet")
    @ApiResponse(responseCode = "200", description = "List of visits",
        content = @Content(schema = @Schema(implementation = Visit.class)))
    @ApiResponse(responseCode = "404", description = "Pet not found")
    public ResponseEntity<Collection<Visit>> getVisitsForPet(
        @Parameter(description = "ID of pet to get visits for")
        @PathVariable int petId) {
        Pet pet = this.clinicService.findPetById(petId);
        if (pet == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Collection<Visit> visits = this.clinicService.findVisitsByPetId(petId);
        return new ResponseEntity<>(visits, HttpStatus.OK);
    }

    @PostMapping("/owners/{ownerId}/pets/{petId}/visits")
    @Operation(summary = "Add a new visit for a pet",
        description = "Creates a new visit in the system for a specific pet")
    @ApiResponse(responseCode = "201", description = "Visit created",
        content = @Content(schema = @Schema(implementation = Visit.class)))
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @ApiResponse(responseCode = "404", description = "Pet not found")
    public ResponseEntity<Visit> addVisit(
        @Parameter(description = "ID of owner")
        @PathVariable int ownerId,
        @Parameter(description = "ID of pet")
        @PathVariable int petId,
        @Valid @RequestBody Visit visit) {
        
        Pet pet = this.clinicService.findPetById(petId);
        if (pet == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        visit.setPet(pet);
        this.clinicService.saveVisit(visit);
        return new ResponseEntity<>(visit, HttpStatus.CREATED);
    }
}