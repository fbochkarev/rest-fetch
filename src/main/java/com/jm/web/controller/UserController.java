package com.jm.web.controller;

import com.jm.model.Role;
import com.jm.model.User;
import com.jm.service.RoleService;
import com.jm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping(value = {"/", "/index"})
    public String index() {
        return "/index";
    }

    @GetMapping("/admin/users")
    public String userList(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        model.addAttribute("rolesFromController", roleService.listRoles());
        return "users";
    }

    @GetMapping("/profile")
    public String user(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("user", user);
        return "profile";
    }

    @ModelAttribute("navbarUser")
    public User initializeRoles(@AuthenticationPrincipal User navbarUser) {
        return navbarUser;
    }


    @RequestMapping(value = "login", method = RequestMethod.GET)
    public String loginPage() {
        return "login";
    }
}