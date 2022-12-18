package com.example.backend.controller;

import com.example.backend.model.AppUser;
import com.example.backend.model.Company;
import com.example.backend.service.CompanyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/companies")
public class CompanyController
{
    private final CompanyService companyService;

    public CompanyController(CompanyService companyService)
    {
        this.companyService = companyService;
    }

    @GetMapping
    @ResponseBody
    public List<Company> getCompanies(){
        return companyService.getAllCompanies();
    }
}
