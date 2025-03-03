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
import java.util.Map;
import java.util.HashMap;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.Visit;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Visit operations
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class VisitController {

    private final ClinicService clinicService;

    @Autowired
    public VisitController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @InitBinder
    public void setAllowedFields(WebDataBinder dataBinder) {
        dataBinder.setDisallowedFields("id");
    }

    @GetMapping("/pets/{petId}/visits")
    public ResponseEntity<Collection<Visit>> getVisitsByPetId(@PathVariable("petId") int petId) {
        return ResponseEntity.ok(this.clinicService.findVisitsByPetId(petId));
    }

    @PostMapping("/owners/{ownerId}/pets/{petId}/visits")
    public ResponseEntity<Visit> createVisit(@PathVariable("ownerId") int ownerId, @PathVariable("petId") int petId, @Valid @RequestBody Visit visit) {
        Pet pet = this.clinicService.findPetById(petId);
        visit.setPet(pet);
        this.clinicService.saveVisit(visit);
        return ResponseEntity.ok(visit);
    }
}
