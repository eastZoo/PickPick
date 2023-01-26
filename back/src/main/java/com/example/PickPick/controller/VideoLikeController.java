package com.example.PickPick.controller;

import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.VideoLikeDto;
import com.example.PickPick.service.VideoLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("like")
@RequiredArgsConstructor
public class VideoLikeController {

    private final VideoLikeService videoLikeService;

    @PostMapping
    public ResultDto<VideoLikeDto.VideoLikes> addLikeVideo(@RequestHeader("X-AUTH-TOKEN") String token, @RequestBody VideoLikeDto.LikeRequest videoId){
        return videoLikeService.addLikeVideo(token, videoId);
    }

    @DeleteMapping("/{VideoLikeId}")
    public ResultDto<VideoLikeDto.DeleteResponse> deleteLikeVideo(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable("VideoLikeId") int videoLikeId){
        return videoLikeService.deleteLikeVideo(token, videoLikeId);
    }
}
