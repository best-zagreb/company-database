package com.example.backend.user.controller;

import com.example.backend.user.controller.dto.UserDTO;
import com.example.backend.user.model.AppUser;
import com.example.backend.user.service.UserService;
import com.example.backend.util.JwtVerifier;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping()
    @ResponseBody
    public ResponseEntity addUser(@RequestHeader String googleTokenEncoded, @RequestBody UserDTO userDTO) {
        AppUser user = getUser(googleTokenEncoded);
        try {
            return new ResponseEntity<>(userService.addUser(userDTO, user), HttpStatus.CREATED);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity findUser(@RequestHeader String googleTokenEncoded, @PathVariable Long id){
        AppUser user = getUser(googleTokenEncoded);
        try {
            Optional<AppUser> requestedUser  = userService.findById(id, user);
            if (requestedUser.isPresent()) return new ResponseEntity(userService.findById(id, user), HttpStatus.FOUND);
            else return new ResponseEntity(HttpStatus.NOT_FOUND);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity deleteUser(@RequestHeader String googleTokenEncoded, @PathVariable Long id){
        AppUser user = getUser(googleTokenEncoded);
        try {
            userService.deleteUser(id, user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping()
    @ResponseBody
    public ResponseEntity findAll(@RequestHeader String googleTokenEncoded){
        AppUser user = getUser(googleTokenEncoded);
        try {
            return new ResponseEntity(userService.findAll(user), HttpStatus.FOUND);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity updateUser(@RequestHeader String googleTokenEncoded, @RequestBody UserDTO userDTO, @PathVariable Long id){
        AppUser user = getUser(googleTokenEncoded);
        try {
            return new ResponseEntity<>(userService.updateUser(userDTO, id, user), HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity getByEmail(@RequestHeader String googleTokenEncoded){
        String email = JwtVerifier.verifyAndReturnEmail(googleTokenEncoded);
        if (!userService.existsByEmail(email)) return new ResponseEntity(HttpStatus.NOT_FOUND);

        return new ResponseEntity(userService.findByEmail(email), HttpStatus.OK);
    }

    private AppUser getUser(String googleTokenEncoded){
        String email = JwtVerifier.verifyAndReturnEmail(googleTokenEncoded);
        if (email == null)
            return null;
        return userService.findByEmail(email);
    }
}
