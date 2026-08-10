package com.food.service;

import java.util.List;

import com.food.DTO.RequestItemDTO;

public interface RequestItemService {

	public String addNewItem(RequestItemDTO dto);

	// BUGFIX: previously returned the raw RequestItems entity, which
	// serializes the nested Request -> User (including the bcrypt
	// password hash). Now returns a safe, flattened DTO.
	public RequestItemDTO findById(Long id);

	public List<RequestItemDTO> findByRequest(Long requestId);

	public String deleteRequestItem(Long id);
	
	public String updateItem(Long id, RequestItemDTO dto);
}
