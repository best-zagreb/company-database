package com.example.demo.service.impl;

import com.example.demo.entity.BestUser;
import com.example.demo.repository.BestUserRepo;
import com.example.demo.service.BestUserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BestUserServiceImpl implements BestUserService {
    private final BestUserRepo bestUserRepo;

    public BestUserServiceImpl(BestUserRepo bestUserRepo ){
        this.bestUserRepo = bestUserRepo;

    }

    @Override
    public List<BestUser> findAllBestUser() {
        return bestUserRepo.findAll();
    }

    @Override
    public Optional<BestUser> findById(Long id) {
        return bestUserRepo.findById(id);
    }

    @Override
    public BestUser saveBestUser(BestUser bestUser) {
        return bestUserRepo.save(bestUser);
    }

    @Override
    public BestUser updateBestUser(BestUser bestUser) {
        return bestUserRepo.save(bestUser);
    }

    @Override
    public void deleteBestUser(Long id) {
            bestUserRepo.deleteById(id);
    }
}
