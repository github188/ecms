package com.junit.test;

import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath*:/spring/spring-context.xml","classpath*:/spring/spring-mvc.xml"})
@WebAppConfiguration
public class BaseJunit4Test {
        @Before
        public void startTest(){
                System.out.println("start test...");
        }
        @After
        public void endTest(){
                System.out.println("end test...");
        }
    }