package cz.lorsoft.SpringSecurityAndPostgreSQL.service;

import cz.lorsoft.SpringSecurityAndPostgreSQL.dto.UserDTO;
import cz.lorsoft.SpringSecurityAndPostgreSQL.entity.repository.UserEntity;
import cz.lorsoft.SpringSecurityAndPostgreSQL.entity.repository.UserRepository;
import cz.lorsoft.SpringSecurityAndPostgreSQL.service.exceptions.DuplicateEmailException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void create(UserDTO userDTO) {
        try {
            final UserEntity userEntity = new UserEntity();
            final UserEntity filledEntity = fillEntity(userEntity, userDTO);
            filledEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            userRepository.save(filledEntity);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateEmailException();
        }
    }

    @Override
    public UserDTO getUser(long userId) {
            final UserEntity fetchedPerson = userRepository.getById(userId); // Exception will catch DuplicateEmailExceptionAdvice...
            return fillDTO(fetchedPerson);
    }

    @Override
    public List<UserDTO> getUsers() {
        final List<UserEntity> fetchedPersons = userRepository.findAll();
        List<UserDTO> persons = new ArrayList<>();
        for (UserEntity oneEntity: fetchedPersons) {
            persons.add(fillDTO(oneEntity));
        }
        return persons;
    }

    @Override
    public void update(UserDTO userDTO) {
        final UserEntity fetchedUser = userRepository.getById(userDTO.getUserId()); // Exception will catch DuplicateEmailExceptionAdvice...
        final UserEntity updatedEntity = fillEntity(fetchedUser, userDTO);
        updatedEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(updatedEntity);
    }

    @Override
    public void delete(long userId) {
        userRepository.deleteById(userId); // We don't need to catch Expection here, because if the entity isn't found it is silently ignored...
    }


    // region: Private methods

    /**
     * Mapping data from userDTO to userEntity wthout userId and password
     *
     * @param userEntity target for mapping data from userDTO
     * @param userDTO dto for mapping to userEntity
     * @return filled userEntity
     */
    private UserEntity fillEntity(UserEntity userEntity, UserDTO userDTO) {
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setName(userDTO.getName());
        userEntity.setBirthDate(userDTO.getBirthDate());
        userEntity.setCity(userDTO.getCity());
        userEntity.setAdmin(userDTO.isAdmin());
        return userEntity;
    }

    /**
     * Mapping data to newDTO from userEntity
     *
     * @param userEntity entity for mapping to new UserDTO
     * @return new instance of UserDTO fill by data of userEntity
     */
    private UserDTO fillDTO(UserEntity userEntity) {
        UserDTO newPerson = new UserDTO();
        newPerson.setUserId(userEntity.getUserId());
        newPerson.setPassword(userEntity.getPassword());
        newPerson.setEmail(userEntity.getEmail());
        newPerson.setName(userEntity.getName());
        newPerson.setCity(userEntity.getCity());
        newPerson.setBirthDate(userEntity.getBirthDate());
        newPerson.setAdmin(userEntity.isAdmin());
        return newPerson;
    }

    // endregion
}
