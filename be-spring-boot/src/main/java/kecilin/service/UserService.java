package kecilin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kecilin.dto.UserRequestDto;
import kecilin.model.User;
import kecilin.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    public User findOneUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NullPointerException());
    }

    public User findByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException(String.format("User with email '%s' not found", email)));
        return user;
    }

    public User createUser(UserRequestDto request) {
        User user = new User();
        user.setAge(request.getAge());
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(request.getRole());

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    public User updateUser(Long id, UserRequestDto request) {
        User user = userRepository.findById(id).orElseThrow(() -> new NullPointerException());
        user.setAge(request.getAge());
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new NullPointerException());
        userRepository.delete(user);
    }
}
