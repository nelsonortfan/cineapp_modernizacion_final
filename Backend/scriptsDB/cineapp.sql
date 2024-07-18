-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: cineapp
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Banners`
--

DROP TABLE IF EXISTS `Banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `fecha` date NOT NULL,
  `archivo` varchar(250) NOT NULL,
  `estatus` enum('Activo','Inactivo') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banners`
--

LOCK TABLES `Banners` WRITE;
/*!40000 ALTER TABLE `Banners` DISABLE KEYS */;
/*!40000 ALTER TABLE `Banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Detalles`
--

DROP TABLE IF EXISTS `Detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Detalles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `director` varchar(100) DEFAULT NULL,
  `actores` varchar(255) DEFAULT NULL,
  `sinopsis` text,
  `trailer` varchar(255) DEFAULT NULL COMMENT 'URL del video en Youtube\n',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Detalles`
--

LOCK TABLES `Detalles` WRITE;
/*!40000 ALTER TABLE `Detalles` DISABLE KEYS */;
/*!40000 ALTER TABLE `Detalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Horarios`
--

DROP TABLE IF EXISTS `Horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Horarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `sala` varchar(100) NOT NULL,
  `precio` double NOT NULL DEFAULT '0',
  `idPelicula` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Horarios_Peliculas1_idx` (`idPelicula`),
  CONSTRAINT `fk_Horarios_Peliculas1` FOREIGN KEY (`idPelicula`) REFERENCES `Peliculas` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Horarios`
--

LOCK TABLES `Horarios` WRITE;
/*!40000 ALTER TABLE `Horarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Horarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Noticias`
--

DROP TABLE IF EXISTS `Noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Noticias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `fecha` date NOT NULL,
  `detalle` text NOT NULL,
  `estatus` enum('Activa','Inactiva') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Noticias`
--

LOCK TABLES `Noticias` WRITE;
/*!40000 ALTER TABLE `Noticias` DISABLE KEYS */;
/*!40000 ALTER TABLE `Noticias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Peliculas`
--

DROP TABLE IF EXISTS `Peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Peliculas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `duracion` int(11) NOT NULL,
  `clasificacion` enum('A','B','C') NOT NULL,
  `genero` varchar(45) NOT NULL,
  `imagen` varchar(200) DEFAULT NULL,
  `fecha_estreno` date NOT NULL,
  `estatus` enum('Activa','Inactiva') NOT NULL DEFAULT 'Activa',
  `id_detalle` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Peliculas_Detalles1_idx` (`id_detalle`),
  CONSTRAINT `fk_Peliculas_Detalles1` FOREIGN KEY (`id_detalle`) REFERENCES `Detalles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Peliculas`
--

LOCK TABLES `Peliculas` WRITE;
/*!40000 ALTER TABLE `Peliculas` DISABLE KEYS */;
/*!40000 ALTER TABLE `Peliculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UsuarioPerfil`
--

DROP TABLE IF EXISTS `UsuarioPerfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UsuarioPerfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `perfil` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Usuarios_Perfil1` (`username`),
  CONSTRAINT `fk_Usuarios_Perfil1` FOREIGN KEY (`username`) REFERENCES `Usuarios` (`username`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UsuarioPerfil`
--

LOCK TABLES `UsuarioPerfil` WRITE;
/*!40000 ALTER TABLE `UsuarioPerfil` DISABLE KEYS */;
/*!40000 ALTER TABLE `UsuarioPerfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-06  9:50:50
