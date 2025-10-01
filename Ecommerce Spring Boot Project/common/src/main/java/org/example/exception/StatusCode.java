package org.example.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum StatusCode {
    SUCCESS(1000, "SUCCESS", org.springframework.http.HttpStatus.OK),
    DUPLICATE(1001, "DUPLICATE", org.springframework.http.HttpStatus.OK),
    INVALID_KEY(1002, "INVALID KEY", org.springframework.http.HttpStatus.BAD_REQUEST),
    BAD_REQUEST(1003, "BAD REQUEST", org.springframework.http.HttpStatus.BAD_REQUEST),
    DATA_NOT_EXISTED(1005, "DATA NOT EXISTED", org.springframework.http.HttpStatus.NOT_FOUND),
    DATA_EXISTED(1006, "DATA EXISTED", org.springframework.http.HttpStatus.CONFLICT),
    PARAM_NULL(1007, "PARAM NULL", org.springframework.http.HttpStatus.BAD_REQUEST),
    NOT_PERMIT(1008, "NOT_PERMIT", org.springframework.http.HttpStatus.BAD_REQUEST),
    BAD_REQUEST_BE_TRANSLATED(4001, "BAD_REQUEST_BE_TRANSLATED", org.springframework.http.HttpStatus.BAD_REQUEST),
    BAD_REQUEST_BE_TRANSLATED_OPEN_PU_INFO(4002, "BAD_REQUEST_BE_TRANSLATED_OPEN_PU_INFO", org.springframework.http.HttpStatus.BAD_REQUEST),
    BAD_REQUEST_BE_TRANSLATED_OPEN_PU_WARNING(4003, "BAD_REQUEST_BE_TRANSLATED_OPEN_PU_WARNING", org.springframework.http.HttpStatus.BAD_REQUEST),
    BAD_REQUEST_NEED_BE_TRANSLATED(4004, "BAD_REQUEST_NEED_BE_TRANSLATED", org.springframework.http.HttpStatus.BAD_REQUEST),
    UNCATEGORIZED_EXCEPTION(9999, "UNCATEGORIZED ERROR", org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_STATE(2001, "INVALID STATE", HttpStatus.BAD_REQUEST),
    ;

    private final int code;
    private final HttpStatusCode httpStatusCode;
    private String message;
    StatusCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }

    // Method to set dynamic message
    public StatusCode withMessage(String message) {
        this.message = message;
        return this;
    }
}
