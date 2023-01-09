package com.example.backend.companies.controller;

import com.example.backend.companies.controller.dto.CompanyDto;
import com.example.backend.companies.controller.dto.ContactDto;
import com.example.backend.companies.model.Company;
import com.example.backend.companies.model.Contact;
import com.example.backend.companies.service.CompanyService;
import com.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/companies")
public class CompanyController
{
    private final CompanyService companyService;
    private final UserService userService;

    public CompanyController(CompanyService companyService, UserService userService)
    {
        this.companyService = companyService;
        this.userService = userService;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Company>> getCompanies(){
        return new ResponseEntity<>(companyService.getAllCompanies(), HttpStatus.OK);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Company> AddCompany(@RequestBody CompanyDto companyDto){
        return new ResponseEntity<>(companyService.createCompany(companyDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Company> getCompany(@PathVariable Long id){
        return new ResponseEntity<>(companyService.getCompany(id), HttpStatus.OK);
    }

    @PostMapping("{companyId}/contacts")
    @ResponseBody
    public ResponseEntity<Contact> addContact(@PathVariable Long companyId, @RequestBody ContactDto contactDto){
        return new ResponseEntity<>(companyService.addContactToCompany(companyId, contactDto), HttpStatus.OK);
    }

    @PutMapping("{companyId}")
    @ResponseBody
    public ResponseEntity<Company> editCompany(@PathVariable Long companyId, @RequestBody CompanyDto companyDto){
        return new ResponseEntity<>(companyService.editCompany(companyId, companyDto), HttpStatus.OK);
    }

    @DeleteMapping("{companyId}")
    @ResponseBody
    public ResponseEntity<Company> deleteCompany(@PathVariable Long companyId){
        companyService.deleteCompany(companyId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("{companyId}/contacts/{contactId}")
    @ResponseBody
    public ResponseEntity<Contact> editContact(@PathVariable Long companyId, @PathVariable Long contactId, @RequestBody ContactDto contactDto){
        return new ResponseEntity<>(companyService.editContact(companyId, contactId, contactDto), HttpStatus.OK);
    }

    @DeleteMapping("{companyId}/contacts/{contactId}")
    @ResponseBody
    public ResponseEntity deleteContact(@PathVariable Long companyId, @PathVariable Long contactId, @RequestBody ContactDto contactDto){
        companyService.deleteContact(companyId, contactId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private boolean authenticate(List<AUTHORITY>)
}
