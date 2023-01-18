package com.example.PickPick.controller;

import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.service.VideoLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("like")
@RequiredArgsConstructor
public class VideoLikeController {

    private final VideoLikeService videoLikeService;

    @PostMapping
    public ResultDto addLikeVideo(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable("VideoId") int videoId){
        return videoLikeService.addLikeVideo(token, videoId);
    }

    @DeleteMapping("{videoLikeId}")
    public ResultDto deleteLikeVideo(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable("VideoId") int videoId){
        return videoLikeService.deleteLikeVideo(token, videoId);
    }
}
