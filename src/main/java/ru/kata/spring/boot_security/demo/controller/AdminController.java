
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
	public String showAllUsers(Model model) {
		List<User> allUsers = userService.getAllUsers();
		model.addAttribute("allUsers", allUsers);

		return "all-users";
	}

	@GetMapping("/addNewUser")
	public String addNewUser(Model model) {
		User user = new User();
		List<Role> roles = roleService.getAllRoles();
		model.addAttribute("user", user);
		model.addAttribute("allRoles", roles);

		return "user-info";
	}

	@PostMapping("/saveUser")
	public String saveUser(@Valid @ModelAttribute("user") User user, BindingResult bindingResult, Model model) {
		if (bindingResult.hasErrors()) {
			List<Role> roles = roleService.getAllRoles();
			model.addAttribute("allRoles", roles);
			return "user-info";
		}

		if (userService.saveUser(user)) {
			return "redirect:/admin";
		}
		return "username-exists-error";
	}

	@GetMapping("/updateInfo")
	public String updateUser(@RequestParam("userId") int id, Model model) {
		User user = userService.getUser(id);
		List<Role> roles = roleService.getAllRoles();
		model.addAttribute("user", user);
		model.addAttribute("allRoles", roles);

		return "user-info";
	}

	@GetMapping("/deleteUser")
	public String deleteUser(@RequestParam("userId") int id) {
		userService.deleteUser(id);

		return "redirect:/admin";
	}
}