package com.example.backend.repo;

import com.example.backend.model.Company;
import com.example.backend.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long>
{
    List<Contact> findAll();

    List<Contact> deleteContactById(Long id);
}