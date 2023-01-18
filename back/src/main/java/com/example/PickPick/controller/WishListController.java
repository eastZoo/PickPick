package com.example.PickPick.controller;

import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.VideoDto;
import com.example.PickPick.dto.WishDto;
import com.example.PickPick.service.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("wishlist")
@RequiredArgsConstructor
public class WishListController {

    private final WishListService wishListService;

    @GetMapping
    public ResultDto<VideoDto> getWishList(@RequestHeader("X-AUTH-TOKEN") String token) {
        return wishListService.getWishList(token);
    }

    @PostMapping
    public ResultDto addWish(@RequestHeader("X-AUTH-TOKEN") String token, @RequestBody WishDto wish) {
        return wishListService.addWish(token, wish);
    }

    @DeleteMapping("/{WishListId}")
    @Transactional
    public ResultDto deleteWish(@RequestHeader("X-AUTH-TOKEN") String token, @PathVariable(value = "WishListId") int wishListId) {
        return wishListService.deleteWish(token, wishListId);
    }
}
