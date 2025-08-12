package com.bluegrassmart.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bluegrassmart.dto.ProductDTO;
import com.bluegrassmart.model.Product;
import com.bluegrassmart.model.ProductImage;
import com.bluegrassmart.repository.ProductRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setPrice(product.getPrice());
            dto.setCategory(product.getCategory()); // 
            dto.setImages(product.getImages().stream()
                .map(ProductImage::getImageName)
                .collect(Collectors.toList()));
            return dto;
        }).collect(Collectors.toList());
    }
}

