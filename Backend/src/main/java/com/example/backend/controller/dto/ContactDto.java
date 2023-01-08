package com.example.backend.controller.dto;

import com.example.backend.model.Contact;

public class ContactDto
{
    private String firstName;
    private String lastName;
    private String email;
    private String tel;
    private String role;
    private String description;

    public ContactDto(String firstName, String lastName, String email, String tel, String role, String description)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.tel = tel;
        this.role = role;
        this.description = description;
    }

    public String getFirstName()
    {
        return firstName;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public String getLastName()
    {
        return lastName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getTel()
    {
        return tel;
    }

    public void setTel(String tel)
    {
        this.tel = tel;
    }

    public String getRole()
    {
        return role;
    }

    public void setRole(String role)
    {
        this.role = role;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public Contact toContact(){
        return new Contact(firstName, lastName, email, tel, role, description);
    }
}
