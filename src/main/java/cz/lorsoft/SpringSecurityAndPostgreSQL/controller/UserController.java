package cz.lorsoft.SpringSecurityAndPostgreSQL.controller;

import cz.lorsoft.SpringSecurityAndPostgreSQL.dto.UserDTO;
import cz.lorsoft.SpringSecurityAndPostgreSQL.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {


    private UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    public UserDTO addUser(@RequestBody @Valid UserDTO userDTO) {
        System.out.println("controller");
        System.out.println(userDTO.getUserId());
        System.out.println(userDTO.getBirthDate());
        System.out.println(userDTO.getCity());
        System.out.println(userDTO.getPassword());
        System.out.println(userDTO.getEmail());
        System.out.println(userDTO.getName());
        System.out.println(userDTO.isAdmin());

        return userService.create(userDTO);
    }


}
