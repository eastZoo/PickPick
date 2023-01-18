package com.example.PickPick.dto;

import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.domain.VideoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CommentDto {

    @Getter
    public static class CommentRequest {
        private int videoId;
        private String comment;
    }

    @Builder
    @Getter
    public static class CommentResponse {
        private int commentId;
        private String comment;
        private LocalDateTime createdAt;
        private LocalDateTime updateAt;
        private UserEntity user;
    }

    @Getter
    public static class CommentModifiedRequest {
        private String comment;
    }

    @Builder
    @Getter
    public static class CommentModifiedResponse {
        private int commentId;
        private String comment;
        private LocalDateTime createdAt;
        private LocalDateTime updateAt;
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