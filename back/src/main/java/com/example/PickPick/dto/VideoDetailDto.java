package com.example.PickPick.dto;

import com.example.PickPick.domain.CommentEntity;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class VideoDetailDto {
    private int videoId;
    private String url;
    private String videoUserNickname;
    private String videoUserProfile;
    private int categoryId;
    private int videoLike;
    private List<CommentEntity> comments;
    private int commentsLike;

    @Builder
    public VideoDetailDto(int videoId, String url, String videoUserNickname, String videoUserProfile, int categoryId, int videoLike, List<CommentEntity> comments, int commentsLike){
        this.videoId = videoId;
        this.url = url;
        this.videoUserNickname = videoUserNickname;
        this.videoUserProfile = videoUserProfile;
        this.categoryId = categoryId;
        this.videoLike = videoLike;
        this.comments = comments;
        this.commentsLike = commentsLike;
    }

}
