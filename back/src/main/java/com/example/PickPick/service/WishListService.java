package com.example.PickPick.service;

import com.example.PickPick.config.JwtTokenProvider;
import com.example.PickPick.domain.WishEntity;
import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.VideoDto;
import com.example.PickPick.dto.WishDto;
import com.example.PickPick.repository.VideoRepository;
import com.example.PickPick.repository.WishListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

                List<WishEntity> wishEntities = wishListRepository.findAllByUserIdJoinFetch(userId);
                List<WishDto.MyWishList> wishList = wishEntities.stream()
                        .map(wl -> new WishDto.MyWishList(wl.getId(), new VideoDto.VideoInfo(wl.getVideo())))
                        .collect(Collectors.toList());
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
                String userId = jwtTokenProvider.getSubject(token);
                WishEntity wishEntity = WishEntity.builder()
                        .userId(userId)
                        .video(videoRepository.findById(wish.getVideoId())
                                .orElseThrow(IllegalArgumentException::new))
                        .build();
                WishEntity saved = wishListRepository.save(wishEntity);
                WishDto.AddWishList response = WishDto.AddWishList.builder()
                        .id(saved.getId())
                        .videoId(saved.getVideo().getId())
                        .build();
                result.setMsg("나중에 볼 목록에 영상 추가");
                result.setSuccess(true);
                result.setDetail(response);
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

    public ResultDto deleteWish(String token, int wishListId) {
        ResultDto result = new ResultDto();
        try{
            if(jwtTokenProvider.validateToken(token)){
                wishListRepository.deleteById(wishListId);
                WishDto.DeleteResponse response = WishDto.DeleteResponse.builder()
                        .id(wishListId)
                        .build();
                result.setMsg("나중에 볼 목록에서 영상 삭제");
                result.setSuccess(true);
                result.setDetail(response);
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
