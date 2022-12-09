package com.example.PickPick.repository;

import com.example.PickPick.domain.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    List<CommentEntity> findAllByVideoId(int id);
}
