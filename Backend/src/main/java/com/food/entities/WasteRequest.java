package com.food.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "waste_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WasteRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "match_id")
    private Matches match;

    @ManyToOne
    @JoinColumn(name = "industry_id")
    private BiogasIndustry industry;

    @ManyToOne
    @JoinColumn(name = "volunteer_id")
    private User volunteer;

    @Enumerated(EnumType.STRING)
    private WasteStatus status;

    private String remarks;

    private LocalDateTime createdAt;
}