package com.example.demo.repository;

import com.example.demo.entity.BestUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BestUserRepo extends JpaRepository<BestUser,Long> {
}
