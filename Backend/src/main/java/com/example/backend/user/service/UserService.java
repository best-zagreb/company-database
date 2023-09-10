package com.example.backend.user.service;


import com.example.backend.project.model.Project;
import com.example.backend.user.controller.dto.UserDTO;
import com.example.backend.user.model.AUTHORITY;
import com.example.backend.user.model.AppUser;
import com.example.backend.user.repo.UserRepository;
import com.example.backend.util.exceptions.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.HashSet;
import javax.naming.AuthenticationException;
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
        if (user == null) throw new AuthenticationException("You do not have permission to access CDB.");
        if (!List.of(AUTHORITY.ADMINISTRATOR).contains(user.getAuthority())) throw new AuthenticationException("You do not have permission to execute this command.");

        return userRepository.save(userDTO.toAppUser());
    }

    public void deleteUser(Long id, AppUser user) throws AuthenticationException {
        if (user == null) throw new AuthenticationException("You do not have permission to access CDB.");
        if (!List.of(AUTHORITY.ADMINISTRATOR).contains(user.getAuthority())) throw new AuthenticationException("You do not have permission to execute this command.");

        userRepository.deleteById(id);
    }

    public List<AppUser> findAll(AppUser user) throws AuthenticationException {
        if (user == null) throw new AuthenticationException("You do not have permission to access CDB.");

        return userRepository.findAll();
    }

    public boolean existsAny() {
        long i = userRepository.count();
        return i > 0;
    }

    public AppUser findById(Long id, AppUser user) throws AuthenticationException, EntityNotFoundException {
        if (user == null) throw new AuthenticationException("You do not have permission to access CDB.");
        Optional<AppUser> appUserOpt = userRepository.findById(id);
        if (appUserOpt.isPresent()) return appUserOpt.get();
        else throw new EntityNotFoundException("User under id " + id + "not found.");
    }

    public Boolean softLockUser(Long id) throws EntityNotFoundException
    {
        AppUser user = getValue(userRepository.findById(id));
        boolean newSoftLock = user.getSoftLock() == null || !user.getSoftLock();
        user.setSoftLock(newSoftLock);
        userRepository.save(user);
        return newSoftLock;
    }

    public AppUser updateUser(UserDTO userDTO, Long id, AppUser user) throws AuthenticationException, EntityNotFoundException {
        if (user == null) throw new AuthenticationException("You do not have permission to access CDB.");
        if (!List.of(AUTHORITY.ADMINISTRATOR).contains(user.getAuthority())) throw new AuthenticationException("You do not have permission to execute this command.");

        AppUser appUser;
        if (userRepository.findById(id).isPresent()) appUser = userRepository.findById(id).get();
        else throw new EntityNotFoundException("User under id " + id + " not found.");

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
