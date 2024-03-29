package com.example.PickPick.service;

import com.example.PickPick.config.JwtTokenProvider;
import com.example.PickPick.domain.CommentEntity;
import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.domain.VideoLikeEntity;
import com.example.PickPick.dto.*;
import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.mapper.UserMapper;
import com.example.PickPick.repository.CommentRepository;
import com.example.PickPick.repository.UserRepository;
import com.example.PickPick.repository.VideoLikeRepository;
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
    private final VideoLikeRepository videoLikeRepository;
    private final CommentRepository commentRepository;

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

                List<VideoEntity> videoEntities = videoRepository.findAllByUserId(userId);
                List<VideoDto> videos = videoEntities.stream()
                        .map(v -> new VideoDto(v.getId(), v.getUrl(), v.getLikeCount()))
                        .collect(Collectors.toList());

                result.setDetail(videos);
                result.setSuccess(true);
                result.setMsg("공유한 영상정보 조회 성공");
            } else {
                result.setMsg("토큰 유효기간 초과");
            }
        }
        catch(Exception e) {
            result.setMsg("공유한 영상정보 조회 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    public ResultDto getLikeList(String token){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)) {
                String userId = jwtTokenProvider.getSubject(token);

                List<VideoLikeEntity> videoLikeEntities = videoLikeRepository.findAllByUserIdJoinFetch(userId);
                List<VideoLikeDto.MyVideoLikes> videos = videoLikeEntities.stream()
                        .map(vl -> new VideoLikeDto.MyVideoLikes(vl.getId(), vl.getVideo()))
                        .collect(Collectors.toList());
                result.setDetail(videos);
                result.setSuccess(true);
                result.setMsg("좋아요 표시한 영상 조회 성공");
            } else {
                result.setMsg("토큰 유효기간 초과");
            }
        }
        catch(Exception e) {
            result.setMsg("좋아요 표시한 영상 조회 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    public ResultDto getComments(String token){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)) {
                String userId = jwtTokenProvider.getSubject(token);

                List<CommentEntity> commentEntities = commentRepository.findAllByUserIdJoinFetch(userId);
                List<CommentDto.MyComments> comments = commentEntities.stream()
                        .map(c -> new CommentDto.MyComments(c.getCommentId(), c.getComment(), c.getVideo()))
                        .collect(Collectors.toList());

                result.setDetail(comments);
                result.setSuccess(true);
                result.setMsg("내가 쓴 댓글 조회 성공");
            } else {
                result.setMsg("토큰 유효기간 초과");
            }
        }
        catch(Exception e) {
            result.setMsg("내가 쓴 댓글 조회 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
}
