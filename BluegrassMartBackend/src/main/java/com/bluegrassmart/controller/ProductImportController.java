package com.bluegrassmart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bluegrassmart.service.ProductImportService;

@RestController
@RequestMapping("/api/import")
public class ProductImportController {

    @Autowired
    private ProductImportService importService;
    
    @PostMapping("/excel")
    public ResponseEntity<String> importExcelFromBackendFile() {
        try {
            // Use path inside your backend project
            String filePath = "src/main/resources/productList.xlsx";
            importService.importFromFilePath(filePath);
            return ResponseEntity.ok("Import successful!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to import: " + e.getMessage());
        }
    }

}