# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.4.6-MariaDB)
# Base de datos: lab
# Tiempo de Generación: 2021-12-11 16:43:35 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla assistances
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assistances`;

CREATE TABLE `assistances` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) unsigned DEFAULT NULL,
  `closedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `assistances` WRITE;
/*!40000 ALTER TABLE `assistances` DISABLE KEYS */;

INSERT INTO `assistances` (`id`, `userId`, `closedAt`, `createdAt`, `updatedAt`)
VALUES
	(16,1,'2020-11-25 15:25:20','2020-11-25 08:25:20','2020-11-25 14:25:20'),
	(26,1,'2020-11-28 12:32:29','2020-11-28 10:32:03','2020-11-28 10:32:29'),
	(27,4,'2020-11-28 10:32:13','2020-11-28 09:32:12','2020-11-28 10:32:13'),
	(28,1,'2020-11-28 14:21:38','2020-11-28 14:21:33','2020-11-28 14:21:38'),
	(29,1,'2021-12-11 20:21:38','2021-12-11 08:21:38','2021-12-11 08:21:38');

/*!40000 ALTER TABLE `assistances` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla parameters
# ------------------------------------------------------------

DROP TABLE IF EXISTS `parameters`;

CREATE TABLE `parameters` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `parameters` WRITE;
/*!40000 ALTER TABLE `parameters` DISABLE KEYS */;

INSERT INTO `parameters` (`id`, `key`, `value`, `createdAt`, `updatedAt`)
VALUES
	(1,'HOURS_LATE','8',NULL,NULL);

/*!40000 ALTER TABLE `parameters` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cellphone` int(11) unsigned DEFAULT NULL,
  `rolId` int(11) unsigned DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rolId` (`rolId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `uid`, `name`, `cellphone`, `rolId`, `createdAt`, `updatedAt`, `deletedAt`)
VALUES
	(1,'b7726c4b','Juan David Restrepo',3222901435,1,'2020-11-20 00:00:00','2020-11-20 00:00:00',NULL),
	(4,'ea5a181','Daniela Garzon',3222901435,1,'2020-11-20 00:00:00','2020-11-20 00:00:00',NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
