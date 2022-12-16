package com.example.backend.user.controller.dto;

import com.example.backend.user.model.AUTHORITY;
import com.example.backend.user.model.AppUser;

public class UserDTO {
    private String loginEmailString;
    private AUTHORITY authority;
    private String firstName;
    private String lastName;
    private String notificationEmailString;
    private String description;
    private String nickname;

    public UserDTO(String loginEmailString,
                   AUTHORITY authority,
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

    public String getLoginEmailString() {
        return loginEmailString;
    }

    public void setLoginEmailString(String loginEmailString) {
        this.loginEmailString = loginEmailString;
    }

    public AUTHORITY getAuthority() {
        return authority;
    }

    public void setAuthority(AUTHORITY authority) {
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

    public AppUser toUser(){
        return new AppUser(this.loginEmailString,
                this.authority,
                this.firstName,
                this.lastName,
                this.notificationEmailString,
                this.description,
                this.nickname
        );
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
