package com.example.backend.model;

import javax.persistence.*;

@SuppressWarnings("ALL")
@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "loginmailstring", nullable = false, length = 60)
    private String loginEmailString;

    @Column(nullable = false)
    private String authority;

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

    public AppUser() {
    }

    public AppUser(String loginEmailString,
                   String authority,
                   String firstName,
                   String lastName,
                   String notificationEmailString,
                   String description,
                   String nickname) {
        this.loginEmailString = loginEmailString;
        this.authority = authority;
        this.firstName = firstName;
        this.lastName = lastName;
        this.notificationEmailString = notificationEmailString;
        this.description = description;
        this.nickname = nickname;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLoginEmailString() {
        return loginEmailString;
    }

    public void setLoginEmailString(String loginEmailString) {
        this.loginEmailString = loginEmailString;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNotificationEmailString() {
        return notificationEmailString;
    }

    public void setNotificationEmailString(String notificationEmailString) {
        this.notificationEmailString = notificationEmailString;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
