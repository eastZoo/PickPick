package com.example.PickPick.controller;

import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.VideoDto;
import com.example.PickPick.dto.VideoLikeDto;
import com.example.PickPick.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/videos")
    public ResultDto<VideoDto> getSharedVideo(@RequestHeader("X-AUTH-TOKEN") String token) {
        return userService.getSharedVideo(token);
    }

    @GetMapping("/likeList")
    public ResultDto<List<VideoLikeDto.VideoLikeList>> getLikeList(@RequestHeader("X-AUTH-TOKEN") String token) {
        return userService.getLikeList(token);
    }

    @GetMapping("/comments")
    public ResultDto getComments(@RequestHeader("X-AUTH-Token") String token) {
        return userService.getComments(token);
    }

}
