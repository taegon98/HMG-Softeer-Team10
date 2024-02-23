package com.genesisairport.reservation.service.admin;

import com.genesisairport.reservation.common.enums.ResponseCode;
import com.genesisairport.reservation.common.exception.GeneralException;
import com.genesisairport.reservation.common.util.CommonDateFormat;
import com.genesisairport.reservation.entity.AvailableTime;
import com.genesisairport.reservation.entity.RepairShop;
import com.genesisairport.reservation.repository.AvailableTimeRepository;
import com.genesisairport.reservation.repository.RepairShopRepository;
import com.genesisairport.reservation.request.AdminRequest;
import com.genesisairport.reservation.response.AdminResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AShopService {
    private final RepairShopRepository repairShopRepository;
    private final AvailableTimeRepository availableTimeRepository;

    public ResponseCode addAvailableTime(AdminRequest.ReservationTime requestBody) {
        Date date = CommonDateFormat.date(requestBody.getBusinessDay());
        Time time = CommonDateFormat.time(requestBody.getBusinessDay());

        Optional<RepairShop> repairShop = repairShopRepository.findByShopName(requestBody.getShopName());
        if (repairShop.isEmpty()) {
            throw new GeneralException(ResponseCode.NOT_FOUND, "존재하지 않는 지점명입니다.");
        }

        Optional<AvailableTime> exactAvailableTime = availableTimeRepository.findExactAvailableTime(repairShop.get().getId(), date, time);
        if (exactAvailableTime.isPresent()) {
            throw new GeneralException(ResponseCode.CONFLICT, "이미 추가된 시간입니다.");
        }

        AvailableTime availableTime = AvailableTime.builder()
                .repairShop(repairShop.get())
                .reservationDate(date)
                .reservationTime(time)
                .reservationCount(repairShop.get().getCapacityPerTime())
                .createDatetime(LocalDateTime.now())
                .updateDatetime(LocalDateTime.now())
                .build();

        availableTimeRepository.save(availableTime);

        return ResponseCode.OK;
    }

    public ResponseCode deleteAvailableTime(AdminRequest.ReservationTime requestBody) {
        String shopName = requestBody.getShopName();
        String businessDay = requestBody.getBusinessDay();

        Date date = Date.valueOf(LocalDate.parse(businessDay.split(" ")[0]));
        Time time = Time.valueOf(LocalTime.parse(businessDay.split(" ")[1]));

        Optional<RepairShop> repairShop = repairShopRepository.findByShopName(shopName);
        if (repairShop.isEmpty()) {
            throw new GeneralException(ResponseCode.NOT_FOUND, "유효하지 않은 지점명입니다.");
        }

        Optional<AvailableTime> exactAvailableTime = availableTimeRepository.findExactAvailableTime(repairShop.get().getId(), date, time);
        if (exactAvailableTime.isEmpty()) {
            throw new GeneralException(ResponseCode.BAD_REQUEST, "시간 정보가 존재하지 않습니다.");
        }
        availableTimeRepository.delete(exactAvailableTime.get());
        return ResponseCode.OK;
    }

    public List<AdminResponse.AvailableTime> getAvailableTime(AdminRequest.ReservationTimeRange requestBody) {
        LocalDate dateFrom = LocalDate.parse(requestBody.getBusinessDayFrom());
        LocalDate dateTo = LocalDate.parse(requestBody.getBusinessDayTo());

        return availableTimeRepository.findAvailableTimeList(requestBody.getShopName(), dateFrom, dateTo);
    }
}
