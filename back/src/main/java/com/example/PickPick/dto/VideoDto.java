package com.example.PickPick.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class VideoDto {
    private int id;
    private String url;
    private String userId;
    private String categoryId;
}
