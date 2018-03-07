package com.junit.test;

import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.services.authority.UserService;
import org.springframework.beans.factory.annotation.Autowired;

public class TestCastTeest extends BaseJunit4Test {

    @Autowired
    UserService userService;
    @org.junit.Test
    public void testCase(){
        Result result = userService.selectUserBaseInfoList();
        System.out.println(result);
        junit.framework.Assert.assertTrue("success".equals(result.getCode()));
    }
}
