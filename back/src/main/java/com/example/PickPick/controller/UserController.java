package com.example.PickPick.controller;

import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.UserDto;
import com.example.PickPick.dto.VideoDto;
import com.example.PickPick.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/videos")
    public ResultDto<VideoDto> getSharedVideo(@RequestHeader("X-AUTH-TOKEN") String token) {
        return userService.getSharedVideo(token);
    }

}
