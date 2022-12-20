package com.example.PickPick.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "video_likes")
@AttributeOverrides({
        @AttributeOverride(name = "createdAt", column = @Column(name = "video_like_created_at")),
        @AttributeOverride(name = "updateAt", column = @Column(name = "video_like_update_at"))
})
public class VideoLikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_like_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotFound(action = NotFoundAction.IGNORE)
    private UserEntity userId;

    @ManyToOne
    @JoinColumn(name = "video_id")
    private VideoEntity videoId;
}
