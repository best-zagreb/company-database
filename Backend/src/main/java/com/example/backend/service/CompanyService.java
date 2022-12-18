package com.example.backend.service;

import com.example.backend.controller.dto.CompanyDto;
import com.example.backend.model.Company;
import com.example.backend.repo.CompanyRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional
public class CompanyService
{
    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository)
    {
        this.companyRepository = companyRepository;
    }

    public List<Company> getAllCompanies(){
        return companyRepository.findAll();
    }

    public Company getCompany(Long id){
        Optional<Company> company = companyRepository.findById(id);
        if (!company.isPresent()){
            throw new EntityNotFoundException();
        }
        return company.get();
    }

    public Company createCompany(CompanyDto companyDto){
        return companyRepository.save(companyDto.toCompany());
    }
}
