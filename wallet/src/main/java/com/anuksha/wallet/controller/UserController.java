package com.anuksha.wallet.controller;

import com.anuksha.wallet.dto.AddMoneyRequest;
import com.anuksha.wallet.dto.LoginResponse;
import com.anuksha.wallet.dto.TransferRequest;
import com.anuksha.wallet.dto.UserResponse;
import com.anuksha.wallet.entity.Transaction;
import com.anuksha.wallet.entity.User;
import com.anuksha.wallet.security.JwtService;
import com.anuksha.wallet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://localhost:5178"
})
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    // REGISTER
    @PostMapping("/register")
    public UserResponse register(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return new UserResponse(savedUser.getId(), savedUser.getUsername(), savedUser.getBalance());
    }

    // LOGIN
    @PostMapping("/login")
    public LoginResponse login(@RequestBody User user) {
        User loggedInUser = userService.login(user.getUsername(), user.getPassword());

        if (loggedInUser == null) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtService.generateToken(loggedInUser.getUsername());

        return new LoginResponse(token, loggedInUser.getUsername(), loggedInUser.getId());
    }

    // ADD MONEY
    @PostMapping("/add")
    public UserResponse addMoney(@RequestBody AddMoneyRequest request) {
        User updatedUser = userService.addMoney(request.getUserId(), request.getAmount());
        return new UserResponse(updatedUser.getId(), updatedUser.getUsername(), updatedUser.getBalance());
    }

    // TRANSFER
    @PostMapping("/transfer")
    public String transferMoney(@RequestBody TransferRequest request) {
        userService.transferMoney(request.getSenderId(), request.getReceiverId(), request.getAmount());
        return "Transfer Successful";
    }

    // TRANSACTIONS
    @GetMapping("/transactions/{userId}")
    public List<Transaction> getTransactions(@PathVariable Long userId) {
        return userService.getUserTransactions(userId);
    }
    @GetMapping("/{id}")
    public UserResponse getUserById(@PathVariable Long id) {

        User user = userService.getUserById(id);

        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getBalance()
        );
    }
}