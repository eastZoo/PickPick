package com.example.PickPick.dto;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
public class VideoLikeDto {
    private int id;
    private String createdAt;
    private String updateAt;
    private String userId;
    private String videoId;
}
