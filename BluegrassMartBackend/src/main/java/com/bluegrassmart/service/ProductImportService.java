package com.bluegrassmart.service;

import java.io.FileInputStream;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bluegrassmart.model.Product;
import com.bluegrassmart.model.ProductImage;
import com.bluegrassmart.repository.ProductRepository;

@Service
public class ProductImportService {

    @Autowired
    private ProductRepository productRepository;
    
    public void importFromFilePath(String filePath) throws Exception {
        FileInputStream fis = new FileInputStream(filePath);
        Workbook workbook = new XSSFWorkbook(fis);
        Sheet sheet = workbook.getSheetAt(0);

        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue; // skip header row

            String name = row.getCell(0).getStringCellValue();
            double price = row.getCell(1).getNumericCellValue();
            String[] images = row.getCell(2).getStringCellValue().split(",");
            String category = row.getCell(3).getStringCellValue();
          Product product = productRepository.findByName(name).orElse(new Product());
          product.setName(name);
          product.setPrice(price);
          
          product.clearImages();
          
          for (String img : images) {
              ProductImage image = new ProductImage();
              image.setImageName(img.trim());
              image.setProduct(product);
              product.getImages().add(image);
          }
          product.setCategory(category);
            productRepository.save(product);
        }

        workbook.close();
        fis.close();
    }


//    public void importFromExcel(MultipartFile file) throws Exception {
//        Workbook workbook = new XSSFWorkbook(file.getInputStream());
//        Sheet sheet = workbook.getSheetAt(0);
//
//        for (Row row : sheet) {
//            if (row.getRowNum() == 0) continue; // Skip header row
//
//            String name = row.getCell(0).getStringCellValue();
//            double price = row.getCell(1).getNumericCellValue();
//            String[] images = row.getCell(2).getStringCellValue().split(",");
//
//            Product product = new Product();
//            product.setName(name);
//            product.setPrice(price);
//
//            for (String img : images) {
//                ProductImage image = new ProductImage();
//                image.setImageName(img.trim());
//                image.setProduct(product);
//                product.getImages().add(image);
//            }
//
//            productRepository.save(product); // saves all in one transaction
//        }
//
//        workbook.close();
//    }
}

