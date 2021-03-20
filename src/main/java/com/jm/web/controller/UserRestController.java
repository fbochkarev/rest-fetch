package com.jm.web.controller;

import com.jm.model.User;
import com.jm.service.RoleService;
import com.jm.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class UserRestController {
    private final Logger LOG = LoggerFactory.getLogger(UserRestController.class);

    @Autowired
    UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping(value = "/admin/rest/users")
    public ResponseEntity<List<User>> read() {
        final List<User> users = userService.listUsers();

        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/admin/rest/user/{id}")
    public ResponseEntity<User> read(@PathVariable(name = "id") int id) {
        final User user = userService.getUserById(id);

        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/admin/rest/user/", method = RequestMethod.POST)
    public ResponseEntity<Void> create(@RequestBody User user, UriComponentsBuilder ucBuilder) {
        LOG.info("Creating user: {}", user);

/*        if (userService.exists(user)) {
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }*/

        userService.add(user);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/admin/users").buildAndExpand(user.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/rest/user/", method = RequestMethod.PUT)
    public ResponseEntity<User> update(@RequestBody User user) {
        LOG.info("Updating user: {}", user);
/*        User currentUser = userService.getUserById(id);

        if (currentUser == null) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }*/

/*        currentUser.setId(user.getId());
        currentUser.setName(user.getName());*/

        userService.add(user);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

/*    @DeleteMapping("admin/rest/user/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.removeUser(id);
    }*/

    @RequestMapping(value = "/admin/rest/user/", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@RequestBody User user) {
        long id = user.getId();
        LOG.info("Deleting user with id: {}", id);
        User deleteUser = userService.getUserById(id);

        if (deleteUser == null) {
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }

        userService.removeUser(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
