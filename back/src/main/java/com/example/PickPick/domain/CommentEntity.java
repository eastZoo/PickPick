package com.example.PickPick.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comments")
public class CommentEntity {
    @Id
    @Column(name = "comment_id")
    private int commentId;

    @Column(name = "comment_comment")
    private String comment;

    @Column(name = "comment_created_at")
    private String createdAt;

    @Column(name = "comment_update_at")
    private String updateAt;

    @Column(name = "user_id")
    private String userId;

    @ManyToOne
    @JoinColumn(name = "video_id")
    private VideoEntity video;
}
