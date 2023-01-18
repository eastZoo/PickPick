package com.example.PickPick.controller;

import com.example.PickPick.dto.CommentDto;
import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResultDto<CommentDto> addComment(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable(value = "VideoId") int VideoId, @RequestBody CommentDto.CommentRequest comment){
        return commentService.addComment(token, VideoId, comment);
    }

    @PatchMapping("/{CommentId}")
    public ResultDto<CommentDto> modifiedComment(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable("CommentId") int commentId, @RequestBody CommentDto.CommentRequest comment){
        return commentService.modifiedComment(token, commentId, comment);
    }

    @DeleteMapping("/{CommentId}")
    public ResultDto deleteComment(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable("CommentId") int commentId){
        return commentService.deleteComment(token,commentId);
    }
}
