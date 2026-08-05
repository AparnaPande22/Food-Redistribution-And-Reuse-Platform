package com.food.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.food.Exception.ResourceNotFoundException;
import com.food.entities.Document;
import com.food.entities.Media;
import com.food.entities.User;
import com.food.repository.DocumentRepository;
import com.food.repository.MediaRepository;
import com.food.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DocumentServiceImpl implements DocumentService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private MediaRepository mediaRepo;
	@Autowired
	private DocumentRepository documentRepo;

	@Override
	public String uploadDocument(Long userId, String documentType, MultipartFile file) {
		User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

		// Save Media
		Media media = new Media();

		media.setFileName(file.getOriginalFilename());
		media.setMimeType(file.getContentType());
		media.setFilePath("uploads/" + file.getOriginalFilename());
		media.setFileSize(file.getSize());
		media.setUploadedBy(user);

		mediaRepo.save(media);

		// Save Document
		Document document = new Document();

		document.setUser(user);
		document.setMedia(media);
		document.setDocumentType(documentType);
		document.setVerificationStatus("PENDING");
		document.setRemarks(null);

		documentRepo.save(document);

		return "Document Uploaded Successfully";
	}

	@Override
	public Document findById(Long id) {
		return documentRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Document not found"));
	}

	@Override
	public List<Document> findUserDocuments(Long userId) {
		return documentRepo.findByUserId(userId);
	}

	@Override
	public String verifyDocument(Long id) {
		Document document = documentRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Document not found"));

		document.setVerificationStatus("VERIFIED");

		documentRepo.save(document);

		return "Document Verified Successfully";
	}

	@Override
	public String rejectDocument(Long id) {
		Document document = documentRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Document not found"));

		document.setVerificationStatus("REJECTED");

		documentRepo.save(document);

		return "Document Rejected Successfully";
	}

}
