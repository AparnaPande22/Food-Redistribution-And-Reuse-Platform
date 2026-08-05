package com.food.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.food.DTO.RequestItemDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.Request;
import com.food.entities.RequestItems;
import com.food.repository.RequestItemRepository;
import com.food.repository.RequestRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RequestItemServiceImpl implements RequestItemService {

	private final RequestRepository requestRepo;

	private final RequestItemRepository requestItemRepo;

	@Override
	public RequestItems findById(Long id) {
		return requestItemRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("RequestItem not Found"));
	}

	@Override
	public List<RequestItems> findByRequest(Long requestId) {
		Request request = requestRepo.findById(requestId)
				.orElseThrow(() -> new ResourceNotFoundException("Request Not Found!!"));
		return requestItemRepo.findByRequest(request);
	}

	@Override
	public String deleteRequestItem(Long id) {
		RequestItems item = requestItemRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Request Item Not Found!!"));
		requestItemRepo.delete(item);
		return "RequestItem Deleted Successfully!";
	}

	@Override
	public String addNewItem(RequestItemDTO dto) {
		Request req = requestRepo.findById(dto.getRequestId())
				.orElseThrow(() -> new ResourceNotFoundException("Request Not Found!!"));

		RequestItems items = new RequestItems();

		items.setItemName(dto.getItemName());
		items.setFoodCategory(dto.getFoodCategory());
		items.setQuantity(dto.getQuantity());
		items.setUnit(dto.getUnit());
		items.setExpiryTime(dto.getExpiryTime());

		items.setRequest(req);

		requestItemRepo.save(items);

		return "Item Added Successfully!";
	}

	@Override
	public String updateItem(Long id, RequestItemDTO dto) {
		RequestItems items = requestItemRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not found with id " + id));

		items.setItemName(dto.getItemName());
		items.setFoodCategory(dto.getFoodCategory());
		items.setQuantity(dto.getQuantity());
		items.setUnit(dto.getUnit());
		items.setExpiryTime(dto.getExpiryTime());

		if (dto.getRequestId() != null) {
			Request request = requestRepo.findById(dto.getRequestId()).orElseThrow(
					() -> new ResourceNotFoundException("Request not found with id : " + dto.getRequestId()));

			items.setRequest(request);
		}

		requestItemRepo.save(items);

		return "RequestItem Updated Successfully!";
	}
}
