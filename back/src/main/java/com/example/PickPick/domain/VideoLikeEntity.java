package com.example.PickPick.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "video_likes")
public class VideoLikeEntity {
    @Id
    @Column(name = "video_like_id")
    private int id;

    @Column(name = "video_like_created_at")
    private String createdAt;

    @Column(name = "video_like_update_at")
    private String updateAt;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "video_id")
    private String videoId;

}
