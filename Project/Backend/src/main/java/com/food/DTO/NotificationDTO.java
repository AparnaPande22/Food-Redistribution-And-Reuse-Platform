package com.food.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationDTO {
	  @NotNull(message = "User ID is required")
	 private Long userId;

	    @NotBlank(message = "Title is required")
	    @Size(max = 100)
	    private String title;

	    @NotBlank(message = "Message is required")
	    @Size(max = 500)
	    private String message;

	    @NotBlank(message = "Type is required")
	    private String type;
}
