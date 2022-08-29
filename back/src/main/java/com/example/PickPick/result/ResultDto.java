package com.example.PickPick.result;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ResultDto<T> {
    private String msg;
    private boolean success;
    private T detail;
}