package com.example.backend.service;


import com.example.backend.controller.dto.EmailDTO;
import com.example.backend.model.Email;
import com.example.backend.repo.EmailRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service @Transactional
public class EmailService {

    private final EmailRepository emailRepository;

    public EmailService(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }

    public List<Email> findByEmail(String email){
        return emailRepository.findByEmailString(email);
    }

    public Email addEmail(EmailDTO emailDTO){
        return emailRepository.save(emailDTO.toEmail());
    }

    public Long deleteEmail(String email){
        return emailRepository.deleteByEmailString(email);
    }

    public List<Email> findAll(){
        return emailRepository.findAll();
    }
}
