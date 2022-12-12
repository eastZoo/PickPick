package com.example.PickPick.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "videos")
public class VideoEntity {
    @Id
    @Column(name = "video_id")
    private int id;

    @Column(name = "video_url")
    private String url;

    @Column(name = "video_created_at")
    private LocalDateTime createdAt;

    @Column(name = "video_update_at")
    private LocalDateTime updateAt;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "category_id")
    private int categoryId;
}
