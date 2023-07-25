package com.example.backend.util.exceptions;

public class ProjectNotFoundException extends Throwable {
    public ProjectNotFoundException() {
    }

    public ProjectNotFoundException(String message) {
        super(message);
    }
}
