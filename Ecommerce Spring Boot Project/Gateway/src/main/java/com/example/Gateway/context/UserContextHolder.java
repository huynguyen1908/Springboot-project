package com.example.Gateway.context;

import org.springframework.web.server.ServerWebExchange;

public class UserContextHolder {
    private static final String USER_CONTEXT_KEY = "USER_CONTEXT";

    public static void setUserContext(ServerWebExchange exchange, UserContext userContext) {
        exchange.getAttributes().put(USER_CONTEXT_KEY, userContext);
    }

    public static UserContext getUserContext(ServerWebExchange exchange) {
        return (UserContext) exchange.getAttribute(USER_CONTEXT_KEY);
    }
}