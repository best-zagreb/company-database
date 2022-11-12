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

    public AppUser addUser(UserDTO userDTO){
        return userRepository.save(userDTO.toUser());
    }

    public Long deleteUser(String email){
        return userRepository.deleteByLoginEmailString(email);
    }

    public List<AppUser> findAll(){
        return userRepository.findAll();
    }

    public boolean existsAny() {
        long i = userRepository.count();
        return i > 0;
    }

    public AppUser updateUser(UserDTO userDTO, Long id){
        AppUser appUser = userRepository.findById(id).get();

        appUser.setLoginEmailString(userDTO.getLoginEmailString());
        appUser.setAuthority(userDTO.getAuthority());
        appUser.setFirstName(userDTO.getFirstName());
        appUser.setLastName(userDTO.getLastName());
        appUser.setNotificationEmailString(userDTO.getNotificationEmailString());
        appUser.setDescription(userDTO.getDescription());
        appUser.setNickname(userDTO.getNickname());

        return userRepository.save(appUser);
    }
}
