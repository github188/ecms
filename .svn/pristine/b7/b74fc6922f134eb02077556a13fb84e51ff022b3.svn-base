package com.ecaray.ecms.controller.authority;


import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.authorization.manager.TokenManager;
import com.ecaray.ecms.commons.authorization.model.TokenModel;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.services.authority.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * com.ecaray.authority.controller
 * Author ：zhxy
 * 2017/2/8 10:34
 * 说明：获取和删除token的请求地址，在Restful设计中其实就对应着登录和退出登录的资源映射
 */
@RestController
@RequestMapping("authority/account")
public class AccountController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenManager tokenManager;

    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public ResponseEntity<Result> login(@RequestParam String username, @RequestParam String password) {
        User user = userService.selectUserByAccount(username);

        if (user == null ||  //未注册
                !user.getPassword().equals(password)) {  //密码错误
            //提示用户名或密码错误
            return new ResponseEntity(Result.failed("账号或密码错误"), HttpStatus.OK);
        }
        //生成一个token，保存用户登录状态
        TokenModel model = tokenManager.createToken(user.getId());
        model.setRealname(user.getRealname());
        return new ResponseEntity(Result.success().addObject(model), HttpStatus.OK);
    }

    @RequestMapping(value = "/logout",method = RequestMethod.GET)
    @Authorization
    public ResponseEntity<Result> logout(@CurrentUser User user) {
        tokenManager.deleteToken(user.getId());
        return new ResponseEntity(Result.success(), HttpStatus.OK);
    }

    @RequestMapping(value ="/confirm" ,method = RequestMethod.GET)
    @Authorization
    public ResponseEntity<Result> confirm(@CurrentUser User user) {
        return new ResponseEntity(Result.success(), HttpStatus.OK);
    }

}
