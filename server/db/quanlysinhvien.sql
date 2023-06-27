-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th6 26, 2023 lúc 09:16 PM
-- Phiên bản máy phục vụ: 10.1.48-MariaDB
-- Phiên bản PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanlysinhvien`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `qlsv_checkin`
--

CREATE TABLE `qlsv_checkin` (
  `id` int(11) NOT NULL,
  `date_check_in` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL,
  `table_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `qlsv_checkin`
--

INSERT INTO `qlsv_checkin` (`id`, `date_check_in`, `created_at`, `user_id`, `table_id`) VALUES
(5, '2023-06-26 20:42:30', '2023-06-26 20:42:30', 3, 8),
(7, '2023-06-26 23:20:25', '2023-06-26 23:20:25', 5, 5),
(9, '2023-06-27 00:45:30', '2023-06-27 00:45:30', 5, 3),
(10, '2023-06-27 01:15:24', '2023-06-27 01:15:24', 3, 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `qlsv_class`
--

CREATE TABLE `qlsv_class` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `table_quantity` int(11) NOT NULL DEFAULT '28',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `qlsv_class`
--

INSERT INTO `qlsv_class` (`id`, `name`, `table_quantity`, `created_at`) VALUES
(1, '10a1', 28, '2023-06-22 21:43:02'),
(3, '10a2', 28, '2023-06-22 21:43:02'),
(4, '10a3', 28, '2023-06-22 21:43:02'),
(5, '10a4', 28, '2023-06-22 21:43:02'),
(6, '11a1', 28, '2023-06-22 21:43:02'),
(7, '11a2', 28, '2023-06-22 21:43:02'),
(8, '11a3', 28, '2023-06-22 21:43:02'),
(9, '11a4', 28, '2023-06-22 21:43:02'),
(10, '12a1', 28, '2023-06-22 21:43:02'),
(11, '12a2', 28, '2023-06-22 21:43:02'),
(12, '12a3', 28, '2023-06-22 21:43:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `qlsv_table`
--

CREATE TABLE `qlsv_table` (
  `id` int(11) NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `classs_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `qlsv_table`
--

INSERT INTO `qlsv_table` (`id`, `state`, `created_at`, `classs_id`) VALUES
(1, 0, '2023-06-22 21:53:53', 1),
(2, 0, '2023-06-22 21:54:18', 1),
(3, 1, '2023-06-22 21:54:18', 1),
(4, 0, '2023-06-22 21:54:19', 1),
(5, 1, '2023-06-22 21:54:19', 1),
(6, 0, '2023-06-22 21:54:20', 1),
(7, 1, '2023-06-22 21:54:20', 1),
(8, 1, '2023-06-22 21:54:20', 1),
(9, 0, '2023-06-22 21:54:21', 1),
(10, 0, '2023-06-22 21:54:21', 1),
(11, 0, '2023-06-22 21:54:21', 1),
(12, 0, '2023-06-22 21:54:22', 1),
(13, 0, '2023-06-22 21:54:22', 1),
(14, 0, '2023-06-22 21:54:23', 1),
(15, 0, '2023-06-22 21:54:23', 1),
(16, 0, '2023-06-22 21:54:23', 1),
(17, 0, '2023-06-22 21:54:24', 1),
(18, 0, '2023-06-22 21:54:24', 1),
(19, 0, '2023-06-22 21:54:24', 1),
(20, 0, '2023-06-22 21:54:25', 1),
(21, 0, '2023-06-22 21:54:25', 1),
(22, 0, '2023-06-22 21:54:26', 1),
(23, 0, '2023-06-22 21:54:26', 1),
(24, 0, '2023-06-22 21:54:27', 1),
(25, 0, '2023-06-22 21:54:27', 1),
(26, 0, '2023-06-22 21:54:27', 1),
(27, 0, '2023-06-22 21:54:28', 1),
(28, 0, '2023-06-22 21:54:28', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `qlsv_user`
--

CREATE TABLE `qlsv_user` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unknown',
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'student',
  `birthday` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `qlsv_user`
--

INSERT INTO `qlsv_user` (`id`, `created_at`, `fullname`, `username`, `password`, `phone_number`, `gender`, `role`, `birthday`) VALUES
(3, '2023-06-22 20:33:04', 'User Demo', 'userdemo', '$2b$10$aXsVR5ufrXEZxBJCiajGl.RzDfX3nBjFvHR0Q9RfBufuxxKlmKEL2', '+84987654321', 'male', 'student', '1993-06-22 20:30:34'),
(4, '2023-06-26 22:42:14', 'Teacher 01', 'demoteacher', '$2b$10$yCHUsHMntqFkKyIzzZmbPe38MParwFnsYf6Ju31O8Xx/HFL34A8lS', '+84980123456', 'male', 'teacher', '2023-06-26 22:40:52'),
(5, '2023-06-26 23:14:27', 'User 02', 'userdedmo2', '$2b$10$IUepIq7LhHotzfBj7wscbOkec8xlj9MbzK3NyP3/89wwqshUu957i', '+84980123456', 'male', 'student', '2023-06-26 22:40:52');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `qlsv_checkin`
--
ALTER TABLE `qlsv_checkin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_at` (`created_at`),
  ADD KEY `FK_2223b7461537db8e7dad3340b42` (`user_id`),
  ADD KEY `FK_b6a692bca5b0456df056af956db` (`table_id`);

--
-- Chỉ mục cho bảng `qlsv_class`
--
ALTER TABLE `qlsv_class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_at` (`created_at`);

--
-- Chỉ mục cho bảng `qlsv_table`
--
ALTER TABLE `qlsv_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_at` (`created_at`),
  ADD KEY `FK_9858bdb2e6f0000044c078176ed` (`classs_id`);

--
-- Chỉ mục cho bảng `qlsv_user`
--
ALTER TABLE `qlsv_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_at` (`created_at`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `qlsv_checkin`
--
ALTER TABLE `qlsv_checkin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `qlsv_class`
--
ALTER TABLE `qlsv_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `qlsv_table`
--
ALTER TABLE `qlsv_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `qlsv_user`
--
ALTER TABLE `qlsv_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `qlsv_checkin`
--
ALTER TABLE `qlsv_checkin`
  ADD CONSTRAINT `FK_2223b7461537db8e7dad3340b42` FOREIGN KEY (`user_id`) REFERENCES `qlsv_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b6a692bca5b0456df056af956db` FOREIGN KEY (`table_id`) REFERENCES `qlsv_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `qlsv_table`
--
ALTER TABLE `qlsv_table`
  ADD CONSTRAINT `FK_9858bdb2e6f0000044c078176ed` FOREIGN KEY (`classs_id`) REFERENCES `qlsv_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
