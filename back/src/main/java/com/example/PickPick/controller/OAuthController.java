package com.example.PickPick.controller;

import com.example.PickPick.config.security.JwtTokenProvider;
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
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/login/{code}")
    public String login(@PathVariable String code) {
        String token = oAuthService.getKakaoAccessToken(code);
        UserDto user = oAuthService.getKakaoUserInfo(token);
        userService.userCheck(user);

        return jwtTokenProvider.createToken(user);
    }
}