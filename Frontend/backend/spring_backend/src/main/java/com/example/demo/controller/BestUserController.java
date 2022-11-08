package com.example.demo.controller;

import com.example.demo.entity.BestUser;
import com.example.demo.service.BestUserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins ="*",maxAge = 4800,allowCredentials = "false")
@RestController
@RequestMapping("/bestUser")
public class BestUserController {
    private final BestUserService bestUserService;

    public BestUserController(BestUserService bestUserService) {
        this.bestUserService = bestUserService;
    }

    @GetMapping
    public List<BestUser> findAllBestUser() {
        return bestUserService.findAllBestUser();
    }
    @GetMapping("/{id}")
    public Optional<BestUser> findBestUserById (@PathVariable("id") Long id) {
        return bestUserService.findById(id);
    }
    @PostMapping
    public BestUser saveBestUser(@RequestBody BestUser bestUser) {
        return bestUserService.saveBestUser(bestUser);
    }
    @PutMapping
    public BestUser updateBestUser(@RequestBody BestUser bestUser) {
        return bestUserService.updateBestUser(bestUser);
    }
    @DeleteMapping("/{id}")
    public void deleteBestUser(@PathVariable("id") Long id) {
        bestUserService.deleteBestUser(id);
    }
}
