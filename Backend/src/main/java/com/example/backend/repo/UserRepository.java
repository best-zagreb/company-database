package com.example.backend.repo;

import com.example.backend.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@SuppressWarnings("ALL")
@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    List<AppUser> findByLoginEmailString(String email);

//    @Transactional
//    @Modifying
//    @Query("delete from Email e where e.emailString=:email")
    Long deleteByLoginEmailString(@Param("email") String emailString);

    List<AppUser> findAll();
}
