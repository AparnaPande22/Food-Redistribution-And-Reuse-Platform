package com.food.service;

import java.util.List;

import com.food.DTO.RequestDTO;
import com.food.DTO.RequestResponseDTO;
import com.food.entities.Request;
import com.food.entities.RequestStatus;

public interface RequestService {

	public RequestResponseDTO addNewRequest(RequestDTO dto);

	public Request findById(Long id);

	public List<Request> findAllRequest();

	public String deleteById(Long id);

	public List<Request> findByStatus(RequestStatus status);

	public List<Request> findMyRequest(Long userId);

	public Request submitRequest(Long id);

	public Request cancelRequest(Long id);

	public List<RequestResponseDTO> findRequestHistory(Long id);

	public String updateRequest(Long id, RequestDTO dto);
}
