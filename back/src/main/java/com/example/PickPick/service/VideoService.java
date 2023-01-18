package com.example.PickPick.service;

import com.example.PickPick.config.JwtTokenProvider;
import com.example.PickPick.domain.CommentEntity;
import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.domain.VideoLikeEntity;
import com.example.PickPick.dto.*;
import com.example.PickPick.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final VideoLikeRepository videoLikeRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 영상 리스트 조회 -> 메인화면
     */
    public ResultDto getVideoList() {
        ResultDto result = new ResultDto();
        try{
            result.setDetail(videoRepository.findAllJoinFetch());
            result.setMsg("전체 영상목록");
            result.setSuccess(true);
        } catch(Exception e) {
            result.setMsg("영상목록 조회 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 영상 추가
     */
    public ResultDto addVideo(String token, VideoDto video){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)){
                VideoEntity videoEntity = VideoEntity.builder()
                        .url(video.getUrl())
                        .user(userRepository.findById(jwtTokenProvider.getSubject(token))
                                .orElseThrow(IllegalArgumentException::new))
                        .build();
                int videoId = videoRepository.save(videoEntity).getId();
                result.setDetail(videoRepository.findById(videoId));
                result.setMsg("영상 추가");
                result.setSuccess(true);
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

    /**
     * 영상 상세 조회
     */
    public ResultDto getVideoDetail(int id){
        ResultDto result = new ResultDto();
        try{
            VideoEntity videoEntity = videoRepository.findById(id)
                    .orElseThrow(IllegalArgumentException::new);

            UserEntity user = userRepository.findById(videoEntity.getUser().getId())
                    .orElseThrow(IllegalArgumentException::new);

            List<CommentEntity> commentEntities = commentRepository.findAllByVideoId(videoEntity.getId());
            //좋아요 조회
            List<VideoLikeEntity> videoLikeEntities = videoLikeRepository.findByVideo(videoEntity);

            VideoDto.VideoDetailDto video = VideoDto.VideoDetailDto.builder()
                    .videoId(videoEntity.getId())
                    .url(videoEntity.getUrl())
                    .user(user)
                    .videoLikes(videoLikeEntities)
                    .comments(commentEntities)
                    .build();
            result.setSuccess(true);
            result.setMsg("영상 조회 성공");
            result.setDetail(video);
        }catch(Exception e){
            result.setMsg("영상 조회 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    public ResultDto addLikeVideo(String token, int videoId){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)) {
                VideoLikeEntity entity = VideoLikeEntity.builder()
                        .user(userRepository.findById(jwtTokenProvider.getSubject(token))
                                .orElseThrow(IllegalArgumentException::new))
                        .video(videoRepository.findById(videoId)
                                .orElseThrow(IllegalArgumentException::new))
                        .build();
                videoLikeRepository.save(entity);
                VideoLikeDto videoLike = VideoLikeDto.builder()
                        .id(entity.getId())
                        .videoId(entity.getVideo().getId())
                        .userId(entity.getUser().getId())
                        .build();
                result.setMsg("영상 좋아요 추가 성공");
                result.setSuccess(true);
                result.setDetail(videoLike);
            }else{
                result.setMsg("토큰 만료");
            }
        }catch(Exception e){
            result.setMsg("영상 좋아요 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    public ResultDto deleteLikeVideo(String token, int videoId){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)) {
                UserEntity user = userRepository.findById(jwtTokenProvider.getSubject(token))
                        .orElseThrow(IllegalArgumentException::new);
                VideoEntity video = videoRepository.findById(videoId)
                        .orElseThrow(IllegalArgumentException::new);

                VideoLikeEntity entity = videoLikeRepository.findByUserAndVideo(user, video);
                VideoLikeDto videoLike = VideoLikeDto.builder()
                        .id(entity.getId())
                        .videoId(entity.getVideo().getId())
                        .userId(entity.getUser().getId())
                        .build();
                videoLikeRepository.delete(entity);
                result.setMsg("영상 좋아요 삭제 성공");
                result.setSuccess(true);
                result.setDetail(videoLike);
            }else{
                result.setMsg("토큰 만료");
            }
        }catch(Exception e){
            result.setMsg("영상 좋아요 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
}