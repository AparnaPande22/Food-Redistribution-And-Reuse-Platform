package com.food.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.food.Exception.ResourceNotFoundException;
import com.food.entities.Media;
import com.food.entities.User;
import com.food.repository.MediaRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MediaServiceImpl implements MediaService {
	@Autowired
	private MediaRepository mediaRepo;

	@Override
	public String uploadImage(MultipartFile file, User user) {
		Media media = new Media();

		media.setFileName(file.getOriginalFilename());
		media.setMimeType(file.getContentType());
		media.setFilePath("uploads/" + file.getOriginalFilename());
		media.setFileSize(file.getSize());
		media.setCompressionRatio(null); // optional
		media.setUploadedBy(user);

		mediaRepo.save(media);

		return "Image Uploaded Successfully";
	}

	@Override
	public Media findById(Long id) {
		return mediaRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Image not found"));
	}

	@Override
	public String deleteImage(Long id) {
		Media media = mediaRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Image not found"));

		mediaRepo.delete(media);

		return "Image Deleted Successfully";
	}

}
