package com.example.backend.util.exceptions;

public class CompanyNotFoundException extends Throwable {
    public CompanyNotFoundException() {
    }

    public CompanyNotFoundException(String message) {
        super(message);
    }
}
