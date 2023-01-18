package com.example.PickPick.repository;

import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.domain.VideoLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoLikeRepository extends JpaRepository<VideoLikeEntity, Integer> {

    @Query(value = "select count(*) from video_likes where video_likes.video_id=:videoId", nativeQuery = true)
    int countByVideoId(@Param("videoId") int videoId);

    List<VideoLikeEntity> findByVideoId(int videoId);

    VideoLikeEntity findByUserAndVideo(UserEntity user, VideoEntity video);

    List<VideoLikeEntity> findAllByUserId(String userId);
}
