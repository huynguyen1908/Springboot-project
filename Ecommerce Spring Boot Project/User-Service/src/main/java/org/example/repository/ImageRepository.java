package org.example.repository;


import org.example.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image,String> {
    @Query(value = "select image_path from image where object_id = :userId and is_active = 1", nativeQuery = true)
    String findImagePathByUserId(String userId);
}
