package com.bluegrassmart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
//@EntityScan("com.bluegreenmart.model")
public class BluegreenMartBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BluegreenMartBackendApplication.class, args);
	}

}
