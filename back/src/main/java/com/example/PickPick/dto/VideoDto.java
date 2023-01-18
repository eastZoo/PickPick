package com.example.PickPick.dto;

import com.example.PickPick.domain.CommentEntity;
import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.domain.VideoLikeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VideoDto {
    private int id;
    private String url;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class VideoDetailDto{
        private int videoId;
        private String url;
        private List<VideoLikeDto.VideoLikes> videoLikes;
        private List<CommentDto.CommentResponse> comments;
    }
}