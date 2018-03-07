<!--需求面增加需求编码-->
ALTER TABLE `pmo_requirements`
ADD COLUMN `req_code`  varchar(38) NULL COMMENT '需求编码' AFTER `id`;

<!--邮件模板-->
DROP TABLE IF EXISTS `sys_email_template`;
CREATE TABLE `sys_email_template` (
  `id` varchar(38) NOT NULL,
  `title` varchar(100) DEFAULT NULL COMMENT '模板标题',
  `content` text COMMENT '模板内容',
  `tags` varchar(50) DEFAULT NULL COMMENT '模板标签',
  `status` int(5) DEFAULT NULL COMMENT '模板状态',
  `create_time` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

<!--crm跟进记录添加跟进时间-->
ALTER TABLE `crm_follow`
ADD COLUMN `follow_time`  bigint(20) NULL COMMENT '跟进时间' AAFTER `add_person_name`;