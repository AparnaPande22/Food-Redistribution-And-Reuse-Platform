package com.food.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "biogas_industries")
@Getter
@Setter
@NoArgsConstructor
public class BiogasIndustry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String industryName;

    private String contactPerson;

    private String email;

    private String phone;

    private String address;

    private Double latitude;

    private Double longitude;
}