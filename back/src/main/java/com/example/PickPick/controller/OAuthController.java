package com.example.PickPick.controller;

import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.UserDto;
import com.example.PickPick.service.OAuthService;
import com.example.PickPick.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;
    private final UserService userService;

    @PostMapping
    public ResultDto login(@RequestBody String code) {
        String token = oAuthService.getKakaoAccessToken(code);
        UserDto user = oAuthService.getKakaoUserInfo(token);
        userService.userCheck(user);

        return oAuthService.getJsonWebToken(user);
    }
}