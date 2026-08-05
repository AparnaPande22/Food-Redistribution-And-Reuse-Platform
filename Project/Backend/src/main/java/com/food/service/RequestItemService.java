package com.food.service;

import java.util.List;

import com.food.DTO.RequestItemDTO;
import com.food.entities.RequestItems;

public interface RequestItemService {

	public String addNewItem(RequestItemDTO dto);

	public RequestItems findById(Long id);

	public List<RequestItems> findByRequest(Long requestId);

	public String deleteRequestItem(Long id);
	
	public String updateItem(Long id, RequestItemDTO dto);
}
