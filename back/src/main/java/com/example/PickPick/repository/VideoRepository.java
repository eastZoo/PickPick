package com.example.PickPick.repository;

import com.example.PickPick.domain.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface VideoRepository extends JpaRepository<VideoEntity, Integer> {
    List<VideoEntity> findAllByUserId(String userId);
}
