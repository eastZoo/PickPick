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
    @AllArgsConstructor
    public static class VideoLikeList {
        private int id;
        private VideoEntity video;
    }
}
