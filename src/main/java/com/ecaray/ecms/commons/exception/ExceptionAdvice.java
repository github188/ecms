package com.ecaray.ecms.commons.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.ecaray.ecms.commons.constant.Result;

/**
 * com.ecaray.owms.commons.exception
 * Author ：zhxy
 * 2016/12/2 11:51
 * 说明：Controller切面，捕获全局异常并返回统一错误码，
 * 这里的错误码因为前段人员处理不了，只能返回200， 然后讲权限码放入 code来处理
 */
@ControllerAdvice
@ResponseBody
public class ExceptionAdvice {
    public static Logger logger = LoggerFactory.getLogger(ExceptionAdvice.class);

    /**
     * Author ：zhxy
     * 说明：400 - Bad Request
     */
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public Result handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        logger.error("json 参数解析失败", e);
        return  Result.error(HttpStatus.BAD_REQUEST.value()+"","请求参数解析失败!");
    }
    

    /**
     * Author ：zhxy
     * 说明：401 身份验证错误
     */
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(AuthorizationException.class)
    public Result authorizationException(Exception e){
        logger.error("身份验证异常", "user authority error");
        return  Result.error(HttpStatus.UNAUTHORIZED.value()+"","身份验证失败!");
    }

    /**
     * Author ：zhxy
     * 405 - Method Not Allowed
     */
//    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public Result handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        logger.error("不支持当前请求方法", e);
        return  Result.error(HttpStatus.METHOD_NOT_ALLOWED.value()+"","请求方法错误!");
    }

    /**
     * Author ：zhxy
     * 415 - Unsupported Media Type
     */
//    @ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public Result handleHttpMediaTypeNotSupportedException(Exception e) {
        logger.error("不支持当前媒体类型", e);
        return  Result.error(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value()+"","不支持当前媒体类型!");
    }

    /**
     * Author ：zhxy
     * 500 - Internal Server Error
     */
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(Exception.class)
    public Result handleException(Exception e) {
        logger.error("服务运行异常", e);
        return Result.error(HttpStatus.INTERNAL_SERVER_ERROR.value()+"","服务运行异常!");
    }

    /**
     * Author ：zhxy
     * 说明：417 flow submit error
     */
//    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(FlowSubmitException.class)
    public Result handleFlowSubmitException(Exception e){
        logger.error("流程提交异常", e);
        return  Result.error(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value()+"","流程提交异常!" + e.getMessage());
    }
    
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(ProcessSubmitException.class)
    public Result handleProcessSubmitException(RuntimeException e){
    	logger.error("流程初始化异常", e);
    	return  Result.error(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value()+"", e.getMessage());
    }
    
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(ReSubmitException.class)
    public Result reSubmitException(RuntimeException e){
    	return  Result.failed(e.getMessage());
    }


}