package com.example.backend.companies.service;

import com.example.backend.companies.controller.dto.CompanyDto;
import com.example.backend.companies.controller.dto.ContactDto;
import com.example.backend.companies.model.Company;
import com.example.backend.companies.model.Contact;
import com.example.backend.companies.repo.CompanyRepository;
import com.example.backend.companies.repo.ContactRepository;
import com.example.backend.user.model.AUTHORITY;
import com.example.backend.user.model.AppUser;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
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

    public List<Company> getAllCompanies(AppUser user) throws AuthenticationException
    {
        if (user == null) throw new AuthenticationException();
        return companyRepository.findAll();
    }

    public Company getCompany(AppUser user, Long id) throws AuthenticationException
    {
        if (user == null) throw new AuthenticationException();
        if (List.of(AUTHORITY.OBSERVER).contains(user.getAuthority())){
            throw new AuthenticationException();
        }
        Optional<Company> company = companyRepository.findById(id);
        if (!company.isPresent()){
            throw new EntityNotFoundException();
        }
        return company.get();
    }

    public Company createCompany(AppUser user, CompanyDto companyDto) throws AuthenticationException
    {
        if (user == null) throw new AuthenticationException();
        if (List.of(AUTHORITY.OBSERVER, AUTHORITY.FR_TEAM_MEMBER).contains(user.getAuthority())){
            throw new AuthenticationException();
        }
        return companyRepository.save(companyDto.toCompany());
    }

    public Company editCompany(AppUser user, Long companyId, CompanyDto companyDto) throws AuthenticationException
    {
        if (user == null) throw new AuthenticationException();
        if (List.of(AUTHORITY.OBSERVER, AUTHORITY.FR_TEAM_MEMBER).contains(user.getAuthority())){
            throw new AuthenticationException();
        }
        Optional<Company> optionalCompany = companyRepository.findById(companyId);
        if (optionalCompany.isEmpty()){
            throw new EntityNotFoundException();
        }
        Company company = optionalCompany.get();
        company.updateWith(companyDto);
        companyRepository.save(company);
        return company;
    }

    public void deleteCompany(AppUser user, Long companyId) throws AuthenticationException
    {
        if (user == null) throw new AuthenticationException();
        if (List.of(AUTHORITY.OBSERVER, AUTHORITY.FR_TEAM_MEMBER).contains(user.getAuthority())){
            throw new AuthenticationException();
        }
        Optional<Company> optionalCompany = companyRepository.findById(companyId);
        if (optionalCompany.isEmpty()){
            throw new EntityNotFoundException();
        }
        companyRepository.deleteCompanyById(companyId);
    }

    public Contact addContactToCompany(AppUser user, Long companyId, ContactDto contactDto) throws AuthenticationException
    {
        if (user == null) throw new AuthenticationException();
        if (List.of(AUTHORITY.OBSERVER).contains(user.getAuthority())){
            throw new AuthenticationException();
        }
        Optional<Company> optionalCompany = companyRepository.findById(companyId);
        if (optionalCompany.isEmpty()){
            throw new EntityNotFoundException();
        }
        Company company = optionalCompany.get();
        Contact contact = contactDto.toContact();
        contact.setCompany(company);
        return contactRepository.save(contact);
    }

    public Contact editContact(AppUser user, Long companyId, Long contactId, ContactDto contactDto) throws AuthenticationException
    {
        if (user == null) throw new AuthenticationException();
        if (List.of(AUTHORITY.OBSERVER).contains(user.getAuthority())){
            throw new AuthenticationException();
        }
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

    public void deleteContact(AppUser user, Long companyId, Long contactId) throws AuthenticationException
    {
        if (user == null) throw new AuthenticationException();
        if (List.of(AUTHORITY.OBSERVER).contains(user.getAuthority())){
            throw new AuthenticationException();
        }
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
