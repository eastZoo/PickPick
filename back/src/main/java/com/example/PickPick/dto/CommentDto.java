package com.example.PickPick.dto;

import com.example.PickPick.domain.CommentEntity;
import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.mapper.UserMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class CommentDto {
    private int commentId;
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private UserDto user;
    private int video;
    private int like;

    //Entity to Dto
    public CommentDto(CommentEntity entity, int like){
        this.commentId = entity.getCommentId();
        this.comment = entity.getComment();
        this.createdAt = entity.getCreatedAt();
        this.updateAt = entity.getUpdateAt();
        this.user = UserMapper.mapper.userEntityToDto(entity.getUser());
        this.video = entity.getVideo().getId();
        this.like = like;
    }

    @Getter
    @AllArgsConstructor
    public static class MyComments {
        private int id;
        private String comment;
        private LocalDateTime createdAt;
        private LocalDateTime updateAt;
        private VideoEntity video;
    }
}
