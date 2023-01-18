package com.example.PickPick.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultDto<T> {
    private String msg;
    private boolean success = false;
    private T detail;
}