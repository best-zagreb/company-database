package com.example.backend.controller;

import com.example.backend.controller.dto.UserDTO;
import com.example.backend.controller.dto.OnlyEmailDTO;
import com.example.backend.model.AppUser;
import com.example.backend.service.UserService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add-user")
    @ResponseBody
    @Secured("ROLE_ADMIN")
    public AppUser addEmail(@RequestBody UserDTO userDTO){
        return userService.addUser(userDTO);
    }

    @GetMapping("/get-user")
    @ResponseBody
    public List<AppUser> findEmail(@RequestBody String email){
        return userService.findByEmail(email);
    }

    @DeleteMapping("/delete-user")
    @ResponseBody
    @Secured("ROLE_ADMIN")
    public Long deleteEmail(@RequestBody OnlyEmailDTO email){
        return userService.deleteUser(email.getEmail());
    }

    @GetMapping("/get-users")
    @ResponseBody
    @Secured("ROLE_ADMIN")
    public List<AppUser> findAll(){
        return userService.findAll();
    }

    @GetMapping("/exists-any")
    public boolean existsAny(){
        return userService.existsAny();
    }

    @PutMapping("/update-user")
    public AppUser updateUser(@RequestBody UserDTO userDTO){
        userService.deleteUser(userDTO.getLoginEmailString());
        return userService.addUser(userDTO);
    }
}
