package com.example.PickPick.service;

import com.example.PickPick.config.JwtTokenProvider;
import com.example.PickPick.domain.CommentEntity;
import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.dto.*;
import com.example.PickPick.mapper.UserMapper;
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
    private final CommentLikeRepository commentLikeRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 영상 리스트 조회 -> 메인화면
     */
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

    /**
     * 영상 추가
     */
    public ResultDto addVideo(String token, VideoDto video){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)){
                VideoEntity videoEntity = VideoEntity.builder()
                        .url(video.getUrl())
                        .categoryId(video.getCategoryId())
                        .user(userRepository.findById(jwtTokenProvider.getSubject(token))
                                .orElseThrow(IllegalArgumentException::new))
                        .build();
                int videoId = videoRepository.save(videoEntity).getId();
                result.setMsg("영상 추가");
                result.setSuccess(true);
                result.setDetail(videoRepository.findById(videoId));
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
            //Entity to Dto
            VideoEntity video = videoRepository.findById(id)
                    .orElseThrow(IllegalArgumentException::new);

            UserEntity userEntity = userRepository.findById(video.getUser().getId())
                    .orElseThrow(IllegalArgumentException::new);
            UserDto user = UserMapper.mapper.userEntityToDto(userEntity);

            List<CommentEntity> commentEntity = commentRepository.findAllByVideoId(video.getId());
            List<CommentDto> comment = commentEntity.stream()
                            .map(c -> new CommentDto(c, commentLikeRepository.countByCommentId(c.getCommentId())))
                            .collect(Collectors.toList());

            //좋아요 조회
            int videoLike = videoLikeRepository.countByVideoId(video.getId());

            result.setSuccess(true);
            result.setMsg("영상 조회 성공");
            result.setDetail(VideoDetailDto.builder()
                            .videoId(video.getId())
                            .url(video.getUrl())
                            .videoUserProfile(user.getImgUrl())
                            .videoUserNickname(user.getNickName())
                            .videoLike(videoLike)
                            .categoryId(video.getCategoryId())
                            .comments(comment)
                    .build());
        }catch(Exception e){
            result.setMsg("영상 조회 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 댓글 추가
     */
    public ResultDto addComment(String token, int id, CommentRequestDto input){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)){
                CommentEntity comment = CommentEntity.builder()
                        .comment(input.getComment())
                        .video(videoRepository.findById(id)
                                .orElseThrow(IllegalArgumentException::new))
                        .user(userRepository.findById(jwtTokenProvider.getSubject(token))
                                .orElseThrow(IllegalArgumentException::new))
                        .build();
                commentRepository.save(comment);
                result.setSuccess(true);
                result.setMsg("댓글 추가 성공");
                result.setDetail(comment.getCommentId());
            } else{
                result.setMsg("토큰 유효기간 초과");
            }
        }catch(Exception e){
            result.setMsg("댓글 추가 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    /**
     * 댓글 수정
     */
    public ResultDto modifiedComment(String token, int commentId, CommentRequestDto commentDto){
        ResultDto result = new ResultDto();
            try{
                if(jwtTokenProvider.validateToken(token)){
                    CommentEntity commentEntity = commentRepository.findById(commentId)
                            .orElseThrow(IllegalArgumentException::new);
                    commentRepository.updateComment(commentId, commentDto.getComment());
                    int like = commentLikeRepository.countByCommentId(commentId);
                    CommentDto comment = new CommentDto(commentEntity, like);
                    result.setSuccess(true);
                    result.setMsg("댓글 수정 성공");
                    result.setDetail(comment);
                }else{
                    result.setMsg("토큰 유효기간 만료");
                }
            }catch(Exception e){
                result.setMsg("댓글 수정 실패");
                result.setDetail(e.getMessage());
                e.printStackTrace();
            }
        return result;
    }

    /**
     * 댓글 삭제
     */
    public ResultDto deleteComment(String token, int commentId){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)){
                CommentEntity comment = commentRepository.findById(commentId)
                        .orElseThrow(IllegalArgumentException::new);
                if(comment.getUser()
                        .getId()
                        .equals(jwtTokenProvider.getSubject(token))){
                    commentRepository.delete(comment);
                    result.setSuccess(true);
                    result.setMsg("삭제 성공");
                }else{
                    result.setMsg("작성자만 삭제할 수 있습니다.");
                }
            }else{
                result.setMsg("토큰 유효기간 초과");
            }
        }catch(Exception e){
            result.setMsg("댓글 삭제 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

}
