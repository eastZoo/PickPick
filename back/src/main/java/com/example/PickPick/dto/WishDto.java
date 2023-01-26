package com.example.PickPick.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class WishDto {
    private int id;
    private String userId;
    private int videoId;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class MyWishList {
        private int id;
        private VideoDto.VideoInfo video;
    }

    @Getter
    @Builder
    public static class DeleteResponse {
        private int id;
    }
}
