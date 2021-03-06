package com.jm.dao;

import com.jm.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void add(User user) {
        if (user.getPassword() != null) {
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        }
        em.merge(user);
    }

    @Override
    public void removeUser(long id) {
        User user = em.find(User.class, id);
        em.remove(user);
    }

    @Override
    public User getUserById(long id) {
        return em.find(User.class, id);
    }

    @Override
    public List<User> listUsers() {
        return em.createQuery("from User").getResultList();
    }

    @Override
    public User getUserByName(String username) {
        User user = em.createQuery(
                "SELECT u from User u WHERE u.username = :username", User.class).
                setParameter("username", username).getSingleResult();
        System.out.println("User_role: - " + user.getRoles());
        return user;
    }

    @Override
    public boolean exists(User user) {
        return getUserByName(user.getUsername()) != null;
    }
}