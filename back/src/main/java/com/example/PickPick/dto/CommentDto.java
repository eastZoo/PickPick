package com.example.PickPick.dto;

import com.example.PickPick.domain.CommentEntity;
import com.example.PickPick.mapper.UserMapper;
import lombok.Getter;

@Getter
public class CommentDto {
    private int commentId;
    private String comment;
    private String createdAt;
    private String updateAt;
    private UserDto user;
    private int video;

    private int like;

    //Entity to Dto
    public CommentDto(CommentEntity entity, int like){
        this.commentId = entity.getCommentId();
        this.comment = entity.getComment();
        this.createdAt = entity.getCreatedAt();
        this.updateAt = entity.getUpdateAt();
        this.user = UserMapper.mapper.userEntityToDto(entity.getUserId());
        this.video = entity.getVideo().getId();
        this.like = like;
    }
}
