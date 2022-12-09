package com.example.PickPick.service;

import com.example.PickPick.config.JwtTokenProvider;
import com.example.PickPick.domain.CommentEntity;
import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.dto.CommentDto;
import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.VideoDetailDto;
import com.example.PickPick.dto.VideoDto;
import com.example.PickPick.repository.CommentRepository;
import com.example.PickPick.repository.UserRepository;
import com.example.PickPick.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public ResultDto getVideoList() {
        ResultDto result = new ResultDto();
        try{
            result.setDetail(videoRepository.findAll());
            result.setMsg("전체 영상목록");
            result.setSuccess(true);
        } catch(Exception e) {
            result.setMsg("영상목록 조회 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    public ResultDto addVideo(String token, VideoDto video){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)){
                VideoEntity videoEntity = VideoEntity.builder()
                        .url(video.getUrl())
                        .categoryId(video.getCategoryId())
                        .userId(jwtTokenProvider.getSubject(token))
                        .build();
                videoRepository.save(videoEntity);
                result.setMsg("영상 추가");
                result.setSuccess(true);
                result.setDetail(videoEntity.getUrl());
            } else{
                result.setMsg("토큰 유효기간 초과");
            }
        } catch(Exception e) {
            result.setMsg("영상 추가 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return  result;
    }

    public ResultDto getVideoDetail(int id){
        ResultDto result = new ResultDto();
        try{
            Optional<VideoEntity> video = videoRepository.findById(id);
            Optional<UserEntity> user = userRepository.findById(video.get().getUserId());
            List<CommentEntity> comment = commentRepository.findAllByVideoId(video.get().getId());

            result.setMsg("영상 조회 성공");
            result.setDetail(VideoDetailDto.builder()
                            .videoId(video.get().getId())
                            .url(video.get().getUrl())
                            .videoUserProfile(user.get().getImgUrl())
                            .videoUserNickname(user.get().getNickName())
                            .videoLike(0)
                            .categoryId(0)
                            .comments(comment)
                            .commentsLike(0)
                    .build());
        }catch(Exception e){
            result.setMsg("영상 조회 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

}
