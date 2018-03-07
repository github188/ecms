/*
Navicat MySQL Data Transfer

Source Server         : 81测试服务器
Source Server Version : 50627
Source Host           : 192.168.8.81:3306
Source Database       : ecaray_ims

Target Server Type    : MYSQL
Target Server Version : 50627
File Encoding         : 65001

Date: 2017-05-14 20:13:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ACT_EVT_LOG
-- ----------------------------
DROP TABLE IF EXISTS `ACT_EVT_LOG`;
CREATE TABLE `ACT_EVT_LOG` (
  `LOG_NR_` bigint(20) NOT NULL AUTO_INCREMENT,
  `TYPE_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TIME_STAMP_` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DATA_` longblob,
  `LOCK_OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `LOCK_TIME_` timestamp(3) NULL DEFAULT NULL,
  `IS_PROCESSED_` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`LOG_NR_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_EVT_LOG
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_GE_BYTEARRAY
-- ----------------------------
DROP TABLE IF EXISTS `ACT_GE_BYTEARRAY`;
CREATE TABLE `ACT_GE_BYTEARRAY` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `REV_` int(11) DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DEPLOYMENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `BYTES_` longblob,
  `GENERATED_` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_FK_BYTEARR_DEPL` (`DEPLOYMENT_ID_`),
  CONSTRAINT `ACT_FK_BYTEARR_DEPL` FOREIGN KEY (`DEPLOYMENT_ID_`) REFERENCES `ACT_RE_DEPLOYMENT` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_GE_BYTEARRAY
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_GE_PROPERTY
-- ----------------------------
DROP TABLE IF EXISTS `ACT_GE_PROPERTY`;
CREATE TABLE `ACT_GE_PROPERTY` (
  `NAME_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `VALUE_` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `REV_` int(11) DEFAULT NULL,
  PRIMARY KEY (`NAME_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_GE_PROPERTY
-- ----------------------------
INSERT INTO `ACT_GE_PROPERTY` VALUES ('next.dbid', '1', '1');
INSERT INTO `ACT_GE_PROPERTY` VALUES ('schema.history', 'create(5.21.0.0)', '1');
INSERT INTO `ACT_GE_PROPERTY` VALUES ('schema.version', '5.21.0.0', '1');

-- ----------------------------
-- Table structure for ACT_HI_ACTINST
-- ----------------------------
DROP TABLE IF EXISTS `ACT_HI_ACTINST`;
CREATE TABLE `ACT_HI_ACTINST` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `ACT_ID_` varchar(255) COLLATE utf8_bin NOT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `CALL_PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACT_NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ACT_TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `ASSIGNEE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `START_TIME_` datetime(3) NOT NULL,
  `END_TIME_` datetime(3) DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_HI_ACT_INST_START` (`START_TIME_`),
  KEY `ACT_IDX_HI_ACT_INST_END` (`END_TIME_`),
  KEY `ACT_IDX_HI_ACT_INST_PROCINST` (`PROC_INST_ID_`,`ACT_ID_`),
  KEY `ACT_IDX_HI_ACT_INST_EXEC` (`EXECUTION_ID_`,`ACT_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_HI_ACTINST
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_HI_ATTACHMENT
-- ----------------------------
DROP TABLE IF EXISTS `ACT_HI_ATTACHMENT`;
CREATE TABLE `ACT_HI_ATTACHMENT` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `URL_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `CONTENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TIME_` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_HI_ATTACHMENT
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_HI_COMMENT
-- ----------------------------
DROP TABLE IF EXISTS `ACT_HI_COMMENT`;
CREATE TABLE `ACT_HI_COMMENT` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TIME_` datetime(3) NOT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACTION_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `MESSAGE_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `FULL_MSG_` longblob,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_HI_COMMENT
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_HI_DETAIL
-- ----------------------------
DROP TABLE IF EXISTS `ACT_HI_DETAIL`;
CREATE TABLE `ACT_HI_DETAIL` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACT_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin NOT NULL,
  `VAR_TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `REV_` int(11) DEFAULT NULL,
  `TIME_` datetime(3) NOT NULL,
  `BYTEARRAY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DOUBLE_` double DEFAULT NULL,
  `LONG_` bigint(20) DEFAULT NULL,
  `TEXT_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TEXT2_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_HI_DETAIL_PROC_INST` (`PROC_INST_ID_`),
  KEY `ACT_IDX_HI_DETAIL_ACT_INST` (`ACT_INST_ID_`),
  KEY `ACT_IDX_HI_DETAIL_TIME` (`TIME_`),
  KEY `ACT_IDX_HI_DETAIL_NAME` (`NAME_`),
  KEY `ACT_IDX_HI_DETAIL_TASK_ID` (`TASK_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_HI_DETAIL
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_HI_IDENTITYLINK
-- ----------------------------
DROP TABLE IF EXISTS `ACT_HI_IDENTITYLINK`;
CREATE TABLE `ACT_HI_IDENTITYLINK` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `GROUP_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_HI_IDENT_LNK_USER` (`USER_ID_`),
  KEY `ACT_IDX_HI_IDENT_LNK_TASK` (`TASK_ID_`),
  KEY `ACT_IDX_HI_IDENT_LNK_PROCINST` (`PROC_INST_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_HI_IDENTITYLINK
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_HI_PROCINST
-- ----------------------------
DROP TABLE IF EXISTS `ACT_HI_PROCINST`;
CREATE TABLE `ACT_HI_PROCINST` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `BUSINESS_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `START_TIME_` datetime(3) NOT NULL,
  `END_TIME_` datetime(3) DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `START_USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `START_ACT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `END_ACT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `SUPER_PROCESS_INSTANCE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DELETE_REASON_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  UNIQUE KEY `PROC_INST_ID_` (`PROC_INST_ID_`),
  KEY `ACT_IDX_HI_PRO_INST_END` (`END_TIME_`),
  KEY `ACT_IDX_HI_PRO_I_BUSKEY` (`BUSINESS_KEY_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_HI_PROCINST
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_HI_TASKINST
-- ----------------------------
DROP TABLE IF EXISTS `ACT_HI_TASKINST`;
CREATE TABLE `ACT_HI_TASKINST` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_DEF_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PARENT_TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `START_TIME_` datetime(3) NOT NULL,
  `CLAIM_TIME_` datetime(3) DEFAULT NULL,
  `END_TIME_` datetime(3) DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `DELETE_REASON_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `DUE_DATE_` datetime(3) DEFAULT NULL,
  `FORM_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_HI_TASK_INST_PROCINST` (`PROC_INST_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_HI_TASKINST
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_HI_VARINST
-- ----------------------------
DROP TABLE IF EXISTS `ACT_HI_VARINST`;
CREATE TABLE `ACT_HI_VARINST` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin NOT NULL,
  `VAR_TYPE_` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `REV_` int(11) DEFAULT NULL,
  `BYTEARRAY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DOUBLE_` double DEFAULT NULL,
  `LONG_` bigint(20) DEFAULT NULL,
  `TEXT_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TEXT2_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `CREATE_TIME_` datetime(3) DEFAULT NULL,
  `LAST_UPDATED_TIME_` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_HI_PROCVAR_PROC_INST` (`PROC_INST_ID_`),
  KEY `ACT_IDX_HI_PROCVAR_NAME_TYPE` (`NAME_`,`VAR_TYPE_`),
  KEY `ACT_IDX_HI_PROCVAR_TASK_ID` (`TASK_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_HI_VARINST
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_ID_GROUP
-- ----------------------------
DROP TABLE IF EXISTS `ACT_ID_GROUP`;
CREATE TABLE `ACT_ID_GROUP` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `REV_` int(11) DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_ID_GROUP
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_ID_INFO
-- ----------------------------
DROP TABLE IF EXISTS `ACT_ID_INFO`;
CREATE TABLE `ACT_ID_INFO` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `REV_` int(11) DEFAULT NULL,
  `USER_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `VALUE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PASSWORD_` longblob,
  `PARENT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_ID_INFO
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_ID_MEMBERSHIP
-- ----------------------------
DROP TABLE IF EXISTS `ACT_ID_MEMBERSHIP`;
CREATE TABLE `ACT_ID_MEMBERSHIP` (
  `USER_ID_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `GROUP_ID_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`USER_ID_`,`GROUP_ID_`),
  KEY `ACT_FK_MEMB_GROUP` (`GROUP_ID_`),
  CONSTRAINT `ACT_FK_MEMB_GROUP` FOREIGN KEY (`GROUP_ID_`) REFERENCES `ACT_ID_GROUP` (`ID_`),
  CONSTRAINT `ACT_FK_MEMB_USER` FOREIGN KEY (`USER_ID_`) REFERENCES `ACT_ID_USER` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_ID_MEMBERSHIP
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_ID_USER
-- ----------------------------
DROP TABLE IF EXISTS `ACT_ID_USER`;
CREATE TABLE `ACT_ID_USER` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `REV_` int(11) DEFAULT NULL,
  `FIRST_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `LAST_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `EMAIL_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PWD_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PICTURE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_ID_USER
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_PROCDEF_INFO
-- ----------------------------
DROP TABLE IF EXISTS `ACT_PROCDEF_INFO`;
CREATE TABLE `ACT_PROCDEF_INFO` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `INFO_JSON_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  UNIQUE KEY `ACT_UNIQ_INFO_PROCDEF` (`PROC_DEF_ID_`),
  KEY `ACT_IDX_INFO_PROCDEF` (`PROC_DEF_ID_`),
  KEY `ACT_FK_INFO_JSON_BA` (`INFO_JSON_ID_`),
  CONSTRAINT `ACT_FK_INFO_JSON_BA` FOREIGN KEY (`INFO_JSON_ID_`) REFERENCES `ACT_GE_BYTEARRAY` (`ID_`),
  CONSTRAINT `ACT_FK_INFO_PROCDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `ACT_RE_PROCDEF` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_PROCDEF_INFO
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_RE_DEPLOYMENT
-- ----------------------------
DROP TABLE IF EXISTS `ACT_RE_DEPLOYMENT`;
CREATE TABLE `ACT_RE_DEPLOYMENT` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `DEPLOY_TIME_` timestamp(3) NULL DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_RE_DEPLOYMENT
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_RE_MODEL
-- ----------------------------
DROP TABLE IF EXISTS `ACT_RE_MODEL`;
CREATE TABLE `ACT_RE_MODEL` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATE_TIME_` timestamp(3) NULL DEFAULT NULL,
  `LAST_UPDATE_TIME_` timestamp(3) NULL DEFAULT NULL,
  `VERSION_` int(11) DEFAULT NULL,
  `META_INFO_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DEPLOYMENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EDITOR_SOURCE_VALUE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EDITOR_SOURCE_EXTRA_VALUE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`ID_`),
  KEY `ACT_FK_MODEL_SOURCE` (`EDITOR_SOURCE_VALUE_ID_`),
  KEY `ACT_FK_MODEL_SOURCE_EXTRA` (`EDITOR_SOURCE_EXTRA_VALUE_ID_`),
  KEY `ACT_FK_MODEL_DEPLOYMENT` (`DEPLOYMENT_ID_`),
  CONSTRAINT `ACT_FK_MODEL_DEPLOYMENT` FOREIGN KEY (`DEPLOYMENT_ID_`) REFERENCES `ACT_RE_DEPLOYMENT` (`ID_`),
  CONSTRAINT `ACT_FK_MODEL_SOURCE` FOREIGN KEY (`EDITOR_SOURCE_VALUE_ID_`) REFERENCES `ACT_GE_BYTEARRAY` (`ID_`),
  CONSTRAINT `ACT_FK_MODEL_SOURCE_EXTRA` FOREIGN KEY (`EDITOR_SOURCE_EXTRA_VALUE_ID_`) REFERENCES `ACT_GE_BYTEARRAY` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_RE_MODEL
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_RE_PROCDEF
-- ----------------------------
DROP TABLE IF EXISTS `ACT_RE_PROCDEF`;
CREATE TABLE `ACT_RE_PROCDEF` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `KEY_` varchar(255) COLLATE utf8_bin NOT NULL,
  `VERSION_` int(11) NOT NULL,
  `DEPLOYMENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `RESOURCE_NAME_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DGRM_RESOURCE_NAME_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `HAS_START_FORM_KEY_` tinyint(4) DEFAULT NULL,
  `HAS_GRAPHICAL_NOTATION_` tinyint(4) DEFAULT NULL,
  `SUSPENSION_STATE_` int(11) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`ID_`),
  UNIQUE KEY `ACT_UNIQ_PROCDEF` (`KEY_`,`VERSION_`,`TENANT_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_RE_PROCDEF
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_RU_EVENT_SUBSCR
-- ----------------------------
DROP TABLE IF EXISTS `ACT_RU_EVENT_SUBSCR`;
CREATE TABLE `ACT_RU_EVENT_SUBSCR` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `EVENT_TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `EVENT_NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACTIVITY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `CONFIGURATION_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_EVENT_SUBSCR_CONFIG_` (`CONFIGURATION_`),
  KEY `ACT_FK_EVENT_EXEC` (`EXECUTION_ID_`),
  CONSTRAINT `ACT_FK_EVENT_EXEC` FOREIGN KEY (`EXECUTION_ID_`) REFERENCES `ACT_RU_EXECUTION` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_RU_EVENT_SUBSCR
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_RU_EXECUTION
-- ----------------------------
DROP TABLE IF EXISTS `ACT_RU_EXECUTION`;
CREATE TABLE `ACT_RU_EXECUTION` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `REV_` int(11) DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `BUSINESS_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PARENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `SUPER_EXEC_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `IS_ACTIVE_` tinyint(4) DEFAULT NULL,
  `IS_CONCURRENT_` tinyint(4) DEFAULT NULL,
  `IS_SCOPE_` tinyint(4) DEFAULT NULL,
  `IS_EVENT_SCOPE_` tinyint(4) DEFAULT NULL,
  `SUSPENSION_STATE_` int(11) DEFAULT NULL,
  `CACHED_ENT_STATE_` int(11) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `LOCK_TIME_` timestamp(3) NULL DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_EXEC_BUSKEY` (`BUSINESS_KEY_`),
  KEY `ACT_FK_EXE_PROCINST` (`PROC_INST_ID_`),
  KEY `ACT_FK_EXE_PARENT` (`PARENT_ID_`),
  KEY `ACT_FK_EXE_SUPER` (`SUPER_EXEC_`),
  KEY `ACT_FK_EXE_PROCDEF` (`PROC_DEF_ID_`),
  CONSTRAINT `ACT_FK_EXE_PARENT` FOREIGN KEY (`PARENT_ID_`) REFERENCES `ACT_RU_EXECUTION` (`ID_`),
  CONSTRAINT `ACT_FK_EXE_PROCDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `ACT_RE_PROCDEF` (`ID_`),
  CONSTRAINT `ACT_FK_EXE_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `ACT_RU_EXECUTION` (`ID_`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ACT_FK_EXE_SUPER` FOREIGN KEY (`SUPER_EXEC_`) REFERENCES `ACT_RU_EXECUTION` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_RU_EXECUTION
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_RU_IDENTITYLINK
-- ----------------------------
DROP TABLE IF EXISTS `ACT_RU_IDENTITYLINK`;
CREATE TABLE `ACT_RU_IDENTITYLINK` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `REV_` int(11) DEFAULT NULL,
  `GROUP_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_IDENT_LNK_USER` (`USER_ID_`),
  KEY `ACT_IDX_IDENT_LNK_GROUP` (`GROUP_ID_`),
  KEY `ACT_IDX_ATHRZ_PROCEDEF` (`PROC_DEF_ID_`),
  KEY `ACT_FK_TSKASS_TASK` (`TASK_ID_`),
  KEY `ACT_FK_IDL_PROCINST` (`PROC_INST_ID_`),
  CONSTRAINT `ACT_FK_ATHRZ_PROCEDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `ACT_RE_PROCDEF` (`ID_`),
  CONSTRAINT `ACT_FK_IDL_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `ACT_RU_EXECUTION` (`ID_`),
  CONSTRAINT `ACT_FK_TSKASS_TASK` FOREIGN KEY (`TASK_ID_`) REFERENCES `ACT_RU_TASK` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_RU_IDENTITYLINK
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_RU_JOB
-- ----------------------------
DROP TABLE IF EXISTS `ACT_RU_JOB`;
CREATE TABLE `ACT_RU_JOB` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `LOCK_EXP_TIME_` timestamp(3) NULL DEFAULT NULL,
  `LOCK_OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `EXCLUSIVE_` tinyint(1) DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `RETRIES_` int(11) DEFAULT NULL,
  `EXCEPTION_STACK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXCEPTION_MSG_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DUEDATE_` timestamp(3) NULL DEFAULT NULL,
  `REPEAT_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `HANDLER_TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `HANDLER_CFG_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`ID_`),
  KEY `ACT_FK_JOB_EXCEPTION` (`EXCEPTION_STACK_ID_`),
  CONSTRAINT `ACT_FK_JOB_EXCEPTION` FOREIGN KEY (`EXCEPTION_STACK_ID_`) REFERENCES `ACT_GE_BYTEARRAY` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_RU_JOB
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_RU_TASK
-- ----------------------------
DROP TABLE IF EXISTS `ACT_RU_TASK`;
CREATE TABLE `ACT_RU_TASK` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `REV_` int(11) DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PARENT_TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TASK_DEF_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DELEGATION_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `CREATE_TIME_` timestamp(3) NULL DEFAULT NULL,
  `DUE_DATE_` datetime(3) DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `SUSPENSION_STATE_` int(11) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `FORM_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_TASK_CREATE` (`CREATE_TIME_`),
  KEY `ACT_FK_TASK_EXE` (`EXECUTION_ID_`),
  KEY `ACT_FK_TASK_PROCINST` (`PROC_INST_ID_`),
  KEY `ACT_FK_TASK_PROCDEF` (`PROC_DEF_ID_`),
  CONSTRAINT `ACT_FK_TASK_EXE` FOREIGN KEY (`EXECUTION_ID_`) REFERENCES `ACT_RU_EXECUTION` (`ID_`),
  CONSTRAINT `ACT_FK_TASK_PROCDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `ACT_RE_PROCDEF` (`ID_`),
  CONSTRAINT `ACT_FK_TASK_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `ACT_RU_EXECUTION` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_RU_TASK
-- ----------------------------

-- ----------------------------
-- Table structure for ACT_RU_VARIABLE
-- ----------------------------
DROP TABLE IF EXISTS `ACT_RU_VARIABLE`;
CREATE TABLE `ACT_RU_VARIABLE` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin NOT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `BYTEARRAY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DOUBLE_` double DEFAULT NULL,
  `LONG_` bigint(20) DEFAULT NULL,
  `TEXT_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TEXT2_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_VARIABLE_TASK_ID` (`TASK_ID_`),
  KEY `ACT_FK_VAR_EXE` (`EXECUTION_ID_`),
  KEY `ACT_FK_VAR_PROCINST` (`PROC_INST_ID_`),
  KEY `ACT_FK_VAR_BYTEARRAY` (`BYTEARRAY_ID_`),
  CONSTRAINT `ACT_FK_VAR_BYTEARRAY` FOREIGN KEY (`BYTEARRAY_ID_`) REFERENCES `ACT_GE_BYTEARRAY` (`ID_`),
  CONSTRAINT `ACT_FK_VAR_EXE` FOREIGN KEY (`EXECUTION_ID_`) REFERENCES `ACT_RU_EXECUTION` (`ID_`),
  CONSTRAINT `ACT_FK_VAR_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `ACT_RU_EXECUTION` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ACT_RU_VARIABLE
-- ----------------------------

-- ----------------------------
-- Table structure for pmo_constants
-- ----------------------------
DROP TABLE IF EXISTS `pmo_constants`;
CREATE TABLE `pmo_constants` (
  `id` int(20) NOT NULL,
  `con_id` varchar(20) DEFAULT NULL,
  `con_name` varchar(40) DEFAULT NULL,
  `con_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pmo_constants
-- ----------------------------

-- ----------------------------
-- Table structure for pmo_flow_msg
-- ----------------------------
DROP TABLE IF EXISTS `pmo_flow_msg`;
CREATE TABLE `pmo_flow_msg` (
  `id` varchar(38) NOT NULL COMMENT '主键id',
  `node_id` varchar(38) NOT NULL COMMENT '节点id',
  `node_name` varchar(255) DEFAULT NULL COMMENT '节点名称',
  `opinion_ content` text NOT NULL COMMENT '审核内容',
  `oper_person` varchar(20) NOT NULL COMMENT '添加人',
  `oper_person_name` varchar(40) DEFAULT NULL COMMENT '添加人姓名',
  `add_time` bigint(20) DEFAULT NULL,
  `update_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pmo_flow_msg
-- ----------------------------

-- ----------------------------
-- Table structure for pmo_person
-- ----------------------------
DROP TABLE IF EXISTS `pmo_person`;
CREATE TABLE `pmo_person` (
  `id` varchar(38) NOT NULL COMMENT '主键id',
  `pro_id` varchar(38) NOT NULL COMMENT '项目ID',
  `pro_code` varchar(20) DEFAULT NULL COMMENT '项目编码',
  `person_id` varchar(20) NOT NULL COMMENT '人员ID',
  `person_name` varchar(20) DEFAULT NULL COMMENT '人员名称',
  `person_category` int(2) DEFAULT NULL COMMENT '1.项目经理2市场负责人3项目成员',
  `add_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pmo_person
-- ----------------------------
INSERT INTO `pmo_person` VALUES ('011b952404754ee097aa472c0373f1fa', '0e351714b92e47dcaba43c4031f208a7', 'YC201705036', '149309277119860', '方成', '3', '1494406218037');
INSERT INTO `pmo_person` VALUES ('02880561f37047dba97cd9761ffbbbab', 'f24c13f7a17645bebd80e9361487f3fd', 'YC201705017', '1493886495278625', 'hbq', '1', '1493975118022');
INSERT INTO `pmo_person` VALUES ('034a666ff4ba483aa374adf9950f9c74', '68998cc86bfc40baa3d66b23abdf703b', 'YC201705042', '149309277119699', '张晖达', '3', '1494579560925');
INSERT INTO `pmo_person` VALUES ('041c98eeeabb493595bb5f572f2479c4', 'f24c13f7a17645bebd80e9361487f3fd', 'YC201705017', '1493886495278625', 'hbq', '3', '1493975118022');
INSERT INTO `pmo_person` VALUES ('046dcb388e764d289d0318cc1f39f1cc', '7505836a457441208fcd41b9b8be65e6', 'YC201705030', '149309277119661', '王太祥', '3', '1494330048375');
INSERT INTO `pmo_person` VALUES ('0504beef4cb14891acd0aaacf544c725', 'c77eb29c8a4744eabff41af7768fbae7', 'YC201705008', '1493303387945862', 'AAA', '2', '1493707015101');
INSERT INTO `pmo_person` VALUES ('05cba9b42f8b475da18e06ba76b69afe', 'd893527962e14eb0ac009996c193f3ba', 'YC201705035', '149309277119662', '刘仁义', '3', '1494404656490');
INSERT INTO `pmo_person` VALUES ('05ecea787ab146c0a171a59d41bd367d', '80b30f31208c43d9944e93dfc7705b00', 'YC201705010', '1493303781142696', '项目成员e', '3', '1493723848797');
INSERT INTO `pmo_person` VALUES ('06bdec5b8c3e46a2aa185f8732233aab', '4bed7dc2e67948d5b92cf3c084886354', 'YC201705012', '1493707775786632', 'admin2', '2', '1493724077505');
INSERT INTO `pmo_person` VALUES ('07a0be50bfe348a7ba1acd618bd25657', '2f750fcad4db446fa64d86772b02299d', null, '149309277119674', '胡海洋', '3', '1494559555358');
INSERT INTO `pmo_person` VALUES ('08b011cc3b484611b784900a1896a121', '193b050ba4f04f079c4d0732c791ca54', 'YC201705009', '1493303608040512', '市场负责人小B', '2', '1493722558011');
INSERT INTO `pmo_person` VALUES ('08b89ec3b33446d0bf16dd1291670d7c', 'c73bd2226bdf4dbabf9a273bf3577cc6', 'YC201705018', '1493972762528832', '测试A', '3', '1493976442216');
INSERT INTO `pmo_person` VALUES ('0a5ec0911b844f669666714fbd20d1ca', '1b0029736d6943c4b06e08bfc27f1203', 'YC201705021', '1493973019250804', '测试1', '3', '1494143694304');
INSERT INTO `pmo_person` VALUES ('0ba2902446ef4c33962450bf7fb45e0b', '97ae24f5fb124a3b85d58e931a7e93c1', 'YC201705020', '1493886495278625', 'hbq', '3', '1493982941965');
INSERT INTO `pmo_person` VALUES ('0e9ea778b1514682b1223fba3de0241b', 'c77eb29c8a4744eabff41af7768fbae7', 'YC201705008', '1493696570728207', '张凌云', '1', '1493707015101');
INSERT INTO `pmo_person` VALUES ('1071a5c1f3294799a75a6077fb2f7b64', '9d9a765a89c945ffa3e00038a382d6ae', 'YC201705027', '1493303430821480', 'BBB', '1', '1494246277461');
INSERT INTO `pmo_person` VALUES ('11458cfc0237437f94d0434123969d7b', 'd3f443efc55a4f67ae953f65d92d10cc', 'YC201705014', '1493728852395285', '4354', '1', '1493729275490');
INSERT INTO `pmo_person` VALUES ('12e3d3b0ec404dfaad9ef38a82c7a610', '97ae24f5fb124a3b85d58e931a7e93c1', 'YC201705020', '1493973019250804', '测试1', '1', '1493982941965');
INSERT INTO `pmo_person` VALUES ('13256aa98c2648d0a76dd978d877584c', 'b9661e9af47942a7b34232c9278baeb1', 'YC201704002', '1493303506518949', '项目经理小A', '1', '1493317317928');
INSERT INTO `pmo_person` VALUES ('16903abb37224a5896caf2fc77606f22', '193b050ba4f04f079c4d0732c791ca54', 'YC201705009', '1493303781142696', '项目成员e', '3', '1493722558011');
INSERT INTO `pmo_person` VALUES ('16ab47997a9d4905bc0ee06677e3f47c', '193b050ba4f04f079c4d0732c791ca54', 'YC201705009', '1493303676101946', '项目成员q', '3', '1493722558011');
INSERT INTO `pmo_person` VALUES ('16ea163c92344017938c8c843f8cc68a', 'b1f59f3375ae40a6b9997dfc9edcdff5', 'YC201705029', '149309277119869', '杜彬', '3', '1494296727595');
INSERT INTO `pmo_person` VALUES ('17e84024ff2e49e0bbd55ce55bb67b92', 'd7e427b91fdd4b7dbcc830a3c4cadb9e', 'YC201705040', '149309277119832', '苏秉昆', '2', '1494496430964');
INSERT INTO `pmo_person` VALUES ('1942105ad4d94dbab202419a90d533f7', 'f52c875c6d11486f8c78d3cc4a47449c', null, '1493692811168109', 'wang', '3', '1493894350558');
INSERT INTO `pmo_person` VALUES ('1a991ae6e8174a51a33d35dc9a3c160d', '2d8f626d9c924b3c854477ad5f61cdce', 'YC201705031', '1', '超级管理员', '3', '1494330189937');
INSERT INTO `pmo_person` VALUES ('1aa56ee7fb6d4acfa715ea9ffa0a60c1', '80b30f31208c43d9944e93dfc7705b00', 'YC201705010', '1493303506518949', '项目经理小A', '1', '1493723848797');
INSERT INTO `pmo_person` VALUES ('1c9e6797e62e4ee98ba53d86723b4c5c', 'd8787f4d1b02454991fc706795582375', 'YC201705022', '1493692811168109', 'wang', '2', '1494208118930');
INSERT INTO `pmo_person` VALUES ('1d5775ec9eca461fb4288384304dd266', 'c2dd8efc5dd345eb99c6945ed33550c3', 'YC201705039', '149309277119894', '卢方平', '1', '1494406636262');
INSERT INTO `pmo_person` VALUES ('2231635a35a14cf49447b2d83c52b305', '140431367b3b41bb82117b643fe5e917', 'YC201705011', '1493304343543530', '专门立项的人LX', '3', '1493723933439');
INSERT INTO `pmo_person` VALUES ('228d7f779482489eab8094716a640d67', '67a937829b454b4c971ee422dd793b20', 'YC201705003', '1493304343543530', '专门立项的人LX', '3', '1493697222419');
INSERT INTO `pmo_person` VALUES ('24824166af3e4f128e64b065ab1b2a16', '68998cc86bfc40baa3d66b23abdf703b', 'YC201705042', '149309277119721', '李靖', '2', '1494579560925');
INSERT INTO `pmo_person` VALUES ('2612ca45d40f43419f5d99c1bfbf980d', '2f750fcad4db446fa64d86772b02299d', null, '149309277119779', '游锦青', '3', '1494559555358');
INSERT INTO `pmo_person` VALUES ('26e28f15dd274b5b9644d05fbc0395ca', '7eb573b0042444e9b2543d55ff58dbae', 'YC201705005', '1493303676101946', '项目成员q', '3', '1493706308225');
INSERT INTO `pmo_person` VALUES ('282954aebf6041338c7655e3b8807d0b', 'd7e427b91fdd4b7dbcc830a3c4cadb9e', 'YC201705040', '149309277119731', '黄焰', '3', '1494496430964');
INSERT INTO `pmo_person` VALUES ('2aa2906e9e3d4761ae4b6b4a1189bedd', '238bc5fabec44b9e84db41bd3b5c6c28', null, '1493973074738479', 'fdg', '3', '1494248830141');
INSERT INTO `pmo_person` VALUES ('2d9b02689f944441b7d41583492a3ed4', '4bed7dc2e67948d5b92cf3c084886354', 'YC201705012', '1493708036604873', 'adminz', '1', '1493724077505');
INSERT INTO `pmo_person` VALUES ('312a9ce1bebc47098320f120943b0b8e', '915d9dc85a5e47e694b54d1074c10d26', 'YC201705043', '149309277119815', '苏惠红', '3', '1494579970837');
INSERT INTO `pmo_person` VALUES ('315ca7d0aa874f7780a2c9b69b78ef4e', 'c77eb29c8a4744eabff41af7768fbae7', 'YC201705008', '1493304020205869', '能查看所有项目的KK', '3', '1493707015101');
INSERT INTO `pmo_person` VALUES ('35040ce9e523453e848e4eae2c1c85ad', 'b1f59f3375ae40a6b9997dfc9edcdff5', 'YC201705029', '149309277119797', '何凡凡', '3', '1494296727595');
INSERT INTO `pmo_person` VALUES ('35b7a552b0a0403aa7554cd4de68d51a', 'c620d043ceff463ba1a93a6e7c173558', 'YC201705041', '149309277119852', '朱朝友', '1', '1494510262086');
INSERT INTO `pmo_person` VALUES ('35b9343f3d2e4498b89b551223f6176b', 'd8787f4d1b02454991fc706795582375', 'YC201705022', '1493303676101946', '项目成员q', '3', '1494208118930');
INSERT INTO `pmo_person` VALUES ('37112cfa67904e968b26b06eb54996d3', 'b9661e9af47942a7b34232c9278baeb1', 'YC201704002', '1493303608040512', '市场负责人小B', '2', '1493317317928');
INSERT INTO `pmo_person` VALUES ('374084c36be543b8ac556aee4073b398', '0e351714b92e47dcaba43c4031f208a7', 'YC201705036', '149309277119662', '刘仁义', '2', '1494406218037');
INSERT INTO `pmo_person` VALUES ('37b8ba637f894cfdb92a08b732089d77', '1b0029736d6943c4b06e08bfc27f1203', 'YC201705021', '1493886495278625', 'hbq', '3', '1494143694304');
INSERT INTO `pmo_person` VALUES ('37e014d41a75407e9893894e95f0ed0d', '61427ce79f0a49f0b0121538ebd45c74', 'YC201704003', '149330373460134', '项目成员w', '3', '1493317669155');
INSERT INTO `pmo_person` VALUES ('394c8e57d0874dbd84016cb9a2af6540', '9d9a765a89c945ffa3e00038a382d6ae', 'YC201705027', '1493972762528832', '测试A', '3', '1494246277461');
INSERT INTO `pmo_person` VALUES ('3ad9582cad7844feba7e91b46bd0d2ec', 'b9661e9af47942a7b34232c9278baeb1', 'YC201704002', '1493303781142696', '项目成员e', '3', '1493317317928');
INSERT INTO `pmo_person` VALUES ('3bcce1254421448d81f89b1fb9bec534', 'd893527962e14eb0ac009996c193f3ba', 'YC201705035', '149309277119883', '冯冬双', '3', '1494404656490');
INSERT INTO `pmo_person` VALUES ('3c991581ebf6489a9b8500868fa9230b', '7505836a457441208fcd41b9b8be65e6', 'YC201705030', '149309277119666', '黄修彬', '1', '1494330048375');
INSERT INTO `pmo_person` VALUES ('3e9f919c92ca486397af367eb8e5182e', 'd3f443efc55a4f67ae953f65d92d10cc', 'YC201705014', '1493692811168109', 'wang', '3', '1493729275490');
INSERT INTO `pmo_person` VALUES ('3fb2b412e8bb49008091f563f7a6fb09', '7505836a457441208fcd41b9b8be65e6', 'YC201705030', '149309277119675', '张祖媛', '2', '1494330048375');
INSERT INTO `pmo_person` VALUES ('40b4b33d31b046cfb87f18554e3484cd', 'b1f59f3375ae40a6b9997dfc9edcdff5', 'YC201705029', '149309277119709', '华凤毳', '3', '1494296727595');
INSERT INTO `pmo_person` VALUES ('4184c7020bfd43f1a093b30db1ea1ec6', '77ea5cfb6cf44687aa3ae14597f15c17', 'YC201705033', '149309277119660', '齐焕', '3', '1494397182464');
INSERT INTO `pmo_person` VALUES ('420829197c7f4253a15feaab2481c1ac', 'f52c875c6d11486f8c78d3cc4a47449c', null, '1493886495278625', 'hbq', '3', '1493894350558');
INSERT INTO `pmo_person` VALUES ('4236525a15a342c5bb1ce4119571839e', 'c2dd8efc5dd345eb99c6945ed33550c3', 'YC201705039', '149309277119731', '黄焰', '3', '1494406636262');
INSERT INTO `pmo_person` VALUES ('4422c46364d1491e810192b65352c9b0', '5fb5912555b2423c901512f7548f1b07', 'YC201705006', '1493304343543530', '专门立项的人LX', '3', '1493706895945');
INSERT INTO `pmo_person` VALUES ('444955606cee43eb9be429e94e9871f4', 'a4842fb4948e497680fdd7418b89faee', 'YC201705007', '1493303387945862', 'AAA', '1', '1493706938360');
INSERT INTO `pmo_person` VALUES ('44ccecaff9734e9cbf14f0a9d30e7dc7', '80b30f31208c43d9944e93dfc7705b00', 'YC201705010', '1493303608040512', '市场负责人小B', '2', '1493723848797');
INSERT INTO `pmo_person` VALUES ('4526d740f6694dc2b81e5f258a1dc521', 'c18c14b30e0e41f2ae681fef2b396d61', null, '149309277119660', '齐焕', '3', '1494401163988');
INSERT INTO `pmo_person` VALUES ('4a73f122823b4805b3027a8d0beb045f', 'c73bd2226bdf4dbabf9a273bf3577cc6', 'YC201705018', '1493728821084619', 'ceshi', '1', '1493976442216');
INSERT INTO `pmo_person` VALUES ('4b2b987e27ce45c2a8c8872ee7c4396c', '3199ffd5285049b8a76c02daf2792711', 'YC201705026', '1493972762528832', '测试A', '3', '1494246233840');
INSERT INTO `pmo_person` VALUES ('4bef1bc6f840402986063043cef00009', 'f52c875c6d11486f8c78d3cc4a47449c', null, '1493707775786632', 'admin2', '3', '1493894350558');
INSERT INTO `pmo_person` VALUES ('4d0a9061c84c434585d93c94080d5ea5', '2f750fcad4db446fa64d86772b02299d', null, '149309277119826', '伍玲', '3', '1494559555358');
INSERT INTO `pmo_person` VALUES ('5493a19e9eb547628f588fd9238cd7a8', 'd8787f4d1b02454991fc706795582375', 'YC201705022', '1493692811168109', 'wang', '1', '1494208118930');
INSERT INTO `pmo_person` VALUES ('553e4df0487d4f8696273ebde1177122', '5fb5912555b2423c901512f7548f1b07', 'YC201705006', '1493303387945862', 'AAA', '3', '1493706895945');
INSERT INTO `pmo_person` VALUES ('559e449ca8ef4d7f9616dd7aebcd6c06', '5fb5912555b2423c901512f7548f1b07', 'YC201705006', '1493303430821480', 'BBB', '1', '1493706895945');
INSERT INTO `pmo_person` VALUES ('563b9025683c4391b28403701ad1f2eb', 'c792fb25886b4176b4bef189220ed537', 'YC201705019', '1493886495278625', 'hbq', '3', '1493982004238');
INSERT INTO `pmo_person` VALUES ('588a141b51bc4c629d09e018d22cc9f2', '495cc9826ae648f7a616745969b42c2d', 'YC201705025', '1493303387945862', 'AAA', '1', '1494246233677');
INSERT INTO `pmo_person` VALUES ('58a82b75fbf84f84896f376b5568ce87', '9d9a765a89c945ffa3e00038a382d6ae', 'YC201705027', '1493708036604873', 'adminz', '3', '1494246277461');
INSERT INTO `pmo_person` VALUES ('591faf5451fe4db7af27388b7a0f5172', '67a937829b454b4c971ee422dd793b20', 'YC201705003', '1493303430821480', 'BBB', '3', '1493697222419');
INSERT INTO `pmo_person` VALUES ('5971cad4e52c46a397b63e47243088f3', '7505836a457441208fcd41b9b8be65e6', 'YC201705030', '1', '超级管理员', '3', '1494330048375');
INSERT INTO `pmo_person` VALUES ('59d9872e414642f3b696d9b57155de37', '7eb573b0042444e9b2543d55ff58dbae', 'YC201705005', '1493303781142696', '项目成员e', '3', '1493706308225');
INSERT INTO `pmo_person` VALUES ('5b9fe95c28cf44a18c84d3dc4cd73727', '140431367b3b41bb82117b643fe5e917', 'YC201705011', '1493303506518949', '项目经理小A', '1', '1493723933439');
INSERT INTO `pmo_person` VALUES ('5ba05638db494f45afdb08e5635b7a61', 'f24c13f7a17645bebd80e9361487f3fd', 'YC201705017', '1493303781142696', '项目成员e', '3', '1493975118022');
INSERT INTO `pmo_person` VALUES ('5cf19d03870c4522a03f95e292471e3f', '238bc5fabec44b9e84db41bd3b5c6c28', null, '1494245747733701', '你好', '2', '1494248830141');
INSERT INTO `pmo_person` VALUES ('5e74df0626924a929444548201844970', 'd7e427b91fdd4b7dbcc830a3c4cadb9e', 'YC201705040', '149309277119699', '张晖达', '3', '1494496430964');
INSERT INTO `pmo_person` VALUES ('5ef47e93fb084d86939f2eb0f7700c88', 'd8787f4d1b02454991fc706795582375', 'YC201705022', '1493708036604873', 'adminz', '3', '1494208118930');
INSERT INTO `pmo_person` VALUES ('61e2ffc2d13544d4924ab8c8cb94ea75', 'c2dd8efc5dd345eb99c6945ed33550c3', 'YC201705039', '1', '超级管理员', '3', '1494406636262');
INSERT INTO `pmo_person` VALUES ('630a5f61a9af45e582a16f89cfb1f6cd', 'f52c875c6d11486f8c78d3cc4a47449c', null, '1493303781142696', '项目成员e', '1', '1493894350558');
INSERT INTO `pmo_person` VALUES ('63f304aabaec4a899d043c3fa08b0d49', '845c468859e840c0b511a5e94acb8d32', 'YC201705001', '1493092377774187', '大米', '3', '1493694948968');
INSERT INTO `pmo_person` VALUES ('67a6ca1414984e3496c49f98be53a1d2', 'ab3c19b796a64cc49451e2d36ace2587', 'YC201705013', '1493303506518949', '项目经理小A', '3', '1493724324580');
INSERT INTO `pmo_person` VALUES ('693cb48e8c4b4bd9866190ec3b50ead6', 'd7e427b91fdd4b7dbcc830a3c4cadb9e', 'YC201705040', '149309277119883', '冯冬双', '3', '1494496430964');
INSERT INTO `pmo_person` VALUES ('6a12b5cf249d472a8cdd89445a91f5ec', '140431367b3b41bb82117b643fe5e917', 'YC201705011', '1493707775786632', 'admin2', '2', '1493723933439');
INSERT INTO `pmo_person` VALUES ('6a64029ee1a846e488194f0263cf33ff', '4bed7dc2e67948d5b92cf3c084886354', 'YC201705012', '1493303430821480', 'BBB', '3', '1493724077505');
INSERT INTO `pmo_person` VALUES ('6bb8c59a04a84594a50afa8786350cb7', 'f52c875c6d11486f8c78d3cc4a47449c', null, '1493092286632390', '王大锤', '3', '1493894350558');
INSERT INTO `pmo_person` VALUES ('6c28592e04bb4bc590801bbe3d6c59ca', '140431367b3b41bb82117b643fe5e917', 'YC201705011', '1493303387945862', 'AAA', '3', '1493723933439');
INSERT INTO `pmo_person` VALUES ('6ead01e69b374e51be474e6c4c36d909', 'b1f59f3375ae40a6b9997dfc9edcdff5', 'YC201705029', '149309277119679', '刘炜丽', '2', '1494296727595');
INSERT INTO `pmo_person` VALUES ('6eb627e0e7c2480b8e6e8ca1febaf935', '67a937829b454b4c971ee422dd793b20', 'YC201705003', '1493303781142696', '项目成员e', '1', '1493697222419');
INSERT INTO `pmo_person` VALUES ('70667224ec044ff68d0c66ccbf421002', '2d8f626d9c924b3c854477ad5f61cdce', 'YC201705031', '149309277119639', '陈志强', '2', '1494330189937');
INSERT INTO `pmo_person` VALUES ('71819437158e4aa1aef4a6879716f932', '845c468859e840c0b511a5e94acb8d32', 'YC201705001', '1493691297262984', 'bonini', '2', '1493694948968');
INSERT INTO `pmo_person` VALUES ('7183d23e617243eb8e5240acc79aa7a9', '5cb44dbcfa0c44159b1ce062acd6ef06', 'YC201705037', '149309277119724', '李操', '3', '1494406433889');
INSERT INTO `pmo_person` VALUES ('77d85d34a6bf42b4b13db87f942dac71', 'c620d043ceff463ba1a93a6e7c173558', 'YC201705041', '149309277119724', '李操', '2', '1494510262086');
INSERT INTO `pmo_person` VALUES ('7abf155a54044cbea5a2d75b7169a550', '67a937829b454b4c971ee422dd793b20', 'YC201705003', '1493303608040512', '市场负责人小B', '3', '1493697222419');
INSERT INTO `pmo_person` VALUES ('7af47aadfc644c9ab7da0d79c971e74f', '0cd30563737f4d3bb5dc8f24a75520ad', 'YC201704001', '1493303676101946', '项目成员q', '3', '1493304766384');
INSERT INTO `pmo_person` VALUES ('7b18ad0313914718b0eb094cc3945775', '5fb5912555b2423c901512f7548f1b07', 'YC201705006', '1493304020205869', '能查看所有项目的KK', '3', '1493706895945');
INSERT INTO `pmo_person` VALUES ('7b1a6cd818d64f659fd4b48570d420e4', 'e6320353764942399431ac2273f2dde0', 'YC201705038', '149309277119880', '贺鹏飞', '3', '1494406595137');
INSERT INTO `pmo_person` VALUES ('7c2e9da51d524dfc8cee8e9dee55966d', '824d9e10f8cd478ea3de1b484a039abc', 'YC201705016', '1493691880144105', 'Bonnie', '2', '1493969488569');
INSERT INTO `pmo_person` VALUES ('7e28fcea786242ddad9e6739023c297a', 'c77eb29c8a4744eabff41af7768fbae7', 'YC201705008', '1493303387945862', 'AAA', '3', '1493707015101');
INSERT INTO `pmo_person` VALUES ('80244ac34261411ba02caff58bca07f5', '80b30f31208c43d9944e93dfc7705b00', 'YC201705010', '1493303676101946', '项目成员q', '3', '1493723848797');
INSERT INTO `pmo_person` VALUES ('814d71cda250416ca8c1feda3e09ffc4', '875572dbe88e4d8b848c45297f3216cb', 'YC201705023', '149309277119635', 'momo', '3', '1494208910337');
INSERT INTO `pmo_person` VALUES ('824680364a56412293d6012df0070255', '9d9a765a89c945ffa3e00038a382d6ae', 'YC201705027', '1493707775786632', 'admin2', '3', '1494246277461');
INSERT INTO `pmo_person` VALUES ('824cf4a5a6b04981ae69029f0205cca2', '7eb573b0042444e9b2543d55ff58dbae', 'YC201705005', '1493304343543530', '专门立项的人LX', '3', '1493706308225');
INSERT INTO `pmo_person` VALUES ('8271d1bb18ba4431912e99f369a379d2', 'd7e427b91fdd4b7dbcc830a3c4cadb9e', 'YC201705040', '149309277119795', '洪言声', '3', '1494496430964');
INSERT INTO `pmo_person` VALUES ('831902eeaa254730bb9f1db3ef32b7c5', '313688d879224d1fa525db73419ff2b2', 'YC201705028', '1493886495278625', 'hbq', '1', '1494248965402');
INSERT INTO `pmo_person` VALUES ('842280ed5e6f4e2f9b745a08839bfc2b', 'd7e427b91fdd4b7dbcc830a3c4cadb9e', 'YC201705040', '149309277119860', '方成', '1', '1494496430964');
INSERT INTO `pmo_person` VALUES ('84e6dbdece174f84ba3099a66662e33b', '495cc9826ae648f7a616745969b42c2d', 'YC201705025', '1493972762528832', '测试A', '3', '1494246233677');
INSERT INTO `pmo_person` VALUES ('868a0ebc686046319ca93d861d8f451d', 'f52c875c6d11486f8c78d3cc4a47449c', null, '1493303676101946', '项目成员q', '2', '1493894350558');
INSERT INTO `pmo_person` VALUES ('87f6854a4e164b91bf5ce9b721c376b0', 'a4842fb4948e497680fdd7418b89faee', 'YC201705007', '1493092286632390', '王大锤', '3', '1493706938360');
INSERT INTO `pmo_person` VALUES ('881c4c32ace34457b06f97332a44135d', 'b1f59f3375ae40a6b9997dfc9edcdff5', 'YC201705029', '149309277119638', '舒玲燕', '3', '1494296727595');
INSERT INTO `pmo_person` VALUES ('88f1fcf5f6e547e8942d0f3847437331', '67a937829b454b4c971ee422dd793b20', 'YC201705003', '1493303387945862', 'AAA', '3', '1493697222419');
INSERT INTO `pmo_person` VALUES ('8e7b66d851d74ab9a61d24effef0786f', '0e8108eb9f38447e8ba7c6d0bb0dd810', 'YC201705004', '1493304020205869', '能查看所有项目的KK', '3', '1493697807282');
INSERT INTO `pmo_person` VALUES ('8f3a1035f90542c48128610926e5a255', '495cc9826ae648f7a616745969b42c2d', 'YC201705025', '1493707775786632', 'admin2', '3', '1494246233677');
INSERT INTO `pmo_person` VALUES ('8fed3f251ce048daaf0ee77c56ca1730', '0e8108eb9f38447e8ba7c6d0bb0dd810', 'YC201705004', '1493303506518949', '项目经理小A', '1', '1493697807282');
INSERT INTO `pmo_person` VALUES ('90c02b0aabb0448e87cd0d919dcafaa1', '7505836a457441208fcd41b9b8be65e6', 'YC201705030', '149309277119660', '齐焕', '3', '1494330048375');
INSERT INTO `pmo_person` VALUES ('91479b0f4f11416ca184f36f1aebeab9', 'a4842fb4948e497680fdd7418b89faee', 'YC201705007', '1493692811168109', 'wang', '3', '1493706938360');
INSERT INTO `pmo_person` VALUES ('93a5e743b23d4654909abfd96a380bd0', 'c2dd8efc5dd345eb99c6945ed33550c3', 'YC201705039', '149309277119674', '胡海洋', '2', '1494406636262');
INSERT INTO `pmo_person` VALUES ('94eab5fee3cf4453bf2f8cb2e208351a', '3199ffd5285049b8a76c02daf2792711', 'YC201705026', '1493707775786632', 'admin2', '3', '1494246233840');
INSERT INTO `pmo_person` VALUES ('951d7f9e20b343fe8b08d07a03ad439b', '915d9dc85a5e47e694b54d1074c10d26', 'YC201705043', '149309277119779', '游锦青', '1', '1494579970837');
INSERT INTO `pmo_person` VALUES ('95286bae8d6a4464931243d4a42d9b6d', '67a937829b454b4c971ee422dd793b20', 'YC201705003', '1493303506518949', '项目经理小A', '3', '1493697222419');
INSERT INTO `pmo_person` VALUES ('95d072ba571f449b9d71e3032d635af5', '313688d879224d1fa525db73419ff2b2', 'YC201705028', '1494245747733701', '你好', '2', '1494248965402');
INSERT INTO `pmo_person` VALUES ('96312e1889864b5582f5f15b689457bf', '2d8f626d9c924b3c854477ad5f61cdce', 'YC201705031', '149309277119640', '任杨静', '1', '1494330189937');
INSERT INTO `pmo_person` VALUES ('97a7161eaf2c4cb48c910fb7c6daa483', 'c620d043ceff463ba1a93a6e7c173558', 'YC201705041', '149309277119637', '吴辉', '3', '1494510262086');
INSERT INTO `pmo_person` VALUES ('9b203fe86a4f4e8f9b42b7ad18912cac', 'e6320353764942399431ac2273f2dde0', 'YC201705038', '149309277119848', '胡兴昶', '3', '1494406595137');
INSERT INTO `pmo_person` VALUES ('9c199ecea89e43ccb323c874c18f6aba', 'd3f443efc55a4f67ae953f65d92d10cc', 'YC201705014', '1493728821084619', 'ceshi', '2', '1493729275490');
INSERT INTO `pmo_person` VALUES ('9c9d7b7b5c0a49689c38851100f68b66', '61427ce79f0a49f0b0121538ebd45c74', 'YC201704003', '1493303676101946', '项目成员q', '3', '1493317669155');
INSERT INTO `pmo_person` VALUES ('9dbe887e1c954a1097af1ee00e2a2db6', '97ae24f5fb124a3b85d58e931a7e93c1', 'YC201705020', '1493092286632390', '王大锤', '3', '1493982941965');
INSERT INTO `pmo_person` VALUES ('a252725b5dfe4a939f68ce5854a41c4a', 'd3f443efc55a4f67ae953f65d92d10cc', 'YC201705014', '1493708036604873', 'adminz', '3', '1493729275490');
INSERT INTO `pmo_person` VALUES ('a34eb7093e704f87a954cc6a51e6b4df', '1b0029736d6943c4b06e08bfc27f1203', 'YC201705021', '1493973019250804', '测试1', '2', '1494143694304');
INSERT INTO `pmo_person` VALUES ('a4290b4afa2341d79469e104ae86114a', '824d9e10f8cd478ea3de1b484a039abc', 'YC201705016', '1493707775786632', 'admin2', '3', '1493969488569');
INSERT INTO `pmo_person` VALUES ('a4fd6ebc27b94e489bd5f803fbb21058', 'f52c875c6d11486f8c78d3cc4a47449c', null, '1493865150770933', '游锦青', '3', '1493894350558');
INSERT INTO `pmo_person` VALUES ('a631f39c0bae4402a8bb5367d1f76cc1', '2d8f626d9c924b3c854477ad5f61cdce', 'YC201705031', '149309277119660', '齐焕', '3', '1494330189937');
INSERT INTO `pmo_person` VALUES ('a7b584f47a4b49c4953d109b279e65a2', 'd893527962e14eb0ac009996c193f3ba', 'YC201705035', '149309277119655', '李伟', '3', '1494404656490');
INSERT INTO `pmo_person` VALUES ('a82ceb5325044d3c83d7fb947ab9e9b1', '97ae24f5fb124a3b85d58e931a7e93c1', 'YC201705020', '1493973074738479', 'fdg', '2', '1493982941965');
INSERT INTO `pmo_person` VALUES ('a85c1e1524c841628f4748a0978ee557', 'e6320353764942399431ac2273f2dde0', 'YC201705038', '1', '超级管理员', '3', '1494406595137');
INSERT INTO `pmo_person` VALUES ('a8da1d3431de48e5bf9748d9a42160c8', '7eb573b0042444e9b2543d55ff58dbae', 'YC201705005', '1493303430821480', 'BBB', '1', '1493706308225');
INSERT INTO `pmo_person` VALUES ('adb43a9588954680919a72a2b50c4280', 'c2dd8efc5dd345eb99c6945ed33550c3', 'YC201705039', '149309277119806', '巫建东', '3', '1494406636262');
INSERT INTO `pmo_person` VALUES ('adcc92b9e4774e669a55bc3d81d1ea8e', '61427ce79f0a49f0b0121538ebd45c74', 'YC201704003', '1493303506518949', '项目经理小A', '1', '1493317669155');
INSERT INTO `pmo_person` VALUES ('b32d2adb280a4b9b929b93108fc632cb', 'd893527962e14eb0ac009996c193f3ba', 'YC201705035', '149309277119674', '胡海洋', '1', '1494404656490');
INSERT INTO `pmo_person` VALUES ('b494dab22fb74f9ea024c6e93283c471', '1b0029736d6943c4b06e08bfc27f1203', 'YC201705021', '1493973019250804', '测试1', '1', '1494143694304');
INSERT INTO `pmo_person` VALUES ('b4afd762cc5348f3902657e7e5d89a5d', '68998cc86bfc40baa3d66b23abdf703b', 'YC201705042', '149309277119779', '游锦青', '1', '1494579560925');
INSERT INTO `pmo_person` VALUES ('b5efb9f092b649d8a12b08884f99b696', 'ab3c19b796a64cc49451e2d36ace2587', 'YC201705013', '1493707775786632', 'admin2', '2', '1493724324580');
INSERT INTO `pmo_person` VALUES ('b69ff900aa1944938af5eb7e3724cf12', '824d9e10f8cd478ea3de1b484a039abc', 'YC201705016', '1493092286632390', '王大锤', '1', '1493969488569');
INSERT INTO `pmo_person` VALUES ('b701e48f56a64e58a2a7b108fae05370', '313688d879224d1fa525db73419ff2b2', 'YC201705028', '1493972762528832', '测试A', '3', '1494248965402');
INSERT INTO `pmo_person` VALUES ('bb5a21aec544406f95c7ad7b9eb5a675', 'c18c14b30e0e41f2ae681fef2b396d61', null, '149309277119675', '张祖媛', '1', '1494401163988');
INSERT INTO `pmo_person` VALUES ('bb64ba478cde4a459ed2e55106add5f5', '8e225e5857e84a22adb59f9c136c222f', 'YC201705002', '1493692811168109', 'wang', '2', '1493695026361');
INSERT INTO `pmo_person` VALUES ('bb66ea8519cb4add8542cc402239e7bd', '0cd30563737f4d3bb5dc8f24a75520ad', 'YC201704001', '1493303608040512', '市场负责人小B', '2', '1493304766384');
INSERT INTO `pmo_person` VALUES ('bbe5bd1f8838405e9d83e5e56718c867', '68998cc86bfc40baa3d66b23abdf703b', 'YC201705042', '149309277119666', '黄修彬', '3', '1494579560925');
INSERT INTO `pmo_person` VALUES ('bc0b387843a7401e84749d1eed2eb6bc', '9d9a765a89c945ffa3e00038a382d6ae', 'YC201705027', '1493972762528832', '测试A', '2', '1494246277461');
INSERT INTO `pmo_person` VALUES ('c0a52eb2b6c24f138f3e971952a74ffc', '824d9e10f8cd478ea3de1b484a039abc', 'YC201705016', '1493692811168109', 'wang', '3', '1493969488569');
INSERT INTO `pmo_person` VALUES ('c139be4e1aaa47c8bc2027c10c652218', 'c792fb25886b4176b4bef189220ed537', 'YC201705019', '1493692811168109', 'wang', '3', '1493982004238');
INSERT INTO `pmo_person` VALUES ('c14717268a4f430da8cd0e948b207a8b', '4bed7dc2e67948d5b92cf3c084886354', 'YC201705012', '1493303608040512', '市场负责人小B', '3', '1493724077505');
INSERT INTO `pmo_person` VALUES ('c230398695f74b65850b5d208f961427', '3199ffd5285049b8a76c02daf2792711', 'YC201705026', '1493303387945862', 'AAA', '1', '1494246233840');
INSERT INTO `pmo_person` VALUES ('c3927858de3945d3b1ed6d64a258e6af', 'd893527962e14eb0ac009996c193f3ba', 'YC201705035', '149309277119644', '李萌', '2', '1494404656490');
INSERT INTO `pmo_person` VALUES ('c3b88bc568994a608e3106f07663b17e', 'ab3c19b796a64cc49451e2d36ace2587', 'YC201705013', '1493092286632390', '王大锤', '1', '1493724324580');
INSERT INTO `pmo_person` VALUES ('c4c13e2aef0d44cd91d8d076449e8d8c', 'e6320353764942399431ac2273f2dde0', 'YC201705038', '149309277119798', '李光荣', '1', '1494406595137');
INSERT INTO `pmo_person` VALUES ('c5700bf547e04307a1ca10559de76234', '2f750fcad4db446fa64d86772b02299d', null, '149309277119662', '刘仁义', '2', '1494559555358');
INSERT INTO `pmo_person` VALUES ('c6565acf29224f6d8d5a7251f8651e66', '5cb44dbcfa0c44159b1ce062acd6ef06', 'YC201705037', '149309277119674', '胡海洋', '2', '1494406433889');
INSERT INTO `pmo_person` VALUES ('c6c2d1aa27e94b94b95b54f225543a98', '2f750fcad4db446fa64d86772b02299d', null, '149309277119675', '张祖媛', '1', '1494559555358');
INSERT INTO `pmo_person` VALUES ('c941e902694b490c88c27201988f649e', 'f52c875c6d11486f8c78d3cc4a47449c', null, '1', '超级管理员', '3', '1493894350558');
INSERT INTO `pmo_person` VALUES ('ca8513bfe68f4f58ae83f99295d3cc69', '0e8108eb9f38447e8ba7c6d0bb0dd810', 'YC201705004', '1493303608040512', '市场负责人小B', '2', '1493697807282');
INSERT INTO `pmo_person` VALUES ('cb73b44296824a39aec0d1b61fd4fe65', '8e225e5857e84a22adb59f9c136c222f', 'YC201705002', '1493691297262984', 'bonini', '3', '1493695026361');
INSERT INTO `pmo_person` VALUES ('cc4c95e296044ef0a1d9d7a4519a7f0e', 'c792fb25886b4176b4bef189220ed537', 'YC201705019', '1493973019250804', '测试1', '1', '1493982004238');
INSERT INTO `pmo_person` VALUES ('cdefa9caa2ea40ca9ca26829989079b9', '238bc5fabec44b9e84db41bd3b5c6c28', null, '1494245747733701', '你好', '1', '1494248830141');
INSERT INTO `pmo_person` VALUES ('cf0b1d559c86451abbdecc66c8903d0b', '0e351714b92e47dcaba43c4031f208a7', 'YC201705036', '1', '超级管理员', '3', '1494406218037');
INSERT INTO `pmo_person` VALUES ('cfb20e541f234611bc96912a550ee4ed', '845c468859e840c0b511a5e94acb8d32', 'YC201705001', '149309277119635', 'momo', '3', '1493694948968');
INSERT INTO `pmo_person` VALUES ('cff77536a988444c8aea9f979c7bac73', 'c620d043ceff463ba1a93a6e7c173558', 'YC201705041', '149309277119744', '林坚立', '3', '1494510262086');
INSERT INTO `pmo_person` VALUES ('d08582126bc94efd88aabbc7e021cad0', 'd8787f4d1b02454991fc706795582375', 'YC201705022', '1493303781142696', '项目成员e', '3', '1494208118930');
INSERT INTO `pmo_person` VALUES ('d0e96af49c954566ba1b4b0edde2367f', '4bed7dc2e67948d5b92cf3c084886354', 'YC201705012', '1493303506518949', '项目经理小A', '3', '1493724077505');
INSERT INTO `pmo_person` VALUES ('d1530e151de540a39144ff6f17bd0017', 'c18c14b30e0e41f2ae681fef2b396d61', null, '149309277119674', '胡海洋', '2', '1494401163988');
INSERT INTO `pmo_person` VALUES ('d34ed9eeefad4dcfad5ad23be9a385b6', '915d9dc85a5e47e694b54d1074c10d26', 'YC201705043', '149309277119893', '黄辉晓', '3', '1494579970837');
INSERT INTO `pmo_person` VALUES ('d37d4eb934764ba6ab36794cd5505c29', 'c792fb25886b4176b4bef189220ed537', 'YC201705019', '1493707775786632', 'admin2', '3', '1493982004238');
INSERT INTO `pmo_person` VALUES ('d3f17eacad5941a1a157ee4ae0c358ce', '3199ffd5285049b8a76c02daf2792711', 'YC201705026', '1494245747733701', '你好', '2', '1494246233840');
INSERT INTO `pmo_person` VALUES ('d411cd34cf6845878bdc228fcea87a9a', '5cb44dbcfa0c44159b1ce062acd6ef06', 'YC201705037', '1', '超级管理员', '3', '1494406433889');
INSERT INTO `pmo_person` VALUES ('d56ff48a54964c38b225018c72ebc90b', '8e225e5857e84a22adb59f9c136c222f', 'YC201705002', '1493092286632390', '王大锤', '1', '1493695026361');
INSERT INTO `pmo_person` VALUES ('d7934346b4e14010ada010c3b62ab36c', 'd3f443efc55a4f67ae953f65d92d10cc', 'YC201705014', '1493092286632390', '王大锤', '3', '1493729275490');
INSERT INTO `pmo_person` VALUES ('d8a7236b240c4bdd9b99161a03a05a3a', '140431367b3b41bb82117b643fe5e917', 'YC201705011', '1493304020205869', '能查看所有项目的KK', '3', '1493723933439');
INSERT INTO `pmo_person` VALUES ('d9edff7db612495992a84c8e3e5b9d1f', 'e6320353764942399431ac2273f2dde0', 'YC201705038', '149309277119662', '刘仁义', '2', '1494406595137');
INSERT INTO `pmo_person` VALUES ('dae6f2cd5bf14c96a4c41e18eea53ff5', 'f24c13f7a17645bebd80e9361487f3fd', 'YC201705017', '1493973019250804', '测试1', '2', '1493975118022');
INSERT INTO `pmo_person` VALUES ('daee8b8731014650b50ac6fc30c88851', 'ab3c19b796a64cc49451e2d36ace2587', 'YC201705013', '1493303430821480', 'BBB', '3', '1493724324580');
INSERT INTO `pmo_person` VALUES ('dbd2a472891a466a94ad86dda6f9981b', '5cb44dbcfa0c44159b1ce062acd6ef06', 'YC201705037', '149309277119756', '龚瑞霞', '3', '1494406433889');
INSERT INTO `pmo_person` VALUES ('dc0599dedbf44b1f93f8cb925714c8b7', '7eb573b0042444e9b2543d55ff58dbae', 'YC201705005', '1493304020205869', '能查看所有项目的KK', '3', '1493706308225');
INSERT INTO `pmo_person` VALUES ('dc70d5646b284dcd90995d2a9fa1bd05', '5cb44dbcfa0c44159b1ce062acd6ef06', 'YC201705037', '149309277119788', '蔡景放', '1', '1494406433889');
INSERT INTO `pmo_person` VALUES ('dd29cadf22a94b6b9c8996a4f76afbde', '0e8108eb9f38447e8ba7c6d0bb0dd810', 'YC201705004', '1493303781142696', '项目成员e', '3', '1493697807282');
INSERT INTO `pmo_person` VALUES ('dde0a6438c614f87be1559ba8e284ecb', '68998cc86bfc40baa3d66b23abdf703b', 'YC201705042', '149309277119859', '熊小军', '3', '1494579560925');
INSERT INTO `pmo_person` VALUES ('de6bfb0deef7494795ecb3b594bb248f', '80b30f31208c43d9944e93dfc7705b00', 'YC201705010', '1493707775786632', 'admin2', '3', '1493723848797');
INSERT INTO `pmo_person` VALUES ('df2ed01e8d1948e19791e3ab2484dd72', '824d9e10f8cd478ea3de1b484a039abc', 'YC201705016', '1493708036604873', 'adminz', '3', '1493969488569');
INSERT INTO `pmo_person` VALUES ('e0487cd9c79f40b89f6d0414250b9b58', 'c77eb29c8a4744eabff41af7768fbae7', 'YC201705008', '1493304343543530', '专门立项的人LX', '3', '1493707015101');
INSERT INTO `pmo_person` VALUES ('e0be94d4263748b69e2700569b8ab8d4', 'c73bd2226bdf4dbabf9a273bf3577cc6', 'YC201705018', '1493886495278625', 'hbq', '3', '1493976442216');
INSERT INTO `pmo_person` VALUES ('e44529b4d39e4d08a45a4b9af0063e70', '193b050ba4f04f079c4d0732c791ca54', 'YC201705009', '1493303506518949', '项目经理小A', '1', '1493722558011');
INSERT INTO `pmo_person` VALUES ('e65a18e17d604e22bdb5af93359183dd', '0e351714b92e47dcaba43c4031f208a7', 'YC201705036', '149309277119732', '曾宇东', '1', '1494406218037');
INSERT INTO `pmo_person` VALUES ('e6f755835e3f4666b5631a0bdf9453c9', '77ea5cfb6cf44687aa3ae14597f15c17', 'YC201705033', '149309277119662', '刘仁义', '2', '1494397182464');
INSERT INTO `pmo_person` VALUES ('e8bce5b19991490d92c0487444af9166', 'c73bd2226bdf4dbabf9a273bf3577cc6', 'YC201705018', '1493973019250804', '测试1', '2', '1493976442216');
INSERT INTO `pmo_person` VALUES ('e8cded20e7b5471684dbf7e30c1943d8', 'c18c14b30e0e41f2ae681fef2b396d61', null, '149309277119666', '黄修彬', '3', '1494401163988');
INSERT INTO `pmo_person` VALUES ('e9f59dfb79364ea8b911b095766ea740', '5fb5912555b2423c901512f7548f1b07', 'YC201705006', '1493092286632390', '王大锤', '2', '1493706895945');
INSERT INTO `pmo_person` VALUES ('ea81b1d5d59443adb6862c976e70e718', '915d9dc85a5e47e694b54d1074c10d26', 'YC201705043', '149309277119722', '陈俊', '2', '1494579970837');
INSERT INTO `pmo_person` VALUES ('eb696a8d635640eab9990c128b55ae49', 'b9661e9af47942a7b34232c9278baeb1', 'YC201704002', '1493303676101946', '项目成员q', '3', '1493317317928');
INSERT INTO `pmo_person` VALUES ('eb7ebb26312d4e92aa092399ca113bc4', '77ea5cfb6cf44687aa3ae14597f15c17', 'YC201705033', '149309277119675', '张祖媛', '1', '1494397182464');
INSERT INTO `pmo_person` VALUES ('eddf94bb564643f18b77a584829d7c9b', '0e351714b92e47dcaba43c4031f208a7', 'YC201705036', '149309277119892', '林小健', '3', '1494406218037');
INSERT INTO `pmo_person` VALUES ('ede2e06f15af45d7ae786ce3cde19303', '0e8108eb9f38447e8ba7c6d0bb0dd810', 'YC201705004', '1493303676101946', '项目成员q', '3', '1493697807282');
INSERT INTO `pmo_person` VALUES ('eeed860e9bd2499da2becb37efaf0a60', 'a4842fb4948e497680fdd7418b89faee', 'YC201705007', '1493692811168109', 'wang', '2', '1493706938360');
INSERT INTO `pmo_person` VALUES ('f0bc867b3dd44b8d97170e9e8e07cf43', '495cc9826ae648f7a616745969b42c2d', 'YC201705025', '1494245747733701', '你好', '2', '1494246233677');
INSERT INTO `pmo_person` VALUES ('f0db111cdabc4a04afec81d81ab43904', 'c792fb25886b4176b4bef189220ed537', 'YC201705019', '1493973019250804', '测试1', '2', '1493982004238');
INSERT INTO `pmo_person` VALUES ('f20ce3e767f14b168d9cfb022cee87c0', '845c468859e840c0b511a5e94acb8d32', 'YC201705001', '1493692811168109', 'wang', '1', '1493694948968');
INSERT INTO `pmo_person` VALUES ('f28998a441c649f3820c16f2d517e840', 'c792fb25886b4176b4bef189220ed537', 'YC201705019', '1493092286632390', '王大锤', '3', '1493982004238');
INSERT INTO `pmo_person` VALUES ('f4363e7da8bb47de92373ccd4d4694aa', '67a937829b454b4c971ee422dd793b20', 'YC201705003', '1493303676101946', '项目成员q', '2', '1493697222419');
INSERT INTO `pmo_person` VALUES ('f6e7c7c16b8b486bb4f4aa6fbe65f374', '7eb573b0042444e9b2543d55ff58dbae', 'YC201705005', '1493303387945862', 'AAA', '2', '1493706308225');
INSERT INTO `pmo_person` VALUES ('f77ff48f8f9d4d8ea4d6ec923b3ca710', '875572dbe88e4d8b848c45297f3216cb', 'YC201705023', '1493691880144105', 'Bonnie', '2', '1494208910337');
INSERT INTO `pmo_person` VALUES ('f883d5a5802d4afbb88711921188e0fa', '875572dbe88e4d8b848c45297f3216cb', 'YC201705023', '1493707775786632', 'admin2', '1', '1494208910337');
INSERT INTO `pmo_person` VALUES ('f9a9d9da46ae4fdeb2cd1421dbffa626', 'd3f443efc55a4f67ae953f65d92d10cc', 'YC201705014', '1493707775786632', 'admin2', '3', '1493729275490');
INSERT INTO `pmo_person` VALUES ('fa4a0982326641b4b418abadac6a3831', 'b1f59f3375ae40a6b9997dfc9edcdff5', 'YC201705029', '149309277119712', '朱天同', '1', '1494296727595');
INSERT INTO `pmo_person` VALUES ('fa719755a0d94f3dac5ba1d973a20b61', '0cd30563737f4d3bb5dc8f24a75520ad', 'YC201704001', '1493303781142696', '项目成员e', '3', '1493304766384');
INSERT INTO `pmo_person` VALUES ('fba41365118247b1805385da0534d440', '61427ce79f0a49f0b0121538ebd45c74', 'YC201704003', '1493303608040512', '市场负责人小B', '2', '1493317669155');
INSERT INTO `pmo_person` VALUES ('fd42a6cce4a04a60a03037330b4e485e', '0cd30563737f4d3bb5dc8f24a75520ad', 'YC201704001', '1493303506518949', '项目经理小A', '1', '1493304766384');

-- ----------------------------
-- Table structure for pmo_project
-- ----------------------------
DROP TABLE IF EXISTS `pmo_project`;
CREATE TABLE `pmo_project` (
  `id` varchar(38) NOT NULL COMMENT '主键ID',
  `pro_code` varchar(20) NOT NULL COMMENT '项目编码',
  `pro_name` varchar(20) DEFAULT NULL COMMENT '项目名称',
  `pro_contents` text COMMENT '项目介绍（项目背景）',
  `markt_id` varchar(38) DEFAULT NULL COMMENT '营销中心ID',
  `markt_name` varchar(40) DEFAULT NULL COMMENT '营销中心名字',
  `pro_date` varchar(20) DEFAULT '' COMMENT '立项日期',
  `pro_status` int(2) DEFAULT '2' COMMENT '项目状态（1已立项2跟进中3结项）',
  `province_id` varchar(10) DEFAULT '' COMMENT '省份ID',
  `province` varchar(20) DEFAULT NULL COMMENT '省份名称',
  `city_id` varchar(20) DEFAULT '' COMMENT '城市ID',
  `city` varchar(20) DEFAULT NULL COMMENT '城市名称',
  `area_id` varchar(20) DEFAULT NULL COMMENT '区县ID',
  `area` varchar(20) DEFAULT NULL COMMENT '区县名称',
  `markt_person_id` varchar(40) DEFAULT NULL,
  `markt_person_name` varchar(40) DEFAULT NULL,
  `manage_person_id` varchar(40) DEFAULT NULL,
  `manage_person_name` varchar(40) DEFAULT NULL,
  `add_time` bigint(30) DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint(20) DEFAULT NULL COMMENT '更新时间',
  `is_delete` int(2) NOT NULL DEFAULT '0' COMMENT '0未删除，1已删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pmo_project
-- ----------------------------
INSERT INTO `pmo_project` VALUES ('0cd30563737f4d3bb5dc8f24a75520ad', 'YC201704001', '27号新建项目', '立项北京', '1403', '营销一区', '2017-04-05', '1', '130000', '河北省', '130400', '邯郸市', '130403', '丛台区', '1493303608040512', '市场负责人小B', '1493303506518949', '项目经理小A', '1493304766384', '1493304766384', '0');
INSERT INTO `pmo_project` VALUES ('0e351714b92e47dcaba43c4031f208a7', 'YC201705036', 'ssss', 'sssssssssssssssssssssssss', '1402', '商务技术部', '2017-05-10', '2', '230000', '黑龙江省', '230500', '双鸭山市', '', '', '149309277119662', '刘仁义', '149309277119732', '曾宇东', '1494406218037', '1494406218037', '0');
INSERT INTO `pmo_project` VALUES ('0e8108eb9f38447e8ba7c6d0bb0dd810', 'YC201705004', '测试2', '第三个地方法规', '1402', '商务技术部', '2017-05-09', '1', '130000', '河北省', '130200', '唐山市', '130203', '路北区', '1493303608040512', '市场负责人小B', '1493303506518949', '项目经理小A', '1493697807282', '1493697807282', '0');
INSERT INTO `pmo_project` VALUES ('140431367b3b41bb82117b643fe5e917', 'YC201705011', '嘿嘿嘿好', '是多少', '1406', '营销四区', '2017-05-16', '1', '130000', '河北省', '130300', '秦皇岛市', '130303', '山海关区', '1493707775786632', 'admin2', '1493303506518949', '项目经理小A', '1493723933439', '1493723933439', '0');
INSERT INTO `pmo_project` VALUES ('193b050ba4f04f079c4d0732c791ca54', 'YC201705009', '哈哈哈', '大发大法师打发打发打发事发地点时', '1401', '市场部', '2017-05-02', '1', '130000', '河北省', '130400', '邯郸市', '130406', '峰峰矿区', '1493303608040512', '市场负责人小B', '1493303506518949', '项目经理小A', '1493722558011', '1493722558011', '0');
INSERT INTO `pmo_project` VALUES ('1b0029736d6943c4b06e08bfc27f1203', 'YC201705021', '星期天', '444', '1404', '营销二区', '2017-05-07', '1', '120000', '天津市', '', '', '', '', '1493973019250804', '测试1', '1493973019250804', '测试1', '1494143694304', '1494143694304', '0');
INSERT INTO `pmo_project` VALUES ('238bc5fabec44b9e84db41bd3b5c6c28', 'YC201705024', '项目001', '不说', '1403', '营销一区', '2017-05-08', '1', '310000', '上海市', '', '', '', '', '1494245747733701', '你好', '1494245747733701', '你好', '0', '1494248830141', '0');
INSERT INTO `pmo_project` VALUES ('2d8f626d9c924b3c854477ad5f61cdce', 'YC201705031', '996', '963', '1403', '营销一区', '2017-05-09', '1', '150000', '内蒙古自治区', '', '', '', '', '149309277119639', '陈志强', '149309277119640', '任杨静', '1494330189937', '1494330189937', '0');
INSERT INTO `pmo_project` VALUES ('2f750fcad4db446fa64d86772b02299d', 'YC201705032', '963ceshi', '1515', '1403', '营销一区', '2017-05-23', '1', '150000', '内蒙古自治区', '', '', '', '', '149309277119662', '刘仁义', '149309277119675', '张祖媛', '0', '1494559555358', '0');
INSERT INTO `pmo_project` VALUES ('313688d879224d1fa525db73419ff2b2', 'YC201705028', '测试++测试', '7410', '1402', '商务技术部', '2017-05-08', '1', '340000', '安徽省', '', '', '', '', '1494245747733701', '你好', '1493886495278625', 'hbq', '1494248965402', '1494248965402', '0');
INSERT INTO `pmo_project` VALUES ('3199ffd5285049b8a76c02daf2792711', 'YC201705026', '哈哈哈哈', '啊啊啊啊啊啊啊啊啊啊啊啊啊啊', '1408', '合资公司', '2017-05-08', '1', '140000', '山西省', '140500', '晋城市', '140522', '阳城县', '1494245747733701', '你好', '1493303387945862', 'AAA', '1494246233840', '1494246233840', '0');
INSERT INTO `pmo_project` VALUES ('495cc9826ae648f7a616745969b42c2d', 'YC201705025', '哈哈哈哈', '啊啊啊啊啊啊啊啊啊啊啊啊啊啊', '1408', '合资公司', '2017-05-08', '1', '140000', '山西省', '140500', '晋城市', '140522', '阳城县', '1494245747733701', '你好', '1493303387945862', 'AAA', '1494246233677', '1494246233677', '0');
INSERT INTO `pmo_project` VALUES ('4bed7dc2e67948d5b92cf3c084886354', 'YC201705012', '阿斯顿发生', '阿斯蒂芬', '1402', '商务技术部', '2017-05-16', '1', '210000', '辽宁省', '210500', '本溪市', '210505', '南芬区', '1493707775786632', 'admin2', '1493708036604873', 'adminz', '1493724077505', '1493724077505', '0');
INSERT INTO `pmo_project` VALUES ('5cb44dbcfa0c44159b1ce062acd6ef06', 'YC201705037', 'dffffffffff', 'sssssssssss', '1405', '营销三区', '2017-05-10', '2', '310000', '上海市', '310200', '县', '310230', '崇明县', '149309277119674', '胡海洋', '149309277119788', '蔡景放', '1494406433889', '1494406433889', '0');
INSERT INTO `pmo_project` VALUES ('5fb5912555b2423c901512f7548f1b07', 'YC201705006', 'dfdd', 'dfdfdfd', '1402', '商务技术部', '2017-05-16', '1', '110000', '北京市', '110100', '市辖区', '110103', '崇文区', '1493092286632390', '王大锤', '1493303430821480', 'BBB', '1493706895945', '1493706895945', '0');
INSERT INTO `pmo_project` VALUES ('61427ce79f0a49f0b0121538ebd45c74', 'YC201704003', '项目小e建立，但是他自己看不到', '阿斯顿发送到', '1404', '营销二区', '2017-04-27', '1', '130000', '河北省', '130300', '秦皇岛市', '130302', '海港区', '1493303608040512', '市场负责人小B', '1493303506518949', '项目经理小A', '1493317669155', '1493317669155', '0');
INSERT INTO `pmo_project` VALUES ('67a937829b454b4c971ee422dd793b20', 'YC201705003', '测试2', '我热热', '1403', '营销一区', '2017-05-01', '1', '210000', '辽宁省', '', '', '', '', '1493303676101946', '项目成员q', '1493303781142696', '项目成员e', '1493697222419', '1493697222419', '0');
INSERT INTO `pmo_project` VALUES ('68998cc86bfc40baa3d66b23abdf703b', 'YC201705042', '888888', '9595695', '1407', '营销五区', '2017-05-12', '2', '370000', '山东省', '', '', '', '', '149309277119721', '李靖', '149309277119779', '游锦青', '1494579560925', '1494579560925', '0');
INSERT INTO `pmo_project` VALUES ('7505836a457441208fcd41b9b8be65e6', 'YC201705030', '你好', '159', '1401', '市场部', '2017-05-09', '1', '140000', '山西省', '', '', '', '', '149309277119675', '张祖媛', '149309277119666', '黄修彬', '1494330048375', '1494330048375', '0');
INSERT INTO `pmo_project` VALUES ('77ea5cfb6cf44687aa3ae14597f15c17', 'YC201705033', 'ppp', '45454', '1404', '营销二区', '2017-05-10', '1', '120000', '天津市', '', '', '', '', '149309277119662', '刘仁义', '149309277119675', '张祖媛', '1494397182464', '1494397182464', '0');
INSERT INTO `pmo_project` VALUES ('7eb573b0042444e9b2543d55ff58dbae', 'YC201705005', '测试2', '而讨厌讨厌热一热', '1404', '营销二区', '2017-05-02', '1', '150000', '内蒙古自治区', '150500', '通辽市', '150522', '科尔沁左翼后旗', '1493303387945862', 'AAA', '1493303430821480', 'BBB', '1493706308225', '1493706308225', '0');
INSERT INTO `pmo_project` VALUES ('80b30f31208c43d9944e93dfc7705b00', 'YC201705010', '嘿嘿嘿', '啊啊啊啊啊啊啊啊啊啊啊啊啊', '1402', '商务技术部', '2017-05-02', '1', '210000', '辽宁省', '210800', '营口市', '210804', '鲅鱼圈区', '1493303608040512', '市场负责人小B', '1493303506518949', '项目经理小A', '1493723848797', '1493723848797', '0');
INSERT INTO `pmo_project` VALUES ('824d9e10f8cd478ea3de1b484a039abc', 'YC201705016', 'cvcvcvc', 'cvcvcvc', '1403', '营销一区', '2017-05-09', '1', '120000', '天津市', '120200', '县', '120223', '静海县', '1493691880144105', 'Bonnie', '1493092286632390', '王大锤', '1493969488569', '1493969488569', '0');
INSERT INTO `pmo_project` VALUES ('845c468859e840c0b511a5e94acb8d32', 'YC201705001', '测试1', '事发地点时发生的光棍节水电费给大家发个家具店昂丰厚的法国队', '1402', '商务技术部', '2017-05-02', '1', '140000', '山西省', '140300', '阳泉市', '140322', '盂　县', '1493691297262984', 'bonini', '1493692811168109', 'wang', '1493694948968', '1493694948968', '0');
INSERT INTO `pmo_project` VALUES ('875572dbe88e4d8b848c45297f3216cb', 'YC201705023', 'bbbbbbb', 'assssssssssss', '1405', '营销三区', '2017-05-08', '1', '230000', '黑龙江省', '230700', '伊春市', '230710', '五营区', '1493691880144105', 'Bonnie', '1493707775786632', 'admin2', '1494208910337', '1494208910337', '0');
INSERT INTO `pmo_project` VALUES ('8e225e5857e84a22adb59f9c136c222f', 'YC201705002', '测试1', '而提高人体感染体', '1405', '营销三区', '2017-05-01', '3', '130000', '河北省', '130400', '邯郸市', '130404', '复兴区', '1493692811168109', 'wang', '1493092286632390', '王大锤', '0', '1493708032851', '0');
INSERT INTO `pmo_project` VALUES ('915d9dc85a5e47e694b54d1074c10d26', 'YC201705043', '5555', '565659', '1401', '市场部', '2017-05-12', '2', '350000', '福建省', '', '', '', '', '149309277119722', '陈俊', '149309277119779', '游锦青', '1494579970837', '1494579970837', '0');
INSERT INTO `pmo_project` VALUES ('97ae24f5fb124a3b85d58e931a7e93c1', 'YC201705020', '4614615', '+5+256', '1406', '营销四区', '2017-05-25', '1', '440000', '广东省', '', '', '', '', '1493973074738479', 'fdg', '1493973019250804', '测试1', '1493982941965', '1493982941965', '0');
INSERT INTO `pmo_project` VALUES ('9d9a765a89c945ffa3e00038a382d6ae', 'YC201705027', '嘎嘎嘎嘎嘎嘎嘎个', '23222222222222', '1404', '营销二区', '2017-05-08', '1', '210000', '辽宁省', '210300', '鞍山市', '210323', '岫岩满族自治县', '1493972762528832', '测试A', '1493303430821480', 'BBB', '1494246277461', '1494246277461', '0');
INSERT INTO `pmo_project` VALUES ('a4842fb4948e497680fdd7418b89faee', 'YC201705007', 'ererere', 'erererere', '1401', '市场部', '2017-06-02', '3', '110000', '北京市', '110200', '县', '110228', '密云县', '1493692811168109', 'wang', '1493303387945862', 'AAA', '0', '1493708021278', '0');
INSERT INTO `pmo_project` VALUES ('ab3c19b796a64cc49451e2d36ace2587', 'YC201705013', '支持', '阿斯蒂芬', '1404', '营销二区', '2017-05-24', '1', '120000', '天津市', '120100', '市辖区', '120108', '汉沽区', '1493707775786632', 'admin2', '1493092286632390', '王大锤', '1493724324580', '1493724324580', '0');
INSERT INTO `pmo_project` VALUES ('b1f59f3375ae40a6b9997dfc9edcdff5', 'YC201705029', '哈哈哈哈哈哈或或或', '少时诵诗书所所所所所所', '1404', '营销二区', '2017-05-09', '1', '140000', '山西省', '140300', '阳泉市', '140303', '矿　区', '149309277119679', '刘炜丽', '149309277119712', '朱天同', '1494296727595', '1494296727595', '0');
INSERT INTO `pmo_project` VALUES ('b9661e9af47942a7b34232c9278baeb1', 'YC201704002', '项目成员测试', '阿萨德发的', '1404', '营销二区', '2017-04-11', '1', '120000', '天津市', '120200', '县', '120223', '静海县', '1493303608040512', '市场负责人小B', '1493303506518949', '项目经理小A', '1493317317928', '1493317317928', '0');
INSERT INTO `pmo_project` VALUES ('c18c14b30e0e41f2ae681fef2b396d61', 'YC201705034', '项目一', '项目', '1406', '营销四区', '2017-05-10', '3', '340000', '安徽省', '', '', '', '', '149309277119674', '胡海洋', '149309277119675', '张祖媛', '0', '1494401201757', '0');
INSERT INTO `pmo_project` VALUES ('c2dd8efc5dd345eb99c6945ed33550c3', 'YC201705039', 'aaaaas', 'ssssssssss', '1408', '合资公司', '2017-05-31', '2', '130000', '河北省', '130400', '邯郸市', '', '', '149309277119674', '胡海洋', '149309277119894', '卢方平', '1494406636262', '1494406636262', '0');
INSERT INTO `pmo_project` VALUES ('c620d043ceff463ba1a93a6e7c173558', 'YC201705041', '西安试点项目', '西安试点然后快速介入到后期的项目中去', '1405', '营销三区', '2017-05-11', '2', '610000', '陕西省', '610100', '西安市', '', '', '149309277119724', '李操', '149309277119852', '朱朝友', '1494510262086', '1494510262086', '0');
INSERT INTO `pmo_project` VALUES ('c73bd2226bdf4dbabf9a273bf3577cc6', 'YC201705018', '1515616', '61+22+6', '1403', '营销一区', '2017-05-05', '1', '110000', '北京市', '', '', '', '', '1493973019250804', '测试1', '1493728821084619', 'ceshi', '1493976442216', '1493976442216', '0');
INSERT INTO `pmo_project` VALUES ('c77eb29c8a4744eabff41af7768fbae7', 'YC201705008', '测试', '委托金额退款了具体人', '1405', '营销三区', '2017-05-23', '1', '140000', '山西省', '140200', '大同市', '140202', '城　区', '1493303387945862', 'AAA', '1493696570728207', '张凌云', '1493707015101', '1493707015101', '0');
INSERT INTO `pmo_project` VALUES ('c792fb25886b4176b4bef189220ed537', 'YC201705019', '飞7878', '8498489948', '1402', '商务技术部', '2017-05-05', '1', '440000', '广东省', '', '', '', '', '1493973019250804', '测试1', '1493973019250804', '测试1', '1493982004238', '1493982004238', '0');
INSERT INTO `pmo_project` VALUES ('d3f443efc55a4f67ae953f65d92d10cc', 'YC201705014', 'retrt', 'ertetee', '1401', '市场部', '2017-05-09', '1', '130000', '河北省', '130100', '石家庄市', '130102', '长安区', '1493728821084619', 'ceshi', '1493728852395285', '4354', '1493729275490', '1493729275490', '0');
INSERT INTO `pmo_project` VALUES ('d7e427b91fdd4b7dbcc830a3c4cadb9e', 'YC201705040', '西安试点项目', '为了更好的推动项目在西安市的落地所以需要进行一个试点的项目', '1405', '营销三区', '2017-05-11', '2', '610000', '陕西省', '610100', '西安市', '', '', '149309277119832', '苏秉昆', '149309277119860', '方成', '1494496430964', '1494496430964', '0');
INSERT INTO `pmo_project` VALUES ('d8787f4d1b02454991fc706795582375', 'YC201705022', '项目', '测试项目', '1403', '营销一区', '2017-05-16', '1', '120000', '天津市', '120200', '县', '120223', '静海县', '1493692811168109', 'wang', '1493692811168109', 'wang', '1494208118930', '1494208118930', '0');
INSERT INTO `pmo_project` VALUES ('d893527962e14eb0ac009996c193f3ba', 'YC201705035', 'liurenyiTest', '项目背景', '1404', '营销二区', '2017-06-02', '2', '140000', '山西省', '', '', '', '', '149309277119644', '李萌', '149309277119674', '胡海洋', '1494404656490', '1494404656490', '0');
INSERT INTO `pmo_project` VALUES ('e6320353764942399431ac2273f2dde0', 'YC201705038', 'ss2wwe', 'aaaaaaaaaa', '1407', '营销五区', '2017-05-10', '2', '230000', '黑龙江省', '230600', '大庆市', '230605', '红岗区', '149309277119662', '刘仁义', '149309277119798', '李光荣', '1494406595137', '1494406595137', '0');
INSERT INTO `pmo_project` VALUES ('f24c13f7a17645bebd80e9361487f3fd', 'YC201705017', '20170505', '561265681', '1408', '合资公司', '2017-05-05', '1', '440000', '广东省', '', '', '', '', '1493973019250804', '测试1', '1493886495278625', 'hbq', '1493975118022', '1493975118022', '0');
INSERT INTO `pmo_project` VALUES ('f52c875c6d11486f8c78d3cc4a47449c', 'YC201705015', 'OA系统', '公司内部使用后i好好弄i糊弄i牛你你哦你你牛你 哦金牛拘泥拘泥你举i你join莫i们年纪你军民拼命你举牌你就能你 i弄i糯米牛排你拼哦i你们i囧面就哦i买家哦i美妞你婆娘你吗炅迷陪你品就弄i弄i牛奶品哦i你噢呢颦颦你弄i弄ip你皮哦你陪你拼命品品牌你拼皮哦i哦i就哦i假面泡沫你咪啪纳米盘你哦i吗窘莫i吗你拼拼命品居；哦那你你弄i尿频56146146\n51jgbub基本户伯伯u不iiu很牛。，/；', '1402', '商务技术部', '2017-05-04', '1', '440000', '广东省', '440300', '深圳市', '440306', '宝安区', '1493303676101946', '项目成员q', '1493303781142696', '项目成员e', '0', '1493894350558', '0');

-- ----------------------------
-- Table structure for pmo_require_task
-- ----------------------------
DROP TABLE IF EXISTS `pmo_require_task`;
CREATE TABLE `pmo_require_task` (
  `id` varchar(38) NOT NULL,
  `require_id` varchar(38) NOT NULL COMMENT '需求id',
  `task_person` varchar(40) DEFAULT NULL COMMENT '任务处理人',
  `task_person_name` varchar(20) DEFAULT NULL,
  `fadeback_info` text COMMENT '反馈信息',
  `task_status` int(2) DEFAULT '0' COMMENT '任务处理状态0 未反馈 1已经反馈 2已经过期',
  `start_time` bigint(20) DEFAULT NULL COMMENT '任务开始时间',
  `end_time` bigint(20) DEFAULT NULL COMMENT '任务结束时间',
  `finish_time` bigint(20) DEFAULT NULL COMMENT '实际完成时间',
  `add_time` bigint(20) DEFAULT NULL COMMENT '添加时间',
  `update_time` bigint(20) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pmo_require_task
-- ----------------------------
INSERT INTO `pmo_require_task` VALUES ('050b28f569924525a3bb23262608cbf9', 'b1c76a20eec6482896b5bf808ff9d7e9', '149309277119675', '张祖媛', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494572043958', '1494572043958');
INSERT INTO `pmo_require_task` VALUES ('051ab72fed3d4189852fe79368aea32d', '76001af93bde4901ad495e28ca129865', '149309277119660', '齐焕', '反馈未提交', null, '1494345600000', '1496246399999', '0', '1494399941478', '1494399941478');
INSERT INTO `pmo_require_task` VALUES ('06f7be749c034572a61ce171cc2ad40f', '6d9eb32e33c94c778d83056a583ba3d0', '149309277119779', '游锦青', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494581373184', '1494581373184');
INSERT INTO `pmo_require_task` VALUES ('1597c2b5762a40d1ad8d6df3b7d5a6e4', '76001af93bde4901ad495e28ca129865', '149309277119675', '张祖媛', 'nihao', '1', '1494345600000', '1496246399999', '1494399982039', '1494399941478', '1494399982039');
INSERT INTO `pmo_require_task` VALUES ('1f987c3590b1439f9b4c95b761dcb86c', '76001af93bde4901ad495e28ca129865', '149309277119662', '刘仁义', '反馈未提交', null, '1494345600000', '1496246399999', '0', '1494399941478', '1494399941478');
INSERT INTO `pmo_require_task` VALUES ('22ebcdf498c8480d8312d5e86c8a573c', '6d9eb32e33c94c778d83056a583ba3d0', '149309277119815', '苏惠红', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494581373184', '1494581373184');
INSERT INTO `pmo_require_task` VALUES ('5cc81cda53bd4d2799aa5cc34547bf7d', '59f030a649ba46f89a70577279705729', '1493303676101946', '项目成员q', '99999999999999999', '1', '1493568000000', '1496419199999', '1493320095443', '1493309417922', '1493320095443');
INSERT INTO `pmo_require_task` VALUES ('60a0217bd88844f7b6b15ff395c4ebe1', '3d35fdee8a784a069e10b2e14a9724f1', '1493303430821480', 'BBB', '反馈未提交', null, '1494259200000', '1494863999999', '0', '1493708865809', '1493708865809');
INSERT INTO `pmo_require_task` VALUES ('65b8a60ec4a648f78c0c1cc751db77bd', '3d35fdee8a784a069e10b2e14a9724f1', '1493303387945862', 'AAA', '反馈未提交', null, '1494259200000', '1494863999999', '0', '1493708865809', '1493708865809');
INSERT INTO `pmo_require_task` VALUES ('67a3aee88f144d8393800eb6f19cef56', '6d9eb32e33c94c778d83056a583ba3d0', '149309277119722', '陈俊', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494581373184', '1494581373184');
INSERT INTO `pmo_require_task` VALUES ('6b8ade8406c34b1182469bbb3fff6775', '2c795248d32340788952fe8da57f9de8', '149309277119675', '张祖媛', '反馈未提交', null, '1494345600000', '1496246399999', '0', '1494403443417', '1494403443417');
INSERT INTO `pmo_require_task` VALUES ('6e9bd341c2cc491a9778e1687baccf55', '39c1c54f98b84618b3832efa40342be1', '149309277119826', '伍玲', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494573501313', '1494573501313');
INSERT INTO `pmo_require_task` VALUES ('762449e7ae304367a60ed35dcad84c18', 'b1c76a20eec6482896b5bf808ff9d7e9', '149309277119660', '齐焕', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494572043958', '1494572043958');
INSERT INTO `pmo_require_task` VALUES ('7d4a36e8a4ef410584769335e8c694f7', '3d35fdee8a784a069e10b2e14a9724f1', '1493304020205869', '能查看所有项目的KK', '反馈未提交', null, '1494259200000', '1494863999999', '0', '1493708865809', '1493708865809');
INSERT INTO `pmo_require_task` VALUES ('7f45ef59ad574523b102c22995692b3e', '2c795248d32340788952fe8da57f9de8', '149309277119662', '刘仁义', '反馈未提交', null, '1494345600000', '1496246399999', '0', '1494403443417', '1494403443417');
INSERT INTO `pmo_require_task` VALUES ('89e34299ca8e4bda937ef7696d0a93b0', 'b1c76a20eec6482896b5bf808ff9d7e9', '149309277119666', '黄修彬', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494572043958', '1494572043958');
INSERT INTO `pmo_require_task` VALUES ('8a1500570a6d4ae09df72faa34504b58', '3d35fdee8a784a069e10b2e14a9724f1', '1493304343543530', '专门立项的人LX', '反馈未提交', null, '1494259200000', '1494863999999', '0', '1493708865809', '1493708865809');
INSERT INTO `pmo_require_task` VALUES ('9326f5352f9c4e22954e5a2d6eb49a83', '59f030a649ba46f89a70577279705729', '1493303781142696', '项目成员e', '跟新数据，看看是不是成功了，我觉得应该成功了！！！！', '1', '1493568000000', '1496419199999', '1493320245095', '1493309417922', '1493320245095');
INSERT INTO `pmo_require_task` VALUES ('afa1649426894a139e5ff82a36efb6a8', '39c1c54f98b84618b3832efa40342be1', '149309277119675', '张祖媛', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494573501313', '1494573501313');
INSERT INTO `pmo_require_task` VALUES ('c4797f23456a474c84774270ae4dce7e', '3d35fdee8a784a069e10b2e14a9724f1', '1493092286632390', '王大锤', '股份大股东非官方大哥大法官', '1', '1494259200000', '1494863999999', '1493708906320', '1493708865809', '1493708906320');
INSERT INTO `pmo_require_task` VALUES ('d04fbc627c364ae2a6b665f4c124fedc', '39c1c54f98b84618b3832efa40342be1', '149309277119662', '刘仁义', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494573501313', '1494573501313');
INSERT INTO `pmo_require_task` VALUES ('d62873ebd96c4c9c9332cc10e7f756b3', '6d9eb32e33c94c778d83056a583ba3d0', '149309277119893', '黄辉晓', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494581373184', '1494581373184');
INSERT INTO `pmo_require_task` VALUES ('ea711b80da8249d8b6b23fee5ac4ea42', 'b1c76a20eec6482896b5bf808ff9d7e9', '149309277119674', '胡海洋', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494572043958', '1494572043958');
INSERT INTO `pmo_require_task` VALUES ('eed8ae1ba376407787d200db5ff11711', '39c1c54f98b84618b3832efa40342be1', '149309277119779', '游锦青', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494573501313', '1494573501313');
INSERT INTO `pmo_require_task` VALUES ('ef8b60eb942c46a388b3f28ed442452b', '2c795248d32340788952fe8da57f9de8', '149309277119779', '游锦青', '反馈未提交', null, '1494345600000', '1496246399999', '0', '1494403443417', '1494403443417');
INSERT INTO `pmo_require_task` VALUES ('fcd3dbd5d332426f8823ffe1efee79c0', '39c1c54f98b84618b3832efa40342be1', '149309277119674', '胡海洋', '反馈未提交', null, '1494518400000', '1496246399999', '0', '1494573501313', '1494573501313');

-- ----------------------------
-- Table structure for pmo_requirements
-- ----------------------------
DROP TABLE IF EXISTS `pmo_requirements`;
CREATE TABLE `pmo_requirements` (
  `id` varchar(38) NOT NULL COMMENT '主键ID',
  `pro_id` varchar(38) NOT NULL COMMENT '项目ID',
  `pro_code` varchar(20) DEFAULT NULL COMMENT '项目编码',
  `req_title` varchar(40) NOT NULL COMMENT '需求名称',
  `req_detail` text COMMENT '需求详情',
  `req_emergency` varchar(3) DEFAULT NULL COMMENT '是否紧急（是/否）',
  `req_status` varchar(10) DEFAULT NULL COMMENT '需求状态',
  `start_time` varchar(20) DEFAULT NULL,
  `end_time` varchar(50) DEFAULT NULL,
  `flow_status` varchar(20) DEFAULT NULL,
  `flow_name` varchar(40) DEFAULT NULL,
  `act_id` varchar(20) DEFAULT NULL COMMENT '流程节点ID',
  `act_name` varchar(20) DEFAULT NULL COMMENT '流程节点名称',
  `add_person_id` varchar(20) DEFAULT NULL COMMENT '需求提交人',
  `add_person_name` varchar(30) DEFAULT NULL,
  `receive_person_id` varchar(40) DEFAULT NULL COMMENT '需求接收人ID ',
  `receive_person_name` varchar(40) DEFAULT NULL COMMENT '接收人员名字',
  `first_instance_person_id` varchar(40) DEFAULT NULL COMMENT '一审人员ID',
  `first_instance_person_name` varchar(40) DEFAULT NULL COMMENT '一审人名字',
  `first_instance_opinion` varchar(3) DEFAULT NULL COMMENT '一审意见（1同意，2驳回）',
  `first_instance_content` text COMMENT '一审内容',
  `first_instance_time` bigint(20) DEFAULT NULL COMMENT '一审时间',
  `need_second_instance` varchar(8) DEFAULT NULL COMMENT '是否需要二审（true需要，false 不需要）',
  `second_instance_person_id` varchar(40) DEFAULT NULL COMMENT '二审人ID',
  `second_instance_person_name` varchar(40) DEFAULT NULL COMMENT '二审人名字',
  `second_instance_opinion` varchar(3) DEFAULT NULL COMMENT '意见 1同意 2驳回',
  `second_instance_content` text COMMENT '二审内容',
  `second_instance_time` bigint(20) DEFAULT NULL,
  `task_send_detail` text COMMENT '任务派发描述',
  `cur_process_person_id` varchar(38) DEFAULT NULL,
  `add_time` bigint(20) DEFAULT NULL,
  `update_time` bigint(20) DEFAULT NULL,
  `is_delete` int(1) NOT NULL DEFAULT '0' COMMENT '0有效，1删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pmo_requirements
-- ----------------------------
INSERT INTO `pmo_requirements` VALUES ('02a9fd478e48475f8c045a1b025652ce', 'c792fb25886b4176b4bef189220ed537', 'YC201705019', '哈哈哈20170508', '1469568156', '1', null, '1494237860745', '0', null, null, 'pmo03', '二审', '1493886495278625', 'hbq', '1493973019250804', '测试1', '1493973019250804', '测试1', '1', '548984', '1494238016309', '1', '1493973074738479', 'fdg', null, null, '0', null, '1493973019250804', '1494237860745', '1494238016309', '0');
INSERT INTO `pmo_requirements` VALUES ('0abc2bd602fe4a34a185236276d147ff', '238bc5fabec44b9e84db41bd3b5c6c28', 'YC201705024', '11111111111111111111111111', '1111111111111111111111111111111', '2', null, '1494246487858', '0', null, null, 'pmo02', '需求审核', '1493707775786632', 'admin2', '1494245747733701', '你好', '1494245747733701', '你好', null, null, '0', null, null, null, null, null, '0', null, '1494245747733701', '1494246487858', '1494246487930', '0');
INSERT INTO `pmo_requirements` VALUES ('13db5aed627343869e04dfc4665edeea', 'c620d043ceff463ba1a93a6e7c173558', null, '麻烦提供设备进行试点', '&lt;p&gt;地磁3套，网关10套进行安装&lt;/p&gt;', '2', null, '1494510410097', '0', null, null, 'pmo02', '需求审核', '149309277119637', '吴辉', '149309277119852', '朱朝友', '149309277119852', '朱朝友', null, null, '0', null, null, null, null, null, '0', null, '149309277119852', '1494510410097', '1494510410119', '0');
INSERT INTO `pmo_requirements` VALUES ('192a9619d1d84e0bae10ca245a6bb418', '1b0029736d6943c4b06e08bfc27f1203', 'YC201705021', '啊啊啊啊啊啊啊啊啊啊', '啊啊啊啊啊啊啊啊啊', '1', null, '1494212781234', '0', null, null, 'pmo02', '需求审核', '1493707775786632', 'admin2', null, '测试1', null, '测试1', null, null, '0', null, null, null, null, null, '0', null, '1493707775786632', '1494212781234', '1494212781308', '0');
INSERT INTO `pmo_requirements` VALUES ('1a3cd4bdb3fc4f09a76679945630d932', '7505836a457441208fcd41b9b8be65e6', null, 'haohao', '963', '1', null, '1494334736982', '0', null, null, 'pmo04', '任务派发', '149309277119660', '齐焕', '149309277119666', '黄修彬', '149309277119666', '黄修彬', '1', '968', '0', '1', '149309277119660', '齐焕', '1', '', '1494334959422', null, '149309277119660', '1494334736982', '1494334959422', '0');
INSERT INTO `pmo_requirements` VALUES ('2c795248d32340788952fe8da57f9de8', '2f750fcad4db446fa64d86772b02299d', null, 'ceshi', '103232', '2', null, '1494345600000', '1496246399999', null, null, 'pmo05', '任务处理', '149309277119662', '刘仁义', '149309277119675', '张祖媛', '149309277119675', '张祖媛', '1', '10252', '0', '1', '149309277119637', '吴辉', '1', '', '0', null, '149309277119675', '1494387425370', '1494403443417', '0');
INSERT INTO `pmo_requirements` VALUES ('38f7743cdca14952bc980cecdce6b132', '97ae24f5fb124a3b85d58e931a7e93c1', null, '8181898', '888', '2', null, '1493983057456', '0', null, null, 'pmo02', '需求审核', '1493886495278625', 'hbq', '1493973019250804', '测试1', '1493973019250804', '测试1', null, null, '0', null, null, null, null, null, '0', null, '1493973019250804', '1493983057456', '1493983057538', '0');
INSERT INTO `pmo_requirements` VALUES ('39c1c54f98b84618b3832efa40342be1', '2f750fcad4db446fa64d86772b02299d', 'YC201705032', '2326326', '&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;p&gt;003&lt;/p&gt;', '1', null, '1494518400000', '1496246399999', null, null, 'pmo05', '任务处理', '149309277119662', '刘仁义', '149309277119675', '张祖媛', '149309277119675', '张祖媛', '1', '', '0', '1', '149309277119637', '吴辉', '1', '', '0', null, '149309277119675', '1494388839215', '1494573501313', '0');
INSERT INTO `pmo_requirements` VALUES ('3a192c5274014cdaab369d6ba22431a2', 'd7e427b91fdd4b7dbcc830a3c4cadb9e', 'YC201705040', '该需求很紧急', 'ewtretrg&amp;nbsp;', '2', null, '1494555042261', '0', null, null, 'pmo03', '二审', '149309277119883', '冯冬双', '149309277119860', '方成', '149309277119860', '方成', '1', 'xcxcxcxcx', '1494555402407', '1', '149309277119647', '任亮', null, null, '0', null, '149309277119647', '1494555042261', '1494555402407', '0');
INSERT INTO `pmo_requirements` VALUES ('3a84b8a9fda04c8b947c749cf411b315', '824d9e10f8cd478ea3de1b484a039abc', 'YC201705016', '新建需求，需求数量', '阿斯蒂芬', '1', null, '1494054533647', '0', null, null, 'pmo02', '需求审核', '1493708036604873', 'adminz', '1493092286632390', '王大锤', '1493092286632390', '王大锤', null, null, '0', null, null, null, null, null, '0', null, '1493092286632390', '1494054533647', '1494054533746', '0');
INSERT INTO `pmo_requirements` VALUES ('3d35fdee8a784a069e10b2e14a9724f1', '5fb5912555b2423c901512f7548f1b07', 'YC201705006', 'sfdsfdf', 'sdfsdfsdfss', '1', null, '1494259200000', '1494863999999', null, null, 'pmo05', '任务处理', '1493092286632390', '王大锤', '1493092286632390', '王大锤', '1493092286632390', '王大锤', '1', '同意同意通版', '0', '2', null, null, null, null, '0', null, '1493303430821480', '1493708271959', '1493708865809', '0');
INSERT INTO `pmo_requirements` VALUES ('4898b649b5d049c386a22c5d273a01a2', 'd3f443efc55a4f67ae953f65d92d10cc', null, 'ghgfhgf', 'gfhfghghfgh', '1', null, '1493729408315', '0', null, null, 'pmo04', '任务派发', '1493092286632390', '王大锤', '1493728852395285', '4354', '1493728852395285', '4354', '1', 'dfdfdfd', '0', '1', '1493728821084619', 'ceshi', '1', '', '1493729652050', null, '1493728821084619', '1493729408315', '1493729652050', '0');
INSERT INTO `pmo_requirements` VALUES ('4a2a1201315c4205b770f860b4f91aec', '845c468859e840c0b511a5e94acb8d32', 'YC201705001', '啦啦啦啦啦', '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', '1', null, '1493881230294', '0', null, null, 'pmo02', '需求审核', '1493092377774187', '大米', '1493692811168109', 'wang', '1493692811168109', 'wang', null, null, '0', null, null, null, null, null, '0', null, '1493692811168109', '1493881230294', '1493881230399', '0');
INSERT INTO `pmo_requirements` VALUES ('523c725477e14a46ba57229758bc62d3', '875572dbe88e4d8b848c45297f3216cb', 'YC201705023', 'hhhhhhhhhh', 'dssssssssssssssssssssssssssss', '2', null, '1494212949276', '0', null, null, 'pmo03', '二审', '1493707775786632', 'admin2', '1493707775786632', 'admin2', '1493707775786632', 'admin2', '1', 'sssssssssssss', '1494238385091', '1', '1493691880144105', 'Bonnie', null, null, '0', null, '1493707775786632', '1494212949276', '1494238385091', '0');
INSERT INTO `pmo_requirements` VALUES ('53115330dd1a4109bef4af264d0e2cb9', '68998cc86bfc40baa3d66b23abdf703b', null, '26262', '6256259', '1', null, '1494579574113', '0', null, null, 'finish', '结束流程', '149309277119666', '黄修彬', '149309277119779', '游锦青', '149309277119779', '游锦青', '1', '2262', '0', '1', '149309277119815', '苏惠红', '2', '', '1494579901132', null, 'finish', '1494579574113', '1494579901132', '0');
INSERT INTO `pmo_requirements` VALUES ('56ac7dcc02954c74b1c210b4cda5b125', '8e225e5857e84a22adb59f9c136c222f', 'YC201705002', '地方大幅度', 'jklhjhk', '1', null, '1493708615110', '0', null, null, 'pmo02', '需求审核', '1493092286632390', '王大锤', '1493692811168109', 'wang', '1493692811168109', 'wang', null, null, '0', null, null, null, null, null, '0', null, '1493692811168109', '1493708615110', '1493708615215', '0');
INSERT INTO `pmo_requirements` VALUES ('59f030a649ba46f89a70577279705729', '0cd30563737f4d3bb5dc8f24a75520ad', 'YC201704001', '项目经理小A测试一下下', '阿斯顿发生', '1', null, '1493568000000', '1496419199999', null, null, 'finish', '结束流程', '1493303608040512', '市场负责人小B', '1493303506518949', '项目经理小A', '1493303506518949', '项目经理小A', '1', '我同意了，我是小A', '0', '2', null, null, null, null, '0', null, '1493303506518949', '1493308713933', '1493322325330', '0');
INSERT INTO `pmo_requirements` VALUES ('617f87e2e36b46a88ad64c0d45704202', 'b1f59f3375ae40a6b9997dfc9edcdff5', null, '33333333333333333', '3333333333333333333333333333333333', '1', null, '1494297091892', '0', null, null, 'pmo02', '需求审核', '149309277119797', '何凡凡', '149309277119712', '朱天同', '149309277119712', '朱天同', null, null, '0', null, null, null, null, null, '0', null, '149309277119712', '1494297091892', '1494297091967', '0');
INSERT INTO `pmo_requirements` VALUES ('66d99ee61bab49af9bcbfb96425e7741', '824d9e10f8cd478ea3de1b484a039abc', null, 'dfdfdf', 'dfdfdfdf', '1', null, '1493970041188', '0', null, null, 'pmo02', '需求审核', '1493092286632390', '王大锤', '1493092286632390', '王大锤', '1493092286632390', '王大锤', null, null, '0', null, null, null, null, null, '0', null, '1493092286632390', '1493970041188', '1493970041258', '0');
INSERT INTO `pmo_requirements` VALUES ('6d9eb32e33c94c778d83056a583ba3d0', '915d9dc85a5e47e694b54d1074c10d26', null, '566256', 'cheussncdshnju', '1', null, '1494518400000', '1496246399999', null, null, 'pmo05', '任务处理', '149309277119815', '苏惠红', '149309277119779', '游锦青', '149309277119779', '游锦青', '1', '2561265', '0', '1', '149309277119740', '黄培培', '1', '', '0', '&lt;p&gt;你好呀你好呀&lt;/p&gt;', '149309277119779', '1494580004709', '1494581373184', '0');
INSERT INTO `pmo_requirements` VALUES ('70dd818d923d438f8fd6ec5c958e94cb', 'f52c875c6d11486f8c78d3cc4a47449c', 'YC201705015', '不告诉你', '1545645646465156115611511156156156156额我kfc鬼王护法瑞回复u哦无关风月我发给忽悠何物i重复i和jwhewdiufoigqo，。/’；【】|}{P_)*(E)&amp;amp;#*(@!%&amp;amp;$@$cvrvrvvv', '1', null, '1493894449301', '0', null, null, 'pmo02', '需求审核', '1', '超级管理员', '1493303676101946', '项目成员q', '1493303676101946', '项目成员q', null, null, '0', null, null, null, null, null, '0', null, '1493303676101946', '1493894449301', '1493894449368', '0');
INSERT INTO `pmo_requirements` VALUES ('76001af93bde4901ad495e28ca129865', '77ea5cfb6cf44687aa3ae14597f15c17', null, '951oo', '21221', '1', null, '1494345600000', '1496246399999', null, null, 'finish', '结束流程', '149309277119660', '齐焕', '149309277119675', '张祖媛', '149309277119675', '张祖媛', '1', '4646', '0', '1', '149309277119637', '吴辉', '1', '', '0', null, '149309277119675', '1494397251855', '1494399993030', '0');
INSERT INTO `pmo_requirements` VALUES ('7964287d43e3410dbb8d2dc2c09ac2fb', '1b0029736d6943c4b06e08bfc27f1203', null, '星期天的', '1258', '1', null, '1494143793056', '0', null, null, 'pmo02', '需求审核', '1493886495278625', 'hbq', '1493973019250804', '测试1', '1493973019250804', '测试1', null, null, '0', null, null, null, null, null, '0', null, '1493973019250804', '1494143793056', '1494143793152', '0');
INSERT INTO `pmo_requirements` VALUES ('7af2f10b52ff4f488f0dc420642a91ea', 'c792fb25886b4176b4bef189220ed537', 'YC201705019', 'nihao', '123', '1', null, '1494143506137', '0', null, null, 'pmo04', '任务派发', '1493886495278625', 'hbq', '1493692811168109', 'wang', '1493692811168109', 'wang', '1', '', '1494145839131', '2', null, null, null, null, '0', null, '1493973019250804', '1494143506137', '1494145839131', '0');
INSERT INTO `pmo_requirements` VALUES ('7fb2c1693ee741efaf02f551ae347705', 'f52c875c6d11486f8c78d3cc4a47449c', 'YC201705015', '546464', '放入俄方，人；；‘；；’；v；尽快发v个', '2', null, '1493894491985', '0', null, null, 'pmo02', '需求审核', '1', '超级管理员', '1493303781142696', '项目成员e', '1493303781142696', '项目成员e', null, null, '0', null, null, null, null, null, '0', null, '1493303781142696', '1493894491985', '1493894492052', '0');
INSERT INTO `pmo_requirements` VALUES ('8f56444378b04018a564f4f691617f3f', 'd3f443efc55a4f67ae953f65d92d10cc', 'YC201705014', 'asasa', 'asasas', '1', null, '1493966312163', '0', null, null, 'pmo02', '需求审核', '1493092286632390', '王大锤', '1493092286632390', '王大锤', '1493092286632390', '王大锤', null, null, '0', null, null, null, null, null, '0', null, '1493092286632390', '1493966312163', '1493966312377', '0');
INSERT INTO `pmo_requirements` VALUES ('9b207ea924ca4a64be62dc450e983f2c', 'f24c13f7a17645bebd80e9361487f3fd', 'YC201705017', '789', '987', '1', null, '1494146427930', '0', null, null, 'pmo02', '需求审核', '1493886495278625', 'hbq', '1493973019250804', '测试1', '1493973019250804', '测试1', null, null, '0', null, null, null, null, null, '0', null, '1493973019250804', '1494146427930', '1494146428272', '0');
INSERT INTO `pmo_requirements` VALUES ('a82e85f7d3ba4dd9a5595d20f211cd5d', '1b0029736d6943c4b06e08bfc27f1203', 'YC201705021', '852', '258', '1', null, '1494145014137', '0', null, null, 'pmo02', '需求审核', '1493973019250804', '测试1', '1493886495278625', 'hbq', '1493886495278625', 'hbq', null, null, '0', null, null, null, null, null, '0', null, '1493886495278625', '1494145014137', '1494145014203', '0');
INSERT INTO `pmo_requirements` VALUES ('a9b155fa871a4c3f9fff567d7d4b0018', '875572dbe88e4d8b848c45297f3216cb', null, '名命名明明木木木木木木', '少时诵诗书所所所所所多付', '2', null, '1494210786190', '0', null, null, 'pmo02', '需求审核', '1493707775786632', 'admin2', '1493707775786632', 'admin2', '1493707775786632', 'admin2', null, null, '0', null, null, null, null, null, '0', null, '1493707775786632', '1494210786190', '1494210786309', '0');
INSERT INTO `pmo_requirements` VALUES ('b1c76a20eec6482896b5bf808ff9d7e9', 'c18c14b30e0e41f2ae681fef2b396d61', null, '0232', '5565', '1', null, '1494518400000', '1496246399999', null, null, 'pmo05', '任务处理', '149309277119675', '张祖媛', '149309277119675', '张祖媛', '149309277119675', '张祖媛', '1', '26626', '0', '2', null, null, null, null, '0', null, '149309277119675', '1494403034855', '1494572043958', '0');
INSERT INTO `pmo_requirements` VALUES ('b8a56bb875284ca89953eb1b8e712c9e', '80b30f31208c43d9944e93dfc7705b00', 'YC201705010', 'aaaaaaaaaaaaaaaaaaaaa', '&lt;p&gt;aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&lt;/p&gt;&lt;p&gt;&lt;img&nbsp;src=&quot;http://192.168.4.226:8081/ecms/file/download?&amp;amp;fileName=8443d523f47f4d978dc7db25a6f372e3&quot;&nbsp;alt=&quot;图片&quot;&gt;&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;', '1', null, '1493885145301', '0', null, null, 'pmo03', '二审', '1493303506518949', '项目经理小A', '1493303781142696', '项目成员e', '1493303781142696', '项目成员e', '1', '一审allow', '1493885835087', '1', '1493708036604873', 'adminz', null, null, '0', null, '1493303506518949', '1493885145301', '1493885835087', '0');
INSERT INTO `pmo_requirements` VALUES ('b8babc59e56048f3af04d6aca8ae1536', '238bc5fabec44b9e84db41bd3b5c6c28', 'YC201705024', '11111111111111111111111111', '1111111111111111111111111111111', '2', null, '1494246487720', '0', null, null, 'pmo02', '需求审核', '1493707775786632', 'admin2', '1494245747733701', '你好', '1494245747733701', '你好', null, null, '0', null, null, null, null, null, '0', null, '1494245747733701', '1494246487720', '1494246487843', '0');
INSERT INTO `pmo_requirements` VALUES ('be3af6dcbfd84e499e8bcf27d51c807e', '824d9e10f8cd478ea3de1b484a039abc', 'YC201705016', '需求接收人呢', '阿斯蒂芬', '1', null, '1494054706299', '0', null, null, 'pmo02', '需求审核', '1493708036604873', 'adminz', '1493691880144105', 'Bonnie', '1493691880144105', 'Bonnie', null, null, '0', null, null, null, null, null, '0', null, '1493691880144105', '1494054706299', '1494054706364', '0');
INSERT INTO `pmo_requirements` VALUES ('c83d3a287e724edf8947c8587b4350f6', '5fb5912555b2423c901512f7548f1b07', 'YC201705006', 'wrewe', 'rererererererere', '1', null, '1493708186725', '0', null, null, 'pmo02', '需求审核', '1493092286632390', '王大锤', '1493092286632390', '王大锤', '1493092286632390', '王大锤', null, null, '0', null, null, null, null, null, '0', null, '1493092286632390', '1493708186725', '1493708187054', '0');
INSERT INTO `pmo_requirements` VALUES ('cbb0fe2b624f4899b4227284dd527808', '193b050ba4f04f079c4d0732c791ca54', 'YC201705009', '嘎嘎嘎嘎嘎嘎嘎个', '&lt;p&gt;&amp;nbsp;所得到的多多多多多&lt;/p&gt;&lt;p&gt;&lt;img&nbsp;src=&quot;http://192.168.4.226:8081/ecms/file/download?&amp;amp;fileName=6d7e304b624e4fc5926764a282c060d0&quot;&nbsp;alt=&quot;图片&quot;&gt;&lt;/p&gt;&lt;p&gt;多多多多多多多多&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;', '1', null, '1493887268360', '0', null, null, 'pmo03', '二审', '1493303506518949', '项目经理小A', '1493303781142696', '项目成员e', '1493303781142696', '项目成员e', '1', '', '1493894319931', '1', '1493707775786632', 'admin2', null, null, '0', null, '1493303506518949', '1493887268360', '1493894319931', '0');
INSERT INTO `pmo_requirements` VALUES ('dbf588e7692546d6a9fafb1fcd95a366', '1b0029736d6943c4b06e08bfc27f1203', 'YC201705021', '963', '12', '1', null, '1494146243421', '0', null, null, 'pmo02', '需求审核', '1493886495278625', 'hbq', '1493886495278625', 'hbq', '1493886495278625', 'hbq', null, null, '0', null, null, null, null, null, '0', null, '1493886495278625', '1494146243421', '1494146243509', '0');
INSERT INTO `pmo_requirements` VALUES ('df95e9fe03604cd288411fcbe882ff90', 'd7e427b91fdd4b7dbcc830a3c4cadb9e', 'YC201705040', 'sffs', 'fssfsfs', '1', null, '1494555446667', '0', null, null, 'finish', '结束流程', '149309277119860', '方成', '149309277119860', '方成', '149309277119860', '方成', '2', 'sdfsdfsdfsdfsdf', '1494555509024', '', null, null, null, null, '0', null, 'finish', '1494555446667', '1494555509024', '0');
INSERT INTO `pmo_requirements` VALUES ('e686fa02839047479a70ef1bd2e1400c', 'f24c13f7a17645bebd80e9361487f3fd', null, '30202', '2+62+626', '1', null, '1493978288812', '0', null, null, 'pmo03', '二审', '1493973019250804', '测试1', '1493886495278625', 'hbq', '1493886495278625', 'hbq', '1', '不说不说', '1493981808061', '1', '1493973019250804', '测试1', null, null, '0', null, '1493886495278625', '1493978288812', '1493981808061', '0');
INSERT INTO `pmo_requirements` VALUES ('ec6753fa151d448a83e422f4e88aee4f', '4bed7dc2e67948d5b92cf3c084886354', 'YC201705012', '哦哈哈哈哈', '少时诵诗书所所所所所所所所所所所所所所所所所', '1', null, '1493881318691', '0', null, null, 'pmo02', '需求审核', '1493707775786632', 'admin2', '1493303430821480', 'BBB', '1493303430821480', 'BBB', null, null, '0', null, null, null, null, null, '0', null, '1493303430821480', '1493881318691', '1493881318805', '0');

-- ----------------------------
-- Table structure for portal_news
-- ----------------------------
DROP TABLE IF EXISTS `portal_news`;
CREATE TABLE `portal_news` (
  `id` varchar(32) NOT NULL,
  `news_title` varchar(40) NOT NULL COMMENT '新闻标题',
  `news_type` int(3) NOT NULL DEFAULT '0' COMMENT '资讯类型0新闻1资讯',
  `content` text COMMENT '正文内容',
  `is_comment` int(1) NOT NULL DEFAULT '0' COMMENT '0可以评论 1不可以评论',
  `news_author` varchar(32) NOT NULL COMMENT '新闻作者',
  `comment_count` int(4) DEFAULT NULL COMMENT '评论数量',
  `voters_count` int(4) DEFAULT '0' COMMENT '攒数量',
  `picture_id` varchar(32) DEFAULT NULL COMMENT '新闻配图',
  `add_person_id` varchar(32) DEFAULT NULL,
  `add_person_name` varchar(40) DEFAULT NULL COMMENT '添加人姓名',
  `attachment_id` varchar(255) DEFAULT NULL,
  `attachment_name` varchar(255) DEFAULT NULL,
  `publish_date` bigint(20) DEFAULT NULL COMMENT '发布日期',
  `publish_type` int(2) DEFAULT '0' COMMENT '咨询发布类型 0 普通列表发布，1图片展示发布',
  `is_publish` int(1) NOT NULL DEFAULT '1' COMMENT '是否发布 0 发布 1 不发布',
  `is_top` int(1) DEFAULT '1' COMMENT '0 置顶 1 不置顶',
  `add_time` bigint(20) NOT NULL COMMENT '添加时间',
  `update_time` bigint(20) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of portal_news
-- ----------------------------
INSERT INTO `portal_news` VALUES ('02d8c6ae6c5d4171981e0b93f80d2ca2', '新增测试内容是否还原', '0', '<p>这里是正文</p><p>这里是正文这里是正文这里是正文这里是正文这里是正文<br></p><p>这里是正文<br></p><p>这里是正文<br></p><p><br></p>', '0', '', '0', '0', null, '149309277119872', '冉成伟', null, null, '1494288000000', '0', '1', '1', '1494297251168', '1494297251168');
INSERT INTO `portal_news` VALUES ('0db4342551d74c02b744d994b1b01157', '多次点击测试', '0', '<p>多次点击测试多次点击测试多次点击测试多次点击测试</p><p><br></p>', '0', '', '0', '0', null, '149309277119872', '冉成伟', null, null, '1494288000000', '0', '1', '1', '1494298698409', '1494298698409');
INSERT INTO `portal_news` VALUES ('0f9be73b7fc4453bb8e2328c7414845f', '新增新闻测试——', '0', '<p>&nbsp;2017年4月10日-11日，由东南大学交通法治与发展研究中心、南京市城市管理局、南京市停车服务业协会联合主办的“2017第四届城市停车治理论坛”在南京玄武湖畔南京国际展览中心隆重举行，来自政府、高校、协会及企业的各界专家学者、精英大咖齐聚一堂，就“城市停车难问题及城市停车信息系统建设的政策、标准和技术”进行深入交流和探讨，现场气氛热烈。亿车科技作为南京智慧停车产业联盟成员及东南大学城市停车信息云平台重要战略合作伙伴应邀参加会议。公司CEO佘志登先生在大会上分享了“国内道路停车系统建设的政策依据及关键技术”，以亿车承建的20多个城市级道路停车系统建设为案例，详细的讲解了智慧停车建设的政策依据和关键技术，向与会嘉宾介绍了亿车科技“基于物联网的城市级静态交通”产品体系和综合解决方案，全面阐述了亿车科技继续推进开放、稳健的公司发展战略。</p><p><img src=\"file:///C:/Users/huang/AppData/Local/Temp/ksohtml/wpsF338.tmp.jpg\"><img src=\"http://112.74.74.3:8001/ecaray/backfiles/news/116221185976848384\" alt=\"图片\"></p><p>图：亿车科技CEO佘志登先生作为企业家代表在大会发言</p><p>&nbsp; &nbsp; &nbsp; 同时，2017南京智慧交通博览会也在南京国际展览中心盛大召开，亿车科技作为南京智慧停车产业联盟成员及东南大学城市停车信息云平台重要战略合作伙伴携全线新品、技术及解决方案隆重参展。</p><p>&nbsp; &nbsp; &nbsp; “共享物联网新技术，创建智能静态交通”是亿车本次参展的主题，充分体现了亿车科技在城市静态交通领域继续深入开拓的决心和新一代物联网技术应用领域的探索和准备。亿车本次展出的城市级静态交通管理云平台服务，涵盖路内停车、路外停车及新能源等多个细分领域的解决方案及海量物联网智能设备，受到与会领导、媒体及参观者的重点关注与极大兴趣。</p><p><img src=\"file:///C:/Users/huang/AppData/Local/Temp/ksohtml/wpsF339.tmp.png\"><img src=\"http://112.74.74.3:8001/ecaray/backfiles/news/116221279971201024\" alt=\"图片\"></p><p>图：江苏省交通运输厅厅长、副厅长莅临亿车科技展台</p><p><img src=\"file:///C:/Users/huang/AppData/Local/Temp/ksohtml/wpsF33A.tmp.png\"><img src=\"http://112.74.74.3:8001/ecaray/backfiles/news/116221726815571968\" alt=\"图片\"></p><p>图：东南大学专家顾大松教授及交通厅领导一行莅临亿车展位参观交流</p><p><img src=\"file:///C:/Users/huang/AppData/Local/Temp/ksohtml/wpsF34B.tmp.png\"><img src=\"http://112.74.74.3:8001/ecaray/backfiles/news/116221663099899904\" alt=\"图片\"></p><p>图：亿车科技CEO佘志登接受南京电视台新闻频道采访</p><p>&nbsp;“城市级一体化管理”受热捧</p><p>&nbsp; &nbsp; &nbsp; 此次展会亿车展示了“路内停车+路外停车+充电桩三位一体解决方案” 完美展现了亿车城市级静态交通整体解决方案全方位能力；与此同时亿车还带来了领先业内的新一代地磁检测器，多功能PDA和充电桩等物联网设备，面对用户复杂、个性化的应用需求，提供多样性、个性化的解决方案和用户体验。</p><p>“前瞻技术”引关注</p><p>&nbsp;除了有领先的产品之外，作为创新驱动型的代表性企业，亿车科技还带来了行业内极具前瞻性的技术，包括停车云计算、大倾角视频技术、NB-LOT、雷达检测及新一代充电桩等新技术。</p><p><img src=\"file:///C:/Users/huang/AppData/Local/Temp/ksohtml/wpsF34C.tmp.png\"><img src=\"http://112.74.74.3:8001/ecaray/backfiles/news/116221934949519360\" alt=\"图片\"></p><p>“开放、共享、连接”理念成焦点</p><p>&nbsp; &nbsp; &nbsp; 当前，智慧停车行业正处于转型升级的关键时期。亿车科技持续在技术、产品及运营发力之外，如何营造行业良性发展环境，提升行业体验和品质，实现政府、企业和车主三方共赢，亿车也有自己的深度思考。为此，亿车创造性的提出了“开放、共享、链接”的新理念，各方发挥各自优势、充分利用自身优势资源，开创行业共赢新局面。</p><p>&nbsp; &nbsp; &nbsp; 纵观本届南京论坛及展会，我们深感2017年将是中国停车产业蓬勃发展的一年，越来越多的有识之士投身于此、业界同仁对产业认识愈加清晰、城市停车必将迎来新的爆发点。当然，挑战与机遇并存，荣誉与艰辛同在。祝愿中国停车产业越来越好，亿车愿尽绵薄之力，与行业伙伴共同成长！</p><p><br></p>', '0', 'test——测试修改', '0', '0', null, null, null, 'abc67b36cca14b029b6e4184858b75d5', '骆驼快充V2.0.5升级测试用例.xls', '1495065600000', '0', '0', '0', '1493864512552', '1494329622075');
INSERT INTO `portal_news` VALUES ('1', '关于五一的放假通知', '1', '公司各部门及全体员工: 　<br/>　　五一放假共3天，2017年4月29日-5月1日放假，共3天。', '0', '张三', '0', '0', '0', '0', '0', null, null, '1493711567189', '1', '0', '0', '1493711567189', '1494239182919');
INSERT INTO `portal_news` VALUES ('142ceb9c0c054f5689a9beb462ccf524', '新增置顶测试', '0', '<p>这里是置顶测试正文这里是置顶测试正文这里是置顶测试正文这里是置顶测试正文这里是置顶测试正文这里是置顶测试正文这里是置顶测试正文这里是置顶测试正文这里是置顶测试正文这里是置顶测试正文<br></p><p><br></p>', '0', 'test', '0', '0', 'd1f288cb3ad44093b1f50e19207c5fb8', null, null, 'b61de1760ea14127a747c84ef8085ba3', 'QQ图片20170123171637.jpg', '1495497600000', '0', '0', '0', '1493970513426', '1494053808093');
INSERT INTO `portal_news` VALUES ('19058644a78c4277b8a4895635aa4871', '新增新闻测试', '0', '<p>这里是新闻的类型</p>', '0', 'test', '0', '0', null, null, null, null, null, '1493856000000', '0', '0', '1', '1493866266740', '1493866266740');
INSERT INTO `portal_news` VALUES ('2', 'nww2', '1', '1asdfadf阿斯顿发顺丰', '0', '李四', '0', '0', '', '1', '1', null, null, '1493711567189', '1', '0', '0', '1493711567189', '1494409330150');
INSERT INTO `portal_news` VALUES ('2b1c1f4d4c0c4d9fa037e7a0e638335d', 'yy', '0', '561215156', '0', '', '0', '0', null, '149309277119779', '游锦青', '5afb1c3a29aa4f73b809c49ccaa33cef', '骆驼快充微信公众号测试用例.xls', '1494374400000', '0', '0', '1', '1494412766848', '1494473957742');
INSERT INTO `portal_news` VALUES ('3', 'nww3', '1', '爱的世界阿斯蒂芬李', '0', '王五', '0', '0', '', '1', '1', null, null, '1493711567189', '0', '0', '0', '1493711567189', '1494409340338');
INSERT INTO `portal_news` VALUES ('31ead84420c7436b88f38ca8707e57a5', '附件测试', '0', '<p>这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文<br></p><p><br></p>', '0', 'test', '0', '0', '6b3416ee2829411fb7e462100df1bad0', null, null, '650fff185c6241508ff4f2305bd1e0e6', 'QQ图片20170123175123.jpg', '1493856000000', '0', '1', '1', '1493886476096', '1494223913972');
INSERT INTO `portal_news` VALUES ('377047e7383745b6864dc801d17a8595', '多次点击新增测试', '0', '<p>多次点击新增测试多次点击新增测试多次点击新增测试多次点击新增测试</p><p><br></p>', '0', '', '0', '0', null, '149309277119872', '冉成伟', null, null, '1494288000000', '0', '1', '1', '1494298377877', '1494298377877');
INSERT INTO `portal_news` VALUES ('4b512c07d20f49a187a4c62d335f4591', 'adsf-带图', '0', '<p>带图的东西<br></p>', '0', 'd', '0', '0', '2dcda0a84a6b41adb8388aa263113ba0', null, null, '07deffde03254d7d89cececa184de3d1', '骆驼快充微信公众号测试用例.xls', '1494374400000', '0', '1', '1', '1493867572436', '1494474060685');
INSERT INTO `portal_news` VALUES ('4c5355ffe95648678b460961669a93d5', '你好', '0', '123', '0', '', '0', '0', null, '1', '超级管理员', null, null, '1494288000000', '0', '1', '1', '1494329811717', '1494329811717');
INSERT INTO `portal_news` VALUES ('4d75604729884fe097761471f0d3daee', '表单重置', '0', '<p>这里是表单重置测试</p><p>这里是表单重置测试这里是表单重置测试这里是表单重置测试这里是表单重置测试<br></p><p><br></p>', '0', '这里是表单重置测试', '0', '0', null, '149309277119872', '冉成伟', null, null, '1494288000000', '0', '1', '1', '1494298206985', '1494298235670');
INSERT INTO `portal_news` VALUES ('72bd4717df904991811674f5fa4be458', '哈哈哈哈222222', '0', '啊啊啊啊啊啊啊啊', '0', '啊', '0', '0', 'c9bbf472a1e34ea6b199dd117aeac846', '1493707775786632', 'admin2', null, null, '1494201600000', '0', '0', '0', '1494246398967', '1494246398967');
INSERT INTO `portal_news` VALUES ('926b8f97930d4c35a0c7894f7dd433a5', '测963852', '0', '<p>不说了</p>', '0', '', '0', '0', null, '149309277119779', '游锦青', 'a252491425084821beac16f0acce09ba', 'Desert.jpg', '1494374400000', '0', '1', '1', '1494412650655', '1494413619293');
INSERT INTO `portal_news` VALUES ('ac7ebeb511d24afc975ec763409b355c', '哈哈哈哈', '0', '啊啊啊啊啊啊啊啊', '0', '啊', '0', '0', 'c9bbf472a1e34ea6b199dd117aeac846', '1493707775786632', 'admin2', '257a1625cbb74a958b5afdee36bbac96', 'QQ图片20170303105729.png', '1494201600000', '0', '1', '0', '1494246356259', '1494246356259');
INSERT INTO `portal_news` VALUES ('c344872a5f0344e7878ec60b055d9af7', '新增新闻测试', '0', '<p>这里是新闻测试正文这里是新闻测试正文这里是新闻测试正文这里是新闻测试正文这里是新闻测试正文这里是新闻测试正文这里是新闻测试正文这里是新闻测试正文这里是新闻测试正文这里是新闻测试正文这里是新闻测试正文<br></p><p><br></p>', '0', 'test', null, '0', null, null, null, null, null, '1493856000000', '0', '1', '1', '1493863714116', '1493863714116');
INSERT INTO `portal_news` VALUES ('cc6a617a243b451eba50dc71e7d55cc1', '测试====测试', '1', '4568156', '0', '', '0', '0', null, '1494245747733701', '你好', null, null, '1494201600000', '0', '1', '1', '1494246513367', '1494246513367');
INSERT INTO `portal_news` VALUES ('da863fc1a7184c37b961d33f3a19f29f', '亿车科技应邀参加 第四届城市停车治理论坛暨2017南京智慧交通博览会', '0', '<p>&nbsp; &nbsp;2017年4月10日-11日，由东南大学交通法治与发展研究中心、南京市城市管理局、南京市停车服务业协会联合主办的“2017第四届城市停车治理论坛”在南京玄武湖畔南京国际展览中心隆重举行，来自政府、高校、协会及企业的各界专家学者、精英大咖齐聚一堂，就“城市停车难问题及城市停车信息系统建设的政策、标准和技术”进行深入交流和探讨，现场气氛热烈。亿车科技作为南京智慧停车产业联盟成员及东南大学城市停车信息云平台重要战略合作伙伴应邀参加会议。公司CEO佘志登先生在大会上分享了“国内道路停车系统建设的政策依据及关键技术”，以亿车承建的20多个城市级道路停车系统建设为案例，详细的讲解了智慧停车建设的政策依据和关键技术，向与会嘉宾介绍了亿车科技“基于物联网的城市级静态交通”产品体系和综合解决方案，全面阐述了亿车科技继续推进开放、稳健的公司发展战略。</p><p><img src=\"http://112.74.74.3:8001/ecaray/backfiles/news/116221185976848384\" alt=\"图片\"></p><p>图：亿车科技CEO佘志登先生作为企业家代表在大会发言</p><p>&nbsp; &nbsp; &nbsp; 同时，2017南京智慧交通博览会也在南京国际展览中心盛大召开，亿车科技作为南京智慧停车产业联盟成员及东南大学城市停车信息云平台重要战略合作伙伴携全线新品、技术及解决方案隆重参展。</p><p>&nbsp; &nbsp; &nbsp; “共享物联网新技术，创建智能静态交通”是亿车本次参展的主题，充分体现了亿车科技在城市静态交通领域继续深入开拓的决心和新一代物联网技术应用领域的探索和准备。亿车本次展出的城市级静态交通管理云平台服务，涵盖路内停车、路外停车及新能源等多个细分领域的解决方案及海量物联网智能设备，受到与会领导、媒体及参观者的重点关注与极大兴趣。</p><p><img src=\"http://112.74.74.3:8001/ecaray/backfiles/news/116221279971201024\" alt=\"图片\"></p><p>图：江苏省交通运输厅厅长、副厅长莅临亿车科技展台</p><p><img src=\"http://112.74.74.3:8001/ecaray/backfiles/news/116221726815571968\" alt=\"图片\"></p><p>图：东南大学专家顾大松教授及交通厅领导一行莅临亿车展位参观交流</p><p><img src=\"http://112.74.74.3:8001/ecaray/backfiles/news/116221663099899904\" alt=\"图片\"></p><p>图：亿车科技CEO佘志登接受南京电视台新闻频道采访</p><p>&nbsp;“城市级一体化管理”受热捧</p><p>&nbsp; &nbsp; &nbsp; 此次展会亿车展示了“路内停车+路外停车+充电桩三位一体解决方案” 完美展现了亿车城市级静态交通整体解决方案全方位能力；与此同时亿车还带来了领先业内的新一代地磁检测器，多功能PDA和充电桩等物联网设备，面对用户复杂、个性化的应用需求，提供多样性、个性化的解决方案和用户体验。</p><p>“前瞻技术”引关注</p><p>&nbsp;除了有领先的产品之外，作为创新驱动型的代表性企业，亿车科技还带来了行业内极具前瞻性的技术，包括停车云计算、大倾角视频技术、NB-LOT、雷达检测及新一代充电桩等新技术。</p><p><img src=\"http://112.74.74.3:8001/ecaray/backfiles/news/116221934949519360\" alt=\"图片\"></p><p>“开放、共享、连接”理念成焦点</p><p>&nbsp; &nbsp; &nbsp; 当前，智慧停车行业正处于转型升级的关键时期。亿车科技持续在技术、产品及运营发力之外，如何营造行业良性发展环境，提升行业体验和品质，实现政府、企业和车主三方共赢，亿车也有自己的深度思考。为此，亿车创造性的提出了“开放、共享、链接”的新理念，各方发挥各自优势、充分利用自身优势资源，开创行业共赢新局面。</p><p>&nbsp; &nbsp; &nbsp; 纵观本届南京论坛及展会，我们深感2017年将是中国停车产业蓬勃发展的一年，越来越多的有识之士投身于此、业界同仁对产业认识愈加清晰、城市停车必将迎来新的爆发点。当然，挑战与机遇并存，荣誉与艰辛同在。祝愿中国停车产业越来越好，亿车愿尽绵薄之力，与行业伙伴共同成长！</p><p><br></p>', '0', '', '0', '0', null, null, null, '8a8551227f0b4682ba862b735b5bf6dc', 'logo-底色.png', '1493942400000', '0', '0', '1', '1493964759883', '1493970969922');
INSERT INTO `portal_news` VALUES ('e165eee65b8842088729e63e108ce435', '新增新闻', '0', '<p>这里是新闻正文<img src=\"http://192.168.4.226:8081/ecms/news/picture/content/599d7b2dbd764fbe963a76bda68cfa2b/download\" alt=\"图片\"></p><p><br></p>', '0', 'test', null, '0', '8e4c354b9f0c41dd9b7d644baf403b1b', null, null, null, null, '1490486400000', '0', '1', '0', '1493882170778', '1493969528620');
INSERT INTO `portal_news` VALUES ('fb119a34919a42dab0df664a0a0dfcfa', '测试====测试', '1', '4568156', '0', '', '0', '0', null, '1494245747733701', '你好', null, null, '1494201600000', '0', '1', '1', '1494246512970', '1494246512970');

-- ----------------------------
-- Table structure for portal_news_com
-- ----------------------------
DROP TABLE IF EXISTS `portal_news_com`;
CREATE TABLE `portal_news_com` (
  `id` varchar(32) NOT NULL COMMENT '主键ID',
  `new_id` varchar(32) NOT NULL COMMENT '新闻ID',
  `content` text COMMENT '评论内容',
  `status` int(1) DEFAULT NULL COMMENT '评论状态0显示1隐藏2删除',
  `parent_id` varchar(32) DEFAULT NULL COMMENT '父级评论id，如果是一级评论 默认为 0',
  `add_person_id` varchar(32) DEFAULT NULL COMMENT '添加人ID',
  `add_person_name` varchar(40) DEFAULT NULL COMMENT '添加人姓名',
  `comment_count` int(4) DEFAULT '0' COMMENT '评论数量',
  `view_count` int(4) DEFAULT NULL,
  `voters_count` int(4) DEFAULT '0' COMMENT '赞同数量默认0',
  `is_cryptonym` int(2) DEFAULT '0' COMMENT '是否匿名 0非匿名1 匿名',
  `add_time` bigint(20) NOT NULL,
  `update_time` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of portal_news_com
-- ----------------------------
INSERT INTO `portal_news_com` VALUES ('0da9cb7871504577929620d7d25c5e1f', '19058644a78c4277b8a4895635aa4871', 'gth', '0', '0', '149309277119883', '冯冬双', '0', null, '0', '0', '1494379062086', '1494379062086');
INSERT INTO `portal_news_com` VALUES ('22006516d7fe4bcdadd8db998fd3dfba', 'da863fc1a7184c37b961d33f3a19f29f', '', '0', '0', '149309277119872', '冉成伟', '0', null, '0', '0', '1494386753731', '1494386753731');
INSERT INTO `portal_news_com` VALUES ('34b6ed7e8de848029fef4f1d2d7074e9', 'da863fc1a7184c37b961d33f3a19f29f', '评论校验测试', '0', '0', '149309277119872', '冉成伟', '0', null, '0', '0', '1494386944175', '1494386944175');
INSERT INTO `portal_news_com` VALUES ('3dead71d58f6477fb46ab2611e7de93a', '19058644a78c4277b8a4895635aa4871', 'gtgt', '0', '0', '149309277119883', '冯冬双', '0', null, '0', '0', '1494379065257', '1494379065257');
INSERT INTO `portal_news_com` VALUES ('48c7292454fd487a934293c5199f3214', 'da863fc1a7184c37b961d33f3a19f29f', '你好', '1', '0', '1493708036604873', 'adminz', '0', null, '0', '0', '1494040652651', '1494237208232');
INSERT INTO `portal_news_com` VALUES ('48c7292454fd487a934293c5199f3f14', 'da863fc1a7184c37b961d33f3a19f29f', '你好', '0', '0', '1493708036604873', 'adminz', '0', null, '0', '0', '1494040652651', '1494040652651');
INSERT INTO `portal_news_com` VALUES ('4f2b84207e0243ee9e7f6f6e5a56f61b', '1', '1545565', '1', '0', '149309277119675', '张祖媛', '0', null, '0', '0', '1494408976901', '1494409018100');
INSERT INTO `portal_news_com` VALUES ('54cbe38709ea433190401e07f6ad3ed3', '142ceb9c0c054f5689a9beb462ccf524', '65454', '1', '0', '149309277119779', '游锦青', '0', null, '0', '0', '1494406502572', '1494406520192');
INSERT INTO `portal_news_com` VALUES ('72e0296f0d5e46f482d02ae15294751f', '0f9be73b7fc4453bb8e2328c7414845f', '测试评论数量', '0', '0', '1493708036604873', 'adminz', '0', null, '0', '0', '1494224643030', '1494224643030');
INSERT INTO `portal_news_com` VALUES ('7bc485a03e864837a26036c721a68356', '19058644a78c4277b8a4895635aa4871', '', '0', '0', '149309277119666', '黄修彬', '0', null, '0', '0', '1494386202998', '1494386202998');
INSERT INTO `portal_news_com` VALUES ('84f53375591d43eeb4232b1f6daecdd8', '2', 'dfdfddf', '0', '0', '1493092286632390', '王大锤', '0', null, '0', '0', '1494040623931', '1494040623931');
INSERT INTO `portal_news_com` VALUES ('8755723b04214450a23dfa1253e7d5b9', '2', 'dfhdjfhf', '0', '0', '1493092286632390', '王大锤', '0', null, '0', '0', '1494040609535', '1494040609535');
INSERT INTO `portal_news_com` VALUES ('907042e99815411098fe0092c3ed1ba2', '19058644a78c4277b8a4895635aa4871', 'gtgt', '0', '0', '149309277119883', '冯冬双', '0', null, '0', '0', '1494379068770', '1494379068770');
INSERT INTO `portal_news_com` VALUES ('a81e9cac0c914f87a7555d7aeb40626c', '0f9be73b7fc4453bb8e2328c7414845f', '你好呀', '1', '0', '1493886495278625', 'hbq', '0', null, '0', '0', '1494239221817', '1494242023693');
INSERT INTO `portal_news_com` VALUES ('ab155fb49b504b07b1163929f9bb37f1', '19058644a78c4277b8a4895635aa4871', '', '0', '0', '149309277119666', '黄修彬', '0', null, '0', '0', '1494386246360', '1494386246360');
INSERT INTO `portal_news_com` VALUES ('ae6e236cba5a431fa0dca7d04605eb0f', '1', 'nihao', '0', '0', '149309277119675', '张祖媛', '0', null, '0', '0', '1494408985220', '1494408985220');
INSERT INTO `portal_news_com` VALUES ('ca971b57084243dd9d1caf47c592825c', '142ceb9c0c054f5689a9beb462ccf524', '', '0', '0', '149309277119779', '游锦青', '0', null, '0', '0', '1494406496997', '1494406496997');
INSERT INTO `portal_news_com` VALUES ('fb40e3a5af1c41f1a65b6c44cdd27009', '2', 'dfdfdf', '0', '0', '1493092286632390', '王大锤', '0', null, '0', '0', '1494040618892', '1494040618892');

-- ----------------------------
-- Table structure for sys_app
-- ----------------------------
DROP TABLE IF EXISTS `sys_app`;
CREATE TABLE `sys_app` (
  `id` varchar(38) NOT NULL COMMENT '主键ID',
  `code` varchar(20) DEFAULT NULL COMMENT '编码',
  `url` varchar(255) DEFAULT NULL COMMENT '地址',
  `status` int(2) DEFAULT NULL COMMENT '状态',
  `create_time` varchar(20) DEFAULT NULL,
  `is_delete` int(2) NOT NULL DEFAULT '0' COMMENT '0有效，1逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_app
-- ----------------------------

-- ----------------------------
-- Table structure for sys_area
-- ----------------------------
DROP TABLE IF EXISTS `sys_area`;
CREATE TABLE `sys_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area_id` varchar(50) DEFAULT NULL,
  `area` varchar(60) DEFAULT NULL,
  `pid` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3145 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_area
-- ----------------------------
INSERT INTO `sys_area` VALUES ('1', '110101', '东城区', '110100');
INSERT INTO `sys_area` VALUES ('2', '110102', '西城区', '110100');
INSERT INTO `sys_area` VALUES ('3', '110103', '崇文区', '110100');
INSERT INTO `sys_area` VALUES ('4', '110104', '宣武区', '110100');
INSERT INTO `sys_area` VALUES ('5', '110105', '朝阳区', '110100');
INSERT INTO `sys_area` VALUES ('6', '110106', '丰台区', '110100');
INSERT INTO `sys_area` VALUES ('7', '110107', '石景山区', '110100');
INSERT INTO `sys_area` VALUES ('8', '110108', '海淀区', '110100');
INSERT INTO `sys_area` VALUES ('9', '110109', '门头沟区', '110100');
INSERT INTO `sys_area` VALUES ('10', '110111', '房山区', '110100');
INSERT INTO `sys_area` VALUES ('11', '110112', '通州区', '110100');
INSERT INTO `sys_area` VALUES ('12', '110113', '顺义区', '110100');
INSERT INTO `sys_area` VALUES ('13', '110114', '昌平区', '110100');
INSERT INTO `sys_area` VALUES ('14', '110115', '大兴区', '110100');
INSERT INTO `sys_area` VALUES ('15', '110116', '怀柔区', '110100');
INSERT INTO `sys_area` VALUES ('16', '110117', '平谷区', '110100');
INSERT INTO `sys_area` VALUES ('17', '110228', '密云县', '110200');
INSERT INTO `sys_area` VALUES ('18', '110229', '延庆县', '110200');
INSERT INTO `sys_area` VALUES ('19', '120101', '和平区', '120100');
INSERT INTO `sys_area` VALUES ('20', '120102', '河东区', '120100');
INSERT INTO `sys_area` VALUES ('21', '120103', '河西区', '120100');
INSERT INTO `sys_area` VALUES ('22', '120104', '南开区', '120100');
INSERT INTO `sys_area` VALUES ('23', '120105', '河北区', '120100');
INSERT INTO `sys_area` VALUES ('24', '120106', '红桥区', '120100');
INSERT INTO `sys_area` VALUES ('25', '120107', '塘沽区', '120100');
INSERT INTO `sys_area` VALUES ('26', '120108', '汉沽区', '120100');
INSERT INTO `sys_area` VALUES ('27', '120109', '大港区', '120100');
INSERT INTO `sys_area` VALUES ('28', '120110', '东丽区', '120100');
INSERT INTO `sys_area` VALUES ('29', '120111', '西青区', '120100');
INSERT INTO `sys_area` VALUES ('30', '120112', '津南区', '120100');
INSERT INTO `sys_area` VALUES ('31', '120113', '北辰区', '120100');
INSERT INTO `sys_area` VALUES ('32', '120114', '武清区', '120100');
INSERT INTO `sys_area` VALUES ('33', '120115', '宝坻区', '120100');
INSERT INTO `sys_area` VALUES ('34', '120221', '宁河县', '120200');
INSERT INTO `sys_area` VALUES ('35', '120223', '静海县', '120200');
INSERT INTO `sys_area` VALUES ('36', '120225', '蓟　县', '120200');
INSERT INTO `sys_area` VALUES ('37', '130101', '市辖区', '130100');
INSERT INTO `sys_area` VALUES ('38', '130102', '长安区', '130100');
INSERT INTO `sys_area` VALUES ('39', '130103', '桥东区', '130100');
INSERT INTO `sys_area` VALUES ('40', '130104', '桥西区', '130100');
INSERT INTO `sys_area` VALUES ('41', '130105', '新华区', '130100');
INSERT INTO `sys_area` VALUES ('42', '130107', '井陉矿区', '130100');
INSERT INTO `sys_area` VALUES ('43', '130108', '裕华区', '130100');
INSERT INTO `sys_area` VALUES ('44', '130121', '井陉县', '130100');
INSERT INTO `sys_area` VALUES ('45', '130123', '正定县', '130100');
INSERT INTO `sys_area` VALUES ('46', '130124', '栾城县', '130100');
INSERT INTO `sys_area` VALUES ('47', '130125', '行唐县', '130100');
INSERT INTO `sys_area` VALUES ('48', '130126', '灵寿县', '130100');
INSERT INTO `sys_area` VALUES ('49', '130127', '高邑县', '130100');
INSERT INTO `sys_area` VALUES ('50', '130128', '深泽县', '130100');
INSERT INTO `sys_area` VALUES ('51', '130129', '赞皇县', '130100');
INSERT INTO `sys_area` VALUES ('52', '130130', '无极县', '130100');
INSERT INTO `sys_area` VALUES ('53', '130131', '平山县', '130100');
INSERT INTO `sys_area` VALUES ('54', '130132', '元氏县', '130100');
INSERT INTO `sys_area` VALUES ('55', '130133', '赵　县', '130100');
INSERT INTO `sys_area` VALUES ('56', '130181', '辛集市', '130100');
INSERT INTO `sys_area` VALUES ('57', '130182', '藁城市', '130100');
INSERT INTO `sys_area` VALUES ('58', '130183', '晋州市', '130100');
INSERT INTO `sys_area` VALUES ('59', '130184', '新乐市', '130100');
INSERT INTO `sys_area` VALUES ('60', '130185', '鹿泉市', '130100');
INSERT INTO `sys_area` VALUES ('61', '130201', '市辖区', '130200');
INSERT INTO `sys_area` VALUES ('62', '130202', '路南区', '130200');
INSERT INTO `sys_area` VALUES ('63', '130203', '路北区', '130200');
INSERT INTO `sys_area` VALUES ('64', '130204', '古冶区', '130200');
INSERT INTO `sys_area` VALUES ('65', '130205', '开平区', '130200');
INSERT INTO `sys_area` VALUES ('66', '130207', '丰南区', '130200');
INSERT INTO `sys_area` VALUES ('67', '130208', '丰润区', '130200');
INSERT INTO `sys_area` VALUES ('68', '130223', '滦　县', '130200');
INSERT INTO `sys_area` VALUES ('69', '130224', '滦南县', '130200');
INSERT INTO `sys_area` VALUES ('70', '130225', '乐亭县', '130200');
INSERT INTO `sys_area` VALUES ('71', '130227', '迁西县', '130200');
INSERT INTO `sys_area` VALUES ('72', '130229', '玉田县', '130200');
INSERT INTO `sys_area` VALUES ('73', '130230', '唐海县', '130200');
INSERT INTO `sys_area` VALUES ('74', '130281', '遵化市', '130200');
INSERT INTO `sys_area` VALUES ('75', '130283', '迁安市', '130200');
INSERT INTO `sys_area` VALUES ('76', '130301', '市辖区', '130300');
INSERT INTO `sys_area` VALUES ('77', '130302', '海港区', '130300');
INSERT INTO `sys_area` VALUES ('78', '130303', '山海关区', '130300');
INSERT INTO `sys_area` VALUES ('79', '130304', '北戴河区', '130300');
INSERT INTO `sys_area` VALUES ('80', '130321', '青龙满族自治县', '130300');
INSERT INTO `sys_area` VALUES ('81', '130322', '昌黎县', '130300');
INSERT INTO `sys_area` VALUES ('82', '130323', '抚宁县', '130300');
INSERT INTO `sys_area` VALUES ('83', '130324', '卢龙县', '130300');
INSERT INTO `sys_area` VALUES ('84', '130401', '市辖区', '130400');
INSERT INTO `sys_area` VALUES ('85', '130402', '邯山区', '130400');
INSERT INTO `sys_area` VALUES ('86', '130403', '丛台区', '130400');
INSERT INTO `sys_area` VALUES ('87', '130404', '复兴区', '130400');
INSERT INTO `sys_area` VALUES ('88', '130406', '峰峰矿区', '130400');
INSERT INTO `sys_area` VALUES ('89', '130421', '邯郸县', '130400');
INSERT INTO `sys_area` VALUES ('90', '130423', '临漳县', '130400');
INSERT INTO `sys_area` VALUES ('91', '130424', '成安县', '130400');
INSERT INTO `sys_area` VALUES ('92', '130425', '大名县', '130400');
INSERT INTO `sys_area` VALUES ('93', '130426', '涉　县', '130400');
INSERT INTO `sys_area` VALUES ('94', '130427', '磁　县', '130400');
INSERT INTO `sys_area` VALUES ('95', '130428', '肥乡县', '130400');
INSERT INTO `sys_area` VALUES ('96', '130429', '永年县', '130400');
INSERT INTO `sys_area` VALUES ('97', '130430', '邱　县', '130400');
INSERT INTO `sys_area` VALUES ('98', '130431', '鸡泽县', '130400');
INSERT INTO `sys_area` VALUES ('99', '130432', '广平县', '130400');
INSERT INTO `sys_area` VALUES ('100', '130433', '馆陶县', '130400');
INSERT INTO `sys_area` VALUES ('101', '130434', '魏　县', '130400');
INSERT INTO `sys_area` VALUES ('102', '130435', '曲周县', '130400');
INSERT INTO `sys_area` VALUES ('103', '130481', '武安市', '130400');
INSERT INTO `sys_area` VALUES ('104', '130501', '市辖区', '130500');
INSERT INTO `sys_area` VALUES ('105', '130502', '桥东区', '130500');
INSERT INTO `sys_area` VALUES ('106', '130503', '桥西区', '130500');
INSERT INTO `sys_area` VALUES ('107', '130521', '邢台县', '130500');
INSERT INTO `sys_area` VALUES ('108', '130522', '临城县', '130500');
INSERT INTO `sys_area` VALUES ('109', '130523', '内丘县', '130500');
INSERT INTO `sys_area` VALUES ('110', '130524', '柏乡县', '130500');
INSERT INTO `sys_area` VALUES ('111', '130525', '隆尧县', '130500');
INSERT INTO `sys_area` VALUES ('112', '130526', '任　县', '130500');
INSERT INTO `sys_area` VALUES ('113', '130527', '南和县', '130500');
INSERT INTO `sys_area` VALUES ('114', '130528', '宁晋县', '130500');
INSERT INTO `sys_area` VALUES ('115', '130529', '巨鹿县', '130500');
INSERT INTO `sys_area` VALUES ('116', '130530', '新河县', '130500');
INSERT INTO `sys_area` VALUES ('117', '130531', '广宗县', '130500');
INSERT INTO `sys_area` VALUES ('118', '130532', '平乡县', '130500');
INSERT INTO `sys_area` VALUES ('119', '130533', '威　县', '130500');
INSERT INTO `sys_area` VALUES ('120', '130534', '清河县', '130500');
INSERT INTO `sys_area` VALUES ('121', '130535', '临西县', '130500');
INSERT INTO `sys_area` VALUES ('122', '130581', '南宫市', '130500');
INSERT INTO `sys_area` VALUES ('123', '130582', '沙河市', '130500');
INSERT INTO `sys_area` VALUES ('124', '130601', '市辖区', '130600');
INSERT INTO `sys_area` VALUES ('125', '130602', '新市区', '130600');
INSERT INTO `sys_area` VALUES ('126', '130603', '北市区', '130600');
INSERT INTO `sys_area` VALUES ('127', '130604', '南市区', '130600');
INSERT INTO `sys_area` VALUES ('128', '130621', '满城县', '130600');
INSERT INTO `sys_area` VALUES ('129', '130622', '清苑县', '130600');
INSERT INTO `sys_area` VALUES ('130', '130623', '涞水县', '130600');
INSERT INTO `sys_area` VALUES ('131', '130624', '阜平县', '130600');
INSERT INTO `sys_area` VALUES ('132', '130625', '徐水县', '130600');
INSERT INTO `sys_area` VALUES ('133', '130626', '定兴县', '130600');
INSERT INTO `sys_area` VALUES ('134', '130627', '唐　县', '130600');
INSERT INTO `sys_area` VALUES ('135', '130628', '高阳县', '130600');
INSERT INTO `sys_area` VALUES ('136', '130629', '容城县', '130600');
INSERT INTO `sys_area` VALUES ('137', '130630', '涞源县', '130600');
INSERT INTO `sys_area` VALUES ('138', '130631', '望都县', '130600');
INSERT INTO `sys_area` VALUES ('139', '130632', '安新县', '130600');
INSERT INTO `sys_area` VALUES ('140', '130633', '易　县', '130600');
INSERT INTO `sys_area` VALUES ('141', '130634', '曲阳县', '130600');
INSERT INTO `sys_area` VALUES ('142', '130635', '蠡　县', '130600');
INSERT INTO `sys_area` VALUES ('143', '130636', '顺平县', '130600');
INSERT INTO `sys_area` VALUES ('144', '130637', '博野县', '130600');
INSERT INTO `sys_area` VALUES ('145', '130638', '雄　县', '130600');
INSERT INTO `sys_area` VALUES ('146', '130681', '涿州市', '130600');
INSERT INTO `sys_area` VALUES ('147', '130682', '定州市', '130600');
INSERT INTO `sys_area` VALUES ('148', '130683', '安国市', '130600');
INSERT INTO `sys_area` VALUES ('149', '130684', '高碑店市', '130600');
INSERT INTO `sys_area` VALUES ('150', '130701', '市辖区', '130700');
INSERT INTO `sys_area` VALUES ('151', '130702', '桥东区', '130700');
INSERT INTO `sys_area` VALUES ('152', '130703', '桥西区', '130700');
INSERT INTO `sys_area` VALUES ('153', '130705', '宣化区', '130700');
INSERT INTO `sys_area` VALUES ('154', '130706', '下花园区', '130700');
INSERT INTO `sys_area` VALUES ('155', '130721', '宣化县', '130700');
INSERT INTO `sys_area` VALUES ('156', '130722', '张北县', '130700');
INSERT INTO `sys_area` VALUES ('157', '130723', '康保县', '130700');
INSERT INTO `sys_area` VALUES ('158', '130724', '沽源县', '130700');
INSERT INTO `sys_area` VALUES ('159', '130725', '尚义县', '130700');
INSERT INTO `sys_area` VALUES ('160', '130726', '蔚　县', '130700');
INSERT INTO `sys_area` VALUES ('161', '130727', '阳原县', '130700');
INSERT INTO `sys_area` VALUES ('162', '130728', '怀安县', '130700');
INSERT INTO `sys_area` VALUES ('163', '130729', '万全县', '130700');
INSERT INTO `sys_area` VALUES ('164', '130730', '怀来县', '130700');
INSERT INTO `sys_area` VALUES ('165', '130731', '涿鹿县', '130700');
INSERT INTO `sys_area` VALUES ('166', '130732', '赤城县', '130700');
INSERT INTO `sys_area` VALUES ('167', '130733', '崇礼县', '130700');
INSERT INTO `sys_area` VALUES ('168', '130801', '市辖区', '130800');
INSERT INTO `sys_area` VALUES ('169', '130802', '双桥区', '130800');
INSERT INTO `sys_area` VALUES ('170', '130803', '双滦区', '130800');
INSERT INTO `sys_area` VALUES ('171', '130804', '鹰手营子矿区', '130800');
INSERT INTO `sys_area` VALUES ('172', '130821', '承德县', '130800');
INSERT INTO `sys_area` VALUES ('173', '130822', '兴隆县', '130800');
INSERT INTO `sys_area` VALUES ('174', '130823', '平泉县', '130800');
INSERT INTO `sys_area` VALUES ('175', '130824', '滦平县', '130800');
INSERT INTO `sys_area` VALUES ('176', '130825', '隆化县', '130800');
INSERT INTO `sys_area` VALUES ('177', '130826', '丰宁满族自治县', '130800');
INSERT INTO `sys_area` VALUES ('178', '130827', '宽城满族自治县', '130800');
INSERT INTO `sys_area` VALUES ('179', '130828', '围场满族蒙古族自治县', '130800');
INSERT INTO `sys_area` VALUES ('180', '130901', '市辖区', '130900');
INSERT INTO `sys_area` VALUES ('181', '130902', '新华区', '130900');
INSERT INTO `sys_area` VALUES ('182', '130903', '运河区', '130900');
INSERT INTO `sys_area` VALUES ('183', '130921', '沧　县', '130900');
INSERT INTO `sys_area` VALUES ('184', '130922', '青　县', '130900');
INSERT INTO `sys_area` VALUES ('185', '130923', '东光县', '130900');
INSERT INTO `sys_area` VALUES ('186', '130924', '海兴县', '130900');
INSERT INTO `sys_area` VALUES ('187', '130925', '盐山县', '130900');
INSERT INTO `sys_area` VALUES ('188', '130926', '肃宁县', '130900');
INSERT INTO `sys_area` VALUES ('189', '130927', '南皮县', '130900');
INSERT INTO `sys_area` VALUES ('190', '130928', '吴桥县', '130900');
INSERT INTO `sys_area` VALUES ('191', '130929', '献　县', '130900');
INSERT INTO `sys_area` VALUES ('192', '130930', '孟村回族自治县', '130900');
INSERT INTO `sys_area` VALUES ('193', '130981', '泊头市', '130900');
INSERT INTO `sys_area` VALUES ('194', '130982', '任丘市', '130900');
INSERT INTO `sys_area` VALUES ('195', '130983', '黄骅市', '130900');
INSERT INTO `sys_area` VALUES ('196', '130984', '河间市', '130900');
INSERT INTO `sys_area` VALUES ('197', '131001', '市辖区', '131000');
INSERT INTO `sys_area` VALUES ('198', '131002', '安次区', '131000');
INSERT INTO `sys_area` VALUES ('199', '131003', '广阳区', '131000');
INSERT INTO `sys_area` VALUES ('200', '131022', '固安县', '131000');
INSERT INTO `sys_area` VALUES ('201', '131023', '永清县', '131000');
INSERT INTO `sys_area` VALUES ('202', '131024', '香河县', '131000');
INSERT INTO `sys_area` VALUES ('203', '131025', '大城县', '131000');
INSERT INTO `sys_area` VALUES ('204', '131026', '文安县', '131000');
INSERT INTO `sys_area` VALUES ('205', '131028', '大厂回族自治县', '131000');
INSERT INTO `sys_area` VALUES ('206', '131081', '霸州市', '131000');
INSERT INTO `sys_area` VALUES ('207', '131082', '三河市', '131000');
INSERT INTO `sys_area` VALUES ('208', '131101', '市辖区', '131100');
INSERT INTO `sys_area` VALUES ('209', '131102', '桃城区', '131100');
INSERT INTO `sys_area` VALUES ('210', '131121', '枣强县', '131100');
INSERT INTO `sys_area` VALUES ('211', '131122', '武邑县', '131100');
INSERT INTO `sys_area` VALUES ('212', '131123', '武强县', '131100');
INSERT INTO `sys_area` VALUES ('213', '131124', '饶阳县', '131100');
INSERT INTO `sys_area` VALUES ('214', '131125', '安平县', '131100');
INSERT INTO `sys_area` VALUES ('215', '131126', '故城县', '131100');
INSERT INTO `sys_area` VALUES ('216', '131127', '景　县', '131100');
INSERT INTO `sys_area` VALUES ('217', '131128', '阜城县', '131100');
INSERT INTO `sys_area` VALUES ('218', '131181', '冀州市', '131100');
INSERT INTO `sys_area` VALUES ('219', '131182', '深州市', '131100');
INSERT INTO `sys_area` VALUES ('220', '140101', '市辖区', '140100');
INSERT INTO `sys_area` VALUES ('221', '140105', '小店区', '140100');
INSERT INTO `sys_area` VALUES ('222', '140106', '迎泽区', '140100');
INSERT INTO `sys_area` VALUES ('223', '140107', '杏花岭区', '140100');
INSERT INTO `sys_area` VALUES ('224', '140108', '尖草坪区', '140100');
INSERT INTO `sys_area` VALUES ('225', '140109', '万柏林区', '140100');
INSERT INTO `sys_area` VALUES ('226', '140110', '晋源区', '140100');
INSERT INTO `sys_area` VALUES ('227', '140121', '清徐县', '140100');
INSERT INTO `sys_area` VALUES ('228', '140122', '阳曲县', '140100');
INSERT INTO `sys_area` VALUES ('229', '140123', '娄烦县', '140100');
INSERT INTO `sys_area` VALUES ('230', '140181', '古交市', '140100');
INSERT INTO `sys_area` VALUES ('231', '140201', '市辖区', '140200');
INSERT INTO `sys_area` VALUES ('232', '140202', '城　区', '140200');
INSERT INTO `sys_area` VALUES ('233', '140203', '矿　区', '140200');
INSERT INTO `sys_area` VALUES ('234', '140211', '南郊区', '140200');
INSERT INTO `sys_area` VALUES ('235', '140212', '新荣区', '140200');
INSERT INTO `sys_area` VALUES ('236', '140221', '阳高县', '140200');
INSERT INTO `sys_area` VALUES ('237', '140222', '天镇县', '140200');
INSERT INTO `sys_area` VALUES ('238', '140223', '广灵县', '140200');
INSERT INTO `sys_area` VALUES ('239', '140224', '灵丘县', '140200');
INSERT INTO `sys_area` VALUES ('240', '140225', '浑源县', '140200');
INSERT INTO `sys_area` VALUES ('241', '140226', '左云县', '140200');
INSERT INTO `sys_area` VALUES ('242', '140227', '大同县', '140200');
INSERT INTO `sys_area` VALUES ('243', '140301', '市辖区', '140300');
INSERT INTO `sys_area` VALUES ('244', '140302', '城　区', '140300');
INSERT INTO `sys_area` VALUES ('245', '140303', '矿　区', '140300');
INSERT INTO `sys_area` VALUES ('246', '140311', '郊　区', '140300');
INSERT INTO `sys_area` VALUES ('247', '140321', '平定县', '140300');
INSERT INTO `sys_area` VALUES ('248', '140322', '盂　县', '140300');
INSERT INTO `sys_area` VALUES ('249', '140401', '市辖区', '140400');
INSERT INTO `sys_area` VALUES ('250', '140402', '城　区', '140400');
INSERT INTO `sys_area` VALUES ('251', '140411', '郊　区', '140400');
INSERT INTO `sys_area` VALUES ('252', '140421', '长治县', '140400');
INSERT INTO `sys_area` VALUES ('253', '140423', '襄垣县', '140400');
INSERT INTO `sys_area` VALUES ('254', '140424', '屯留县', '140400');
INSERT INTO `sys_area` VALUES ('255', '140425', '平顺县', '140400');
INSERT INTO `sys_area` VALUES ('256', '140426', '黎城县', '140400');
INSERT INTO `sys_area` VALUES ('257', '140427', '壶关县', '140400');
INSERT INTO `sys_area` VALUES ('258', '140428', '长子县', '140400');
INSERT INTO `sys_area` VALUES ('259', '140429', '武乡县', '140400');
INSERT INTO `sys_area` VALUES ('260', '140430', '沁　县', '140400');
INSERT INTO `sys_area` VALUES ('261', '140431', '沁源县', '140400');
INSERT INTO `sys_area` VALUES ('262', '140481', '潞城市', '140400');
INSERT INTO `sys_area` VALUES ('263', '140501', '市辖区', '140500');
INSERT INTO `sys_area` VALUES ('264', '140502', '城　区', '140500');
INSERT INTO `sys_area` VALUES ('265', '140521', '沁水县', '140500');
INSERT INTO `sys_area` VALUES ('266', '140522', '阳城县', '140500');
INSERT INTO `sys_area` VALUES ('267', '140524', '陵川县', '140500');
INSERT INTO `sys_area` VALUES ('268', '140525', '泽州县', '140500');
INSERT INTO `sys_area` VALUES ('269', '140581', '高平市', '140500');
INSERT INTO `sys_area` VALUES ('270', '140601', '市辖区', '140600');
INSERT INTO `sys_area` VALUES ('271', '140602', '朔城区', '140600');
INSERT INTO `sys_area` VALUES ('272', '140603', '平鲁区', '140600');
INSERT INTO `sys_area` VALUES ('273', '140621', '山阴县', '140600');
INSERT INTO `sys_area` VALUES ('274', '140622', '应　县', '140600');
INSERT INTO `sys_area` VALUES ('275', '140623', '右玉县', '140600');
INSERT INTO `sys_area` VALUES ('276', '140624', '怀仁县', '140600');
INSERT INTO `sys_area` VALUES ('277', '140701', '市辖区', '140700');
INSERT INTO `sys_area` VALUES ('278', '140702', '榆次区', '140700');
INSERT INTO `sys_area` VALUES ('279', '140721', '榆社县', '140700');
INSERT INTO `sys_area` VALUES ('280', '140722', '左权县', '140700');
INSERT INTO `sys_area` VALUES ('281', '140723', '和顺县', '140700');
INSERT INTO `sys_area` VALUES ('282', '140724', '昔阳县', '140700');
INSERT INTO `sys_area` VALUES ('283', '140725', '寿阳县', '140700');
INSERT INTO `sys_area` VALUES ('284', '140726', '太谷县', '140700');
INSERT INTO `sys_area` VALUES ('285', '140727', '祁　县', '140700');
INSERT INTO `sys_area` VALUES ('286', '140728', '平遥县', '140700');
INSERT INTO `sys_area` VALUES ('287', '140729', '灵石县', '140700');
INSERT INTO `sys_area` VALUES ('288', '140781', '介休市', '140700');
INSERT INTO `sys_area` VALUES ('289', '140801', '市辖区', '140800');
INSERT INTO `sys_area` VALUES ('290', '140802', '盐湖区', '140800');
INSERT INTO `sys_area` VALUES ('291', '140821', '临猗县', '140800');
INSERT INTO `sys_area` VALUES ('292', '140822', '万荣县', '140800');
INSERT INTO `sys_area` VALUES ('293', '140823', '闻喜县', '140800');
INSERT INTO `sys_area` VALUES ('294', '140824', '稷山县', '140800');
INSERT INTO `sys_area` VALUES ('295', '140825', '新绛县', '140800');
INSERT INTO `sys_area` VALUES ('296', '140826', '绛　县', '140800');
INSERT INTO `sys_area` VALUES ('297', '140827', '垣曲县', '140800');
INSERT INTO `sys_area` VALUES ('298', '140828', '夏　县', '140800');
INSERT INTO `sys_area` VALUES ('299', '140829', '平陆县', '140800');
INSERT INTO `sys_area` VALUES ('300', '140830', '芮城县', '140800');
INSERT INTO `sys_area` VALUES ('301', '140881', '永济市', '140800');
INSERT INTO `sys_area` VALUES ('302', '140882', '河津市', '140800');
INSERT INTO `sys_area` VALUES ('303', '140901', '市辖区', '140900');
INSERT INTO `sys_area` VALUES ('304', '140902', '忻府区', '140900');
INSERT INTO `sys_area` VALUES ('305', '140921', '定襄县', '140900');
INSERT INTO `sys_area` VALUES ('306', '140922', '五台县', '140900');
INSERT INTO `sys_area` VALUES ('307', '140923', '代　县', '140900');
INSERT INTO `sys_area` VALUES ('308', '140924', '繁峙县', '140900');
INSERT INTO `sys_area` VALUES ('309', '140925', '宁武县', '140900');
INSERT INTO `sys_area` VALUES ('310', '140926', '静乐县', '140900');
INSERT INTO `sys_area` VALUES ('311', '140927', '神池县', '140900');
INSERT INTO `sys_area` VALUES ('312', '140928', '五寨县', '140900');
INSERT INTO `sys_area` VALUES ('313', '140929', '岢岚县', '140900');
INSERT INTO `sys_area` VALUES ('314', '140930', '河曲县', '140900');
INSERT INTO `sys_area` VALUES ('315', '140931', '保德县', '140900');
INSERT INTO `sys_area` VALUES ('316', '140932', '偏关县', '140900');
INSERT INTO `sys_area` VALUES ('317', '140981', '原平市', '140900');
INSERT INTO `sys_area` VALUES ('318', '141001', '市辖区', '141000');
INSERT INTO `sys_area` VALUES ('319', '141002', '尧都区', '141000');
INSERT INTO `sys_area` VALUES ('320', '141021', '曲沃县', '141000');
INSERT INTO `sys_area` VALUES ('321', '141022', '翼城县', '141000');
INSERT INTO `sys_area` VALUES ('322', '141023', '襄汾县', '141000');
INSERT INTO `sys_area` VALUES ('323', '141024', '洪洞县', '141000');
INSERT INTO `sys_area` VALUES ('324', '141025', '古　县', '141000');
INSERT INTO `sys_area` VALUES ('325', '141026', '安泽县', '141000');
INSERT INTO `sys_area` VALUES ('326', '141027', '浮山县', '141000');
INSERT INTO `sys_area` VALUES ('327', '141028', '吉　县', '141000');
INSERT INTO `sys_area` VALUES ('328', '141029', '乡宁县', '141000');
INSERT INTO `sys_area` VALUES ('329', '141030', '大宁县', '141000');
INSERT INTO `sys_area` VALUES ('330', '141031', '隰　县', '141000');
INSERT INTO `sys_area` VALUES ('331', '141032', '永和县', '141000');
INSERT INTO `sys_area` VALUES ('332', '141033', '蒲　县', '141000');
INSERT INTO `sys_area` VALUES ('333', '141034', '汾西县', '141000');
INSERT INTO `sys_area` VALUES ('334', '141081', '侯马市', '141000');
INSERT INTO `sys_area` VALUES ('335', '141082', '霍州市', '141000');
INSERT INTO `sys_area` VALUES ('336', '141101', '市辖区', '141100');
INSERT INTO `sys_area` VALUES ('337', '141102', '离石区', '141100');
INSERT INTO `sys_area` VALUES ('338', '141121', '文水县', '141100');
INSERT INTO `sys_area` VALUES ('339', '141122', '交城县', '141100');
INSERT INTO `sys_area` VALUES ('340', '141123', '兴　县', '141100');
INSERT INTO `sys_area` VALUES ('341', '141124', '临　县', '141100');
INSERT INTO `sys_area` VALUES ('342', '141125', '柳林县', '141100');
INSERT INTO `sys_area` VALUES ('343', '141126', '石楼县', '141100');
INSERT INTO `sys_area` VALUES ('344', '141127', '岚　县', '141100');
INSERT INTO `sys_area` VALUES ('345', '141128', '方山县', '141100');
INSERT INTO `sys_area` VALUES ('346', '141129', '中阳县', '141100');
INSERT INTO `sys_area` VALUES ('347', '141130', '交口县', '141100');
INSERT INTO `sys_area` VALUES ('348', '141181', '孝义市', '141100');
INSERT INTO `sys_area` VALUES ('349', '141182', '汾阳市', '141100');
INSERT INTO `sys_area` VALUES ('350', '150101', '市辖区', '150100');
INSERT INTO `sys_area` VALUES ('351', '150102', '新城区', '150100');
INSERT INTO `sys_area` VALUES ('352', '150103', '回民区', '150100');
INSERT INTO `sys_area` VALUES ('353', '150104', '玉泉区', '150100');
INSERT INTO `sys_area` VALUES ('354', '150105', '赛罕区', '150100');
INSERT INTO `sys_area` VALUES ('355', '150121', '土默特左旗', '150100');
INSERT INTO `sys_area` VALUES ('356', '150122', '托克托县', '150100');
INSERT INTO `sys_area` VALUES ('357', '150123', '和林格尔县', '150100');
INSERT INTO `sys_area` VALUES ('358', '150124', '清水河县', '150100');
INSERT INTO `sys_area` VALUES ('359', '150125', '武川县', '150100');
INSERT INTO `sys_area` VALUES ('360', '150201', '市辖区', '150200');
INSERT INTO `sys_area` VALUES ('361', '150202', '东河区', '150200');
INSERT INTO `sys_area` VALUES ('362', '150203', '昆都仑区', '150200');
INSERT INTO `sys_area` VALUES ('363', '150204', '青山区', '150200');
INSERT INTO `sys_area` VALUES ('364', '150205', '石拐区', '150200');
INSERT INTO `sys_area` VALUES ('365', '150206', '白云矿区', '150200');
INSERT INTO `sys_area` VALUES ('366', '150207', '九原区', '150200');
INSERT INTO `sys_area` VALUES ('367', '150221', '土默特右旗', '150200');
INSERT INTO `sys_area` VALUES ('368', '150222', '固阳县', '150200');
INSERT INTO `sys_area` VALUES ('369', '150223', '达尔罕茂明安联合旗', '150200');
INSERT INTO `sys_area` VALUES ('370', '150301', '市辖区', '150300');
INSERT INTO `sys_area` VALUES ('371', '150302', '海勃湾区', '150300');
INSERT INTO `sys_area` VALUES ('372', '150303', '海南区', '150300');
INSERT INTO `sys_area` VALUES ('373', '150304', '乌达区', '150300');
INSERT INTO `sys_area` VALUES ('374', '150401', '市辖区', '150400');
INSERT INTO `sys_area` VALUES ('375', '150402', '红山区', '150400');
INSERT INTO `sys_area` VALUES ('376', '150403', '元宝山区', '150400');
INSERT INTO `sys_area` VALUES ('377', '150404', '松山区', '150400');
INSERT INTO `sys_area` VALUES ('378', '150421', '阿鲁科尔沁旗', '150400');
INSERT INTO `sys_area` VALUES ('379', '150422', '巴林左旗', '150400');
INSERT INTO `sys_area` VALUES ('380', '150423', '巴林右旗', '150400');
INSERT INTO `sys_area` VALUES ('381', '150424', '林西县', '150400');
INSERT INTO `sys_area` VALUES ('382', '150425', '克什克腾旗', '150400');
INSERT INTO `sys_area` VALUES ('383', '150426', '翁牛特旗', '150400');
INSERT INTO `sys_area` VALUES ('384', '150428', '喀喇沁旗', '150400');
INSERT INTO `sys_area` VALUES ('385', '150429', '宁城县', '150400');
INSERT INTO `sys_area` VALUES ('386', '150430', '敖汉旗', '150400');
INSERT INTO `sys_area` VALUES ('387', '150501', '市辖区', '150500');
INSERT INTO `sys_area` VALUES ('388', '150502', '科尔沁区', '150500');
INSERT INTO `sys_area` VALUES ('389', '150521', '科尔沁左翼中旗', '150500');
INSERT INTO `sys_area` VALUES ('390', '150522', '科尔沁左翼后旗', '150500');
INSERT INTO `sys_area` VALUES ('391', '150523', '开鲁县', '150500');
INSERT INTO `sys_area` VALUES ('392', '150524', '库伦旗', '150500');
INSERT INTO `sys_area` VALUES ('393', '150525', '奈曼旗', '150500');
INSERT INTO `sys_area` VALUES ('394', '150526', '扎鲁特旗', '150500');
INSERT INTO `sys_area` VALUES ('395', '150581', '霍林郭勒市', '150500');
INSERT INTO `sys_area` VALUES ('396', '150602', '东胜区', '150600');
INSERT INTO `sys_area` VALUES ('397', '150621', '达拉特旗', '150600');
INSERT INTO `sys_area` VALUES ('398', '150622', '准格尔旗', '150600');
INSERT INTO `sys_area` VALUES ('399', '150623', '鄂托克前旗', '150600');
INSERT INTO `sys_area` VALUES ('400', '150624', '鄂托克旗', '150600');
INSERT INTO `sys_area` VALUES ('401', '150625', '杭锦旗', '150600');
INSERT INTO `sys_area` VALUES ('402', '150626', '乌审旗', '150600');
INSERT INTO `sys_area` VALUES ('403', '150627', '伊金霍洛旗', '150600');
INSERT INTO `sys_area` VALUES ('404', '150701', '市辖区', '150700');
INSERT INTO `sys_area` VALUES ('405', '150702', '海拉尔区', '150700');
INSERT INTO `sys_area` VALUES ('406', '150721', '阿荣旗', '150700');
INSERT INTO `sys_area` VALUES ('407', '150722', '莫力达瓦达斡尔族自治旗', '150700');
INSERT INTO `sys_area` VALUES ('408', '150723', '鄂伦春自治旗', '150700');
INSERT INTO `sys_area` VALUES ('409', '150724', '鄂温克族自治旗', '150700');
INSERT INTO `sys_area` VALUES ('410', '150725', '陈巴尔虎旗', '150700');
INSERT INTO `sys_area` VALUES ('411', '150726', '新巴尔虎左旗', '150700');
INSERT INTO `sys_area` VALUES ('412', '150727', '新巴尔虎右旗', '150700');
INSERT INTO `sys_area` VALUES ('413', '150781', '满洲里市', '150700');
INSERT INTO `sys_area` VALUES ('414', '150782', '牙克石市', '150700');
INSERT INTO `sys_area` VALUES ('415', '150783', '扎兰屯市', '150700');
INSERT INTO `sys_area` VALUES ('416', '150784', '额尔古纳市', '150700');
INSERT INTO `sys_area` VALUES ('417', '150785', '根河市', '150700');
INSERT INTO `sys_area` VALUES ('418', '150801', '市辖区', '150800');
INSERT INTO `sys_area` VALUES ('419', '150802', '临河区', '150800');
INSERT INTO `sys_area` VALUES ('420', '150821', '五原县', '150800');
INSERT INTO `sys_area` VALUES ('421', '150822', '磴口县', '150800');
INSERT INTO `sys_area` VALUES ('422', '150823', '乌拉特前旗', '150800');
INSERT INTO `sys_area` VALUES ('423', '150824', '乌拉特中旗', '150800');
INSERT INTO `sys_area` VALUES ('424', '150825', '乌拉特后旗', '150800');
INSERT INTO `sys_area` VALUES ('425', '150826', '杭锦后旗', '150800');
INSERT INTO `sys_area` VALUES ('426', '150901', '市辖区', '150900');
INSERT INTO `sys_area` VALUES ('427', '150902', '集宁区', '150900');
INSERT INTO `sys_area` VALUES ('428', '150921', '卓资县', '150900');
INSERT INTO `sys_area` VALUES ('429', '150922', '化德县', '150900');
INSERT INTO `sys_area` VALUES ('430', '150923', '商都县', '150900');
INSERT INTO `sys_area` VALUES ('431', '150924', '兴和县', '150900');
INSERT INTO `sys_area` VALUES ('432', '150925', '凉城县', '150900');
INSERT INTO `sys_area` VALUES ('433', '150926', '察哈尔右翼前旗', '150900');
INSERT INTO `sys_area` VALUES ('434', '150927', '察哈尔右翼中旗', '150900');
INSERT INTO `sys_area` VALUES ('435', '150928', '察哈尔右翼后旗', '150900');
INSERT INTO `sys_area` VALUES ('436', '150929', '四子王旗', '150900');
INSERT INTO `sys_area` VALUES ('437', '150981', '丰镇市', '150900');
INSERT INTO `sys_area` VALUES ('438', '152201', '乌兰浩特市', '152200');
INSERT INTO `sys_area` VALUES ('439', '152202', '阿尔山市', '152200');
INSERT INTO `sys_area` VALUES ('440', '152221', '科尔沁右翼前旗', '152200');
INSERT INTO `sys_area` VALUES ('441', '152222', '科尔沁右翼中旗', '152200');
INSERT INTO `sys_area` VALUES ('442', '152223', '扎赉特旗', '152200');
INSERT INTO `sys_area` VALUES ('443', '152224', '突泉县', '152200');
INSERT INTO `sys_area` VALUES ('444', '152501', '二连浩特市', '152500');
INSERT INTO `sys_area` VALUES ('445', '152502', '锡林浩特市', '152500');
INSERT INTO `sys_area` VALUES ('446', '152522', '阿巴嘎旗', '152500');
INSERT INTO `sys_area` VALUES ('447', '152523', '苏尼特左旗', '152500');
INSERT INTO `sys_area` VALUES ('448', '152524', '苏尼特右旗', '152500');
INSERT INTO `sys_area` VALUES ('449', '152525', '东乌珠穆沁旗', '152500');
INSERT INTO `sys_area` VALUES ('450', '152526', '西乌珠穆沁旗', '152500');
INSERT INTO `sys_area` VALUES ('451', '152527', '太仆寺旗', '152500');
INSERT INTO `sys_area` VALUES ('452', '152528', '镶黄旗', '152500');
INSERT INTO `sys_area` VALUES ('453', '152529', '正镶白旗', '152500');
INSERT INTO `sys_area` VALUES ('454', '152530', '正蓝旗', '152500');
INSERT INTO `sys_area` VALUES ('455', '152531', '多伦县', '152500');
INSERT INTO `sys_area` VALUES ('456', '152921', '阿拉善左旗', '152900');
INSERT INTO `sys_area` VALUES ('457', '152922', '阿拉善右旗', '152900');
INSERT INTO `sys_area` VALUES ('458', '152923', '额济纳旗', '152900');
INSERT INTO `sys_area` VALUES ('459', '210101', '市辖区', '210100');
INSERT INTO `sys_area` VALUES ('460', '210102', '和平区', '210100');
INSERT INTO `sys_area` VALUES ('461', '210103', '沈河区', '210100');
INSERT INTO `sys_area` VALUES ('462', '210104', '大东区', '210100');
INSERT INTO `sys_area` VALUES ('463', '210105', '皇姑区', '210100');
INSERT INTO `sys_area` VALUES ('464', '210106', '铁西区', '210100');
INSERT INTO `sys_area` VALUES ('465', '210111', '苏家屯区', '210100');
INSERT INTO `sys_area` VALUES ('466', '210112', '东陵区', '210100');
INSERT INTO `sys_area` VALUES ('467', '210113', '新城子区', '210100');
INSERT INTO `sys_area` VALUES ('468', '210114', '于洪区', '210100');
INSERT INTO `sys_area` VALUES ('469', '210122', '辽中县', '210100');
INSERT INTO `sys_area` VALUES ('470', '210123', '康平县', '210100');
INSERT INTO `sys_area` VALUES ('471', '210124', '法库县', '210100');
INSERT INTO `sys_area` VALUES ('472', '210181', '新民市', '210100');
INSERT INTO `sys_area` VALUES ('473', '210201', '市辖区', '210200');
INSERT INTO `sys_area` VALUES ('474', '210202', '中山区', '210200');
INSERT INTO `sys_area` VALUES ('475', '210203', '西岗区', '210200');
INSERT INTO `sys_area` VALUES ('476', '210204', '沙河口区', '210200');
INSERT INTO `sys_area` VALUES ('477', '210211', '甘井子区', '210200');
INSERT INTO `sys_area` VALUES ('478', '210212', '旅顺口区', '210200');
INSERT INTO `sys_area` VALUES ('479', '210213', '金州区', '210200');
INSERT INTO `sys_area` VALUES ('480', '210224', '长海县', '210200');
INSERT INTO `sys_area` VALUES ('481', '210281', '瓦房店市', '210200');
INSERT INTO `sys_area` VALUES ('482', '210282', '普兰店市', '210200');
INSERT INTO `sys_area` VALUES ('483', '210283', '庄河市', '210200');
INSERT INTO `sys_area` VALUES ('484', '210301', '市辖区', '210300');
INSERT INTO `sys_area` VALUES ('485', '210302', '铁东区', '210300');
INSERT INTO `sys_area` VALUES ('486', '210303', '铁西区', '210300');
INSERT INTO `sys_area` VALUES ('487', '210304', '立山区', '210300');
INSERT INTO `sys_area` VALUES ('488', '210311', '千山区', '210300');
INSERT INTO `sys_area` VALUES ('489', '210321', '台安县', '210300');
INSERT INTO `sys_area` VALUES ('490', '210323', '岫岩满族自治县', '210300');
INSERT INTO `sys_area` VALUES ('491', '210381', '海城市', '210300');
INSERT INTO `sys_area` VALUES ('492', '210401', '市辖区', '210400');
INSERT INTO `sys_area` VALUES ('493', '210402', '新抚区', '210400');
INSERT INTO `sys_area` VALUES ('494', '210403', '东洲区', '210400');
INSERT INTO `sys_area` VALUES ('495', '210404', '望花区', '210400');
INSERT INTO `sys_area` VALUES ('496', '210411', '顺城区', '210400');
INSERT INTO `sys_area` VALUES ('497', '210421', '抚顺县', '210400');
INSERT INTO `sys_area` VALUES ('498', '210422', '新宾满族自治县', '210400');
INSERT INTO `sys_area` VALUES ('499', '210423', '清原满族自治县', '210400');
INSERT INTO `sys_area` VALUES ('500', '210501', '市辖区', '210500');
INSERT INTO `sys_area` VALUES ('501', '210502', '平山区', '210500');
INSERT INTO `sys_area` VALUES ('502', '210503', '溪湖区', '210500');
INSERT INTO `sys_area` VALUES ('503', '210504', '明山区', '210500');
INSERT INTO `sys_area` VALUES ('504', '210505', '南芬区', '210500');
INSERT INTO `sys_area` VALUES ('505', '210521', '本溪满族自治县', '210500');
INSERT INTO `sys_area` VALUES ('506', '210522', '桓仁满族自治县', '210500');
INSERT INTO `sys_area` VALUES ('507', '210601', '市辖区', '210600');
INSERT INTO `sys_area` VALUES ('508', '210602', '元宝区', '210600');
INSERT INTO `sys_area` VALUES ('509', '210603', '振兴区', '210600');
INSERT INTO `sys_area` VALUES ('510', '210604', '振安区', '210600');
INSERT INTO `sys_area` VALUES ('511', '210624', '宽甸满族自治县', '210600');
INSERT INTO `sys_area` VALUES ('512', '210681', '东港市', '210600');
INSERT INTO `sys_area` VALUES ('513', '210682', '凤城市', '210600');
INSERT INTO `sys_area` VALUES ('514', '210701', '市辖区', '210700');
INSERT INTO `sys_area` VALUES ('515', '210702', '古塔区', '210700');
INSERT INTO `sys_area` VALUES ('516', '210703', '凌河区', '210700');
INSERT INTO `sys_area` VALUES ('517', '210711', '太和区', '210700');
INSERT INTO `sys_area` VALUES ('518', '210726', '黑山县', '210700');
INSERT INTO `sys_area` VALUES ('519', '210727', '义　县', '210700');
INSERT INTO `sys_area` VALUES ('520', '210781', '凌海市', '210700');
INSERT INTO `sys_area` VALUES ('521', '210782', '北宁市', '210700');
INSERT INTO `sys_area` VALUES ('522', '210801', '市辖区', '210800');
INSERT INTO `sys_area` VALUES ('523', '210802', '站前区', '210800');
INSERT INTO `sys_area` VALUES ('524', '210803', '西市区', '210800');
INSERT INTO `sys_area` VALUES ('525', '210804', '鲅鱼圈区', '210800');
INSERT INTO `sys_area` VALUES ('526', '210811', '老边区', '210800');
INSERT INTO `sys_area` VALUES ('527', '210881', '盖州市', '210800');
INSERT INTO `sys_area` VALUES ('528', '210882', '大石桥市', '210800');
INSERT INTO `sys_area` VALUES ('529', '210901', '市辖区', '210900');
INSERT INTO `sys_area` VALUES ('530', '210902', '海州区', '210900');
INSERT INTO `sys_area` VALUES ('531', '210903', '新邱区', '210900');
INSERT INTO `sys_area` VALUES ('532', '210904', '太平区', '210900');
INSERT INTO `sys_area` VALUES ('533', '210905', '清河门区', '210900');
INSERT INTO `sys_area` VALUES ('534', '210911', '细河区', '210900');
INSERT INTO `sys_area` VALUES ('535', '210921', '阜新蒙古族自治县', '210900');
INSERT INTO `sys_area` VALUES ('536', '210922', '彰武县', '210900');
INSERT INTO `sys_area` VALUES ('537', '211001', '市辖区', '211000');
INSERT INTO `sys_area` VALUES ('538', '211002', '白塔区', '211000');
INSERT INTO `sys_area` VALUES ('539', '211003', '文圣区', '211000');
INSERT INTO `sys_area` VALUES ('540', '211004', '宏伟区', '211000');
INSERT INTO `sys_area` VALUES ('541', '211005', '弓长岭区', '211000');
INSERT INTO `sys_area` VALUES ('542', '211011', '太子河区', '211000');
INSERT INTO `sys_area` VALUES ('543', '211021', '辽阳县', '211000');
INSERT INTO `sys_area` VALUES ('544', '211081', '灯塔市', '211000');
INSERT INTO `sys_area` VALUES ('545', '211101', '市辖区', '211100');
INSERT INTO `sys_area` VALUES ('546', '211102', '双台子区', '211100');
INSERT INTO `sys_area` VALUES ('547', '211103', '兴隆台区', '211100');
INSERT INTO `sys_area` VALUES ('548', '211121', '大洼县', '211100');
INSERT INTO `sys_area` VALUES ('549', '211122', '盘山县', '211100');
INSERT INTO `sys_area` VALUES ('550', '211201', '市辖区', '211200');
INSERT INTO `sys_area` VALUES ('551', '211202', '银州区', '211200');
INSERT INTO `sys_area` VALUES ('552', '211204', '清河区', '211200');
INSERT INTO `sys_area` VALUES ('553', '211221', '铁岭县', '211200');
INSERT INTO `sys_area` VALUES ('554', '211223', '西丰县', '211200');
INSERT INTO `sys_area` VALUES ('555', '211224', '昌图县', '211200');
INSERT INTO `sys_area` VALUES ('556', '211281', '调兵山市', '211200');
INSERT INTO `sys_area` VALUES ('557', '211282', '开原市', '211200');
INSERT INTO `sys_area` VALUES ('558', '211301', '市辖区', '211300');
INSERT INTO `sys_area` VALUES ('559', '211302', '双塔区', '211300');
INSERT INTO `sys_area` VALUES ('560', '211303', '龙城区', '211300');
INSERT INTO `sys_area` VALUES ('561', '211321', '朝阳县', '211300');
INSERT INTO `sys_area` VALUES ('562', '211322', '建平县', '211300');
INSERT INTO `sys_area` VALUES ('563', '211324', '喀喇沁左翼蒙古族自治县', '211300');
INSERT INTO `sys_area` VALUES ('564', '211381', '北票市', '211300');
INSERT INTO `sys_area` VALUES ('565', '211382', '凌源市', '211300');
INSERT INTO `sys_area` VALUES ('566', '211401', '市辖区', '211400');
INSERT INTO `sys_area` VALUES ('567', '211402', '连山区', '211400');
INSERT INTO `sys_area` VALUES ('568', '211403', '龙港区', '211400');
INSERT INTO `sys_area` VALUES ('569', '211404', '南票区', '211400');
INSERT INTO `sys_area` VALUES ('570', '211421', '绥中县', '211400');
INSERT INTO `sys_area` VALUES ('571', '211422', '建昌县', '211400');
INSERT INTO `sys_area` VALUES ('572', '211481', '兴城市', '211400');
INSERT INTO `sys_area` VALUES ('573', '220101', '市辖区', '220100');
INSERT INTO `sys_area` VALUES ('574', '220102', '南关区', '220100');
INSERT INTO `sys_area` VALUES ('575', '220103', '宽城区', '220100');
INSERT INTO `sys_area` VALUES ('576', '220104', '朝阳区', '220100');
INSERT INTO `sys_area` VALUES ('577', '220105', '二道区', '220100');
INSERT INTO `sys_area` VALUES ('578', '220106', '绿园区', '220100');
INSERT INTO `sys_area` VALUES ('579', '220112', '双阳区', '220100');
INSERT INTO `sys_area` VALUES ('580', '220122', '农安县', '220100');
INSERT INTO `sys_area` VALUES ('581', '220181', '九台市', '220100');
INSERT INTO `sys_area` VALUES ('582', '220182', '榆树市', '220100');
INSERT INTO `sys_area` VALUES ('583', '220183', '德惠市', '220100');
INSERT INTO `sys_area` VALUES ('584', '220201', '市辖区', '220200');
INSERT INTO `sys_area` VALUES ('585', '220202', '昌邑区', '220200');
INSERT INTO `sys_area` VALUES ('586', '220203', '龙潭区', '220200');
INSERT INTO `sys_area` VALUES ('587', '220204', '船营区', '220200');
INSERT INTO `sys_area` VALUES ('588', '220211', '丰满区', '220200');
INSERT INTO `sys_area` VALUES ('589', '220221', '永吉县', '220200');
INSERT INTO `sys_area` VALUES ('590', '220281', '蛟河市', '220200');
INSERT INTO `sys_area` VALUES ('591', '220282', '桦甸市', '220200');
INSERT INTO `sys_area` VALUES ('592', '220283', '舒兰市', '220200');
INSERT INTO `sys_area` VALUES ('593', '220284', '磐石市', '220200');
INSERT INTO `sys_area` VALUES ('594', '220301', '市辖区', '220300');
INSERT INTO `sys_area` VALUES ('595', '220302', '铁西区', '220300');
INSERT INTO `sys_area` VALUES ('596', '220303', '铁东区', '220300');
INSERT INTO `sys_area` VALUES ('597', '220322', '梨树县', '220300');
INSERT INTO `sys_area` VALUES ('598', '220323', '伊通满族自治县', '220300');
INSERT INTO `sys_area` VALUES ('599', '220381', '公主岭市', '220300');
INSERT INTO `sys_area` VALUES ('600', '220382', '双辽市', '220300');
INSERT INTO `sys_area` VALUES ('601', '220401', '市辖区', '220400');
INSERT INTO `sys_area` VALUES ('602', '220402', '龙山区', '220400');
INSERT INTO `sys_area` VALUES ('603', '220403', '西安区', '220400');
INSERT INTO `sys_area` VALUES ('604', '220421', '东丰县', '220400');
INSERT INTO `sys_area` VALUES ('605', '220422', '东辽县', '220400');
INSERT INTO `sys_area` VALUES ('606', '220501', '市辖区', '220500');
INSERT INTO `sys_area` VALUES ('607', '220502', '东昌区', '220500');
INSERT INTO `sys_area` VALUES ('608', '220503', '二道江区', '220500');
INSERT INTO `sys_area` VALUES ('609', '220521', '通化县', '220500');
INSERT INTO `sys_area` VALUES ('610', '220523', '辉南县', '220500');
INSERT INTO `sys_area` VALUES ('611', '220524', '柳河县', '220500');
INSERT INTO `sys_area` VALUES ('612', '220581', '梅河口市', '220500');
INSERT INTO `sys_area` VALUES ('613', '220582', '集安市', '220500');
INSERT INTO `sys_area` VALUES ('614', '220601', '市辖区', '220600');
INSERT INTO `sys_area` VALUES ('615', '220602', '八道江区', '220600');
INSERT INTO `sys_area` VALUES ('616', '220621', '抚松县', '220600');
INSERT INTO `sys_area` VALUES ('617', '220622', '靖宇县', '220600');
INSERT INTO `sys_area` VALUES ('618', '220623', '长白朝鲜族自治县', '220600');
INSERT INTO `sys_area` VALUES ('619', '220625', '江源县', '220600');
INSERT INTO `sys_area` VALUES ('620', '220681', '临江市', '220600');
INSERT INTO `sys_area` VALUES ('621', '220701', '市辖区', '220700');
INSERT INTO `sys_area` VALUES ('622', '220702', '宁江区', '220700');
INSERT INTO `sys_area` VALUES ('623', '220721', '前郭尔罗斯蒙古族自治县', '220700');
INSERT INTO `sys_area` VALUES ('624', '220722', '长岭县', '220700');
INSERT INTO `sys_area` VALUES ('625', '220723', '乾安县', '220700');
INSERT INTO `sys_area` VALUES ('626', '220724', '扶余县', '220700');
INSERT INTO `sys_area` VALUES ('627', '220801', '市辖区', '220800');
INSERT INTO `sys_area` VALUES ('628', '220802', '洮北区', '220800');
INSERT INTO `sys_area` VALUES ('629', '220821', '镇赉县', '220800');
INSERT INTO `sys_area` VALUES ('630', '220822', '通榆县', '220800');
INSERT INTO `sys_area` VALUES ('631', '220881', '洮南市', '220800');
INSERT INTO `sys_area` VALUES ('632', '220882', '大安市', '220800');
INSERT INTO `sys_area` VALUES ('633', '222401', '延吉市', '222400');
INSERT INTO `sys_area` VALUES ('634', '222402', '图们市', '222400');
INSERT INTO `sys_area` VALUES ('635', '222403', '敦化市', '222400');
INSERT INTO `sys_area` VALUES ('636', '222404', '珲春市', '222400');
INSERT INTO `sys_area` VALUES ('637', '222405', '龙井市', '222400');
INSERT INTO `sys_area` VALUES ('638', '222406', '和龙市', '222400');
INSERT INTO `sys_area` VALUES ('639', '222424', '汪清县', '222400');
INSERT INTO `sys_area` VALUES ('640', '222426', '安图县', '222400');
INSERT INTO `sys_area` VALUES ('641', '230101', '市辖区', '230100');
INSERT INTO `sys_area` VALUES ('642', '230102', '道里区', '230100');
INSERT INTO `sys_area` VALUES ('643', '230103', '南岗区', '230100');
INSERT INTO `sys_area` VALUES ('644', '230104', '道外区', '230100');
INSERT INTO `sys_area` VALUES ('645', '230106', '香坊区', '230100');
INSERT INTO `sys_area` VALUES ('646', '230107', '动力区', '230100');
INSERT INTO `sys_area` VALUES ('647', '230108', '平房区', '230100');
INSERT INTO `sys_area` VALUES ('648', '230109', '松北区', '230100');
INSERT INTO `sys_area` VALUES ('649', '230111', '呼兰区', '230100');
INSERT INTO `sys_area` VALUES ('650', '230123', '依兰县', '230100');
INSERT INTO `sys_area` VALUES ('651', '230124', '方正县', '230100');
INSERT INTO `sys_area` VALUES ('652', '230125', '宾　县', '230100');
INSERT INTO `sys_area` VALUES ('653', '230126', '巴彦县', '230100');
INSERT INTO `sys_area` VALUES ('654', '230127', '木兰县', '230100');
INSERT INTO `sys_area` VALUES ('655', '230128', '通河县', '230100');
INSERT INTO `sys_area` VALUES ('656', '230129', '延寿县', '230100');
INSERT INTO `sys_area` VALUES ('657', '230181', '阿城市', '230100');
INSERT INTO `sys_area` VALUES ('658', '230182', '双城市', '230100');
INSERT INTO `sys_area` VALUES ('659', '230183', '尚志市', '230100');
INSERT INTO `sys_area` VALUES ('660', '230184', '五常市', '230100');
INSERT INTO `sys_area` VALUES ('661', '230201', '市辖区', '230200');
INSERT INTO `sys_area` VALUES ('662', '230202', '龙沙区', '230200');
INSERT INTO `sys_area` VALUES ('663', '230203', '建华区', '230200');
INSERT INTO `sys_area` VALUES ('664', '230204', '铁锋区', '230200');
INSERT INTO `sys_area` VALUES ('665', '230205', '昂昂溪区', '230200');
INSERT INTO `sys_area` VALUES ('666', '230206', '富拉尔基区', '230200');
INSERT INTO `sys_area` VALUES ('667', '230207', '碾子山区', '230200');
INSERT INTO `sys_area` VALUES ('668', '230208', '梅里斯达斡尔族区', '230200');
INSERT INTO `sys_area` VALUES ('669', '230221', '龙江县', '230200');
INSERT INTO `sys_area` VALUES ('670', '230223', '依安县', '230200');
INSERT INTO `sys_area` VALUES ('671', '230224', '泰来县', '230200');
INSERT INTO `sys_area` VALUES ('672', '230225', '甘南县', '230200');
INSERT INTO `sys_area` VALUES ('673', '230227', '富裕县', '230200');
INSERT INTO `sys_area` VALUES ('674', '230229', '克山县', '230200');
INSERT INTO `sys_area` VALUES ('675', '230230', '克东县', '230200');
INSERT INTO `sys_area` VALUES ('676', '230231', '拜泉县', '230200');
INSERT INTO `sys_area` VALUES ('677', '230281', '讷河市', '230200');
INSERT INTO `sys_area` VALUES ('678', '230301', '市辖区', '230300');
INSERT INTO `sys_area` VALUES ('679', '230302', '鸡冠区', '230300');
INSERT INTO `sys_area` VALUES ('680', '230303', '恒山区', '230300');
INSERT INTO `sys_area` VALUES ('681', '230304', '滴道区', '230300');
INSERT INTO `sys_area` VALUES ('682', '230305', '梨树区', '230300');
INSERT INTO `sys_area` VALUES ('683', '230306', '城子河区', '230300');
INSERT INTO `sys_area` VALUES ('684', '230307', '麻山区', '230300');
INSERT INTO `sys_area` VALUES ('685', '230321', '鸡东县', '230300');
INSERT INTO `sys_area` VALUES ('686', '230381', '虎林市', '230300');
INSERT INTO `sys_area` VALUES ('687', '230382', '密山市', '230300');
INSERT INTO `sys_area` VALUES ('688', '230401', '市辖区', '230400');
INSERT INTO `sys_area` VALUES ('689', '230402', '向阳区', '230400');
INSERT INTO `sys_area` VALUES ('690', '230403', '工农区', '230400');
INSERT INTO `sys_area` VALUES ('691', '230404', '南山区', '230400');
INSERT INTO `sys_area` VALUES ('692', '230405', '兴安区', '230400');
INSERT INTO `sys_area` VALUES ('693', '230406', '东山区', '230400');
INSERT INTO `sys_area` VALUES ('694', '230407', '兴山区', '230400');
INSERT INTO `sys_area` VALUES ('695', '230421', '萝北县', '230400');
INSERT INTO `sys_area` VALUES ('696', '230422', '绥滨县', '230400');
INSERT INTO `sys_area` VALUES ('697', '230501', '市辖区', '230500');
INSERT INTO `sys_area` VALUES ('698', '230502', '尖山区', '230500');
INSERT INTO `sys_area` VALUES ('699', '230503', '岭东区', '230500');
INSERT INTO `sys_area` VALUES ('700', '230505', '四方台区', '230500');
INSERT INTO `sys_area` VALUES ('701', '230506', '宝山区', '230500');
INSERT INTO `sys_area` VALUES ('702', '230521', '集贤县', '230500');
INSERT INTO `sys_area` VALUES ('703', '230522', '友谊县', '230500');
INSERT INTO `sys_area` VALUES ('704', '230523', '宝清县', '230500');
INSERT INTO `sys_area` VALUES ('705', '230524', '饶河县', '230500');
INSERT INTO `sys_area` VALUES ('706', '230601', '市辖区', '230600');
INSERT INTO `sys_area` VALUES ('707', '230602', '萨尔图区', '230600');
INSERT INTO `sys_area` VALUES ('708', '230603', '龙凤区', '230600');
INSERT INTO `sys_area` VALUES ('709', '230604', '让胡路区', '230600');
INSERT INTO `sys_area` VALUES ('710', '230605', '红岗区', '230600');
INSERT INTO `sys_area` VALUES ('711', '230606', '大同区', '230600');
INSERT INTO `sys_area` VALUES ('712', '230621', '肇州县', '230600');
INSERT INTO `sys_area` VALUES ('713', '230622', '肇源县', '230600');
INSERT INTO `sys_area` VALUES ('714', '230623', '林甸县', '230600');
INSERT INTO `sys_area` VALUES ('715', '230624', '杜尔伯特蒙古族自治县', '230600');
INSERT INTO `sys_area` VALUES ('716', '230701', '市辖区', '230700');
INSERT INTO `sys_area` VALUES ('717', '230702', '伊春区', '230700');
INSERT INTO `sys_area` VALUES ('718', '230703', '南岔区', '230700');
INSERT INTO `sys_area` VALUES ('719', '230704', '友好区', '230700');
INSERT INTO `sys_area` VALUES ('720', '230705', '西林区', '230700');
INSERT INTO `sys_area` VALUES ('721', '230706', '翠峦区', '230700');
INSERT INTO `sys_area` VALUES ('722', '230707', '新青区', '230700');
INSERT INTO `sys_area` VALUES ('723', '230708', '美溪区', '230700');
INSERT INTO `sys_area` VALUES ('724', '230709', '金山屯区', '230700');
INSERT INTO `sys_area` VALUES ('725', '230710', '五营区', '230700');
INSERT INTO `sys_area` VALUES ('726', '230711', '乌马河区', '230700');
INSERT INTO `sys_area` VALUES ('727', '230712', '汤旺河区', '230700');
INSERT INTO `sys_area` VALUES ('728', '230713', '带岭区', '230700');
INSERT INTO `sys_area` VALUES ('729', '230714', '乌伊岭区', '230700');
INSERT INTO `sys_area` VALUES ('730', '230715', '红星区', '230700');
INSERT INTO `sys_area` VALUES ('731', '230716', '上甘岭区', '230700');
INSERT INTO `sys_area` VALUES ('732', '230722', '嘉荫县', '230700');
INSERT INTO `sys_area` VALUES ('733', '230781', '铁力市', '230700');
INSERT INTO `sys_area` VALUES ('734', '230801', '市辖区', '230800');
INSERT INTO `sys_area` VALUES ('735', '230802', '永红区', '230800');
INSERT INTO `sys_area` VALUES ('736', '230803', '向阳区', '230800');
INSERT INTO `sys_area` VALUES ('737', '230804', '前进区', '230800');
INSERT INTO `sys_area` VALUES ('738', '230805', '东风区', '230800');
INSERT INTO `sys_area` VALUES ('739', '230811', '郊　区', '230800');
INSERT INTO `sys_area` VALUES ('740', '230822', '桦南县', '230800');
INSERT INTO `sys_area` VALUES ('741', '230826', '桦川县', '230800');
INSERT INTO `sys_area` VALUES ('742', '230828', '汤原县', '230800');
INSERT INTO `sys_area` VALUES ('743', '230833', '抚远县', '230800');
INSERT INTO `sys_area` VALUES ('744', '230881', '同江市', '230800');
INSERT INTO `sys_area` VALUES ('745', '230882', '富锦市', '230800');
INSERT INTO `sys_area` VALUES ('746', '230901', '市辖区', '230900');
INSERT INTO `sys_area` VALUES ('747', '230902', '新兴区', '230900');
INSERT INTO `sys_area` VALUES ('748', '230903', '桃山区', '230900');
INSERT INTO `sys_area` VALUES ('749', '230904', '茄子河区', '230900');
INSERT INTO `sys_area` VALUES ('750', '230921', '勃利县', '230900');
INSERT INTO `sys_area` VALUES ('751', '231001', '市辖区', '231000');
INSERT INTO `sys_area` VALUES ('752', '231002', '东安区', '231000');
INSERT INTO `sys_area` VALUES ('753', '231003', '阳明区', '231000');
INSERT INTO `sys_area` VALUES ('754', '231004', '爱民区', '231000');
INSERT INTO `sys_area` VALUES ('755', '231005', '西安区', '231000');
INSERT INTO `sys_area` VALUES ('756', '231024', '东宁县', '231000');
INSERT INTO `sys_area` VALUES ('757', '231025', '林口县', '231000');
INSERT INTO `sys_area` VALUES ('758', '231081', '绥芬河市', '231000');
INSERT INTO `sys_area` VALUES ('759', '231083', '海林市', '231000');
INSERT INTO `sys_area` VALUES ('760', '231084', '宁安市', '231000');
INSERT INTO `sys_area` VALUES ('761', '231085', '穆棱市', '231000');
INSERT INTO `sys_area` VALUES ('762', '231101', '市辖区', '231100');
INSERT INTO `sys_area` VALUES ('763', '231102', '爱辉区', '231100');
INSERT INTO `sys_area` VALUES ('764', '231121', '嫩江县', '231100');
INSERT INTO `sys_area` VALUES ('765', '231123', '逊克县', '231100');
INSERT INTO `sys_area` VALUES ('766', '231124', '孙吴县', '231100');
INSERT INTO `sys_area` VALUES ('767', '231181', '北安市', '231100');
INSERT INTO `sys_area` VALUES ('768', '231182', '五大连池市', '231100');
INSERT INTO `sys_area` VALUES ('769', '231201', '市辖区', '231200');
INSERT INTO `sys_area` VALUES ('770', '231202', '北林区', '231200');
INSERT INTO `sys_area` VALUES ('771', '231221', '望奎县', '231200');
INSERT INTO `sys_area` VALUES ('772', '231222', '兰西县', '231200');
INSERT INTO `sys_area` VALUES ('773', '231223', '青冈县', '231200');
INSERT INTO `sys_area` VALUES ('774', '231224', '庆安县', '231200');
INSERT INTO `sys_area` VALUES ('775', '231225', '明水县', '231200');
INSERT INTO `sys_area` VALUES ('776', '231226', '绥棱县', '231200');
INSERT INTO `sys_area` VALUES ('777', '231281', '安达市', '231200');
INSERT INTO `sys_area` VALUES ('778', '231282', '肇东市', '231200');
INSERT INTO `sys_area` VALUES ('779', '231283', '海伦市', '231200');
INSERT INTO `sys_area` VALUES ('780', '232721', '呼玛县', '232700');
INSERT INTO `sys_area` VALUES ('781', '232722', '塔河县', '232700');
INSERT INTO `sys_area` VALUES ('782', '232723', '漠河县', '232700');
INSERT INTO `sys_area` VALUES ('783', '310101', '黄浦区', '310100');
INSERT INTO `sys_area` VALUES ('784', '310103', '卢湾区', '310100');
INSERT INTO `sys_area` VALUES ('785', '310104', '徐汇区', '310100');
INSERT INTO `sys_area` VALUES ('786', '310105', '长宁区', '310100');
INSERT INTO `sys_area` VALUES ('787', '310106', '静安区', '310100');
INSERT INTO `sys_area` VALUES ('788', '310107', '普陀区', '310100');
INSERT INTO `sys_area` VALUES ('789', '310108', '闸北区', '310100');
INSERT INTO `sys_area` VALUES ('790', '310109', '虹口区', '310100');
INSERT INTO `sys_area` VALUES ('791', '310110', '杨浦区', '310100');
INSERT INTO `sys_area` VALUES ('792', '310112', '闵行区', '310100');
INSERT INTO `sys_area` VALUES ('793', '310113', '宝山区', '310100');
INSERT INTO `sys_area` VALUES ('794', '310114', '嘉定区', '310100');
INSERT INTO `sys_area` VALUES ('795', '310115', '浦东新区', '310100');
INSERT INTO `sys_area` VALUES ('796', '310116', '金山区', '310100');
INSERT INTO `sys_area` VALUES ('797', '310117', '松江区', '310100');
INSERT INTO `sys_area` VALUES ('798', '310118', '青浦区', '310100');
INSERT INTO `sys_area` VALUES ('799', '310119', '南汇区', '310100');
INSERT INTO `sys_area` VALUES ('800', '310120', '奉贤区', '310100');
INSERT INTO `sys_area` VALUES ('801', '310230', '崇明县', '310200');
INSERT INTO `sys_area` VALUES ('802', '320101', '市辖区', '320100');
INSERT INTO `sys_area` VALUES ('803', '320102', '玄武区', '320100');
INSERT INTO `sys_area` VALUES ('804', '320103', '白下区', '320100');
INSERT INTO `sys_area` VALUES ('805', '320104', '秦淮区', '320100');
INSERT INTO `sys_area` VALUES ('806', '320105', '建邺区', '320100');
INSERT INTO `sys_area` VALUES ('807', '320106', '鼓楼区', '320100');
INSERT INTO `sys_area` VALUES ('808', '320107', '下关区', '320100');
INSERT INTO `sys_area` VALUES ('809', '320111', '浦口区', '320100');
INSERT INTO `sys_area` VALUES ('810', '320113', '栖霞区', '320100');
INSERT INTO `sys_area` VALUES ('811', '320114', '雨花台区', '320100');
INSERT INTO `sys_area` VALUES ('812', '320115', '江宁区', '320100');
INSERT INTO `sys_area` VALUES ('813', '320116', '六合区', '320100');
INSERT INTO `sys_area` VALUES ('814', '320124', '溧水县', '320100');
INSERT INTO `sys_area` VALUES ('815', '320125', '高淳县', '320100');
INSERT INTO `sys_area` VALUES ('816', '320201', '市辖区', '320200');
INSERT INTO `sys_area` VALUES ('817', '320202', '崇安区', '320200');
INSERT INTO `sys_area` VALUES ('818', '320203', '南长区', '320200');
INSERT INTO `sys_area` VALUES ('819', '320204', '北塘区', '320200');
INSERT INTO `sys_area` VALUES ('820', '320205', '锡山区', '320200');
INSERT INTO `sys_area` VALUES ('821', '320206', '惠山区', '320200');
INSERT INTO `sys_area` VALUES ('822', '320211', '滨湖区', '320200');
INSERT INTO `sys_area` VALUES ('823', '320281', '江阴市', '320200');
INSERT INTO `sys_area` VALUES ('824', '320282', '宜兴市', '320200');
INSERT INTO `sys_area` VALUES ('825', '320301', '市辖区', '320300');
INSERT INTO `sys_area` VALUES ('826', '320302', '鼓楼区', '320300');
INSERT INTO `sys_area` VALUES ('827', '320303', '云龙区', '320300');
INSERT INTO `sys_area` VALUES ('828', '320304', '九里区', '320300');
INSERT INTO `sys_area` VALUES ('829', '320305', '贾汪区', '320300');
INSERT INTO `sys_area` VALUES ('830', '320311', '泉山区', '320300');
INSERT INTO `sys_area` VALUES ('831', '320321', '丰　县', '320300');
INSERT INTO `sys_area` VALUES ('832', '320322', '沛　县', '320300');
INSERT INTO `sys_area` VALUES ('833', '320323', '铜山县', '320300');
INSERT INTO `sys_area` VALUES ('834', '320324', '睢宁县', '320300');
INSERT INTO `sys_area` VALUES ('835', '320381', '新沂市', '320300');
INSERT INTO `sys_area` VALUES ('836', '320382', '邳州市', '320300');
INSERT INTO `sys_area` VALUES ('837', '320401', '市辖区', '320400');
INSERT INTO `sys_area` VALUES ('838', '320402', '天宁区', '320400');
INSERT INTO `sys_area` VALUES ('839', '320404', '钟楼区', '320400');
INSERT INTO `sys_area` VALUES ('840', '320405', '戚墅堰区', '320400');
INSERT INTO `sys_area` VALUES ('841', '320411', '新北区', '320400');
INSERT INTO `sys_area` VALUES ('842', '320412', '武进区', '320400');
INSERT INTO `sys_area` VALUES ('843', '320481', '溧阳市', '320400');
INSERT INTO `sys_area` VALUES ('844', '320482', '金坛市', '320400');
INSERT INTO `sys_area` VALUES ('845', '320501', '市辖区', '320500');
INSERT INTO `sys_area` VALUES ('846', '320502', '沧浪区', '320500');
INSERT INTO `sys_area` VALUES ('847', '320503', '平江区', '320500');
INSERT INTO `sys_area` VALUES ('848', '320504', '金阊区', '320500');
INSERT INTO `sys_area` VALUES ('849', '320505', '虎丘区', '320500');
INSERT INTO `sys_area` VALUES ('850', '320506', '吴中区', '320500');
INSERT INTO `sys_area` VALUES ('851', '320507', '相城区', '320500');
INSERT INTO `sys_area` VALUES ('852', '320581', '常熟市', '320500');
INSERT INTO `sys_area` VALUES ('853', '320582', '张家港市', '320500');
INSERT INTO `sys_area` VALUES ('854', '320583', '昆山市', '320500');
INSERT INTO `sys_area` VALUES ('855', '320584', '吴江市', '320500');
INSERT INTO `sys_area` VALUES ('856', '320585', '太仓市', '320500');
INSERT INTO `sys_area` VALUES ('857', '320601', '市辖区', '320600');
INSERT INTO `sys_area` VALUES ('858', '320602', '崇川区', '320600');
INSERT INTO `sys_area` VALUES ('859', '320611', '港闸区', '320600');
INSERT INTO `sys_area` VALUES ('860', '320621', '海安县', '320600');
INSERT INTO `sys_area` VALUES ('861', '320623', '如东县', '320600');
INSERT INTO `sys_area` VALUES ('862', '320681', '启东市', '320600');
INSERT INTO `sys_area` VALUES ('863', '320682', '如皋市', '320600');
INSERT INTO `sys_area` VALUES ('864', '320683', '通州市', '320600');
INSERT INTO `sys_area` VALUES ('865', '320684', '海门市', '320600');
INSERT INTO `sys_area` VALUES ('866', '320701', '市辖区', '320700');
INSERT INTO `sys_area` VALUES ('867', '320703', '连云区', '320700');
INSERT INTO `sys_area` VALUES ('868', '320705', '新浦区', '320700');
INSERT INTO `sys_area` VALUES ('869', '320706', '海州区', '320700');
INSERT INTO `sys_area` VALUES ('870', '320721', '赣榆县', '320700');
INSERT INTO `sys_area` VALUES ('871', '320722', '东海县', '320700');
INSERT INTO `sys_area` VALUES ('872', '320723', '灌云县', '320700');
INSERT INTO `sys_area` VALUES ('873', '320724', '灌南县', '320700');
INSERT INTO `sys_area` VALUES ('874', '320801', '市辖区', '320800');
INSERT INTO `sys_area` VALUES ('875', '320802', '清河区', '320800');
INSERT INTO `sys_area` VALUES ('876', '320803', '楚州区', '320800');
INSERT INTO `sys_area` VALUES ('877', '320804', '淮阴区', '320800');
INSERT INTO `sys_area` VALUES ('878', '320811', '清浦区', '320800');
INSERT INTO `sys_area` VALUES ('879', '320826', '涟水县', '320800');
INSERT INTO `sys_area` VALUES ('880', '320829', '洪泽县', '320800');
INSERT INTO `sys_area` VALUES ('881', '320830', '盱眙县', '320800');
INSERT INTO `sys_area` VALUES ('882', '320831', '金湖县', '320800');
INSERT INTO `sys_area` VALUES ('883', '320901', '市辖区', '320900');
INSERT INTO `sys_area` VALUES ('884', '320902', '亭湖区', '320900');
INSERT INTO `sys_area` VALUES ('885', '320903', '盐都区', '320900');
INSERT INTO `sys_area` VALUES ('886', '320921', '响水县', '320900');
INSERT INTO `sys_area` VALUES ('887', '320922', '滨海县', '320900');
INSERT INTO `sys_area` VALUES ('888', '320923', '阜宁县', '320900');
INSERT INTO `sys_area` VALUES ('889', '320924', '射阳县', '320900');
INSERT INTO `sys_area` VALUES ('890', '320925', '建湖县', '320900');
INSERT INTO `sys_area` VALUES ('891', '320981', '东台市', '320900');
INSERT INTO `sys_area` VALUES ('892', '320982', '大丰市', '320900');
INSERT INTO `sys_area` VALUES ('893', '321001', '市辖区', '321000');
INSERT INTO `sys_area` VALUES ('894', '321002', '广陵区', '321000');
INSERT INTO `sys_area` VALUES ('895', '321003', '邗江区', '321000');
INSERT INTO `sys_area` VALUES ('896', '321011', '郊　区', '321000');
INSERT INTO `sys_area` VALUES ('897', '321023', '宝应县', '321000');
INSERT INTO `sys_area` VALUES ('898', '321081', '仪征市', '321000');
INSERT INTO `sys_area` VALUES ('899', '321084', '高邮市', '321000');
INSERT INTO `sys_area` VALUES ('900', '321088', '江都市', '321000');
INSERT INTO `sys_area` VALUES ('901', '321101', '市辖区', '321100');
INSERT INTO `sys_area` VALUES ('902', '321102', '京口区', '321100');
INSERT INTO `sys_area` VALUES ('903', '321111', '润州区', '321100');
INSERT INTO `sys_area` VALUES ('904', '321112', '丹徒区', '321100');
INSERT INTO `sys_area` VALUES ('905', '321181', '丹阳市', '321100');
INSERT INTO `sys_area` VALUES ('906', '321182', '扬中市', '321100');
INSERT INTO `sys_area` VALUES ('907', '321183', '句容市', '321100');
INSERT INTO `sys_area` VALUES ('908', '321201', '市辖区', '321200');
INSERT INTO `sys_area` VALUES ('909', '321202', '海陵区', '321200');
INSERT INTO `sys_area` VALUES ('910', '321203', '高港区', '321200');
INSERT INTO `sys_area` VALUES ('911', '321281', '兴化市', '321200');
INSERT INTO `sys_area` VALUES ('912', '321282', '靖江市', '321200');
INSERT INTO `sys_area` VALUES ('913', '321283', '泰兴市', '321200');
INSERT INTO `sys_area` VALUES ('914', '321284', '姜堰市', '321200');
INSERT INTO `sys_area` VALUES ('915', '321301', '市辖区', '321300');
INSERT INTO `sys_area` VALUES ('916', '321302', '宿城区', '321300');
INSERT INTO `sys_area` VALUES ('917', '321311', '宿豫区', '321300');
INSERT INTO `sys_area` VALUES ('918', '321322', '沭阳县', '321300');
INSERT INTO `sys_area` VALUES ('919', '321323', '泗阳县', '321300');
INSERT INTO `sys_area` VALUES ('920', '321324', '泗洪县', '321300');
INSERT INTO `sys_area` VALUES ('921', '330101', '市辖区', '330100');
INSERT INTO `sys_area` VALUES ('922', '330102', '上城区', '330100');
INSERT INTO `sys_area` VALUES ('923', '330103', '下城区', '330100');
INSERT INTO `sys_area` VALUES ('924', '330104', '江干区', '330100');
INSERT INTO `sys_area` VALUES ('925', '330105', '拱墅区', '330100');
INSERT INTO `sys_area` VALUES ('926', '330106', '西湖区', '330100');
INSERT INTO `sys_area` VALUES ('927', '330108', '滨江区', '330100');
INSERT INTO `sys_area` VALUES ('928', '330109', '萧山区', '330100');
INSERT INTO `sys_area` VALUES ('929', '330110', '余杭区', '330100');
INSERT INTO `sys_area` VALUES ('930', '330122', '桐庐县', '330100');
INSERT INTO `sys_area` VALUES ('931', '330127', '淳安县', '330100');
INSERT INTO `sys_area` VALUES ('932', '330182', '建德市', '330100');
INSERT INTO `sys_area` VALUES ('933', '330183', '富阳市', '330100');
INSERT INTO `sys_area` VALUES ('934', '330185', '临安市', '330100');
INSERT INTO `sys_area` VALUES ('935', '330201', '市辖区', '330200');
INSERT INTO `sys_area` VALUES ('936', '330203', '海曙区', '330200');
INSERT INTO `sys_area` VALUES ('937', '330204', '江东区', '330200');
INSERT INTO `sys_area` VALUES ('938', '330205', '江北区', '330200');
INSERT INTO `sys_area` VALUES ('939', '330206', '北仑区', '330200');
INSERT INTO `sys_area` VALUES ('940', '330211', '镇海区', '330200');
INSERT INTO `sys_area` VALUES ('941', '330212', '鄞州区', '330200');
INSERT INTO `sys_area` VALUES ('942', '330225', '象山县', '330200');
INSERT INTO `sys_area` VALUES ('943', '330226', '宁海县', '330200');
INSERT INTO `sys_area` VALUES ('944', '330281', '余姚市', '330200');
INSERT INTO `sys_area` VALUES ('945', '330282', '慈溪市', '330200');
INSERT INTO `sys_area` VALUES ('946', '330283', '奉化市', '330200');
INSERT INTO `sys_area` VALUES ('947', '330301', '市辖区', '330300');
INSERT INTO `sys_area` VALUES ('948', '330302', '鹿城区', '330300');
INSERT INTO `sys_area` VALUES ('949', '330303', '龙湾区', '330300');
INSERT INTO `sys_area` VALUES ('950', '330304', '瓯海区', '330300');
INSERT INTO `sys_area` VALUES ('951', '330322', '洞头县', '330300');
INSERT INTO `sys_area` VALUES ('952', '330324', '永嘉县', '330300');
INSERT INTO `sys_area` VALUES ('953', '330326', '平阳县', '330300');
INSERT INTO `sys_area` VALUES ('954', '330327', '苍南县', '330300');
INSERT INTO `sys_area` VALUES ('955', '330328', '文成县', '330300');
INSERT INTO `sys_area` VALUES ('956', '330329', '泰顺县', '330300');
INSERT INTO `sys_area` VALUES ('957', '330381', '瑞安市', '330300');
INSERT INTO `sys_area` VALUES ('958', '330382', '乐清市', '330300');
INSERT INTO `sys_area` VALUES ('959', '330401', '市辖区', '330400');
INSERT INTO `sys_area` VALUES ('960', '330402', '秀城区', '330400');
INSERT INTO `sys_area` VALUES ('961', '330411', '秀洲区', '330400');
INSERT INTO `sys_area` VALUES ('962', '330421', '嘉善县', '330400');
INSERT INTO `sys_area` VALUES ('963', '330424', '海盐县', '330400');
INSERT INTO `sys_area` VALUES ('964', '330481', '海宁市', '330400');
INSERT INTO `sys_area` VALUES ('965', '330482', '平湖市', '330400');
INSERT INTO `sys_area` VALUES ('966', '330483', '桐乡市', '330400');
INSERT INTO `sys_area` VALUES ('967', '330501', '市辖区', '330500');
INSERT INTO `sys_area` VALUES ('968', '330502', '吴兴区', '330500');
INSERT INTO `sys_area` VALUES ('969', '330503', '南浔区', '330500');
INSERT INTO `sys_area` VALUES ('970', '330521', '德清县', '330500');
INSERT INTO `sys_area` VALUES ('971', '330522', '长兴县', '330500');
INSERT INTO `sys_area` VALUES ('972', '330523', '安吉县', '330500');
INSERT INTO `sys_area` VALUES ('973', '330601', '市辖区', '330600');
INSERT INTO `sys_area` VALUES ('974', '330602', '越城区', '330600');
INSERT INTO `sys_area` VALUES ('975', '330621', '绍兴县', '330600');
INSERT INTO `sys_area` VALUES ('976', '330624', '新昌县', '330600');
INSERT INTO `sys_area` VALUES ('977', '330681', '诸暨市', '330600');
INSERT INTO `sys_area` VALUES ('978', '330682', '上虞市', '330600');
INSERT INTO `sys_area` VALUES ('979', '330683', '嵊州市', '330600');
INSERT INTO `sys_area` VALUES ('980', '330701', '市辖区', '330700');
INSERT INTO `sys_area` VALUES ('981', '330702', '婺城区', '330700');
INSERT INTO `sys_area` VALUES ('982', '330703', '金东区', '330700');
INSERT INTO `sys_area` VALUES ('983', '330723', '武义县', '330700');
INSERT INTO `sys_area` VALUES ('984', '330726', '浦江县', '330700');
INSERT INTO `sys_area` VALUES ('985', '330727', '磐安县', '330700');
INSERT INTO `sys_area` VALUES ('986', '330781', '兰溪市', '330700');
INSERT INTO `sys_area` VALUES ('987', '330782', '义乌市', '330700');
INSERT INTO `sys_area` VALUES ('988', '330783', '东阳市', '330700');
INSERT INTO `sys_area` VALUES ('989', '330784', '永康市', '330700');
INSERT INTO `sys_area` VALUES ('990', '330801', '市辖区', '330800');
INSERT INTO `sys_area` VALUES ('991', '330802', '柯城区', '330800');
INSERT INTO `sys_area` VALUES ('992', '330803', '衢江区', '330800');
INSERT INTO `sys_area` VALUES ('993', '330822', '常山县', '330800');
INSERT INTO `sys_area` VALUES ('994', '330824', '开化县', '330800');
INSERT INTO `sys_area` VALUES ('995', '330825', '龙游县', '330800');
INSERT INTO `sys_area` VALUES ('996', '330881', '江山市', '330800');
INSERT INTO `sys_area` VALUES ('997', '330901', '市辖区', '330900');
INSERT INTO `sys_area` VALUES ('998', '330902', '定海区', '330900');
INSERT INTO `sys_area` VALUES ('999', '330903', '普陀区', '330900');
INSERT INTO `sys_area` VALUES ('1000', '330921', '岱山县', '330900');
INSERT INTO `sys_area` VALUES ('1001', '330922', '嵊泗县', '330900');
INSERT INTO `sys_area` VALUES ('1002', '331001', '市辖区', '331000');
INSERT INTO `sys_area` VALUES ('1003', '331002', '椒江区', '331000');
INSERT INTO `sys_area` VALUES ('1004', '331003', '黄岩区', '331000');
INSERT INTO `sys_area` VALUES ('1005', '331004', '路桥区', '331000');
INSERT INTO `sys_area` VALUES ('1006', '331021', '玉环县', '331000');
INSERT INTO `sys_area` VALUES ('1007', '331022', '三门县', '331000');
INSERT INTO `sys_area` VALUES ('1008', '331023', '天台县', '331000');
INSERT INTO `sys_area` VALUES ('1009', '331024', '仙居县', '331000');
INSERT INTO `sys_area` VALUES ('1010', '331081', '温岭市', '331000');
INSERT INTO `sys_area` VALUES ('1011', '331082', '临海市', '331000');
INSERT INTO `sys_area` VALUES ('1012', '331101', '市辖区', '331100');
INSERT INTO `sys_area` VALUES ('1013', '331102', '莲都区', '331100');
INSERT INTO `sys_area` VALUES ('1014', '331121', '青田县', '331100');
INSERT INTO `sys_area` VALUES ('1015', '331122', '缙云县', '331100');
INSERT INTO `sys_area` VALUES ('1016', '331123', '遂昌县', '331100');
INSERT INTO `sys_area` VALUES ('1017', '331124', '松阳县', '331100');
INSERT INTO `sys_area` VALUES ('1018', '331125', '云和县', '331100');
INSERT INTO `sys_area` VALUES ('1019', '331126', '庆元县', '331100');
INSERT INTO `sys_area` VALUES ('1020', '331127', '景宁畲族自治县', '331100');
INSERT INTO `sys_area` VALUES ('1021', '331181', '龙泉市', '331100');
INSERT INTO `sys_area` VALUES ('1022', '340101', '市辖区', '340100');
INSERT INTO `sys_area` VALUES ('1023', '340102', '瑶海区', '340100');
INSERT INTO `sys_area` VALUES ('1024', '340103', '庐阳区', '340100');
INSERT INTO `sys_area` VALUES ('1025', '340104', '蜀山区', '340100');
INSERT INTO `sys_area` VALUES ('1026', '340111', '包河区', '340100');
INSERT INTO `sys_area` VALUES ('1027', '340121', '长丰县', '340100');
INSERT INTO `sys_area` VALUES ('1028', '340122', '肥东县', '340100');
INSERT INTO `sys_area` VALUES ('1029', '340123', '肥西县', '340100');
INSERT INTO `sys_area` VALUES ('1030', '340201', '市辖区', '340200');
INSERT INTO `sys_area` VALUES ('1031', '340202', '镜湖区', '340200');
INSERT INTO `sys_area` VALUES ('1032', '340203', '马塘区', '340200');
INSERT INTO `sys_area` VALUES ('1033', '340204', '新芜区', '340200');
INSERT INTO `sys_area` VALUES ('1034', '340207', '鸠江区', '340200');
INSERT INTO `sys_area` VALUES ('1035', '340221', '芜湖县', '340200');
INSERT INTO `sys_area` VALUES ('1036', '340222', '繁昌县', '340200');
INSERT INTO `sys_area` VALUES ('1037', '340223', '南陵县', '340200');
INSERT INTO `sys_area` VALUES ('1038', '340301', '市辖区', '340300');
INSERT INTO `sys_area` VALUES ('1039', '340302', '龙子湖区', '340300');
INSERT INTO `sys_area` VALUES ('1040', '340303', '蚌山区', '340300');
INSERT INTO `sys_area` VALUES ('1041', '340304', '禹会区', '340300');
INSERT INTO `sys_area` VALUES ('1042', '340311', '淮上区', '340300');
INSERT INTO `sys_area` VALUES ('1043', '340321', '怀远县', '340300');
INSERT INTO `sys_area` VALUES ('1044', '340322', '五河县', '340300');
INSERT INTO `sys_area` VALUES ('1045', '340323', '固镇县', '340300');
INSERT INTO `sys_area` VALUES ('1046', '340401', '市辖区', '340400');
INSERT INTO `sys_area` VALUES ('1047', '340402', '大通区', '340400');
INSERT INTO `sys_area` VALUES ('1048', '340403', '田家庵区', '340400');
INSERT INTO `sys_area` VALUES ('1049', '340404', '谢家集区', '340400');
INSERT INTO `sys_area` VALUES ('1050', '340405', '八公山区', '340400');
INSERT INTO `sys_area` VALUES ('1051', '340406', '潘集区', '340400');
INSERT INTO `sys_area` VALUES ('1052', '340421', '凤台县', '340400');
INSERT INTO `sys_area` VALUES ('1053', '340501', '市辖区', '340500');
INSERT INTO `sys_area` VALUES ('1054', '340502', '金家庄区', '340500');
INSERT INTO `sys_area` VALUES ('1055', '340503', '花山区', '340500');
INSERT INTO `sys_area` VALUES ('1056', '340504', '雨山区', '340500');
INSERT INTO `sys_area` VALUES ('1057', '340521', '当涂县', '340500');
INSERT INTO `sys_area` VALUES ('1058', '340601', '市辖区', '340600');
INSERT INTO `sys_area` VALUES ('1059', '340602', '杜集区', '340600');
INSERT INTO `sys_area` VALUES ('1060', '340603', '相山区', '340600');
INSERT INTO `sys_area` VALUES ('1061', '340604', '烈山区', '340600');
INSERT INTO `sys_area` VALUES ('1062', '340621', '濉溪县', '340600');
INSERT INTO `sys_area` VALUES ('1063', '340701', '市辖区', '340700');
INSERT INTO `sys_area` VALUES ('1064', '340702', '铜官山区', '340700');
INSERT INTO `sys_area` VALUES ('1065', '340703', '狮子山区', '340700');
INSERT INTO `sys_area` VALUES ('1066', '340711', '郊　区', '340700');
INSERT INTO `sys_area` VALUES ('1067', '340721', '铜陵县', '340700');
INSERT INTO `sys_area` VALUES ('1068', '340801', '市辖区', '340800');
INSERT INTO `sys_area` VALUES ('1069', '340802', '迎江区', '340800');
INSERT INTO `sys_area` VALUES ('1070', '340803', '大观区', '340800');
INSERT INTO `sys_area` VALUES ('1071', '340811', '郊　区', '340800');
INSERT INTO `sys_area` VALUES ('1072', '340822', '怀宁县', '340800');
INSERT INTO `sys_area` VALUES ('1073', '340823', '枞阳县', '340800');
INSERT INTO `sys_area` VALUES ('1074', '340824', '潜山县', '340800');
INSERT INTO `sys_area` VALUES ('1075', '340825', '太湖县', '340800');
INSERT INTO `sys_area` VALUES ('1076', '340826', '宿松县', '340800');
INSERT INTO `sys_area` VALUES ('1077', '340827', '望江县', '340800');
INSERT INTO `sys_area` VALUES ('1078', '340828', '岳西县', '340800');
INSERT INTO `sys_area` VALUES ('1079', '340881', '桐城市', '340800');
INSERT INTO `sys_area` VALUES ('1080', '341001', '市辖区', '341000');
INSERT INTO `sys_area` VALUES ('1081', '341002', '屯溪区', '341000');
INSERT INTO `sys_area` VALUES ('1082', '341003', '黄山区', '341000');
INSERT INTO `sys_area` VALUES ('1083', '341004', '徽州区', '341000');
INSERT INTO `sys_area` VALUES ('1084', '341021', '歙　县', '341000');
INSERT INTO `sys_area` VALUES ('1085', '341022', '休宁县', '341000');
INSERT INTO `sys_area` VALUES ('1086', '341023', '黟　县', '341000');
INSERT INTO `sys_area` VALUES ('1087', '341024', '祁门县', '341000');
INSERT INTO `sys_area` VALUES ('1088', '341101', '市辖区', '341100');
INSERT INTO `sys_area` VALUES ('1089', '341102', '琅琊区', '341100');
INSERT INTO `sys_area` VALUES ('1090', '341103', '南谯区', '341100');
INSERT INTO `sys_area` VALUES ('1091', '341122', '来安县', '341100');
INSERT INTO `sys_area` VALUES ('1092', '341124', '全椒县', '341100');
INSERT INTO `sys_area` VALUES ('1093', '341125', '定远县', '341100');
INSERT INTO `sys_area` VALUES ('1094', '341126', '凤阳县', '341100');
INSERT INTO `sys_area` VALUES ('1095', '341181', '天长市', '341100');
INSERT INTO `sys_area` VALUES ('1096', '341182', '明光市', '341100');
INSERT INTO `sys_area` VALUES ('1097', '341201', '市辖区', '341200');
INSERT INTO `sys_area` VALUES ('1098', '341202', '颍州区', '341200');
INSERT INTO `sys_area` VALUES ('1099', '341203', '颍东区', '341200');
INSERT INTO `sys_area` VALUES ('1100', '341204', '颍泉区', '341200');
INSERT INTO `sys_area` VALUES ('1101', '341221', '临泉县', '341200');
INSERT INTO `sys_area` VALUES ('1102', '341222', '太和县', '341200');
INSERT INTO `sys_area` VALUES ('1103', '341225', '阜南县', '341200');
INSERT INTO `sys_area` VALUES ('1104', '341226', '颍上县', '341200');
INSERT INTO `sys_area` VALUES ('1105', '341282', '界首市', '341200');
INSERT INTO `sys_area` VALUES ('1106', '341301', '市辖区', '341300');
INSERT INTO `sys_area` VALUES ('1107', '341302', '墉桥区', '341300');
INSERT INTO `sys_area` VALUES ('1108', '341321', '砀山县', '341300');
INSERT INTO `sys_area` VALUES ('1109', '341322', '萧　县', '341300');
INSERT INTO `sys_area` VALUES ('1110', '341323', '灵璧县', '341300');
INSERT INTO `sys_area` VALUES ('1111', '341324', '泗　县', '341300');
INSERT INTO `sys_area` VALUES ('1112', '341401', '市辖区', '341400');
INSERT INTO `sys_area` VALUES ('1113', '341402', '居巢区', '341400');
INSERT INTO `sys_area` VALUES ('1114', '341421', '庐江县', '341400');
INSERT INTO `sys_area` VALUES ('1115', '341422', '无为县', '341400');
INSERT INTO `sys_area` VALUES ('1116', '341423', '含山县', '341400');
INSERT INTO `sys_area` VALUES ('1117', '341424', '和　县', '341400');
INSERT INTO `sys_area` VALUES ('1118', '341501', '市辖区', '341500');
INSERT INTO `sys_area` VALUES ('1119', '341502', '金安区', '341500');
INSERT INTO `sys_area` VALUES ('1120', '341503', '裕安区', '341500');
INSERT INTO `sys_area` VALUES ('1121', '341521', '寿　县', '341500');
INSERT INTO `sys_area` VALUES ('1122', '341522', '霍邱县', '341500');
INSERT INTO `sys_area` VALUES ('1123', '341523', '舒城县', '341500');
INSERT INTO `sys_area` VALUES ('1124', '341524', '金寨县', '341500');
INSERT INTO `sys_area` VALUES ('1125', '341525', '霍山县', '341500');
INSERT INTO `sys_area` VALUES ('1126', '341601', '市辖区', '341600');
INSERT INTO `sys_area` VALUES ('1127', '341602', '谯城区', '341600');
INSERT INTO `sys_area` VALUES ('1128', '341621', '涡阳县', '341600');
INSERT INTO `sys_area` VALUES ('1129', '341622', '蒙城县', '341600');
INSERT INTO `sys_area` VALUES ('1130', '341623', '利辛县', '341600');
INSERT INTO `sys_area` VALUES ('1131', '341701', '市辖区', '341700');
INSERT INTO `sys_area` VALUES ('1132', '341702', '贵池区', '341700');
INSERT INTO `sys_area` VALUES ('1133', '341721', '东至县', '341700');
INSERT INTO `sys_area` VALUES ('1134', '341722', '石台县', '341700');
INSERT INTO `sys_area` VALUES ('1135', '341723', '青阳县', '341700');
INSERT INTO `sys_area` VALUES ('1136', '341801', '市辖区', '341800');
INSERT INTO `sys_area` VALUES ('1137', '341802', '宣州区', '341800');
INSERT INTO `sys_area` VALUES ('1138', '341821', '郎溪县', '341800');
INSERT INTO `sys_area` VALUES ('1139', '341822', '广德县', '341800');
INSERT INTO `sys_area` VALUES ('1140', '341823', '泾　县', '341800');
INSERT INTO `sys_area` VALUES ('1141', '341824', '绩溪县', '341800');
INSERT INTO `sys_area` VALUES ('1142', '341825', '旌德县', '341800');
INSERT INTO `sys_area` VALUES ('1143', '341881', '宁国市', '341800');
INSERT INTO `sys_area` VALUES ('1144', '350101', '市辖区', '350100');
INSERT INTO `sys_area` VALUES ('1145', '350102', '鼓楼区', '350100');
INSERT INTO `sys_area` VALUES ('1146', '350103', '台江区', '350100');
INSERT INTO `sys_area` VALUES ('1147', '350104', '仓山区', '350100');
INSERT INTO `sys_area` VALUES ('1148', '350105', '马尾区', '350100');
INSERT INTO `sys_area` VALUES ('1149', '350111', '晋安区', '350100');
INSERT INTO `sys_area` VALUES ('1150', '350121', '闽侯县', '350100');
INSERT INTO `sys_area` VALUES ('1151', '350122', '连江县', '350100');
INSERT INTO `sys_area` VALUES ('1152', '350123', '罗源县', '350100');
INSERT INTO `sys_area` VALUES ('1153', '350124', '闽清县', '350100');
INSERT INTO `sys_area` VALUES ('1154', '350125', '永泰县', '350100');
INSERT INTO `sys_area` VALUES ('1155', '350128', '平潭县', '350100');
INSERT INTO `sys_area` VALUES ('1156', '350181', '福清市', '350100');
INSERT INTO `sys_area` VALUES ('1157', '350182', '长乐市', '350100');
INSERT INTO `sys_area` VALUES ('1158', '350201', '市辖区', '350200');
INSERT INTO `sys_area` VALUES ('1159', '350203', '思明区', '350200');
INSERT INTO `sys_area` VALUES ('1160', '350205', '海沧区', '350200');
INSERT INTO `sys_area` VALUES ('1161', '350206', '湖里区', '350200');
INSERT INTO `sys_area` VALUES ('1162', '350211', '集美区', '350200');
INSERT INTO `sys_area` VALUES ('1163', '350212', '同安区', '350200');
INSERT INTO `sys_area` VALUES ('1164', '350213', '翔安区', '350200');
INSERT INTO `sys_area` VALUES ('1165', '350301', '市辖区', '350300');
INSERT INTO `sys_area` VALUES ('1166', '350302', '城厢区', '350300');
INSERT INTO `sys_area` VALUES ('1167', '350303', '涵江区', '350300');
INSERT INTO `sys_area` VALUES ('1168', '350304', '荔城区', '350300');
INSERT INTO `sys_area` VALUES ('1169', '350305', '秀屿区', '350300');
INSERT INTO `sys_area` VALUES ('1170', '350322', '仙游县', '350300');
INSERT INTO `sys_area` VALUES ('1171', '350401', '市辖区', '350400');
INSERT INTO `sys_area` VALUES ('1172', '350402', '梅列区', '350400');
INSERT INTO `sys_area` VALUES ('1173', '350403', '三元区', '350400');
INSERT INTO `sys_area` VALUES ('1174', '350421', '明溪县', '350400');
INSERT INTO `sys_area` VALUES ('1175', '350423', '清流县', '350400');
INSERT INTO `sys_area` VALUES ('1176', '350424', '宁化县', '350400');
INSERT INTO `sys_area` VALUES ('1177', '350425', '大田县', '350400');
INSERT INTO `sys_area` VALUES ('1178', '350426', '尤溪县', '350400');
INSERT INTO `sys_area` VALUES ('1179', '350427', '沙　县', '350400');
INSERT INTO `sys_area` VALUES ('1180', '350428', '将乐县', '350400');
INSERT INTO `sys_area` VALUES ('1181', '350429', '泰宁县', '350400');
INSERT INTO `sys_area` VALUES ('1182', '350430', '建宁县', '350400');
INSERT INTO `sys_area` VALUES ('1183', '350481', '永安市', '350400');
INSERT INTO `sys_area` VALUES ('1184', '350501', '市辖区', '350500');
INSERT INTO `sys_area` VALUES ('1185', '350502', '鲤城区', '350500');
INSERT INTO `sys_area` VALUES ('1186', '350503', '丰泽区', '350500');
INSERT INTO `sys_area` VALUES ('1187', '350504', '洛江区', '350500');
INSERT INTO `sys_area` VALUES ('1188', '350505', '泉港区', '350500');
INSERT INTO `sys_area` VALUES ('1189', '350521', '惠安县', '350500');
INSERT INTO `sys_area` VALUES ('1190', '350524', '安溪县', '350500');
INSERT INTO `sys_area` VALUES ('1191', '350525', '永春县', '350500');
INSERT INTO `sys_area` VALUES ('1192', '350526', '德化县', '350500');
INSERT INTO `sys_area` VALUES ('1193', '350527', '金门县', '350500');
INSERT INTO `sys_area` VALUES ('1194', '350581', '石狮市', '350500');
INSERT INTO `sys_area` VALUES ('1195', '350582', '晋江市', '350500');
INSERT INTO `sys_area` VALUES ('1196', '350583', '南安市', '350500');
INSERT INTO `sys_area` VALUES ('1197', '350601', '市辖区', '350600');
INSERT INTO `sys_area` VALUES ('1198', '350602', '芗城区', '350600');
INSERT INTO `sys_area` VALUES ('1199', '350603', '龙文区', '350600');
INSERT INTO `sys_area` VALUES ('1200', '350622', '云霄县', '350600');
INSERT INTO `sys_area` VALUES ('1201', '350623', '漳浦县', '350600');
INSERT INTO `sys_area` VALUES ('1202', '350624', '诏安县', '350600');
INSERT INTO `sys_area` VALUES ('1203', '350625', '长泰县', '350600');
INSERT INTO `sys_area` VALUES ('1204', '350626', '东山县', '350600');
INSERT INTO `sys_area` VALUES ('1205', '350627', '南靖县', '350600');
INSERT INTO `sys_area` VALUES ('1206', '350628', '平和县', '350600');
INSERT INTO `sys_area` VALUES ('1207', '350629', '华安县', '350600');
INSERT INTO `sys_area` VALUES ('1208', '350681', '龙海市', '350600');
INSERT INTO `sys_area` VALUES ('1209', '350701', '市辖区', '350700');
INSERT INTO `sys_area` VALUES ('1210', '350702', '延平区', '350700');
INSERT INTO `sys_area` VALUES ('1211', '350721', '顺昌县', '350700');
INSERT INTO `sys_area` VALUES ('1212', '350722', '浦城县', '350700');
INSERT INTO `sys_area` VALUES ('1213', '350723', '光泽县', '350700');
INSERT INTO `sys_area` VALUES ('1214', '350724', '松溪县', '350700');
INSERT INTO `sys_area` VALUES ('1215', '350725', '政和县', '350700');
INSERT INTO `sys_area` VALUES ('1216', '350781', '邵武市', '350700');
INSERT INTO `sys_area` VALUES ('1217', '350782', '武夷山市', '350700');
INSERT INTO `sys_area` VALUES ('1218', '350783', '建瓯市', '350700');
INSERT INTO `sys_area` VALUES ('1219', '350784', '建阳市', '350700');
INSERT INTO `sys_area` VALUES ('1220', '350801', '市辖区', '350800');
INSERT INTO `sys_area` VALUES ('1221', '350802', '新罗区', '350800');
INSERT INTO `sys_area` VALUES ('1222', '350821', '长汀县', '350800');
INSERT INTO `sys_area` VALUES ('1223', '350822', '永定县', '350800');
INSERT INTO `sys_area` VALUES ('1224', '350823', '上杭县', '350800');
INSERT INTO `sys_area` VALUES ('1225', '350824', '武平县', '350800');
INSERT INTO `sys_area` VALUES ('1226', '350825', '连城县', '350800');
INSERT INTO `sys_area` VALUES ('1227', '350881', '漳平市', '350800');
INSERT INTO `sys_area` VALUES ('1228', '350901', '市辖区', '350900');
INSERT INTO `sys_area` VALUES ('1229', '350902', '蕉城区', '350900');
INSERT INTO `sys_area` VALUES ('1230', '350921', '霞浦县', '350900');
INSERT INTO `sys_area` VALUES ('1231', '350922', '古田县', '350900');
INSERT INTO `sys_area` VALUES ('1232', '350923', '屏南县', '350900');
INSERT INTO `sys_area` VALUES ('1233', '350924', '寿宁县', '350900');
INSERT INTO `sys_area` VALUES ('1234', '350925', '周宁县', '350900');
INSERT INTO `sys_area` VALUES ('1235', '350926', '柘荣县', '350900');
INSERT INTO `sys_area` VALUES ('1236', '350981', '福安市', '350900');
INSERT INTO `sys_area` VALUES ('1237', '350982', '福鼎市', '350900');
INSERT INTO `sys_area` VALUES ('1238', '360101', '市辖区', '360100');
INSERT INTO `sys_area` VALUES ('1239', '360102', '东湖区', '360100');
INSERT INTO `sys_area` VALUES ('1240', '360103', '西湖区', '360100');
INSERT INTO `sys_area` VALUES ('1241', '360104', '青云谱区', '360100');
INSERT INTO `sys_area` VALUES ('1242', '360105', '湾里区', '360100');
INSERT INTO `sys_area` VALUES ('1243', '360111', '青山湖区', '360100');
INSERT INTO `sys_area` VALUES ('1244', '360121', '南昌县', '360100');
INSERT INTO `sys_area` VALUES ('1245', '360122', '新建县', '360100');
INSERT INTO `sys_area` VALUES ('1246', '360123', '安义县', '360100');
INSERT INTO `sys_area` VALUES ('1247', '360124', '进贤县', '360100');
INSERT INTO `sys_area` VALUES ('1248', '360201', '市辖区', '360200');
INSERT INTO `sys_area` VALUES ('1249', '360202', '昌江区', '360200');
INSERT INTO `sys_area` VALUES ('1250', '360203', '珠山区', '360200');
INSERT INTO `sys_area` VALUES ('1251', '360222', '浮梁县', '360200');
INSERT INTO `sys_area` VALUES ('1252', '360281', '乐平市', '360200');
INSERT INTO `sys_area` VALUES ('1253', '360301', '市辖区', '360300');
INSERT INTO `sys_area` VALUES ('1254', '360302', '安源区', '360300');
INSERT INTO `sys_area` VALUES ('1255', '360313', '湘东区', '360300');
INSERT INTO `sys_area` VALUES ('1256', '360321', '莲花县', '360300');
INSERT INTO `sys_area` VALUES ('1257', '360322', '上栗县', '360300');
INSERT INTO `sys_area` VALUES ('1258', '360323', '芦溪县', '360300');
INSERT INTO `sys_area` VALUES ('1259', '360401', '市辖区', '360400');
INSERT INTO `sys_area` VALUES ('1260', '360402', '庐山区', '360400');
INSERT INTO `sys_area` VALUES ('1261', '360403', '浔阳区', '360400');
INSERT INTO `sys_area` VALUES ('1262', '360421', '九江县', '360400');
INSERT INTO `sys_area` VALUES ('1263', '360423', '武宁县', '360400');
INSERT INTO `sys_area` VALUES ('1264', '360424', '修水县', '360400');
INSERT INTO `sys_area` VALUES ('1265', '360425', '永修县', '360400');
INSERT INTO `sys_area` VALUES ('1266', '360426', '德安县', '360400');
INSERT INTO `sys_area` VALUES ('1267', '360427', '星子县', '360400');
INSERT INTO `sys_area` VALUES ('1268', '360428', '都昌县', '360400');
INSERT INTO `sys_area` VALUES ('1269', '360429', '湖口县', '360400');
INSERT INTO `sys_area` VALUES ('1270', '360430', '彭泽县', '360400');
INSERT INTO `sys_area` VALUES ('1271', '360481', '瑞昌市', '360400');
INSERT INTO `sys_area` VALUES ('1272', '360501', '市辖区', '360500');
INSERT INTO `sys_area` VALUES ('1273', '360502', '渝水区', '360500');
INSERT INTO `sys_area` VALUES ('1274', '360521', '分宜县', '360500');
INSERT INTO `sys_area` VALUES ('1275', '360601', '市辖区', '360600');
INSERT INTO `sys_area` VALUES ('1276', '360602', '月湖区', '360600');
INSERT INTO `sys_area` VALUES ('1277', '360622', '余江县', '360600');
INSERT INTO `sys_area` VALUES ('1278', '360681', '贵溪市', '360600');
INSERT INTO `sys_area` VALUES ('1279', '360701', '市辖区', '360700');
INSERT INTO `sys_area` VALUES ('1280', '360702', '章贡区', '360700');
INSERT INTO `sys_area` VALUES ('1281', '360721', '赣　县', '360700');
INSERT INTO `sys_area` VALUES ('1282', '360722', '信丰县', '360700');
INSERT INTO `sys_area` VALUES ('1283', '360723', '大余县', '360700');
INSERT INTO `sys_area` VALUES ('1284', '360724', '上犹县', '360700');
INSERT INTO `sys_area` VALUES ('1285', '360725', '崇义县', '360700');
INSERT INTO `sys_area` VALUES ('1286', '360726', '安远县', '360700');
INSERT INTO `sys_area` VALUES ('1287', '360727', '龙南县', '360700');
INSERT INTO `sys_area` VALUES ('1288', '360728', '定南县', '360700');
INSERT INTO `sys_area` VALUES ('1289', '360729', '全南县', '360700');
INSERT INTO `sys_area` VALUES ('1290', '360730', '宁都县', '360700');
INSERT INTO `sys_area` VALUES ('1291', '360731', '于都县', '360700');
INSERT INTO `sys_area` VALUES ('1292', '360732', '兴国县', '360700');
INSERT INTO `sys_area` VALUES ('1293', '360733', '会昌县', '360700');
INSERT INTO `sys_area` VALUES ('1294', '360734', '寻乌县', '360700');
INSERT INTO `sys_area` VALUES ('1295', '360735', '石城县', '360700');
INSERT INTO `sys_area` VALUES ('1296', '360781', '瑞金市', '360700');
INSERT INTO `sys_area` VALUES ('1297', '360782', '南康市', '360700');
INSERT INTO `sys_area` VALUES ('1298', '360801', '市辖区', '360800');
INSERT INTO `sys_area` VALUES ('1299', '360802', '吉州区', '360800');
INSERT INTO `sys_area` VALUES ('1300', '360803', '青原区', '360800');
INSERT INTO `sys_area` VALUES ('1301', '360821', '吉安县', '360800');
INSERT INTO `sys_area` VALUES ('1302', '360822', '吉水县', '360800');
INSERT INTO `sys_area` VALUES ('1303', '360823', '峡江县', '360800');
INSERT INTO `sys_area` VALUES ('1304', '360824', '新干县', '360800');
INSERT INTO `sys_area` VALUES ('1305', '360825', '永丰县', '360800');
INSERT INTO `sys_area` VALUES ('1306', '360826', '泰和县', '360800');
INSERT INTO `sys_area` VALUES ('1307', '360827', '遂川县', '360800');
INSERT INTO `sys_area` VALUES ('1308', '360828', '万安县', '360800');
INSERT INTO `sys_area` VALUES ('1309', '360829', '安福县', '360800');
INSERT INTO `sys_area` VALUES ('1310', '360830', '永新县', '360800');
INSERT INTO `sys_area` VALUES ('1311', '360881', '井冈山市', '360800');
INSERT INTO `sys_area` VALUES ('1312', '360901', '市辖区', '360900');
INSERT INTO `sys_area` VALUES ('1313', '360902', '袁州区', '360900');
INSERT INTO `sys_area` VALUES ('1314', '360921', '奉新县', '360900');
INSERT INTO `sys_area` VALUES ('1315', '360922', '万载县', '360900');
INSERT INTO `sys_area` VALUES ('1316', '360923', '上高县', '360900');
INSERT INTO `sys_area` VALUES ('1317', '360924', '宜丰县', '360900');
INSERT INTO `sys_area` VALUES ('1318', '360925', '靖安县', '360900');
INSERT INTO `sys_area` VALUES ('1319', '360926', '铜鼓县', '360900');
INSERT INTO `sys_area` VALUES ('1320', '360981', '丰城市', '360900');
INSERT INTO `sys_area` VALUES ('1321', '360982', '樟树市', '360900');
INSERT INTO `sys_area` VALUES ('1322', '360983', '高安市', '360900');
INSERT INTO `sys_area` VALUES ('1323', '361001', '市辖区', '361000');
INSERT INTO `sys_area` VALUES ('1324', '361002', '临川区', '361000');
INSERT INTO `sys_area` VALUES ('1325', '361021', '南城县', '361000');
INSERT INTO `sys_area` VALUES ('1326', '361022', '黎川县', '361000');
INSERT INTO `sys_area` VALUES ('1327', '361023', '南丰县', '361000');
INSERT INTO `sys_area` VALUES ('1328', '361024', '崇仁县', '361000');
INSERT INTO `sys_area` VALUES ('1329', '361025', '乐安县', '361000');
INSERT INTO `sys_area` VALUES ('1330', '361026', '宜黄县', '361000');
INSERT INTO `sys_area` VALUES ('1331', '361027', '金溪县', '361000');
INSERT INTO `sys_area` VALUES ('1332', '361028', '资溪县', '361000');
INSERT INTO `sys_area` VALUES ('1333', '361029', '东乡县', '361000');
INSERT INTO `sys_area` VALUES ('1334', '361030', '广昌县', '361000');
INSERT INTO `sys_area` VALUES ('1335', '361101', '市辖区', '361100');
INSERT INTO `sys_area` VALUES ('1336', '361102', '信州区', '361100');
INSERT INTO `sys_area` VALUES ('1337', '361121', '上饶县', '361100');
INSERT INTO `sys_area` VALUES ('1338', '361122', '广丰县', '361100');
INSERT INTO `sys_area` VALUES ('1339', '361123', '玉山县', '361100');
INSERT INTO `sys_area` VALUES ('1340', '361124', '铅山县', '361100');
INSERT INTO `sys_area` VALUES ('1341', '361125', '横峰县', '361100');
INSERT INTO `sys_area` VALUES ('1342', '361126', '弋阳县', '361100');
INSERT INTO `sys_area` VALUES ('1343', '361127', '余干县', '361100');
INSERT INTO `sys_area` VALUES ('1344', '361128', '鄱阳县', '361100');
INSERT INTO `sys_area` VALUES ('1345', '361129', '万年县', '361100');
INSERT INTO `sys_area` VALUES ('1346', '361130', '婺源县', '361100');
INSERT INTO `sys_area` VALUES ('1347', '361181', '德兴市', '361100');
INSERT INTO `sys_area` VALUES ('1348', '370101', '市辖区', '370100');
INSERT INTO `sys_area` VALUES ('1349', '370102', '历下区', '370100');
INSERT INTO `sys_area` VALUES ('1350', '370103', '市中区', '370100');
INSERT INTO `sys_area` VALUES ('1351', '370104', '槐荫区', '370100');
INSERT INTO `sys_area` VALUES ('1352', '370105', '天桥区', '370100');
INSERT INTO `sys_area` VALUES ('1353', '370112', '历城区', '370100');
INSERT INTO `sys_area` VALUES ('1354', '370113', '长清区', '370100');
INSERT INTO `sys_area` VALUES ('1355', '370124', '平阴县', '370100');
INSERT INTO `sys_area` VALUES ('1356', '370125', '济阳县', '370100');
INSERT INTO `sys_area` VALUES ('1357', '370126', '商河县', '370100');
INSERT INTO `sys_area` VALUES ('1358', '370181', '章丘市', '370100');
INSERT INTO `sys_area` VALUES ('1359', '370201', '市辖区', '370200');
INSERT INTO `sys_area` VALUES ('1360', '370202', '市南区', '370200');
INSERT INTO `sys_area` VALUES ('1361', '370203', '市北区', '370200');
INSERT INTO `sys_area` VALUES ('1362', '370205', '四方区', '370200');
INSERT INTO `sys_area` VALUES ('1363', '370211', '黄岛区', '370200');
INSERT INTO `sys_area` VALUES ('1364', '370212', '崂山区', '370200');
INSERT INTO `sys_area` VALUES ('1365', '370213', '李沧区', '370200');
INSERT INTO `sys_area` VALUES ('1366', '370214', '城阳区', '370200');
INSERT INTO `sys_area` VALUES ('1367', '370281', '胶州市', '370200');
INSERT INTO `sys_area` VALUES ('1368', '370282', '即墨市', '370200');
INSERT INTO `sys_area` VALUES ('1369', '370283', '平度市', '370200');
INSERT INTO `sys_area` VALUES ('1370', '370284', '胶南市', '370200');
INSERT INTO `sys_area` VALUES ('1371', '370285', '莱西市', '370200');
INSERT INTO `sys_area` VALUES ('1372', '370301', '市辖区', '370300');
INSERT INTO `sys_area` VALUES ('1373', '370302', '淄川区', '370300');
INSERT INTO `sys_area` VALUES ('1374', '370303', '张店区', '370300');
INSERT INTO `sys_area` VALUES ('1375', '370304', '博山区', '370300');
INSERT INTO `sys_area` VALUES ('1376', '370305', '临淄区', '370300');
INSERT INTO `sys_area` VALUES ('1377', '370306', '周村区', '370300');
INSERT INTO `sys_area` VALUES ('1378', '370321', '桓台县', '370300');
INSERT INTO `sys_area` VALUES ('1379', '370322', '高青县', '370300');
INSERT INTO `sys_area` VALUES ('1380', '370323', '沂源县', '370300');
INSERT INTO `sys_area` VALUES ('1381', '370401', '市辖区', '370400');
INSERT INTO `sys_area` VALUES ('1382', '370402', '市中区', '370400');
INSERT INTO `sys_area` VALUES ('1383', '370403', '薛城区', '370400');
INSERT INTO `sys_area` VALUES ('1384', '370404', '峄城区', '370400');
INSERT INTO `sys_area` VALUES ('1385', '370405', '台儿庄区', '370400');
INSERT INTO `sys_area` VALUES ('1386', '370406', '山亭区', '370400');
INSERT INTO `sys_area` VALUES ('1387', '370481', '滕州市', '370400');
INSERT INTO `sys_area` VALUES ('1388', '370501', '市辖区', '370500');
INSERT INTO `sys_area` VALUES ('1389', '370502', '东营区', '370500');
INSERT INTO `sys_area` VALUES ('1390', '370503', '河口区', '370500');
INSERT INTO `sys_area` VALUES ('1391', '370521', '垦利县', '370500');
INSERT INTO `sys_area` VALUES ('1392', '370522', '利津县', '370500');
INSERT INTO `sys_area` VALUES ('1393', '370523', '广饶县', '370500');
INSERT INTO `sys_area` VALUES ('1394', '370601', '市辖区', '370600');
INSERT INTO `sys_area` VALUES ('1395', '370602', '芝罘区', '370600');
INSERT INTO `sys_area` VALUES ('1396', '370611', '福山区', '370600');
INSERT INTO `sys_area` VALUES ('1397', '370612', '牟平区', '370600');
INSERT INTO `sys_area` VALUES ('1398', '370613', '莱山区', '370600');
INSERT INTO `sys_area` VALUES ('1399', '370634', '长岛县', '370600');
INSERT INTO `sys_area` VALUES ('1400', '370681', '龙口市', '370600');
INSERT INTO `sys_area` VALUES ('1401', '370682', '莱阳市', '370600');
INSERT INTO `sys_area` VALUES ('1402', '370683', '莱州市', '370600');
INSERT INTO `sys_area` VALUES ('1403', '370684', '蓬莱市', '370600');
INSERT INTO `sys_area` VALUES ('1404', '370685', '招远市', '370600');
INSERT INTO `sys_area` VALUES ('1405', '370686', '栖霞市', '370600');
INSERT INTO `sys_area` VALUES ('1406', '370687', '海阳市', '370600');
INSERT INTO `sys_area` VALUES ('1407', '370701', '市辖区', '370700');
INSERT INTO `sys_area` VALUES ('1408', '370702', '潍城区', '370700');
INSERT INTO `sys_area` VALUES ('1409', '370703', '寒亭区', '370700');
INSERT INTO `sys_area` VALUES ('1410', '370704', '坊子区', '370700');
INSERT INTO `sys_area` VALUES ('1411', '370705', '奎文区', '370700');
INSERT INTO `sys_area` VALUES ('1412', '370724', '临朐县', '370700');
INSERT INTO `sys_area` VALUES ('1413', '370725', '昌乐县', '370700');
INSERT INTO `sys_area` VALUES ('1414', '370781', '青州市', '370700');
INSERT INTO `sys_area` VALUES ('1415', '370782', '诸城市', '370700');
INSERT INTO `sys_area` VALUES ('1416', '370783', '寿光市', '370700');
INSERT INTO `sys_area` VALUES ('1417', '370784', '安丘市', '370700');
INSERT INTO `sys_area` VALUES ('1418', '370785', '高密市', '370700');
INSERT INTO `sys_area` VALUES ('1419', '370786', '昌邑市', '370700');
INSERT INTO `sys_area` VALUES ('1420', '370801', '市辖区', '370800');
INSERT INTO `sys_area` VALUES ('1421', '370802', '市中区', '370800');
INSERT INTO `sys_area` VALUES ('1422', '370811', '任城区', '370800');
INSERT INTO `sys_area` VALUES ('1423', '370826', '微山县', '370800');
INSERT INTO `sys_area` VALUES ('1424', '370827', '鱼台县', '370800');
INSERT INTO `sys_area` VALUES ('1425', '370828', '金乡县', '370800');
INSERT INTO `sys_area` VALUES ('1426', '370829', '嘉祥县', '370800');
INSERT INTO `sys_area` VALUES ('1427', '370830', '汶上县', '370800');
INSERT INTO `sys_area` VALUES ('1428', '370831', '泗水县', '370800');
INSERT INTO `sys_area` VALUES ('1429', '370832', '梁山县', '370800');
INSERT INTO `sys_area` VALUES ('1430', '370881', '曲阜市', '370800');
INSERT INTO `sys_area` VALUES ('1431', '370882', '兖州市', '370800');
INSERT INTO `sys_area` VALUES ('1432', '370883', '邹城市', '370800');
INSERT INTO `sys_area` VALUES ('1433', '370901', '市辖区', '370900');
INSERT INTO `sys_area` VALUES ('1434', '370902', '泰山区', '370900');
INSERT INTO `sys_area` VALUES ('1435', '370903', '岱岳区', '370900');
INSERT INTO `sys_area` VALUES ('1436', '370921', '宁阳县', '370900');
INSERT INTO `sys_area` VALUES ('1437', '370923', '东平县', '370900');
INSERT INTO `sys_area` VALUES ('1438', '370982', '新泰市', '370900');
INSERT INTO `sys_area` VALUES ('1439', '370983', '肥城市', '370900');
INSERT INTO `sys_area` VALUES ('1440', '371001', '市辖区', '371000');
INSERT INTO `sys_area` VALUES ('1441', '371002', '环翠区', '371000');
INSERT INTO `sys_area` VALUES ('1442', '371081', '文登市', '371000');
INSERT INTO `sys_area` VALUES ('1443', '371082', '荣成市', '371000');
INSERT INTO `sys_area` VALUES ('1444', '371083', '乳山市', '371000');
INSERT INTO `sys_area` VALUES ('1445', '371101', '市辖区', '371100');
INSERT INTO `sys_area` VALUES ('1446', '371102', '东港区', '371100');
INSERT INTO `sys_area` VALUES ('1447', '371103', '岚山区', '371100');
INSERT INTO `sys_area` VALUES ('1448', '371121', '五莲县', '371100');
INSERT INTO `sys_area` VALUES ('1449', '371122', '莒　县', '371100');
INSERT INTO `sys_area` VALUES ('1450', '371201', '市辖区', '371200');
INSERT INTO `sys_area` VALUES ('1451', '371202', '莱城区', '371200');
INSERT INTO `sys_area` VALUES ('1452', '371203', '钢城区', '371200');
INSERT INTO `sys_area` VALUES ('1453', '371301', '市辖区', '371300');
INSERT INTO `sys_area` VALUES ('1454', '371302', '兰山区', '371300');
INSERT INTO `sys_area` VALUES ('1455', '371311', '罗庄区', '371300');
INSERT INTO `sys_area` VALUES ('1456', '371312', '河东区', '371300');
INSERT INTO `sys_area` VALUES ('1457', '371321', '沂南县', '371300');
INSERT INTO `sys_area` VALUES ('1458', '371322', '郯城县', '371300');
INSERT INTO `sys_area` VALUES ('1459', '371323', '沂水县', '371300');
INSERT INTO `sys_area` VALUES ('1460', '371324', '苍山县', '371300');
INSERT INTO `sys_area` VALUES ('1461', '371325', '费　县', '371300');
INSERT INTO `sys_area` VALUES ('1462', '371326', '平邑县', '371300');
INSERT INTO `sys_area` VALUES ('1463', '371327', '莒南县', '371300');
INSERT INTO `sys_area` VALUES ('1464', '371328', '蒙阴县', '371300');
INSERT INTO `sys_area` VALUES ('1465', '371329', '临沭县', '371300');
INSERT INTO `sys_area` VALUES ('1466', '371401', '市辖区', '371400');
INSERT INTO `sys_area` VALUES ('1467', '371402', '德城区', '371400');
INSERT INTO `sys_area` VALUES ('1468', '371421', '陵　县', '371400');
INSERT INTO `sys_area` VALUES ('1469', '371422', '宁津县', '371400');
INSERT INTO `sys_area` VALUES ('1470', '371423', '庆云县', '371400');
INSERT INTO `sys_area` VALUES ('1471', '371424', '临邑县', '371400');
INSERT INTO `sys_area` VALUES ('1472', '371425', '齐河县', '371400');
INSERT INTO `sys_area` VALUES ('1473', '371426', '平原县', '371400');
INSERT INTO `sys_area` VALUES ('1474', '371427', '夏津县', '371400');
INSERT INTO `sys_area` VALUES ('1475', '371428', '武城县', '371400');
INSERT INTO `sys_area` VALUES ('1476', '371481', '乐陵市', '371400');
INSERT INTO `sys_area` VALUES ('1477', '371482', '禹城市', '371400');
INSERT INTO `sys_area` VALUES ('1478', '371501', '市辖区', '371500');
INSERT INTO `sys_area` VALUES ('1479', '371502', '东昌府区', '371500');
INSERT INTO `sys_area` VALUES ('1480', '371521', '阳谷县', '371500');
INSERT INTO `sys_area` VALUES ('1481', '371522', '莘　县', '371500');
INSERT INTO `sys_area` VALUES ('1482', '371523', '茌平县', '371500');
INSERT INTO `sys_area` VALUES ('1483', '371524', '东阿县', '371500');
INSERT INTO `sys_area` VALUES ('1484', '371525', '冠　县', '371500');
INSERT INTO `sys_area` VALUES ('1485', '371526', '高唐县', '371500');
INSERT INTO `sys_area` VALUES ('1486', '371581', '临清市', '371500');
INSERT INTO `sys_area` VALUES ('1487', '371601', '市辖区', '371600');
INSERT INTO `sys_area` VALUES ('1488', '371602', '滨城区', '371600');
INSERT INTO `sys_area` VALUES ('1489', '371621', '惠民县', '371600');
INSERT INTO `sys_area` VALUES ('1490', '371622', '阳信县', '371600');
INSERT INTO `sys_area` VALUES ('1491', '371623', '无棣县', '371600');
INSERT INTO `sys_area` VALUES ('1492', '371624', '沾化县', '371600');
INSERT INTO `sys_area` VALUES ('1493', '371625', '博兴县', '371600');
INSERT INTO `sys_area` VALUES ('1494', '371626', '邹平县', '371600');
INSERT INTO `sys_area` VALUES ('1495', '371701', '市辖区', '371700');
INSERT INTO `sys_area` VALUES ('1496', '371702', '牡丹区', '371700');
INSERT INTO `sys_area` VALUES ('1497', '371721', '曹　县', '371700');
INSERT INTO `sys_area` VALUES ('1498', '371722', '单　县', '371700');
INSERT INTO `sys_area` VALUES ('1499', '371723', '成武县', '371700');
INSERT INTO `sys_area` VALUES ('1500', '371724', '巨野县', '371700');
INSERT INTO `sys_area` VALUES ('1501', '371725', '郓城县', '371700');
INSERT INTO `sys_area` VALUES ('1502', '371726', '鄄城县', '371700');
INSERT INTO `sys_area` VALUES ('1503', '371727', '定陶县', '371700');
INSERT INTO `sys_area` VALUES ('1504', '371728', '东明县', '371700');
INSERT INTO `sys_area` VALUES ('1505', '410101', '市辖区', '410100');
INSERT INTO `sys_area` VALUES ('1506', '410102', '中原区', '410100');
INSERT INTO `sys_area` VALUES ('1507', '410103', '二七区', '410100');
INSERT INTO `sys_area` VALUES ('1508', '410104', '管城回族区', '410100');
INSERT INTO `sys_area` VALUES ('1509', '410105', '金水区', '410100');
INSERT INTO `sys_area` VALUES ('1510', '410106', '上街区', '410100');
INSERT INTO `sys_area` VALUES ('1511', '410108', '邙山区', '410100');
INSERT INTO `sys_area` VALUES ('1512', '410122', '中牟县', '410100');
INSERT INTO `sys_area` VALUES ('1513', '410181', '巩义市', '410100');
INSERT INTO `sys_area` VALUES ('1514', '410182', '荥阳市', '410100');
INSERT INTO `sys_area` VALUES ('1515', '410183', '新密市', '410100');
INSERT INTO `sys_area` VALUES ('1516', '410184', '新郑市', '410100');
INSERT INTO `sys_area` VALUES ('1517', '410185', '登封市', '410100');
INSERT INTO `sys_area` VALUES ('1518', '410201', '市辖区', '410200');
INSERT INTO `sys_area` VALUES ('1519', '410202', '龙亭区', '410200');
INSERT INTO `sys_area` VALUES ('1520', '410203', '顺河回族区', '410200');
INSERT INTO `sys_area` VALUES ('1521', '410204', '鼓楼区', '410200');
INSERT INTO `sys_area` VALUES ('1522', '410205', '南关区', '410200');
INSERT INTO `sys_area` VALUES ('1523', '410211', '郊　区', '410200');
INSERT INTO `sys_area` VALUES ('1524', '410221', '杞　县', '410200');
INSERT INTO `sys_area` VALUES ('1525', '410222', '通许县', '410200');
INSERT INTO `sys_area` VALUES ('1526', '410223', '尉氏县', '410200');
INSERT INTO `sys_area` VALUES ('1527', '410224', '开封县', '410200');
INSERT INTO `sys_area` VALUES ('1528', '410225', '兰考县', '410200');
INSERT INTO `sys_area` VALUES ('1529', '410301', '市辖区', '410300');
INSERT INTO `sys_area` VALUES ('1530', '410302', '老城区', '410300');
INSERT INTO `sys_area` VALUES ('1531', '410303', '西工区', '410300');
INSERT INTO `sys_area` VALUES ('1532', '410304', '廛河回族区', '410300');
INSERT INTO `sys_area` VALUES ('1533', '410305', '涧西区', '410300');
INSERT INTO `sys_area` VALUES ('1534', '410306', '吉利区', '410300');
INSERT INTO `sys_area` VALUES ('1535', '410307', '洛龙区', '410300');
INSERT INTO `sys_area` VALUES ('1536', '410322', '孟津县', '410300');
INSERT INTO `sys_area` VALUES ('1537', '410323', '新安县', '410300');
INSERT INTO `sys_area` VALUES ('1538', '410324', '栾川县', '410300');
INSERT INTO `sys_area` VALUES ('1539', '410325', '嵩　县', '410300');
INSERT INTO `sys_area` VALUES ('1540', '410326', '汝阳县', '410300');
INSERT INTO `sys_area` VALUES ('1541', '410327', '宜阳县', '410300');
INSERT INTO `sys_area` VALUES ('1542', '410328', '洛宁县', '410300');
INSERT INTO `sys_area` VALUES ('1543', '410329', '伊川县', '410300');
INSERT INTO `sys_area` VALUES ('1544', '410381', '偃师市', '410300');
INSERT INTO `sys_area` VALUES ('1545', '410401', '市辖区', '410400');
INSERT INTO `sys_area` VALUES ('1546', '410402', '新华区', '410400');
INSERT INTO `sys_area` VALUES ('1547', '410403', '卫东区', '410400');
INSERT INTO `sys_area` VALUES ('1548', '410404', '石龙区', '410400');
INSERT INTO `sys_area` VALUES ('1549', '410411', '湛河区', '410400');
INSERT INTO `sys_area` VALUES ('1550', '410421', '宝丰县', '410400');
INSERT INTO `sys_area` VALUES ('1551', '410422', '叶　县', '410400');
INSERT INTO `sys_area` VALUES ('1552', '410423', '鲁山县', '410400');
INSERT INTO `sys_area` VALUES ('1553', '410425', '郏　县', '410400');
INSERT INTO `sys_area` VALUES ('1554', '410481', '舞钢市', '410400');
INSERT INTO `sys_area` VALUES ('1555', '410482', '汝州市', '410400');
INSERT INTO `sys_area` VALUES ('1556', '410501', '市辖区', '410500');
INSERT INTO `sys_area` VALUES ('1557', '410502', '文峰区', '410500');
INSERT INTO `sys_area` VALUES ('1558', '410503', '北关区', '410500');
INSERT INTO `sys_area` VALUES ('1559', '410505', '殷都区', '410500');
INSERT INTO `sys_area` VALUES ('1560', '410506', '龙安区', '410500');
INSERT INTO `sys_area` VALUES ('1561', '410522', '安阳县', '410500');
INSERT INTO `sys_area` VALUES ('1562', '410523', '汤阴县', '410500');
INSERT INTO `sys_area` VALUES ('1563', '410526', '滑　县', '410500');
INSERT INTO `sys_area` VALUES ('1564', '410527', '内黄县', '410500');
INSERT INTO `sys_area` VALUES ('1565', '410581', '林州市', '410500');
INSERT INTO `sys_area` VALUES ('1566', '410601', '市辖区', '410600');
INSERT INTO `sys_area` VALUES ('1567', '410602', '鹤山区', '410600');
INSERT INTO `sys_area` VALUES ('1568', '410603', '山城区', '410600');
INSERT INTO `sys_area` VALUES ('1569', '410611', '淇滨区', '410600');
INSERT INTO `sys_area` VALUES ('1570', '410621', '浚　县', '410600');
INSERT INTO `sys_area` VALUES ('1571', '410622', '淇　县', '410600');
INSERT INTO `sys_area` VALUES ('1572', '410701', '市辖区', '410700');
INSERT INTO `sys_area` VALUES ('1573', '410702', '红旗区', '410700');
INSERT INTO `sys_area` VALUES ('1574', '410703', '卫滨区', '410700');
INSERT INTO `sys_area` VALUES ('1575', '410704', '凤泉区', '410700');
INSERT INTO `sys_area` VALUES ('1576', '410711', '牧野区', '410700');
INSERT INTO `sys_area` VALUES ('1577', '410721', '新乡县', '410700');
INSERT INTO `sys_area` VALUES ('1578', '410724', '获嘉县', '410700');
INSERT INTO `sys_area` VALUES ('1579', '410725', '原阳县', '410700');
INSERT INTO `sys_area` VALUES ('1580', '410726', '延津县', '410700');
INSERT INTO `sys_area` VALUES ('1581', '410727', '封丘县', '410700');
INSERT INTO `sys_area` VALUES ('1582', '410728', '长垣县', '410700');
INSERT INTO `sys_area` VALUES ('1583', '410781', '卫辉市', '410700');
INSERT INTO `sys_area` VALUES ('1584', '410782', '辉县市', '410700');
INSERT INTO `sys_area` VALUES ('1585', '410801', '市辖区', '410800');
INSERT INTO `sys_area` VALUES ('1586', '410802', '解放区', '410800');
INSERT INTO `sys_area` VALUES ('1587', '410803', '中站区', '410800');
INSERT INTO `sys_area` VALUES ('1588', '410804', '马村区', '410800');
INSERT INTO `sys_area` VALUES ('1589', '410811', '山阳区', '410800');
INSERT INTO `sys_area` VALUES ('1590', '410821', '修武县', '410800');
INSERT INTO `sys_area` VALUES ('1591', '410822', '博爱县', '410800');
INSERT INTO `sys_area` VALUES ('1592', '410823', '武陟县', '410800');
INSERT INTO `sys_area` VALUES ('1593', '410825', '温　县', '410800');
INSERT INTO `sys_area` VALUES ('1594', '410881', '济源市', '410800');
INSERT INTO `sys_area` VALUES ('1595', '410882', '沁阳市', '410800');
INSERT INTO `sys_area` VALUES ('1596', '410883', '孟州市', '410800');
INSERT INTO `sys_area` VALUES ('1597', '410901', '市辖区', '410900');
INSERT INTO `sys_area` VALUES ('1598', '410902', '华龙区', '410900');
INSERT INTO `sys_area` VALUES ('1599', '410922', '清丰县', '410900');
INSERT INTO `sys_area` VALUES ('1600', '410923', '南乐县', '410900');
INSERT INTO `sys_area` VALUES ('1601', '410926', '范　县', '410900');
INSERT INTO `sys_area` VALUES ('1602', '410927', '台前县', '410900');
INSERT INTO `sys_area` VALUES ('1603', '410928', '濮阳县', '410900');
INSERT INTO `sys_area` VALUES ('1604', '411001', '市辖区', '411000');
INSERT INTO `sys_area` VALUES ('1605', '411002', '魏都区', '411000');
INSERT INTO `sys_area` VALUES ('1606', '411023', '许昌县', '411000');
INSERT INTO `sys_area` VALUES ('1607', '411024', '鄢陵县', '411000');
INSERT INTO `sys_area` VALUES ('1608', '411025', '襄城县', '411000');
INSERT INTO `sys_area` VALUES ('1609', '411081', '禹州市', '411000');
INSERT INTO `sys_area` VALUES ('1610', '411082', '长葛市', '411000');
INSERT INTO `sys_area` VALUES ('1611', '411101', '市辖区', '411100');
INSERT INTO `sys_area` VALUES ('1612', '411102', '源汇区', '411100');
INSERT INTO `sys_area` VALUES ('1613', '411103', '郾城区', '411100');
INSERT INTO `sys_area` VALUES ('1614', '411104', '召陵区', '411100');
INSERT INTO `sys_area` VALUES ('1615', '411121', '舞阳县', '411100');
INSERT INTO `sys_area` VALUES ('1616', '411122', '临颍县', '411100');
INSERT INTO `sys_area` VALUES ('1617', '411201', '市辖区', '411200');
INSERT INTO `sys_area` VALUES ('1618', '411202', '湖滨区', '411200');
INSERT INTO `sys_area` VALUES ('1619', '411221', '渑池县', '411200');
INSERT INTO `sys_area` VALUES ('1620', '411222', '陕　县', '411200');
INSERT INTO `sys_area` VALUES ('1621', '411224', '卢氏县', '411200');
INSERT INTO `sys_area` VALUES ('1622', '411281', '义马市', '411200');
INSERT INTO `sys_area` VALUES ('1623', '411282', '灵宝市', '411200');
INSERT INTO `sys_area` VALUES ('1624', '411301', '市辖区', '411300');
INSERT INTO `sys_area` VALUES ('1625', '411302', '宛城区', '411300');
INSERT INTO `sys_area` VALUES ('1626', '411303', '卧龙区', '411300');
INSERT INTO `sys_area` VALUES ('1627', '411321', '南召县', '411300');
INSERT INTO `sys_area` VALUES ('1628', '411322', '方城县', '411300');
INSERT INTO `sys_area` VALUES ('1629', '411323', '西峡县', '411300');
INSERT INTO `sys_area` VALUES ('1630', '411324', '镇平县', '411300');
INSERT INTO `sys_area` VALUES ('1631', '411325', '内乡县', '411300');
INSERT INTO `sys_area` VALUES ('1632', '411326', '淅川县', '411300');
INSERT INTO `sys_area` VALUES ('1633', '411327', '社旗县', '411300');
INSERT INTO `sys_area` VALUES ('1634', '411328', '唐河县', '411300');
INSERT INTO `sys_area` VALUES ('1635', '411329', '新野县', '411300');
INSERT INTO `sys_area` VALUES ('1636', '411330', '桐柏县', '411300');
INSERT INTO `sys_area` VALUES ('1637', '411381', '邓州市', '411300');
INSERT INTO `sys_area` VALUES ('1638', '411401', '市辖区', '411400');
INSERT INTO `sys_area` VALUES ('1639', '411402', '梁园区', '411400');
INSERT INTO `sys_area` VALUES ('1640', '411403', '睢阳区', '411400');
INSERT INTO `sys_area` VALUES ('1641', '411421', '民权县', '411400');
INSERT INTO `sys_area` VALUES ('1642', '411422', '睢　县', '411400');
INSERT INTO `sys_area` VALUES ('1643', '411423', '宁陵县', '411400');
INSERT INTO `sys_area` VALUES ('1644', '411424', '柘城县', '411400');
INSERT INTO `sys_area` VALUES ('1645', '411425', '虞城县', '411400');
INSERT INTO `sys_area` VALUES ('1646', '411426', '夏邑县', '411400');
INSERT INTO `sys_area` VALUES ('1647', '411481', '永城市', '411400');
INSERT INTO `sys_area` VALUES ('1648', '411501', '市辖区', '411500');
INSERT INTO `sys_area` VALUES ('1649', '411502', '师河区', '411500');
INSERT INTO `sys_area` VALUES ('1650', '411503', '平桥区', '411500');
INSERT INTO `sys_area` VALUES ('1651', '411521', '罗山县', '411500');
INSERT INTO `sys_area` VALUES ('1652', '411522', '光山县', '411500');
INSERT INTO `sys_area` VALUES ('1653', '411523', '新　县', '411500');
INSERT INTO `sys_area` VALUES ('1654', '411524', '商城县', '411500');
INSERT INTO `sys_area` VALUES ('1655', '411525', '固始县', '411500');
INSERT INTO `sys_area` VALUES ('1656', '411526', '潢川县', '411500');
INSERT INTO `sys_area` VALUES ('1657', '411527', '淮滨县', '411500');
INSERT INTO `sys_area` VALUES ('1658', '411528', '息　县', '411500');
INSERT INTO `sys_area` VALUES ('1659', '411601', '市辖区', '411600');
INSERT INTO `sys_area` VALUES ('1660', '411602', '川汇区', '411600');
INSERT INTO `sys_area` VALUES ('1661', '411621', '扶沟县', '411600');
INSERT INTO `sys_area` VALUES ('1662', '411622', '西华县', '411600');
INSERT INTO `sys_area` VALUES ('1663', '411623', '商水县', '411600');
INSERT INTO `sys_area` VALUES ('1664', '411624', '沈丘县', '411600');
INSERT INTO `sys_area` VALUES ('1665', '411625', '郸城县', '411600');
INSERT INTO `sys_area` VALUES ('1666', '411626', '淮阳县', '411600');
INSERT INTO `sys_area` VALUES ('1667', '411627', '太康县', '411600');
INSERT INTO `sys_area` VALUES ('1668', '411628', '鹿邑县', '411600');
INSERT INTO `sys_area` VALUES ('1669', '411681', '项城市', '411600');
INSERT INTO `sys_area` VALUES ('1670', '411701', '市辖区', '411700');
INSERT INTO `sys_area` VALUES ('1671', '411702', '驿城区', '411700');
INSERT INTO `sys_area` VALUES ('1672', '411721', '西平县', '411700');
INSERT INTO `sys_area` VALUES ('1673', '411722', '上蔡县', '411700');
INSERT INTO `sys_area` VALUES ('1674', '411723', '平舆县', '411700');
INSERT INTO `sys_area` VALUES ('1675', '411724', '正阳县', '411700');
INSERT INTO `sys_area` VALUES ('1676', '411725', '确山县', '411700');
INSERT INTO `sys_area` VALUES ('1677', '411726', '泌阳县', '411700');
INSERT INTO `sys_area` VALUES ('1678', '411727', '汝南县', '411700');
INSERT INTO `sys_area` VALUES ('1679', '411728', '遂平县', '411700');
INSERT INTO `sys_area` VALUES ('1680', '411729', '新蔡县', '411700');
INSERT INTO `sys_area` VALUES ('1681', '420101', '市辖区', '420100');
INSERT INTO `sys_area` VALUES ('1682', '420102', '江岸区', '420100');
INSERT INTO `sys_area` VALUES ('1683', '420103', '江汉区', '420100');
INSERT INTO `sys_area` VALUES ('1684', '420104', '乔口区', '420100');
INSERT INTO `sys_area` VALUES ('1685', '420105', '汉阳区', '420100');
INSERT INTO `sys_area` VALUES ('1686', '420106', '武昌区', '420100');
INSERT INTO `sys_area` VALUES ('1687', '420107', '青山区', '420100');
INSERT INTO `sys_area` VALUES ('1688', '420111', '洪山区', '420100');
INSERT INTO `sys_area` VALUES ('1689', '420112', '东西湖区', '420100');
INSERT INTO `sys_area` VALUES ('1690', '420113', '汉南区', '420100');
INSERT INTO `sys_area` VALUES ('1691', '420114', '蔡甸区', '420100');
INSERT INTO `sys_area` VALUES ('1692', '420115', '江夏区', '420100');
INSERT INTO `sys_area` VALUES ('1693', '420116', '黄陂区', '420100');
INSERT INTO `sys_area` VALUES ('1694', '420117', '新洲区', '420100');
INSERT INTO `sys_area` VALUES ('1695', '420201', '市辖区', '420200');
INSERT INTO `sys_area` VALUES ('1696', '420202', '黄石港区', '420200');
INSERT INTO `sys_area` VALUES ('1697', '420203', '西塞山区', '420200');
INSERT INTO `sys_area` VALUES ('1698', '420204', '下陆区', '420200');
INSERT INTO `sys_area` VALUES ('1699', '420205', '铁山区', '420200');
INSERT INTO `sys_area` VALUES ('1700', '420222', '阳新县', '420200');
INSERT INTO `sys_area` VALUES ('1701', '420281', '大冶市', '420200');
INSERT INTO `sys_area` VALUES ('1702', '420301', '市辖区', '420300');
INSERT INTO `sys_area` VALUES ('1703', '420302', '茅箭区', '420300');
INSERT INTO `sys_area` VALUES ('1704', '420303', '张湾区', '420300');
INSERT INTO `sys_area` VALUES ('1705', '420321', '郧　县', '420300');
INSERT INTO `sys_area` VALUES ('1706', '420322', '郧西县', '420300');
INSERT INTO `sys_area` VALUES ('1707', '420323', '竹山县', '420300');
INSERT INTO `sys_area` VALUES ('1708', '420324', '竹溪县', '420300');
INSERT INTO `sys_area` VALUES ('1709', '420325', '房　县', '420300');
INSERT INTO `sys_area` VALUES ('1710', '420381', '丹江口市', '420300');
INSERT INTO `sys_area` VALUES ('1711', '420501', '市辖区', '420500');
INSERT INTO `sys_area` VALUES ('1712', '420502', '西陵区', '420500');
INSERT INTO `sys_area` VALUES ('1713', '420503', '伍家岗区', '420500');
INSERT INTO `sys_area` VALUES ('1714', '420504', '点军区', '420500');
INSERT INTO `sys_area` VALUES ('1715', '420505', '猇亭区', '420500');
INSERT INTO `sys_area` VALUES ('1716', '420506', '夷陵区', '420500');
INSERT INTO `sys_area` VALUES ('1717', '420525', '远安县', '420500');
INSERT INTO `sys_area` VALUES ('1718', '420526', '兴山县', '420500');
INSERT INTO `sys_area` VALUES ('1719', '420527', '秭归县', '420500');
INSERT INTO `sys_area` VALUES ('1720', '420528', '长阳土家族自治县', '420500');
INSERT INTO `sys_area` VALUES ('1721', '420529', '五峰土家族自治县', '420500');
INSERT INTO `sys_area` VALUES ('1722', '420581', '宜都市', '420500');
INSERT INTO `sys_area` VALUES ('1723', '420582', '当阳市', '420500');
INSERT INTO `sys_area` VALUES ('1724', '420583', '枝江市', '420500');
INSERT INTO `sys_area` VALUES ('1725', '420601', '市辖区', '420600');
INSERT INTO `sys_area` VALUES ('1726', '420602', '襄城区', '420600');
INSERT INTO `sys_area` VALUES ('1727', '420606', '樊城区', '420600');
INSERT INTO `sys_area` VALUES ('1728', '420607', '襄阳区', '420600');
INSERT INTO `sys_area` VALUES ('1729', '420624', '南漳县', '420600');
INSERT INTO `sys_area` VALUES ('1730', '420625', '谷城县', '420600');
INSERT INTO `sys_area` VALUES ('1731', '420626', '保康县', '420600');
INSERT INTO `sys_area` VALUES ('1732', '420682', '老河口市', '420600');
INSERT INTO `sys_area` VALUES ('1733', '420683', '枣阳市', '420600');
INSERT INTO `sys_area` VALUES ('1734', '420684', '宜城市', '420600');
INSERT INTO `sys_area` VALUES ('1735', '420701', '市辖区', '420700');
INSERT INTO `sys_area` VALUES ('1736', '420702', '梁子湖区', '420700');
INSERT INTO `sys_area` VALUES ('1737', '420703', '华容区', '420700');
INSERT INTO `sys_area` VALUES ('1738', '420704', '鄂城区', '420700');
INSERT INTO `sys_area` VALUES ('1739', '420801', '市辖区', '420800');
INSERT INTO `sys_area` VALUES ('1740', '420802', '东宝区', '420800');
INSERT INTO `sys_area` VALUES ('1741', '420804', '掇刀区', '420800');
INSERT INTO `sys_area` VALUES ('1742', '420821', '京山县', '420800');
INSERT INTO `sys_area` VALUES ('1743', '420822', '沙洋县', '420800');
INSERT INTO `sys_area` VALUES ('1744', '420881', '钟祥市', '420800');
INSERT INTO `sys_area` VALUES ('1745', '420901', '市辖区', '420900');
INSERT INTO `sys_area` VALUES ('1746', '420902', '孝南区', '420900');
INSERT INTO `sys_area` VALUES ('1747', '420921', '孝昌县', '420900');
INSERT INTO `sys_area` VALUES ('1748', '420922', '大悟县', '420900');
INSERT INTO `sys_area` VALUES ('1749', '420923', '云梦县', '420900');
INSERT INTO `sys_area` VALUES ('1750', '420981', '应城市', '420900');
INSERT INTO `sys_area` VALUES ('1751', '420982', '安陆市', '420900');
INSERT INTO `sys_area` VALUES ('1752', '420984', '汉川市', '420900');
INSERT INTO `sys_area` VALUES ('1753', '421001', '市辖区', '421000');
INSERT INTO `sys_area` VALUES ('1754', '421002', '沙市区', '421000');
INSERT INTO `sys_area` VALUES ('1755', '421003', '荆州区', '421000');
INSERT INTO `sys_area` VALUES ('1756', '421022', '公安县', '421000');
INSERT INTO `sys_area` VALUES ('1757', '421023', '监利县', '421000');
INSERT INTO `sys_area` VALUES ('1758', '421024', '江陵县', '421000');
INSERT INTO `sys_area` VALUES ('1759', '421081', '石首市', '421000');
INSERT INTO `sys_area` VALUES ('1760', '421083', '洪湖市', '421000');
INSERT INTO `sys_area` VALUES ('1761', '421087', '松滋市', '421000');
INSERT INTO `sys_area` VALUES ('1762', '421101', '市辖区', '421100');
INSERT INTO `sys_area` VALUES ('1763', '421102', '黄州区', '421100');
INSERT INTO `sys_area` VALUES ('1764', '421121', '团风县', '421100');
INSERT INTO `sys_area` VALUES ('1765', '421122', '红安县', '421100');
INSERT INTO `sys_area` VALUES ('1766', '421123', '罗田县', '421100');
INSERT INTO `sys_area` VALUES ('1767', '421124', '英山县', '421100');
INSERT INTO `sys_area` VALUES ('1768', '421125', '浠水县', '421100');
INSERT INTO `sys_area` VALUES ('1769', '421126', '蕲春县', '421100');
INSERT INTO `sys_area` VALUES ('1770', '421127', '黄梅县', '421100');
INSERT INTO `sys_area` VALUES ('1771', '421181', '麻城市', '421100');
INSERT INTO `sys_area` VALUES ('1772', '421182', '武穴市', '421100');
INSERT INTO `sys_area` VALUES ('1773', '421201', '市辖区', '421200');
INSERT INTO `sys_area` VALUES ('1774', '421202', '咸安区', '421200');
INSERT INTO `sys_area` VALUES ('1775', '421221', '嘉鱼县', '421200');
INSERT INTO `sys_area` VALUES ('1776', '421222', '通城县', '421200');
INSERT INTO `sys_area` VALUES ('1777', '421223', '崇阳县', '421200');
INSERT INTO `sys_area` VALUES ('1778', '421224', '通山县', '421200');
INSERT INTO `sys_area` VALUES ('1779', '421281', '赤壁市', '421200');
INSERT INTO `sys_area` VALUES ('1780', '421301', '市辖区', '421300');
INSERT INTO `sys_area` VALUES ('1781', '421302', '曾都区', '421300');
INSERT INTO `sys_area` VALUES ('1782', '421381', '广水市', '421300');
INSERT INTO `sys_area` VALUES ('1783', '422801', '恩施市', '422800');
INSERT INTO `sys_area` VALUES ('1784', '422802', '利川市', '422800');
INSERT INTO `sys_area` VALUES ('1785', '422822', '建始县', '422800');
INSERT INTO `sys_area` VALUES ('1786', '422823', '巴东县', '422800');
INSERT INTO `sys_area` VALUES ('1787', '422825', '宣恩县', '422800');
INSERT INTO `sys_area` VALUES ('1788', '422826', '咸丰县', '422800');
INSERT INTO `sys_area` VALUES ('1789', '422827', '来凤县', '422800');
INSERT INTO `sys_area` VALUES ('1790', '422828', '鹤峰县', '422800');
INSERT INTO `sys_area` VALUES ('1791', '429004', '仙桃市', '429000');
INSERT INTO `sys_area` VALUES ('1792', '429005', '潜江市', '429000');
INSERT INTO `sys_area` VALUES ('1793', '429006', '天门市', '429000');
INSERT INTO `sys_area` VALUES ('1794', '429021', '神农架林区', '429000');
INSERT INTO `sys_area` VALUES ('1795', '430101', '市辖区', '430100');
INSERT INTO `sys_area` VALUES ('1796', '430102', '芙蓉区', '430100');
INSERT INTO `sys_area` VALUES ('1797', '430103', '天心区', '430100');
INSERT INTO `sys_area` VALUES ('1798', '430104', '岳麓区', '430100');
INSERT INTO `sys_area` VALUES ('1799', '430105', '开福区', '430100');
INSERT INTO `sys_area` VALUES ('1800', '430111', '雨花区', '430100');
INSERT INTO `sys_area` VALUES ('1801', '430121', '长沙县', '430100');
INSERT INTO `sys_area` VALUES ('1802', '430122', '望城县', '430100');
INSERT INTO `sys_area` VALUES ('1803', '430124', '宁乡县', '430100');
INSERT INTO `sys_area` VALUES ('1804', '430181', '浏阳市', '430100');
INSERT INTO `sys_area` VALUES ('1805', '430201', '市辖区', '430200');
INSERT INTO `sys_area` VALUES ('1806', '430202', '荷塘区', '430200');
INSERT INTO `sys_area` VALUES ('1807', '430203', '芦淞区', '430200');
INSERT INTO `sys_area` VALUES ('1808', '430204', '石峰区', '430200');
INSERT INTO `sys_area` VALUES ('1809', '430211', '天元区', '430200');
INSERT INTO `sys_area` VALUES ('1810', '430221', '株洲县', '430200');
INSERT INTO `sys_area` VALUES ('1811', '430223', '攸　县', '430200');
INSERT INTO `sys_area` VALUES ('1812', '430224', '茶陵县', '430200');
INSERT INTO `sys_area` VALUES ('1813', '430225', '炎陵县', '430200');
INSERT INTO `sys_area` VALUES ('1814', '430281', '醴陵市', '430200');
INSERT INTO `sys_area` VALUES ('1815', '430301', '市辖区', '430300');
INSERT INTO `sys_area` VALUES ('1816', '430302', '雨湖区', '430300');
INSERT INTO `sys_area` VALUES ('1817', '430304', '岳塘区', '430300');
INSERT INTO `sys_area` VALUES ('1818', '430321', '湘潭县', '430300');
INSERT INTO `sys_area` VALUES ('1819', '430381', '湘乡市', '430300');
INSERT INTO `sys_area` VALUES ('1820', '430382', '韶山市', '430300');
INSERT INTO `sys_area` VALUES ('1821', '430401', '市辖区', '430400');
INSERT INTO `sys_area` VALUES ('1822', '430405', '珠晖区', '430400');
INSERT INTO `sys_area` VALUES ('1823', '430406', '雁峰区', '430400');
INSERT INTO `sys_area` VALUES ('1824', '430407', '石鼓区', '430400');
INSERT INTO `sys_area` VALUES ('1825', '430408', '蒸湘区', '430400');
INSERT INTO `sys_area` VALUES ('1826', '430412', '南岳区', '430400');
INSERT INTO `sys_area` VALUES ('1827', '430421', '衡阳县', '430400');
INSERT INTO `sys_area` VALUES ('1828', '430422', '衡南县', '430400');
INSERT INTO `sys_area` VALUES ('1829', '430423', '衡山县', '430400');
INSERT INTO `sys_area` VALUES ('1830', '430424', '衡东县', '430400');
INSERT INTO `sys_area` VALUES ('1831', '430426', '祁东县', '430400');
INSERT INTO `sys_area` VALUES ('1832', '430481', '耒阳市', '430400');
INSERT INTO `sys_area` VALUES ('1833', '430482', '常宁市', '430400');
INSERT INTO `sys_area` VALUES ('1834', '430501', '市辖区', '430500');
INSERT INTO `sys_area` VALUES ('1835', '430502', '双清区', '430500');
INSERT INTO `sys_area` VALUES ('1836', '430503', '大祥区', '430500');
INSERT INTO `sys_area` VALUES ('1837', '430511', '北塔区', '430500');
INSERT INTO `sys_area` VALUES ('1838', '430521', '邵东县', '430500');
INSERT INTO `sys_area` VALUES ('1839', '430522', '新邵县', '430500');
INSERT INTO `sys_area` VALUES ('1840', '430523', '邵阳县', '430500');
INSERT INTO `sys_area` VALUES ('1841', '430524', '隆回县', '430500');
INSERT INTO `sys_area` VALUES ('1842', '430525', '洞口县', '430500');
INSERT INTO `sys_area` VALUES ('1843', '430527', '绥宁县', '430500');
INSERT INTO `sys_area` VALUES ('1844', '430528', '新宁县', '430500');
INSERT INTO `sys_area` VALUES ('1845', '430529', '城步苗族自治县', '430500');
INSERT INTO `sys_area` VALUES ('1846', '430581', '武冈市', '430500');
INSERT INTO `sys_area` VALUES ('1847', '430601', '市辖区', '430600');
INSERT INTO `sys_area` VALUES ('1848', '430602', '岳阳楼区', '430600');
INSERT INTO `sys_area` VALUES ('1849', '430603', '云溪区', '430600');
INSERT INTO `sys_area` VALUES ('1850', '430611', '君山区', '430600');
INSERT INTO `sys_area` VALUES ('1851', '430621', '岳阳县', '430600');
INSERT INTO `sys_area` VALUES ('1852', '430623', '华容县', '430600');
INSERT INTO `sys_area` VALUES ('1853', '430624', '湘阴县', '430600');
INSERT INTO `sys_area` VALUES ('1854', '430626', '平江县', '430600');
INSERT INTO `sys_area` VALUES ('1855', '430681', '汨罗市', '430600');
INSERT INTO `sys_area` VALUES ('1856', '430682', '临湘市', '430600');
INSERT INTO `sys_area` VALUES ('1857', '430701', '市辖区', '430700');
INSERT INTO `sys_area` VALUES ('1858', '430702', '武陵区', '430700');
INSERT INTO `sys_area` VALUES ('1859', '430703', '鼎城区', '430700');
INSERT INTO `sys_area` VALUES ('1860', '430721', '安乡县', '430700');
INSERT INTO `sys_area` VALUES ('1861', '430722', '汉寿县', '430700');
INSERT INTO `sys_area` VALUES ('1862', '430723', '澧　县', '430700');
INSERT INTO `sys_area` VALUES ('1863', '430724', '临澧县', '430700');
INSERT INTO `sys_area` VALUES ('1864', '430725', '桃源县', '430700');
INSERT INTO `sys_area` VALUES ('1865', '430726', '石门县', '430700');
INSERT INTO `sys_area` VALUES ('1866', '430781', '津市市', '430700');
INSERT INTO `sys_area` VALUES ('1867', '430801', '市辖区', '430800');
INSERT INTO `sys_area` VALUES ('1868', '430802', '永定区', '430800');
INSERT INTO `sys_area` VALUES ('1869', '430811', '武陵源区', '430800');
INSERT INTO `sys_area` VALUES ('1870', '430821', '慈利县', '430800');
INSERT INTO `sys_area` VALUES ('1871', '430822', '桑植县', '430800');
INSERT INTO `sys_area` VALUES ('1872', '430901', '市辖区', '430900');
INSERT INTO `sys_area` VALUES ('1873', '430902', '资阳区', '430900');
INSERT INTO `sys_area` VALUES ('1874', '430903', '赫山区', '430900');
INSERT INTO `sys_area` VALUES ('1875', '430921', '南　县', '430900');
INSERT INTO `sys_area` VALUES ('1876', '430922', '桃江县', '430900');
INSERT INTO `sys_area` VALUES ('1877', '430923', '安化县', '430900');
INSERT INTO `sys_area` VALUES ('1878', '430981', '沅江市', '430900');
INSERT INTO `sys_area` VALUES ('1879', '431001', '市辖区', '431000');
INSERT INTO `sys_area` VALUES ('1880', '431002', '北湖区', '431000');
INSERT INTO `sys_area` VALUES ('1881', '431003', '苏仙区', '431000');
INSERT INTO `sys_area` VALUES ('1882', '431021', '桂阳县', '431000');
INSERT INTO `sys_area` VALUES ('1883', '431022', '宜章县', '431000');
INSERT INTO `sys_area` VALUES ('1884', '431023', '永兴县', '431000');
INSERT INTO `sys_area` VALUES ('1885', '431024', '嘉禾县', '431000');
INSERT INTO `sys_area` VALUES ('1886', '431025', '临武县', '431000');
INSERT INTO `sys_area` VALUES ('1887', '431026', '汝城县', '431000');
INSERT INTO `sys_area` VALUES ('1888', '431027', '桂东县', '431000');
INSERT INTO `sys_area` VALUES ('1889', '431028', '安仁县', '431000');
INSERT INTO `sys_area` VALUES ('1890', '431081', '资兴市', '431000');
INSERT INTO `sys_area` VALUES ('1891', '431101', '市辖区', '431100');
INSERT INTO `sys_area` VALUES ('1892', '431102', '芝山区', '431100');
INSERT INTO `sys_area` VALUES ('1893', '431103', '冷水滩区', '431100');
INSERT INTO `sys_area` VALUES ('1894', '431121', '祁阳县', '431100');
INSERT INTO `sys_area` VALUES ('1895', '431122', '东安县', '431100');
INSERT INTO `sys_area` VALUES ('1896', '431123', '双牌县', '431100');
INSERT INTO `sys_area` VALUES ('1897', '431124', '道　县', '431100');
INSERT INTO `sys_area` VALUES ('1898', '431125', '江永县', '431100');
INSERT INTO `sys_area` VALUES ('1899', '431126', '宁远县', '431100');
INSERT INTO `sys_area` VALUES ('1900', '431127', '蓝山县', '431100');
INSERT INTO `sys_area` VALUES ('1901', '431128', '新田县', '431100');
INSERT INTO `sys_area` VALUES ('1902', '431129', '江华瑶族自治县', '431100');
INSERT INTO `sys_area` VALUES ('1903', '431201', '市辖区', '431200');
INSERT INTO `sys_area` VALUES ('1904', '431202', '鹤城区', '431200');
INSERT INTO `sys_area` VALUES ('1905', '431221', '中方县', '431200');
INSERT INTO `sys_area` VALUES ('1906', '431222', '沅陵县', '431200');
INSERT INTO `sys_area` VALUES ('1907', '431223', '辰溪县', '431200');
INSERT INTO `sys_area` VALUES ('1908', '431224', '溆浦县', '431200');
INSERT INTO `sys_area` VALUES ('1909', '431225', '会同县', '431200');
INSERT INTO `sys_area` VALUES ('1910', '431226', '麻阳苗族自治县', '431200');
INSERT INTO `sys_area` VALUES ('1911', '431227', '新晃侗族自治县', '431200');
INSERT INTO `sys_area` VALUES ('1912', '431228', '芷江侗族自治县', '431200');
INSERT INTO `sys_area` VALUES ('1913', '431229', '靖州苗族侗族自治县', '431200');
INSERT INTO `sys_area` VALUES ('1914', '431230', '通道侗族自治县', '431200');
INSERT INTO `sys_area` VALUES ('1915', '431281', '洪江市', '431200');
INSERT INTO `sys_area` VALUES ('1916', '431301', '市辖区', '431300');
INSERT INTO `sys_area` VALUES ('1917', '431302', '娄星区', '431300');
INSERT INTO `sys_area` VALUES ('1918', '431321', '双峰县', '431300');
INSERT INTO `sys_area` VALUES ('1919', '431322', '新化县', '431300');
INSERT INTO `sys_area` VALUES ('1920', '431381', '冷水江市', '431300');
INSERT INTO `sys_area` VALUES ('1921', '431382', '涟源市', '431300');
INSERT INTO `sys_area` VALUES ('1922', '433101', '吉首市', '433100');
INSERT INTO `sys_area` VALUES ('1923', '433122', '泸溪县', '433100');
INSERT INTO `sys_area` VALUES ('1924', '433123', '凤凰县', '433100');
INSERT INTO `sys_area` VALUES ('1925', '433124', '花垣县', '433100');
INSERT INTO `sys_area` VALUES ('1926', '433125', '保靖县', '433100');
INSERT INTO `sys_area` VALUES ('1927', '433126', '古丈县', '433100');
INSERT INTO `sys_area` VALUES ('1928', '433127', '永顺县', '433100');
INSERT INTO `sys_area` VALUES ('1929', '433130', '龙山县', '433100');
INSERT INTO `sys_area` VALUES ('1930', '440101', '市辖区', '440100');
INSERT INTO `sys_area` VALUES ('1931', '440102', '东山区', '440100');
INSERT INTO `sys_area` VALUES ('1932', '440103', '荔湾区', '440100');
INSERT INTO `sys_area` VALUES ('1933', '440104', '越秀区', '440100');
INSERT INTO `sys_area` VALUES ('1934', '440105', '海珠区', '440100');
INSERT INTO `sys_area` VALUES ('1935', '440106', '天河区', '440100');
INSERT INTO `sys_area` VALUES ('1936', '440107', '芳村区', '440100');
INSERT INTO `sys_area` VALUES ('1937', '440111', '白云区', '440100');
INSERT INTO `sys_area` VALUES ('1938', '440112', '黄埔区', '440100');
INSERT INTO `sys_area` VALUES ('1939', '440113', '番禺区', '440100');
INSERT INTO `sys_area` VALUES ('1940', '440114', '花都区', '440100');
INSERT INTO `sys_area` VALUES ('1941', '440183', '增城市', '440100');
INSERT INTO `sys_area` VALUES ('1942', '440184', '从化市', '440100');
INSERT INTO `sys_area` VALUES ('1943', '440201', '市辖区', '440200');
INSERT INTO `sys_area` VALUES ('1944', '440203', '武江区', '440200');
INSERT INTO `sys_area` VALUES ('1945', '440204', '浈江区', '440200');
INSERT INTO `sys_area` VALUES ('1946', '440205', '曲江区', '440200');
INSERT INTO `sys_area` VALUES ('1947', '440222', '始兴县', '440200');
INSERT INTO `sys_area` VALUES ('1948', '440224', '仁化县', '440200');
INSERT INTO `sys_area` VALUES ('1949', '440229', '翁源县', '440200');
INSERT INTO `sys_area` VALUES ('1950', '440232', '乳源瑶族自治县', '440200');
INSERT INTO `sys_area` VALUES ('1951', '440233', '新丰县', '440200');
INSERT INTO `sys_area` VALUES ('1952', '440281', '乐昌市', '440200');
INSERT INTO `sys_area` VALUES ('1953', '440282', '南雄市', '440200');
INSERT INTO `sys_area` VALUES ('1954', '440301', '市辖区', '440300');
INSERT INTO `sys_area` VALUES ('1955', '440303', '罗湖区', '440300');
INSERT INTO `sys_area` VALUES ('1956', '440304', '福田区', '440300');
INSERT INTO `sys_area` VALUES ('1957', '440305', '南山区', '440300');
INSERT INTO `sys_area` VALUES ('1958', '440306', '宝安区', '440300');
INSERT INTO `sys_area` VALUES ('1959', '440307', '龙岗区', '440300');
INSERT INTO `sys_area` VALUES ('1960', '440308', '盐田区', '440300');
INSERT INTO `sys_area` VALUES ('1961', '440401', '市辖区', '440400');
INSERT INTO `sys_area` VALUES ('1962', '440402', '香洲区', '440400');
INSERT INTO `sys_area` VALUES ('1963', '440403', '斗门区', '440400');
INSERT INTO `sys_area` VALUES ('1964', '440404', '金湾区', '440400');
INSERT INTO `sys_area` VALUES ('1965', '440501', '市辖区', '440500');
INSERT INTO `sys_area` VALUES ('1966', '440507', '龙湖区', '440500');
INSERT INTO `sys_area` VALUES ('1967', '440511', '金平区', '440500');
INSERT INTO `sys_area` VALUES ('1968', '440512', '濠江区', '440500');
INSERT INTO `sys_area` VALUES ('1969', '440513', '潮阳区', '440500');
INSERT INTO `sys_area` VALUES ('1970', '440514', '潮南区', '440500');
INSERT INTO `sys_area` VALUES ('1971', '440515', '澄海区', '440500');
INSERT INTO `sys_area` VALUES ('1972', '440523', '南澳县', '440500');
INSERT INTO `sys_area` VALUES ('1973', '440601', '市辖区', '440600');
INSERT INTO `sys_area` VALUES ('1974', '440604', '禅城区', '440600');
INSERT INTO `sys_area` VALUES ('1975', '440605', '南海区', '440600');
INSERT INTO `sys_area` VALUES ('1976', '440606', '顺德区', '440600');
INSERT INTO `sys_area` VALUES ('1977', '440607', '三水区', '440600');
INSERT INTO `sys_area` VALUES ('1978', '440608', '高明区', '440600');
INSERT INTO `sys_area` VALUES ('1979', '440701', '市辖区', '440700');
INSERT INTO `sys_area` VALUES ('1980', '440703', '蓬江区', '440700');
INSERT INTO `sys_area` VALUES ('1981', '440704', '江海区', '440700');
INSERT INTO `sys_area` VALUES ('1982', '440705', '新会区', '440700');
INSERT INTO `sys_area` VALUES ('1983', '440781', '台山市', '440700');
INSERT INTO `sys_area` VALUES ('1984', '440783', '开平市', '440700');
INSERT INTO `sys_area` VALUES ('1985', '440784', '鹤山市', '440700');
INSERT INTO `sys_area` VALUES ('1986', '440785', '恩平市', '440700');
INSERT INTO `sys_area` VALUES ('1987', '440801', '市辖区', '440800');
INSERT INTO `sys_area` VALUES ('1988', '440802', '赤坎区', '440800');
INSERT INTO `sys_area` VALUES ('1989', '440803', '霞山区', '440800');
INSERT INTO `sys_area` VALUES ('1990', '440804', '坡头区', '440800');
INSERT INTO `sys_area` VALUES ('1991', '440811', '麻章区', '440800');
INSERT INTO `sys_area` VALUES ('1992', '440823', '遂溪县', '440800');
INSERT INTO `sys_area` VALUES ('1993', '440825', '徐闻县', '440800');
INSERT INTO `sys_area` VALUES ('1994', '440881', '廉江市', '440800');
INSERT INTO `sys_area` VALUES ('1995', '440882', '雷州市', '440800');
INSERT INTO `sys_area` VALUES ('1996', '440883', '吴川市', '440800');
INSERT INTO `sys_area` VALUES ('1997', '440901', '市辖区', '440900');
INSERT INTO `sys_area` VALUES ('1998', '440902', '茂南区', '440900');
INSERT INTO `sys_area` VALUES ('1999', '440903', '茂港区', '440900');
INSERT INTO `sys_area` VALUES ('2000', '440923', '电白县', '440900');
INSERT INTO `sys_area` VALUES ('2001', '440981', '高州市', '440900');
INSERT INTO `sys_area` VALUES ('2002', '440982', '化州市', '440900');
INSERT INTO `sys_area` VALUES ('2003', '440983', '信宜市', '440900');
INSERT INTO `sys_area` VALUES ('2004', '441201', '市辖区', '441200');
INSERT INTO `sys_area` VALUES ('2005', '441202', '端州区', '441200');
INSERT INTO `sys_area` VALUES ('2006', '441203', '鼎湖区', '441200');
INSERT INTO `sys_area` VALUES ('2007', '441223', '广宁县', '441200');
INSERT INTO `sys_area` VALUES ('2008', '441224', '怀集县', '441200');
INSERT INTO `sys_area` VALUES ('2009', '441225', '封开县', '441200');
INSERT INTO `sys_area` VALUES ('2010', '441226', '德庆县', '441200');
INSERT INTO `sys_area` VALUES ('2011', '441283', '高要市', '441200');
INSERT INTO `sys_area` VALUES ('2012', '441284', '四会市', '441200');
INSERT INTO `sys_area` VALUES ('2013', '441301', '市辖区', '441300');
INSERT INTO `sys_area` VALUES ('2014', '441302', '惠城区', '441300');
INSERT INTO `sys_area` VALUES ('2015', '441303', '惠阳区', '441300');
INSERT INTO `sys_area` VALUES ('2016', '441322', '博罗县', '441300');
INSERT INTO `sys_area` VALUES ('2017', '441323', '惠东县', '441300');
INSERT INTO `sys_area` VALUES ('2018', '441324', '龙门县', '441300');
INSERT INTO `sys_area` VALUES ('2019', '441401', '市辖区', '441400');
INSERT INTO `sys_area` VALUES ('2020', '441402', '梅江区', '441400');
INSERT INTO `sys_area` VALUES ('2021', '441421', '梅　县', '441400');
INSERT INTO `sys_area` VALUES ('2022', '441422', '大埔县', '441400');
INSERT INTO `sys_area` VALUES ('2023', '441423', '丰顺县', '441400');
INSERT INTO `sys_area` VALUES ('2024', '441424', '五华县', '441400');
INSERT INTO `sys_area` VALUES ('2025', '441426', '平远县', '441400');
INSERT INTO `sys_area` VALUES ('2026', '441427', '蕉岭县', '441400');
INSERT INTO `sys_area` VALUES ('2027', '441481', '兴宁市', '441400');
INSERT INTO `sys_area` VALUES ('2028', '441501', '市辖区', '441500');
INSERT INTO `sys_area` VALUES ('2029', '441502', '城　区', '441500');
INSERT INTO `sys_area` VALUES ('2030', '441521', '海丰县', '441500');
INSERT INTO `sys_area` VALUES ('2031', '441523', '陆河县', '441500');
INSERT INTO `sys_area` VALUES ('2032', '441581', '陆丰市', '441500');
INSERT INTO `sys_area` VALUES ('2033', '441601', '市辖区', '441600');
INSERT INTO `sys_area` VALUES ('2034', '441602', '源城区', '441600');
INSERT INTO `sys_area` VALUES ('2035', '441621', '紫金县', '441600');
INSERT INTO `sys_area` VALUES ('2036', '441622', '龙川县', '441600');
INSERT INTO `sys_area` VALUES ('2037', '441623', '连平县', '441600');
INSERT INTO `sys_area` VALUES ('2038', '441624', '和平县', '441600');
INSERT INTO `sys_area` VALUES ('2039', '441625', '东源县', '441600');
INSERT INTO `sys_area` VALUES ('2040', '441701', '市辖区', '441700');
INSERT INTO `sys_area` VALUES ('2041', '441702', '江城区', '441700');
INSERT INTO `sys_area` VALUES ('2042', '441721', '阳西县', '441700');
INSERT INTO `sys_area` VALUES ('2043', '441723', '阳东县', '441700');
INSERT INTO `sys_area` VALUES ('2044', '441781', '阳春市', '441700');
INSERT INTO `sys_area` VALUES ('2045', '441801', '市辖区', '441800');
INSERT INTO `sys_area` VALUES ('2046', '441802', '清城区', '441800');
INSERT INTO `sys_area` VALUES ('2047', '441821', '佛冈县', '441800');
INSERT INTO `sys_area` VALUES ('2048', '441823', '阳山县', '441800');
INSERT INTO `sys_area` VALUES ('2049', '441825', '连山壮族瑶族自治县', '441800');
INSERT INTO `sys_area` VALUES ('2050', '441826', '连南瑶族自治县', '441800');
INSERT INTO `sys_area` VALUES ('2051', '441827', '清新县', '441800');
INSERT INTO `sys_area` VALUES ('2052', '441881', '英德市', '441800');
INSERT INTO `sys_area` VALUES ('2053', '441882', '连州市', '441800');
INSERT INTO `sys_area` VALUES ('2054', '445101', '市辖区', '445100');
INSERT INTO `sys_area` VALUES ('2055', '445102', '湘桥区', '445100');
INSERT INTO `sys_area` VALUES ('2056', '445121', '潮安县', '445100');
INSERT INTO `sys_area` VALUES ('2057', '445122', '饶平县', '445100');
INSERT INTO `sys_area` VALUES ('2058', '445201', '市辖区', '445200');
INSERT INTO `sys_area` VALUES ('2059', '445202', '榕城区', '445200');
INSERT INTO `sys_area` VALUES ('2060', '445221', '揭东县', '445200');
INSERT INTO `sys_area` VALUES ('2061', '445222', '揭西县', '445200');
INSERT INTO `sys_area` VALUES ('2062', '445224', '惠来县', '445200');
INSERT INTO `sys_area` VALUES ('2063', '445281', '普宁市', '445200');
INSERT INTO `sys_area` VALUES ('2064', '445301', '市辖区', '445300');
INSERT INTO `sys_area` VALUES ('2065', '445302', '云城区', '445300');
INSERT INTO `sys_area` VALUES ('2066', '445321', '新兴县', '445300');
INSERT INTO `sys_area` VALUES ('2067', '445322', '郁南县', '445300');
INSERT INTO `sys_area` VALUES ('2068', '445323', '云安县', '445300');
INSERT INTO `sys_area` VALUES ('2069', '445381', '罗定市', '445300');
INSERT INTO `sys_area` VALUES ('2070', '450101', '市辖区', '450100');
INSERT INTO `sys_area` VALUES ('2071', '450102', '兴宁区', '450100');
INSERT INTO `sys_area` VALUES ('2072', '450103', '青秀区', '450100');
INSERT INTO `sys_area` VALUES ('2073', '450105', '江南区', '450100');
INSERT INTO `sys_area` VALUES ('2074', '450107', '西乡塘区', '450100');
INSERT INTO `sys_area` VALUES ('2075', '450108', '良庆区', '450100');
INSERT INTO `sys_area` VALUES ('2076', '450109', '邕宁区', '450100');
INSERT INTO `sys_area` VALUES ('2077', '450122', '武鸣县', '450100');
INSERT INTO `sys_area` VALUES ('2078', '450123', '隆安县', '450100');
INSERT INTO `sys_area` VALUES ('2079', '450124', '马山县', '450100');
INSERT INTO `sys_area` VALUES ('2080', '450125', '上林县', '450100');
INSERT INTO `sys_area` VALUES ('2081', '450126', '宾阳县', '450100');
INSERT INTO `sys_area` VALUES ('2082', '450127', '横　县', '450100');
INSERT INTO `sys_area` VALUES ('2083', '450201', '市辖区', '450200');
INSERT INTO `sys_area` VALUES ('2084', '450202', '城中区', '450200');
INSERT INTO `sys_area` VALUES ('2085', '450203', '鱼峰区', '450200');
INSERT INTO `sys_area` VALUES ('2086', '450204', '柳南区', '450200');
INSERT INTO `sys_area` VALUES ('2087', '450205', '柳北区', '450200');
INSERT INTO `sys_area` VALUES ('2088', '450221', '柳江县', '450200');
INSERT INTO `sys_area` VALUES ('2089', '450222', '柳城县', '450200');
INSERT INTO `sys_area` VALUES ('2090', '450223', '鹿寨县', '450200');
INSERT INTO `sys_area` VALUES ('2091', '450224', '融安县', '450200');
INSERT INTO `sys_area` VALUES ('2092', '450225', '融水苗族自治县', '450200');
INSERT INTO `sys_area` VALUES ('2093', '450226', '三江侗族自治县', '450200');
INSERT INTO `sys_area` VALUES ('2094', '450301', '市辖区', '450300');
INSERT INTO `sys_area` VALUES ('2095', '450302', '秀峰区', '450300');
INSERT INTO `sys_area` VALUES ('2096', '450303', '叠彩区', '450300');
INSERT INTO `sys_area` VALUES ('2097', '450304', '象山区', '450300');
INSERT INTO `sys_area` VALUES ('2098', '450305', '七星区', '450300');
INSERT INTO `sys_area` VALUES ('2099', '450311', '雁山区', '450300');
INSERT INTO `sys_area` VALUES ('2100', '450321', '阳朔县', '450300');
INSERT INTO `sys_area` VALUES ('2101', '450322', '临桂县', '450300');
INSERT INTO `sys_area` VALUES ('2102', '450323', '灵川县', '450300');
INSERT INTO `sys_area` VALUES ('2103', '450324', '全州县', '450300');
INSERT INTO `sys_area` VALUES ('2104', '450325', '兴安县', '450300');
INSERT INTO `sys_area` VALUES ('2105', '450326', '永福县', '450300');
INSERT INTO `sys_area` VALUES ('2106', '450327', '灌阳县', '450300');
INSERT INTO `sys_area` VALUES ('2107', '450328', '龙胜各族自治县', '450300');
INSERT INTO `sys_area` VALUES ('2108', '450329', '资源县', '450300');
INSERT INTO `sys_area` VALUES ('2109', '450330', '平乐县', '450300');
INSERT INTO `sys_area` VALUES ('2110', '450331', '荔蒲县', '450300');
INSERT INTO `sys_area` VALUES ('2111', '450332', '恭城瑶族自治县', '450300');
INSERT INTO `sys_area` VALUES ('2112', '450401', '市辖区', '450400');
INSERT INTO `sys_area` VALUES ('2113', '450403', '万秀区', '450400');
INSERT INTO `sys_area` VALUES ('2114', '450404', '蝶山区', '450400');
INSERT INTO `sys_area` VALUES ('2115', '450405', '长洲区', '450400');
INSERT INTO `sys_area` VALUES ('2116', '450421', '苍梧县', '450400');
INSERT INTO `sys_area` VALUES ('2117', '450422', '藤　县', '450400');
INSERT INTO `sys_area` VALUES ('2118', '450423', '蒙山县', '450400');
INSERT INTO `sys_area` VALUES ('2119', '450481', '岑溪市', '450400');
INSERT INTO `sys_area` VALUES ('2120', '450501', '市辖区', '450500');
INSERT INTO `sys_area` VALUES ('2121', '450502', '海城区', '450500');
INSERT INTO `sys_area` VALUES ('2122', '450503', '银海区', '450500');
INSERT INTO `sys_area` VALUES ('2123', '450512', '铁山港区', '450500');
INSERT INTO `sys_area` VALUES ('2124', '450521', '合浦县', '450500');
INSERT INTO `sys_area` VALUES ('2125', '450601', '市辖区', '450600');
INSERT INTO `sys_area` VALUES ('2126', '450602', '港口区', '450600');
INSERT INTO `sys_area` VALUES ('2127', '450603', '防城区', '450600');
INSERT INTO `sys_area` VALUES ('2128', '450621', '上思县', '450600');
INSERT INTO `sys_area` VALUES ('2129', '450681', '东兴市', '450600');
INSERT INTO `sys_area` VALUES ('2130', '450701', '市辖区', '450700');
INSERT INTO `sys_area` VALUES ('2131', '450702', '钦南区', '450700');
INSERT INTO `sys_area` VALUES ('2132', '450703', '钦北区', '450700');
INSERT INTO `sys_area` VALUES ('2133', '450721', '灵山县', '450700');
INSERT INTO `sys_area` VALUES ('2134', '450722', '浦北县', '450700');
INSERT INTO `sys_area` VALUES ('2135', '450801', '市辖区', '450800');
INSERT INTO `sys_area` VALUES ('2136', '450802', '港北区', '450800');
INSERT INTO `sys_area` VALUES ('2137', '450803', '港南区', '450800');
INSERT INTO `sys_area` VALUES ('2138', '450804', '覃塘区', '450800');
INSERT INTO `sys_area` VALUES ('2139', '450821', '平南县', '450800');
INSERT INTO `sys_area` VALUES ('2140', '450881', '桂平市', '450800');
INSERT INTO `sys_area` VALUES ('2141', '450901', '市辖区', '450900');
INSERT INTO `sys_area` VALUES ('2142', '450902', '玉州区', '450900');
INSERT INTO `sys_area` VALUES ('2143', '450921', '容　县', '450900');
INSERT INTO `sys_area` VALUES ('2144', '450922', '陆川县', '450900');
INSERT INTO `sys_area` VALUES ('2145', '450923', '博白县', '450900');
INSERT INTO `sys_area` VALUES ('2146', '450924', '兴业县', '450900');
INSERT INTO `sys_area` VALUES ('2147', '450981', '北流市', '450900');
INSERT INTO `sys_area` VALUES ('2148', '451001', '市辖区', '451000');
INSERT INTO `sys_area` VALUES ('2149', '451002', '右江区', '451000');
INSERT INTO `sys_area` VALUES ('2150', '451021', '田阳县', '451000');
INSERT INTO `sys_area` VALUES ('2151', '451022', '田东县', '451000');
INSERT INTO `sys_area` VALUES ('2152', '451023', '平果县', '451000');
INSERT INTO `sys_area` VALUES ('2153', '451024', '德保县', '451000');
INSERT INTO `sys_area` VALUES ('2154', '451025', '靖西县', '451000');
INSERT INTO `sys_area` VALUES ('2155', '451026', '那坡县', '451000');
INSERT INTO `sys_area` VALUES ('2156', '451027', '凌云县', '451000');
INSERT INTO `sys_area` VALUES ('2157', '451028', '乐业县', '451000');
INSERT INTO `sys_area` VALUES ('2158', '451029', '田林县', '451000');
INSERT INTO `sys_area` VALUES ('2159', '451030', '西林县', '451000');
INSERT INTO `sys_area` VALUES ('2160', '451031', '隆林各族自治县', '451000');
INSERT INTO `sys_area` VALUES ('2161', '451101', '市辖区', '451100');
INSERT INTO `sys_area` VALUES ('2162', '451102', '八步区', '451100');
INSERT INTO `sys_area` VALUES ('2163', '451121', '昭平县', '451100');
INSERT INTO `sys_area` VALUES ('2164', '451122', '钟山县', '451100');
INSERT INTO `sys_area` VALUES ('2165', '451123', '富川瑶族自治县', '451100');
INSERT INTO `sys_area` VALUES ('2166', '451201', '市辖区', '451200');
INSERT INTO `sys_area` VALUES ('2167', '451202', '金城江区', '451200');
INSERT INTO `sys_area` VALUES ('2168', '451221', '南丹县', '451200');
INSERT INTO `sys_area` VALUES ('2169', '451222', '天峨县', '451200');
INSERT INTO `sys_area` VALUES ('2170', '451223', '凤山县', '451200');
INSERT INTO `sys_area` VALUES ('2171', '451224', '东兰县', '451200');
INSERT INTO `sys_area` VALUES ('2172', '451225', '罗城仫佬族自治县', '451200');
INSERT INTO `sys_area` VALUES ('2173', '451226', '环江毛南族自治县', '451200');
INSERT INTO `sys_area` VALUES ('2174', '451227', '巴马瑶族自治县', '451200');
INSERT INTO `sys_area` VALUES ('2175', '451228', '都安瑶族自治县', '451200');
INSERT INTO `sys_area` VALUES ('2176', '451229', '大化瑶族自治县', '451200');
INSERT INTO `sys_area` VALUES ('2177', '451281', '宜州市', '451200');
INSERT INTO `sys_area` VALUES ('2178', '451301', '市辖区', '451300');
INSERT INTO `sys_area` VALUES ('2179', '451302', '兴宾区', '451300');
INSERT INTO `sys_area` VALUES ('2180', '451321', '忻城县', '451300');
INSERT INTO `sys_area` VALUES ('2181', '451322', '象州县', '451300');
INSERT INTO `sys_area` VALUES ('2182', '451323', '武宣县', '451300');
INSERT INTO `sys_area` VALUES ('2183', '451324', '金秀瑶族自治县', '451300');
INSERT INTO `sys_area` VALUES ('2184', '451381', '合山市', '451300');
INSERT INTO `sys_area` VALUES ('2185', '451401', '市辖区', '451400');
INSERT INTO `sys_area` VALUES ('2186', '451402', '江洲区', '451400');
INSERT INTO `sys_area` VALUES ('2187', '451421', '扶绥县', '451400');
INSERT INTO `sys_area` VALUES ('2188', '451422', '宁明县', '451400');
INSERT INTO `sys_area` VALUES ('2189', '451423', '龙州县', '451400');
INSERT INTO `sys_area` VALUES ('2190', '451424', '大新县', '451400');
INSERT INTO `sys_area` VALUES ('2191', '451425', '天等县', '451400');
INSERT INTO `sys_area` VALUES ('2192', '451481', '凭祥市', '451400');
INSERT INTO `sys_area` VALUES ('2193', '460101', '市辖区', '460100');
INSERT INTO `sys_area` VALUES ('2194', '460105', '秀英区', '460100');
INSERT INTO `sys_area` VALUES ('2195', '460106', '龙华区', '460100');
INSERT INTO `sys_area` VALUES ('2196', '460107', '琼山区', '460100');
INSERT INTO `sys_area` VALUES ('2197', '460108', '美兰区', '460100');
INSERT INTO `sys_area` VALUES ('2198', '460201', '市辖区', '460200');
INSERT INTO `sys_area` VALUES ('2199', '469001', '五指山市', '469000');
INSERT INTO `sys_area` VALUES ('2200', '469002', '琼海市', '469000');
INSERT INTO `sys_area` VALUES ('2201', '469003', '儋州市', '469000');
INSERT INTO `sys_area` VALUES ('2202', '469005', '文昌市', '469000');
INSERT INTO `sys_area` VALUES ('2203', '469006', '万宁市', '469000');
INSERT INTO `sys_area` VALUES ('2204', '469007', '东方市', '469000');
INSERT INTO `sys_area` VALUES ('2205', '469025', '定安县', '469000');
INSERT INTO `sys_area` VALUES ('2206', '469026', '屯昌县', '469000');
INSERT INTO `sys_area` VALUES ('2207', '469027', '澄迈县', '469000');
INSERT INTO `sys_area` VALUES ('2208', '469028', '临高县', '469000');
INSERT INTO `sys_area` VALUES ('2209', '469030', '白沙黎族自治县', '469000');
INSERT INTO `sys_area` VALUES ('2210', '469031', '昌江黎族自治县', '469000');
INSERT INTO `sys_area` VALUES ('2211', '469033', '乐东黎族自治县', '469000');
INSERT INTO `sys_area` VALUES ('2212', '469034', '陵水黎族自治县', '469000');
INSERT INTO `sys_area` VALUES ('2213', '469035', '保亭黎族苗族自治县', '469000');
INSERT INTO `sys_area` VALUES ('2214', '469036', '琼中黎族苗族自治县', '469000');
INSERT INTO `sys_area` VALUES ('2215', '469037', '西沙群岛', '469000');
INSERT INTO `sys_area` VALUES ('2216', '469038', '南沙群岛', '469000');
INSERT INTO `sys_area` VALUES ('2217', '469039', '中沙群岛的岛礁及其海域', '469000');
INSERT INTO `sys_area` VALUES ('2218', '500101', '万州区', '500100');
INSERT INTO `sys_area` VALUES ('2219', '500102', '涪陵区', '500100');
INSERT INTO `sys_area` VALUES ('2220', '500103', '渝中区', '500100');
INSERT INTO `sys_area` VALUES ('2221', '500104', '大渡口区', '500100');
INSERT INTO `sys_area` VALUES ('2222', '500105', '江北区', '500100');
INSERT INTO `sys_area` VALUES ('2223', '500106', '沙坪坝区', '500100');
INSERT INTO `sys_area` VALUES ('2224', '500107', '九龙坡区', '500100');
INSERT INTO `sys_area` VALUES ('2225', '500108', '南岸区', '500100');
INSERT INTO `sys_area` VALUES ('2226', '500109', '北碚区', '500100');
INSERT INTO `sys_area` VALUES ('2227', '500110', '万盛区', '500100');
INSERT INTO `sys_area` VALUES ('2228', '500111', '双桥区', '500100');
INSERT INTO `sys_area` VALUES ('2229', '500112', '渝北区', '500100');
INSERT INTO `sys_area` VALUES ('2230', '500113', '巴南区', '500100');
INSERT INTO `sys_area` VALUES ('2231', '500114', '黔江区', '500100');
INSERT INTO `sys_area` VALUES ('2232', '500115', '长寿区', '500100');
INSERT INTO `sys_area` VALUES ('2233', '500222', '綦江县', '500200');
INSERT INTO `sys_area` VALUES ('2234', '500223', '潼南县', '500200');
INSERT INTO `sys_area` VALUES ('2235', '500224', '铜梁县', '500200');
INSERT INTO `sys_area` VALUES ('2236', '500225', '大足县', '500200');
INSERT INTO `sys_area` VALUES ('2237', '500226', '荣昌县', '500200');
INSERT INTO `sys_area` VALUES ('2238', '500227', '璧山县', '500200');
INSERT INTO `sys_area` VALUES ('2239', '500228', '梁平县', '500200');
INSERT INTO `sys_area` VALUES ('2240', '500229', '城口县', '500200');
INSERT INTO `sys_area` VALUES ('2241', '500230', '丰都县', '500200');
INSERT INTO `sys_area` VALUES ('2242', '500231', '垫江县', '500200');
INSERT INTO `sys_area` VALUES ('2243', '500232', '武隆县', '500200');
INSERT INTO `sys_area` VALUES ('2244', '500233', '忠　县', '500200');
INSERT INTO `sys_area` VALUES ('2245', '500234', '开　县', '500200');
INSERT INTO `sys_area` VALUES ('2246', '500235', '云阳县', '500200');
INSERT INTO `sys_area` VALUES ('2247', '500236', '奉节县', '500200');
INSERT INTO `sys_area` VALUES ('2248', '500237', '巫山县', '500200');
INSERT INTO `sys_area` VALUES ('2249', '500238', '巫溪县', '500200');
INSERT INTO `sys_area` VALUES ('2250', '500240', '石柱土家族自治县', '500200');
INSERT INTO `sys_area` VALUES ('2251', '500241', '秀山土家族苗族自治县', '500200');
INSERT INTO `sys_area` VALUES ('2252', '500242', '酉阳土家族苗族自治县', '500200');
INSERT INTO `sys_area` VALUES ('2253', '500243', '彭水苗族土家族自治县', '500200');
INSERT INTO `sys_area` VALUES ('2254', '500381', '江津市', '500300');
INSERT INTO `sys_area` VALUES ('2255', '500382', '合川市', '500300');
INSERT INTO `sys_area` VALUES ('2256', '500383', '永川市', '500300');
INSERT INTO `sys_area` VALUES ('2257', '500384', '南川市', '500300');
INSERT INTO `sys_area` VALUES ('2258', '510101', '市辖区', '510100');
INSERT INTO `sys_area` VALUES ('2259', '510104', '锦江区', '510100');
INSERT INTO `sys_area` VALUES ('2260', '510105', '青羊区', '510100');
INSERT INTO `sys_area` VALUES ('2261', '510106', '金牛区', '510100');
INSERT INTO `sys_area` VALUES ('2262', '510107', '武侯区', '510100');
INSERT INTO `sys_area` VALUES ('2263', '510108', '成华区', '510100');
INSERT INTO `sys_area` VALUES ('2264', '510112', '龙泉驿区', '510100');
INSERT INTO `sys_area` VALUES ('2265', '510113', '青白江区', '510100');
INSERT INTO `sys_area` VALUES ('2266', '510114', '新都区', '510100');
INSERT INTO `sys_area` VALUES ('2267', '510115', '温江区', '510100');
INSERT INTO `sys_area` VALUES ('2268', '510121', '金堂县', '510100');
INSERT INTO `sys_area` VALUES ('2269', '510122', '双流县', '510100');
INSERT INTO `sys_area` VALUES ('2270', '510124', '郫　县', '510100');
INSERT INTO `sys_area` VALUES ('2271', '510129', '大邑县', '510100');
INSERT INTO `sys_area` VALUES ('2272', '510131', '蒲江县', '510100');
INSERT INTO `sys_area` VALUES ('2273', '510132', '新津县', '510100');
INSERT INTO `sys_area` VALUES ('2274', '510181', '都江堰市', '510100');
INSERT INTO `sys_area` VALUES ('2275', '510182', '彭州市', '510100');
INSERT INTO `sys_area` VALUES ('2276', '510183', '邛崃市', '510100');
INSERT INTO `sys_area` VALUES ('2277', '510184', '崇州市', '510100');
INSERT INTO `sys_area` VALUES ('2278', '510301', '市辖区', '510300');
INSERT INTO `sys_area` VALUES ('2279', '510302', '自流井区', '510300');
INSERT INTO `sys_area` VALUES ('2280', '510303', '贡井区', '510300');
INSERT INTO `sys_area` VALUES ('2281', '510304', '大安区', '510300');
INSERT INTO `sys_area` VALUES ('2282', '510311', '沿滩区', '510300');
INSERT INTO `sys_area` VALUES ('2283', '510321', '荣　县', '510300');
INSERT INTO `sys_area` VALUES ('2284', '510322', '富顺县', '510300');
INSERT INTO `sys_area` VALUES ('2285', '510401', '市辖区', '510400');
INSERT INTO `sys_area` VALUES ('2286', '510402', '东　区', '510400');
INSERT INTO `sys_area` VALUES ('2287', '510403', '西　区', '510400');
INSERT INTO `sys_area` VALUES ('2288', '510411', '仁和区', '510400');
INSERT INTO `sys_area` VALUES ('2289', '510421', '米易县', '510400');
INSERT INTO `sys_area` VALUES ('2290', '510422', '盐边县', '510400');
INSERT INTO `sys_area` VALUES ('2291', '510501', '市辖区', '510500');
INSERT INTO `sys_area` VALUES ('2292', '510502', '江阳区', '510500');
INSERT INTO `sys_area` VALUES ('2293', '510503', '纳溪区', '510500');
INSERT INTO `sys_area` VALUES ('2294', '510504', '龙马潭区', '510500');
INSERT INTO `sys_area` VALUES ('2295', '510521', '泸　县', '510500');
INSERT INTO `sys_area` VALUES ('2296', '510522', '合江县', '510500');
INSERT INTO `sys_area` VALUES ('2297', '510524', '叙永县', '510500');
INSERT INTO `sys_area` VALUES ('2298', '510525', '古蔺县', '510500');
INSERT INTO `sys_area` VALUES ('2299', '510601', '市辖区', '510600');
INSERT INTO `sys_area` VALUES ('2300', '510603', '旌阳区', '510600');
INSERT INTO `sys_area` VALUES ('2301', '510623', '中江县', '510600');
INSERT INTO `sys_area` VALUES ('2302', '510626', '罗江县', '510600');
INSERT INTO `sys_area` VALUES ('2303', '510681', '广汉市', '510600');
INSERT INTO `sys_area` VALUES ('2304', '510682', '什邡市', '510600');
INSERT INTO `sys_area` VALUES ('2305', '510683', '绵竹市', '510600');
INSERT INTO `sys_area` VALUES ('2306', '510701', '市辖区', '510700');
INSERT INTO `sys_area` VALUES ('2307', '510703', '涪城区', '510700');
INSERT INTO `sys_area` VALUES ('2308', '510704', '游仙区', '510700');
INSERT INTO `sys_area` VALUES ('2309', '510722', '三台县', '510700');
INSERT INTO `sys_area` VALUES ('2310', '510723', '盐亭县', '510700');
INSERT INTO `sys_area` VALUES ('2311', '510724', '安　县', '510700');
INSERT INTO `sys_area` VALUES ('2312', '510725', '梓潼县', '510700');
INSERT INTO `sys_area` VALUES ('2313', '510726', '北川羌族自治县', '510700');
INSERT INTO `sys_area` VALUES ('2314', '510727', '平武县', '510700');
INSERT INTO `sys_area` VALUES ('2315', '510781', '江油市', '510700');
INSERT INTO `sys_area` VALUES ('2316', '510801', '市辖区', '510800');
INSERT INTO `sys_area` VALUES ('2317', '510802', '市中区', '510800');
INSERT INTO `sys_area` VALUES ('2318', '510811', '元坝区', '510800');
INSERT INTO `sys_area` VALUES ('2319', '510812', '朝天区', '510800');
INSERT INTO `sys_area` VALUES ('2320', '510821', '旺苍县', '510800');
INSERT INTO `sys_area` VALUES ('2321', '510822', '青川县', '510800');
INSERT INTO `sys_area` VALUES ('2322', '510823', '剑阁县', '510800');
INSERT INTO `sys_area` VALUES ('2323', '510824', '苍溪县', '510800');
INSERT INTO `sys_area` VALUES ('2324', '510901', '市辖区', '510900');
INSERT INTO `sys_area` VALUES ('2325', '510903', '船山区', '510900');
INSERT INTO `sys_area` VALUES ('2326', '510904', '安居区', '510900');
INSERT INTO `sys_area` VALUES ('2327', '510921', '蓬溪县', '510900');
INSERT INTO `sys_area` VALUES ('2328', '510922', '射洪县', '510900');
INSERT INTO `sys_area` VALUES ('2329', '510923', '大英县', '510900');
INSERT INTO `sys_area` VALUES ('2330', '511001', '市辖区', '511000');
INSERT INTO `sys_area` VALUES ('2331', '511002', '市中区', '511000');
INSERT INTO `sys_area` VALUES ('2332', '511011', '东兴区', '511000');
INSERT INTO `sys_area` VALUES ('2333', '511024', '威远县', '511000');
INSERT INTO `sys_area` VALUES ('2334', '511025', '资中县', '511000');
INSERT INTO `sys_area` VALUES ('2335', '511028', '隆昌县', '511000');
INSERT INTO `sys_area` VALUES ('2336', '511101', '市辖区', '511100');
INSERT INTO `sys_area` VALUES ('2337', '511102', '市中区', '511100');
INSERT INTO `sys_area` VALUES ('2338', '511111', '沙湾区', '511100');
INSERT INTO `sys_area` VALUES ('2339', '511112', '五通桥区', '511100');
INSERT INTO `sys_area` VALUES ('2340', '511113', '金口河区', '511100');
INSERT INTO `sys_area` VALUES ('2341', '511123', '犍为县', '511100');
INSERT INTO `sys_area` VALUES ('2342', '511124', '井研县', '511100');
INSERT INTO `sys_area` VALUES ('2343', '511126', '夹江县', '511100');
INSERT INTO `sys_area` VALUES ('2344', '511129', '沐川县', '511100');
INSERT INTO `sys_area` VALUES ('2345', '511132', '峨边彝族自治县', '511100');
INSERT INTO `sys_area` VALUES ('2346', '511133', '马边彝族自治县', '511100');
INSERT INTO `sys_area` VALUES ('2347', '511181', '峨眉山市', '511100');
INSERT INTO `sys_area` VALUES ('2348', '511301', '市辖区', '511300');
INSERT INTO `sys_area` VALUES ('2349', '511302', '顺庆区', '511300');
INSERT INTO `sys_area` VALUES ('2350', '511303', '高坪区', '511300');
INSERT INTO `sys_area` VALUES ('2351', '511304', '嘉陵区', '511300');
INSERT INTO `sys_area` VALUES ('2352', '511321', '南部县', '511300');
INSERT INTO `sys_area` VALUES ('2353', '511322', '营山县', '511300');
INSERT INTO `sys_area` VALUES ('2354', '511323', '蓬安县', '511300');
INSERT INTO `sys_area` VALUES ('2355', '511324', '仪陇县', '511300');
INSERT INTO `sys_area` VALUES ('2356', '511325', '西充县', '511300');
INSERT INTO `sys_area` VALUES ('2357', '511381', '阆中市', '511300');
INSERT INTO `sys_area` VALUES ('2358', '511401', '市辖区', '511400');
INSERT INTO `sys_area` VALUES ('2359', '511402', '东坡区', '511400');
INSERT INTO `sys_area` VALUES ('2360', '511421', '仁寿县', '511400');
INSERT INTO `sys_area` VALUES ('2361', '511422', '彭山县', '511400');
INSERT INTO `sys_area` VALUES ('2362', '511423', '洪雅县', '511400');
INSERT INTO `sys_area` VALUES ('2363', '511424', '丹棱县', '511400');
INSERT INTO `sys_area` VALUES ('2364', '511425', '青神县', '511400');
INSERT INTO `sys_area` VALUES ('2365', '511501', '市辖区', '511500');
INSERT INTO `sys_area` VALUES ('2366', '511502', '翠屏区', '511500');
INSERT INTO `sys_area` VALUES ('2367', '511521', '宜宾县', '511500');
INSERT INTO `sys_area` VALUES ('2368', '511522', '南溪县', '511500');
INSERT INTO `sys_area` VALUES ('2369', '511523', '江安县', '511500');
INSERT INTO `sys_area` VALUES ('2370', '511524', '长宁县', '511500');
INSERT INTO `sys_area` VALUES ('2371', '511525', '高　县', '511500');
INSERT INTO `sys_area` VALUES ('2372', '511526', '珙　县', '511500');
INSERT INTO `sys_area` VALUES ('2373', '511527', '筠连县', '511500');
INSERT INTO `sys_area` VALUES ('2374', '511528', '兴文县', '511500');
INSERT INTO `sys_area` VALUES ('2375', '511529', '屏山县', '511500');
INSERT INTO `sys_area` VALUES ('2376', '511601', '市辖区', '511600');
INSERT INTO `sys_area` VALUES ('2377', '511602', '广安区', '511600');
INSERT INTO `sys_area` VALUES ('2378', '511621', '岳池县', '511600');
INSERT INTO `sys_area` VALUES ('2379', '511622', '武胜县', '511600');
INSERT INTO `sys_area` VALUES ('2380', '511623', '邻水县', '511600');
INSERT INTO `sys_area` VALUES ('2381', '511681', '华莹市', '511600');
INSERT INTO `sys_area` VALUES ('2382', '511701', '市辖区', '511700');
INSERT INTO `sys_area` VALUES ('2383', '511702', '通川区', '511700');
INSERT INTO `sys_area` VALUES ('2384', '511721', '达　县', '511700');
INSERT INTO `sys_area` VALUES ('2385', '511722', '宣汉县', '511700');
INSERT INTO `sys_area` VALUES ('2386', '511723', '开江县', '511700');
INSERT INTO `sys_area` VALUES ('2387', '511724', '大竹县', '511700');
INSERT INTO `sys_area` VALUES ('2388', '511725', '渠　县', '511700');
INSERT INTO `sys_area` VALUES ('2389', '511781', '万源市', '511700');
INSERT INTO `sys_area` VALUES ('2390', '511801', '市辖区', '511800');
INSERT INTO `sys_area` VALUES ('2391', '511802', '雨城区', '511800');
INSERT INTO `sys_area` VALUES ('2392', '511821', '名山县', '511800');
INSERT INTO `sys_area` VALUES ('2393', '511822', '荥经县', '511800');
INSERT INTO `sys_area` VALUES ('2394', '511823', '汉源县', '511800');
INSERT INTO `sys_area` VALUES ('2395', '511824', '石棉县', '511800');
INSERT INTO `sys_area` VALUES ('2396', '511825', '天全县', '511800');
INSERT INTO `sys_area` VALUES ('2397', '511826', '芦山县', '511800');
INSERT INTO `sys_area` VALUES ('2398', '511827', '宝兴县', '511800');
INSERT INTO `sys_area` VALUES ('2399', '511901', '市辖区', '511900');
INSERT INTO `sys_area` VALUES ('2400', '511902', '巴州区', '511900');
INSERT INTO `sys_area` VALUES ('2401', '511921', '通江县', '511900');
INSERT INTO `sys_area` VALUES ('2402', '511922', '南江县', '511900');
INSERT INTO `sys_area` VALUES ('2403', '511923', '平昌县', '511900');
INSERT INTO `sys_area` VALUES ('2404', '512001', '市辖区', '512000');
INSERT INTO `sys_area` VALUES ('2405', '512002', '雁江区', '512000');
INSERT INTO `sys_area` VALUES ('2406', '512021', '安岳县', '512000');
INSERT INTO `sys_area` VALUES ('2407', '512022', '乐至县', '512000');
INSERT INTO `sys_area` VALUES ('2408', '512081', '简阳市', '512000');
INSERT INTO `sys_area` VALUES ('2409', '513221', '汶川县', '513200');
INSERT INTO `sys_area` VALUES ('2410', '513222', '理　县', '513200');
INSERT INTO `sys_area` VALUES ('2411', '513223', '茂　县', '513200');
INSERT INTO `sys_area` VALUES ('2412', '513224', '松潘县', '513200');
INSERT INTO `sys_area` VALUES ('2413', '513225', '九寨沟县', '513200');
INSERT INTO `sys_area` VALUES ('2414', '513226', '金川县', '513200');
INSERT INTO `sys_area` VALUES ('2415', '513227', '小金县', '513200');
INSERT INTO `sys_area` VALUES ('2416', '513228', '黑水县', '513200');
INSERT INTO `sys_area` VALUES ('2417', '513229', '马尔康县', '513200');
INSERT INTO `sys_area` VALUES ('2418', '513230', '壤塘县', '513200');
INSERT INTO `sys_area` VALUES ('2419', '513231', '阿坝县', '513200');
INSERT INTO `sys_area` VALUES ('2420', '513232', '若尔盖县', '513200');
INSERT INTO `sys_area` VALUES ('2421', '513233', '红原县', '513200');
INSERT INTO `sys_area` VALUES ('2422', '513321', '康定县', '513300');
INSERT INTO `sys_area` VALUES ('2423', '513322', '泸定县', '513300');
INSERT INTO `sys_area` VALUES ('2424', '513323', '丹巴县', '513300');
INSERT INTO `sys_area` VALUES ('2425', '513324', '九龙县', '513300');
INSERT INTO `sys_area` VALUES ('2426', '513325', '雅江县', '513300');
INSERT INTO `sys_area` VALUES ('2427', '513326', '道孚县', '513300');
INSERT INTO `sys_area` VALUES ('2428', '513327', '炉霍县', '513300');
INSERT INTO `sys_area` VALUES ('2429', '513328', '甘孜县', '513300');
INSERT INTO `sys_area` VALUES ('2430', '513329', '新龙县', '513300');
INSERT INTO `sys_area` VALUES ('2431', '513330', '德格县', '513300');
INSERT INTO `sys_area` VALUES ('2432', '513331', '白玉县', '513300');
INSERT INTO `sys_area` VALUES ('2433', '513332', '石渠县', '513300');
INSERT INTO `sys_area` VALUES ('2434', '513333', '色达县', '513300');
INSERT INTO `sys_area` VALUES ('2435', '513334', '理塘县', '513300');
INSERT INTO `sys_area` VALUES ('2436', '513335', '巴塘县', '513300');
INSERT INTO `sys_area` VALUES ('2437', '513336', '乡城县', '513300');
INSERT INTO `sys_area` VALUES ('2438', '513337', '稻城县', '513300');
INSERT INTO `sys_area` VALUES ('2439', '513338', '得荣县', '513300');
INSERT INTO `sys_area` VALUES ('2440', '513401', '西昌市', '513400');
INSERT INTO `sys_area` VALUES ('2441', '513422', '木里藏族自治县', '513400');
INSERT INTO `sys_area` VALUES ('2442', '513423', '盐源县', '513400');
INSERT INTO `sys_area` VALUES ('2443', '513424', '德昌县', '513400');
INSERT INTO `sys_area` VALUES ('2444', '513425', '会理县', '513400');
INSERT INTO `sys_area` VALUES ('2445', '513426', '会东县', '513400');
INSERT INTO `sys_area` VALUES ('2446', '513427', '宁南县', '513400');
INSERT INTO `sys_area` VALUES ('2447', '513428', '普格县', '513400');
INSERT INTO `sys_area` VALUES ('2448', '513429', '布拖县', '513400');
INSERT INTO `sys_area` VALUES ('2449', '513430', '金阳县', '513400');
INSERT INTO `sys_area` VALUES ('2450', '513431', '昭觉县', '513400');
INSERT INTO `sys_area` VALUES ('2451', '513432', '喜德县', '513400');
INSERT INTO `sys_area` VALUES ('2452', '513433', '冕宁县', '513400');
INSERT INTO `sys_area` VALUES ('2453', '513434', '越西县', '513400');
INSERT INTO `sys_area` VALUES ('2454', '513435', '甘洛县', '513400');
INSERT INTO `sys_area` VALUES ('2455', '513436', '美姑县', '513400');
INSERT INTO `sys_area` VALUES ('2456', '513437', '雷波县', '513400');
INSERT INTO `sys_area` VALUES ('2457', '520101', '市辖区', '520100');
INSERT INTO `sys_area` VALUES ('2458', '520102', '南明区', '520100');
INSERT INTO `sys_area` VALUES ('2459', '520103', '云岩区', '520100');
INSERT INTO `sys_area` VALUES ('2460', '520111', '花溪区', '520100');
INSERT INTO `sys_area` VALUES ('2461', '520112', '乌当区', '520100');
INSERT INTO `sys_area` VALUES ('2462', '520113', '白云区', '520100');
INSERT INTO `sys_area` VALUES ('2463', '520114', '小河区', '520100');
INSERT INTO `sys_area` VALUES ('2464', '520121', '开阳县', '520100');
INSERT INTO `sys_area` VALUES ('2465', '520122', '息烽县', '520100');
INSERT INTO `sys_area` VALUES ('2466', '520123', '修文县', '520100');
INSERT INTO `sys_area` VALUES ('2467', '520181', '清镇市', '520100');
INSERT INTO `sys_area` VALUES ('2468', '520201', '钟山区', '520200');
INSERT INTO `sys_area` VALUES ('2469', '520203', '六枝特区', '520200');
INSERT INTO `sys_area` VALUES ('2470', '520221', '水城县', '520200');
INSERT INTO `sys_area` VALUES ('2471', '520222', '盘　县', '520200');
INSERT INTO `sys_area` VALUES ('2472', '520301', '市辖区', '520300');
INSERT INTO `sys_area` VALUES ('2473', '520302', '红花岗区', '520300');
INSERT INTO `sys_area` VALUES ('2474', '520303', '汇川区', '520300');
INSERT INTO `sys_area` VALUES ('2475', '520321', '遵义县', '520300');
INSERT INTO `sys_area` VALUES ('2476', '520322', '桐梓县', '520300');
INSERT INTO `sys_area` VALUES ('2477', '520323', '绥阳县', '520300');
INSERT INTO `sys_area` VALUES ('2478', '520324', '正安县', '520300');
INSERT INTO `sys_area` VALUES ('2479', '520325', '道真仡佬族苗族自治县', '520300');
INSERT INTO `sys_area` VALUES ('2480', '520326', '务川仡佬族苗族自治县', '520300');
INSERT INTO `sys_area` VALUES ('2481', '520327', '凤冈县', '520300');
INSERT INTO `sys_area` VALUES ('2482', '520328', '湄潭县', '520300');
INSERT INTO `sys_area` VALUES ('2483', '520329', '余庆县', '520300');
INSERT INTO `sys_area` VALUES ('2484', '520330', '习水县', '520300');
INSERT INTO `sys_area` VALUES ('2485', '520381', '赤水市', '520300');
INSERT INTO `sys_area` VALUES ('2486', '520382', '仁怀市', '520300');
INSERT INTO `sys_area` VALUES ('2487', '520401', '市辖区', '520400');
INSERT INTO `sys_area` VALUES ('2488', '520402', '西秀区', '520400');
INSERT INTO `sys_area` VALUES ('2489', '520421', '平坝县', '520400');
INSERT INTO `sys_area` VALUES ('2490', '520422', '普定县', '520400');
INSERT INTO `sys_area` VALUES ('2491', '520423', '镇宁布依族苗族自治县', '520400');
INSERT INTO `sys_area` VALUES ('2492', '520424', '关岭布依族苗族自治县', '520400');
INSERT INTO `sys_area` VALUES ('2493', '520425', '紫云苗族布依族自治县', '520400');
INSERT INTO `sys_area` VALUES ('2494', '522201', '铜仁市', '522200');
INSERT INTO `sys_area` VALUES ('2495', '522222', '江口县', '522200');
INSERT INTO `sys_area` VALUES ('2496', '522223', '玉屏侗族自治县', '522200');
INSERT INTO `sys_area` VALUES ('2497', '522224', '石阡县', '522200');
INSERT INTO `sys_area` VALUES ('2498', '522225', '思南县', '522200');
INSERT INTO `sys_area` VALUES ('2499', '522226', '印江土家族苗族自治县', '522200');
INSERT INTO `sys_area` VALUES ('2500', '522227', '德江县', '522200');
INSERT INTO `sys_area` VALUES ('2501', '522228', '沿河土家族自治县', '522200');
INSERT INTO `sys_area` VALUES ('2502', '522229', '松桃苗族自治县', '522200');
INSERT INTO `sys_area` VALUES ('2503', '522230', '万山特区', '522200');
INSERT INTO `sys_area` VALUES ('2504', '522301', '兴义市', '522300');
INSERT INTO `sys_area` VALUES ('2505', '522322', '兴仁县', '522300');
INSERT INTO `sys_area` VALUES ('2506', '522323', '普安县', '522300');
INSERT INTO `sys_area` VALUES ('2507', '522324', '晴隆县', '522300');
INSERT INTO `sys_area` VALUES ('2508', '522325', '贞丰县', '522300');
INSERT INTO `sys_area` VALUES ('2509', '522326', '望谟县', '522300');
INSERT INTO `sys_area` VALUES ('2510', '522327', '册亨县', '522300');
INSERT INTO `sys_area` VALUES ('2511', '522328', '安龙县', '522300');
INSERT INTO `sys_area` VALUES ('2512', '522401', '毕节市', '522400');
INSERT INTO `sys_area` VALUES ('2513', '522422', '大方县', '522400');
INSERT INTO `sys_area` VALUES ('2514', '522423', '黔西县', '522400');
INSERT INTO `sys_area` VALUES ('2515', '522424', '金沙县', '522400');
INSERT INTO `sys_area` VALUES ('2516', '522425', '织金县', '522400');
INSERT INTO `sys_area` VALUES ('2517', '522426', '纳雍县', '522400');
INSERT INTO `sys_area` VALUES ('2518', '522427', '威宁彝族回族苗族自治县', '522400');
INSERT INTO `sys_area` VALUES ('2519', '522428', '赫章县', '522400');
INSERT INTO `sys_area` VALUES ('2520', '522601', '凯里市', '522600');
INSERT INTO `sys_area` VALUES ('2521', '522622', '黄平县', '522600');
INSERT INTO `sys_area` VALUES ('2522', '522623', '施秉县', '522600');
INSERT INTO `sys_area` VALUES ('2523', '522624', '三穗县', '522600');
INSERT INTO `sys_area` VALUES ('2524', '522625', '镇远县', '522600');
INSERT INTO `sys_area` VALUES ('2525', '522626', '岑巩县', '522600');
INSERT INTO `sys_area` VALUES ('2526', '522627', '天柱县', '522600');
INSERT INTO `sys_area` VALUES ('2527', '522628', '锦屏县', '522600');
INSERT INTO `sys_area` VALUES ('2528', '522629', '剑河县', '522600');
INSERT INTO `sys_area` VALUES ('2529', '522630', '台江县', '522600');
INSERT INTO `sys_area` VALUES ('2530', '522631', '黎平县', '522600');
INSERT INTO `sys_area` VALUES ('2531', '522632', '榕江县', '522600');
INSERT INTO `sys_area` VALUES ('2532', '522633', '从江县', '522600');
INSERT INTO `sys_area` VALUES ('2533', '522634', '雷山县', '522600');
INSERT INTO `sys_area` VALUES ('2534', '522635', '麻江县', '522600');
INSERT INTO `sys_area` VALUES ('2535', '522636', '丹寨县', '522600');
INSERT INTO `sys_area` VALUES ('2536', '522701', '都匀市', '522700');
INSERT INTO `sys_area` VALUES ('2537', '522702', '福泉市', '522700');
INSERT INTO `sys_area` VALUES ('2538', '522722', '荔波县', '522700');
INSERT INTO `sys_area` VALUES ('2539', '522723', '贵定县', '522700');
INSERT INTO `sys_area` VALUES ('2540', '522725', '瓮安县', '522700');
INSERT INTO `sys_area` VALUES ('2541', '522726', '独山县', '522700');
INSERT INTO `sys_area` VALUES ('2542', '522727', '平塘县', '522700');
INSERT INTO `sys_area` VALUES ('2543', '522728', '罗甸县', '522700');
INSERT INTO `sys_area` VALUES ('2544', '522729', '长顺县', '522700');
INSERT INTO `sys_area` VALUES ('2545', '522730', '龙里县', '522700');
INSERT INTO `sys_area` VALUES ('2546', '522731', '惠水县', '522700');
INSERT INTO `sys_area` VALUES ('2547', '522732', '三都水族自治县', '522700');
INSERT INTO `sys_area` VALUES ('2548', '530101', '市辖区', '530100');
INSERT INTO `sys_area` VALUES ('2549', '530102', '五华区', '530100');
INSERT INTO `sys_area` VALUES ('2550', '530103', '盘龙区', '530100');
INSERT INTO `sys_area` VALUES ('2551', '530111', '官渡区', '530100');
INSERT INTO `sys_area` VALUES ('2552', '530112', '西山区', '530100');
INSERT INTO `sys_area` VALUES ('2553', '530113', '东川区', '530100');
INSERT INTO `sys_area` VALUES ('2554', '530121', '呈贡县', '530100');
INSERT INTO `sys_area` VALUES ('2555', '530122', '晋宁县', '530100');
INSERT INTO `sys_area` VALUES ('2556', '530124', '富民县', '530100');
INSERT INTO `sys_area` VALUES ('2557', '530125', '宜良县', '530100');
INSERT INTO `sys_area` VALUES ('2558', '530126', '石林彝族自治县', '530100');
INSERT INTO `sys_area` VALUES ('2559', '530127', '嵩明县', '530100');
INSERT INTO `sys_area` VALUES ('2560', '530128', '禄劝彝族苗族自治县', '530100');
INSERT INTO `sys_area` VALUES ('2561', '530129', '寻甸回族彝族自治县', '530100');
INSERT INTO `sys_area` VALUES ('2562', '530181', '安宁市', '530100');
INSERT INTO `sys_area` VALUES ('2563', '530301', '市辖区', '530300');
INSERT INTO `sys_area` VALUES ('2564', '530302', '麒麟区', '530300');
INSERT INTO `sys_area` VALUES ('2565', '530321', '马龙县', '530300');
INSERT INTO `sys_area` VALUES ('2566', '530322', '陆良县', '530300');
INSERT INTO `sys_area` VALUES ('2567', '530323', '师宗县', '530300');
INSERT INTO `sys_area` VALUES ('2568', '530324', '罗平县', '530300');
INSERT INTO `sys_area` VALUES ('2569', '530325', '富源县', '530300');
INSERT INTO `sys_area` VALUES ('2570', '530326', '会泽县', '530300');
INSERT INTO `sys_area` VALUES ('2571', '530328', '沾益县', '530300');
INSERT INTO `sys_area` VALUES ('2572', '530381', '宣威市', '530300');
INSERT INTO `sys_area` VALUES ('2573', '530401', '市辖区', '530400');
INSERT INTO `sys_area` VALUES ('2574', '530402', '红塔区', '530400');
INSERT INTO `sys_area` VALUES ('2575', '530421', '江川县', '530400');
INSERT INTO `sys_area` VALUES ('2576', '530422', '澄江县', '530400');
INSERT INTO `sys_area` VALUES ('2577', '530423', '通海县', '530400');
INSERT INTO `sys_area` VALUES ('2578', '530424', '华宁县', '530400');
INSERT INTO `sys_area` VALUES ('2579', '530425', '易门县', '530400');
INSERT INTO `sys_area` VALUES ('2580', '530426', '峨山彝族自治县', '530400');
INSERT INTO `sys_area` VALUES ('2581', '530427', '新平彝族傣族自治县', '530400');
INSERT INTO `sys_area` VALUES ('2582', '530428', '元江哈尼族彝族傣族自治县', '530400');
INSERT INTO `sys_area` VALUES ('2583', '530501', '市辖区', '530500');
INSERT INTO `sys_area` VALUES ('2584', '530502', '隆阳区', '530500');
INSERT INTO `sys_area` VALUES ('2585', '530521', '施甸县', '530500');
INSERT INTO `sys_area` VALUES ('2586', '530522', '腾冲县', '530500');
INSERT INTO `sys_area` VALUES ('2587', '530523', '龙陵县', '530500');
INSERT INTO `sys_area` VALUES ('2588', '530524', '昌宁县', '530500');
INSERT INTO `sys_area` VALUES ('2589', '530601', '市辖区', '530600');
INSERT INTO `sys_area` VALUES ('2590', '530602', '昭阳区', '530600');
INSERT INTO `sys_area` VALUES ('2591', '530621', '鲁甸县', '530600');
INSERT INTO `sys_area` VALUES ('2592', '530622', '巧家县', '530600');
INSERT INTO `sys_area` VALUES ('2593', '530623', '盐津县', '530600');
INSERT INTO `sys_area` VALUES ('2594', '530624', '大关县', '530600');
INSERT INTO `sys_area` VALUES ('2595', '530625', '永善县', '530600');
INSERT INTO `sys_area` VALUES ('2596', '530626', '绥江县', '530600');
INSERT INTO `sys_area` VALUES ('2597', '530627', '镇雄县', '530600');
INSERT INTO `sys_area` VALUES ('2598', '530628', '彝良县', '530600');
INSERT INTO `sys_area` VALUES ('2599', '530629', '威信县', '530600');
INSERT INTO `sys_area` VALUES ('2600', '530630', '水富县', '530600');
INSERT INTO `sys_area` VALUES ('2601', '530701', '市辖区', '530700');
INSERT INTO `sys_area` VALUES ('2602', '530702', '古城区', '530700');
INSERT INTO `sys_area` VALUES ('2603', '530721', '玉龙纳西族自治县', '530700');
INSERT INTO `sys_area` VALUES ('2604', '530722', '永胜县', '530700');
INSERT INTO `sys_area` VALUES ('2605', '530723', '华坪县', '530700');
INSERT INTO `sys_area` VALUES ('2606', '530724', '宁蒗彝族自治县', '530700');
INSERT INTO `sys_area` VALUES ('2607', '530801', '市辖区', '530800');
INSERT INTO `sys_area` VALUES ('2608', '530802', '翠云区', '530800');
INSERT INTO `sys_area` VALUES ('2609', '530821', '普洱哈尼族彝族自治县', '530800');
INSERT INTO `sys_area` VALUES ('2610', '530822', '墨江哈尼族自治县', '530800');
INSERT INTO `sys_area` VALUES ('2611', '530823', '景东彝族自治县', '530800');
INSERT INTO `sys_area` VALUES ('2612', '530824', '景谷傣族彝族自治县', '530800');
INSERT INTO `sys_area` VALUES ('2613', '530825', '镇沅彝族哈尼族拉祜族自治县', '530800');
INSERT INTO `sys_area` VALUES ('2614', '530826', '江城哈尼族彝族自治县', '530800');
INSERT INTO `sys_area` VALUES ('2615', '530827', '孟连傣族拉祜族佤族自治县', '530800');
INSERT INTO `sys_area` VALUES ('2616', '530828', '澜沧拉祜族自治县', '530800');
INSERT INTO `sys_area` VALUES ('2617', '530829', '西盟佤族自治县', '530800');
INSERT INTO `sys_area` VALUES ('2618', '530901', '市辖区', '530900');
INSERT INTO `sys_area` VALUES ('2619', '530902', '临翔区', '530900');
INSERT INTO `sys_area` VALUES ('2620', '530921', '凤庆县', '530900');
INSERT INTO `sys_area` VALUES ('2621', '530922', '云　县', '530900');
INSERT INTO `sys_area` VALUES ('2622', '530923', '永德县', '530900');
INSERT INTO `sys_area` VALUES ('2623', '530924', '镇康县', '530900');
INSERT INTO `sys_area` VALUES ('2624', '530925', '双江拉祜族佤族布朗族傣族自治县', '530900');
INSERT INTO `sys_area` VALUES ('2625', '530926', '耿马傣族佤族自治县', '530900');
INSERT INTO `sys_area` VALUES ('2626', '530927', '沧源佤族自治县', '530900');
INSERT INTO `sys_area` VALUES ('2627', '532301', '楚雄市', '532300');
INSERT INTO `sys_area` VALUES ('2628', '532322', '双柏县', '532300');
INSERT INTO `sys_area` VALUES ('2629', '532323', '牟定县', '532300');
INSERT INTO `sys_area` VALUES ('2630', '532324', '南华县', '532300');
INSERT INTO `sys_area` VALUES ('2631', '532325', '姚安县', '532300');
INSERT INTO `sys_area` VALUES ('2632', '532326', '大姚县', '532300');
INSERT INTO `sys_area` VALUES ('2633', '532327', '永仁县', '532300');
INSERT INTO `sys_area` VALUES ('2634', '532328', '元谋县', '532300');
INSERT INTO `sys_area` VALUES ('2635', '532329', '武定县', '532300');
INSERT INTO `sys_area` VALUES ('2636', '532331', '禄丰县', '532300');
INSERT INTO `sys_area` VALUES ('2637', '532501', '个旧市', '532500');
INSERT INTO `sys_area` VALUES ('2638', '532502', '开远市', '532500');
INSERT INTO `sys_area` VALUES ('2639', '532522', '蒙自县', '532500');
INSERT INTO `sys_area` VALUES ('2640', '532523', '屏边苗族自治县', '532500');
INSERT INTO `sys_area` VALUES ('2641', '532524', '建水县', '532500');
INSERT INTO `sys_area` VALUES ('2642', '532525', '石屏县', '532500');
INSERT INTO `sys_area` VALUES ('2643', '532526', '弥勒县', '532500');
INSERT INTO `sys_area` VALUES ('2644', '532527', '泸西县', '532500');
INSERT INTO `sys_area` VALUES ('2645', '532528', '元阳县', '532500');
INSERT INTO `sys_area` VALUES ('2646', '532529', '红河县', '532500');
INSERT INTO `sys_area` VALUES ('2647', '532530', '金平苗族瑶族傣族自治县', '532500');
INSERT INTO `sys_area` VALUES ('2648', '532531', '绿春县', '532500');
INSERT INTO `sys_area` VALUES ('2649', '532532', '河口瑶族自治县', '532500');
INSERT INTO `sys_area` VALUES ('2650', '532621', '文山县', '532600');
INSERT INTO `sys_area` VALUES ('2651', '532622', '砚山县', '532600');
INSERT INTO `sys_area` VALUES ('2652', '532623', '西畴县', '532600');
INSERT INTO `sys_area` VALUES ('2653', '532624', '麻栗坡县', '532600');
INSERT INTO `sys_area` VALUES ('2654', '532625', '马关县', '532600');
INSERT INTO `sys_area` VALUES ('2655', '532626', '丘北县', '532600');
INSERT INTO `sys_area` VALUES ('2656', '532627', '广南县', '532600');
INSERT INTO `sys_area` VALUES ('2657', '532628', '富宁县', '532600');
INSERT INTO `sys_area` VALUES ('2658', '532801', '景洪市', '532800');
INSERT INTO `sys_area` VALUES ('2659', '532822', '勐海县', '532800');
INSERT INTO `sys_area` VALUES ('2660', '532823', '勐腊县', '532800');
INSERT INTO `sys_area` VALUES ('2661', '532901', '大理市', '532900');
INSERT INTO `sys_area` VALUES ('2662', '532922', '漾濞彝族自治县', '532900');
INSERT INTO `sys_area` VALUES ('2663', '532923', '祥云县', '532900');
INSERT INTO `sys_area` VALUES ('2664', '532924', '宾川县', '532900');
INSERT INTO `sys_area` VALUES ('2665', '532925', '弥渡县', '532900');
INSERT INTO `sys_area` VALUES ('2666', '532926', '南涧彝族自治县', '532900');
INSERT INTO `sys_area` VALUES ('2667', '532927', '巍山彝族回族自治县', '532900');
INSERT INTO `sys_area` VALUES ('2668', '532928', '永平县', '532900');
INSERT INTO `sys_area` VALUES ('2669', '532929', '云龙县', '532900');
INSERT INTO `sys_area` VALUES ('2670', '532930', '洱源县', '532900');
INSERT INTO `sys_area` VALUES ('2671', '532931', '剑川县', '532900');
INSERT INTO `sys_area` VALUES ('2672', '532932', '鹤庆县', '532900');
INSERT INTO `sys_area` VALUES ('2673', '533102', '瑞丽市', '533100');
INSERT INTO `sys_area` VALUES ('2674', '533103', '潞西市', '533100');
INSERT INTO `sys_area` VALUES ('2675', '533122', '梁河县', '533100');
INSERT INTO `sys_area` VALUES ('2676', '533123', '盈江县', '533100');
INSERT INTO `sys_area` VALUES ('2677', '533124', '陇川县', '533100');
INSERT INTO `sys_area` VALUES ('2678', '533321', '泸水县', '533300');
INSERT INTO `sys_area` VALUES ('2679', '533323', '福贡县', '533300');
INSERT INTO `sys_area` VALUES ('2680', '533324', '贡山独龙族怒族自治县', '533300');
INSERT INTO `sys_area` VALUES ('2681', '533325', '兰坪白族普米族自治县', '533300');
INSERT INTO `sys_area` VALUES ('2682', '533421', '香格里拉县', '533400');
INSERT INTO `sys_area` VALUES ('2683', '533422', '德钦县', '533400');
INSERT INTO `sys_area` VALUES ('2684', '533423', '维西傈僳族自治县', '533400');
INSERT INTO `sys_area` VALUES ('2685', '540101', '市辖区', '540100');
INSERT INTO `sys_area` VALUES ('2686', '540102', '城关区', '540100');
INSERT INTO `sys_area` VALUES ('2687', '540121', '林周县', '540100');
INSERT INTO `sys_area` VALUES ('2688', '540122', '当雄县', '540100');
INSERT INTO `sys_area` VALUES ('2689', '540123', '尼木县', '540100');
INSERT INTO `sys_area` VALUES ('2690', '540124', '曲水县', '540100');
INSERT INTO `sys_area` VALUES ('2691', '540125', '堆龙德庆县', '540100');
INSERT INTO `sys_area` VALUES ('2692', '540126', '达孜县', '540100');
INSERT INTO `sys_area` VALUES ('2693', '540127', '墨竹工卡县', '540100');
INSERT INTO `sys_area` VALUES ('2694', '542121', '昌都县', '542100');
INSERT INTO `sys_area` VALUES ('2695', '542122', '江达县', '542100');
INSERT INTO `sys_area` VALUES ('2696', '542123', '贡觉县', '542100');
INSERT INTO `sys_area` VALUES ('2697', '542124', '类乌齐县', '542100');
INSERT INTO `sys_area` VALUES ('2698', '542125', '丁青县', '542100');
INSERT INTO `sys_area` VALUES ('2699', '542126', '察雅县', '542100');
INSERT INTO `sys_area` VALUES ('2700', '542127', '八宿县', '542100');
INSERT INTO `sys_area` VALUES ('2701', '542128', '左贡县', '542100');
INSERT INTO `sys_area` VALUES ('2702', '542129', '芒康县', '542100');
INSERT INTO `sys_area` VALUES ('2703', '542132', '洛隆县', '542100');
INSERT INTO `sys_area` VALUES ('2704', '542133', '边坝县', '542100');
INSERT INTO `sys_area` VALUES ('2705', '542221', '乃东县', '542200');
INSERT INTO `sys_area` VALUES ('2706', '542222', '扎囊县', '542200');
INSERT INTO `sys_area` VALUES ('2707', '542223', '贡嘎县', '542200');
INSERT INTO `sys_area` VALUES ('2708', '542224', '桑日县', '542200');
INSERT INTO `sys_area` VALUES ('2709', '542225', '琼结县', '542200');
INSERT INTO `sys_area` VALUES ('2710', '542226', '曲松县', '542200');
INSERT INTO `sys_area` VALUES ('2711', '542227', '措美县', '542200');
INSERT INTO `sys_area` VALUES ('2712', '542228', '洛扎县', '542200');
INSERT INTO `sys_area` VALUES ('2713', '542229', '加查县', '542200');
INSERT INTO `sys_area` VALUES ('2714', '542231', '隆子县', '542200');
INSERT INTO `sys_area` VALUES ('2715', '542232', '错那县', '542200');
INSERT INTO `sys_area` VALUES ('2716', '542233', '浪卡子县', '542200');
INSERT INTO `sys_area` VALUES ('2717', '542301', '日喀则市', '542300');
INSERT INTO `sys_area` VALUES ('2718', '542322', '南木林县', '542300');
INSERT INTO `sys_area` VALUES ('2719', '542323', '江孜县', '542300');
INSERT INTO `sys_area` VALUES ('2720', '542324', '定日县', '542300');
INSERT INTO `sys_area` VALUES ('2721', '542325', '萨迦县', '542300');
INSERT INTO `sys_area` VALUES ('2722', '542326', '拉孜县', '542300');
INSERT INTO `sys_area` VALUES ('2723', '542327', '昂仁县', '542300');
INSERT INTO `sys_area` VALUES ('2724', '542328', '谢通门县', '542300');
INSERT INTO `sys_area` VALUES ('2725', '542329', '白朗县', '542300');
INSERT INTO `sys_area` VALUES ('2726', '542330', '仁布县', '542300');
INSERT INTO `sys_area` VALUES ('2727', '542331', '康马县', '542300');
INSERT INTO `sys_area` VALUES ('2728', '542332', '定结县', '542300');
INSERT INTO `sys_area` VALUES ('2729', '542333', '仲巴县', '542300');
INSERT INTO `sys_area` VALUES ('2730', '542334', '亚东县', '542300');
INSERT INTO `sys_area` VALUES ('2731', '542335', '吉隆县', '542300');
INSERT INTO `sys_area` VALUES ('2732', '542336', '聂拉木县', '542300');
INSERT INTO `sys_area` VALUES ('2733', '542337', '萨嘎县', '542300');
INSERT INTO `sys_area` VALUES ('2734', '542338', '岗巴县', '542300');
INSERT INTO `sys_area` VALUES ('2735', '542421', '那曲县', '542400');
INSERT INTO `sys_area` VALUES ('2736', '542422', '嘉黎县', '542400');
INSERT INTO `sys_area` VALUES ('2737', '542423', '比如县', '542400');
INSERT INTO `sys_area` VALUES ('2738', '542424', '聂荣县', '542400');
INSERT INTO `sys_area` VALUES ('2739', '542425', '安多县', '542400');
INSERT INTO `sys_area` VALUES ('2740', '542426', '申扎县', '542400');
INSERT INTO `sys_area` VALUES ('2741', '542427', '索　县', '542400');
INSERT INTO `sys_area` VALUES ('2742', '542428', '班戈县', '542400');
INSERT INTO `sys_area` VALUES ('2743', '542429', '巴青县', '542400');
INSERT INTO `sys_area` VALUES ('2744', '542430', '尼玛县', '542400');
INSERT INTO `sys_area` VALUES ('2745', '542521', '普兰县', '542500');
INSERT INTO `sys_area` VALUES ('2746', '542522', '札达县', '542500');
INSERT INTO `sys_area` VALUES ('2747', '542523', '噶尔县', '542500');
INSERT INTO `sys_area` VALUES ('2748', '542524', '日土县', '542500');
INSERT INTO `sys_area` VALUES ('2749', '542525', '革吉县', '542500');
INSERT INTO `sys_area` VALUES ('2750', '542526', '改则县', '542500');
INSERT INTO `sys_area` VALUES ('2751', '542527', '措勤县', '542500');
INSERT INTO `sys_area` VALUES ('2752', '542621', '林芝县', '542600');
INSERT INTO `sys_area` VALUES ('2753', '542622', '工布江达县', '542600');
INSERT INTO `sys_area` VALUES ('2754', '542623', '米林县', '542600');
INSERT INTO `sys_area` VALUES ('2755', '542624', '墨脱县', '542600');
INSERT INTO `sys_area` VALUES ('2756', '542625', '波密县', '542600');
INSERT INTO `sys_area` VALUES ('2757', '542626', '察隅县', '542600');
INSERT INTO `sys_area` VALUES ('2758', '542627', '朗　县', '542600');
INSERT INTO `sys_area` VALUES ('2759', '610101', '市辖区', '610100');
INSERT INTO `sys_area` VALUES ('2760', '610102', '新城区', '610100');
INSERT INTO `sys_area` VALUES ('2761', '610103', '碑林区', '610100');
INSERT INTO `sys_area` VALUES ('2762', '610104', '莲湖区', '610100');
INSERT INTO `sys_area` VALUES ('2763', '610111', '灞桥区', '610100');
INSERT INTO `sys_area` VALUES ('2764', '610112', '未央区', '610100');
INSERT INTO `sys_area` VALUES ('2765', '610113', '雁塔区', '610100');
INSERT INTO `sys_area` VALUES ('2766', '610114', '阎良区', '610100');
INSERT INTO `sys_area` VALUES ('2767', '610115', '临潼区', '610100');
INSERT INTO `sys_area` VALUES ('2768', '610116', '长安区', '610100');
INSERT INTO `sys_area` VALUES ('2769', '610122', '蓝田县', '610100');
INSERT INTO `sys_area` VALUES ('2770', '610124', '周至县', '610100');
INSERT INTO `sys_area` VALUES ('2771', '610125', '户　县', '610100');
INSERT INTO `sys_area` VALUES ('2772', '610126', '高陵县', '610100');
INSERT INTO `sys_area` VALUES ('2773', '610201', '市辖区', '610200');
INSERT INTO `sys_area` VALUES ('2774', '610202', '王益区', '610200');
INSERT INTO `sys_area` VALUES ('2775', '610203', '印台区', '610200');
INSERT INTO `sys_area` VALUES ('2776', '610204', '耀州区', '610200');
INSERT INTO `sys_area` VALUES ('2777', '610222', '宜君县', '610200');
INSERT INTO `sys_area` VALUES ('2778', '610301', '市辖区', '610300');
INSERT INTO `sys_area` VALUES ('2779', '610302', '渭滨区', '610300');
INSERT INTO `sys_area` VALUES ('2780', '610303', '金台区', '610300');
INSERT INTO `sys_area` VALUES ('2781', '610304', '陈仓区', '610300');
INSERT INTO `sys_area` VALUES ('2782', '610322', '凤翔县', '610300');
INSERT INTO `sys_area` VALUES ('2783', '610323', '岐山县', '610300');
INSERT INTO `sys_area` VALUES ('2784', '610324', '扶风县', '610300');
INSERT INTO `sys_area` VALUES ('2785', '610326', '眉　县', '610300');
INSERT INTO `sys_area` VALUES ('2786', '610327', '陇　县', '610300');
INSERT INTO `sys_area` VALUES ('2787', '610328', '千阳县', '610300');
INSERT INTO `sys_area` VALUES ('2788', '610329', '麟游县', '610300');
INSERT INTO `sys_area` VALUES ('2789', '610330', '凤　县', '610300');
INSERT INTO `sys_area` VALUES ('2790', '610331', '太白县', '610300');
INSERT INTO `sys_area` VALUES ('2791', '610401', '市辖区', '610400');
INSERT INTO `sys_area` VALUES ('2792', '610402', '秦都区', '610400');
INSERT INTO `sys_area` VALUES ('2793', '610403', '杨凌区', '610400');
INSERT INTO `sys_area` VALUES ('2794', '610404', '渭城区', '610400');
INSERT INTO `sys_area` VALUES ('2795', '610422', '三原县', '610400');
INSERT INTO `sys_area` VALUES ('2796', '610423', '泾阳县', '610400');
INSERT INTO `sys_area` VALUES ('2797', '610424', '乾　县', '610400');
INSERT INTO `sys_area` VALUES ('2798', '610425', '礼泉县', '610400');
INSERT INTO `sys_area` VALUES ('2799', '610426', '永寿县', '610400');
INSERT INTO `sys_area` VALUES ('2800', '610427', '彬　县', '610400');
INSERT INTO `sys_area` VALUES ('2801', '610428', '长武县', '610400');
INSERT INTO `sys_area` VALUES ('2802', '610429', '旬邑县', '610400');
INSERT INTO `sys_area` VALUES ('2803', '610430', '淳化县', '610400');
INSERT INTO `sys_area` VALUES ('2804', '610431', '武功县', '610400');
INSERT INTO `sys_area` VALUES ('2805', '610481', '兴平市', '610400');
INSERT INTO `sys_area` VALUES ('2806', '610501', '市辖区', '610500');
INSERT INTO `sys_area` VALUES ('2807', '610502', '临渭区', '610500');
INSERT INTO `sys_area` VALUES ('2808', '610521', '华　县', '610500');
INSERT INTO `sys_area` VALUES ('2809', '610522', '潼关县', '610500');
INSERT INTO `sys_area` VALUES ('2810', '610523', '大荔县', '610500');
INSERT INTO `sys_area` VALUES ('2811', '610524', '合阳县', '610500');
INSERT INTO `sys_area` VALUES ('2812', '610525', '澄城县', '610500');
INSERT INTO `sys_area` VALUES ('2813', '610526', '蒲城县', '610500');
INSERT INTO `sys_area` VALUES ('2814', '610527', '白水县', '610500');
INSERT INTO `sys_area` VALUES ('2815', '610528', '富平县', '610500');
INSERT INTO `sys_area` VALUES ('2816', '610581', '韩城市', '610500');
INSERT INTO `sys_area` VALUES ('2817', '610582', '华阴市', '610500');
INSERT INTO `sys_area` VALUES ('2818', '610601', '市辖区', '610600');
INSERT INTO `sys_area` VALUES ('2819', '610602', '宝塔区', '610600');
INSERT INTO `sys_area` VALUES ('2820', '610621', '延长县', '610600');
INSERT INTO `sys_area` VALUES ('2821', '610622', '延川县', '610600');
INSERT INTO `sys_area` VALUES ('2822', '610623', '子长县', '610600');
INSERT INTO `sys_area` VALUES ('2823', '610624', '安塞县', '610600');
INSERT INTO `sys_area` VALUES ('2824', '610625', '志丹县', '610600');
INSERT INTO `sys_area` VALUES ('2825', '610626', '吴旗县', '610600');
INSERT INTO `sys_area` VALUES ('2826', '610627', '甘泉县', '610600');
INSERT INTO `sys_area` VALUES ('2827', '610628', '富　县', '610600');
INSERT INTO `sys_area` VALUES ('2828', '610629', '洛川县', '610600');
INSERT INTO `sys_area` VALUES ('2829', '610630', '宜川县', '610600');
INSERT INTO `sys_area` VALUES ('2830', '610631', '黄龙县', '610600');
INSERT INTO `sys_area` VALUES ('2831', '610632', '黄陵县', '610600');
INSERT INTO `sys_area` VALUES ('2832', '610701', '市辖区', '610700');
INSERT INTO `sys_area` VALUES ('2833', '610702', '汉台区', '610700');
INSERT INTO `sys_area` VALUES ('2834', '610721', '南郑县', '610700');
INSERT INTO `sys_area` VALUES ('2835', '610722', '城固县', '610700');
INSERT INTO `sys_area` VALUES ('2836', '610723', '洋　县', '610700');
INSERT INTO `sys_area` VALUES ('2837', '610724', '西乡县', '610700');
INSERT INTO `sys_area` VALUES ('2838', '610725', '勉　县', '610700');
INSERT INTO `sys_area` VALUES ('2839', '610726', '宁强县', '610700');
INSERT INTO `sys_area` VALUES ('2840', '610727', '略阳县', '610700');
INSERT INTO `sys_area` VALUES ('2841', '610728', '镇巴县', '610700');
INSERT INTO `sys_area` VALUES ('2842', '610729', '留坝县', '610700');
INSERT INTO `sys_area` VALUES ('2843', '610730', '佛坪县', '610700');
INSERT INTO `sys_area` VALUES ('2844', '610801', '市辖区', '610800');
INSERT INTO `sys_area` VALUES ('2845', '610802', '榆阳区', '610800');
INSERT INTO `sys_area` VALUES ('2846', '610821', '神木县', '610800');
INSERT INTO `sys_area` VALUES ('2847', '610822', '府谷县', '610800');
INSERT INTO `sys_area` VALUES ('2848', '610823', '横山县', '610800');
INSERT INTO `sys_area` VALUES ('2849', '610824', '靖边县', '610800');
INSERT INTO `sys_area` VALUES ('2850', '610825', '定边县', '610800');
INSERT INTO `sys_area` VALUES ('2851', '610826', '绥德县', '610800');
INSERT INTO `sys_area` VALUES ('2852', '610827', '米脂县', '610800');
INSERT INTO `sys_area` VALUES ('2853', '610828', '佳　县', '610800');
INSERT INTO `sys_area` VALUES ('2854', '610829', '吴堡县', '610800');
INSERT INTO `sys_area` VALUES ('2855', '610830', '清涧县', '610800');
INSERT INTO `sys_area` VALUES ('2856', '610831', '子洲县', '610800');
INSERT INTO `sys_area` VALUES ('2857', '610901', '市辖区', '610900');
INSERT INTO `sys_area` VALUES ('2858', '610902', '汉滨区', '610900');
INSERT INTO `sys_area` VALUES ('2859', '610921', '汉阴县', '610900');
INSERT INTO `sys_area` VALUES ('2860', '610922', '石泉县', '610900');
INSERT INTO `sys_area` VALUES ('2861', '610923', '宁陕县', '610900');
INSERT INTO `sys_area` VALUES ('2862', '610924', '紫阳县', '610900');
INSERT INTO `sys_area` VALUES ('2863', '610925', '岚皋县', '610900');
INSERT INTO `sys_area` VALUES ('2864', '610926', '平利县', '610900');
INSERT INTO `sys_area` VALUES ('2865', '610927', '镇坪县', '610900');
INSERT INTO `sys_area` VALUES ('2866', '610928', '旬阳县', '610900');
INSERT INTO `sys_area` VALUES ('2867', '610929', '白河县', '610900');
INSERT INTO `sys_area` VALUES ('2868', '611001', '市辖区', '611000');
INSERT INTO `sys_area` VALUES ('2869', '611002', '商州区', '611000');
INSERT INTO `sys_area` VALUES ('2870', '611021', '洛南县', '611000');
INSERT INTO `sys_area` VALUES ('2871', '611022', '丹凤县', '611000');
INSERT INTO `sys_area` VALUES ('2872', '611023', '商南县', '611000');
INSERT INTO `sys_area` VALUES ('2873', '611024', '山阳县', '611000');
INSERT INTO `sys_area` VALUES ('2874', '611025', '镇安县', '611000');
INSERT INTO `sys_area` VALUES ('2875', '611026', '柞水县', '611000');
INSERT INTO `sys_area` VALUES ('2876', '620101', '市辖区', '620100');
INSERT INTO `sys_area` VALUES ('2877', '620102', '城关区', '620100');
INSERT INTO `sys_area` VALUES ('2878', '620103', '七里河区', '620100');
INSERT INTO `sys_area` VALUES ('2879', '620104', '西固区', '620100');
INSERT INTO `sys_area` VALUES ('2880', '620105', '安宁区', '620100');
INSERT INTO `sys_area` VALUES ('2881', '620111', '红古区', '620100');
INSERT INTO `sys_area` VALUES ('2882', '620121', '永登县', '620100');
INSERT INTO `sys_area` VALUES ('2883', '620122', '皋兰县', '620100');
INSERT INTO `sys_area` VALUES ('2884', '620123', '榆中县', '620100');
INSERT INTO `sys_area` VALUES ('2885', '620201', '市辖区', '620200');
INSERT INTO `sys_area` VALUES ('2886', '620301', '市辖区', '620300');
INSERT INTO `sys_area` VALUES ('2887', '620302', '金川区', '620300');
INSERT INTO `sys_area` VALUES ('2888', '620321', '永昌县', '620300');
INSERT INTO `sys_area` VALUES ('2889', '620401', '市辖区', '620400');
INSERT INTO `sys_area` VALUES ('2890', '620402', '白银区', '620400');
INSERT INTO `sys_area` VALUES ('2891', '620403', '平川区', '620400');
INSERT INTO `sys_area` VALUES ('2892', '620421', '靖远县', '620400');
INSERT INTO `sys_area` VALUES ('2893', '620422', '会宁县', '620400');
INSERT INTO `sys_area` VALUES ('2894', '620423', '景泰县', '620400');
INSERT INTO `sys_area` VALUES ('2895', '620501', '市辖区', '620500');
INSERT INTO `sys_area` VALUES ('2896', '620502', '秦城区', '620500');
INSERT INTO `sys_area` VALUES ('2897', '620503', '北道区', '620500');
INSERT INTO `sys_area` VALUES ('2898', '620521', '清水县', '620500');
INSERT INTO `sys_area` VALUES ('2899', '620522', '秦安县', '620500');
INSERT INTO `sys_area` VALUES ('2900', '620523', '甘谷县', '620500');
INSERT INTO `sys_area` VALUES ('2901', '620524', '武山县', '620500');
INSERT INTO `sys_area` VALUES ('2902', '620525', '张家川回族自治县', '620500');
INSERT INTO `sys_area` VALUES ('2903', '620601', '市辖区', '620600');
INSERT INTO `sys_area` VALUES ('2904', '620602', '凉州区', '620600');
INSERT INTO `sys_area` VALUES ('2905', '620621', '民勤县', '620600');
INSERT INTO `sys_area` VALUES ('2906', '620622', '古浪县', '620600');
INSERT INTO `sys_area` VALUES ('2907', '620623', '天祝藏族自治县', '620600');
INSERT INTO `sys_area` VALUES ('2908', '620701', '市辖区', '620700');
INSERT INTO `sys_area` VALUES ('2909', '620702', '甘州区', '620700');
INSERT INTO `sys_area` VALUES ('2910', '620721', '肃南裕固族自治县', '620700');
INSERT INTO `sys_area` VALUES ('2911', '620722', '民乐县', '620700');
INSERT INTO `sys_area` VALUES ('2912', '620723', '临泽县', '620700');
INSERT INTO `sys_area` VALUES ('2913', '620724', '高台县', '620700');
INSERT INTO `sys_area` VALUES ('2914', '620725', '山丹县', '620700');
INSERT INTO `sys_area` VALUES ('2915', '620801', '市辖区', '620800');
INSERT INTO `sys_area` VALUES ('2916', '620802', '崆峒区', '620800');
INSERT INTO `sys_area` VALUES ('2917', '620821', '泾川县', '620800');
INSERT INTO `sys_area` VALUES ('2918', '620822', '灵台县', '620800');
INSERT INTO `sys_area` VALUES ('2919', '620823', '崇信县', '620800');
INSERT INTO `sys_area` VALUES ('2920', '620824', '华亭县', '620800');
INSERT INTO `sys_area` VALUES ('2921', '620825', '庄浪县', '620800');
INSERT INTO `sys_area` VALUES ('2922', '620826', '静宁县', '620800');
INSERT INTO `sys_area` VALUES ('2923', '620901', '市辖区', '620900');
INSERT INTO `sys_area` VALUES ('2924', '620902', '肃州区', '620900');
INSERT INTO `sys_area` VALUES ('2925', '620921', '金塔县', '620900');
INSERT INTO `sys_area` VALUES ('2926', '620922', '安西县', '620900');
INSERT INTO `sys_area` VALUES ('2927', '620923', '肃北蒙古族自治县', '620900');
INSERT INTO `sys_area` VALUES ('2928', '620924', '阿克塞哈萨克族自治县', '620900');
INSERT INTO `sys_area` VALUES ('2929', '620981', '玉门市', '620900');
INSERT INTO `sys_area` VALUES ('2930', '620982', '敦煌市', '620900');
INSERT INTO `sys_area` VALUES ('2931', '621001', '市辖区', '621000');
INSERT INTO `sys_area` VALUES ('2932', '621002', '西峰区', '621000');
INSERT INTO `sys_area` VALUES ('2933', '621021', '庆城县', '621000');
INSERT INTO `sys_area` VALUES ('2934', '621022', '环　县', '621000');
INSERT INTO `sys_area` VALUES ('2935', '621023', '华池县', '621000');
INSERT INTO `sys_area` VALUES ('2936', '621024', '合水县', '621000');
INSERT INTO `sys_area` VALUES ('2937', '621025', '正宁县', '621000');
INSERT INTO `sys_area` VALUES ('2938', '621026', '宁　县', '621000');
INSERT INTO `sys_area` VALUES ('2939', '621027', '镇原县', '621000');
INSERT INTO `sys_area` VALUES ('2940', '621101', '市辖区', '621100');
INSERT INTO `sys_area` VALUES ('2941', '621102', '安定区', '621100');
INSERT INTO `sys_area` VALUES ('2942', '621121', '通渭县', '621100');
INSERT INTO `sys_area` VALUES ('2943', '621122', '陇西县', '621100');
INSERT INTO `sys_area` VALUES ('2944', '621123', '渭源县', '621100');
INSERT INTO `sys_area` VALUES ('2945', '621124', '临洮县', '621100');
INSERT INTO `sys_area` VALUES ('2946', '621125', '漳　县', '621100');
INSERT INTO `sys_area` VALUES ('2947', '621126', '岷　县', '621100');
INSERT INTO `sys_area` VALUES ('2948', '621201', '市辖区', '621200');
INSERT INTO `sys_area` VALUES ('2949', '621202', '武都区', '621200');
INSERT INTO `sys_area` VALUES ('2950', '621221', '成　县', '621200');
INSERT INTO `sys_area` VALUES ('2951', '621222', '文　县', '621200');
INSERT INTO `sys_area` VALUES ('2952', '621223', '宕昌县', '621200');
INSERT INTO `sys_area` VALUES ('2953', '621224', '康　县', '621200');
INSERT INTO `sys_area` VALUES ('2954', '621225', '西和县', '621200');
INSERT INTO `sys_area` VALUES ('2955', '621226', '礼　县', '621200');
INSERT INTO `sys_area` VALUES ('2956', '621227', '徽　县', '621200');
INSERT INTO `sys_area` VALUES ('2957', '621228', '两当县', '621200');
INSERT INTO `sys_area` VALUES ('2958', '622901', '临夏市', '622900');
INSERT INTO `sys_area` VALUES ('2959', '622921', '临夏县', '622900');
INSERT INTO `sys_area` VALUES ('2960', '622922', '康乐县', '622900');
INSERT INTO `sys_area` VALUES ('2961', '622923', '永靖县', '622900');
INSERT INTO `sys_area` VALUES ('2962', '622924', '广河县', '622900');
INSERT INTO `sys_area` VALUES ('2963', '622925', '和政县', '622900');
INSERT INTO `sys_area` VALUES ('2964', '622926', '东乡族自治县', '622900');
INSERT INTO `sys_area` VALUES ('2965', '622927', '积石山保安族东乡族撒拉族自治县', '622900');
INSERT INTO `sys_area` VALUES ('2966', '623001', '合作市', '623000');
INSERT INTO `sys_area` VALUES ('2967', '623021', '临潭县', '623000');
INSERT INTO `sys_area` VALUES ('2968', '623022', '卓尼县', '623000');
INSERT INTO `sys_area` VALUES ('2969', '623023', '舟曲县', '623000');
INSERT INTO `sys_area` VALUES ('2970', '623024', '迭部县', '623000');
INSERT INTO `sys_area` VALUES ('2971', '623025', '玛曲县', '623000');
INSERT INTO `sys_area` VALUES ('2972', '623026', '碌曲县', '623000');
INSERT INTO `sys_area` VALUES ('2973', '623027', '夏河县', '623000');
INSERT INTO `sys_area` VALUES ('2974', '630101', '市辖区', '630100');
INSERT INTO `sys_area` VALUES ('2975', '630102', '城东区', '630100');
INSERT INTO `sys_area` VALUES ('2976', '630103', '城中区', '630100');
INSERT INTO `sys_area` VALUES ('2977', '630104', '城西区', '630100');
INSERT INTO `sys_area` VALUES ('2978', '630105', '城北区', '630100');
INSERT INTO `sys_area` VALUES ('2979', '630121', '大通回族土族自治县', '630100');
INSERT INTO `sys_area` VALUES ('2980', '630122', '湟中县', '630100');
INSERT INTO `sys_area` VALUES ('2981', '630123', '湟源县', '630100');
INSERT INTO `sys_area` VALUES ('2982', '632121', '平安县', '632100');
INSERT INTO `sys_area` VALUES ('2983', '632122', '民和回族土族自治县', '632100');
INSERT INTO `sys_area` VALUES ('2984', '632123', '乐都县', '632100');
INSERT INTO `sys_area` VALUES ('2985', '632126', '互助土族自治县', '632100');
INSERT INTO `sys_area` VALUES ('2986', '632127', '化隆回族自治县', '632100');
INSERT INTO `sys_area` VALUES ('2987', '632128', '循化撒拉族自治县', '632100');
INSERT INTO `sys_area` VALUES ('2988', '632221', '门源回族自治县', '632200');
INSERT INTO `sys_area` VALUES ('2989', '632222', '祁连县', '632200');
INSERT INTO `sys_area` VALUES ('2990', '632223', '海晏县', '632200');
INSERT INTO `sys_area` VALUES ('2991', '632224', '刚察县', '632200');
INSERT INTO `sys_area` VALUES ('2992', '632321', '同仁县', '632300');
INSERT INTO `sys_area` VALUES ('2993', '632322', '尖扎县', '632300');
INSERT INTO `sys_area` VALUES ('2994', '632323', '泽库县', '632300');
INSERT INTO `sys_area` VALUES ('2995', '632324', '河南蒙古族自治县', '632300');
INSERT INTO `sys_area` VALUES ('2996', '632521', '共和县', '632500');
INSERT INTO `sys_area` VALUES ('2997', '632522', '同德县', '632500');
INSERT INTO `sys_area` VALUES ('2998', '632523', '贵德县', '632500');
INSERT INTO `sys_area` VALUES ('2999', '632524', '兴海县', '632500');
INSERT INTO `sys_area` VALUES ('3000', '632525', '贵南县', '632500');
INSERT INTO `sys_area` VALUES ('3001', '632621', '玛沁县', '632600');
INSERT INTO `sys_area` VALUES ('3002', '632622', '班玛县', '632600');
INSERT INTO `sys_area` VALUES ('3003', '632623', '甘德县', '632600');
INSERT INTO `sys_area` VALUES ('3004', '632624', '达日县', '632600');
INSERT INTO `sys_area` VALUES ('3005', '632625', '久治县', '632600');
INSERT INTO `sys_area` VALUES ('3006', '632626', '玛多县', '632600');
INSERT INTO `sys_area` VALUES ('3007', '632721', '玉树县', '632700');
INSERT INTO `sys_area` VALUES ('3008', '632722', '杂多县', '632700');
INSERT INTO `sys_area` VALUES ('3009', '632723', '称多县', '632700');
INSERT INTO `sys_area` VALUES ('3010', '632724', '治多县', '632700');
INSERT INTO `sys_area` VALUES ('3011', '632725', '囊谦县', '632700');
INSERT INTO `sys_area` VALUES ('3012', '632726', '曲麻莱县', '632700');
INSERT INTO `sys_area` VALUES ('3013', '632801', '格尔木市', '632800');
INSERT INTO `sys_area` VALUES ('3014', '632802', '德令哈市', '632800');
INSERT INTO `sys_area` VALUES ('3015', '632821', '乌兰县', '632800');
INSERT INTO `sys_area` VALUES ('3016', '632822', '都兰县', '632800');
INSERT INTO `sys_area` VALUES ('3017', '632823', '天峻县', '632800');
INSERT INTO `sys_area` VALUES ('3018', '640101', '市辖区', '640100');
INSERT INTO `sys_area` VALUES ('3019', '640104', '兴庆区', '640100');
INSERT INTO `sys_area` VALUES ('3020', '640105', '西夏区', '640100');
INSERT INTO `sys_area` VALUES ('3021', '640106', '金凤区', '640100');
INSERT INTO `sys_area` VALUES ('3022', '640121', '永宁县', '640100');
INSERT INTO `sys_area` VALUES ('3023', '640122', '贺兰县', '640100');
INSERT INTO `sys_area` VALUES ('3024', '640181', '灵武市', '640100');
INSERT INTO `sys_area` VALUES ('3025', '640201', '市辖区', '640200');
INSERT INTO `sys_area` VALUES ('3026', '640202', '大武口区', '640200');
INSERT INTO `sys_area` VALUES ('3027', '640205', '惠农区', '640200');
INSERT INTO `sys_area` VALUES ('3028', '640221', '平罗县', '640200');
INSERT INTO `sys_area` VALUES ('3029', '640301', '市辖区', '640300');
INSERT INTO `sys_area` VALUES ('3030', '640302', '利通区', '640300');
INSERT INTO `sys_area` VALUES ('3031', '640323', '盐池县', '640300');
INSERT INTO `sys_area` VALUES ('3032', '640324', '同心县', '640300');
INSERT INTO `sys_area` VALUES ('3033', '640381', '青铜峡市', '640300');
INSERT INTO `sys_area` VALUES ('3034', '640401', '市辖区', '640400');
INSERT INTO `sys_area` VALUES ('3035', '640402', '原州区', '640400');
INSERT INTO `sys_area` VALUES ('3036', '640422', '西吉县', '640400');
INSERT INTO `sys_area` VALUES ('3037', '640423', '隆德县', '640400');
INSERT INTO `sys_area` VALUES ('3038', '640424', '泾源县', '640400');
INSERT INTO `sys_area` VALUES ('3039', '640425', '彭阳县', '640400');
INSERT INTO `sys_area` VALUES ('3040', '640501', '市辖区', '640500');
INSERT INTO `sys_area` VALUES ('3041', '640502', '沙坡头区', '640500');
INSERT INTO `sys_area` VALUES ('3042', '640521', '中宁县', '640500');
INSERT INTO `sys_area` VALUES ('3043', '640522', '海原县', '640500');
INSERT INTO `sys_area` VALUES ('3044', '650101', '市辖区', '650100');
INSERT INTO `sys_area` VALUES ('3045', '650102', '天山区', '650100');
INSERT INTO `sys_area` VALUES ('3046', '650103', '沙依巴克区', '650100');
INSERT INTO `sys_area` VALUES ('3047', '650104', '新市区', '650100');
INSERT INTO `sys_area` VALUES ('3048', '650105', '水磨沟区', '650100');
INSERT INTO `sys_area` VALUES ('3049', '650106', '头屯河区', '650100');
INSERT INTO `sys_area` VALUES ('3050', '650107', '达坂城区', '650100');
INSERT INTO `sys_area` VALUES ('3051', '650108', '东山区', '650100');
INSERT INTO `sys_area` VALUES ('3052', '650121', '乌鲁木齐县', '650100');
INSERT INTO `sys_area` VALUES ('3053', '650201', '市辖区', '650200');
INSERT INTO `sys_area` VALUES ('3054', '650202', '独山子区', '650200');
INSERT INTO `sys_area` VALUES ('3055', '650203', '克拉玛依区', '650200');
INSERT INTO `sys_area` VALUES ('3056', '650204', '白碱滩区', '650200');
INSERT INTO `sys_area` VALUES ('3057', '650205', '乌尔禾区', '650200');
INSERT INTO `sys_area` VALUES ('3058', '652101', '吐鲁番市', '652100');
INSERT INTO `sys_area` VALUES ('3059', '652122', '鄯善县', '652100');
INSERT INTO `sys_area` VALUES ('3060', '652123', '托克逊县', '652100');
INSERT INTO `sys_area` VALUES ('3061', '652201', '哈密市', '652200');
INSERT INTO `sys_area` VALUES ('3062', '652222', '巴里坤哈萨克自治县', '652200');
INSERT INTO `sys_area` VALUES ('3063', '652223', '伊吾县', '652200');
INSERT INTO `sys_area` VALUES ('3064', '652301', '昌吉市', '652300');
INSERT INTO `sys_area` VALUES ('3065', '652302', '阜康市', '652300');
INSERT INTO `sys_area` VALUES ('3066', '652303', '米泉市', '652300');
INSERT INTO `sys_area` VALUES ('3067', '652323', '呼图壁县', '652300');
INSERT INTO `sys_area` VALUES ('3068', '652324', '玛纳斯县', '652300');
INSERT INTO `sys_area` VALUES ('3069', '652325', '奇台县', '652300');
INSERT INTO `sys_area` VALUES ('3070', '652327', '吉木萨尔县', '652300');
INSERT INTO `sys_area` VALUES ('3071', '652328', '木垒哈萨克自治县', '652300');
INSERT INTO `sys_area` VALUES ('3072', '652701', '博乐市', '652700');
INSERT INTO `sys_area` VALUES ('3073', '652722', '精河县', '652700');
INSERT INTO `sys_area` VALUES ('3074', '652723', '温泉县', '652700');
INSERT INTO `sys_area` VALUES ('3075', '652801', '库尔勒市', '652800');
INSERT INTO `sys_area` VALUES ('3076', '652822', '轮台县', '652800');
INSERT INTO `sys_area` VALUES ('3077', '652823', '尉犁县', '652800');
INSERT INTO `sys_area` VALUES ('3078', '652824', '若羌县', '652800');
INSERT INTO `sys_area` VALUES ('3079', '652825', '且末县', '652800');
INSERT INTO `sys_area` VALUES ('3080', '652826', '焉耆回族自治县', '652800');
INSERT INTO `sys_area` VALUES ('3081', '652827', '和静县', '652800');
INSERT INTO `sys_area` VALUES ('3082', '652828', '和硕县', '652800');
INSERT INTO `sys_area` VALUES ('3083', '652829', '博湖县', '652800');
INSERT INTO `sys_area` VALUES ('3084', '652901', '阿克苏市', '652900');
INSERT INTO `sys_area` VALUES ('3085', '652922', '温宿县', '652900');
INSERT INTO `sys_area` VALUES ('3086', '652923', '库车县', '652900');
INSERT INTO `sys_area` VALUES ('3087', '652924', '沙雅县', '652900');
INSERT INTO `sys_area` VALUES ('3088', '652925', '新和县', '652900');
INSERT INTO `sys_area` VALUES ('3089', '652926', '拜城县', '652900');
INSERT INTO `sys_area` VALUES ('3090', '652927', '乌什县', '652900');
INSERT INTO `sys_area` VALUES ('3091', '652928', '阿瓦提县', '652900');
INSERT INTO `sys_area` VALUES ('3092', '652929', '柯坪县', '652900');
INSERT INTO `sys_area` VALUES ('3093', '653001', '阿图什市', '653000');
INSERT INTO `sys_area` VALUES ('3094', '653022', '阿克陶县', '653000');
INSERT INTO `sys_area` VALUES ('3095', '653023', '阿合奇县', '653000');
INSERT INTO `sys_area` VALUES ('3096', '653024', '乌恰县', '653000');
INSERT INTO `sys_area` VALUES ('3097', '653101', '喀什市', '653100');
INSERT INTO `sys_area` VALUES ('3098', '653121', '疏附县', '653100');
INSERT INTO `sys_area` VALUES ('3099', '653122', '疏勒县', '653100');
INSERT INTO `sys_area` VALUES ('3100', '653123', '英吉沙县', '653100');
INSERT INTO `sys_area` VALUES ('3101', '653124', '泽普县', '653100');
INSERT INTO `sys_area` VALUES ('3102', '653125', '莎车县', '653100');
INSERT INTO `sys_area` VALUES ('3103', '653126', '叶城县', '653100');
INSERT INTO `sys_area` VALUES ('3104', '653127', '麦盖提县', '653100');
INSERT INTO `sys_area` VALUES ('3105', '653128', '岳普湖县', '653100');
INSERT INTO `sys_area` VALUES ('3106', '653129', '伽师县', '653100');
INSERT INTO `sys_area` VALUES ('3107', '653130', '巴楚县', '653100');
INSERT INTO `sys_area` VALUES ('3108', '653131', '塔什库尔干塔吉克自治县', '653100');
INSERT INTO `sys_area` VALUES ('3109', '653201', '和田市', '653200');
INSERT INTO `sys_area` VALUES ('3110', '653221', '和田县', '653200');
INSERT INTO `sys_area` VALUES ('3111', '653222', '墨玉县', '653200');
INSERT INTO `sys_area` VALUES ('3112', '653223', '皮山县', '653200');
INSERT INTO `sys_area` VALUES ('3113', '653224', '洛浦县', '653200');
INSERT INTO `sys_area` VALUES ('3114', '653225', '策勒县', '653200');
INSERT INTO `sys_area` VALUES ('3115', '653226', '于田县', '653200');
INSERT INTO `sys_area` VALUES ('3116', '653227', '民丰县', '653200');
INSERT INTO `sys_area` VALUES ('3117', '654002', '伊宁市', '654000');
INSERT INTO `sys_area` VALUES ('3118', '654003', '奎屯市', '654000');
INSERT INTO `sys_area` VALUES ('3119', '654021', '伊宁县', '654000');
INSERT INTO `sys_area` VALUES ('3120', '654022', '察布查尔锡伯自治县', '654000');
INSERT INTO `sys_area` VALUES ('3121', '654023', '霍城县', '654000');
INSERT INTO `sys_area` VALUES ('3122', '654024', '巩留县', '654000');
INSERT INTO `sys_area` VALUES ('3123', '654025', '新源县', '654000');
INSERT INTO `sys_area` VALUES ('3124', '654026', '昭苏县', '654000');
INSERT INTO `sys_area` VALUES ('3125', '654027', '特克斯县', '654000');
INSERT INTO `sys_area` VALUES ('3126', '654028', '尼勒克县', '654000');
INSERT INTO `sys_area` VALUES ('3127', '654201', '塔城市', '654200');
INSERT INTO `sys_area` VALUES ('3128', '654202', '乌苏市', '654200');
INSERT INTO `sys_area` VALUES ('3129', '654221', '额敏县', '654200');
INSERT INTO `sys_area` VALUES ('3130', '654223', '沙湾县', '654200');
INSERT INTO `sys_area` VALUES ('3131', '654224', '托里县', '654200');
INSERT INTO `sys_area` VALUES ('3132', '654225', '裕民县', '654200');
INSERT INTO `sys_area` VALUES ('3133', '654226', '和布克赛尔蒙古自治县', '654200');
INSERT INTO `sys_area` VALUES ('3134', '654301', '阿勒泰市', '654300');
INSERT INTO `sys_area` VALUES ('3135', '654321', '布尔津县', '654300');
INSERT INTO `sys_area` VALUES ('3136', '654322', '富蕴县', '654300');
INSERT INTO `sys_area` VALUES ('3137', '654323', '福海县', '654300');
INSERT INTO `sys_area` VALUES ('3138', '654324', '哈巴河县', '654300');
INSERT INTO `sys_area` VALUES ('3139', '654325', '青河县', '654300');
INSERT INTO `sys_area` VALUES ('3140', '654326', '吉木乃县', '654300');
INSERT INTO `sys_area` VALUES ('3141', '659001', '石河子市', '659000');
INSERT INTO `sys_area` VALUES ('3142', '659002', '阿拉尔市', '659000');
INSERT INTO `sys_area` VALUES ('3143', '659003', '图木舒克市', '659000');
INSERT INTO `sys_area` VALUES ('3144', '659004', '五家渠市', '659000');

-- ----------------------------
-- Table structure for sys_city
-- ----------------------------
DROP TABLE IF EXISTS `sys_city`;
CREATE TABLE `sys_city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` varchar(6) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `pid` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=346 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_city
-- ----------------------------
INSERT INTO `sys_city` VALUES ('1', '110100', '市辖区', '110000');
INSERT INTO `sys_city` VALUES ('2', '110200', '县', '110000');
INSERT INTO `sys_city` VALUES ('3', '120100', '市辖区', '120000');
INSERT INTO `sys_city` VALUES ('4', '120200', '县', '120000');
INSERT INTO `sys_city` VALUES ('5', '130100', '石家庄市', '130000');
INSERT INTO `sys_city` VALUES ('6', '130200', '唐山市', '130000');
INSERT INTO `sys_city` VALUES ('7', '130300', '秦皇岛市', '130000');
INSERT INTO `sys_city` VALUES ('8', '130400', '邯郸市', '130000');
INSERT INTO `sys_city` VALUES ('9', '130500', '邢台市', '130000');
INSERT INTO `sys_city` VALUES ('10', '130600', '保定市', '130000');
INSERT INTO `sys_city` VALUES ('11', '130700', '张家口市', '130000');
INSERT INTO `sys_city` VALUES ('12', '130800', '承德市', '130000');
INSERT INTO `sys_city` VALUES ('13', '130900', '沧州市', '130000');
INSERT INTO `sys_city` VALUES ('14', '131000', '廊坊市', '130000');
INSERT INTO `sys_city` VALUES ('15', '131100', '衡水市', '130000');
INSERT INTO `sys_city` VALUES ('16', '140100', '太原市', '140000');
INSERT INTO `sys_city` VALUES ('17', '140200', '大同市', '140000');
INSERT INTO `sys_city` VALUES ('18', '140300', '阳泉市', '140000');
INSERT INTO `sys_city` VALUES ('19', '140400', '长治市', '140000');
INSERT INTO `sys_city` VALUES ('20', '140500', '晋城市', '140000');
INSERT INTO `sys_city` VALUES ('21', '140600', '朔州市', '140000');
INSERT INTO `sys_city` VALUES ('22', '140700', '晋中市', '140000');
INSERT INTO `sys_city` VALUES ('23', '140800', '运城市', '140000');
INSERT INTO `sys_city` VALUES ('24', '140900', '忻州市', '140000');
INSERT INTO `sys_city` VALUES ('25', '141000', '临汾市', '140000');
INSERT INTO `sys_city` VALUES ('26', '141100', '吕梁市', '140000');
INSERT INTO `sys_city` VALUES ('27', '150100', '呼和浩特市', '150000');
INSERT INTO `sys_city` VALUES ('28', '150200', '包头市', '150000');
INSERT INTO `sys_city` VALUES ('29', '150300', '乌海市', '150000');
INSERT INTO `sys_city` VALUES ('30', '150400', '赤峰市', '150000');
INSERT INTO `sys_city` VALUES ('31', '150500', '通辽市', '150000');
INSERT INTO `sys_city` VALUES ('32', '150600', '鄂尔多斯市', '150000');
INSERT INTO `sys_city` VALUES ('33', '150700', '呼伦贝尔市', '150000');
INSERT INTO `sys_city` VALUES ('34', '150800', '巴彦淖尔市', '150000');
INSERT INTO `sys_city` VALUES ('35', '150900', '乌兰察布市', '150000');
INSERT INTO `sys_city` VALUES ('36', '152200', '兴安盟', '150000');
INSERT INTO `sys_city` VALUES ('37', '152500', '锡林郭勒盟', '150000');
INSERT INTO `sys_city` VALUES ('38', '152900', '阿拉善盟', '150000');
INSERT INTO `sys_city` VALUES ('39', '210100', '沈阳市', '210000');
INSERT INTO `sys_city` VALUES ('40', '210200', '大连市', '210000');
INSERT INTO `sys_city` VALUES ('41', '210300', '鞍山市', '210000');
INSERT INTO `sys_city` VALUES ('42', '210400', '抚顺市', '210000');
INSERT INTO `sys_city` VALUES ('43', '210500', '本溪市', '210000');
INSERT INTO `sys_city` VALUES ('44', '210600', '丹东市', '210000');
INSERT INTO `sys_city` VALUES ('45', '210700', '锦州市', '210000');
INSERT INTO `sys_city` VALUES ('46', '210800', '营口市', '210000');
INSERT INTO `sys_city` VALUES ('47', '210900', '阜新市', '210000');
INSERT INTO `sys_city` VALUES ('48', '211000', '辽阳市', '210000');
INSERT INTO `sys_city` VALUES ('49', '211100', '盘锦市', '210000');
INSERT INTO `sys_city` VALUES ('50', '211200', '铁岭市', '210000');
INSERT INTO `sys_city` VALUES ('51', '211300', '朝阳市', '210000');
INSERT INTO `sys_city` VALUES ('52', '211400', '葫芦岛市', '210000');
INSERT INTO `sys_city` VALUES ('53', '220100', '长春市', '220000');
INSERT INTO `sys_city` VALUES ('54', '220200', '吉林市', '220000');
INSERT INTO `sys_city` VALUES ('55', '220300', '四平市', '220000');
INSERT INTO `sys_city` VALUES ('56', '220400', '辽源市', '220000');
INSERT INTO `sys_city` VALUES ('57', '220500', '通化市', '220000');
INSERT INTO `sys_city` VALUES ('58', '220600', '白山市', '220000');
INSERT INTO `sys_city` VALUES ('59', '220700', '松原市', '220000');
INSERT INTO `sys_city` VALUES ('60', '220800', '白城市', '220000');
INSERT INTO `sys_city` VALUES ('61', '222400', '延边朝鲜族自治州', '220000');
INSERT INTO `sys_city` VALUES ('62', '230100', '哈尔滨市', '230000');
INSERT INTO `sys_city` VALUES ('63', '230200', '齐齐哈尔市', '230000');
INSERT INTO `sys_city` VALUES ('64', '230300', '鸡西市', '230000');
INSERT INTO `sys_city` VALUES ('65', '230400', '鹤岗市', '230000');
INSERT INTO `sys_city` VALUES ('66', '230500', '双鸭山市', '230000');
INSERT INTO `sys_city` VALUES ('67', '230600', '大庆市', '230000');
INSERT INTO `sys_city` VALUES ('68', '230700', '伊春市', '230000');
INSERT INTO `sys_city` VALUES ('69', '230800', '佳木斯市', '230000');
INSERT INTO `sys_city` VALUES ('70', '230900', '七台河市', '230000');
INSERT INTO `sys_city` VALUES ('71', '231000', '牡丹江市', '230000');
INSERT INTO `sys_city` VALUES ('72', '231100', '黑河市', '230000');
INSERT INTO `sys_city` VALUES ('73', '231200', '绥化市', '230000');
INSERT INTO `sys_city` VALUES ('74', '232700', '大兴安岭地区', '230000');
INSERT INTO `sys_city` VALUES ('75', '310100', '市辖区', '310000');
INSERT INTO `sys_city` VALUES ('76', '310200', '县', '310000');
INSERT INTO `sys_city` VALUES ('77', '320100', '南京市', '320000');
INSERT INTO `sys_city` VALUES ('78', '320200', '无锡市', '320000');
INSERT INTO `sys_city` VALUES ('79', '320300', '徐州市', '320000');
INSERT INTO `sys_city` VALUES ('80', '320400', '常州市', '320000');
INSERT INTO `sys_city` VALUES ('81', '320500', '苏州市', '320000');
INSERT INTO `sys_city` VALUES ('82', '320600', '南通市', '320000');
INSERT INTO `sys_city` VALUES ('83', '320700', '连云港市', '320000');
INSERT INTO `sys_city` VALUES ('84', '320800', '淮安市', '320000');
INSERT INTO `sys_city` VALUES ('85', '320900', '盐城市', '320000');
INSERT INTO `sys_city` VALUES ('86', '321000', '扬州市', '320000');
INSERT INTO `sys_city` VALUES ('87', '321100', '镇江市', '320000');
INSERT INTO `sys_city` VALUES ('88', '321200', '泰州市', '320000');
INSERT INTO `sys_city` VALUES ('89', '321300', '宿迁市', '320000');
INSERT INTO `sys_city` VALUES ('90', '330100', '杭州市', '330000');
INSERT INTO `sys_city` VALUES ('91', '330200', '宁波市', '330000');
INSERT INTO `sys_city` VALUES ('92', '330300', '温州市', '330000');
INSERT INTO `sys_city` VALUES ('93', '330400', '嘉兴市', '330000');
INSERT INTO `sys_city` VALUES ('94', '330500', '湖州市', '330000');
INSERT INTO `sys_city` VALUES ('95', '330600', '绍兴市', '330000');
INSERT INTO `sys_city` VALUES ('96', '330700', '金华市', '330000');
INSERT INTO `sys_city` VALUES ('97', '330800', '衢州市', '330000');
INSERT INTO `sys_city` VALUES ('98', '330900', '舟山市', '330000');
INSERT INTO `sys_city` VALUES ('99', '331000', '台州市', '330000');
INSERT INTO `sys_city` VALUES ('100', '331100', '丽水市', '330000');
INSERT INTO `sys_city` VALUES ('101', '340100', '合肥市', '340000');
INSERT INTO `sys_city` VALUES ('102', '340200', '芜湖市', '340000');
INSERT INTO `sys_city` VALUES ('103', '340300', '蚌埠市', '340000');
INSERT INTO `sys_city` VALUES ('104', '340400', '淮南市', '340000');
INSERT INTO `sys_city` VALUES ('105', '340500', '马鞍山市', '340000');
INSERT INTO `sys_city` VALUES ('106', '340600', '淮北市', '340000');
INSERT INTO `sys_city` VALUES ('107', '340700', '铜陵市', '340000');
INSERT INTO `sys_city` VALUES ('108', '340800', '安庆市', '340000');
INSERT INTO `sys_city` VALUES ('109', '341000', '黄山市', '340000');
INSERT INTO `sys_city` VALUES ('110', '341100', '滁州市', '340000');
INSERT INTO `sys_city` VALUES ('111', '341200', '阜阳市', '340000');
INSERT INTO `sys_city` VALUES ('112', '341300', '宿州市', '340000');
INSERT INTO `sys_city` VALUES ('113', '341400', '巢湖市', '340000');
INSERT INTO `sys_city` VALUES ('114', '341500', '六安市', '340000');
INSERT INTO `sys_city` VALUES ('115', '341600', '亳州市', '340000');
INSERT INTO `sys_city` VALUES ('116', '341700', '池州市', '340000');
INSERT INTO `sys_city` VALUES ('117', '341800', '宣城市', '340000');
INSERT INTO `sys_city` VALUES ('118', '350100', '福州市', '350000');
INSERT INTO `sys_city` VALUES ('119', '350200', '厦门市', '350000');
INSERT INTO `sys_city` VALUES ('120', '350300', '莆田市', '350000');
INSERT INTO `sys_city` VALUES ('121', '350400', '三明市', '350000');
INSERT INTO `sys_city` VALUES ('122', '350500', '泉州市', '350000');
INSERT INTO `sys_city` VALUES ('123', '350600', '漳州市', '350000');
INSERT INTO `sys_city` VALUES ('124', '350700', '南平市', '350000');
INSERT INTO `sys_city` VALUES ('125', '350800', '龙岩市', '350000');
INSERT INTO `sys_city` VALUES ('126', '350900', '宁德市', '350000');
INSERT INTO `sys_city` VALUES ('127', '360100', '南昌市', '360000');
INSERT INTO `sys_city` VALUES ('128', '360200', '景德镇市', '360000');
INSERT INTO `sys_city` VALUES ('129', '360300', '萍乡市', '360000');
INSERT INTO `sys_city` VALUES ('130', '360400', '九江市', '360000');
INSERT INTO `sys_city` VALUES ('131', '360500', '新余市', '360000');
INSERT INTO `sys_city` VALUES ('132', '360600', '鹰潭市', '360000');
INSERT INTO `sys_city` VALUES ('133', '360700', '赣州市', '360000');
INSERT INTO `sys_city` VALUES ('134', '360800', '吉安市', '360000');
INSERT INTO `sys_city` VALUES ('135', '360900', '宜春市', '360000');
INSERT INTO `sys_city` VALUES ('136', '361000', '抚州市', '360000');
INSERT INTO `sys_city` VALUES ('137', '361100', '上饶市', '360000');
INSERT INTO `sys_city` VALUES ('138', '370100', '济南市', '370000');
INSERT INTO `sys_city` VALUES ('139', '370200', '青岛市', '370000');
INSERT INTO `sys_city` VALUES ('140', '370300', '淄博市', '370000');
INSERT INTO `sys_city` VALUES ('141', '370400', '枣庄市', '370000');
INSERT INTO `sys_city` VALUES ('142', '370500', '东营市', '370000');
INSERT INTO `sys_city` VALUES ('143', '370600', '烟台市', '370000');
INSERT INTO `sys_city` VALUES ('144', '370700', '潍坊市', '370000');
INSERT INTO `sys_city` VALUES ('145', '370800', '济宁市', '370000');
INSERT INTO `sys_city` VALUES ('146', '370900', '泰安市', '370000');
INSERT INTO `sys_city` VALUES ('147', '371000', '威海市', '370000');
INSERT INTO `sys_city` VALUES ('148', '371100', '日照市', '370000');
INSERT INTO `sys_city` VALUES ('149', '371200', '莱芜市', '370000');
INSERT INTO `sys_city` VALUES ('150', '371300', '临沂市', '370000');
INSERT INTO `sys_city` VALUES ('151', '371400', '德州市', '370000');
INSERT INTO `sys_city` VALUES ('152', '371500', '聊城市', '370000');
INSERT INTO `sys_city` VALUES ('153', '371600', '滨州市', '370000');
INSERT INTO `sys_city` VALUES ('154', '371700', '荷泽市', '370000');
INSERT INTO `sys_city` VALUES ('155', '410100', '郑州市', '410000');
INSERT INTO `sys_city` VALUES ('156', '410200', '开封市', '410000');
INSERT INTO `sys_city` VALUES ('157', '410300', '洛阳市', '410000');
INSERT INTO `sys_city` VALUES ('158', '410400', '平顶山市', '410000');
INSERT INTO `sys_city` VALUES ('159', '410500', '安阳市', '410000');
INSERT INTO `sys_city` VALUES ('160', '410600', '鹤壁市', '410000');
INSERT INTO `sys_city` VALUES ('161', '410700', '新乡市', '410000');
INSERT INTO `sys_city` VALUES ('162', '410800', '焦作市', '410000');
INSERT INTO `sys_city` VALUES ('163', '410900', '濮阳市', '410000');
INSERT INTO `sys_city` VALUES ('164', '411000', '许昌市', '410000');
INSERT INTO `sys_city` VALUES ('165', '411100', '漯河市', '410000');
INSERT INTO `sys_city` VALUES ('166', '411200', '三门峡市', '410000');
INSERT INTO `sys_city` VALUES ('167', '411300', '南阳市', '410000');
INSERT INTO `sys_city` VALUES ('168', '411400', '商丘市', '410000');
INSERT INTO `sys_city` VALUES ('169', '411500', '信阳市', '410000');
INSERT INTO `sys_city` VALUES ('170', '411600', '周口市', '410000');
INSERT INTO `sys_city` VALUES ('171', '411700', '驻马店市', '410000');
INSERT INTO `sys_city` VALUES ('172', '420100', '武汉市', '420000');
INSERT INTO `sys_city` VALUES ('173', '420200', '黄石市', '420000');
INSERT INTO `sys_city` VALUES ('174', '420300', '十堰市', '420000');
INSERT INTO `sys_city` VALUES ('175', '420500', '宜昌市', '420000');
INSERT INTO `sys_city` VALUES ('176', '420600', '襄樊市', '420000');
INSERT INTO `sys_city` VALUES ('177', '420700', '鄂州市', '420000');
INSERT INTO `sys_city` VALUES ('178', '420800', '荆门市', '420000');
INSERT INTO `sys_city` VALUES ('179', '420900', '孝感市', '420000');
INSERT INTO `sys_city` VALUES ('180', '421000', '荆州市', '420000');
INSERT INTO `sys_city` VALUES ('181', '421100', '黄冈市', '420000');
INSERT INTO `sys_city` VALUES ('182', '421200', '咸宁市', '420000');
INSERT INTO `sys_city` VALUES ('183', '421300', '随州市', '420000');
INSERT INTO `sys_city` VALUES ('184', '422800', '恩施土家族苗族自治州', '420000');
INSERT INTO `sys_city` VALUES ('185', '429000', '省直辖行政单位', '420000');
INSERT INTO `sys_city` VALUES ('186', '430100', '长沙市', '430000');
INSERT INTO `sys_city` VALUES ('187', '430200', '株洲市', '430000');
INSERT INTO `sys_city` VALUES ('188', '430300', '湘潭市', '430000');
INSERT INTO `sys_city` VALUES ('189', '430400', '衡阳市', '430000');
INSERT INTO `sys_city` VALUES ('190', '430500', '邵阳市', '430000');
INSERT INTO `sys_city` VALUES ('191', '430600', '岳阳市', '430000');
INSERT INTO `sys_city` VALUES ('192', '430700', '常德市', '430000');
INSERT INTO `sys_city` VALUES ('193', '430800', '张家界市', '430000');
INSERT INTO `sys_city` VALUES ('194', '430900', '益阳市', '430000');
INSERT INTO `sys_city` VALUES ('195', '431000', '郴州市', '430000');
INSERT INTO `sys_city` VALUES ('196', '431100', '永州市', '430000');
INSERT INTO `sys_city` VALUES ('197', '431200', '怀化市', '430000');
INSERT INTO `sys_city` VALUES ('198', '431300', '娄底市', '430000');
INSERT INTO `sys_city` VALUES ('199', '433100', '湘西土家族苗族自治州', '430000');
INSERT INTO `sys_city` VALUES ('200', '440100', '广州市', '440000');
INSERT INTO `sys_city` VALUES ('201', '440200', '韶关市', '440000');
INSERT INTO `sys_city` VALUES ('202', '440300', '深圳市', '440000');
INSERT INTO `sys_city` VALUES ('203', '440400', '珠海市', '440000');
INSERT INTO `sys_city` VALUES ('204', '440500', '汕头市', '440000');
INSERT INTO `sys_city` VALUES ('205', '440600', '佛山市', '440000');
INSERT INTO `sys_city` VALUES ('206', '440700', '江门市', '440000');
INSERT INTO `sys_city` VALUES ('207', '440800', '湛江市', '440000');
INSERT INTO `sys_city` VALUES ('208', '440900', '茂名市', '440000');
INSERT INTO `sys_city` VALUES ('209', '441200', '肇庆市', '440000');
INSERT INTO `sys_city` VALUES ('210', '441300', '惠州市', '440000');
INSERT INTO `sys_city` VALUES ('211', '441400', '梅州市', '440000');
INSERT INTO `sys_city` VALUES ('212', '441500', '汕尾市', '440000');
INSERT INTO `sys_city` VALUES ('213', '441600', '河源市', '440000');
INSERT INTO `sys_city` VALUES ('214', '441700', '阳江市', '440000');
INSERT INTO `sys_city` VALUES ('215', '441800', '清远市', '440000');
INSERT INTO `sys_city` VALUES ('216', '441900', '东莞市', '440000');
INSERT INTO `sys_city` VALUES ('217', '442000', '中山市', '440000');
INSERT INTO `sys_city` VALUES ('218', '445100', '潮州市', '440000');
INSERT INTO `sys_city` VALUES ('219', '445200', '揭阳市', '440000');
INSERT INTO `sys_city` VALUES ('220', '445300', '云浮市', '440000');
INSERT INTO `sys_city` VALUES ('221', '450100', '南宁市', '450000');
INSERT INTO `sys_city` VALUES ('222', '450200', '柳州市', '450000');
INSERT INTO `sys_city` VALUES ('223', '450300', '桂林市', '450000');
INSERT INTO `sys_city` VALUES ('224', '450400', '梧州市', '450000');
INSERT INTO `sys_city` VALUES ('225', '450500', '北海市', '450000');
INSERT INTO `sys_city` VALUES ('226', '450600', '防城港市', '450000');
INSERT INTO `sys_city` VALUES ('227', '450700', '钦州市', '450000');
INSERT INTO `sys_city` VALUES ('228', '450800', '贵港市', '450000');
INSERT INTO `sys_city` VALUES ('229', '450900', '玉林市', '450000');
INSERT INTO `sys_city` VALUES ('230', '451000', '百色市', '450000');
INSERT INTO `sys_city` VALUES ('231', '451100', '贺州市', '450000');
INSERT INTO `sys_city` VALUES ('232', '451200', '河池市', '450000');
INSERT INTO `sys_city` VALUES ('233', '451300', '来宾市', '450000');
INSERT INTO `sys_city` VALUES ('234', '451400', '崇左市', '450000');
INSERT INTO `sys_city` VALUES ('235', '460100', '海口市', '460000');
INSERT INTO `sys_city` VALUES ('236', '460200', '三亚市', '460000');
INSERT INTO `sys_city` VALUES ('237', '469000', '省直辖县级行政单位', '460000');
INSERT INTO `sys_city` VALUES ('238', '500100', '市辖区', '500000');
INSERT INTO `sys_city` VALUES ('239', '500200', '县', '500000');
INSERT INTO `sys_city` VALUES ('240', '500300', '市', '500000');
INSERT INTO `sys_city` VALUES ('241', '510100', '成都市', '510000');
INSERT INTO `sys_city` VALUES ('242', '510300', '自贡市', '510000');
INSERT INTO `sys_city` VALUES ('243', '510400', '攀枝花市', '510000');
INSERT INTO `sys_city` VALUES ('244', '510500', '泸州市', '510000');
INSERT INTO `sys_city` VALUES ('245', '510600', '德阳市', '510000');
INSERT INTO `sys_city` VALUES ('246', '510700', '绵阳市', '510000');
INSERT INTO `sys_city` VALUES ('247', '510800', '广元市', '510000');
INSERT INTO `sys_city` VALUES ('248', '510900', '遂宁市', '510000');
INSERT INTO `sys_city` VALUES ('249', '511000', '内江市', '510000');
INSERT INTO `sys_city` VALUES ('250', '511100', '乐山市', '510000');
INSERT INTO `sys_city` VALUES ('251', '511300', '南充市', '510000');
INSERT INTO `sys_city` VALUES ('252', '511400', '眉山市', '510000');
INSERT INTO `sys_city` VALUES ('253', '511500', '宜宾市', '510000');
INSERT INTO `sys_city` VALUES ('254', '511600', '广安市', '510000');
INSERT INTO `sys_city` VALUES ('255', '511700', '达州市', '510000');
INSERT INTO `sys_city` VALUES ('256', '511800', '雅安市', '510000');
INSERT INTO `sys_city` VALUES ('257', '511900', '巴中市', '510000');
INSERT INTO `sys_city` VALUES ('258', '512000', '资阳市', '510000');
INSERT INTO `sys_city` VALUES ('259', '513200', '阿坝藏族羌族自治州', '510000');
INSERT INTO `sys_city` VALUES ('260', '513300', '甘孜藏族自治州', '510000');
INSERT INTO `sys_city` VALUES ('261', '513400', '凉山彝族自治州', '510000');
INSERT INTO `sys_city` VALUES ('262', '520100', '贵阳市', '520000');
INSERT INTO `sys_city` VALUES ('263', '520200', '六盘水市', '520000');
INSERT INTO `sys_city` VALUES ('264', '520300', '遵义市', '520000');
INSERT INTO `sys_city` VALUES ('265', '520400', '安顺市', '520000');
INSERT INTO `sys_city` VALUES ('266', '522200', '铜仁地区', '520000');
INSERT INTO `sys_city` VALUES ('267', '522300', '黔西南布依族苗族自治州', '520000');
INSERT INTO `sys_city` VALUES ('268', '522400', '毕节地区', '520000');
INSERT INTO `sys_city` VALUES ('269', '522600', '黔东南苗族侗族自治州', '520000');
INSERT INTO `sys_city` VALUES ('270', '522700', '黔南布依族苗族自治州', '520000');
INSERT INTO `sys_city` VALUES ('271', '530100', '昆明市', '530000');
INSERT INTO `sys_city` VALUES ('272', '530300', '曲靖市', '530000');
INSERT INTO `sys_city` VALUES ('273', '530400', '玉溪市', '530000');
INSERT INTO `sys_city` VALUES ('274', '530500', '保山市', '530000');
INSERT INTO `sys_city` VALUES ('275', '530600', '昭通市', '530000');
INSERT INTO `sys_city` VALUES ('276', '530700', '丽江市', '530000');
INSERT INTO `sys_city` VALUES ('277', '530800', '思茅市', '530000');
INSERT INTO `sys_city` VALUES ('278', '530900', '临沧市', '530000');
INSERT INTO `sys_city` VALUES ('279', '532300', '楚雄彝族自治州', '530000');
INSERT INTO `sys_city` VALUES ('280', '532500', '红河哈尼族彝族自治州', '530000');
INSERT INTO `sys_city` VALUES ('281', '532600', '文山壮族苗族自治州', '530000');
INSERT INTO `sys_city` VALUES ('282', '532800', '西双版纳傣族自治州', '530000');
INSERT INTO `sys_city` VALUES ('283', '532900', '大理白族自治州', '530000');
INSERT INTO `sys_city` VALUES ('284', '533100', '德宏傣族景颇族自治州', '530000');
INSERT INTO `sys_city` VALUES ('285', '533300', '怒江傈僳族自治州', '530000');
INSERT INTO `sys_city` VALUES ('286', '533400', '迪庆藏族自治州', '530000');
INSERT INTO `sys_city` VALUES ('287', '540100', '拉萨市', '540000');
INSERT INTO `sys_city` VALUES ('288', '542100', '昌都地区', '540000');
INSERT INTO `sys_city` VALUES ('289', '542200', '山南地区', '540000');
INSERT INTO `sys_city` VALUES ('290', '542300', '日喀则地区', '540000');
INSERT INTO `sys_city` VALUES ('291', '542400', '那曲地区', '540000');
INSERT INTO `sys_city` VALUES ('292', '542500', '阿里地区', '540000');
INSERT INTO `sys_city` VALUES ('293', '542600', '林芝地区', '540000');
INSERT INTO `sys_city` VALUES ('294', '610100', '西安市', '610000');
INSERT INTO `sys_city` VALUES ('295', '610200', '铜川市', '610000');
INSERT INTO `sys_city` VALUES ('296', '610300', '宝鸡市', '610000');
INSERT INTO `sys_city` VALUES ('297', '610400', '咸阳市', '610000');
INSERT INTO `sys_city` VALUES ('298', '610500', '渭南市', '610000');
INSERT INTO `sys_city` VALUES ('299', '610600', '延安市', '610000');
INSERT INTO `sys_city` VALUES ('300', '610700', '汉中市', '610000');
INSERT INTO `sys_city` VALUES ('301', '610800', '榆林市', '610000');
INSERT INTO `sys_city` VALUES ('302', '610900', '安康市', '610000');
INSERT INTO `sys_city` VALUES ('303', '611000', '商洛市', '610000');
INSERT INTO `sys_city` VALUES ('304', '620100', '兰州市', '620000');
INSERT INTO `sys_city` VALUES ('305', '620200', '嘉峪关市', '620000');
INSERT INTO `sys_city` VALUES ('306', '620300', '金昌市', '620000');
INSERT INTO `sys_city` VALUES ('307', '620400', '白银市', '620000');
INSERT INTO `sys_city` VALUES ('308', '620500', '天水市', '620000');
INSERT INTO `sys_city` VALUES ('309', '620600', '武威市', '620000');
INSERT INTO `sys_city` VALUES ('310', '620700', '张掖市', '620000');
INSERT INTO `sys_city` VALUES ('311', '620800', '平凉市', '620000');
INSERT INTO `sys_city` VALUES ('312', '620900', '酒泉市', '620000');
INSERT INTO `sys_city` VALUES ('313', '621000', '庆阳市', '620000');
INSERT INTO `sys_city` VALUES ('314', '621100', '定西市', '620000');
INSERT INTO `sys_city` VALUES ('315', '621200', '陇南市', '620000');
INSERT INTO `sys_city` VALUES ('316', '622900', '临夏回族自治州', '620000');
INSERT INTO `sys_city` VALUES ('317', '623000', '甘南藏族自治州', '620000');
INSERT INTO `sys_city` VALUES ('318', '630100', '西宁市', '630000');
INSERT INTO `sys_city` VALUES ('319', '632100', '海东地区', '630000');
INSERT INTO `sys_city` VALUES ('320', '632200', '海北藏族自治州', '630000');
INSERT INTO `sys_city` VALUES ('321', '632300', '黄南藏族自治州', '630000');
INSERT INTO `sys_city` VALUES ('322', '632500', '海南藏族自治州', '630000');
INSERT INTO `sys_city` VALUES ('323', '632600', '果洛藏族自治州', '630000');
INSERT INTO `sys_city` VALUES ('324', '632700', '玉树藏族自治州', '630000');
INSERT INTO `sys_city` VALUES ('325', '632800', '海西蒙古族藏族自治州', '630000');
INSERT INTO `sys_city` VALUES ('326', '640100', '银川市', '640000');
INSERT INTO `sys_city` VALUES ('327', '640200', '石嘴山市', '640000');
INSERT INTO `sys_city` VALUES ('328', '640300', '吴忠市', '640000');
INSERT INTO `sys_city` VALUES ('329', '640400', '固原市', '640000');
INSERT INTO `sys_city` VALUES ('330', '640500', '中卫市', '640000');
INSERT INTO `sys_city` VALUES ('331', '650100', '乌鲁木齐市', '650000');
INSERT INTO `sys_city` VALUES ('332', '650200', '克拉玛依市', '650000');
INSERT INTO `sys_city` VALUES ('333', '652100', '吐鲁番地区', '650000');
INSERT INTO `sys_city` VALUES ('334', '652200', '哈密地区', '650000');
INSERT INTO `sys_city` VALUES ('335', '652300', '昌吉回族自治州', '650000');
INSERT INTO `sys_city` VALUES ('336', '652700', '博尔塔拉蒙古自治州', '650000');
INSERT INTO `sys_city` VALUES ('337', '652800', '巴音郭楞蒙古自治州', '650000');
INSERT INTO `sys_city` VALUES ('338', '652900', '阿克苏地区', '650000');
INSERT INTO `sys_city` VALUES ('339', '653000', '克孜勒苏柯尔克孜自治州', '650000');
INSERT INTO `sys_city` VALUES ('340', '653100', '喀什地区', '650000');
INSERT INTO `sys_city` VALUES ('341', '653200', '和田地区', '650000');
INSERT INTO `sys_city` VALUES ('342', '654000', '伊犁哈萨克自治州', '650000');
INSERT INTO `sys_city` VALUES ('343', '654200', '塔城地区', '650000');
INSERT INTO `sys_city` VALUES ('344', '654300', '阿勒泰地区', '650000');
INSERT INTO `sys_city` VALUES ('345', '659000', '省直辖行政单位', '650000');

-- ----------------------------
-- Table structure for sys_constants
-- ----------------------------
DROP TABLE IF EXISTS `sys_constants`;
CREATE TABLE `sys_constants` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) DEFAULT NULL COMMENT '类型',
  `code` varchar(28) DEFAULT NULL COMMENT '编码',
  `name` varchar(20) DEFAULT NULL COMMENT '名称',
  `descibe` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_constants
-- ----------------------------
INSERT INTO `sys_constants` VALUES ('1', 'pmo_project_status', '1001', '跟进中', '项目状态');
INSERT INTO `sys_constants` VALUES ('2', 'pmo_project_status', '1002', '已关闭', '项目状态');
INSERT INTO `sys_constants` VALUES ('3', 'pmo_require_status', '1001', '需求添加', '需求状态');
INSERT INTO `sys_constants` VALUES ('4', 'pmo_require_status', '1002', '需求审核', '需求状态');
INSERT INTO `sys_constants` VALUES ('5', 'pmo_require_status', '1003', '二审', '需求状态');
INSERT INTO `sys_constants` VALUES ('6', 'pmo_require_status', '1004', '任务派发', '需求状态');
INSERT INTO `sys_constants` VALUES ('7', 'pmo_require_status', '1005', '任务反馈', '需求状态');
INSERT INTO `sys_constants` VALUES ('8', 'pmo_require_status', '1006', '结束流程', '需求状态');
INSERT INTO `sys_constants` VALUES ('1001', 'pmo_person_ca', '1', '项目经理', '人员类别');
INSERT INTO `sys_constants` VALUES ('1002', 'pmo_person_ca', '2', '市场经理', '人员类别');
INSERT INTO `sys_constants` VALUES ('1003', 'pmo_person_ca', '3', '项目成员', '人员类别');

-- ----------------------------
-- Table structure for sys_dep
-- ----------------------------
DROP TABLE IF EXISTS `sys_dep`;
CREATE TABLE `sys_dep` (
  `id` bigint(40) NOT NULL,
  `name` varchar(40) NOT NULL COMMENT '名称',
  `parent_id` bigint(40) NOT NULL,
  `leader_id` bigint(38) DEFAULT NULL COMMENT '领导id',
  `leader_name` varchar(40) DEFAULT NULL COMMENT '领导名字',
  `orders` int(20) DEFAULT '999',
  `create_time` varchar(20) DEFAULT NULL,
  `is_delete` int(2) NOT NULL DEFAULT '0' COMMENT '0有效 1 无效',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_dep
-- ----------------------------
INSERT INTO `sys_dep` VALUES ('1', '亿车', '0', null, null, '1', null, '0');
INSERT INTO `sys_dep` VALUES ('11', '总经办', '1', null, null, '3', null, '0');
INSERT INTO `sys_dep` VALUES ('14', '营销中心', '1', null, null, '6', null, '0');
INSERT INTO `sys_dep` VALUES ('15', '路内停车事业部', '1', null, null, '7', null, '0');
INSERT INTO `sys_dep` VALUES ('16', '路外停车事业部', '1', null, null, '8', null, '0');
INSERT INTO `sys_dep` VALUES ('17', '新能源事业部', '1', null, null, '9', null, '0');
INSERT INTO `sys_dep` VALUES ('18', '研发中心', '1', null, null, '10', null, '0');
INSERT INTO `sys_dep` VALUES ('19', '运维服务中心', '1', null, null, '11', null, '0');
INSERT INTO `sys_dep` VALUES ('20', '运营部', '1', null, null, '12', null, '0');
INSERT INTO `sys_dep` VALUES ('21', '战略发展部', '1', null, null, '13', null, '0');
INSERT INTO `sys_dep` VALUES ('22', '人资行政部', '1', null, null, '14', null, '0');
INSERT INTO `sys_dep` VALUES ('23', '财务部', '1', null, null, '15', null, '0');
INSERT INTO `sys_dep` VALUES ('1401', '市场部', '14', null, null, '16', null, '0');
INSERT INTO `sys_dep` VALUES ('1402', '商务技术部', '14', null, null, '17', null, '0');
INSERT INTO `sys_dep` VALUES ('1403', '营销一区', '14', null, null, '18', null, '0');
INSERT INTO `sys_dep` VALUES ('1404', '营销二区', '14', null, null, '19', '', '0');
INSERT INTO `sys_dep` VALUES ('1405', '营销三区', '14', null, null, '20', '', '0');
INSERT INTO `sys_dep` VALUES ('1406', '营销四区', '14', null, null, '21', '', '0');
INSERT INTO `sys_dep` VALUES ('1407', '营销五区', '14', null, null, '22', '', '0');
INSERT INTO `sys_dep` VALUES ('1501', '产品部', '15', null, null, '24', null, '0');
INSERT INTO `sys_dep` VALUES ('1502', '设计部', '15', null, null, '25', null, '0');
INSERT INTO `sys_dep` VALUES ('1503', '业务开发部', '15', null, null, '26', null, '0');
INSERT INTO `sys_dep` VALUES ('1504', '测试部', '15', null, null, '27', null, '0');
INSERT INTO `sys_dep` VALUES ('1505', '其他', '15', '149309277119637', '吴辉', '28', null, '0');
INSERT INTO `sys_dep` VALUES ('1601', '产品部', '16', null, null, '29', '', '0');
INSERT INTO `sys_dep` VALUES ('1602', '设计部', '16', null, null, '30', '', '0');
INSERT INTO `sys_dep` VALUES ('1603', '业务开发部', '16', null, null, '31', '', '0');
INSERT INTO `sys_dep` VALUES ('1604', '测试部', '16', null, null, '32', '', '0');
INSERT INTO `sys_dep` VALUES ('1605', '其他', '16', '149309277119647', '任亮', '33', '', '0');
INSERT INTO `sys_dep` VALUES ('1701', '产品部', '17', null, null, '34', '', '0');
INSERT INTO `sys_dep` VALUES ('1702', '设计部', '17', null, null, '35', '', '0');
INSERT INTO `sys_dep` VALUES ('1703', '业务开发部', '17', null, null, '36', '', '0');
INSERT INTO `sys_dep` VALUES ('1704', '测试部', '17', null, null, '37', '', '0');
INSERT INTO `sys_dep` VALUES ('1705', '项目支持部', '17', null, null, '38', '', '0');
INSERT INTO `sys_dep` VALUES ('1801', '研究组', '18', null, null, '39', null, '0');
INSERT INTO `sys_dep` VALUES ('1803', '支付组', '18', null, null, '41', null, '0');
INSERT INTO `sys_dep` VALUES ('1804', '公共组', '18', null, null, '42', null, '0');
INSERT INTO `sys_dep` VALUES ('1805', '软件质量部', '18', null, null, '43', null, '0');
INSERT INTO `sys_dep` VALUES ('1901', 'PMO', '19', null, null, '44', null, '0');
INSERT INTO `sys_dep` VALUES ('1902', '工程建设部', '19', null, null, '45', null, '0');
INSERT INTO `sys_dep` VALUES ('1903', '运行维护部', '19', null, null, '46', null, '0');
INSERT INTO `sys_dep` VALUES ('2001', '用户运营组', '20', null, null, '47', null, '0');
INSERT INTO `sys_dep` VALUES ('2002', '活动运营组', '20', null, null, '48', null, '0');
INSERT INTO `sys_dep` VALUES ('2004', '运营推广组', '20', null, null, '50', null, '0');
INSERT INTO `sys_dep` VALUES ('2005', '拓展A组', '20', '149309277119676', '周伟平', '51', null, '0');
INSERT INTO `sys_dep` VALUES ('2201', '人资组', '22', null, null, '52', null, '0');
INSERT INTO `sys_dep` VALUES ('2202', '行政组', '22', null, null, '53', null, '0');
INSERT INTO `sys_dep` VALUES ('140101', '市场管理组', '1401', null, null, '54', null, '0');
INSERT INTO `sys_dep` VALUES ('140103', '品牌宣传组', '1401', null, null, '56', null, '0');
INSERT INTO `sys_dep` VALUES ('140201', '商务组', '1402', null, null, '57', null, '0');
INSERT INTO `sys_dep` VALUES ('140202', '售前技术组', '1402', null, null, '58', null, '0');
INSERT INTO `sys_dep` VALUES ('140401', '南京办事处', '1404', null, null, '61', null, '0');
INSERT INTO `sys_dep` VALUES ('140402', '南昌办事处', '1404', null, null, '62', null, '0');
INSERT INTO `sys_dep` VALUES ('140403', '福州办事处', '1404', null, null, '63', null, '0');
INSERT INTO `sys_dep` VALUES ('140501', '武汉办事处', '1405', null, null, '64', null, '0');
INSERT INTO `sys_dep` VALUES ('140502', '西安办事处', '1405', null, null, '65', null, '0');
INSERT INTO `sys_dep` VALUES ('140601', '成都办事处', '1406', null, null, '66', null, '0');
INSERT INTO `sys_dep` VALUES ('140602', '贵阳办事处', '1406', null, null, '67', null, '0');
INSERT INTO `sys_dep` VALUES ('140701', '深圳办事处', '1407', null, null, '68', null, '0');
INSERT INTO `sys_dep` VALUES ('140702', '广州办事处', '1407', null, null, '69', null, '0');
INSERT INTO `sys_dep` VALUES ('190201', '供应链组', '1902', null, null, '74', null, '0');
INSERT INTO `sys_dep` VALUES ('190202', '实施组', '1902', null, null, '75', null, '0');
INSERT INTO `sys_dep` VALUES ('190203', '维护组', '1902', null, null, '76', null, '0');
INSERT INTO `sys_dep` VALUES ('190204', '办事处', '1902', null, null, '77', null, '0');
INSERT INTO `sys_dep` VALUES ('190301', '路内业务运维组', '1903', null, null, '78', null, '0');
INSERT INTO `sys_dep` VALUES ('190302', '路外业务运维组', '1903', null, null, '79', null, '0');
INSERT INTO `sys_dep` VALUES ('190303', '服务器运维组', '1903', null, null, '80', null, '0');
INSERT INTO `sys_dep` VALUES ('149429639001099', '郑州办事处', '1405', '149309277119831', '郝问博', '81', null, '0');
INSERT INTO `sys_dep` VALUES ('149440448142398', '拓展B组', '20', '149309277119728', '陈熔', '82', null, '0');
INSERT INTO `sys_dep` VALUES ('1494294481300654', '渠道大客户组', '1401', '149309277119703', '刘玉书', '83', null, '0');
INSERT INTO `sys_dep` VALUES ('1494295999581605', '北京办事处', '1403', '149309277119801', '肖云峰', '84', null, '0');
INSERT INTO `sys_dep` VALUES ('1494296034878656', '济南办事处', '1403', '149309277119837', '苑洪超', '85', null, '0');
INSERT INTO `sys_dep` VALUES ('1494387277569593', '基础服务组', '18', '149309277119652', '柴卫', '86', null, '0');
INSERT INTO `sys_dep` VALUES ('1494557788101967', '项目支持部', '16', '149309277119657', '关杰', '999', null, '0');
INSERT INTO `sys_dep` VALUES ('1494557859737552', '其他', '17', '149309277119667', '李晓磊', '999', null, '0');
INSERT INTO `sys_dep` VALUES ('1494558019448700', '其他', '18', '149309277119664', '朱金亮', '999', null, '0');
INSERT INTO `sys_dep` VALUES ('1494558190220180', '其他', '14', '149309277119674', '胡海洋', '999', null, '0');

-- ----------------------------
-- Table structure for sys_province
-- ----------------------------
DROP TABLE IF EXISTS `sys_province`;
CREATE TABLE `sys_province` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `province_id` varchar(6) DEFAULT NULL,
  `province` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_province
-- ----------------------------
INSERT INTO `sys_province` VALUES ('1', '110000', '北京市');
INSERT INTO `sys_province` VALUES ('2', '120000', '天津市');
INSERT INTO `sys_province` VALUES ('3', '130000', '河北省');
INSERT INTO `sys_province` VALUES ('4', '140000', '山西省');
INSERT INTO `sys_province` VALUES ('5', '150000', '内蒙古自治区');
INSERT INTO `sys_province` VALUES ('6', '210000', '辽宁省');
INSERT INTO `sys_province` VALUES ('7', '220000', '吉林省');
INSERT INTO `sys_province` VALUES ('8', '230000', '黑龙江省');
INSERT INTO `sys_province` VALUES ('9', '310000', '上海市');
INSERT INTO `sys_province` VALUES ('10', '320000', '江苏省');
INSERT INTO `sys_province` VALUES ('11', '330000', '浙江省');
INSERT INTO `sys_province` VALUES ('12', '340000', '安徽省');
INSERT INTO `sys_province` VALUES ('13', '350000', '福建省');
INSERT INTO `sys_province` VALUES ('14', '360000', '江西省');
INSERT INTO `sys_province` VALUES ('15', '370000', '山东省');
INSERT INTO `sys_province` VALUES ('16', '410000', '河南省');
INSERT INTO `sys_province` VALUES ('17', '420000', '湖北省');
INSERT INTO `sys_province` VALUES ('18', '430000', '湖南省');
INSERT INTO `sys_province` VALUES ('19', '440000', '广东省');
INSERT INTO `sys_province` VALUES ('20', '450000', '广西壮族自治区');
INSERT INTO `sys_province` VALUES ('21', '460000', '海南省');
INSERT INTO `sys_province` VALUES ('22', '500000', '重庆市');
INSERT INTO `sys_province` VALUES ('23', '510000', '四川省');
INSERT INTO `sys_province` VALUES ('24', '520000', '贵州省');
INSERT INTO `sys_province` VALUES ('25', '530000', '云南省');
INSERT INTO `sys_province` VALUES ('26', '540000', '西藏自治区');
INSERT INTO `sys_province` VALUES ('27', '610000', '陕西省');
INSERT INTO `sys_province` VALUES ('28', '620000', '甘肃省');
INSERT INTO `sys_province` VALUES ('29', '630000', '青海省');
INSERT INTO `sys_province` VALUES ('30', '640000', '宁夏回族自治区');
INSERT INTO `sys_province` VALUES ('31', '650000', '新疆维吾尔自治区');
INSERT INTO `sys_province` VALUES ('32', '710000', '台湾省');
INSERT INTO `sys_province` VALUES ('33', '810000', '香港特别行政区');
INSERT INTO `sys_province` VALUES ('34', '820000', '澳门特别行政区');

-- ----------------------------
-- Table structure for sys_resource
-- ----------------------------
DROP TABLE IF EXISTS `sys_resource`;
CREATE TABLE `sys_resource` (
  `id` varchar(38) NOT NULL COMMENT '主键',
  `name` varchar(40) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `type` int(2) DEFAULT NULL COMMENT '资源类型0 目录 1菜单，2按钮',
  `app_id` varchar(38) DEFAULT NULL COMMENT '所属模块',
  `parent_id` varchar(38) DEFAULT '1' COMMENT '父级ID，默认父级菜单为根节点菜单',
  `orders` int(20) DEFAULT '0',
  `status` int(1) unsigned zerofill DEFAULT '0' COMMENT '0启动，1停用',
  `icon` varchar(40) DEFAULT NULL COMMENT '图标',
  `comments` varchar(38) DEFAULT NULL COMMENT '功能说明',
  `create_time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `is_delete` int(2) NOT NULL DEFAULT '0' COMMENT '0有效 1删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_resource
-- ----------------------------
INSERT INTO `sys_resource` VALUES ('0', '系统菜单', '', '-1', '', '-1', '0', '0', null, '', '', '0');
INSERT INTO `sys_resource` VALUES ('1', '系统菜单', '', '-1', '', '0', '0', '0', null, '', '', '0');
INSERT INTO `sys_resource` VALUES ('1493089791626319', '项目管理', '', '0', '一级模块', '1', '0', '0', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493089816426638', '组织架构管理', '', '0', '一级模块', '1', '0', '0', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493089982195835', '项目', '/project/proManage.html', '1', 'pmo', '1493089791626319', '0', '0', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493090013334368', '需求', '/project/demandManage.html', '1', 'pmo', '1493089791626319', '0', '0', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493090040974683', '人员管理', '/project/personManage.html', '1', '组织架构', '1493089816426638', '0', '0', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493090063936517', '角色管理', '/project/roleManage.html', '1', '组织架构', '1493089816426638', '0', '0', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493090085368714', '菜单管理', '/project/menuManage.html', '1', '组织架构', '1493089816426638', '0', '0', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493090262000120', '测试菜单11', '/project/xxxxx.html', '1', 'pmo', '1', '0', '1', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493203786051438', '新增项目', 'pmo_add_project', '2', 'pmo', '1493089982195835', '0', '0', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493203843687475', '导出项目', 'pmo_export_project', '2', 'pmo', '1493089982195835', '0', '0', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493797300646251', '测试菜单图标', '/project/xxxxx.html', '1', null, '1493089791626319', '0', '1', '', null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493891506181292', '新闻公告管理', '', '0', null, '1', '0', '0', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493891929755783', '新闻公告', '/project/newsManage.html', '1', null, '1493891506181292', '0', '0', null, null, null, '0');
INSERT INTO `sys_resource` VALUES ('1493896711165474', '新闻资讯管理', '/project/newsManage.html', '1', null, '1493891929755783', '0', '0', '', null, null, '0');
INSERT INTO `sys_resource` VALUES ('1494492826839250', '客户关系管理', '', '0', null, '1', '0', '0', '', null, null, '0');
INSERT INTO `sys_resource` VALUES ('1494492851433256', 'CRM配置', '/project/crmSetting.html', '1', null, '1494492826839250', '0', '0', '', null, null, '0');
INSERT INTO `sys_resource` VALUES ('1494492981584817', 'CRM--客户', '/project/crmClientManage.html', '1', null, '1494492826839250', '0', '0', '', null, null, '0');
INSERT INTO `sys_resource` VALUES ('1494493074991114', 'CRM--商机', '/project/crmBusinessManage.html', '1', null, '1494492826839250', '0', '0', '', null, null, '0');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` varchar(38) NOT NULL COMMENT '主键',
  `code` int(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL COMMENT '角色描述',
  `status` int(2) DEFAULT NULL COMMENT '角色状态 0启用，2禁用',
  `is_delete` int(2) NOT NULL DEFAULT '0' COMMENT '角色状态 0有效 1逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', null, '超级管理员', '（特殊含义角色），权限作用范围--整个组织架构管理模块', '0', '0');
INSERT INTO `sys_role` VALUES ('1493092892238723', null, 'pmo', '这是pmo', '0', '0');
INSERT INTO `sys_role` VALUES ('1493092910186790', null, '产品线大佬', '产品线老大', '1', '0');
INSERT INTO `sys_role` VALUES ('1493092927661836', null, '前端', '', '1', '0');
INSERT INTO `sys_role` VALUES ('1493092933431111', null, '后台', '', '1', '0');
INSERT INTO `sys_role` VALUES ('1493092938250378', null, '产品', '', '0', '0');
INSERT INTO `sys_role` VALUES ('1493092950303838', null, '运维', '', '0', '0');
INSERT INTO `sys_role` VALUES ('1493092957668546', null, '测试', '', '0', '0');
INSERT INTO `sys_role` VALUES ('1493092971328609', null, '设计', '', '0', '0');
INSERT INTO `sys_role` VALUES ('1493092982696820', null, '销售', '', '0', '0');
INSERT INTO `sys_role` VALUES ('1493178209075931', null, '立项(PMO)', '（特殊含义角色），权限作用范围--PMO新建项目', '1', '0');
INSERT INTO `sys_role` VALUES ('1493178331170686', '100899', '查看所有项目(PMO)', '（特殊含义角色），权限作用范围--可以查看所有项目，但仅限于查看，不可操作。', '0', '0');
INSERT INTO `sys_role` VALUES ('1493885991380387', null, '测试专用', '479/78978498', '0', '0');
INSERT INTO `sys_role` VALUES ('1494298487619445', null, '啊啊啊啊啊啊啊啊啊啊啊', '啊啊啊啊啊啊', '0', '0');
INSERT INTO `sys_role` VALUES ('1494411614363426', null, '测试123', '', '0', '0');
INSERT INTO `sys_role` VALUES ('1494495410289197', null, 'CRM管理员', 'CRM管理员', '0', '0');
INSERT INTO `sys_role` VALUES ('1494495458940560', null, 'CRM查看', '可查看CRM  但是看不到CRM配置页面', '0', '0');

-- ----------------------------
-- Table structure for sys_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_resource`;
CREATE TABLE `sys_role_resource` (
  `role_id` varchar(38) NOT NULL,
  `resource_id` varchar(38) NOT NULL,
  PRIMARY KEY (`role_id`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_resource
-- ----------------------------
INSERT INTO `sys_role_resource` VALUES ('1', '1');
INSERT INTO `sys_role_resource` VALUES ('1', '1493089791626319');
INSERT INTO `sys_role_resource` VALUES ('1', '1493089816426638');
INSERT INTO `sys_role_resource` VALUES ('1', '1493089982195835');
INSERT INTO `sys_role_resource` VALUES ('1', '1493090013334368');
INSERT INTO `sys_role_resource` VALUES ('1', '1493090040974683');
INSERT INTO `sys_role_resource` VALUES ('1', '1493090063936517');
INSERT INTO `sys_role_resource` VALUES ('1', '1493090085368714');
INSERT INTO `sys_role_resource` VALUES ('1', '1493090262000120');
INSERT INTO `sys_role_resource` VALUES ('1', '1493203786051438');
INSERT INTO `sys_role_resource` VALUES ('1', '1493203843687475');
INSERT INTO `sys_role_resource` VALUES ('1', '1493797300646251');
INSERT INTO `sys_role_resource` VALUES ('1', '1493891506181292');
INSERT INTO `sys_role_resource` VALUES ('1', '1493891929755783');
INSERT INTO `sys_role_resource` VALUES ('1', '1493896711165474');
INSERT INTO `sys_role_resource` VALUES ('1', '1494492826839250');
INSERT INTO `sys_role_resource` VALUES ('1', '1494492851433256');
INSERT INTO `sys_role_resource` VALUES ('1', '1494492981584817');
INSERT INTO `sys_role_resource` VALUES ('1', '1494493074991114');
INSERT INTO `sys_role_resource` VALUES ('1493088187706997', '1');
INSERT INTO `sys_role_resource` VALUES ('1493088187706997', '10001');
INSERT INTO `sys_role_resource` VALUES ('1493088187706997', '1000101');
INSERT INTO `sys_role_resource` VALUES ('1493088187706997', '1000102');
INSERT INTO `sys_role_resource` VALUES ('1493088187706997', '10002');
INSERT INTO `sys_role_resource` VALUES ('1493092892238723', '1');
INSERT INTO `sys_role_resource` VALUES ('1493092892238723', '1493089791626319');
INSERT INTO `sys_role_resource` VALUES ('1493092892238723', '1493089982195835');
INSERT INTO `sys_role_resource` VALUES ('1493092892238723', '1493090013334368');
INSERT INTO `sys_role_resource` VALUES ('1493092892238723', '1493203786051438');
INSERT INTO `sys_role_resource` VALUES ('1493092892238723', '1493203843687475');
INSERT INTO `sys_role_resource` VALUES ('1493092892238723', '1493891506181292');
INSERT INTO `sys_role_resource` VALUES ('1493092892238723', '1493891929755783');
INSERT INTO `sys_role_resource` VALUES ('1493092892238723', '1493896711165474');
INSERT INTO `sys_role_resource` VALUES ('1493092910186790', '1');
INSERT INTO `sys_role_resource` VALUES ('1493092910186790', '1493089791626319');
INSERT INTO `sys_role_resource` VALUES ('1493092910186790', '1493089982195835');
INSERT INTO `sys_role_resource` VALUES ('1493092910186790', '1493090013334368');
INSERT INTO `sys_role_resource` VALUES ('1493092910186790', '1493203786051438');
INSERT INTO `sys_role_resource` VALUES ('1493092910186790', '1493203843687475');
INSERT INTO `sys_role_resource` VALUES ('1493092927661836', '1');
INSERT INTO `sys_role_resource` VALUES ('1493092927661836', '1493089816426638');
INSERT INTO `sys_role_resource` VALUES ('1493092927661836', '1493090040974683');
INSERT INTO `sys_role_resource` VALUES ('1493092927661836', '1493090063936517');
INSERT INTO `sys_role_resource` VALUES ('1493092927661836', '1493090085368714');
INSERT INTO `sys_role_resource` VALUES ('1493092927661836', '1493891506181292');
INSERT INTO `sys_role_resource` VALUES ('1493092927661836', '1493891929755783');
INSERT INTO `sys_role_resource` VALUES ('1493092927661836', '1493896711165474');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493089791626319');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493089816426638');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493089982195835');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493090013334368');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493090040974683');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493090063936517');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493090085368714');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493203786051438');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493203843687475');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493797300646251');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493891506181292');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493891929755783');
INSERT INTO `sys_role_resource` VALUES ('1493092933431111', '1493896711165474');
INSERT INTO `sys_role_resource` VALUES ('1493092938250378', '1');
INSERT INTO `sys_role_resource` VALUES ('1493092938250378', '1493089791626319');
INSERT INTO `sys_role_resource` VALUES ('1493092938250378', '1493089816426638');
INSERT INTO `sys_role_resource` VALUES ('1493092938250378', '1493089982195835');
INSERT INTO `sys_role_resource` VALUES ('1493092938250378', '1493090013334368');
INSERT INTO `sys_role_resource` VALUES ('1493092938250378', '1493090040974683');
INSERT INTO `sys_role_resource` VALUES ('1493092938250378', '1493090063936517');
INSERT INTO `sys_role_resource` VALUES ('1493092938250378', '1493090085368714');
INSERT INTO `sys_role_resource` VALUES ('1493092938250378', '1493090262000120');
INSERT INTO `sys_role_resource` VALUES ('1493092938250378', '1493203786051438');
INSERT INTO `sys_role_resource` VALUES ('1493092938250378', '1493203843687475');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493089791626319');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493089816426638');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493089982195835');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493090013334368');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493090040974683');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493090063936517');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493090085368714');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493203786051438');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493203843687475');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493797300646251');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493891506181292');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493891929755783');
INSERT INTO `sys_role_resource` VALUES ('1493092957668546', '1493896711165474');
INSERT INTO `sys_role_resource` VALUES ('1493092982696820', '1');
INSERT INTO `sys_role_resource` VALUES ('1493092982696820', '1493089791626319');
INSERT INTO `sys_role_resource` VALUES ('1493092982696820', '1493089982195835');
INSERT INTO `sys_role_resource` VALUES ('1493092982696820', '1493090013334368');
INSERT INTO `sys_role_resource` VALUES ('1493092982696820', '1493203786051438');
INSERT INTO `sys_role_resource` VALUES ('1493092982696820', '1493203843687475');
INSERT INTO `sys_role_resource` VALUES ('1493092982696820', '1493797300646251');
INSERT INTO `sys_role_resource` VALUES ('1493178209075931', '1');
INSERT INTO `sys_role_resource` VALUES ('1493178209075931', '1493089791626319');
INSERT INTO `sys_role_resource` VALUES ('1493178209075931', '1493089982195835');
INSERT INTO `sys_role_resource` VALUES ('1493178209075931', '1493090013334368');
INSERT INTO `sys_role_resource` VALUES ('1493178209075931', '1493203786051438');
INSERT INTO `sys_role_resource` VALUES ('1493178209075931', '1493203843687475');
INSERT INTO `sys_role_resource` VALUES ('1493178331170686', '1');
INSERT INTO `sys_role_resource` VALUES ('1493178331170686', '1493089791626319');
INSERT INTO `sys_role_resource` VALUES ('1493178331170686', '1493089982195835');
INSERT INTO `sys_role_resource` VALUES ('1493178331170686', '1493090013334368');
INSERT INTO `sys_role_resource` VALUES ('1493178331170686', '1493203843687475');
INSERT INTO `sys_role_resource` VALUES ('1493885991380387', '1');
INSERT INTO `sys_role_resource` VALUES ('1493885991380387', '1493089791626319');
INSERT INTO `sys_role_resource` VALUES ('1493885991380387', '1493089816426638');
INSERT INTO `sys_role_resource` VALUES ('1493885991380387', '1493089982195835');
INSERT INTO `sys_role_resource` VALUES ('1493885991380387', '1493090013334368');
INSERT INTO `sys_role_resource` VALUES ('1493885991380387', '1493090040974683');
INSERT INTO `sys_role_resource` VALUES ('1493885991380387', '1493090063936517');
INSERT INTO `sys_role_resource` VALUES ('1493885991380387', '1493090085368714');
INSERT INTO `sys_role_resource` VALUES ('1493885991380387', '1493203786051438');
INSERT INTO `sys_role_resource` VALUES ('1493885991380387', '1493203843687475');
INSERT INTO `sys_role_resource` VALUES ('1493885991380387', '1493797300646251');
INSERT INTO `sys_role_resource` VALUES ('1494495410289197', '1');
INSERT INTO `sys_role_resource` VALUES ('1494495410289197', '1494492826839250');
INSERT INTO `sys_role_resource` VALUES ('1494495410289197', '1494492851433256');
INSERT INTO `sys_role_resource` VALUES ('1494495410289197', '1494492981584817');
INSERT INTO `sys_role_resource` VALUES ('1494495410289197', '1494493074991114');
INSERT INTO `sys_role_resource` VALUES ('1494495458940560', '1');
INSERT INTO `sys_role_resource` VALUES ('1494495458940560', '1494492826839250');
INSERT INTO `sys_role_resource` VALUES ('1494495458940560', '1494492981584817');
INSERT INTO `sys_role_resource` VALUES ('1494495458940560', '1494493074991114');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint(38) NOT NULL,
  `username` varchar(32) NOT NULL COMMENT '账户',
  `password` varchar(40) NOT NULL,
  `usercode` varchar(40) DEFAULT NULL,
  `realname` varchar(20) NOT NULL COMMENT '真实姓名',
  `idcard` varchar(18) DEFAULT NULL COMMENT '身份证号',
  `phone` varchar(20) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL COMMENT '座机号码',
  `email` varchar(32) NOT NULL COMMENT '用户编号',
  `sex` int(1) DEFAULT NULL COMMENT '1男 2女',
  `profess_level` varchar(40) DEFAULT NULL COMMENT '专业级别',
  `manage_level` varchar(40) DEFAULT NULL COMMENT '管理级别',
  `address` varchar(100) DEFAULT NULL COMMENT '常住地',
  `post` varchar(10) DEFAULT NULL COMMENT '岗位',
  `dep_id` varchar(38) DEFAULT '' COMMENT '所属部门',
  `head_pic` varchar(38) DEFAULT '',
  `direct_leader` varchar(38) DEFAULT NULL COMMENT '直接上级',
  `is_leave` int(1) DEFAULT '0' COMMENT '0在职，1停用离职',
  `create_time` bigint(38) DEFAULT NULL,
  `update_time` bigint(38) DEFAULT '0' COMMENT '0 默认可是',
  `is_delete` int(1) NOT NULL DEFAULT '0' COMMENT '0有效，1已经逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '000', '超级管理员', null, null, null, '', null, null, null, null, null, '', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119635', 'shezhideng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0001', '佘志登', null, '', null, 'shezhideng@ecaray.com', '1', null, null, null, 'CEO/创始人', '11', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119636', 'huzhiyang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0002', '胡志阳', null, '15818757802', null, 'huzhiyang@ecaray.com', '2', '3', '3', '深圳', '工程总监', '1501', '019397c64797418f879f4c533f4e3f3f', null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119637', 'wuhui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0003', '吴辉', null, '13794467694', null, 'wuhui@ecaray.com', '1', '3', '3', '深圳', '事业部总经理/PMO', '15', 'skins/img/man-default.png', null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119638', 'shulingyan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0004', '舒玲燕', null, '15989556479', null, 'shulingyan@ecaray.com', '2', null, null, null, '行政经理', '2202', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119639', 'chenzhiqiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0005', '陈志强', null, '15817464366', null, 'chenzhiqiang@ecaray.com', '1', null, null, null, '项目经理', '1901', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119640', 'renyangjing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0006', '任杨静', null, '18617102718', null, 'renyangjing@ecaray.com', '1', null, null, null, '项目经理', '1901', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119641', 'tanglin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0007', '唐林', null, '13725596011', null, 'tanglin@ecaray.com', '1', '3', '2', '深圳', '业务开发部经理', '150301', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119642', 'songlisha@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0008', '宋莉莎', null, '13725567920', null, 'songlisha@ecaray.com', '2', null, null, null, 'UI设计师', '1502', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119643', 'zhouguiying@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0009', '周桂英', null, '13480876082', null, 'zhouguiying@ecaray.com', '2', null, null, null, '软件测试工程师', '1604', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119644', 'limeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0010', '李萌', null, '18620323960', null, 'limeng@ecaray.com', '1', null, null, null, '市场总监', '1401', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119645', 'zhangyang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0011', '张阳', null, '13760488428', null, 'zhangyang@ecaray.com', '2', '3', '3', '深圳', 'JAVA开发工程师', '150301', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119646', 'youshuchang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0012', '尤书畅', null, '18682038507', null, 'youshuchang@ecaray.com', '2', '2', '2', '深圳', '产品经理', '1501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119647', 'renliang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0013', '任亮', null, '18038015570', null, 'renliang@ecaray.com', '1', '3', '3', '深圳', '事业部总经理', '16', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119648', 'chenweijun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0014', '陈伟君', null, '13510706860', null, 'chenweijun@ecaray.com', '1', '2', '1', '深圳', '运维组长', '190302', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119649', 'wuling@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0015', '吴玲', null, '13148711721', null, 'wuling@ecaray.com', '2', null, null, null, '运维总监', '1903', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119650', 'daixu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0016', '戴旭', null, '13715390451', null, 'daixu@ecaray.com', '1', '3', '2', '深圳', '业务开发经理', '1603', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119651', 'suhuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0019', '苏欢', null, '13686415261', null, 'suhuan@ecaray.com', '2', null, null, null, '测试经理', '1504', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119652', 'chaiwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0021', '柴卫', null, '18588264640', null, 'chaiwei@ecaray.com', '1', null, null, null, 'VC++开发工程师', '1603', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119653', 'zhuhanwu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0022', '朱涵武', null, '18824679814', null, 'zhuhanwu@ecaray.com', '1', null, null, null, '项目经理', '1901', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119654', 'chentiejun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0023', '陈铁钧', null, '13632705581', null, 'chentiejun@ecaray.com', '1', '2', '2', '深圳', 'WEB前端开发工程师', '1603', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119655', 'liwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0024', '李伟', null, '13006617634', null, 'liwei@ecaray.com', '1', null, null, null, '产品经理', '1501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119656', 'likongquan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0025', '李孔泉', null, '13686441605', null, 'likongquan@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1603', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119657', 'guanjie@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0026', '关杰', null, '13798347597', null, 'guanjie@ecaray.com', '1', null, null, null, '项目经理', '1605', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119658', 'wuqiuding@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0027', '吴秋定', null, '18688164028', null, 'wuqiuding@ecaray.com', '1', '2', '2', '深圳', 'JAVA开发工程师', '1603', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119659', 'wengxiuwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0028', '翁秀玮', null, '13424228087', null, 'wengxiuwei@ecaray.com', '1', null, null, null, '用户运营经理', '2001', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119660', 'qihuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0029', '齐焕', null, '15323486898', null, 'qihuan@ecaray.com', '1', '2', '2', '深圳', 'IOS开发工程师', '1703', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119661', 'wangtaixiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0030', '王太祥', null, '13760312367', null, 'wangtaixiang@ecaray.com', '1', '2', '2', '深圳', 'IOS开发工程师', '1703', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119662', 'liurenyi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0031', '刘仁义', null, '18656957123', null, 'liurenyi@ecaray.com', '1', null, null, null, '营销中心总经理', '14', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119663', 'jinzheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0032', '金征', null, '18923729010', null, 'jinzheng@ecaray.com', '1', '2', '2', '深圳', 'ANDROID开发经', '1603', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119664', 'zhujinliang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0033', '朱金亮', null, '13509671516', null, 'zhujinliang@ecaray.com', '1', null, null, null, '首席架构师', '18', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119665', 'liaodebao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0034', '廖德宝', null, '18576689241', null, 'liaodebao@ecaray.com', '1', null, null, null, '设计经理', '1502', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119666', 'huangxiubin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0035', '黄修彬', null, '13684956579', null, 'huangxiubin@ecaray.com', '1', '2', '2', '深圳', '业务开发部经理', '1703', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119667', 'lixiaolei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0037', '李晓磊', null, '13828777309', null, 'lixiaolei@ecaray.com', '1', null, null, null, '事业部总经理', '17', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119668', 'liuhuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0038', '刘欢', null, '18670006357', null, 'liuhuan@ecaray.com', '1', null, null, null, 'ANDROID开发工', '1603', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119669', 'haomeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0039', '郝猛', null, '13798223423', null, 'haomeng@ecaray.com', '1', '2', '2', '深圳', '大区总监', '1403', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119670', 'meiyujie@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0040', '梅宇杰', null, '13537503318', null, 'meiyujie@ecaray.com', '1', null, null, null, '区域经理', '140402', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119671', 'lijialong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0041', '李嘉隆', null, '18503086491', null, 'lijialong@ecaray.com', '1', null, null, null, '软件测试工程师', '1604', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119672', 'youweijun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0042', '游伟军', null, '13244898100', null, 'youweijun@ecaray.com', '1', null, null, null, '大区总监', '1406', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119673', 'dupeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0043', '杜鹏', null, '13603029441', null, 'dupeng@ecaray.com', '1', null, null, null, '大区总监', '1407', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119674', 'huhaiyang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0044', '胡海洋', null, '13632583828', null, 'huhaiyang@ecaray.com', '1', null, null, null, '营销中心总经理助理', '14', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119675', 'zhangzuyuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0045', '张祖媛', null, '15817238732', null, 'zhangzuyuan@ecaray.com', '2', '1', '1', '深圳', '软件测试工程师', '1704', 'skins/img/man-default.png', null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119676', 'zhouweiping@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0047', '周伟平', null, '13424377117', null, 'zhouweiping@ecaray.com', '1', null, null, null, '拓展组长', '2005', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119677', 'liuweiguo@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0048', '刘伟国', null, '18320996928', null, 'liuweiguo@ecaray.com', '1', null, null, null, '客户经理', '2005', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119678', 'guanyachao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0049', '管亚超', null, '15986760694', null, 'guanyachao@ecaray.com', '1', null, null, null, '大区总监', '1405', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119679', 'liuweili@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0050', '刘炜丽', null, '18988799026', null, 'liuweili@ecaray.com', '2', null, null, null, '市场推广经理', '140103', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119680', 'zhangjunlong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0051', '张俊龙', null, '13510236556', null, 'zhangjunlong@ecaray.com', '1', null, null, null, '客户经理', '140701', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119681', 'chenyandan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0052', '陈艳丹', null, '18565752003', null, 'chenyandan@ecaray.com', '1', null, null, null, '供应链组长', '190201', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119682', 'lipenghui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0053', '李鹏辉', null, '18665953490', null, 'lipenghui@ecaray.com', '1', null, null, null, '区域经理', '140702', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119683', 'yujinhui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0054', '余锦辉', null, '18566218485', null, 'yujinhui@ecaray.com', '1', null, null, null, '大区总监', '1404', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119684', 'liushiqiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0055', '刘世强', null, '15012880521', null, 'liushiqiang@ecaray.com', '1', null, null, null, '维护组长', '190203', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119685', 'duanshizhen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0056', '段石振', null, '13040874588', null, 'duanshizhen@ecaray.com', '1', '2', '1', '深圳', 'JAVA开发工程师', '1494387277569593', 'skins/img/man-default.png', null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119686', 'yaofeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0057', '姚峰', null, '15919849987', null, 'yaofeng@ecaray.com', '1', '2', '1', '深圳', '微信开发经理（代）', '1603', 'skins/img/man-default.png', null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119687', 'shangshijiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0059', '尚士江', null, '15919936686', null, 'shangshijiang@ecaray.com', '1', '2', '1', '深圳', '区域经理', '140701', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119688', 'wuxia@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0060', '吴侠', null, '15813801163', null, 'wuxia@ecaray.com', '1', '1', '1', '深圳', '客户经理', '149440448142398', 'skins/img/man-default.png', null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119689', 'machuntang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0061', '马春堂', null, '18814359426', null, 'machuntang@ecaray.com', '1', '2', '1', '武汉', '工程经理', '190204', 'skins/img/man-default.png', null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119690', 'chenruibin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0062', '陈锐斌', null, '13425168558', null, 'chenruibin@ecaray.com', '1', '1', '1', '深圳', '客户经理', '140701', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119691', 'qinqianwen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0063', '覃倩雯', null, '18823366059', null, 'qinqianwen@ecaray.com', '2', '1', '1', '深圳', '微信运营', '2002', 'skins/img/man-default.png', null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119692', 'panguixing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0064', '潘桂云', null, '13528428068', null, 'panguixing@ecaray.com', '2', '1', '1', '深圳', '区域经理', '1403', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119693', 'zhangzhiqiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0065', '张志强', null, '18620398518', null, 'zhangzhiqiang@ecaray.com', '1', '2', '2', '深圳', '产品经理', '1', 'skins/img/man-default.png', null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119694', 'chenchunshu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0066', '陈春树', null, '18588231205', null, 'chenchunshu@ecaray.com', '1', null, null, null, '产品经理(清算系统）', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119695', 'ningdi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0067', '宁迪', null, '15236620030', null, 'ningdi@ecaray.com', '1', null, null, null, 'WEB前端开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119696', 'hexiaogang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0068', '何孝刚', null, '18566276006', null, 'hexiaogang@ecaray.com', '2', '1', '1', '深圳', '客户经理', '140602', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119697', 'zhululu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0069', '祝露露', null, '18067518258', null, 'zhululu@ecaray.com', '2', null, null, null, '招聘专员', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119698', 'bichun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0070', '毕纯', null, '13418634913', null, 'bichun@ecaray.com', '2', null, null, null, '软件测试工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119699', 'zhanghuida@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0071', '张晖达', null, '13729042068', null, 'zhanghuida@ecaray.com', '1', null, null, null, 'VC++开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119700', 'tanqiaofang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0072', '谭巧芳', null, '18826583665', null, 'tanqiaofang@ecaray.com', '2', null, null, null, 'WEB前端开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119701', 'gongyouqiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0073', '龚佑强', null, '18566775007', null, 'gongyouqiang@ecaray.com', '1', null, null, null, 'IOS开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119702', 'liuxiaoming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0074', '刘小明', null, '15579677961', null, 'liuxiaoming@ecaray.com', '1', null, null, null, '采购专员', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119703', 'liuyushu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0075', '刘玉书', null, '13670067715', null, 'liuyushu@ecaray.com', '2', '2', '1', '深圳', '渠道大客户经理', '1494294481300654', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119704', 'chenli@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0076', '陈丽', null, '13823718160', null, 'chenli@ecaray.com', '2', '1', '1', '深圳', '区域经理', '140701', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119705', 'zhongxiaoyan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0077', '钟晓燕', null, '13662244943', null, 'zhongxiaoyan@ecaray.com', '2', null, null, null, 'WEB前端开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119706', 'zhangtao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0078', '张涛', null, '18680318656', null, 'zhangtao@ecaray.com', '1', null, null, null, '项目实施组长', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119707', 'lijiahui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0079', '李佳慧', null, '17603055339', null, 'lijiahui@ecaray.com', '2', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119708', 'lujundong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0080', '卢俊东', null, '13590458189', null, 'lujundong@ecaray.com', '1', '1', '1', '深圳', '客户经理', '140701', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119709', 'huafengcui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0081', '华凤毳', null, '13510563127', null, 'huafengcui@ecaray.com', '1', null, null, null, '支付组开发经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119710', 'weihongzhou@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0082', '韦宏周', null, '13622351331', null, 'weihongzhou@ecaray.com', '1', null, null, null, 'UI设计师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119711', 'weichuanbo@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0083', '魏传波', null, '17091602262', null, 'weichuanbo@ecaray.com', '1', null, null, null, 'WEB前端开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119712', 'zhutiantong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0084', '朱天同', null, '18612451034', null, 'zhutiantong@ecaray.com', '1', null, null, null, '高级算法工程师（模式', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119713', 'xiansong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0085', '鲜松', null, '18111576249', null, 'xiansong@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119714', 'zhouguoting@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0086', '周国婷', null, '13554135602', null, 'zhouguoting@ecaray.com', '2', null, null, null, '运维专员', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119715', 'wangqun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0087', '王群', null, '13631581616', null, 'wangqun@ecaray.com', '2', null, null, null, '软件测试工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119716', 'tanyi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0088', '谈意', null, '18571492260', null, 'tanyi@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119717', 'huangjianhao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0089', '黄剑豪', null, '13590299759', null, 'huangjianhao@ecaray.com', '1', null, null, null, 'ANDROID开发工', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119718', 'lishirong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0090', '李世荣', null, '18565897688', null, 'lishirong@ecaray.com', '2', null, null, null, '人资行政总监', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119719', 'liuyuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0091', '刘源', null, '13725566254', null, 'liuyuan@ecaray.com', '1', null, null, null, '活动运营经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119720', 'zhangjinquan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0092', '张晋权', null, '13750595035', null, 'zhangjinquan@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119721', 'lijing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0093', '李靖', null, '15855140255', null, 'lijing@ecaray.com', '1', null, null, null, '维护工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119722', 'chenjun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0094', '陈俊', null, '15986649453', null, 'chenjun@ecaray.com', '1', null, null, null, '项目经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119723', 'panjianghui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0095', '潘江辉', null, '15627564900', null, 'panjianghui@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119724', 'licao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0096', '李操', null, '18638772365', null, 'licao@ecaray.com', '1', null, null, null, '项目经理助理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119725', 'zhujie@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0097', '朱洁', null, '15986671254', null, 'zhujie@ecaray.com', '1', null, null, null, 'ANDROID开发工', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119726', 'lizhibiao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0098', '李志标', null, '13631223572', null, 'lizhibiao@ecaray.com', '1', null, null, null, '软件测试工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119727', 'pengjianwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0100', '彭建威', null, '13535534356', null, 'pengjianwei@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119728', 'chenrong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0101', '陈熔', null, '15019256273', null, 'chenrong@ecaray.com', '2', null, null, null, '拓展组长', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119729', 'wangqibiao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0102', '王其标', null, '18354270712', null, 'wangqibiao@ecaray.com', '1', null, null, null, 'WEB前端开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119730', 'zhoulieju@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0104', '周烈驹', null, '18682393956', null, 'zhoulieju@ecaray.com', '1', '2', '1', '成都', '售前技术经理', '140601', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119731', 'huangyan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0105', '黄焰', null, '15816815478', null, 'huangyan@ecaray.com', '2', null, null, null, '会计', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119732', 'zengyudong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0106', '曾宇东', null, '18038162251', null, 'zengyudong@ecaray.com', '1', null, null, null, '项目实施组长', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119733', 'zhaominxia@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0107', '赵旻霞', null, '13778186087', null, 'zhaominxia@ecaray.com', '2', null, null, null, '前台文员', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119734', 'limansi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0108', '李曼斯', null, '18218023559', null, 'limansi@ecaray.com', '2', null, null, null, 'UI设计师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119735', 'shima@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0110', '石马', null, '18588402560', null, 'shima@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119736', 'yantao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0111', '颜涛涛', null, '17711618092', null, 'yantao@ecaray.com', '1', null, null, null, '运营推广经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119737', 'lizhenyu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0112', '李振玉', null, '18236915502', null, 'lizhenyu@ecaray.com', '1', null, null, null, '维护组长', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119738', 'wangyanping@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0113', '王延平', null, '18216068500', null, 'wangyanping@ecaray.com', '1', null, null, null, '项目实施组长', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119739', 'liqing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0114', '李庆', null, '15903631339', null, 'liqing@ecaray.com', '1', '1', '1', '长沙', '售前技术经理', '140601', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119740', 'huangpeipei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0115', '黄培培', null, '15768116369', null, 'huangpeipei@ecaray.com', '2', '2', '2', '深圳', '售前技术经理', '1', 'be832bc184634a949bc48cc6ec905580', null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119741', 'wangqi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0118', '王琦', null, '13647273787', null, 'wangqi@ecaray.com', '2', '2', '1', '武汉', '销售行政', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119742', 'wangmingze@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0119', '王明择', null, '15827412393', null, 'wangmingze@ecaray.com', '2', '1', '1', '武汉', '客户经理', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119743', 'liurenkai@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0120', '刘仁恺', null, '13971246325', null, 'liurenkai@ecaray.com', '2', '1', '1', '武汉', '客户经理', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119744', 'linjianli@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0121', '林坚立', null, '13922828632', null, 'linjianli@ecaray.com', '1', null, null, null, '战略发展部总经理/商', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119745', 'zhengjiannan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0123', '郑建楠', null, '13429122762', null, 'zhengjiannan@ecaray.com', '1', null, null, null, '维护工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119746', 'yuhanrong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0124', '余汉荣', null, '15879195005', null, 'yuhanrong@ecaray.com', '1', null, null, null, '运营推广', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119747', 'lisheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0125', '李胜', null, '18198622645', null, 'lisheng@ecaray.com', '2', '1', '1', '贵阳', '区域经理', '140602', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119748', 'chenjianhua@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0126', '陈建华', null, '13580563822', null, 'chenjianhua@ecaray.com', '1', null, null, null, '运营推广', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119749', 'chenyansi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0128', '陈燕思', null, '18620733886', null, 'chenyansi@ecaray.com', '2', '1', '1', '广州', '区域经理', '140702', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119750', 'yuyongdong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0129', '余永东', null, '15717105537', null, 'yuyongdong@ecaray.com', '2', '1', '1', '武汉', '客户经理', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119751', 'wangbin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0130', '王斌', null, '13971666640', null, 'wangbin@ecaray.com', '2', '1', '1', '武汉', '客户经理', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119752', 'liuxiaofei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0131', '柳小飞', null, '13662201931', null, 'liuxiaofei@ecaray.com', '1', null, null, null, '工程组长', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119753', 'dengsiting@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0132', '邓思婷', null, '15521306464', null, 'dengsiting@ecaray.com', '2', null, null, null, '客户经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119754', 'wangti@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0133', '汪体', null, '15013754865', null, 'wangti@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119755', 'liuxuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0134', '刘璇', null, '17727475276', null, 'liuxuan@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119756', 'gongruixia@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0135', '龚瑞霞', null, '15211192261', null, 'gongruixia@ecaray.com', '2', null, null, null, '会计', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119757', 'fanwenhai@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0136', '范文海', null, '15013266362', null, 'fanwenhai@ecaray.com', '2', '1', '1', '广州', '客户经理', '140702', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119758', 'yukankan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0137', '余侃侃', null, '18007152501', null, 'yukankan@ecaray.com', '2', '1', '1', '武汉', '客户经理', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119759', 'chenhao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0138', '陈浩', null, '18285148056', null, 'chenhao@ecaray.com', '2', '1', '1', '贵阳', '客户经理', '140602', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119760', 'shangyundong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0139', '尚云冬', null, '18620079570', null, 'shangyundong@ecaray.com', '1', null, null, null, '高级JAVA开发工程', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119761', 'xiongshiqiong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0140', '熊世琼', null, '18798862683', null, 'xiongshiqiong@ecaray.com', '2', '1', '1', '贵阳', '销售行政', '140602', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119762', 'tanghaizhong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0141', '唐海中', null, '13902202351', null, 'tanghaizhong@ecaray.com', '2', '1', '1', '广州', '客户经理', '140702', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119763', 'liuquan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0142', '刘全', null, '18671464642', null, 'liuquan@ecaray.com', '2', '1', '1', '武汉', '客户经理', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119764', 'wujieqiu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0144', '吴杰秋', null, '18603068007', null, 'wujieqiu@ecaray.com', '2', '2', '1', '深圳', '售前技术经理', '140202', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119765', 'chenlin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0145', '陈淋', null, '15820769057', null, 'chenlin@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119766', 'yangpeili@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0146', '杨佩丽', null, '15915494786', null, 'yangpeili@ecaray.com', '2', null, null, null, '活动策划', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119767', 'lianglibin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0147', '梁礼斌', null, '13927415995', null, 'lianglibin@ecaray.com', '1', null, null, null, '运营推广', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119768', 'luogang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0148', '罗刚', null, '15915788571', null, 'luogang@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119769', 'lizhangjin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0149', '黎章锦', null, '13751102089', null, 'lizhangjin@ecaray.com', '1', null, null, null, '运营推广', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119770', 'songkun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0151', '宋坤', null, '15180867808', null, 'songkun@ecaray.com', '2', '1', '1', '贵阳', '客户经理', '140602', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119771', 'wuxiaoming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0153', '伍小明', null, '15914163750', null, 'wuxiaoming@ecaray.com', '2', '3', '1', '深圳', '售前技术经理', '140202', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119772', 'hepeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0154', '何鹏', null, '18658857047', null, 'hepeng@ecaray.com', '1', null, null, null, '产品经理/产品委员会', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119773', 'yangjun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0155', '杨军', null, '18588266297', null, 'yangjun@ecaray.com', '2', '1', '1', '贵阳', '区域经理', '140602', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119774', 'chenchunning@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0156', '陈春宁', null, '18092562685', null, 'chenchunning@ecaray.com', '2', '1', '1', '西安', '区域经理', '140502', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119775', 'zhangbing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0157', '张冰', null, '18950340465', null, 'zhangbing@ecaray.com', '2', '1', '1', '福州', '区域经理', '140403', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119776', 'gaochao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0158', '高超', null, '18607194792', null, 'gaochao@ecaray.com', '2', '1', '1', '武汉', '区域经理', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119777', 'qianzhengyang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0159', '钱正阳', null, '13815894571', null, 'qianzhengyang@ecaray.com', '2', '2', '1', '南京', '区域经理', '140401', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119778', 'fuweiquan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0160', '付伟权', null, '13620958614', null, 'fuweiquan@ecaray.com', '1', null, null, null, '运营推广', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119779', 'youjinqing@ecaray.com', 'a45fdb1e4ac646c9e65a1769663e5704', '0161', '游锦青', null, '13542287744', null, 'youjinqing@ecaray.com', '1', null, null, null, '软件测试工程师', '1', null, null, '0', null, '1494249814125', '0');
INSERT INTO `sys_user` VALUES ('149309277119780', 'luhao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0162', '卢浩', null, '17780585005', null, 'luhao@ecaray.com', '2', '1', '1', '成都', '区域经理', '140601', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119781', 'lvkongyong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0163', '吕孔永', null, '18665887191', null, 'lvkongyong@ecaray.com', '1', null, null, null, '事业部副总经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119782', 'shenronghua@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0164', '申荣华', null, '13825218061', null, 'shenronghua@ecaray.com', '2', null, null, null, '客服主管-C端', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119783', 'zhangsiqi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0165', '张思祺', null, '13469982561', null, 'zhangsiqi@ecaray.com', '1', null, null, null, '运营推广', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119784', 'liujiahao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0166', '刘家浩', null, '13971020063', null, 'liujiahao@ecaray.com', '1', null, null, null, '运营推广', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119785', 'liuxiali@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0167', '柳夏利', null, '15802688134', null, 'liuxiali@ecaray.com', '2', null, null, null, 'ANDROID开发工', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119786', 'qiugongjian@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0168', '邱工建', null, '18930366678', null, 'qiugongjian@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119787', 'zhangweidong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0169', '张卫东', null, '13628600202', null, 'zhangweidong@ecaray.com', '2', '1', '1', '武汉', '客户经理', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119788', 'caijingfang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0171', '蔡景放', null, '15889486521', null, 'caijingfang@ecaray.com', '1', null, null, null, '客户经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119789', 'ouli@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0172', '欧礼', null, '18680339531', null, 'ouli@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119790', 'wanghan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0173', '王寒', null, '13798543571', null, 'wanghan@ecaray.com', '2', null, null, null, '产品经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119791', 'chenjian@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0175', '陈健', null, '13922828862', null, 'chenjian@ecaray.com', '1', null, null, null, '运营总监/事业部副总', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119792', 'tiandezhi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0176', '田德志', null, '18030954200', null, 'tiandezhi@ecaray.com', '1', null, null, null, '应用运维工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119793', 'chenmengshan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0178', '陈猛山', null, '15777350713', null, 'chenmengshan@ecaray.com', '1', null, null, null, '应用运维工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119794', 'xiaowaisheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0179', '肖外生', null, '15818470799', null, 'xiaowaisheng@ecaray.com', '1', null, null, null, '软件测试工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119795', 'hongyansheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0180', '洪言声', null, '13797720661', null, 'hongyansheng@ecaray.com', '1', null, null, null, '项目实施工程师（实习', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119796', 'tangzonghong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0181', '唐宗鸿', null, '18178727367', null, 'tangzonghong@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119797', 'hefanfan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0182', '何凡凡', null, '15017921180', null, 'hefanfan@ecaray.com', '2', '2', '2', '深圳', '微信开发工程师', '1503', null, null, '0', null, '1494299305525', '0');
INSERT INTO `sys_user` VALUES ('149309277119798', 'liguangrong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0183', '李光荣', null, '13316803002', null, 'liguangrong@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119799', 'huangkefangyi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0184', '黄可方毅', null, '18682022646', null, 'huangkefangyi@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119800', 'wanghanzhong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0185', '王汉忠', null, '15915358533', null, 'wanghanzhong@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119801', 'xiaoyunfeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0186', '肖云峰', null, '18600016857', null, 'xiaoyunfeng@ecaray.com', '2', '1', '1', '北京', '区域经理', '1494295999581605', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119802', 'zhanghai@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0187', '张海', null, '15994288855', null, 'zhanghai@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119803', 'tangxinfu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0188', '唐新富', null, '13765575504', null, 'tangxinfu@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119804', 'dengweitang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0189', '邓伟棠', null, '13428283655', null, 'dengweitang@ecaray.com', '1', null, null, null, 'VC++开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119805', 'youxuanbing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0190', '游镟冰', null, '15767346587', null, 'youxuanbing@ecaray.com', '2', '1', '1', '深圳', '商务支持专员', '140101', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119806', 'wujiandong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0191', '巫建东', null, '13420907039', null, 'wujiandong@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119807', 'wujingming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0192', '吴敬民', null, '18676371314', null, 'wujingming@ecaray.com', '1', null, null, null, '维护工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119808', 'mingruipeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0193', '明瑞鹏', null, '13733561455', null, 'mingruipeng@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119809', 'chenyunyan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0194', '陈云燕', null, '15919746069', null, 'chenyunyan@ecaray.com', '2', null, null, null, '客户经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119810', 'wanhongjun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0196', '万红军', null, '18819075213', null, 'wanhongjun@ecaray.com', '1', null, null, null, '软件测试工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119811', 'wulihui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0197', '吴立辉', null, '18576672200', null, 'wulihui@ecaray.com', '1', null, null, null, '产品经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119812', 'zhangxinyu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0198', '张新宇', null, '18904058683', null, 'zhangxinyu@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119813', 'xulikao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0199', '徐礼考', null, '18675582946', null, 'xulikao@ecaray.com', '1', null, null, null, '维护工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119814', 'jiaogangqiao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0200', '焦岗桥', null, '15918884403', null, 'jiaogangqiao@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119815', 'suhuihong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0201', '苏惠红', null, '13510128148', null, 'suhuihong@ecaray.com', '2', null, null, null, '软件测试工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119816', 'liuyong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0202', '刘勇', null, '13802413158', null, 'liuyong@ecaray.com', '2', '1', '1', '广州', '区域经理', '140702', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119817', 'yangxiaodong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0203', '杨晓冬', null, '13628484078', null, 'yangxiaodong@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119818', 'liuyang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0204', '刘洋', null, '13886039016', null, 'liuyang@ecaray.com', '2', '1', '1', '武汉', '客户经理', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119819', 'sunchenchen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0205', '孙辰琛', null, '15707290410', null, 'sunchenchen@ecaray.com', '2', null, null, null, 'UI设计师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119820', 'xieguozhu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0206', '谢国柱', null, '13650841778', null, 'xieguozhu@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119821', 'yuanxiong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0207', '袁雄', null, '13429896361', null, 'yuanxiong@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119822', 'huangzhoulong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0208', '黄周龙', null, '15157150519', null, 'huangzhoulong@ecaray.com', '2', '1', '1', '武汉', '客户经理', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119823', 'fangbin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0210', '方斌', null, '18682172730', null, 'fangbin@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119824', 'tangrenfang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0211', '唐仁芳', null, '15151713757', null, 'tangrenfang@ecaray.com', '2', '1', '1', '深圳', '商务助理', '140101', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119825', 'zhaolong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0212', '赵龙', null, '13380366997', null, 'zhaolong@ecaray.com', '1', null, null, null, '维护工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119826', 'wuling01@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0213', '伍玲', null, '17051121050', null, 'wuling01@ecaray.com', '2', null, null, null, '人资行政专员', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119827', 'chensheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0214', '陈胜', null, '13545009275', null, 'chensheng@ecaray.com', '2', '1', '1', '湖南', '客户经理', '140802', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119828', 'qinxiaodan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0215', '覃晓丹', null, '15102185708', null, 'qinxiaodan@ecaray.com', '2', null, null, null, '应用运维工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119829', 'zhangzhilin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0216', '张智林', null, '15012481421', null, 'zhangzhilin@ecaray.com', '1', null, null, null, '维护工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119830', 'zengxiaoju@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0217', '曾小菊', null, '15102980104', null, 'zengxiaoju@ecaray.com', '2', null, null, null, '客服专员-C端', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119831', 'haowenbo@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0218', '郝问博', null, '13783597736', null, 'haowenbo@ecaray.com', '2', '1', '1', '郑州', '区域经理', '149429639001099', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119832', 'subingkun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0219', '苏秉昆', null, '13397159715', null, 'subingkun@ecaray.com', '1', null, null, null, '项目经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119833', 'wuchengcheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0220', '吴程程', null, '15172749559', null, 'wuchengcheng@ecaray.com', '1', null, null, null, '软件测试工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119834', 'fengjinjie@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0221', '冯晋劼', null, '18681816952', null, 'fengjinjie@ecaray.com', '2', '1', '1', '西安', '售前技术经理', '140502', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119835', 'tiansicheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0223', '田嗣程', null, '18707437105', null, 'tiansicheng@ecaray.com', '1', null, null, null, '产品经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119836', 'liuming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0224', '刘明', null, '13632746921', null, 'liuming@ecaray.com', '1', null, null, null, '运营推广', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119837', 'yuanhongchao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0225', '苑洪超', null, '18678397645', null, 'yuanhongchao@ecaray.com', '2', '1', '1', '济南', '区域经理', '1494296034878656', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119838', 'sunjie@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0227', '孙洁', null, '13760222663', null, 'sunjie@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119839', 'shifangming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0228', '石芳铭', null, '18507109066', null, 'shifangming@ecaray.com', '2', null, null, null, '战略发展经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119840', 'wangyingping@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0229', '汪莹萍', null, '15871713815', null, 'wangyingping@ecaray.com', '2', null, null, null, '运营推广', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119841', 'luohan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0230', '罗寒', null, '13560747408', null, 'luohan@ecaray.com', '2', null, null, null, '.NET开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119842', 'huhaibo@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0231', '胡海波', null, '18124092672', null, 'huhaibo@ecaray.com', '1', null, null, null, '应用运维工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119843', 'gaohonglong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0232', '高宏龙', null, '18664322753', null, 'gaohonglong@ecaray.com', '1', null, null, null, '软件测试工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119844', 'liangmin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0233', '梁敏', null, '15915897973', null, 'liangmin@ecaray.com', '1', null, null, null, '维护工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119845', 'wangchen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0234', '王晨', null, '15927482515', null, 'wangchen@ecaray.com', '1', null, null, null, '区域运营主管', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119846', 'hetianlong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0235', '何天龙', null, '13564667357', null, 'hetianlong@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119847', 'hehui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0236', '何辉', null, '18874284764', null, 'hehui@ecaray.com', '1', null, null, null, '服务器运维工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119848', 'huxingchang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0237', '胡兴昶', null, '15727207142', null, 'huxingchang@ecaray.com', '1', null, null, null, '运维专员（实习）', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119849', 'zhuoshengping@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0238', '卓胜平', null, '15012903949', null, 'zhuoshengping@ecaray.com', '1', null, null, null, '产品经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119850', 'zhoupan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0239', '周盼', null, '18721550172', null, 'zhoupan@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119851', 'zhaohuanyu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0240', '赵环宇', null, '15332127676', null, 'zhaohuanyu@ecaray.com', '2', '1', '1', '天津', '区域经理', '1494295999581605', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119852', 'zhuchaoyou@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0241', '朱朝友', null, '13522448081', null, 'zhuchaoyou@ecaray.com', '1', null, null, null, '项目经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119853', 'fuyong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0243', '付勇', null, '13714136097', null, 'fuyong@ecaray.com', '2', '1', '1', '成都', '区域经理', '140601', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119854', 'wangruyue@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0244', '王如岳', null, '18676695200', null, 'wangruyue@ecaray.com', '1', null, null, null, '测试总监', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119855', 'xuqipi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0245', '徐起丕', null, '13349933226', null, 'xuqipi@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119856', 'xiachongchong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0247', '夏冲冲', null, '18138812781', null, 'xiachongchong@ecaray.com', '1', null, null, null, '项目实施工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119857', 'zhongjianying@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0248', '钟建英', null, '13539784430', null, 'zhongjianying@ecaray.com', '2', null, null, null, '人资专员', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119858', 'chenhongying@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0250', '陈红英', null, '13026655385', null, 'chenhongying@ecaray.com', '2', null, null, null, '测试经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119859', 'xiongxiaojun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0251', '熊小军', null, '13038360141', null, 'xiongxiaojun@ecaray.com', '1', null, null, null, 'WEB前端开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119860', 'fangcheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0252', '方成', null, '15806040376', null, 'fangcheng@ecaray.com', '1', null, null, null, '应用运维工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119861', 'wangxi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0253', '王曦', null, '17764548181', null, 'wangxi@ecaray.com', '1', null, null, null, '项目经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119862', 'xieyuexing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0254', '谢月星', null, '13510353610', null, 'xieyuexing@ecaray.com', '2', '2', '1', '深圳', '售前技术经理', '140202', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119863', 'jiangcanhua@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0257', '江灿华', null, '13874930369', null, 'jiangcanhua@ecaray.com', '1', null, null, null, '软件测试工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119864', 'zhujianwen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0258', '朱剑文', null, '17603049266', null, 'zhujianwen@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119865', 'luoshanglin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0259', '罗尚林', null, '18072787987', null, 'luoshanglin@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119866', 'liubang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0260', '刘邦', null, '13246739013', null, 'liubang@ecaray.com', '1', null, null, null, '应用运维工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119867', 'liaoyingying@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0261', '廖莹颖', null, '15778429045', null, 'liaoyingying@ecaray.com', '2', null, null, null, 'IOS开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119868', 'liuyuchen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0262', '刘语晨', null, '13631623935', null, 'liuyuchen@ecaray.com', '2', null, null, null, '软件测试工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119869', 'dubin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0263', '杜彬', null, '15000497050', null, 'dubin@ecaray.com', '1', null, null, null, '运营推广经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119870', 'liuruixue@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0264', '刘瑞雪', null, '13316962026', null, 'liuruixue@ecaray.com', '2', null, null, null, '停车场物业主管', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119871', 'wangjianming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0265', '王建明', null, '18391041261', null, 'wangjianming@ecaray.com', '1', null, null, null, 'ANDROID开发工', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119872', 'ranchengwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0266', '冉成伟', null, '15919447869', null, 'ranchengwei@ecaray.com', '1', null, null, null, 'WEB前端开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119873', 'lixianchun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0267', '李先春', null, '15817385403', null, 'lixianchun@ecaray.com', '2', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119874', 'liuqingwen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0268', '刘庆文', null, '18576763970', null, 'liuqingwen@ecaray.com', '1', null, null, null, '项目经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119875', 'lixufeng@ecaray', 'e10adc3949ba59abbe56e057f20f883e', '0270', '李绪锋', null, '18680335813', null, 'lixufeng@ecaray', '1', null, null, null, '客户经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119876', 'jiangyaqin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0271', '江雅琴', null, '13510550450', null, 'jiangyaqin@ecaray.com', '2', null, null, null, '人才发展经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119877', 'dangjing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0272', '党静', null, '15380821984', null, 'dangjing@ecaray.com', '2', '1', '1', '南京', '售前技术经理', '140401', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119878', 'xuchenguang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0273', '徐晨光', null, '13924665780', null, 'xuchenguang@ecaray.com', '2', '1', '1', '深圳', '售前技术经理', '140202', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119879', 'jiangyue@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0274', '蒋悦', null, '18033405192', null, 'jiangyue@ecaray.com', '1', null, null, null, '研发副总裁', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119880', 'hepengfei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0275', '贺鹏飞', null, '13028895936', null, 'hepengfei@ecaray.com', '1', null, null, null, '.NET开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119881', 'guozhiwen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0276', '郭志文', null, '13711075533', null, 'guozhiwen@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119882', 'zhanghuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0277', '张焕', null, '18588221735', null, 'zhanghuan@ecaray.com', '2', '1', '1', '深圳', '售前技术经理', '140202', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119883', 'fengdongshuang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0278', '冯冬双', null, '13128930881', null, 'fengdongshuang@ecaray.com', '2', null, null, null, '产品经理（OA系统）', '1501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119884', 'yangshuangjian@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0279', '杨双健', null, '17727660705', null, 'yangshuangjian@ecaray.com', '1', null, null, null, '战略发展经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119885', 'wucaibin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0281', '吴财宾', null, '15010917536', null, 'wucaibin@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119886', 'zhanyanmei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0283', '詹艳梅', null, '13686876074', null, 'zhanyanmei@ecaray.com', '2', null, null, null, 'H5工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119887', 'peilei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0284', '裴雷', null, '15013895866', null, 'peilei@ecaray.com', '1', null, null, null, '项目经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119888', 'chenliwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0285', '陈立伟', null, '13312930692', null, 'chenliwei@ecaray.com', '1', null, null, null, '培训专员', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119889', 'huanghuixin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0287', '黄慧馨', null, '18251820653', null, 'huanghuixin@ecaray.com', '2', '1', '1', '深圳', '售前技术经理', '140202', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119890', 'xiangjuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0288', '向娟', null, '18899768972', null, 'xiangjuan@ecaray.com', '2', null, null, null, '产品经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119891', 'tanglihua@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0289', '唐利华', null, '18565880403', null, 'tanglihua@ecaray.com', '2', null, null, null, '财务经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119892', 'linxiaojin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0290', '林小健', null, '15914378689', null, 'linxiaojin@ecaray.com', '1', null, null, null, '产品经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119893', 'huanghuixiao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0291', '黄辉晓', null, '18998936726', null, 'huanghuixiao@ecaray.com', '1', null, null, null, '项目支持经理', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119894', 'lufangping@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0292', '卢方平', null, '13823280590', null, 'lufangping@ecaray.com', '2', null, null, null, '企业文化专员', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119895', 'renminrui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0293', '任敏瑞', null, '13612959158', null, 'renminrui@ecaray.com', '1', null, null, null, '网络工程师', '1', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119896', 'chenlei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0294', '陈雷', null, '18627878083', null, 'chenlei@ecaray.com', '2', '1', '1', '武汉', '售前技术经理', '140501', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119897', 'zhaoyong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0295', '赵勇', null, '18629336803', null, 'zhaoyong@ecaray.com', '2', '1', '1', '西安', '区域经理', '140502', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('149309277119898', 'zhangjiaxuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0296', '张嘉轩', null, '13823689928', null, 'zhangjiaxuan@ecaray.com', '2', '1', '1', '深圳', '区域经理', '140701', null, null, '0', null, '0', '0');
INSERT INTO `sys_user` VALUES ('1494411284499842', '123@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '951', 'ceshi', null, '13659845886', null, '123@ecaray.com', '2', '1', '1', 'shenzhen', 'ceshi', '1704', '', null, '0', '1494411284501', '1494411284501', '0');
INSERT INTO `sys_user` VALUES ('1494496304426937', 'ceshi33@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '1212', '测试33', null, '15818757802', null, 'ceshi33@ecaray.com', '1', '1', '2', 'shenzhen', '产品', '1501', '', '149309277119639', '1', '1494496304484', '1494496304484', '0');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `user_id` varchar(38) NOT NULL COMMENT '用户ID',
  `role_id` varchar(38) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('1', '1');
INSERT INTO `sys_user_role` VALUES ('1493092286632390', '1');
INSERT INTO `sys_user_role` VALUES ('1493092377774187', '1493178209075931');
INSERT INTO `sys_user_role` VALUES ('149309277119635', '1493092910186790');
INSERT INTO `sys_user_role` VALUES ('149309277119635', '1493178209075931');
INSERT INTO `sys_user_role` VALUES ('149309277119635', '1493178331170686');
INSERT INTO `sys_user_role` VALUES ('149309277119637', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('149309277119660', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('149309277119662', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('149309277119666', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('149309277119675', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('149309277119740', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('149309277119779', '1');
INSERT INTO `sys_user_role` VALUES ('149309277119781', '1');
INSERT INTO `sys_user_role` VALUES ('149309277119797', '1493178331170686');
INSERT INTO `sys_user_role` VALUES ('149309277119797', '1494495410289197');
INSERT INTO `sys_user_role` VALUES ('149309277119797', '1494495458940560');
INSERT INTO `sys_user_role` VALUES ('149309277119815', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('149309277119857', '1');
INSERT INTO `sys_user_role` VALUES ('149309277119860', '1493092982696820');
INSERT INTO `sys_user_role` VALUES ('149309277119872', '1');
INSERT INTO `sys_user_role` VALUES ('149309277119883', '1');
INSERT INTO `sys_user_role` VALUES ('1493303387945862', '1');
INSERT INTO `sys_user_role` VALUES ('1493303506518949', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('1493303608040512', '1493178209075931');
INSERT INTO `sys_user_role` VALUES ('1493303676101946', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('149330373460134', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('1493303781142696', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('1493304020205869', '1493178331170686');
INSERT INTO `sys_user_role` VALUES ('1493304343543530', '1493178209075931');
INSERT INTO `sys_user_role` VALUES ('1493691880144105', '1493092982696820');
INSERT INTO `sys_user_role` VALUES ('1493692811168109', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('1493696570728207', '1');
INSERT INTO `sys_user_role` VALUES ('1493707775786632', '1');
INSERT INTO `sys_user_role` VALUES ('1493707775786632', '1493178331170686');
INSERT INTO `sys_user_role` VALUES ('1493708036604873', '1');
INSERT INTO `sys_user_role` VALUES ('1493709659046738', '1');
INSERT INTO `sys_user_role` VALUES ('1493728821084619', '1493092892238723');
INSERT INTO `sys_user_role` VALUES ('1493865150770933', '1');
INSERT INTO `sys_user_role` VALUES ('1493886495278625', '1');
INSERT INTO `sys_user_role` VALUES ('1493886495278625', '1493092957668546');
INSERT INTO `sys_user_role` VALUES ('1493973019250804', '1493885991380387');
INSERT INTO `sys_user_role` VALUES ('1493973074738479', '1493092957668546');
INSERT INTO `sys_user_role` VALUES ('1493973074738479', '1493885991380387');
INSERT INTO `sys_user_role` VALUES ('1494245747733701', '1493092892238723');

-- ----------------------------
-- Table structure for sys_user_tmp
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_tmp`;
CREATE TABLE `sys_user_tmp` (
  `id` bigint(38) NOT NULL,
  `username` varchar(32) NOT NULL COMMENT '账户',
  `password` varchar(40) NOT NULL,
  `usercode` varchar(40) DEFAULT NULL,
  `realname` varchar(20) NOT NULL COMMENT '真实姓名',
  `idcard` varchar(18) DEFAULT NULL COMMENT '身份证号',
  `phone` varchar(20) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL COMMENT '座机号码',
  `email` varchar(32) NOT NULL COMMENT '用户编号',
  `sex` int(1) DEFAULT NULL COMMENT '1男 2女',
  `profess_level` varchar(10) DEFAULT NULL COMMENT '专业级别',
  `manage_level` varchar(10) DEFAULT NULL COMMENT '管理级别',
  `address` varchar(100) DEFAULT NULL COMMENT '常住地',
  `post` varchar(10) DEFAULT NULL COMMENT '岗位',
  `dep_id` varchar(38) DEFAULT '' COMMENT '所属部门',
  `head_pic` varchar(38) DEFAULT '',
  `direct_leader` varchar(38) DEFAULT NULL COMMENT '直接上级',
  `is_leave` int(1) DEFAULT '0' COMMENT '0在职，1停用离职',
  `create_time` bigint(38) DEFAULT NULL,
  `update_time` bigint(38) DEFAULT '0' COMMENT '0 默认可是',
  `is_delete` int(1) NOT NULL DEFAULT '0' COMMENT '0有效，1已经逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_tmp
-- ----------------------------
INSERT INTO `sys_user_tmp` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '000', '超级管理员', null, null, null, '', null, null, null, null, null, '1493705570462314', '', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119635', 'shezhideng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0001', '佘志登', null, '13828706370', null, 'shezhideng@ecaray.com', '1', null, null, null, 'CEO/创始人', '11', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119636', 'huzhiyang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0002', '胡志阳', null, '15818757802', null, 'huzhiyang@ecaray.com', '1', null, null, null, '工程总监', '1902', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119637', 'wuhui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0003', '吴辉', null, '13794467694', null, 'wuhui@ecaray.com', '1', null, null, null, '事业部总经理/PMO', '15', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119638', 'shulingyan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0004', '舒玲燕', null, '15989556479', null, 'shulingyan@ecaray.com', '2', null, null, null, '行政经理', '2202', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119639', 'chenzhiqiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0005', '陈志强', null, '15817464366', null, 'chenzhiqiang@ecaray.com', '1', null, null, null, '项目经理', '1901', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119640', 'renyangjing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0006', '任杨静', null, '18617102718', null, 'renyangjing@ecaray.com', '1', null, null, null, '项目经理', '1901', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119641', 'tanglin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0007', '唐林', null, '13725596011', null, 'tanglin@ecaray.com', '1', null, null, null, '业务开发部经理', '1503', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119642', 'songlisha@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0008', '宋莉莎', null, '13725567920', null, 'songlisha@ecaray.com', '2', null, null, null, 'UI设计师', '1502', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119643', 'zhouguiying@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0009', '周桂英', null, '13480876082', null, 'zhouguiying@ecaray.com', '2', null, null, null, '软件测试工程师', '1604', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119644', 'limeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0010', '李萌', null, '18620323960', null, 'limeng@ecaray.com', '1', null, null, null, '市场总监', '1401', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119645', 'zhangyang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0011', '张阳', null, '13760488428', null, 'zhangyang@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '150301', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119646', 'youshuchang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0012', '尤书畅', null, '18682038507', null, 'youshuchang@ecaray.com', '2', null, null, null, '产品经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119647', 'renliang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0013', '任亮', null, '18038015570', null, 'renliang@ecaray.com', '1', null, null, null, '事业部总经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119648', 'chenweijun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0014', '陈伟君', null, '13510706860', null, 'chenweijun@ecaray.com', '1', null, null, null, '运维组长', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119649', 'wuling@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0015', '吴玲', null, '13148711721', null, 'wuling@ecaray.com', '2', null, null, null, '运维总监', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119650', 'daixu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0016', '戴旭', null, '13715390451', null, 'daixu@ecaray.com', '1', null, null, null, '业务开发经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119651', 'suhuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0019', '苏欢', null, '13686415261', null, 'suhuan@ecaray.com', '2', null, null, null, '测试经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119652', 'chaiwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0021', '柴卫', null, '18588264640', null, 'chaiwei@ecaray.com', '1', null, null, null, 'VC++开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119653', 'zhuhanwu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0022', '朱涵武', null, '18824679814', null, 'zhuhanwu@ecaray.com', '1', null, null, null, '项目经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119654', 'chentiejun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0023', '陈铁钧', null, '13632705581', null, 'chentiejun@ecaray.com', '1', null, null, null, 'WEB前端开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119655', 'liwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0024', '李伟', null, '13006617634', null, 'liwei@ecaray.com', '1', null, null, null, '产品经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119656', 'likongquan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0025', '李孔泉', null, '13686441605', null, 'likongquan@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119657', 'guanjie@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0026', '关杰', null, '13798347597', null, 'guanjie@ecaray.com', '1', null, null, null, '项目经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119658', 'wuqiuding@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0027', '吴秋定', null, '18688164028', null, 'wuqiuding@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119659', 'wengxiuwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0028', '翁秀玮', null, '13424228087', null, 'wengxiuwei@ecaray.com', '1', null, null, null, '用户运营经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119660', 'qihuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0029', '齐焕', null, '15323486898', null, 'qihuan@ecaray.com', '1', null, null, null, 'IOS开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119661', 'wangtaixiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0030', '王太祥', null, '13760312367', null, 'wangtaixiang@ecaray.com', '1', null, null, null, 'IOS开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119662', 'liurenyi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0031', '刘仁义', null, '18656957123', null, 'liurenyi@ecaray.com', '1', null, null, null, '营销中心总经理', '14', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119663', 'jinzheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0032', '金征', null, '18923729010', null, 'jinzheng@ecaray.com', '1', null, null, null, 'ANDROID开发经', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119664', 'zhujinliang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0033', '朱金亮', null, '13509671516', null, 'zhujinliang@ecaray.com', '1', null, null, null, '首席架构师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119665', 'liaodebao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0034', '廖德宝', null, '18576689241', null, 'liaodebao@ecaray.com', '1', null, null, null, '设计经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119666', 'huangxiubin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0035', '黄修彬', null, '13684956579', null, 'huangxiubin@ecaray.com', '1', null, null, null, '业务开发部经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119667', 'lixiaolei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0037', '李晓磊', null, '13828777309', null, 'lixiaolei@ecaray.com', '1', null, null, null, '事业部总经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119668', 'liuhuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0038', '刘欢', null, '18670006357', null, 'liuhuan@ecaray.com', '1', null, null, null, 'ANDROID开发工', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119669', 'haomeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0039', '郝猛', null, '13798223423', null, 'haomeng@ecaray.com', '1', null, null, null, '大区总监', '1403', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119670', 'meiyujie@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0040', '梅宇杰', null, '13537503318', null, 'meiyujie@ecaray.com', '1', null, null, null, '区域经理', '140402', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119671', 'lijialong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0041', '李嘉隆', null, '18503086491', null, 'lijialong@ecaray.com', '1', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119672', 'youweijun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0042', '游伟军', null, '13244898100', null, 'youweijun@ecaray.com', '1', null, null, null, '大区总监', '1406', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119673', 'dupeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0043', '杜鹏', null, '13603029441', null, 'dupeng@ecaray.com', '1', null, null, null, '大区总监', '1407', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119674', 'huhaiyang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0044', '胡海洋', null, '13632583828', null, 'huhaiyang@ecaray.com', '1', null, null, null, '营销中心总经理助理', '14', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119675', 'zhangzuyuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0045', '张祖媛', null, '15817238732', null, 'zhangzuyuan@ecaray.com', '2', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119676', 'zhouweiping@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0047', '周伟平', null, '13424377117', null, 'zhouweiping@ecaray.com', '1', null, null, null, '拓展组长', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119677', 'liuweiguo@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0048', '刘伟国', null, '18320996928', null, 'liuweiguo@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119678', 'guanyachao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0049', '管亚超', null, '15986760694', null, 'guanyachao@ecaray.com', '1', null, null, null, '大区总监', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119679', 'liuweili@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0050', '刘炜丽', null, '18988799026', null, 'liuweili@ecaray.com', '2', null, null, null, '市场推广经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119680', 'zhangjunlong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0051', '张俊龙', null, '13510236556', null, 'zhangjunlong@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119681', 'chenyandan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0052', '陈艳丹', null, '18565752003', null, 'chenyandan@ecaray.com', '1', null, null, null, '供应链组长', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119682', 'lipenghui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0053', '李鹏辉', null, '18665953490', null, 'lipenghui@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119683', 'yujinhui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0054', '余锦辉', null, '18566218485', null, 'yujinhui@ecaray.com', '1', null, null, null, '大区总监', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119684', 'liushiqiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0055', '刘世强', null, '15012880521', null, 'liushiqiang@ecaray.com', '1', null, null, null, '维护组长', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119685', 'duanshizhen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0056', '段石振', null, '13040874588', null, 'duanshizhen@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119686', 'yaofeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0057', '姚峰', null, '15919849987', null, 'yaofeng@ecaray.com', '1', null, null, null, '微信开发经理（代）', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119687', 'shangshijiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0059', '尚士江', null, '15919936686', null, 'shangshijiang@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119688', 'wuxia@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0060', '吴侠', null, '15070991902158138011', null, 'wuxia@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119689', 'machuntang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0061', '马春堂', null, '18814359426', null, 'machuntang@ecaray.com', '1', null, null, null, '工程经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119690', 'chenruibin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0062', '陈锐斌', null, '13425168558', null, 'chenruibin@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119691', 'qinqianwen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0063', '覃倩雯', null, '18823366059', null, 'qinqianwen@ecaray.com', '2', null, null, null, '微信运营', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119692', 'panguixing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0064', '潘桂云', null, '13528428068', null, 'panguixing@ecaray.com', '2', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119693', 'zhangzhiqiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0065', '张志强', null, '18620398518', null, 'zhangzhiqiang@ecaray.com', '1', null, null, null, '产品经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119694', 'chenchunshu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0066', '陈春树', null, '18588231205', null, 'chenchunshu@ecaray.com', '1', null, null, null, '产品经理(清算系统）', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119695', 'ningdi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0067', '宁迪', null, '15236620030', null, 'ningdi@ecaray.com', '1', null, null, null, 'WEB前端开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119696', 'hexiaogang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0068', '何孝刚', null, '18566276006', null, 'hexiaogang@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119697', 'zhululu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0069', '祝露露', null, '18067518258', null, 'zhululu@ecaray.com', '2', null, null, null, '招聘专员', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119698', 'bichun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0070', '毕纯', null, '13418634913', null, 'bichun@ecaray.com', '2', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119699', 'zhanghuida@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0071', '张晖达', null, '13729042068', null, 'zhanghuida@ecaray.com', '1', null, null, null, 'VC++开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119700', 'tanqiaofang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0072', '谭巧芳', null, '18826583665', null, 'tanqiaofang@ecaray.com', '2', null, null, null, 'WEB前端开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119701', 'gongyouqiang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0073', '龚佑强', null, '18566775007', null, 'gongyouqiang@ecaray.com', '1', null, null, null, 'IOS开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119702', 'liuxiaoming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0074', '刘小明', null, '15579677961', null, 'liuxiaoming@ecaray.com', '1', null, null, null, '采购专员', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119703', 'liuyushu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0075', '刘玉书', null, '13670067715', null, 'liuyushu@ecaray.com', '1', null, null, null, '渠道大客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119704', 'chenli@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0076', '陈丽', null, '13823718160', null, 'chenli@ecaray.com', '2', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119705', 'zhongxiaoyan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0077', '钟晓燕', null, '13662244943', null, 'zhongxiaoyan@ecaray.com', '2', null, null, null, 'WEB前端开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119706', 'zhangtao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0078', '张涛', null, '18680318656', null, 'zhangtao@ecaray.com', '1', null, null, null, '项目实施组长', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119707', 'lijiahui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0079', '李佳慧', null, '17603055339', null, 'lijiahui@ecaray.com', '2', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119708', 'lujundong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0080', '卢俊东', null, '13590458189', null, 'lujundong@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119709', 'huafengcui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0081', '华凤毳', null, '13510563127', null, 'huafengcui@ecaray.com', '1', null, null, null, '支付组开发经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119710', 'weihongzhou@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0082', '韦宏周', null, '13622351331', null, 'weihongzhou@ecaray.com', '1', null, null, null, 'UI设计师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119711', 'weichuanbo@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0083', '魏传波', null, '17091602262', null, 'weichuanbo@ecaray.com', '1', null, null, null, 'WEB前端开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119712', 'zhutiantong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0084', '朱天同', null, '18612451034', null, 'zhutiantong@ecaray.com', '1', null, null, null, '高级算法工程师（模式', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119713', 'xiansong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0085', '鲜松', null, '18111576249', null, 'xiansong@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119714', 'zhouguoting@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0086', '周国婷', null, '13554135602', null, 'zhouguoting@ecaray.com', '2', null, null, null, '运维专员', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119715', 'wangqun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0087', '王群', null, '13631581616', null, 'wangqun@ecaray.com', '2', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119716', 'tanyi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0088', '谈意', null, '18571492260', null, 'tanyi@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119717', 'huangjianhao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0089', '黄剑豪', null, '13590299759', null, 'huangjianhao@ecaray.com', '1', null, null, null, 'ANDROID开发工', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119718', 'lishirong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0090', '李世荣', null, '18565897688', null, 'lishirong@ecaray.com', '2', null, null, null, '人资行政总监', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119719', 'liuyuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0091', '刘源', null, '13725566254', null, 'liuyuan@ecaray.com', '1', null, null, null, '活动运营经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119720', 'zhangjinquan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0092', '张晋权', null, '13750595035', null, 'zhangjinquan@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119721', 'lijing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0093', '李靖', null, '15855140255', null, 'lijing@ecaray.com', '1', null, null, null, '维护工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119722', 'chenjun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0094', '陈俊', null, '15986649453', null, 'chenjun@ecaray.com', '1', null, null, null, '项目经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119723', 'panjianghui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0095', '潘江辉', null, '15627564900', null, 'panjianghui@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119724', 'licao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0096', '李操', null, '18638772365', null, 'licao@ecaray.com', '1', null, null, null, '项目经理助理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119725', 'zhujie@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0097', '朱洁', null, '15986671254', null, 'zhujie@ecaray.com', '1', null, null, null, 'ANDROID开发工', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119726', 'lizhibiao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0098', '李志标', null, '13631223572', null, 'lizhibiao@ecaray.com', '1', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119727', 'pengjianwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0100', '彭建威', null, '13535534356', null, 'pengjianwei@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119728', 'chenrong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0101', '陈熔', null, '15019256273', null, 'chenrong@ecaray.com', '2', null, null, null, '拓展组长', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119729', 'wangqibiao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0102', '王其标', null, '18354270712', null, 'wangqibiao@ecaray.com', '1', null, null, null, 'WEB前端开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119730', 'zhoulieju@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0104', '周烈驹', null, '18682393956', null, 'zhoulieju@ecaray.com', '1', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119731', 'huangyan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0105', '黄焰', null, '15816815478', null, 'huangyan@ecaray.com', '2', null, null, null, '会计', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119732', 'zengyudong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0106', '曾宇东', null, '18038162251', null, 'zengyudong@ecaray.com', '1', null, null, null, '项目实施组长', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119733', 'zhaominxia@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0107', '赵旻霞', null, '13778186087', null, 'zhaominxia@ecaray.com', '2', null, null, null, '前台文员', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119734', 'limansi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0108', '李曼斯', null, '18218023559', null, 'limansi@ecaray.com', '2', null, null, null, 'UI设计师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119735', 'shima@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0110', '石马', null, '18588402560', null, 'shima@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119736', 'yantao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0111', '颜涛涛', null, '17711618092', null, 'yantao@ecaray.com', '1', null, null, null, '运营推广经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119737', 'lizhenyu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0112', '李振玉', null, '18236915502', null, 'lizhenyu@ecaray.com', '1', null, null, null, '维护组长', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119738', 'wangyanping@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0113', '王延平', null, '18216068500', null, 'wangyanping@ecaray.com', '1', null, null, null, '项目实施组长', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119739', 'liqing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0114', '李庆', null, '15903631339', null, 'liqing@ecaray.com', '1', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119740', 'huangpeipei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0115', '黄培培', null, '15768116369', null, 'huangpeipei@ecaray.com', '2', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119741', 'wangqi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0118', '王琦', null, '13647273787', null, 'wangqi@ecaray.com', '2', null, null, null, '销售行政', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119742', 'wangmingze@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0119', '王明择', null, '15827412393', null, 'wangmingze@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119743', 'liurenkai@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0120', '刘仁恺', null, '13971246325', null, 'liurenkai@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119744', 'linjianli@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0121', '林坚立', null, '13922828632', null, 'linjianli@ecaray.com', '1', null, null, null, '战略发展部总经理/商', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119745', 'zhengjiannan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0123', '郑建楠', null, '13429122762', null, 'zhengjiannan@ecaray.com', '1', null, null, null, '维护工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119746', 'yuhanrong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0124', '余汉荣', null, '15879195005', null, 'yuhanrong@ecaray.com', '1', null, null, null, '运营推广', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119747', 'lisheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0125', '李胜', null, '18198622645', null, 'lisheng@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119748', 'chenjianhua@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0126', '陈建华', null, '13580563822', null, 'chenjianhua@ecaray.com', '1', null, null, null, '运营推广', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119749', 'chenyansi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0128', '陈燕思', null, '18620733886', null, 'chenyansi@ecaray.com', '2', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119750', 'yuyongdong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0129', '余永东', null, '15717105537', null, 'yuyongdong@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119751', 'wangbin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0130', '王斌', null, '13971666640', null, 'wangbin@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119752', 'liuxiaofei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0131', '柳小飞', null, '13662201931', null, 'liuxiaofei@ecaray.com', '1', null, null, null, '工程组长', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119753', 'dengsiting@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0132', '邓思婷', null, '15521306464', null, 'dengsiting@ecaray.com', '2', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119754', 'wangti@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0133', '汪体', null, '15013754865', null, 'wangti@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119755', 'liuxuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0134', '刘璇', null, '17727475276', null, 'liuxuan@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119756', 'gongruixia@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0135', '龚瑞霞', null, '15211192261', null, 'gongruixia@ecaray.com', '2', null, null, null, '会计', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119757', 'fanwenhai@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0136', '范文海', null, '15013266362', null, 'fanwenhai@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119758', 'yukankan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0137', '余侃侃', null, '18007152501', null, 'yukankan@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119759', 'chenhao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0138', '陈浩', null, '18285148056', null, 'chenhao@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119760', 'shangyundong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0139', '尚云冬', null, '18620079570', null, 'shangyundong@ecaray.com', '1', null, null, null, '高级JAVA开发工程', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119761', 'xiongshiqiong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0140', '熊世琼', null, '18798862683', null, 'xiongshiqiong@ecaray.com', '2', null, null, null, '销售行政', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119762', 'tanghaizhong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0141', '唐海中', null, '13902202351', null, 'tanghaizhong@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119763', 'liuquan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0142', '刘全', null, '18671464642', null, 'liuquan@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119764', 'wujieqiu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0144', '吴杰秋', null, '18603068007', null, 'wujieqiu@ecaray.com', '1', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119765', 'chenlin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0145', '陈淋', null, '15820769057', null, 'chenlin@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119766', 'yangpeili@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0146', '杨佩丽', null, '15915494786', null, 'yangpeili@ecaray.com', '2', null, null, null, '活动策划', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119767', 'lianglibin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0147', '梁礼斌', null, '13927415995', null, 'lianglibin@ecaray.com', '1', null, null, null, '运营推广', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119768', 'luogang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0148', '罗刚', null, '15915788571', null, 'luogang@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119769', 'lizhangjin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0149', '黎章锦', null, '13751102089', null, 'lizhangjin@ecaray.com', '1', null, null, null, '运营推广', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119770', 'songkun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0151', '宋坤', null, '15180867808', null, 'songkun@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119771', 'wuxiaoming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0153', '伍小明', null, '15914163750', null, 'wuxiaoming@ecaray.com', '1', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119772', 'hepeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0154', '何鹏', null, '18658857047', null, 'hepeng@ecaray.com', '1', null, null, null, '产品经理/产品委员会', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119773', 'yangjun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0155', '杨军', null, '18588266297', null, 'yangjun@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119774', 'chenchunning@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0156', '陈春宁', null, '18092562685', null, 'chenchunning@ecaray.com', '2', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119775', 'zhangbing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0157', '张冰', null, '18950340465', null, 'zhangbing@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119776', 'gaochao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0158', '高超', null, '18607194792', null, 'gaochao@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119777', 'qianzhengyang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0159', '钱正阳', null, '13815894571', null, 'qianzhengyang@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119778', 'fuweiquan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0160', '付伟权', null, '13620958614', null, 'fuweiquan@ecaray.com', '1', null, null, null, '运营推广', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119779', 'youjinqing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0161', '游锦青', null, '13542287744', null, 'youjinqing@ecaray.com', '1', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119780', 'luhao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0162', '卢浩', null, '17780585005', null, 'luhao@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119781', 'lvkongyong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0163', '吕孔永', null, '18665887191', null, 'lvkongyong@ecaray.com', '1', null, null, null, '事业部副总经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119782', 'shenronghua@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0164', '申荣华', null, '13825218061', null, 'shenronghua@ecaray.com', '2', null, null, null, '客服主管-C端', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119783', 'zhangsiqi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0165', '张思祺', null, '13469982561', null, 'zhangsiqi@ecaray.com', '1', null, null, null, '运营推广', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119784', 'liujiahao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0166', '刘家浩', null, '13971020063', null, 'liujiahao@ecaray.com', '1', null, null, null, '运营推广', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119785', 'liuxiali@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0167', '柳夏利', null, '15802688134', null, 'liuxiali@ecaray.com', '2', null, null, null, 'ANDROID开发工', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119786', 'qiugongjian@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0168', '邱工建', null, '18930366678', null, 'qiugongjian@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119787', 'zhangweidong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0169', '张卫东', null, '13628600202', null, 'zhangweidong@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119788', 'caijingfang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0171', '蔡景放', null, '15889486521', null, 'caijingfang@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119789', 'ouli@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0172', '欧礼', null, '18680339531', null, 'ouli@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119790', 'wanghan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0173', '王寒', null, '13798543571', null, 'wanghan@ecaray.com', '2', null, null, null, '产品经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119791', 'chenjian@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0175', '陈健', null, '13922828862', null, 'chenjian@ecaray.com', '1', null, null, null, '运营总监/事业部副总', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119792', 'tiandezhi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0176', '田德志', null, '18030954200', null, 'tiandezhi@ecaray.com', '1', null, null, null, '应用运维工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119793', 'chenmengshan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0178', '陈猛山', null, '15777350713', null, 'chenmengshan@ecaray.com', '1', null, null, null, '应用运维工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119794', 'xiaowaisheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0179', '肖外生', null, '15818470799', null, 'xiaowaisheng@ecaray.com', '1', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119795', 'hongyansheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0180', '洪言声', null, '13797720661', null, 'hongyansheng@ecaray.com', '1', null, null, null, '项目实施工程师（实习', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119796', 'tangzonghong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0181', '唐宗鸿', null, '18178727367', null, 'tangzonghong@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119797', 'hefanfan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0182', '何凡凡', null, '15017921180', null, 'hefanfan@ecaray.com', '2', null, null, null, '微信开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119798', 'liguangrong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0183', '李光荣', null, '13316803002', null, 'liguangrong@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119799', 'huangkefangyi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0184', '黄可方毅', null, '18682022646', null, 'huangkefangyi@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119800', 'wanghanzhong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0185', '王汉忠', null, '15915358533', null, 'wanghanzhong@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119801', 'xiaoyunfeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0186', '肖云峰', null, '18600016857', null, 'xiaoyunfeng@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119802', 'zhanghai@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0187', '张海', null, '15994288855', null, 'zhanghai@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119803', 'tangxinfu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0188', '唐新富', null, '13765575504', null, 'tangxinfu@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119804', 'dengweitang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0189', '邓伟棠', null, '13428283655', null, 'dengweitang@ecaray.com', '1', null, null, null, 'VC++开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119805', 'youxuanbing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0190', '游镟冰', null, '15767346587', null, 'youxuanbing@ecaray.com', '2', null, null, null, '商务支持专员', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119806', 'wujiandong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0191', '巫建东', null, '13420907039', null, 'wujiandong@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119807', 'wujingming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0192', '吴敬民', null, '18676371314', null, 'wujingming@ecaray.com', '1', null, null, null, '维护工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119808', 'mingruipeng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0193', '明瑞鹏', null, '13733561455', null, 'mingruipeng@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119809', 'chenyunyan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0194', '陈云燕', null, '15919746069', null, 'chenyunyan@ecaray.com', '2', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119810', 'wanhongjun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0196', '万红军', null, '18819075213', null, 'wanhongjun@ecaray.com', '1', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119811', 'wulihui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0197', '吴立辉', null, '18576672200', null, 'wulihui@ecaray.com', '1', null, null, null, '产品经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119812', 'zhangxinyu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0198', '张新宇', null, '18904058683', null, 'zhangxinyu@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119813', 'xulikao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0199', '徐礼考', null, '18675582946', null, 'xulikao@ecaray.com', '1', null, null, null, '维护工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119814', 'jiaogangqiao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0200', '焦岗桥', null, '15918884403', null, 'jiaogangqiao@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119815', 'suhuihong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0201', '苏惠红', null, '13510128148', null, 'suhuihong@ecaray.com', '2', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119816', 'liuyong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0202', '刘勇', null, '13802413158', null, 'liuyong@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119817', 'yangxiaodong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0203', '杨晓冬', null, '13628484078', null, 'yangxiaodong@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119818', 'liuyang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0204', '刘洋', null, '13886039016', null, 'liuyang@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119819', 'sunchenchen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0205', '孙辰琛', null, '15707290410', null, 'sunchenchen@ecaray.com', '2', null, null, null, 'UI设计师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119820', 'xieguozhu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0206', '谢国柱', null, '13650841778', null, 'xieguozhu@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119821', 'yuanxiong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0207', '袁雄', null, '13429896361', null, 'yuanxiong@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119822', 'huangzhoulong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0208', '黄周龙', null, '15157150519', null, 'huangzhoulong@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119823', 'fangbin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0210', '方斌', null, '18682172730', null, 'fangbin@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119824', 'tangrenfang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0211', '唐仁芳', null, '15151713757', null, 'tangrenfang@ecaray.com', '2', null, null, null, '商务助理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119825', 'zhaolong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0212', '赵龙', null, '13380366997', null, 'zhaolong@ecaray.com', '1', null, null, null, '维护工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119826', 'wuling01@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0213', '伍玲', null, '17051121050', null, 'wuling01@ecaray.com', '2', null, null, null, '人资行政专员', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119827', 'chensheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0214', '陈胜', null, '13545009275', null, 'chensheng@ecaray.com', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119828', 'qinxiaodan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0215', '覃晓丹', null, '15102185708', null, 'qinxiaodan@ecaray.com', '2', null, null, null, '应用运维工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119829', 'zhangzhilin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0216', '张智林', null, '15012481421', null, 'zhangzhilin@ecaray.com', '1', null, null, null, '维护工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119830', 'zengxiaoju@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0217', '曾小菊', null, '15102980104', null, 'zengxiaoju@ecaray.com', '2', null, null, null, '客服专员-C端', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119831', 'haowenbo@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0218', '郝问博', null, '13783597736', null, 'haowenbo@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119832', 'subingkun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0219', '苏秉昆', null, '13397159715', null, 'subingkun@ecaray.com', '1', null, null, null, '项目经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119833', 'wuchengcheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0220', '吴程程', null, '15172749559', null, 'wuchengcheng@ecaray.com', '1', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119834', 'fengjinjie@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0221', '冯晋劼', null, '18681816952', null, 'fengjinjie@ecaray.com', '1', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119835', 'tiansicheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0223', '田嗣程', null, '18707437105', null, 'tiansicheng@ecaray.com', '1', null, null, null, '产品经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119836', 'liuming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0224', '刘明', null, '13632746921', null, 'liuming@ecaray.com', '1', null, null, null, '运营推广', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119837', 'yuanhongchao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0225', '苑洪超', null, '18678397645', null, 'yuanhongchao@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119838', 'sunjie@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0227', '孙洁', null, '13760222663', null, 'sunjie@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119839', 'shifangming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0228', '石芳铭', null, '18507109066', null, 'shifangming@ecaray.com', '2', null, null, null, '战略发展经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119840', 'wangyingping@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0229', '汪莹萍', null, '15871713815', null, 'wangyingping@ecaray.com', '2', null, null, null, '运营推广', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119841', 'luohan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0230', '罗寒', null, '13560747408', null, 'luohan@ecaray.com', '2', null, null, null, '.NET开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119842', 'huhaibo@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0231', '胡海波', null, '18124092672', null, 'huhaibo@ecaray.com', '1', null, null, null, '应用运维工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119843', 'gaohonglong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0232', '高宏龙', null, '18664322753', null, 'gaohonglong@ecaray.com', '1', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119844', 'liangmin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0233', '梁敏', null, '15915897973', null, 'liangmin@ecaray.com', '1', null, null, null, '维护工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119845', 'wangchen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0234', '王晨', null, '15927482515', null, 'wangchen@ecaray.com', '1', null, null, null, '区域运营主管', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119846', 'hetianlong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0235', '何天龙', null, '13564667357', null, 'hetianlong@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119847', 'hehui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0236', '何辉', null, '18874284764', null, 'hehui@ecaray.com', '1', null, null, null, '服务器运维工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119848', 'huxingchang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0237', '胡兴昶', null, '15727207142', null, 'huxingchang@ecaray.com', '1', null, null, null, '运维专员（实习）', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119849', 'zhuoshengping@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0238', '卓胜平', null, '15012903949', null, 'zhuoshengping@ecaray.com', '1', null, null, null, '产品经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119850', 'zhoupan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0239', '周盼', null, '18721550172', null, 'zhoupan@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119851', 'zhaohuanyu@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0240', '赵环宇', null, '15332127676', null, 'zhaohuanyu@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119852', 'zhuchaoyou@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0241', '朱朝友', null, '13522448081', null, 'zhuchaoyou@ecaray.com', '1', null, null, null, '项目经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119853', 'fuyong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0243', '付勇', null, '13714136097', null, 'fuyong@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119854', 'wangruyue@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0244', '王如岳', null, '18676695200', null, 'wangruyue@ecaray.com', '1', null, null, null, '测试总监', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119855', 'xuqipi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0245', '徐起丕', null, '13349933226', null, 'xuqipi@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119856', 'xiachongchong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0247', '夏冲冲', null, '18138812781', null, 'xiachongchong@ecaray.com', '1', null, null, null, '项目实施工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119857', 'zhongjianying@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0248', '钟建英', null, '13539784430', null, 'zhongjianying@ecaray.com', '2', null, null, null, '人资专员', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119858', 'chenhongying@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0250', '陈红英', null, '13026655385', null, 'chenhongying@ecaray.com', '2', null, null, null, '测试经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119859', 'xiongxiaojun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0251', '熊小军', null, '13038360141', null, 'xiongxiaojun@ecaray.com', '1', null, null, null, 'WEB前端开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119860', 'fangcheng@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0252', '方成', null, '15806040376', null, 'fangcheng@ecaray.com', '1', null, null, null, '应用运维工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119861', 'wangxi@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0253', '王曦', null, '17764548181', null, 'wangxi@ecaray.com', '1', null, null, null, '项目经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119862', 'xieyuexing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0254', '谢月星', null, '13510353610', null, 'xieyuexing@ecaray.com', '1', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119863', 'jiangcanhua@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0257', '江灿华', null, '13874930369', null, 'jiangcanhua@ecaray.com', '1', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119864', 'zhujianwen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0258', '朱剑文', null, '17603049266', null, 'zhujianwen@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119865', 'luoshanglin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0259', '罗尚林', null, '18072787987', null, 'luoshanglin@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119866', 'liubang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0260', '刘邦', null, '13246739013', null, 'liubang@ecaray.com', '1', null, null, null, '应用运维工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119867', 'liaoyingying@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0261', '廖莹颖', null, '15778429045', null, 'liaoyingying@ecaray.com', '2', null, null, null, 'IOS开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119868', 'liuyuchen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0262', '刘语晨', null, '13631623935', null, 'liuyuchen@ecaray.com', '2', null, null, null, '软件测试工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119869', 'dubin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0263', '杜彬', null, '15000497050', null, 'dubin@ecaray.com', '1', null, null, null, '运营推广经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119870', 'liuruixue@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0264', '刘瑞雪', null, '13316962026', null, 'liuruixue@ecaray.com', '2', null, null, null, '停车场物业主管', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119871', 'wangjianming@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0265', '王建明', null, '18391041261', null, 'wangjianming@ecaray.com', '1', null, null, null, 'ANDROID开发工', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119872', 'ranchengwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0266', '冉成伟', null, '15919447869', null, 'ranchengwei@ecaray.com', '1', null, null, null, 'WEB前端开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119873', 'lixianchun@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0267', '李先春', null, '15817385403', null, 'lixianchun@ecaray.com', '2', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119874', 'liuqingwen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0268', '刘庆文', null, '18576763970', null, 'liuqingwen@ecaray.com', '1', null, null, null, '项目经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119875', 'lixufeng@ecaray', 'e10adc3949ba59abbe56e057f20f883e', '0270', '李绪锋', null, '18680335813', null, 'lixufeng@ecaray', '1', null, null, null, '客户经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119876', 'jiangyaqin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0271', '江雅琴', null, '13510550450', null, 'jiangyaqin@ecaray.com', '2', null, null, null, '人才发展经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119877', 'dangjing@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0272', '党静', null, '15380821984', null, 'dangjing@ecaray.com', '2', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119878', 'xuchenguang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0273', '徐晨光', null, '13924665780', null, 'xuchenguang@ecaray.com', '1', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119879', 'jiangyue@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0274', '蒋悦', null, '18033405192', null, 'jiangyue@ecaray.com', '1', null, null, null, '研发副总裁', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119880', 'hepengfei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0275', '贺鹏飞', null, '13028895936', null, 'hepengfei@ecaray.com', '1', null, null, null, '.NET开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119881', 'guozhiwen@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0276', '郭志文', null, '13711075533', null, 'guozhiwen@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119882', 'zhanghuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0277', '张焕', null, '18588221735', null, 'zhanghuan@ecaray.com', '1', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119883', 'fengdongshuang@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0278', '冯冬双', null, '13128930881', null, 'fengdongshuang@ecaray.com', '2', null, null, null, '产品经理（OA系统）', '1501', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119884', 'yangshuangjian@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0279', '杨双健', null, '17727660705', null, 'yangshuangjian@ecaray.com', '1', null, null, null, '战略发展经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119885', 'wucaibin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0281', '吴财宾', null, '15010917536', null, 'wucaibin@ecaray.com', '1', null, null, null, 'JAVA开发工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119886', 'zhanyanmei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0283', '詹艳梅', null, '13686876074', null, 'zhanyanmei@ecaray.com', '2', null, null, null, 'H5工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119887', 'peilei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0284', '裴雷', null, '15013895866', null, 'peilei@ecaray.com', '1', null, null, null, '项目经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119888', 'chenliwei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0285', '陈立伟', null, '13312930692', null, 'chenliwei@ecaray.com', '1', null, null, null, '培训专员', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119889', 'huanghuixin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0287', '黄慧馨', null, '18251820653', null, 'huanghuixin@ecaray.com', '2', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119890', 'xiangjuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0288', '向娟', null, '18899768972', null, 'xiangjuan@ecaray.com', '2', null, null, null, '产品经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119891', 'tanglihua@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0289', '唐利华', null, '18565880403', null, 'tanglihua@ecaray.com', '2', null, null, null, '财务经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119892', 'linxiaojin@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0290', '林小健', null, '15914378689', null, 'linxiaojin@ecaray.com', '1', null, null, null, '产品经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119893', 'huanghuixiao@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0291', '黄辉晓', null, '18998936726', null, 'huanghuixiao@ecaray.com', '1', null, null, null, '项目支持经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119894', 'lufangping@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0292', '卢方平', null, '13823280590', null, 'lufangping@ecaray.com', '2', null, null, null, '企业文化专员', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119895', 'renminrui@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0293', '任敏瑞', null, '13612959158', null, 'renminrui@ecaray.com', '1', null, null, null, '网络工程师', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119896', 'chenlei@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0294', '陈雷', null, '', null, 'chenlei@ecaray.com', '1', null, null, null, '售前技术经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119897', 'zhaoyong@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0295', '赵勇', null, '18629336803', null, 'zhaoyong@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
INSERT INTO `sys_user_tmp` VALUES ('149309277119898', 'zhangjiaxuan@ecaray.com', 'e10adc3949ba59abbe56e057f20f883e', '0296', '张嘉轩', null, '13823689928', null, 'zhangjiaxuan@ecaray.com', '1', null, null, null, '区域经理', '1493705570462314', 'default', null, '0', null, '0', '0');
