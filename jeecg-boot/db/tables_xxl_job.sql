#
# XXL-JOB v2.2.0
# Copyright (c) 2015-present, xuxueli.

CREATE database if NOT EXISTS `xxl_job` default character set utf8mb4 collate utf8mb4_general_ci;
use `xxl_job`;

SET NAMES utf8mb4;

CREATE TABLE `xxl_job_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_group` int(11) NOT NULL COMMENT 'ID chính của bộ thực thi',
  `job_cron` varchar(128) NOT NULL COMMENT 'CRON thực thi nhiệm vụ',
  `job_desc` varchar(255) NOT NULL,
  `add_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `author` varchar(64) DEFAULT NULL COMMENT 'Tác giả',
  `alarm_email` varchar(255) DEFAULT NULL COMMENT 'Email cảnh báo',
  `executor_route_strategy` varchar(50) DEFAULT NULL COMMENT 'Chiến lược định tuyến bộ thực thi',
  `executor_handler` varchar(255) DEFAULT NULL COMMENT 'Handler nhiệm vụ của bộ thực thi',
  `executor_param` varchar(512) DEFAULT NULL COMMENT 'Tham số nhiệm vụ của bộ thực thi',
  `executor_block_strategy` varchar(50) DEFAULT NULL COMMENT 'Chiến lược xử lý tắc nghẽn',
  `executor_timeout` int(11) NOT NULL DEFAULT '0' COMMENT 'Thời gian chờ thực thi nhiệm vụ, đơn vị giây',
  `executor_fail_retry_count` int(11) NOT NULL DEFAULT '0' COMMENT 'Số lần thử lại khi thất bại',
  `glue_type` varchar(50) NOT NULL COMMENT 'Loại GLUE',
  `glue_source` mediumtext COMMENT 'Mã nguồn GLUE',
  `glue_remark` varchar(128) DEFAULT NULL COMMENT 'Ghi chú GLUE',
  `glue_updatetime` datetime DEFAULT NULL COMMENT 'Thời gian cập nhật GLUE',
  `child_jobid` varchar(255) DEFAULT NULL COMMENT 'ID nhiệm vụ con, nhiều ID cách nhau bằng dấu phẩy',
  `trigger_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'Trạng thái kích hoạt: 0-Dừng, 1-Chạy',
  `trigger_last_time` bigint(13) NOT NULL DEFAULT '0' COMMENT 'Thời gian kích hoạt lần trước',
  `trigger_next_time` bigint(13) NOT NULL DEFAULT '0' COMMENT 'Thời gian kích hoạt lần tiếp theo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `xxl_job_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `job_group` int(11) NOT NULL COMMENT 'ID chính của bộ thực thi',
  `job_id` int(11) NOT NULL COMMENT 'ID chính của nhiệm vụ',
  `executor_address` varchar(255) DEFAULT NULL COMMENT 'Địa chỉ bộ thực thi, địa chỉ thực thi lần này',
  `executor_handler` varchar(255) DEFAULT NULL COMMENT 'Handler nhiệm vụ của bộ thực thi',
  `executor_param` varchar(512) DEFAULT NULL COMMENT 'Tham số nhiệm vụ của bộ thực thi',
  `executor_sharding_param` varchar(20) DEFAULT NULL COMMENT 'Tham số phân mảnh nhiệm vụ của bộ thực thi, định dạng như 1/2',
  `executor_fail_retry_count` int(11) NOT NULL DEFAULT '0' COMMENT 'Số lần thử lại khi thất bại',
  `trigger_time` datetime DEFAULT NULL COMMENT 'Thời gian kích hoạt',
  `trigger_code` int(11) NOT NULL COMMENT 'Kết quả kích hoạt',
  `trigger_msg` text COMMENT 'Nhật ký kích hoạt',
  `handle_time` datetime DEFAULT NULL COMMENT 'Thời gian thực thi',
  `handle_code` int(11) NOT NULL COMMENT 'Trạng thái thực thi',
  `handle_msg` text COMMENT 'Nhật ký thực thi',
  `alarm_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'Trạng thái cảnh báo: 0-Mặc định, 1-Không cần cảnh báo, 2-Cảnh báo thành công, 3-Cảnh báo thất bại',
  PRIMARY KEY (`id`),
  KEY `I_trigger_time` (`trigger_time`),
  KEY `I_handle_code` (`handle_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `xxl_job_log_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trigger_day` datetime DEFAULT NULL COMMENT 'Thời gian kích hoạt',
  `running_count` int(11) NOT NULL DEFAULT '0' COMMENT 'Số lượng nhật ký đang chạy',
  `suc_count` int(11) NOT NULL DEFAULT '0' COMMENT 'Số lượng nhật ký thành công',
  `fail_count` int(11) NOT NULL DEFAULT '0' COMMENT 'Số lượng nhật ký thất bại',
  PRIMARY KEY (`id`),
  UNIQUE KEY `i_trigger_day` (`trigger_day`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `xxl_job_logglue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) NOT NULL COMMENT 'Nhiệm vụ, ID chính',
  `glue_type` varchar(50) DEFAULT NULL COMMENT 'Loại GLUE',
  `glue_source` mediumtext COMMENT 'Mã nguồn GLUE',
  `glue_remark` varchar(128) NOT NULL COMMENT 'Ghi chú GLUE',
  `add_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `xxl_job_registry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `registry_group` varchar(50) NOT NULL,
  `registry_key` varchar(255) NOT NULL,
  `registry_value` varchar(255) NOT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `i_g_k_v` (`registry_group`,`registry_key`,`registry_value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `xxl_job_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_name` varchar(255) NOT NULL COMMENT 'Tên App của bộ thực thi',
  `title` varchar(255) NOT NULL COMMENT 'Tên bộ thực thi',
  `address_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'Loại địa chỉ bộ thực thi: 0=đăng ký tự động, 1=nhập thủ công',
  `address_list` varchar(512) DEFAULT NULL COMMENT 'Danh sách địa chỉ bộ thực thi, nhiều địa chỉ cách nhau bằng dấu phẩy',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `xxl_job_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL COMMENT 'Tài khoản',
  `password` varchar(50) NOT NULL COMMENT 'Mật khẩu',
  `role` tinyint(4) NOT NULL COMMENT 'Vai trò: 0-Người dùng thông thường, 1-Quản trị viên',
  `permission` varchar(255) DEFAULT NULL COMMENT 'Quyền hạn: Danh sách ID bộ thực thi, nhiều ID cách nhau bằng dấu phẩy',
  PRIMARY KEY (`id`),
  UNIQUE KEY `i_username` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `xxl_job_lock` (
  `lock_name` varchar(50) NOT NULL COMMENT 'Tên khóa',
  PRIMARY KEY (`lock_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `xxl_job_group`(`id`, `app_name`, `title`, `address_type`, `address_list`) VALUES (1, 'xxl-job-executor-sample', 'Bộ thực thi mẫu', 0, NULL);
INSERT INTO `xxl_job_info`(`id`, `job_group`, `job_cron`, `job_desc`, `add_time`, `update_time`, `author`, `alarm_email`, `executor_route_strategy`, `executor_handler`, `executor_param`, `executor_block_strategy`, `executor_timeout`, `executor_fail_retry_count`, `glue_type`, `glue_source`, `glue_remark`, `glue_updatetime`, `child_jobid`) VALUES (1, 1, '0 0 0 * * ? *', 'Nhiệm vụ kiểm tra 1', '2018-11-03 22:21:31', '2018-11-03 22:21:31', 'XXL', '', 'FIRST', 'demoJobHandler', '', 'SERIAL_EXECUTION', 0, 0, 'BEAN', '', 'Khởi tạo mã GLUE', '2018-11-03 22:21:31', '');
INSERT INTO `xxl_job_user`(`id`, `username`, `password`, `role`, `permission`) VALUES (1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 1, NULL);
INSERT INTO `xxl_job_lock` ( `lock_name`) VALUES ( 'schedule_lock');

commit;

