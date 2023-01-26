package com.example.PickPick.repository;

import com.example.PickPick.domain.WishEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WishListRepository extends JpaRepository<WishEntity, Integer> {
    @Query("SELECT w FROM WishEntity w JOIN FETCH w.video WHERE w.userId = :userId")
    List<WishEntity> findAllByUserIdJoinFetch(@Param("userId")String userId);

    void deleteById(int wishListId);
}
