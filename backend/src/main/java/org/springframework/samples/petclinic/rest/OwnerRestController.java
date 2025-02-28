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
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/owners")
@Tag(name = "Owners", description = "the Owners API")
public class OwnerRestController {

    private final ClinicService clinicService;

    @Autowired
    public OwnerRestController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping
    @Operation(summary = "Get all owners or find by last name",
        description = "Get a list of all owners in the system or find owners by last name")
    @ApiResponse(responseCode = "200", description = "List of owners",
        content = @Content(schema = @Schema(implementation = Owner.class)))
    public ResponseEntity<Collection<Owner>> getOwners(@RequestParam(required = false) String lastName) {
        if (lastName == null) {
            lastName = "";
        }
        Collection<Owner> owners = this.clinicService.findOwnerByLastName(lastName);
        return new ResponseEntity<>(owners, HttpStatus.OK);
    }

    @GetMapping("/{ownerId}")
    @Operation(summary = "Find owner by ID",
        description = "Returns a single owner")
    @ApiResponse(responseCode = "200", description = "Owner found",
        content = @Content(schema = @Schema(implementation = Owner.class)))
    @ApiResponse(responseCode = "404", description = "Owner not found")
    public ResponseEntity<Owner> getOwner(
        @Parameter(description = "ID of owner to return")
        @PathVariable int ownerId) {
        Owner owner = this.clinicService.findOwnerById(ownerId);
        if (owner == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(owner, HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "Add a new owner",
        description = "Creates a new owner in the system")
    @ApiResponse(responseCode = "201", description = "Owner created",
        content = @Content(schema = @Schema(implementation = Owner.class)))
    @ApiResponse(responseCode = "400", description = "Invalid input")
    public ResponseEntity<Owner> addOwner(@Valid @RequestBody Owner owner) {
        this.clinicService.saveOwner(owner);
        return new ResponseEntity<>(owner, HttpStatus.CREATED);
    }

    @PutMapping("/{ownerId}")
    @Operation(summary = "Update an existing owner",
        description = "Updates the information for an existing owner")
    @ApiResponse(responseCode = "200", description = "Owner updated",
        content = @Content(schema = @Schema(implementation = Owner.class)))
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @ApiResponse(responseCode = "404", description = "Owner not found")
    public ResponseEntity<Owner> updateOwner(
        @Parameter(description = "ID of owner to update")
        @PathVariable int ownerId,
        @Valid @RequestBody Owner owner) {
        Owner currentOwner = this.clinicService.findOwnerById(ownerId);
        if (currentOwner == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        // Update owner fields
        currentOwner.setFirstName(owner.getFirstName());
        currentOwner.setLastName(owner.getLastName());
        currentOwner.setAddress(owner.getAddress());
        currentOwner.setCity(owner.getCity());
        currentOwner.setTelephone(owner.getTelephone());
        
        this.clinicService.saveOwner(currentOwner);
        return new ResponseEntity<>(currentOwner, HttpStatus.OK);
    }

    @DeleteMapping("/{ownerId}")
    @Operation(summary = "Delete an owner",
        description = "Deletes an owner from the system")
    @ApiResponse(responseCode = "204", description = "Owner deleted successfully")
    @ApiResponse(responseCode = "404", description = "Owner not found")
    public ResponseEntity<Void> deleteOwner(
        @Parameter(description = "ID of owner to delete")
        @PathVariable int ownerId) {
        Owner owner = this.clinicService.findOwnerById(ownerId);
        if (owner == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        this.clinicService.deleteOwner(owner);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}