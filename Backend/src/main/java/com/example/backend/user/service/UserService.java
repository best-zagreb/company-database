package com.example.backend.user.service;


import com.example.backend.user.controller.dto.UserDTO;
import com.example.backend.user.model.AppUser;
import com.example.backend.user.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service @Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AppUser findByEmail(String email){
        return userRepository.findByLoginEmailString(email).get(0);
    }

    public AppUser addUser(UserDTO userDTO){
        AppUser appUser = new AppUser(
                userDTO.getLoginEmailString(),
                userDTO.getAuthority(),
                userDTO.getFirstName(),
                userDTO.getLastName(),
                userDTO.getNotificationEmailString(),
                userDTO.getDescription(),
                userDTO.getNickname(),
                new HashSet<>()
        );
        return userRepository.save(appUser);
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public List<AppUser> findAll(){
        return userRepository.findAll();
    }

    public boolean existsAny() {
        long i = userRepository.count();
        return i > 0;
    }

    public Optional<AppUser> findById(Long id){
        return userRepository.findById(id);
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
