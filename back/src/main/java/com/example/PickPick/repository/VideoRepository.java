package com.example.PickPick.repository;

import com.example.PickPick.domain.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface VideoRepository extends JpaRepository<VideoEntity, Integer> {
    @Query("select v from VideoEntity v join fetch v.user")
    List<VideoEntity> findAllJoinFetch();

    List<VideoEntity> findAllByUserId(String userId);
}
