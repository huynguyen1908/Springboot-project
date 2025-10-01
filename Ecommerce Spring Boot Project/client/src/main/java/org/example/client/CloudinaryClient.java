package org.example.client;



import org.example.config.FeignMultipartSupportConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "cloudinary-client", configuration = FeignMultipartSupportConfig.class)
public interface CloudinaryClient {
    @PostMapping(value = "/api/cloudinary/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    String uploadMultipartFile(@RequestPart("file") MultipartFile file, @RequestParam("fileName") String fileName);
}