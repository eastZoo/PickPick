package com.example.PickPick.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserDto {
    private String id;
    private String pwd;
    private String nickName;
}
