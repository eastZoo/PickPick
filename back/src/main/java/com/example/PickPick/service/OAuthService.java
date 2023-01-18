package com.example.PickPick.service;

import com.example.PickPick.config.JwtTokenProvider;
import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.UserDto;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final JwtTokenProvider jwtTokenProvider;

    public String getKakaoAccessToken(String code) {
        String access_Token = "";
        String refresh_Token;
        String reqURL = "https://kauth.kakao.com/oauth/token";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=bb43d868299568cb83a5e68583f8e632"); // TODO REST_API_KEY
            sb.append("&redirect_uri=http://localhost:3000/oauth/callback/kakao"); // TODO redirect_uri
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }

            JsonElement element = JsonParser.parseString(result);
            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();
            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return access_Token;
    }

    public UserDto getKakaoUserInfo(String token) {
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }

            JsonElement element = JsonParser.parseString(result);

            String id = element.getAsJsonObject().get("id").getAsString();
            String nickname = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("profile").getAsJsonObject().get("nickname").getAsString();
            String imageUrl = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("profile").getAsJsonObject().get("profile_image_url").getAsString();

            System.out.println("id : " + id);
            System.out.println("nickname : " + nickname);
            System.out.println("image_url : " + imageUrl);

            br.close();

            return UserDto.builder()
                    .id(id)
                    .nickName(nickname)
                    .imgUrl(imageUrl)
                    .build();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public ResultDto getJsonWebToken(UserDto user) {
        ResultDto result = new ResultDto();
        try{
            result.setDetail(jwtTokenProvider.createToken(user));
            result.setMsg("jwt발급");
            result.setSuccess(true);
        } catch(Exception e) {
            result.setMsg("jwt발급실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
}