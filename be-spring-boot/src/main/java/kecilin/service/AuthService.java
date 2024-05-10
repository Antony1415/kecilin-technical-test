package kecilin.service;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kecilin.dto.LoginRequestDto;
import kecilin.dto.UserRequestDto;
import kecilin.model.User;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("AUTH SERVICE: " + email);
        UserDetails user = userService.findByEmail(email);
        return user;
    }

    public User register(UserRequestDto user) {
        User userExists = userService.findByEmail(user.getEmail());
        if (userExists != null) {
            throw new UsernameNotFoundException(String.format("User with email '%s' already exists", user.getEmail()));
        }

        return userService.createUser(user);
    }

    public UserDetails login(LoginRequestDto request) throws Exception {
        UserDetails user = loadUserByUsername(request.getEmail());
        if (!request.getPassword().equals(user.getPassword())) {
            throw new BadRequestException("Wrong Password, Please Try Again!");
        }
        // if (!bCryptPasswordEncoder.matches(request.getPassword(),
        // user.getPassword())) {
        // throw new BadRequestException("Wrong Password, Please Try Again!");
        // }
        return user;
    }
}
