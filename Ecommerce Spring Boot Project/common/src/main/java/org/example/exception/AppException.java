package org.example.exception;

import lombok.Getter;
import org.springframework.http.HttpStatusCode;

@Getter
public class AppException extends RuntimeException{
    private final StatusCode code;
    private final String field;

    public AppException(StatusCode code, String message, String field) {
        super(message);
        this.code = code;
        this.field = field;
    }

    public int getCode() {
        return code.getCode();
    }

    public HttpStatusCode getHttpStatus() {
        return code.getHttpStatusCode();
    }
}
