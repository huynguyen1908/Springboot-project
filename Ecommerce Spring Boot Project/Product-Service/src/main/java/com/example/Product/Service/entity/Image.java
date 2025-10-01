package com.example.Product.Service.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Data
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "image_id")
    Long imageId;

    @Column(name = "image_path")
    String imagePath;
    String imageName;

    //lưu service upload ảnh
    String source;

    // luu id của đối tượng liên kết với ảnh
    @Column(name = "object_id")
    String objectId;

    String imageType;

    @Column(name = "is_active")
    Long isActive;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    String createdBy;
    String updatedBy;
}