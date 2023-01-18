package com.example.PickPick.service;

import com.example.PickPick.config.JwtTokenProvider;
import com.example.PickPick.domain.VideoLikeEntity;
import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.VideoLikeDto;
import com.example.PickPick.repository.UserRepository;
import com.example.PickPick.repository.VideoLikeRepository;
import com.example.PickPick.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VideoLikeService {

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;
    private final VideoLikeRepository videoLikeRepository;
    private final JwtTokenProvider jwtTokenProvider;

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
                VideoLikeEntity saved = videoLikeRepository.save(entity);
                VideoLikeDto.VideoLikes response = VideoLikeDto.VideoLikes.builder()
                        .id(saved.getId())
                        .userId(saved.getUser().getId())
                        .build();
                result.setMsg("영상 좋아요 추가 성공");
                result.setSuccess(true);
                result.setDetail(response);
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

    public ResultDto deleteLikeVideo(String token, int videoLikeId){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)) {
                VideoLikeEntity entity = videoLikeRepository.findById(videoLikeId)
                        .orElseThrow(IllegalArgumentException::new);
                videoLikeRepository.delete(entity);
                VideoLikeDto.DeleteResponse response = VideoLikeDto.DeleteResponse.builder()
                        .id(entity.getId())
                        .build();
                result.setMsg("영상 좋아요 삭제 성공");
                result.setSuccess(true);
                result.setDetail(response);
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
