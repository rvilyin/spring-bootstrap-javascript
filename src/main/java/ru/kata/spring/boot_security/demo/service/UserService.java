package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;
import java.util.List;

public interface UserService extends UserDetailsService {
    public List<User> getAllUsers();

    public boolean saveUser(User user);

    public User getUser(int id);

    public void deleteUser(int id);

    public User getUserByUsername(String username);
}
