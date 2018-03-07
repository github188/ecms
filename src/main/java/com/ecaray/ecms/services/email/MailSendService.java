package com.ecaray.ecms.services.email;

import com.ecaray.ecms.commons.utils.CompressUtil;
import com.ecaray.ecms.dao.mapper.sys.SysEmailTemplateMapper;
import com.ecaray.ecms.entity.sys.SysEmailTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

import java.io.File;

/**
 * 邮件发送服务
 * com.ecaray.authmanager.services.email
 * Author ：zhxy
 * 2016/11/18 17:40
 * 说明：TODO
 */
@Service
public class MailSendService {

    Logger logger = LoggerFactory.getLogger(MailSendService.class);
    @Value("${mail.sender}")
    public String sender;
    @Autowired
    @Qualifier("mailSender")
    public JavaMailSenderImpl javaMailSenderImpl;
    @Autowired
    public SysEmailTemplateMapper sysEmailTemplateMapper;

    /**
     * Author ：zhxy
     * 说明：发送带附件的邮件
     */
    public void sendFileEmail(final String subject,final String text,final String[] receiveUser, final File attachment) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    MimeMessage mailMessage = javaMailSenderImpl.createMimeMessage();
                    MimeMessageHelper messageHelper = new MimeMessageHelper(mailMessage, true, "utf-8");
                    //设置自定义发件人昵称  
                    String nick="";  
                    try {  
                        nick=MimeUtility.encodeText("亿车EAP");  
                    } catch (Exception e) {  
                        e.printStackTrace();  
                    }   
                    messageHelper.setFrom(new InternetAddress(nick+" <"+sender+">"));  
                    // 收件人
                    messageHelper.setTo(receiveUser);
                    // 邮件主题
                    messageHelper.setSubject(subject);
                    //邮件内容
                    messageHelper.setText(text);
                    String zipName = attachment.getParent() + "/" + System.currentTimeMillis() + ".zip";
                    CompressUtil.zip(attachment, zipName);
                    File zipFile = new File(zipName);
                    messageHelper.addAttachment(zipName, zipFile);
                    // 发送邮件
                    javaMailSenderImpl.send(mailMessage);
                    zipFile.delete();
                    logger.info("email send success,receiver:"+receiveUser.toString());
                } catch (Exception e) {
                    logger.debug("发送邮件异常："+e.getMessage());
                }
            }
        }).start();
    }
    /**
     * @Title: sendTextMail
     * @Description: 发送纯文本邮件
     * @param @param subject
     * @param @param text
     * @param @param receiveUser
     * @return void
     */
    public void sendTextMail(String subject, String text,String[] receiveUser) {
        try {
            // 建立邮件消息
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            // 设置收件人，寄件人 用数组发送多个邮件
            mailMessage.setTo(receiveUser);
            mailMessage.setFrom(sender);
            mailMessage.setSubject(subject);
            mailMessage.setText(text);
            // 发送邮件
            javaMailSenderImpl.send(mailMessage);
            logger.info("email send success!");
        } catch (Exception ex) {
            logger.debug("发送邮件异常："+ex.getMessage());
        }

    }
    /**
     * @Title: sendHTMLMail
     * @Description: 发送html内容邮件
     * @param @param subject
     * @param @param html
     * @param @param receiveUser
     */
    public void sendHTMLMail(String subject, String html,String[] receiveUser){
        MimeMessage mailMessage = javaMailSenderImpl.createMimeMessage();
        try {
            mailMessage.setHeader("X-Priority", "1");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        MimeMessageHelper messageHelper = null;
        try {
            messageHelper = new MimeMessageHelper(mailMessage,true,"utf-8");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        // 设置收件人，寄件人
        try {
            messageHelper.setTo(receiveUser);
            String nick = "";
            try {  
                nick=MimeUtility.encodeText("亿车EAP");  
            } catch (Exception e) {  
                e.printStackTrace();  
            }   
            messageHelper.setFrom(new InternetAddress(nick+" <"+sender+">"));  
            messageHelper.setSubject(subject);
            // true 表示启动HTML格式的邮件
            messageHelper.setText(html, true);
            // 发送邮件
            javaMailSenderImpl.send(mailMessage);
            logger.info("email send success,receiver:"+receiveUser);
        } catch (Exception e) {
            logger.debug("发送邮件异常："+e.getMessage());
            e.printStackTrace();
        }
    }


    /**
     * Author ：zhxy
     * 说明：根据邮件Key 获取邮件模板
     */

    public SysEmailTemplate selectEmailTemplateByKey(String key){
        SysEmailTemplate sysEmailTemplate =  sysEmailTemplateMapper.selectByPrimaryKey(key);
        return sysEmailTemplate;
    }
}
