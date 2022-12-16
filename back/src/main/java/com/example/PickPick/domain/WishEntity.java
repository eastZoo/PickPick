package com.example.PickPick.domain;

import com.fasterxml.jackson.databind.ser.Serializers;
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
@Table(name = "wishlists")
@AttributeOverrides({
        @AttributeOverride(name = "createdAt", column = @Column(name = "wishlist_created_at")),
        @AttributeOverride(name = "updateAt", column = @Column(name = "wishlist_update_at"))
})
public class WishEntity extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlist_id")
    private int id;

    @Column(name = "user_id")
    private String userId;

    @ManyToOne
    @JoinColumn(name = "video_id")
    private VideoEntity video;
}
