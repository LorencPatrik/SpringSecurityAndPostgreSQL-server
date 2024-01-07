package cz.lorsoft.SpringSecurityAndPostgreSQL.controller;

import cz.lorsoft.SpringSecurityAndPostgreSQL.dto.UserDTO;
import cz.lorsoft.SpringSecurityAndPostgreSQL.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    public void addUser(@RequestBody @Valid UserDTO userDTO) {
        System.out.println("controller Post - new user");
        userService.create(userDTO);
    }

    @GetMapping("/user/{userId}")
    public UserDTO getUser(@PathVariable Long userId) {
        System.out.println("controller Get - one user");
        UserDTO user = userService.getUser(userId);
        System.out.println(user);
        return user;
    }

    @GetMapping("/user")
    public List<UserDTO> getUsers() {
        System.out.println("controller Get - users");
        List<UserDTO> users = userService.getUsers();
        System.out.println(users);
        return users;
    }

    @PutMapping("/user")
    public void updateUser(@RequestBody @Valid UserDTO userDTO) {
        System.out.println("controller Put - user");
        userService.update(userDTO);
    }

    @DeleteMapping("/user/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        System.out.println("controller Delete - user");
        userService.delete(userId);
    }
}
