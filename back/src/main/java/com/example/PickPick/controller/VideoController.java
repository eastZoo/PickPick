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

    @GetMapping("/{id}")
    public ResultDto<VideoDetailDto> getVideoDetail(@PathVariable(value = "id") int id){
        return videoService.getVideoDetail(id);
    }

    @PostMapping("/{id}")
    public ResultDto<CommentDto> addComment(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable(value = "id") int id, @RequestBody CommentRequestDto comment){
        return videoService.addComment(token, id, comment);
    }

}
