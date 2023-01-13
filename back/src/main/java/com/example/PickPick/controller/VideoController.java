package com.example.PickPick.controller;

import com.example.PickPick.dto.*;
import com.example.PickPick.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("video")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @GetMapping
    public ResultDto<VideoDto> getVideoList() {
        return videoService.getVideoList();
    }

    @PostMapping
    public ResultDto<VideoDto> addVideo(@RequestHeader("X-AUTH-TOKEN") String token, @RequestBody VideoDto video){
        return videoService.addVideo(token, video);
    }

    @GetMapping("/{VideoId}")
    public ResultDto<VideoDto.VideoDetailDto> getVideoDetail(@PathVariable(value = "VideoId") int videoId){
        return videoService.getVideoDetail(videoId);
    }

    @PostMapping("/{VideoId}/comment")
    public ResultDto<CommentDto> addComment(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable(value = "VideoId") int VideoId, @RequestBody CommentRequestDto comment){
        return videoService.addComment(token, VideoId, comment);
    }

    @PutMapping("/{VideoId}/comment/{CommentId}")
    public ResultDto<CommentDto> modifiedComment(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable("CommentId") int commentId, @RequestBody CommentRequestDto comment){
        return videoService.modifiedComment(token, commentId, comment);
    }

    @DeleteMapping("/{VideoId}/comment/{CommentId}")
    public ResultDto deleteComment(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable("CommentId") int commentId){
        return videoService.deleteComment(token,commentId);
    }

    @PostMapping("/{VideoId}/like")
    public ResultDto addLikeVideo(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable("VideoId") int videoId){
        return videoService.addLikeVideo(token, videoId);
    }

    @DeleteMapping("/{VideoId}/like")
    public ResultDto deleteLikeVideo(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable("VideoId") int videoId){
        return videoService.deleteLikeVideo(token, videoId);
    }

}