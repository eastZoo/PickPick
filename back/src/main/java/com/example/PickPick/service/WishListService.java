package com.example.PickPick.service;

import com.example.PickPick.config.JwtTokenProvider;
import com.example.PickPick.domain.WishEntity;
import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.WishDto;
import com.example.PickPick.repository.VideoRepository;
import com.example.PickPick.repository.WishListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishListService {

    private final JwtTokenProvider jwtTokenProvider;
    private final WishListRepository wishListRepository;
    private final VideoRepository videoRepository;

    public ResultDto getWishList(String token) {
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)){
                String userId = jwtTokenProvider.getSubject(token);
                List<WishEntity> wishList = wishListRepository.findAllByUserId(userId);
                result.setDetail(wishList);
                result.setSuccess(true);
                result.setMsg("나중에 볼 영상 조회 완료");
            } else {
                result.setMsg("토큰만료");
            }
        }
        catch (Exception e) {
            result.setMsg("나중에 볼 영상 조회 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    public ResultDto addWish(String token, WishDto wish) {
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)){
                WishEntity wishEntity = WishEntity.builder()
                        .userId(jwtTokenProvider.getSubject(token))
                        .video(videoRepository.findById(wish.getVideoId())
                                .orElseThrow(IllegalArgumentException::new))
                        .build();
                wishListRepository.save(wishEntity);
                result.setMsg("나중에 볼 목록에 영상 추가");
                result.setSuccess(true);
                result.setDetail(wishEntity);
            } else {
                result.setMsg("토큰만료");
            }
        }
        catch (Exception e) {
            result.setMsg("나중에 볼 목록에 추가 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    public ResultDto deleteWish(String token, int videoId) {
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)){
                String userId = jwtTokenProvider.getSubject(token);
                wishListRepository.deleteByUserIdAndVideoId(userId, videoId);
                result.setMsg("나중에 볼 목록에서 영상 삭제");
                result.setSuccess(true);
            } else {
                result.setMsg("토큰만료");
            }
        }
        catch (Exception e) {
            result.setMsg("나중에 볼 목록에서 영상 삭제 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
}
