package com.bluegrassmart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bluegrassmart.model.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {}
