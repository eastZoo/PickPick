package com.example.PickPick.dto;

import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.domain.VideoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentDto {

    @Getter
    public static class Request {
        private int videoId;
        private String comment;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class Response {
        private int commentId;
        private String comment;
        private UserEntity user;
    }

    @Getter
    public static class ModifiedRequest {
        private String comment;
    }

    @Builder
    @Getter
    public static class ModifiedResponse {
        private int commentId;
        private String comment;
    }

    @Builder
    @Getter
    public static class DeleteResponse {
        private int commentId;
    }

    @Getter
    @AllArgsConstructor
    public static class MyComments {
        private int id;
        private String comment;
        private VideoEntity video;
    }
}