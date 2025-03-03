package org.springframework.samples.petclinic.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/testing")
public class MyRestController {

    @Autowired
    ClinicService clinicService;

    @GetMapping("/home")
    public ResponseEntity<Map<String, String>> home() {
        System.out.println("pet types"+clinicService.findPetTypes());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello");
        return ResponseEntity.ok(response);
    }
    @PostMapping("/save")
    public ResponseEntity<Map<String,String>> add(@RequestBody Owner data){
        System.out.println(data.getCity());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello");
        response.put("city",data.getCity());
        return ResponseEntity.ok(response);

    }
}
