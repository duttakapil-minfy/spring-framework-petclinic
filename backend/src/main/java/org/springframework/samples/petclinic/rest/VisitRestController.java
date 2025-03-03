package org.springframework.samples.petclinic.rest;

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
public class VisitRestController {

    private final ClinicService clinicService;

    @Autowired
    public VisitRestController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping("/pets/{petId}/visits")
    public ResponseEntity<Collection<Visit>> getVisitsForPet(@PathVariable int petId) {
        Pet pet = this.clinicService.findPetById(petId);
        if (pet == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Collection<Visit> visits = this.clinicService.findVisitsByPetId(petId);
        return new ResponseEntity<>(visits, HttpStatus.OK);
    }

    @PostMapping("/owners/{ownerId}/pets/{petId}/visits")
    public ResponseEntity<Visit> addVisit(
            @PathVariable int ownerId,
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