package com.example.backend.companies.model;

import com.example.backend.companies.controller.dto.CompanyDto;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@NoArgsConstructor
public class Company
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", length = 60, nullable = false)
    private String name;

    @Column(name = "domain", length = 40, nullable = false)
    private String domain;

    @Column(name = "abcCategory")
    private Character abcCategory;

    @Column(name = "budgetPlanningMonth")
    private String budgetPlanningMonth;

    @Column(length = 60, name = "country", nullable = false)
    private String country;

    @Column(name = "townName", nullable = false, length = 120)
    private String townName;

    @Column(name = "address", nullable = false, length = 120)
    private String address;

    @Column(name = "webUrl", length = 60)
    private String webUrl;

    @Column(name = "contactInFuture", nullable = false)
    private boolean contactInFuture;

    @Column(name = "description", length = 480)
    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "company")
    private Set<Contact> contacts;

    public Company(Long id, String name, String domain, Character abcCategory, String budgetPlanningMonth, String country, String townName, String address, String webUrl, boolean contactInFuture, String description) {
        this.id = id;
        this.name = name;
        this.domain = domain;
        this.abcCategory = abcCategory;
        this.budgetPlanningMonth = budgetPlanningMonth;
        this.country = country;
        this.townName = townName;
        this.address = address;
        this.webUrl = webUrl;
        this.contactInFuture = contactInFuture;
        this.description = description;
    }

    public Company(String name, String domain, Character abcCategory, String budgetPlanningMonth, String country, String townName, String address, String webUrl, boolean contactInFuture, String description) {
        this.name = name;
        this.domain = domain;
        this.abcCategory = abcCategory;
        this.budgetPlanningMonth = budgetPlanningMonth;
        this.country = country;
        this.townName = townName;
        this.address = address;
        this.webUrl = webUrl;
        this.contactInFuture = contactInFuture;
        this.description = description;
    }

    public Long getId()
    {
        return id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getDomain()
    {
        return domain;
    }

    public void setDomain(String domain)
    {
        this.domain = domain;
    }

    public Character getAbcCategory()
    {
        return abcCategory;
    }

    public void setAbcCategory(Character abcCategory)
    {
        this.abcCategory = abcCategory;
    }

    public String getBudgetPlanningMonth()
    {
        return budgetPlanningMonth;
    }

    public void setBudgetPlanningMonth(String budgetPlanningMonth)
    {
        this.budgetPlanningMonth = budgetPlanningMonth;
    }

    public String getCountry()
    {
        return country;
    }

    public void setCountry(String country)
    {
        this.country = country;
    }

    public String getTownName()
    {
        return townName;
    }

    public void setTownName(String townName)
    {
        this.townName = townName;
    }

    public String getAddress()
    {
        return address;
    }

    public void setAddress(String address)
    {
        this.address = address;
    }

    public String getWebUrl()
    {
        return webUrl;
    }

    public void setWebUrl(String webUrl)
    {
        this.webUrl = webUrl;
    }

    public boolean shouldContactInFuture()
    {
        return contactInFuture;
    }

    public void setContactInFuture(boolean contactInFuture)
    {
        this.contactInFuture = contactInFuture;
    }
    public Set<Contact> getContacts(){
        return this.contacts;
    }

    public void updateWith(CompanyDto companyDto){
        name = companyDto.getName();
        address = companyDto.getAddress();
        domain = companyDto.getDomain();
        country = companyDto.getCountry();
        abcCategory = companyDto.getAbcCategory();
        budgetPlanningMonth = companyDto.getBudgetPlanningMonth();
        townName = companyDto.getTownName();
        webUrl = companyDto.getWebUrl();
        contactInFuture = companyDto.isContactInFuture();
        description = companyDto.getDescription();
    }
}
