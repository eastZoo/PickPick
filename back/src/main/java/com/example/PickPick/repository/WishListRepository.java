package com.example.PickPick.repository;

import com.example.PickPick.domain.WishEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishListRepository extends JpaRepository<WishEntity, Integer> {
    List<WishEntity> findAllByUserId(String userId);

    void deleteById(int wishListId);
}
