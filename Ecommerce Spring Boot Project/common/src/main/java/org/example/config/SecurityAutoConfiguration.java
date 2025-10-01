//package org.example.config;
//
//import org.example.filter.JwtAuthenticationFilter;
//import org.example.util.JwtUtil;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.core.userdetails.UserDetailsService;
//
//@Configuration
//public class SecurityAutoConfiguration {
//    @Bean
//    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtUtil jwtUtil,
//                                                           UserDetailsService userDetailsService) {
//        return new JwtAuthenticationFilter(jwtUtil, userDetailsService);
//    }
//}
