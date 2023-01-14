package com.example.PickPick.dto;

import com.example.PickPick.domain.CommentEntity;
import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.mapper.UserMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private int commentId;
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private UserEntity user;
    private VideoEntity video;

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