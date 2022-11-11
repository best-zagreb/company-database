package com.example.backend.service;


import com.example.backend.controller.dto.UserDTO;
import com.example.backend.model.AppUser;
import com.example.backend.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<AppUser> findByEmail(String email){
        return userRepository.findByLoginEmailString(email);
    }

    public AppUser addEmail(UserDTO userDTO){
        return userRepository.save(userDTO.toUser());
    }

    public Long deleteEmail(String email){
        return userRepository.deleteByLoginEmailString(email);
    }

    public List<AppUser> findAll(){
        return userRepository.findAll();
    }

    public boolean existsAny() {
        long i = userRepository.count();
        return i > 0;
    }
}
