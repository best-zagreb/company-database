package com.example.backend.collaborations.service;

import com.example.backend.collaborations.model.Collaboration;
import com.example.backend.collaborations.repo.CollaborationsRepository;
import com.example.backend.companies.repo.CompanyRepository;
import com.example.backend.project.repo.ProjectRepository;
import com.example.backend.user.repo.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CollaborationsService {
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final ProjectRepository projectRepository;
    private final CollaborationsRepository collaborationsRepository;


    public List<Collaboration> getCollaborationsForCompany(Long id) {
        return collaborationsRepository.findAllByCollaborationId_Company(companyRepository.findById(id).get());
    }
}
