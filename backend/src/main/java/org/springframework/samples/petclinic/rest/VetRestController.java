package org.springframework.samples.petclinic.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.model.Vet;
import org.springframework.samples.petclinic.model.Vets;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/api")
@Tag(name = "Vets", description = "the Veterinarians API")
public class VetRestController {

    private final ClinicService clinicService;

    @Autowired
    public VetRestController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping("/vets")
    @Operation(summary = "List all veterinarians",
        description = "Returns a list of all veterinarians in the system")
    @ApiResponse(responseCode = "200", description = "List of vets",
        content = @Content(schema = @Schema(implementation = Vet.class)))
    public ResponseEntity<Collection<Vet>> getVets() {
        Collection<Vet> vets = this.clinicService.findVets();
        return new ResponseEntity<>(vets, HttpStatus.OK);
    }

    @GetMapping(value = "/vets.xml", produces = "application/xml")
    @Operation(summary = "List all veterinarians in XML format",
        description = "Returns a list of all veterinarians in Vets wrapper format")
    @ApiResponse(responseCode = "200", description = "List of vets in XML",
        content = @Content(schema = @Schema(implementation = Vets.class)))
    public Vets getVetsXml() {
        Vets vets = new Vets();
        vets.getVetList().addAll(this.clinicService.findVets());
        return vets;
    }
}