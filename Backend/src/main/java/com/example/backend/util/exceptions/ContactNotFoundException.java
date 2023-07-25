package com.example.backend.util.exceptions;

public class ContactNotFoundException extends Throwable {
    public ContactNotFoundException() {
    }

    public ContactNotFoundException(String message) {
        super(message);
    }
}
