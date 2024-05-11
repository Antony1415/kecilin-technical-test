package kecilin.service;

import java.util.List;
import java.util.Optional;

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

    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    public User findOneUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NullPointerException());
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUser(UserRequestDto request) {
        User user = new User();
        user.setAge(request.getAge());
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(request.getRole());
        user.setPassword(request.getPassword());

        return userRepository.save(user);
    }

    public User updateUser(Long id, UserRequestDto request) {
        System.out.println("TEST");
        User user = userRepository.findById(id).orElseThrow(() -> new NullPointerException());
        user.setAge(request.getAge());
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        System.out.println("USER: " + user);
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new NullPointerException());
        userRepository.delete(user);
    }
}
