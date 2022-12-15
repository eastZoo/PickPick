package com.example.PickPick.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comments")
@AttributeOverrides({
        @AttributeOverride(name = "createdAt", column = @Column(name = "comment_created_at")),
        @AttributeOverride(name = "updateAt", column = @Column(name = "comment_update_at"))
})
public class CommentEntity extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    @Column(name = "comment_comment")
    private String comment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotFound(action = NotFoundAction.IGNORE)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "video_id")
    private VideoEntity video;
}
