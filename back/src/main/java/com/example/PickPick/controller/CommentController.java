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
    public ResultDto<CommentDto.Response> addComment(@RequestHeader("X-AUTH-TOKEN") String token, @RequestBody CommentDto.Request request){
        return commentService.addComment(token, request);
    }

    @PatchMapping("/{CommentId}")
    public ResultDto<CommentDto.ModifiedResponse> modifiedComment(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable("CommentId") int commentId, @RequestBody CommentDto.ModifiedRequest request){
        return commentService.modifiedComment(token, commentId, request);
    }

    @DeleteMapping("/{CommentId}")
    public ResultDto<CommentDto.DeleteResponse> deleteComment(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable("CommentId") int commentId){
        return commentService.deleteComment(token, commentId);
    }
}
