package cz.lorsoft.SpringSecurityAndPostgreSQL.controller.advice;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
@ControllerAdvice
public class EntityNotFoundExceptionAdvice {
    @ExceptionHandler({EntityNotFoundException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void handleEntityNotFoundException() {
        System.out.println("Došlo k chybnému hledání uživatele s neplatným id...");
    }
}
