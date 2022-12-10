package com.example.PickPick.dto;

import com.example.PickPick.domain.CommentEntity;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentDto {
    private int commentId;
    private String comment;
    private String createdAt;
    private String updateAt;
    private String userId;
    private int video;

    //Entity to Dto
    public CommentDto(CommentEntity entity){
        this.commentId = entity.getCommentId();
        this.comment = entity.getComment();
        this.createdAt = entity.getCreatedAt();
        this.updateAt = entity.getUpdateAt();
        this.userId = entity.getUserId();
        this.video = entity.getVideo().getId();
    }
}
