package cz.lorsoft.SpringSecurityAndPostgreSQL.service;

import cz.lorsoft.SpringSecurityAndPostgreSQL.dto.UserDTO;

public interface UserService {
    UserDTO create(UserDTO model);
}
