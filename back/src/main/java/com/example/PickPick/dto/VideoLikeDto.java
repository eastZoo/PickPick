package com.example.PickPick.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
@Builder
@AllArgsConstructor
public class VideoLikeDto {
    private int id;
    private String userId;
    private int videoId;


}
