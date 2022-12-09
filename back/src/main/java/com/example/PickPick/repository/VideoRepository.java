package com.example.PickPick.repository;

import com.example.PickPick.domain.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface VideoRepository extends JpaRepository<VideoEntity, Integer> {
}
