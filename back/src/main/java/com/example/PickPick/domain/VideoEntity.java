package com.example.PickPick.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "videos")
@AttributeOverrides({
        @AttributeOverride(name = "createdAt", column = @Column(name = "video_created_at")),
        @AttributeOverride(name = "updateAt", column = @Column(name = "video_update_at"))
})
public class VideoEntity extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_id")
    private int id;

    @Column(name = "video_url")
    private String url;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "category_id")
    private int categoryId;
}
