package com.example.PickPick.service;

import com.example.PickPick.config.JwtTokenProvider;
import com.example.PickPick.domain.CommentEntity;
import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.domain.VideoLikeEntity;
import com.example.PickPick.dto.*;
import com.example.PickPick.mapper.UserMapper;
import com.example.PickPick.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final VideoLikeRepository videoLikeRepository;
    private final CommentLikeRepository commentLikeRepository;
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
            //Entity to Dto
            //Video Dto 관련해서 이야기나눠야할듯
            VideoEntity video = videoRepository.findById(id)
                    .orElseThrow(IllegalArgumentException::new);

            UserEntity userEntity = userRepository.findById(video.getUserId())
                    .orElseThrow(IllegalArgumentException::new);
            UserDto user = UserMapper.mapper.userEntityToDto(userEntity);

            List<CommentEntity> commentEntity = commentRepository.findAllByVideoId(video.getId());
            List<CommentDto> comment = commentEntity.stream()
                            .map(c -> new CommentDto(c))
                            .collect(Collectors.toList());

            //좋아요 조회
            int videoLike = videoLikeRepository.countByVideoId(video.getId());
            int commentLike = commentLikeRepository.countByCommentId(comment.get(0).getVideo());


            result.setMsg("영상 조회 성공");
            result.setDetail(VideoDetailDto.builder()
                            .videoId(video.getId())
                            .url(video.getUrl())
                            .videoUserProfile(user.getImgUrl())
                            .videoUserNickname(user.getNickName())
                            .videoLike(videoLike)
                            .categoryId(video.getCategoryId())
                            .comments(comment)
                            .commentsLike(commentLike)
                    .build());
        }catch(Exception e){
            result.setMsg("영상 조회 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

}
