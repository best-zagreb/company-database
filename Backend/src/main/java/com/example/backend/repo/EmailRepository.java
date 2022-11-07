package com.example.backend.repo;

import com.example.backend.model.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@SuppressWarnings("ALL")
@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {
    List<Email> findByEmailString(String email);

//    @Transactional
//    @Modifying
//    @Query("delete from Email e where e.emailString=:email")
    Long deleteByEmailString(@Param("email") String emailString);

    List<Email> findAll();
}
