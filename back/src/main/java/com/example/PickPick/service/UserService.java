package com.example.PickPick.service;

import com.example.PickPick.config.JwtTokenProvider;
import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.UserDto;
import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.dto.VideoDto;
import com.example.PickPick.mapper.UserMapper;
import com.example.PickPick.repository.UserRepository;
import com.example.PickPick.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final VideoRepository videoRepository;

    public ResultDto userCheck(UserDto user){
        ResultDto result = new ResultDto();
        try{
            UserEntity userEntity = UserMapper.mapper.userDtoToEntity(user);
            Optional<UserEntity> userId = userRepository.findById(userEntity.getId());
            if(!userId.isEmpty()){
                result.setMsg("기존회원");
            }
            else{
                userRepository.save(userEntity);
                result.setMsg("신규회원");
            }
            result.setSuccess(true);
            result.setDetail(userEntity.getId());
        }
        catch(Exception e){
            result.setMsg("실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    public ResultDto getSharedVideo(String token){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)) {
                String userId = jwtTokenProvider.getSubject(token);

                UserEntity user = userRepository.findById(userId)
                        .orElseThrow(IllegalArgumentException::new);

                List<VideoEntity> videoEntities = videoRepository.findAllByUserId(userId);
                List<VideoDto> videos = videoEntities.stream()
                        .map(v -> new VideoDto(v.getId(), v.getUrl(), v.getUser().getId(), v.getCategoryId()))
                        .collect(Collectors.toList());

                UserDto.UserInfo userInfo = UserDto.UserInfo.builder()
                        .id(user.getId())
                        .imgUrl(user.getImgUrl())
                        .nickName(user.getNickName())
                        .videos(videos)
                        .build();

                result.setDetail(userInfo);
                result.setSuccess(true);
                result.setMsg("유저정보 조회 성공");
            } else {
                result.setMsg("토큰 유효기간 초과");
            }
        }
        catch(Exception e) {
            result.setMsg("유저정보 조회 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
}
