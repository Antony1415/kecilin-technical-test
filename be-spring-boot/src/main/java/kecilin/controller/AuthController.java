package kecilin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import kecilin.dto.LoginRequestDto;
import kecilin.dto.UserRequestDto;
import kecilin.model.User;
import kecilin.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserRequestDto request) {
        try {
            User user = authService.register(request);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserDetails> login(@RequestBody LoginRequestDto request, HttpServletResponse response) {
        try {
            UserDetails user = authService.login(request);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
