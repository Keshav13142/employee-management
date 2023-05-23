package com.cognizant.EMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.EMS.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

  Admin getByEmailId(String emailId);

}
