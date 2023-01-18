package com.example.PickPick.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class UserDto {
    private String id;
    private String nickName;
    private String imgUrl;
}
