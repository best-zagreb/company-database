package com.example.backend.util.exceptions;

public class CollaborationNotFoundException extends Throwable {
    public CollaborationNotFoundException() {
    }

    public CollaborationNotFoundException(String message) {
        super(message);
    }
}
