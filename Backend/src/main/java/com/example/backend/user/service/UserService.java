package com.example.backend.user.service;


import com.example.backend.user.controller.dto.UserDTO;
import com.example.backend.user.model.AUTHORITY;
import com.example.backend.user.model.AppUser;
import com.example.backend.user.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
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
        if (userRepository.findByLoginEmail(email).isEmpty()) return null;
        else return userRepository.findByLoginEmail(email).get(0);
    }

    public AppUser addUser(UserDTO userDTO, AppUser user) throws AuthenticationException {
        if (user == null) throw new AuthenticationException();
        if (!List.of(AUTHORITY.ADMINISTRATOR).contains(user.getAuthority())) throw new AuthenticationException();

        return userRepository.save(userDTO.toAppUser());
    }

    public void deleteUser(Long id, AppUser user) throws AuthenticationException {
        if (user == null) throw new AuthenticationException();
        if (!List.of(AUTHORITY.ADMINISTRATOR).contains(user.getAuthority())) throw new AuthenticationException();

        userRepository.deleteById(id);
    }

    public List<AppUser> findAll(AppUser user) throws AuthenticationException {
        if (user == null) throw new AuthenticationException();

        return userRepository.findAll();
    }

    public boolean existsAny() {
        long i = userRepository.count();
        return i > 0;
    }

    public Optional<AppUser> findById(Long id, AppUser user) throws AuthenticationException {
        if (user == null) throw new AuthenticationException();

        return userRepository.findById(id);
    }

    public AppUser updateUser(UserDTO userDTO, Long id, AppUser user) throws AuthenticationException {
        if (user == null) throw new AuthenticationException();
        if (!List.of(AUTHORITY.ADMINISTRATOR).contains(user.getAuthority())) throw new AuthenticationException();

        AppUser appUser = userRepository.findById(id).get();

        appUser.setLoginEmail(userDTO.getLoginEmail());
        appUser.setAuthority(userDTO.getAuthority());
        appUser.setFirstName(userDTO.getFirstName());
        appUser.setLastName(userDTO.getLastName());
        appUser.setNotificationEmail(userDTO.getNotificationEmail());
        appUser.setDescription(userDTO.getDescription());
        appUser.setNickname(userDTO.getNickname());

        return userRepository.save(appUser);
    }

    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    public boolean existsByEmail(String email) {
        return !userRepository.findByLoginEmail(email).isEmpty();
    }
}
