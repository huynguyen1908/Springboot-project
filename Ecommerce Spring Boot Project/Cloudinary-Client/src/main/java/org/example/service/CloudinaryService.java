package org.example.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CloudinaryService {
    String uploadImage(byte[] imageBytes, String fileName) throws IOException;
    String uploadMultipartFile(MultipartFile file, String fileName) throws IOException;

}
