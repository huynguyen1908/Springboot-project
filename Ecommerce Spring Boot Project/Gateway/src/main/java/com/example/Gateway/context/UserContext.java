package com.example.Gateway.context;


public class UserContext {
    private String username;
    private String userId;
    private String role;

    public UserContext(String username, String userId, String role) {
        this.username = username;
        this.userId = userId;
        this.role = role;
    }

    public String getUsername() { return username; }
    public String getRole() { return role; }
    public String getUserId() { return userId; }
}
