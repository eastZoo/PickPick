package com.example.PickPick.repository;

import com.example.PickPick.domain.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findAllByVideoId(int videoId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE CommentEntity c SET c.comment = :comment WHERE c.commentId = :id")
    int updateComment(@Param("id") int id, @Param("comment") String comment);

    @Query("SELECT c FROM CommentEntity c JOIN FETCH c.video WHERE c.user.id = :userId ORDER BY c.id DESC")
    List<CommentEntity> findAllByUserIdJoinFetch(@Param("userId") String userId);
}
