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
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api")
@Tag(name = "Pets", description = "the Pets API")
public class PetRestController {

    private final ClinicService clinicService;

    @Autowired
    public PetRestController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping("/pettypes")
    @Operation(summary = "List all pet types", description = "Returns all pet types in the system")
    @ApiResponse(responseCode = "200", description = "List of pet types",
        content = @Content(schema = @Schema(implementation = PetType.class)))
    public ResponseEntity<Collection<PetType>> getPetTypes() {
        Collection<PetType> petTypes = this.clinicService.findPetTypes();
        return new ResponseEntity<>(petTypes, HttpStatus.OK);
    }

    @GetMapping("/pets/{petId}")
    @Operation(summary = "Find pet by ID", description = "Returns a single pet")
    @ApiResponse(responseCode = "200", description = "Pet found",
        content = @Content(schema = @Schema(implementation = Pet.class)))
    @ApiResponse(responseCode = "404", description = "Pet not found")
    public ResponseEntity<Pet> getPet(
        @Parameter(description = "ID of pet to return")
        @PathVariable int petId) {
        Pet pet = this.clinicService.findPetById(petId);
        if (pet == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pet, HttpStatus.OK);
    }

    @PostMapping("/owners/{ownerId}/pets")
    @Operation(summary = "Add a new pet to an owner",
        description = "Creates a new pet in the system for a specific owner")
    @ApiResponse(responseCode = "201", description = "Pet created",
        content = @Content(schema = @Schema(implementation = Pet.class)))
    @ApiResponse(responseCode = "400", description = "Invalid input")
    public ResponseEntity<Pet> addPet(
        @Parameter(description = "ID of owner")
        @PathVariable int ownerId,
        @Valid @RequestBody Pet pet) {
        if (pet.getOwner() == null || pet.getOwner().getId() == null) {
            // Make sure the pet is properly linked to an owner
            pet.setOwner(this.clinicService.findOwnerById(ownerId));
        }
        this.clinicService.savePet(pet);
        return new ResponseEntity<>(pet, HttpStatus.CREATED);
    }

    @PutMapping("/owners/{ownerId}/pets/{petId}")
    @Operation(summary = "Update an existing pet",
        description = "Updates the information for an existing pet")
    @ApiResponse(responseCode = "200", description = "Pet updated",
        content = @Content(schema = @Schema(implementation = Pet.class)))
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @ApiResponse(responseCode = "404", description = "Pet not found")
    public ResponseEntity<Pet> updatePet(
        @Parameter(description = "ID of owner")
        @PathVariable int ownerId,
        @Parameter(description = "ID of pet to update")
        @PathVariable int petId,
        @Valid @RequestBody Pet pet) {
        Pet currentPet = this.clinicService.findPetById(petId);
        if (currentPet == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        currentPet.setName(pet.getName());
        currentPet.setBirthDate(pet.getBirthDate());
        currentPet.setType(pet.getType());
        
        this.clinicService.savePet(currentPet);
        return new ResponseEntity<>(currentPet, HttpStatus.OK);
    }
}