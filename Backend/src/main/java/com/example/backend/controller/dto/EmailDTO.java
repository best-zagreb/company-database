package com.example.backend.controller.dto;

import com.example.backend.model.Email;

public class EmailDTO {
    private String email;
    private String authority;

    public EmailDTO(String email, String authority) {
        this.email = email;
        this.authority = authority;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public Email toEmail(){
        return new Email(this.email, this.authority);
    }
}
