package com.example.backend.controller;

import com.example.backend.controller.dto.EmailDTO;
import com.example.backend.controller.dto.OnlyEmailDTO;
import com.example.backend.model.Email;
import com.example.backend.service.EmailService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/email")
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/add-email")
    @ResponseBody
    public Email addEmail(@RequestBody EmailDTO emailDTO){
        return emailService.addEmail(emailDTO);
    }

    @GetMapping("/get-email")
    @ResponseBody
    public List<Email> findEmail(@RequestBody String email){
        return emailService.findByEmail(email);
    }

    @DeleteMapping("/delete-email")
    @ResponseBody
    public Long deleteEmail(@RequestBody OnlyEmailDTO email){
        return emailService.deleteEmail(email.getEmail());
    }

    @GetMapping("/get-all")
    @ResponseBody
    public List<Email> findAll(){
        return emailService.findAll();
    }
}
