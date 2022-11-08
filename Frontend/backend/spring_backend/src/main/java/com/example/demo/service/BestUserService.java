package com.example.demo.service;

import com.example.demo.entity.BestUser;

import java.util.List;
import java.util.Optional;

public interface BestUserService {
    List<BestUser> findAllBestUser();
    Optional<BestUser> findById(Long id);
    BestUser saveBestUser(BestUser bestUser);
    BestUser updateBestUser(BestUser bestUser);
    void deleteBestUser(Long id);
}
