package cz.lorsoft.SpringSecurityAndPostgreSQL.dto;

import jakarta.validation.constraints.*;

import java.util.Date;

public class UserDTO {
    private long userId;
    @NotBlank(message = "Vyplňte uživatelské jméno")
    @NotNull(message = "Vyplňte uživatelské jméno")
    private String name;
    @Email
    private String email;
    @NotBlank(message = "Vyplňte uživatelské heslo")
    @NotNull(message = "Vyplňte uživatelské heslo")
    @Size(min = 4, message = "Heslo musí mít alespoň 4. znaky")
    private String password;
    @NotBlank(message = "Zadejte město kde máte trvalý pobyt")
    @NotNull(message = "Zadejte město kde máte trvalý pobyt")
    private String city;
    @Past
    @NotNull (message = "Zadejte datum narození")
    private Date birthDate;
    private boolean admin = false;

    public UserDTO(long userId, String name, String email, String password, String city, Date birthDate, boolean admin) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.city = city;
        this.birthDate = birthDate;
        this.admin = admin;
    }

    public UserDTO() {
    }

    @Override
    public String toString() {
        return String.format("%n%s, %s, %s, %s, %s, %s", userId, name, email, city, birthDate, admin);
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
}
