package com.example.PickPick.user;

import com.example.PickPick.result.ResultDto;
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
