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
import java.util.stream.Collectors;

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
    public ResultDto getVideoDetail(int videoId){
        ResultDto result = new ResultDto();
        try{
            VideoEntity videoEntity = videoRepository.findById(videoId)
                    .orElseThrow(IllegalArgumentException::new);

            List<VideoLikeEntity> videoLikeEntities = videoLikeRepository.findByVideoId(videoEntity.getId());
            List<VideoLikeDto.VideoLikes> videoLikes = videoLikeEntities.stream()
                    .map(vl -> new VideoLikeDto.VideoLikes(vl.getId(), vl.getUser().getId()))
                    .collect(Collectors.toList());

            List<CommentEntity> commentEntities = commentRepository.findAllByVideoId(videoEntity.getId());
            List<CommentDto.Response> comments = commentEntities.stream()
                    .map(cr -> new CommentDto.Response(cr.getCommentId(), cr.getComment(), cr.getCreatedAt(), cr.getUpdateAt(), cr.getUser()))
                    .collect(Collectors.toList());

            VideoDto.VideoDetailDto video = VideoDto.VideoDetailDto.builder()
                    .videoId(videoEntity.getId())
                    .url(videoEntity.getUrl())
                    .videoLikes(videoLikes)
                    .comments(comments)
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
}