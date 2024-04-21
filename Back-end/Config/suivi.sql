-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2024 at 09:22 PM
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
-- Database: `suivi`
--

-- --------------------------------------------------------

--
-- Table structure for table `atelier`
--

CREATE TABLE `atelier` (
  `atelier_name` varchar(255) NOT NULL,
  `atelier_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `atelier`
--

INSERT INTO `atelier` (`atelier_name`, `atelier_id`) VALUES
('dev', 4);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_name` varchar(255) NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_name`, `employee_id`) VALUES
('ayoub', 1),
('samis', 2),
('bakale', 3);

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
(21, '5sd5', 'ds5d5', 'cable', 12, '2024-04-16', '2024-04-21', 'A1'),
(59, 'ff1401', '1259d6987z', 'projecteur', 3, '2024-04-21', '2024-04-21', 'B1');

--
-- Triggers `equipment`
--
DELIMITER $$
CREATE TRIGGER `after_equipment_update` BEFORE UPDATE ON `equipment` FOR EACH ROW BEGIN
    IF OLD.quantity_available <> new.quantity_available THEN
        SET NEW.updated_date = NOW(); -- Use NOW() or CURRENT_TIMESTAMP to set current timestamp
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `position_name` varchar(255) NOT NULL,
  `position_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`position_name`, `position_id`) VALUES
('A1', 2),
('A2', 3),
('B1', 6),
('B2', 7),
('C3', 8),
('C4', 49),
('A3', 50);

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
-- Indexes for dumped tables
--

--
-- Indexes for table `atelier`
--
ALTER TABLE `atelier`
  ADD PRIMARY KEY (`atelier_name`),
  ADD KEY `atelier_id` (`atelier_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_name`),
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
  MODIFY `atelier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equipment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `trackequipment`
--
ALTER TABLE `trackequipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`position_name`) REFERENCES `position` (`position_name`);

--
-- Constraints for table `trackequipment`
--
ALTER TABLE `trackequipment`
  ADD CONSTRAINT `trackequipment_ibfk_1` FOREIGN KEY (`code`) REFERENCES `equipment` (`code`),
  ADD CONSTRAINT `trackequipment_ibfk_2` FOREIGN KEY (`employee_name`) REFERENCES `employees` (`employee_name`),
  ADD CONSTRAINT `trackequipment_ibfk_3` FOREIGN KEY (`atelier_name`) REFERENCES `atelier` (`atelier_name`),
  ADD CONSTRAINT `trackequipment_ibfk_4` FOREIGN KEY (`position_name`) REFERENCES `position` (`position_name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
