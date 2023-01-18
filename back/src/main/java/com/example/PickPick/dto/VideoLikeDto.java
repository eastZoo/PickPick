package com.example.PickPick.dto;

import com.example.PickPick.domain.VideoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class VideoLikeDto {
    private int id;
    private String userId;
    private int videoId;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class VideoLikes {
        private int id;
        private String userId;
    }

    @Getter
    @Builder
    public static class DeleteResponse {
        private int id;
    }

    @Getter
    @AllArgsConstructor
    public static class MyVideoLikes {
        private int id;
        private VideoEntity video;
    }
}
