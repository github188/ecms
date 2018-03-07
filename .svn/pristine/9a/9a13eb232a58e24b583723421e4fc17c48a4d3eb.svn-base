package com.ecaray.ecms.commons.constant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ecaray.ecms.services.common.InitService;
import com.ecaray.ecms.services.email.MailSendThread;

/**
 * com.ecaray.owms.commons
 * Author ：zhxy
 * 2016/11/30 18:22
 * 说明：初始化 缓存等基础服务
 */
@SuppressWarnings("ALL")
@Component
public class InitLoad implements InitializingBean {
    @Autowired
    MailSendThread mailSendThread;

    @Autowired
    InitService initService;

    Logger logger = LoggerFactory.getLogger(InitLoad.class);
    public void afterPropertiesSet() throws Exception {
        //加载邮件发送线程
        mailSendThread.start();
        logger.info("邮件服务启动完毕...");
        //缓存数据
        initService.init();
        logger.info("常量数据缓存完毕...");
    }
}
