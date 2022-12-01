package com.example.PickPick.config.security;

import com.example.PickPick.dto.UserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private String secretKey = "pickpick"; // TODO 추후에 따로 파일로 빼기

    // 토큰 유효시간 30분
    private long tokenValidTime = 30 * 60 * 1000L;

    // JWT 토큰 생성
    public String createToken(UserDto user) {
        Claims claims = Jwts.claims().setSubject(user.getId());
        claims.put("nickname", user.getNickName());
        claims.put("img", user.getImgUrl());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}