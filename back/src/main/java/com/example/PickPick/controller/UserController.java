package com.example.PickPick.controller;

import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.UserDto;
import com.example.PickPick.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResultDto<UserDto> signup(@RequestBody UserDto user){
        return userService.signup(user);
    }

    @PostMapping("/signin")
    public ResultDto<UserDto> signin(@RequestBody UserDto user){
        return userService.signin(user);
    }
}
