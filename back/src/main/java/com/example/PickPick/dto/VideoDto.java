package com.example.PickPick.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VideoDto {
    private int id;
    private String url;
    private String userId;
    private int categoryId;
}
