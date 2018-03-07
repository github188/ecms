package com.ecaray.ecms.services.email;

import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.Vo.UserContacts;
import com.ecaray.ecms.entity.pmo.Vo.MailVo;
import com.ecaray.ecms.entity.sys.SysEmailTemplate;
import com.ecaray.ecms.services.authority.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * com.ecaray.imspmo.services.email Author ：zhxy 2016/11/30 17:53
 * 说明：邮件发送的支线任务，不影响主线任务的运行
 */
@Service
public class MailSendThread extends Thread {

	public static LinkedBlockingQueue<MailVo> queue = new LinkedBlockingQueue();
	Logger logger = LoggerFactory.getLogger(MailSendThread.class);
	@Autowired
	MailSendService mailSendService;
	@Autowired
	private UserService userService;
	@Value("${mail.oa.url}")
	String oaUrl;
	@Value("${mail.isSend}")
	String isSendMail;

	@Override
	public void run() {
		while (true) {
			try {
				MailVo mailVo = queue.take();// wait
				if ("false".equals(isSendMail)) {
					mailVo = null;
					Thread.sleep(1);
				}
				List<String> baseUserList = mailVo.getReceiver();
				String userIds = "";
				int size = baseUserList.size();
				if (size == 0)
					continue;
				for (int i = 0; i < size; i++) {
					userIds += baseUserList.get(i) + ",";
				}
				userIds = userIds.substring(0, userIds.length() - 1);
				Map<String, String> userMaps = new HashMap<String, String>();
				userMaps.put("userIds", userIds);
				Result userResult = userService.selectUserContacts(userIds);

				List<UserContacts> ja = (ArrayList<UserContacts>) userResult.getContent();
				if (ja == null || ja.isEmpty()) {
					continue;
				}
				List<UserContacts> sendsJa = new ArrayList<>();
				for (UserContacts uc : ja) {
					if (StringUtils.isEmpty(uc.getEmail())) {
						continue;
					} else {
						sendsJa.add(uc);
					}
				}
				if (sendsJa.isEmpty()) {
					continue;
				}
				int jsize = sendsJa.size();
				String[] receiverUsers = new String[jsize];
				for (int i = 0; i < jsize; i++) {
					UserContacts jb = sendsJa.get(i);
					receiverUsers[i] = jb.getEmail();
				}
				Map<String, String> params = mailVo.getParams();
				String mailKey = mailVo.getMailKey();
				String mailHtmlText = selectEmailContentByKey(mailKey);
				if (StringUtils.isEmpty(mailHtmlText)) {
					logger.info("未取到正确的邮件模板，邮件发送失败!");
					continue;
				}
				Iterator<Map.Entry<String, String>> it = params.entrySet().iterator();
				String key;
				String value;
				Map.Entry<String, String> entry;
				while (it.hasNext()) {
					entry = it.next();
					key = "#" + entry.getKey() + "#";
					value = entry.getValue();
					mailHtmlText = mailHtmlText.replace(key, value + "");
				}
				String endMessage = "<p>更多详情和操作请登录<a href='" + oaUrl + "'>EAP系统</a>操作</p>" + "<p>此为系统邮件，请勿回复。</p></body>";
				mailHtmlText = "<body>" + mailHtmlText + endMessage;
				mailSendService.sendHTMLMail(mailVo.getSubject(), mailHtmlText, receiverUsers);
			} catch (Exception e) {
				// 防止因为错误导致的线程终止
				e.printStackTrace();
				logger.debug("邮件发送失败！," + e.getMessage());
			}
		}
	}

	public String selectEmailContentByKey(String mailKey) {
		SysEmailTemplate sysEmailTemplate = mailSendService.selectEmailTemplateByKey(mailKey);
		return sysEmailTemplate.getContent();
	}

	/**
	 * Author ：zhxy 说明：新建项目
	 */
	public String projectMailMessage() {
		// projectMailMessage
		StringBuffer sb = new StringBuffer("");
		sb.append("<p>").append("您好,有一个新的PMO项目需要您参与。</p>").append("<p>项目名称:#proName#</p>")
				.append("<p>营销中心:#marktName#</p>").append("<p>所属区域:#provinceName#-#cityName#-#areaName#</p>")
				.append("<p>项目背景:#proContents#</p>").append("<p>市场负责人:#marketPerson#</p>")
				.append("<p>项目经理:#proManager#</p>").append("<p>项目成员:#Participant#</p>");
		return sb.toString();
	}

	/**
	 * Author ：zhxy 说明：需求审核提醒
	 */
	public String requireVerify() {
		//

		StringBuffer sb = new StringBuffer("");
		sb.append("<p>需求标题:#requireName#</p>").append("<p>需求详情:#reqDetail#</p>");
		return sb.toString();
	}

	/**
	 * Author ：zhxy 说明：审核被否决
	 */
	public String requireReject() {

		StringBuffer sb = new StringBuffer("");
		sb.append("<p>您好</p>").append("<p>您在【#proName#】项目中【#requireName#】的需求被驳回了，驳回理由：</p>")
				.append("<p>#rejectReason#</p>");
		return sb.toString();
	}

	/**
	 * Author ：zhxy 说明：二审通知
	 */
	public String requireVerify2() {
		// requireVerify2
		StringBuffer sb = new StringBuffer("");
		sb.append("<p>需求标题:#requireName#</p>").append("<p>需求详情:#reqDetail#</p>");
		return sb.toString();
	}

	/**
	 * Author ：zhxy 说明：反馈
	 */
	public String requireAct() {
		StringBuffer sb = new StringBuffer("");
		sb.append("<p>项目编码:#proCode#</p>").append("<p>需求标题:#requireName#</p>").append("<p>需求反馈:#reqFadeback#</p>");
		return sb.toString();
	}

	public String taskDistribute() {
		// taskDistribute
		StringBuffer sb = new StringBuffer("<body>");
		sb.append("<p>项目标题:#proName#</p>").append("<p>需求标题:#requireName#</p>")
				.append("<p>任务开始时间:#startTime# - 任务结束时间:#endTime#</p>").append("<p>任务详情:#reqDetail#</p>");
		return sb.toString();
	}

	public static void main(String[] args) {
		for (int i = 0; i < 100; i++) {
			System.out.println("UUID:" + UUID.randomUUID());
		}
	}
}
