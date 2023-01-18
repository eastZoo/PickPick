package com.example.PickPick.service;

import com.example.PickPick.config.JwtTokenProvider;
import com.example.PickPick.domain.CommentEntity;
import com.example.PickPick.dto.CommentDto;
import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.repository.CommentRepository;
import com.example.PickPick.repository.UserRepository;
import com.example.PickPick.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 댓글 추가
     */
    public ResultDto addComment(String token, int id, CommentDto.CommentRequest input){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)){
                CommentEntity commentEntity = CommentEntity.builder()
                        .comment(input.getComment())
                        .video(videoRepository.findById(id)
                                .orElseThrow(IllegalArgumentException::new))
                        .user(userRepository.findById(jwtTokenProvider.getSubject(token))
                                .orElseThrow(IllegalArgumentException::new))
                        .build();
                commentRepository.save(commentEntity);
                CommentDto.CommentResponse comment = CommentDto.CommentResponse.builder()
                        .commentId(commentEntity.getCommentId())
                        .comment(commentEntity.getComment())
                        .createdAt(commentEntity.getCreatedAt())
                        .updateAt(commentEntity.getUpdateAt())
                        .user(commentEntity.getUser())
                        .build();
                result.setSuccess(true);
                result.setMsg("댓글 추가 성공");
                result.setDetail(comment);
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
    public ResultDto modifiedComment(String token, int commentId, CommentDto.CommentRequest commentDto){
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)){
                commentRepository.updateComment(commentId, commentDto.getComment());
                result.setDetail(commentRepository.findById(commentId));
                result.setSuccess(true);
                result.setMsg("댓글 수정 성공");

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
                    result.setDetail(commentId);
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
