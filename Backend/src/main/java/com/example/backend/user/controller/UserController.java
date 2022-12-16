package com.example.backend.user.controller;

import com.example.backend.user.controller.dto.UserDTO;
import com.example.backend.user.model.AUTHORITY;
import com.example.backend.user.model.AppUser;
import com.example.backend.user.service.UserService;
import com.example.backend.util.JwtVerifier;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

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
    public ResponseEntity addUser(@RequestHeader("googleToken") String googleTokenEncoded, @RequestBody UserDTO userDTO) {
        AUTHORITY[] authority = {};
        String email = JwtVerifier.verifyAndReturnEmail(googleTokenEncoded);
        if (email == null)
            return new ResponseEntity("Token is missing or invalid", HttpStatus.UNAUTHORIZED);
        if (userService.findByEmail(email) == null)
            return new ResponseEntity("You don't have access to CDB", HttpStatus.UNAUTHORIZED);


        return new ResponseEntity(userService.addUser(userDTO), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<AppUser> findUser(@RequestHeader("googleToken") String googleTokenEncoded, @RequestParam Long id){
        return new ResponseEntity(userService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public void deleteUser(@RequestHeader("googleToken") String googleTokenEncoded, @PathVariable Long id){
        userService.deleteUser(id);
    }

    @GetMapping()
    @ResponseBody
    public ResponseEntity<AppUser> findAll(){
        return new ResponseEntity(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/exists-any")
    public boolean existsAny(){
        return userService.existsAny();
    }

    @PutMapping("/{id}")
    public ResponseEntity updateUser(@RequestHeader("googleToken") String googleTokenEncoded, @RequestBody UserDTO userDTO, @PathVariable Long id){
        List<AUTHORITY> a = new LinkedList<>(List.of(AUTHORITY.ADMIN));
        String email = JwtVerifier.verifyAndReturnEmail(googleTokenEncoded);
        if (email == null)
            return new ResponseEntity("Token is missing or invalid", HttpStatus.UNAUTHORIZED);
        if (userService.findByEmail(email) == null)
            return new ResponseEntity("You don't have access to CDB", HttpStatus.UNAUTHORIZED);
        if (!a.contains(userService.findByEmail(email).getAuthority()))
            return new ResponseEntity("You don't have premission to this resource", HttpStatus.UNAUTHORIZED);

        return new ResponseEntity(userService.updateUser(userDTO, id), HttpStatus.OK);
    }
}
