package org.springframework.samples.petclinic.util;

import org.springframework.samples.petclinic.model.Owner;

import java.util.List;

public class ResponseTemplate {
    private String status;
    private List<Owner> owners;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Owner> getOwners() {
        return owners;
    }

    public void setOwners(List<Owner> owners) {
        this.owners = owners;
    }
}
