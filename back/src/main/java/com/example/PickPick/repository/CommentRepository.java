package com.example.PickPick.repository;

import com.example.PickPick.domain.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findAllByVideoId(int id);

    @Transactional
    @Modifying
    @Query(value = "update comments set comment_comment = :comment where comment_id = :id", nativeQuery = true)
    int updateComment(int id, String comment);
}
