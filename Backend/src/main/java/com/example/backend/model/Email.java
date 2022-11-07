package com.example.backend.model;

import javax.persistence.*;
import java.util.UUID;

@SuppressWarnings("ALL")
@Entity
public class Email {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "emailstring", unique = true)
    private String emailString;

    private String authority;

    public Email(String emailString, String authority) {
        this.emailString = emailString;
        this.authority = authority;
    }

    public Email() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return emailString;
    }

    public void setEmail(String emailString) {
        this.emailString = emailString;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
