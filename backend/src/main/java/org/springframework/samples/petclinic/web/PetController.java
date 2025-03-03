/*
 * Copyright 2002-2022 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.samples.petclinic.web;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Pet operations
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class PetController {

    private final ClinicService clinicService;

    @Autowired
    public PetController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @InitBinder
    public void setAllowedFields(WebDataBinder dataBinder) {
        dataBinder.setDisallowedFields("id");
    }

    @GetMapping("/pettypes")
    public ResponseEntity<Collection<PetType>> getPetTypes() {
        return ResponseEntity.ok(this.clinicService.findPetTypes());
    }

    @GetMapping("/pets/{petId}")
    public ResponseEntity<Pet> getPet(@PathVariable("petId") int petId) {
        Pet pet = this.clinicService.findPetById(petId);
        return ResponseEntity.ok(pet);
    }

    @PostMapping("/owners/{ownerId}/pets")
    public ResponseEntity<Pet> createPet(@PathVariable("ownerId") int ownerId, @Valid @RequestBody Pet pet) {
        Owner owner = this.clinicService.findOwnerById(ownerId);
        owner.addPet(pet);
        this.clinicService.savePet(pet);
        return ResponseEntity.ok(pet);
    }

    @PutMapping("/owners/{ownerId}/pets/{petId}")
    public ResponseEntity<Pet> updatePet(@PathVariable("ownerId") int ownerId, @PathVariable("petId") int petId, @Valid @RequestBody Pet pet) {
        pet.setId(petId);
        Owner owner = this.clinicService.findOwnerById(ownerId);
        pet.setOwner(owner);
        this.clinicService.savePet(pet);
        return ResponseEntity.ok(pet);
    }
}
