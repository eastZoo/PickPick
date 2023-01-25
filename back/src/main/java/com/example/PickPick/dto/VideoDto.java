package com.example.PickPick.dto;

import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.mapper.UserMapper;
import lombok.*;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VideoDto {
    private int id;
    private String url;
    private int likeCount;


    @Getter
    @Builder
    @AllArgsConstructor
    public static class VideoDetailDto{
        private int videoId;
        private String url;
        private List<VideoLikeDto.VideoLikes> videoLikes;
        private List<CommentDto.Response> comments;
    }

    @Getter
    public static  class VideoInfo {
        private int id;
        private String url;
        private UserDto user;
        private int likeCount;

        public VideoInfo(VideoEntity video) {
            this.id = video.getId();
            this.url = video.getUrl();
            this.user = UserMapper.mapper.userEntityToDto(video.getUser());
            this.likeCount = video.getLikeCount();
        }
    }
}