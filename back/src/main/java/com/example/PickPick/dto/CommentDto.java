package com.example.PickPick.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CommentDto {
    private Long commentId;
    private String comment;
    private String userId;
}
