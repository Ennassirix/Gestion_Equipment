-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2024 at 12:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestion_s`
--

-- --------------------------------------------------------

--
-- Table structure for table `atelier`
--

CREATE TABLE `atelier` (
  `atelier_id` int(11) NOT NULL,
  `atelier_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `atelier`
--

INSERT INTO `atelier` (`atelier_id`, `atelier_name`) VALUES
(1, 'DEV'),
(2, 'ME');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `employee_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `employee_name`) VALUES
(1, 'ayoub'),
(16, 'youssef'),
(17, 'a');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `equipment_id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `equipment_name` varchar(100) DEFAULT NULL,
  `quantity_available` int(11) DEFAULT NULL,
  `created_date` date DEFAULT current_timestamp(),
  `updated_date` date DEFAULT current_timestamp(),
  `position_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`equipment_id`, `code`, `ref`, `equipment_name`, `quantity_available`, `created_date`, `updated_date`, `position_name`) VALUES
(1, '1234a', '321c654v987', 'projecteur', 10, '2024-04-23', '2024-04-23', 'A1');

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `position_id` int(11) NOT NULL,
  `position_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`position_id`, `position_name`) VALUES
(1, 'A1');

-- --------------------------------------------------------

--
-- Table structure for table `trackequipment`
--

CREATE TABLE `trackequipment` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `ref` varchar(255) DEFAULT NULL,
  `equipment_name` varchar(255) DEFAULT NULL,
  `employee_name` varchar(255) DEFAULT NULL,
  `atelier_name` varchar(255) DEFAULT NULL,
  `position_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trackequipment`
--

INSERT INTO `trackequipment` (`id`, `code`, `ref`, `equipment_name`, `employee_name`, `atelier_name`, `position_name`, `quantity`, `created_date`) VALUES
(1, '1234a', '321c654v987', 'cable', 'ayoub', 'DEV', 'A1', 2, '2024-04-23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `atelier`
--
ALTER TABLE `atelier`
  ADD PRIMARY KEY (`atelier_name`),
  ADD KEY `atelier_id` (`atelier_id`),
  ADD KEY `atelier_name` (`atelier_name`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_name`),
  ADD UNIQUE KEY `employee_name` (`employee_name`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`code`),
  ADD KEY `position_name` (`position_name`),
  ADD KEY `equipment_id` (`equipment_id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`position_name`),
  ADD KEY `position_id` (`position_id`);

--
-- Indexes for table `trackequipment`
--
ALTER TABLE `trackequipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `code` (`code`),
  ADD KEY `employee_name` (`employee_name`),
  ADD KEY `atelier_name` (`atelier_name`),
  ADD KEY `position_name` (`position_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `atelier`
--
ALTER TABLE `atelier`
  MODIFY `atelier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equipment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `trackequipment`
--
ALTER TABLE `trackequipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`position_name`) REFERENCES `position` (`position_name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `trackequipment`
--
ALTER TABLE `trackequipment`
  ADD CONSTRAINT `trackequipment_ibfk_1` FOREIGN KEY (`code`) REFERENCES `equipment` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `trackequipment_ibfk_2` FOREIGN KEY (`employee_name`) REFERENCES `employees` (`employee_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `trackequipment_ibfk_3` FOREIGN KEY (`atelier_name`) REFERENCES `atelier` (`atelier_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `trackequipment_ibfk_4` FOREIGN KEY (`position_name`) REFERENCES `position` (`position_name`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
