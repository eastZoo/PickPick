package com.example.PickPick.repository;

import com.example.PickPick.domain.VideoLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VideoLikeRepository extends JpaRepository<VideoLikeEntity, Integer> {

    @Query(value = "select count(*) from video_likes where video_likes.video_id=:videoId", nativeQuery = true)
    int countByVideoId(int videoId);
}
