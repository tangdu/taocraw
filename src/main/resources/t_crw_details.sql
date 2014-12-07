/*
Navicat MariaDB Data Transfer

Source Server         : localhost@root
Source Server Version : 100014
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MariaDB
Target Server Version : 100014
File Encoding         : 65001

Date: 2014-12-07 14:53:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_crw_details
-- ----------------------------
DROP TABLE IF EXISTS `t_crw_details`;
CREATE TABLE `t_crw_details` (
  `id_` varchar(50) DEFAULT NULL,
  `comment_count` varchar(20) DEFAULT NULL,
  `nick` varchar(20) DEFAULT NULL,
  `nid` varchar(20) DEFAULT NULL,
  `pid` varchar(20) DEFAULT NULL,
  `reserve_price` varchar(20) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `raw_title` varchar(200) DEFAULT NULL,
  `pic_url` varchar(200) DEFAULT NULL,
  `item_loc` varchar(200) DEFAULT NULL,
  `detail_url` varchar(200) DEFAULT NULL,
  `comment_url` varchar(200) DEFAULT NULL,
  `view_sales` varchar(20) DEFAULT NULL,
  `view_price` varchar(20) DEFAULT NULL,
  `view_fee` varchar(20) DEFAULT NULL,
  `shopLink` varchar(200) DEFAULT NULL,
  `main_id` varchar(50) DEFAULT NULL,
  `sno` bigint(20) DEFAULT NULL COMMENT '排序号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
