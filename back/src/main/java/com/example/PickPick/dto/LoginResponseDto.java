package com.example.PickPick.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginResponseDto {
    private String token;

    @Builder
    public LoginResponseDto(String token){
        this.token = token;
    }
}
