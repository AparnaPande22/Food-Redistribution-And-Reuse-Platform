package com.food.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.food.DTO.AdminDashboardDTO;
import com.food.DTO.DonorDashboardDTO;
import com.food.DTO.ImpactDashboardDTO;
import com.food.DTO.MonthlyStatisticsDTO;
import com.food.DTO.WasteDashboardDTO;
import com.food.entities.DeliveryStatus;
import com.food.entities.RequestStatus;
import com.food.entities.Role;
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
public class DashboardServiceImpl implements DashboardService {

	private final UserRepository userRepo;
	private final RequestRepository reqRepo;
	private final MatchesRepository matchRepo;
	private final DeliveryRepository deliveryRepo;
	private final RequestItemRepository itemRepo;
	private final WasteService wasteService;

	@Override
	public AdminDashboardDTO getAdminDashboard() {

		AdminDashboardDTO dto = new AdminDashboardDTO();

		dto.setTotalUsers(userRepo.count());

		dto.setPendingUsers(userRepo.countByStatus(UserStatus.PENDING));

		dto.setTotalRequests(reqRepo.count());

		dto.setPendingRequests(reqRepo.countByStatus(RequestStatus.PENDING));

		dto.setTotalMatches(matchRepo.count());

		dto.setTotalDeliveries(deliveryRepo.count());

		dto.setCompletedDeliveries(deliveryRepo.countByStatus(DeliveryStatus.COMPLETED));

		return dto;
	}

	@Override
	public DonorDashboardDTO getDonorDashboard(Long userId) {

		DonorDashboardDTO dto = new DonorDashboardDTO();

		dto.setActiveRequests(reqRepo.countByUser_IdAndStatus(userId, RequestStatus.ACTIVE));

		dto.setCancelledRequests(reqRepo.countByUser_IdAndStatus(userId, RequestStatus.CANCELLED));

		dto.setCompletedRequests(reqRepo.countByUser_IdAndStatus(userId, RequestStatus.COMPLETED));

		dto.setTotalRequests(reqRepo.countByUser_Id(userId));

		return dto;
	}

	@Override
	public ImpactDashboardDTO getImpactDashboard() {

		ImpactDashboardDTO dto = new ImpactDashboardDTO();

		dto.setTotalCompletedDonations(reqRepo.countByStatus(RequestStatus.COMPLETED));

		dto.setTotalCompletedDeliveries(deliveryRepo.countByStatus(DeliveryStatus.COMPLETED));

		dto.setTotalDonors(userRepo.countByAccountType(Role.DONOR));

		dto.setTotalReceivers(userRepo.countByAccountType(Role.RECEIVER));

		dto.setTotalMatches(matchRepo.count());

		dto.setTotalFoodQuantity(itemRepo.getTotalFoodQuantity());

		return dto;
	}

	@Override
	public List<MonthlyStatisticsDTO> getMonthlyStatistics() {

		List<Object[]> result = reqRepo.getMonthlyDonations();

		List<MonthlyStatisticsDTO> statistics = new ArrayList<>();

		String[] months = { "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };

		for (Object[] row : result) {

			Integer monthNo = (Integer) row[0];
			Long total = (Long) row[1];

			statistics.add(new MonthlyStatisticsDTO(months[monthNo], total));
		}

		return statistics;
	}

	@Override
	public WasteDashboardDTO getWasteDashboard() {
		 Long pendingAssignments =
		            reqRepo.countByStatus(RequestStatus.WASTE_ASSIGNED);

		    Long completedProcesses =
		            reqRepo.countByStatus(RequestStatus.WASTE_PROCESSED);

		    Double totalBiogas =
		            reqRepo.getTotalBiogasGenerated();

		    Double totalFertilizer =
		            reqRepo.getTotalFertilizerGenerated();

		    Long totalWasteProcessed = completedProcesses;

		    return new WasteDashboardDTO(
		            pendingAssignments,
		            completedProcesses,
		            totalBiogas,
		            totalFertilizer,
		            totalWasteProcessed
		    );
	}

}
