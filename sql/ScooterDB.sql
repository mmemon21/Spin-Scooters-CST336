SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Table structure for table `locations`
--
DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` mediumint(9) NOT NULL,
  `name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `numOfDevices` int(3) NOT NULL,
  `api` varchar(25) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `numOfDevices`, `api`) VALUES
(1, 'Administration Building', 4, '93955'),
(2, 'Alumni & Visitors Center', 8, '93955'),
(3, 'Beach Hall', 13, '93955'),
(4, 'Black Box Cabaret', 18, '93955'),
(5, 'Chapman Science Academic Center', 16, '93955'),
(6, 'College of Arts, Humanities, and Social Sciences', 4, '93955'),
(7, 'Cinematic Arts & Technology', 9, '93955'),
(8, 'Coast Hall', 2, '93955'),
(9, 'Del Mar', 20, '93955'),
(10, 'Dining Commons', 3, '93955'),
(11, 'Dunes Hall', 5, '93955'),
(12, 'Facilities Services & Operations', 6, '93955'),
(13, 'Gambord Business Information & Technology', 11, '93955'),
(14, 'Gavilan Hall', 1, '93955'),
(15, 'Green Hall', 5, '93955'),
(16, 'Harbor Hall', 4, '93955'),
(17, 'Manzanita Hall', 8, '93955'),
(18, 'Promontory – West', 12, '93933'),
(19, 'Promontory – Center', 15, '93933'),
(20, 'Vineyard Suites', 1, '93955');

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricing`
--
DROP TABLE IF EXISTS `pricing`;
CREATE TABLE `pricing` (
  `id` mediumint(9) NOT NULL,
  `price` float(9) NOT NULL,
  `tax` float(9) NOT NULL,
  `distance` float(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pricing`
--

INSERT INTO `pricing` (`id`, `price`, `tax`, `distance`) VALUES
(1, 5.10, 0.10, 5),
(2, 2.25, 0.05, 3),
(3, 6.50, 0.01, 7),
(4, 3.15, 0.10, 4),
(5, 1.55, 0.15, 2.10),
(6, 1.75, 0.04, 2.34),
(7, 4.32, 0.02, 5),
(8, 8.00, 0.08, 7.56),
(9, 2.75, 0.10, 3),
(10, 2.90, 0.20, 3.15),
(11, 4.67, 0.11, 5),
(12, 5.32, 0.07, 5.54),
(13, 4.20, 0.02, 4.60),
(14, 2.47, 0.05, 2.80),
(15, 6.34, 0.04, 6),
(16, 2.10, 0.13, 2),
(17, 1.34, 0.18, 1),
(18, 9.50, 0.14, 10.4),
(19, 7.10, 0.09, 7.8),
(20, 5.67, 0.03, 6.3);

LOCK TABLES `pricing` WRITE;
/*!40000 ALTER TABLE `pricing` DISABLE KEYS */;
/*!40000 ALTER TABLE `pricing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` mediumint(9) NOT NULL,
  `name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `age` int(3) NOT NULL,
  `password` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

/*User Passwords are intials and 'pass' (Nick Patterson: nppass)*/
INSERT INTO `users` (`id`, `name`, `username`, `email`, `age`, `password`) VALUES
(1, 'Administrator', 'admin', 'admin@email.com', 0, '$2b$10$4vtZemAhmyPo9MH72VuyLu2zZj38iQ5uFe/vne1vFINUyFsRO1FJ.'),
(2, 'Nick Patterson', 'npun', 'email@email.com', 15, '$2b$10$KQl2WS7.a8nQ1c9AbYmmVuRkKSOm5kFl2ljvtZFfys7XuxNTDkzDW'),
(3, 'Simon Ward', 'swun', 'email@email.com', 31, '$2b$10$e2U3ItLff2MjeYe6EiLjK.OuA4OJESmcnCvjOuZVeOClPbpQyY5fK'),
(4, 'Kristy Lucas', 'klun', 'email@email.com', 99, '$2b$10$0FMK.CusGwN3PVXjvMfv/OYLQ9RmKK45sJs0So8aWiqNHQ.azpeei'),
(5, 'Craig Miller', 'cmun', 'email@email.com', 23, '$2b$10$nqxUR/.i91Hf6G8eXUn/Eeed6NX0FpVUHM9Rld1UislztO8l45tZ6'),
(6, 'Joanne Barton', 'jbun', 'email@email.com', 42, '$2b$10$98i70RNOpwOj9tqA0NyIxuZo33Sggxk8ns85vFQb.BZ8j3JhEuj5q'),
(7, 'Helen Sanders', 'hsun', 'email@email.com', 50, '$2b$10$Y3pgyZr7RgjacIULyVCylu48ZOSEXgHJuLnIQwBv0vxUOqTbPKuDW'),
(8, 'Jimmy Tucker', 'jtun', 'email@email.com', 18, '$2b$10$QdQ/Klvh5.pHel/x1T0eDuPwF7npNcgCXwkL4K3Xo0qOiTgYbtD/W'),
(9, 'Sara Vega', 'svun', 'email@email.com', 76, '$2b$10$Uks7Cr7wb/ZYWpv1Eh6hBOrIPSXh7N8kRhIQDCNCSx3Z9xkmey6gC'),
(10, 'Vincent Rowe', 'vrun', 'email@email.com', 19, '$2b$10$ubP/iBbdgkUPkwzYOIfjLe0GDtR3Y9TS65OXTNOc4p3xGmZt7H5ki'),
(11, 'Madeline Ramsey', 'mrun', 'email@email.com', 34, '$2b$10$4uBNLvOhApg.urRJhhL4ueiIMPFNTIA01s4DB2s9dV8UZ2S67NFPW'),
(12, 'Bradford Moody', 'bmun', 'email@email.com', 46, '$2b$10$xVQl1r2YGFzxWdTuF/n13um9Q14tyUp3dSdZC2RI3QYMtwM1ahaCq'),
(13, 'Billie Walker', 'bwun', 'email@email.com', 23, '$2b$10$1nFpEjkPC5aTNkXg55e1/Op6Vo7SQXBE6z1Noh4e8Gk3cLVZr7oVK'),
(14, 'Richard Wilkerson', 'rwun', 'email@email.com', 27, '$2b$10$TzdiJnoCAVS78FxEIbNpPORt2/bgwjqel7RaNTfgEctvK2fcb.gT6'),
(15, 'Stacy Lewis', 'slun', 'email@email.com', 67, '$2b$10$qIbOvQyQVXV1HutBUfWKo.bB34MHiWPpIdJgO0bCUxz8mOIDNnYu2'),
(16, 'Ginger Mitchell', 'gmun', 'email@email.com', 43, '$2b$10$y9ki0V.FS1MVhDMuJdPTB.vTW5RjgJbnUXkMIKWjBZkJjW9Vo0HA.'),
(17, 'Felix Webster', 'fwun', 'email@email.com', 22, '$2b$10$XgLH2BqZXWE5nENyH/psAuv9wOm71Ku4fv36axJrCxSOOu3NoVtL.'),
(18, 'Miriam Hansen', 'mhun', 'email@email.com', 33, '$2b$10$3awHd6Tt8L7awaH7ZRIbP.ToA83yptkiIw2q/inJb3/N1BEBCW8Tu'),
(19, 'June Flores', 'jfun', 'email@email.com', 88, '$2b$10$ehf6w7qKJtjv6ESQ7E0BseXXBjW0O.KMYKzvBpXgQRGIki/pPxkXq'),
(20, 'Derek Reese', 'drun', 'email@email.com', 17, '$2b$10$zvR2DOZzIr/img3MWKpmRO8r.VNKON56X71fWp3r8hC6DCXk82.Ie');

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pricing`
--
ALTER TABLE `pricing`
  ADD PRIMARY KEY (`id`);
  
--
-- Indexes for table `pricing`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `l9_quotes`
--
ALTER TABLE `pricing`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
  
--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `users`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-20 14:50:10
