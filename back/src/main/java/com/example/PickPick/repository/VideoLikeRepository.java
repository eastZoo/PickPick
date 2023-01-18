package com.example.PickPick.repository;

import com.example.PickPick.domain.VideoLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoLikeRepository extends JpaRepository<VideoLikeEntity, Integer> {
    @Query("SELECT vl FROM VideoLikeEntity vl JOIN FETCH vl.video WHERE vl.user.id = :userId")
    List<VideoLikeEntity> findAllByUserIdJoinFetch(@Param("userId")String userId);

    List<VideoLikeEntity> findByVideoId(int videoId);
}
