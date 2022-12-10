package com.example.PickPick.repository;

import com.example.PickPick.domain.CommentLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentLikeRepository extends JpaRepository<CommentLikeEntity, Integer> {
    @Query(value = "select count(*) from comment_likes where comment_likes.comment_id=:commentId", nativeQuery = true)
    int countByCommentId(int commentId);
}
