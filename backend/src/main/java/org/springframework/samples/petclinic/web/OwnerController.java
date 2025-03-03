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
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Owner operations
 */
@RestController
@RequestMapping("/api/owners")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class OwnerController {

    private final ClinicService clinicService;

    @Autowired
    public OwnerController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @InitBinder
    public void setAllowedFields(WebDataBinder dataBinder) {
        dataBinder.setDisallowedFields("id");
    }

    @PostMapping
    public ResponseEntity<Owner> createOwner(@Valid @RequestBody Owner owner) {
        this.clinicService.saveOwner(owner);
        return ResponseEntity.ok(owner);
    }

    @GetMapping("/search")
    public ResponseEntity<?> findOwners(@RequestParam(required = false) String lastName) {
        if (lastName == null) {
            lastName = "";
        }
        Collection<Owner> results = this.clinicService.findOwnerByLastName(lastName);
        if (results.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "No owners found");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.ok(results);
    }

    @GetMapping
    public ResponseEntity<Collection<Owner>> getAllOwners() {
        Collection<Owner> owners = this.clinicService.findAllOwners();
        System.out.println("owners list"+owners);
        return ResponseEntity.ok(owners);
    }
//@GetMapping
//public ResponseEntity<Map<String, Object>> getAllOwners() {
//    Collection<Owner> owners = this.clinicService.findAllOwners();
//    System.out.println("owners list"+owners);
//    Map<String, Object> response = new HashMap<>();
//    response.put("message", "Hello");
//    response.put("owners",owners);
//    return ResponseEntity.ok(response);
//}

    @GetMapping("/{ownerId}")
    public ResponseEntity<Owner> getOwner(@PathVariable("ownerId") int ownerId) {
        Owner owner = this.clinicService.findOwnerById(ownerId);
        return ResponseEntity.ok(owner);
    }

    @PutMapping("/{ownerId}")
    public ResponseEntity<Owner> updateOwner(@Valid @RequestBody Owner owner, @PathVariable("ownerId") int ownerId) {
        owner.setId(ownerId);
        this.clinicService.saveOwner(owner);
        return ResponseEntity.ok(owner);
    }

    @DeleteMapping("/{ownerId}")
    public ResponseEntity<Map<String, String>> deleteOwner(@PathVariable("ownerId") int ownerId) {
        Owner owner = this.clinicService.findOwnerById(ownerId);
        if (owner == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Owner not found");
            return ResponseEntity.status(404).body(response);
        }
        
        this.clinicService.deleteOwner(owner);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Owner deleted successfully");
        return ResponseEntity.ok(response);
    }
}
