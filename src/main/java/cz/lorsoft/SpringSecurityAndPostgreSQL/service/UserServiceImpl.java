package cz.lorsoft.SpringSecurityAndPostgreSQL.service;

import cz.lorsoft.SpringSecurityAndPostgreSQL.dto.UserDTO;
import cz.lorsoft.SpringSecurityAndPostgreSQL.entity.repository.UserEntity;
import cz.lorsoft.SpringSecurityAndPostgreSQL.entity.repository.UserRepository;
import cz.lorsoft.SpringSecurityAndPostgreSQL.service.exceptions.DuplicateEmailException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO create(UserDTO model) {
        try {
            UserEntity entity = new UserEntity();
            entity.setEmail(model.getEmail());
            entity.setPassword(passwordEncoder.encode(model.getPassword()));
            entity.setName(model.getName());
            entity.setBirthDate(model.getBirthDate());
            entity.setCity(model.getCity());
            entity.setAdmin(model.isAdmin());
            entity = userRepository.save(entity);

            UserDTO dto = new UserDTO();
            dto.setUserId(entity.getUserId());
            dto.setEmail(entity.getEmail());
            dto.setPassword(entity.getPassword());
            dto.setName(entity.getName());
            dto.setBirthDate(entity.getBirthDate());
            dto.setCity(entity.getCity());
            dto.setAdmin(entity.isAdmin());
            entity = userRepository.save(entity);
            return dto;
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateEmailException();
        }
    }
}
