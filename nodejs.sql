/*
 Navicat Premium Data Transfer

 Source Server         : aLiang
 Source Server Type    : MySQL
 Source Server Version : 50740
 Source Host           : localhost:3306
 Source Schema         : nodejs

 Target Server Type    : MySQL
 Target Server Version : 50740
 File Encoding         : 65001

 Date: 22/06/2024 23:33:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for application
-- ----------------------------
DROP TABLE IF EXISTS `application`;
CREATE TABLE `application`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `competitions_id` int(11) NOT NULL,
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `state` int(11) NOT NULL,
  `state_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_users`(`users_id`) USING BTREE,
  INDEX `fk_competitions`(`competitions_id`) USING BTREE,
  CONSTRAINT `fk_competitions` FOREIGN KEY (`competitions_id`) REFERENCES `competitions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of application
-- ----------------------------
INSERT INTO `application` VALUES (14, 43, 2, '2024-06-18 11:09:35', '2024-06-21 21:56:56', 2, '审核通过');
INSERT INTO `application` VALUES (15, 43, 4, '2024-06-18 11:09:37', '2024-06-22 19:43:45', 0, '审核未通过');
INSERT INTO `application` VALUES (16, 50, 2, '2024-06-20 09:37:36', '2024-06-21 20:10:44', 2, '审核通过');
INSERT INTO `application` VALUES (17, 50, 4, '2024-06-20 10:17:44', '2024-06-21 00:16:11', 1, '待审核');
INSERT INTO `application` VALUES (19, 50, 5, '2024-06-20 10:58:04', '2024-06-20 10:58:04', 1, '待审核');
INSERT INTO `application` VALUES (29, 60, 7, '2024-06-21 20:28:02', '2024-06-21 20:28:02', 1, '待审核');
INSERT INTO `application` VALUES (31, 60, 5, '2024-06-21 22:23:55', '2024-06-21 22:23:55', 1, '待审核');
INSERT INTO `application` VALUES (32, 61, 5, '2024-06-21 23:58:44', '2024-06-22 00:02:26', 2, '审核通过');
INSERT INTO `application` VALUES (33, 1, 8, '2024-06-22 22:00:45', '2024-06-22 22:04:16', 2, '审核通过');
INSERT INTO `application` VALUES (34, 1, 11, '2024-06-22 22:03:14', '2024-06-22 22:03:14', 1, '待审核');

-- ----------------------------
-- Table structure for competitions
-- ----------------------------
DROP TABLE IF EXISTS `competitions`;
CREATE TABLE `competitions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `startTime` datetime NULL DEFAULT NULL,
  `endTime` datetime NULL DEFAULT NULL,
  `registrationDeadline` datetime NULL DEFAULT NULL,
  `maxParticipants` int(11) NULL DEFAULT NULL,
  `createdBy` int(11) NULL DEFAULT NULL,
  `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of competitions
-- ----------------------------
INSERT INTO `competitions` VALUES (2, '数学竞赛', '全国比赛', '上海', '2024-06-12 00:00:00', '2024-06-27 00:00:00', '2024-06-30 00:00:00', 100, 23, '2024-06-11 22:37:38', '2024-06-22 22:12:41');
INSERT INTO `competitions` VALUES (4, '蓝桥杯1', '全国比赛', '北京', '2024-06-04 00:00:00', '2024-06-12 00:00:00', '2024-06-01 00:00:00', 100, 2, '2024-06-18 00:45:01', '2024-06-21 20:10:31');
INSERT INTO `competitions` VALUES (5, '创新杯', '全国比赛', '南昌', '2024-06-27 10:37:18', '2024-06-29 10:37:23', '2024-06-22 10:37:26', 1, 1, '2024-06-20 10:37:16', '2024-06-20 20:13:03');
INSERT INTO `competitions` VALUES (7, '创新创业比赛', '全国大学生参加', '北京', '2024-06-23 00:00:00', '2024-06-24 00:00:00', '2024-06-22 00:00:00', 10, NULL, '2024-06-21 08:46:00', '2024-06-21 08:46:43');
INSERT INTO `competitions` VALUES (8, '区块链技能比武大赛', '全国比赛', '江西', '2024-06-28 08:00:00', '2024-06-30 08:00:00', '2024-06-25 00:00:00', 200, NULL, '2024-06-22 21:47:51', '2024-06-22 21:47:51');
INSERT INTO `competitions` VALUES (11, '我是添加的比赛', '123', '123123', '2024-06-17 00:00:00', '2024-06-17 00:00:00', '2024-06-23 00:00:00', 12, NULL, '2024-06-22 22:01:58', '2024-06-22 22:03:09');
INSERT INTO `competitions` VALUES (12, '2', '2', '2', '2024-06-27 00:00:00', '2024-06-26 00:00:00', '2024-06-05 00:00:00', 2, NULL, '2024-06-22 22:02:11', '2024-06-22 22:02:11');

-- ----------------------------
-- Table structure for scores
-- ----------------------------
DROP TABLE IF EXISTS `scores`;
CREATE TABLE `scores`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `submission_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `score` decimal(5, 2) NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `submission_id`(`submission_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of scores
-- ----------------------------

-- ----------------------------
-- Table structure for submissions
-- ----------------------------
DROP TABLE IF EXISTS `submissions`;
CREATE TABLE `submissions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `competition_id` int(11) NOT NULL,
  `file_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `competition_id`(`competition_id`) USING BTREE,
  CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`competition_id`) REFERENCES `competitions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of submissions
-- ----------------------------
INSERT INTO `submissions` VALUES (1, 35, 5, '/uploads/1718116242263-05efd2055b9c4c1bb9eb9d85d192c3f5.jpg', '2024-06-13 19:58:21', '区块链二手交易');
INSERT INTO `submissions` VALUES (2, 50, 2, '/public/upload/1718887922477-å½å®¶å±å¿å¥å­¦é.rar', '2024-06-20 20:52:02', NULL);
INSERT INTO `submissions` VALUES (3, 50, 2, '/public/upload/1718890059650-å®¶åº­ç»æµå°é¾å­¦çè®¤å®.zip', '2024-06-20 21:27:39', '123');
INSERT INTO `submissions` VALUES (4, 50, 2, '/public/upload/1718890327088-å®¶åº­ç»æµå°é¾å­¦çè®¤å®.zip', '2024-06-20 21:32:07', '333');
INSERT INTO `submissions` VALUES (5, 50, 2, '/public/upload/1718891570496-jetbra.rar', '2024-06-20 21:52:50', '123');
INSERT INTO `submissions` VALUES (6, 50, 2, '/public/upload/1718891570498-Bootstrap_Studio_6.6.1_x64_Downloadly.ir.rar', '2024-06-20 21:52:50', '123');
INSERT INTO `submissions` VALUES (7, 50, 2, '/public/upload/1718891621200-Bootstrap_Studio_6.6.1_x64_Downloadly.ir.rar', '2024-06-20 21:53:41', '这些都是我的区块链比赛作品');
INSERT INTO `submissions` VALUES (8, 50, 2, '/public/upload/1718891621633-jetbra.rar', '2024-06-20 21:53:41', '这些都是我的区块链比赛作品');
INSERT INTO `submissions` VALUES (9, 50, 2, '/public/upload/1718891621636-å½å®¶å±å¿å¥å­¦é.rar', '2024-06-20 21:53:41', '这些都是我的区块链比赛作品');
INSERT INTO `submissions` VALUES (10, 50, 2, '/public/upload/1718891621636-å®¶åº­ç»æµå°é¾å­¦çè®¤å®.zip', '2024-06-20 21:53:41', '这些都是我的区块链比赛作品');
INSERT INTO `submissions` VALUES (11, 55, 7, '/public/upload/1718931094359-1b91d753cbb64883aee1dacb31bea7bd.png', '2024-06-21 08:51:34', '1213');
INSERT INTO `submissions` VALUES (12, 55, 7, '/public/upload/1718931094465-jetbra.rar', '2024-06-21 08:51:34', '1213');
INSERT INTO `submissions` VALUES (13, 55, 7, '/public/upload/1718933521054-05efd2055b9c4c1bb9eb9d85d192c3f5.jpg', '2024-06-21 09:32:01', '我是上传');
INSERT INTO `submissions` VALUES (14, 55, 7, '/public/upload/1718933521082-792a4b6934fc491b81342206e3192e59.png', '2024-06-21 09:32:01', '我是上传');
INSERT INTO `submissions` VALUES (15, 55, 7, '/public/upload/1718935495348-05efd2055b9c4c1bb9eb9d85d192c3f5.jpg', '2024-06-21 10:04:55', '123');
INSERT INTO `submissions` VALUES (16, 61, 5, '/public/upload/1718985548684-93849492eb414e81a6369ed3bec54f08.jpg', '2024-06-21 23:59:08', '12');
INSERT INTO `submissions` VALUES (17, 61, 5, '/public/upload/1718990294409-3981173d6f7e4c808528488c7ec7e462.png', '2024-06-22 01:18:14', '1');
INSERT INTO `submissions` VALUES (18, 1, 8, '/public/upload/1719065114793-1b91d753cbb64883aee1dacb31bea7bd.png', '2024-06-22 22:05:14', '我是比赛的文件，包括ppt，word，图片');
INSERT INTO `submissions` VALUES (19, 1, 8, '/public/upload/1719065114848-2.1~2.7.pptx', '2024-06-22 22:05:14', '我是比赛的文件，包括ppt，word，图片');
INSERT INTO `submissions` VALUES (20, 1, 8, '/public/upload/1719065114862-goon.md', '2024-06-22 22:05:14', '我是比赛的文件，包括ppt，word，图片');


-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `avatarUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '123123', '2650321653@qq.com', '$2a$10$kQSgLQSwhRU0L4hYIcKU..Ki5MNRDWZxFNfVdD6UGyCqUDaIRbA6e', 'user', '卢良强', '爱好读书，爱好学习nodejs~~~', '/public/upload/1719064695814-wallhaven-6dg7ll_3200x2000.png', '2024-06-22 21:54:27', '2024-06-22 21:58:17');
INSERT INTO `users` VALUES (2, '我是管理员', '2650321653@qq.com', '$2a$10$IvkFoATocns3ylUKuC0Do.V.Z4gFGEdk1v6GcTAVpF/ucIefcdzGu', 'admin', '卢良强', '爱好管理的小卢，爱好吃饭睡觉~~·', '/public/upload/1719064610991-dd4aee16880411ebb6edd017c2d2eca2.jpg', '2024-06-22 21:56:53', '2024-06-22 21:58:38');

SET FOREIGN_KEY_CHECKS = 1;
