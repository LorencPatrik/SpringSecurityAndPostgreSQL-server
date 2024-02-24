package cz.lorsoft.SpringSecurityAndPostgreSQL.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<UserEntity, Long> {
//    Optional<UserEntity> findByEmail(String username);
}
