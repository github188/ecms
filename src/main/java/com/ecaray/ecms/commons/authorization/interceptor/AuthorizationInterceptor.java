package com.ecaray.ecms.commons.authorization.interceptor;


import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.manager.TokenManager;
import com.ecaray.ecms.commons.authorization.model.TokenModel;
import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.exception.AuthorizationException;
import com.ecaray.ecms.commons.exception.ReSubmitException;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.dao.redis.crm.CacheUtils;

/**
 * com.ecaray.authority.authorization.interceptor
 * Author ：zhxy
 * 2017/2/20 20:19
 * 说明：TODO
 */
@Component
public class AuthorizationInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private TokenManager manager;
    @Autowired
    private CacheUtils cacheUtils;
    
    Logger logger = LoggerFactory.getLogger(AuthorizationInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info(request.getRequestURI());
        //如果不是映射到方法直接通过
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod();
        //从header中得到token
        String authorization = request.getHeader(Constants.AUTHORIZATION);
        //验证token
        TokenModel model = manager.getToken(authorization);
        if (manager.checkToken(model)) {
            //如果token验证成功，将token对应的用户id存在request中，便于之后注入
            request.setAttribute(Constants.CURRENT_USER_ID, model.getUserId());
            if (method.getName().contains("create")) {
            	 String key = "EAP_USER_API_"+ model.getUserId() + "_" + method.getName();
                 request.setAttribute("EAP_USER_API", key);
                 if (cacheUtils.get(key) == null) {
                 	cacheUtils.set(key, DateUtil.nowTime());
                 	System.out.println(cacheUtils.get(key));
                 } else {
                 	Long timestmp = (Long) cacheUtils.get(key);
                 	System.out.println(timestmp);
                 	if (DateUtil.nowTime() - timestmp < 3000 && DateUtil.nowTime() - timestmp > 0) {
                 		throw new ReSubmitException("您的操作太快了，请刷新一下再试把");
                 	}
                 }
            }
            return true;
        }
        //如果验证token失败，并且方法注明了Authorization，返回401错误(未授权)
        if (method.getAnnotation(Authorization.class) != null) {
            response.setHeader("Access-Control-Allow-Origin","*");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            throw new AuthorizationException("身份验证失败!");
//            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (request != null && request.getAttribute("EAP_USER_API") !=null) {
        	String key = request.getAttribute("EAP_USER_API").toString();
            System.out.println(cacheUtils.get(key));
            cacheUtils.remove(key);
        }
    	super.postHandle(request, response, handler, modelAndView);
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        response.setHeader("Access-Control-Expose-Headers","X-TotalCount");
        response.setHeader("Access-Control-Allow-Headers",
                "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,Content-Disposition, Access-Control-Request-Method, Access-Control-Request-Headers,authorization");
        response.setHeader("Content-Type", "text/html;charset=utf-8");
    }
}

