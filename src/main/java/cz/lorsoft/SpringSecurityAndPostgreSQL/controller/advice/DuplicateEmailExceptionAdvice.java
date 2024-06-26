package cz.lorsoft.SpringSecurityAndPostgreSQL.controller.advice;

import cz.lorsoft.SpringSecurityAndPostgreSQL.service.exceptions.DuplicateEmailException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class DuplicateEmailExceptionAdvice {
    @ExceptionHandler({DuplicateEmailException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void handleEntityNotFoundException(){
        System.out.println("Došlo k pokusu uložit do databáze uživatele s již obsazeným emailem...");
    }
}
