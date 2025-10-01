package org.example.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.example.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public String uploadImage(byte[] imageBytes, String fileName) throws IOException {
        cloudinary.uploader().upload(imageBytes, ObjectUtils.asMap("public_id", fileName));
        return "https://cloudinary.com/image/upload/" + fileName;
    }

    @Override
    public String uploadMultipartFile(MultipartFile file, String fileName) throws IOException {
//        Map<?, ?>result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("public_id", fileName));
        Map<?, ?> result = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "public_id", fileName,
                        "overwrite", true // cho phép ghi đè
                )
        );
        return (String) result.get("secure_url");
    }
}
