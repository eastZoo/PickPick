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
    private List<VideoLikeDto> videoLike;
    private List<CommentDto> comments;

    @Builder
    public VideoDetailDto(int videoId, String url, String videoUserNickname, String videoUserProfile, int categoryId, List<VideoLikeDto> videoLike, List<CommentDto> comments){
        this.videoId = videoId;
        this.url = url;
        this.videoUserNickname = videoUserNickname;
        this.videoUserProfile = videoUserProfile;
        this.categoryId = categoryId;
        this.videoLike = videoLike;
        this.comments = comments;
    }

}
