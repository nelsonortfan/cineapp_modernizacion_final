package net.itinajero.app.cineapp.service;

import org.springframework.web.multipart.MultipartFile;

import net.itinajero.app.cineapp.dto.FileUploadResponse;

public interface FileService {
    FileUploadResponse uploadFile(MultipartFile multipartFile);
}