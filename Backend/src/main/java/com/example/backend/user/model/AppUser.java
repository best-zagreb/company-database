package com.example.backend.user.model;

import com.example.backend.project.model.Project;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@SuppressWarnings("ALL")
@Entity
@NoArgsConstructor
@Getter @Setter
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "loginmailstring", unique = true, nullable = false, length = 60)
    private String loginEmailString;

    @Column(nullable = false)
    private AUTHORITY authority;

    @Column(name = "firstname", nullable = false, length = 40)
    private String firstName;

    @Column(name = "lastname", nullable = false, length = 40)
    private String lastName;

    @Column(name = "notificationemailstring", nullable = false, length = 60)
    private String notificationEmailString;

    @Column(length = 480)
    private String description;

    @Column(length = 40, unique = true)
    private String nickname;

    @ManyToMany(mappedBy = "frteammembers")
    private Set<Project> projects;

    public AppUser(String loginEmailString,
                   AUTHORITY authority,
                   String firstName,
                   String lastName,
                   String notificationEmailString,
                   String description,
                   String nickname,
                   Set<Project> projects) {
        this.loginEmailString = loginEmailString;
        this.authority = authority;
        this.firstName = firstName;
        this.lastName = lastName;
        this.notificationEmailString = notificationEmailString;
        this.description = description;
        this.nickname = nickname;
        this.projects = projects;
    }
}
