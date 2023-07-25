package com.example.backend.util.exceptions;

public class UserNotFoundException extends Throwable {
    public UserNotFoundException() {
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
