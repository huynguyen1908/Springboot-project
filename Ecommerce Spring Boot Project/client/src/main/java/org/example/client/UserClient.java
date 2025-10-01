package org.example.client;

import org.example.dto.response.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "user-service")
public interface UserClient {

    @GetMapping("/api/user/{userId}/exists")
    boolean checkUserExists(@PathVariable("userId") String userId);

    @GetMapping("/api/users")
    List<UserDTO> getUserList();

    @GetMapping("/api/user/{username}")
    UserDTO getUserByUsername(@PathVariable("username") String username);

    @GetMapping("/api/user/get-username/{userId}")
    String getUsernameByUserId(@PathVariable("userId") String userId);
}
