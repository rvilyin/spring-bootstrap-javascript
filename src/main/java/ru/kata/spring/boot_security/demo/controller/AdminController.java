
package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
	private final UserService userService;

	private final RoleService roleService;

	public AdminController(UserService userService, RoleService roleService) {
		this.userService = userService;
		this.roleService = roleService;
	}

	@GetMapping("")
	public String showAllUsers(Principal principal, Model model) {
		User user = userService.getUserByUsername(principal.getName());
		List<User> allUsers = userService.getAllUsers();
		List<Role> roles = roleService.getAllRoles();
		model.addAttribute("allUsers", allUsers);
		model.addAttribute("currentUser", user);
		model.addAttribute("allRoles", roles);
		model.addAttribute("newUser", new User());

		return "all-users";
	}


	@PostMapping("/saveUser")
	public String saveUser(@ModelAttribute("newUser") User user) {
		userService.saveUser(user);

		return "redirect:/admin";
	}

	@PostMapping("/updateUser")
	public String updateUser(@ModelAttribute("user") User user) {
		userService.updateUser(user);

		return "redirect:/admin";
	}

	@GetMapping("/deleteUser")
	public String deleteUser(@RequestParam("userId") int id) {
		userService.deleteUser(id);

		return "redirect:/admin";
	}
}