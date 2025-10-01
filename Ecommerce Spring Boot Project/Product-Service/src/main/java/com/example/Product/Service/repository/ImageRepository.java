package com.example.Product.Service.repository;

import com.example.Product.Service.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image,String> {

    @Query(value = "select image.image_id, image_path from image where object_id = :productId and is_active = 1", nativeQuery = true)
    List<Object[]> findImagePathByProductId(@Param("productId") String productId);
}
