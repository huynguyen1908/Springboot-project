package org.example.controller;

import com.cloudinary.Cloudinary;
import org.example.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping( "/api/cloudinary")
public class CloudinaryController {

    @Autowired
    private  CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadMultipartFile(@RequestParam("file") MultipartFile file, @RequestParam String fileName) throws IOException {
        return ResponseEntity.ok(cloudinaryService.uploadMultipartFile(file, fileName));
    }
}
