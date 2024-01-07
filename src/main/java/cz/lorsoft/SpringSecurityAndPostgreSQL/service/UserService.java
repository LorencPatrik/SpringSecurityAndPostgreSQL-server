package cz.lorsoft.SpringSecurityAndPostgreSQL.service;

import cz.lorsoft.SpringSecurityAndPostgreSQL.dto.UserDTO;

import java.util.List;

public interface UserService {
    void create(UserDTO userDTO);
    UserDTO getUser(long userId);
    List<UserDTO> getUsers();
    void update(UserDTO userDTO);
    void delete(long userId);
}
