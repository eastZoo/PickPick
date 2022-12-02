package com.example.PickPick.repository;

import com.example.PickPick.domain.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VideoRepository extends JpaRepository<VideoEntity, String> {
}
