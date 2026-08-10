package com.food.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.food.DTO.AdminDashboardDTO;
import com.food.DTO.AdminDonationDTO;
import com.food.DTO.RequestItemDTO;
import com.food.DTO.RequestResponseDTO;
import com.food.DTO.UserSummaryDTO;
import com.food.Exception.ResourceNotFoundException;
import com.food.entities.DeliveryStatus;
import com.food.entities.MatchStatus;
import com.food.entities.Matches;
import com.food.entities.Request;
import com.food.entities.RequestItems;
import com.food.entities.RequestStatus;
import com.food.entities.RequestType;
import com.food.entities.User;
import com.food.entities.UserStatus;
import com.food.repository.DeliveryRepository;
import com.food.repository.MatchesRepository;
import com.food.repository.RequestItemRepository;
import com.food.repository.RequestRepository;
import com.food.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

private final UserRepository userRepo;
private final RequestRepository reqRepo;
private final MatchesRepository matchRepo;
private final DeliveryRepository deliveryRepo;
private final RequestItemRepository requestItemRepo;

// =========================================================
// ADMIN - USERS
// =========================================================

@Override
public List<UserSummaryDTO> findPendingUsers(UserStatus status) {

    List<User> users = userRepo.findByStatus(status);

    List<UserSummaryDTO> result = new ArrayList<>();

    for (User user : users) {
        result.add(toUserSummary(user));
    }

    return result;
}

@Override
public UserSummaryDTO approveUser(Long userId) {

    User user = userRepo.findById(userId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "User Not Found"
                    )
            );

    user.setStatus(UserStatus.APPROVED);

    userRepo.save(user);

    return toUserSummary(user);
}

@Override
public UserSummaryDTO rejectUser(Long userId) {

    User user = userRepo.findById(userId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "User Not Found"
                    )
            );

    user.setStatus(UserStatus.REJECTED);

    userRepo.save(user);

    return toUserSummary(user);
}

// =========================================================
// ADMIN - DONATIONS
// =========================================================

@Override
public List<AdminDonationDTO> findAllDonations() {

    return reqRepo.findAll()
            .stream()
            .filter(request ->
                    request.getRequestType() == RequestType.DONATION
            )
            .map(this::toAdminDonation)
            .toList();
}

private AdminDonationDTO toAdminDonation(Request request) {

    AdminDonationDTO dto = new AdminDonationDTO();

    dto.setDonationId(request.getId());
    dto.setStatus(request.getStatus());
    dto.setFoodCategory(request.getFoodCategory());
    dto.setMealPreference(request.getMealPreference());
    dto.setEstimatedMeals(request.getEstimatedMeals());
    dto.setPickupAddress(request.getPickUpAddress());
    dto.setDeliveryAvailable(
            request.isDeliveryAvailable()
    );
    dto.setNeededBy(request.getNeededBy());
    dto.setCreatedAt(request.getCreatedAt());
    dto.setLatitude(request.getLatitude());
    dto.setLongitude(request.getLongitude());

    // -----------------------------------------------------
    // DONOR
    // -----------------------------------------------------

    User donor = request.getUser();

    if (donor != null) {
        dto.setDonor(toUserSummary(donor));
    }

    // -----------------------------------------------------
    // FOOD ITEMS
    // -----------------------------------------------------

    List<RequestItems> items =
            requestItemRepo.findByRequestId(request.getId());

    List<RequestItemDTO> itemDTOs =
            items.stream()
                    .map(this::toRequestItemDTO)
                    .toList();

    dto.setItems(itemDTOs);

    return dto;
}

private RequestItemDTO toRequestItemDTO(
        RequestItems item) {

    RequestItemDTO dto = new RequestItemDTO();

    dto.setId(item.getId());

    if (item.getRequest() != null) {
        dto.setRequestId(
                item.getRequest().getId()
        );
    }

    dto.setItemName(item.getItemName());
    dto.setFoodCategory(item.getFoodCategory());
    dto.setQuantity(item.getQuantity());
    dto.setUnit(item.getUnit());
    dto.setExpiryTime(item.getExpiryTime());

    return dto;
}

private UserSummaryDTO toUserSummary(User user) {

    UserSummaryDTO dto = new UserSummaryDTO();

    dto.setId(user.getId());
    dto.setName(user.getName());
    dto.setEmail(user.getEmail());
    dto.setPhone(user.getPhone());
    dto.setAccountType(user.getAccountType());
    dto.setTeamRole(user.getTeamRole());
    dto.setStatus(user.getStatus());
    dto.setAddress(user.getAddress());
    dto.setCity(user.getCity());
    dto.setCreatedAt(user.getCreatedAt());

    return dto;
}

// =========================================================
// ADMIN - PENDING REQUESTS
// =========================================================

@Override
public List<RequestResponseDTO> findPendingRequests() {

    List<Request> requests =
            reqRepo.findByStatus(RequestStatus.PENDING);

    List<RequestResponseDTO> requestList =
            new ArrayList<>();

    for (Request request : requests) {

        RequestResponseDTO dto =
                toRequestResponseDTO(request);

        requestList.add(dto);
    }

    return requestList;
}

// =========================================================
// ADMIN - APPROVE REQUEST
// =========================================================

@Override
public RequestResponseDTO approveRequest(
        Long requestId) {

    Request request = reqRepo.findById(requestId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Request Not Found"
                    )
            );

    request.setStatus(RequestStatus.APPROVED);

    reqRepo.save(request);

    return toRequestResponseDTO(request);
}

// =========================================================
// ADMIN - REJECT REQUEST
// =========================================================

@Override
public RequestResponseDTO rejectRequest(
        Long requestId) {

    Request request = reqRepo.findById(requestId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Request Not Found"
                    )
            );

    request.setStatus(RequestStatus.REJECTED);

    reqRepo.save(request);

    return toRequestResponseDTO(request);
}

private RequestResponseDTO toRequestResponseDTO(
        Request request) {

    RequestResponseDTO dto =
            new RequestResponseDTO();

    dto.setId(request.getId());
    dto.setRequestType(
            request.getRequestType()
    );
    dto.setStatus(
            request.getStatus()
    );
    dto.setMealPreference(
            request.getMealPreference()
    );
    dto.setFoodCategory(
            request.getFoodCategory()
    );
    dto.setEstimatedMeals(
            request.getEstimatedMeals()
    );
    dto.setPickUpAddress(
            request.getPickUpAddress()
    );
    dto.setDeliveryAvailable(
            request.isDeliveryAvailable()
    );
    dto.setNeededBy(
            request.getNeededBy()
    );
    dto.setNotes(
            request.getNotes()
    );
    dto.setCreatedAt(
            request.getCreatedAt()
    );
    dto.setLatitude(
            request.getLatitude()
    );
    dto.setLongitude(
            request.getLongitude()
    );

    return dto;
}

// =========================================================
// ADMIN - MATCHING QUEUE
// =========================================================

@Override
public List<Matches> getMatchingQueue() {

    return matchRepo.findByMatchStatus(
            MatchStatus.PENDING
    );
}

// =========================================================
// ADMIN - ANALYTICS
// =========================================================

@Override
public AdminDashboardDTO getAnalytics() {

    AdminDashboardDTO dto =
            new AdminDashboardDTO();

    dto.setTotalUsers(
            userRepo.count()
    );

    dto.setPendingUsers(
            userRepo.countByStatus(
                    UserStatus.PENDING
            )
    );

    dto.setTotalRequests(
            reqRepo.count()
    );

    dto.setPendingRequests(
            reqRepo.countByStatus(
                    RequestStatus.PENDING
            )
    );

    dto.setTotalMatches(
            matchRepo.count()
    );

    dto.setTotalDeliveries(
            deliveryRepo.count()
    );

    dto.setCompletedDeliveries(
            deliveryRepo.countByStatus(
                    DeliveryStatus.COMPLETED
            )
    );

    return dto;
}

}