package com.example.backend.companies.service;

import com.example.backend.companies.controller.dto.CompanyDto;
import com.example.backend.companies.controller.dto.ContactDto;
import com.example.backend.companies.model.Company;
import com.example.backend.companies.model.Contact;
import com.example.backend.companies.repo.CompanyRepository;
import com.example.backend.companies.repo.ContactRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional
public class CompanyService
{
    private final CompanyRepository companyRepository;
    private final ContactRepository contactRepository;

    public CompanyService(CompanyRepository companyRepository, ContactRepository contactRepository)
    {
        this.companyRepository = companyRepository;
        this.contactRepository = contactRepository;
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

    public Company editCompany(Long companyId, CompanyDto companyDto){
        Optional<Company> optionalCompany = companyRepository.findById(companyId);
        if (optionalCompany.isEmpty()){
            throw new EntityNotFoundException();
        }
        Company company = optionalCompany.get();
        company.updateWith(companyDto);
        companyRepository.save(company);
        return company;
    }

    public void deleteCompany(Long companyId){
        Optional<Company> optionalCompany = companyRepository.findById(companyId);
        if (optionalCompany.isEmpty()){
            throw new EntityNotFoundException();
        }
        companyRepository.deleteCompanyById(companyId);
    }

    public Contact addContactToCompany(Long companyId, ContactDto contactDto){
        Optional<Company> optionalCompany = companyRepository.findById(companyId);
        if (optionalCompany.isEmpty()){
            throw new EntityNotFoundException();
        }
        Company company = optionalCompany.get();
        Contact contact = contactDto.toContact();
        contact.setCompany(company);
        return contactRepository.save(contact);
    }

    public Contact editContact(Long companyId, Long contactId, ContactDto contactDto){
        Optional<Company> optionalCompany = companyRepository.findById(companyId);
        if (optionalCompany.isEmpty()){
            throw new EntityNotFoundException();
        }
        Optional<Contact> optionalContact = contactRepository.findById(contactId);
        if (optionalContact.isEmpty()){
            throw new EntityNotFoundException();
        }
        Contact contact = optionalContact.get();
        if (contact.getCompany().getId() != companyId){
            throw new EntityNotFoundException();
        }
        contact.updateWith(contactDto);
        return contactRepository.save(contact);
    }

    public void deleteContact(Long companyId, Long contactId){
        Optional<Company> optionalCompany = companyRepository.findById(companyId);
        if (optionalCompany.isEmpty()){
            throw new EntityNotFoundException();
        }
        Optional<Contact> optionalContact = contactRepository.findById(contactId);
        if (optionalContact.isEmpty()){
            throw new EntityNotFoundException();
        }
        Contact contact = optionalContact.get();
        if (contact.getCompany().getId() != companyId){
            throw new EntityNotFoundException();
        }
        contactRepository.deleteContactById(contactId);
    }

}
