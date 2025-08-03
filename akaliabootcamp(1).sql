-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-07-2025 a las 17:12:08
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `akaliabootcamp`
--
CREATE DATABASE IF NOT EXISTS `akaliabootcamp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `akaliabootcamp`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(100) NOT NULL,
  `imagenCategoria` varchar(500) NOT NULL,
  PRIMARY KEY (`idCategoria`),
  UNIQUE KEY `nombreCategoria` (`nombreCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombreCategoria`, `imagenCategoria`) VALUES
(1, 'Tejido', 'https://i.imgur.com/QbCSPmq.jpeg'),
(2, 'Cerámica y moldeado', 'https://i.imgur.com/S9oczxS.jpeg'),
(3, 'Pintura', 'https://i.imgur.com/Me39ave.jpeg'),
(4, 'Joyería y bisutería', 'https://i.imgur.com/72AFkew.jpeg'),
(5, 'Cuero y marroquinería', 'https://i.imgur.com/9EXOb5a.jpeg'),
(6, 'Madera y carpintería', 'https://i.imgur.com/sv06ys7.jpeg'),
(7, 'Papelería', 'https://i.imgur.com/9tUyIet.jpeg'),
(8, 'Velas, jabones y cosmética', 'https://i.imgur.com/XaKJqos.jpeg'),
(9, 'Textiles y costura', 'https://i.imgur.com/Hb1jVLT.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `emprendimiento`
--

DROP TABLE IF EXISTS `emprendimiento`;
CREATE TABLE IF NOT EXISTS `emprendimiento` (
  `idEmprendimiento` int(11) NOT NULL AUTO_INCREMENT,
  `idPersona` int(11) DEFAULT NULL,
  `nombreEmprendimiento` varchar(100) NOT NULL,
  `imagenLogo` varchar(255) DEFAULT NULL,
  `fechaRegistro` datetime DEFAULT current_timestamp(),
  `descripcionNegocio` text DEFAULT NULL,
  PRIMARY KEY (`idEmprendimiento`),
  KEY `fk02` (`idPersona`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `emprendimiento`
--

INSERT INTO `emprendimiento` (`idEmprendimiento`, `idPersona`, `nombreEmprendimiento`, `imagenLogo`, `fechaRegistro`, `descripcionNegocio`) VALUES
(1, 1, 'Artesanías Wayuu Express', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Bolsos y mochilas Wayuu hechas a mano en La Guajira.'),
(2, 2, 'Cerámica Rincón Antioqueño', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Objets decorativos de cerámica inspirados en la cultura paisa.'),
(3, 3, 'Joyería Filigrana de Mompox', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Joyas en filigrana delicadas elaboradas por artesanos de Mompox.'),
(4, 4, 'Fibras de Fique Natural', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Canastas y maceteros de fique tejidos artesanalmente.'),
(5, 5, 'Sombrero Vueltiao Authentico', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Sombreros vueltiaos originales de la costa Caribe colombiana.'),
(6, 6, 'Molas del Pacífico', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Coloridas molas hechas por comunidades indígenas del Pacífico.'),
(7, 7, 'Cestería Putumayo', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Cestas y artículos decorativos de palma del Putumayo.'),
(8, 8, 'Tallado en Madera Chocó', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Figuras y utensilios tallados en madera de la región del Chocó.'),
(9, 9, 'Ruanas de Boyacá', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Ruanas tejidas a mano con lana de oveja de alta calidad.'),
(10, 10, 'Muñecas de Trapo de la Sabana', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Muñecas tradicionales hechas a mano representando la cultura local.'),
(11, 11, 'Tejidos en Fique Huila', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Artículos en fique teñido y tejido por artesanos de Huila.'),
(12, 12, 'Bolsos en Cuero Tolima', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Bolsos de cuero genuino hechos en el Tolima.'),
(13, 13, 'Sombreros de Palmira', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Sombreros frescos de paja de la región del Valle del Cauca.'),
(14, 14, 'Cerámica Negra de Ráquira', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Cerámica negra tradicional de Ráquira, Boyacá.'),
(15, 15, 'Artesanías Tumaco', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Objetos decorativos con influencia afrocolombiana.'),
(16, 16, 'Dolls Afro del Caribe', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Muñecas con trajes típicos del Caribe colombiano.'),
(17, 17, 'Guadua Muebles Paisas', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Muebles en guadua elaborados en Antioquia.'),
(18, 18, 'Lacquer Pasto Original', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Arte en laca tradicional de Pasto.'),
(19, 19, 'Tapices Wayuu', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Tapices tejidos Wayuu de alta calidad.'),
(20, 19, 'Bisutería Wayuu', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Accesorios y bisutería con motivos Wayuu.'),
(21, 20, 'Sombreros Cartagena', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Sombreros playeros con estilo cartagenero.'),
(22, 20, 'Arte en Concha de Mar', '/img/imgs/157886928_10621828.jpg', '2025-07-21 15:54:46', 'Decoración hecha con conchas marinas de la costa.'),
(23, 20, 'Sandalias Playeritas', '/img/imgs/157886928_10621828.jpg', '2025-07-19 22:53:45', 'Se fabrican sandalia artesanales en cuero y tela, hechas a mano por personas talentosas'),
(24, 16, 'Tejidos amor', '/img/imgs/157886928_10621828.jpg', '2025-07-21 19:46:21', 'Tejidos que enamoran y hacen tus espacios mas bonitos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
CREATE TABLE IF NOT EXISTS `etiqueta` (
  `idEtiqueta` int(11) NOT NULL AUTO_INCREMENT,
  `nombreEtiqueta` varchar(100) NOT NULL,
  PRIMARY KEY (`idEtiqueta`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `etiqueta`
--

INSERT INTO `etiqueta` (`idEtiqueta`, `nombreEtiqueta`) VALUES
(1, 'crochet'),
(2, 'macramé'),
(3, 'amigurumi'),
(4, 'telar'),
(5, 'bordado'),
(6, 'punto de cruz'),
(7, 'hilo encerado'),
(8, 'tejido en dos agujas'),
(9, 'lanas naturales'),
(10, 'trapillo'),
(11, 'tejido de mesa'),
(12, 'mantas tejidas'),
(13, 'bufandas hechas a mano'),
(14, 'gorros tejidos'),
(15, 'ropa infantil tejida'),
(16, 'decoración con crochet'),
(17, 'posavasos tejidos'),
(18, 'tapices tejidos'),
(19, 'tejido artesanal'),
(20, 'tejido sostenible'),
(21, 'barro cocido'),
(22, 'cerámica esmaltada'),
(23, 'porcelana fría'),
(24, 'arcilla polimérica'),
(25, 'escultura cerámica'),
(26, 'modelado a mano'),
(27, 'vajilla artesanal'),
(28, 'tazas pintadas a mano'),
(29, 'macetas cerámicas'),
(30, 'figuras decorativas'),
(31, 'cerámica rústica'),
(32, 'azulejos pintados'),
(33, 'cerámica decorativa'),
(34, 'joyería cerámica'),
(35, 'platos de cerámica'),
(36, 'cuencos artesanales'),
(37, 'cerámica utilitaria'),
(38, 'porta incienso cerámico'),
(39, 'imanes de cerámica'),
(40, 'candelabros de arcilla'),
(41, 'pintura en madera'),
(42, 'pintura acrílica'),
(43, 'óleo sobre lienzo'),
(44, 'acuarela'),
(45, 'decoración pintada'),
(46, 'cuadros decorativos'),
(47, 'paisajes pinados'),
(48, 'retratos personalizados'),
(49, 'arte abstracto'),
(50, 'marcos decorados'),
(51, 'pintura sobre tela'),
(52, 'bandejas pintadas'),
(53, 'letreros decorativos'),
(54, 'portavasos pintados'),
(55, 'cajas decoradas'),
(56, 'mandalas'),
(57, 'ilustraciones originales'),
(58, 'arte en miniatura'),
(59, 'objetos reciclados pintados'),
(60, 'caligrafía artística'),
(61, 'bisutería artesanal'),
(62, 'collares'),
(63, 'pulseras'),
(64, 'aretes'),
(65, 'anillos'),
(66, 'accesorios de alambre'),
(67, 'cuentas y abalorios'),
(68, 'joyería macramé'),
(69, 'joyería de resina'),
(70, 'collares personalizados'),
(71, 'joyería con piedras'),
(72, 'aretes tejidos'),
(73, 'pulseras tejidas'),
(74, 'joyería bohemia'),
(75, 'chokers'),
(76, 'accesorios minimalistas'),
(77, 'joyería para niños'),
(78, 'dijes artesanales'),
(79, 'set de joyería'),
(80, 'joyería étnica'),
(81, 'marroquinería'),
(82, 'cuero artesanal'),
(83, 'billeteras'),
(84, 'llaveros de cuero'),
(85, 'cinturones'),
(86, 'mochilas de cuero'),
(87, 'monederos'),
(88, 'carteras de cuero'),
(89, 'funda para celular'),
(90, 'porta documentos'),
(91, 'cuadernos encuadernados'),
(92, 'grabado en cuero'),
(93, 'tallado en cuero'),
(94, 'estuches de cuero'),
(95, 'correas para cámara'),
(96, 'fundas para lentes'),
(97, 'cuero reciclado'),
(98, 'accesorios de escritorio en cuero'),
(99, 'cuero vegetal'),
(100, 'detalles en cuero'),
(101, 'papelería artesanal'),
(102, 'cuadernos'),
(103, 'libretas personalizadas'),
(104, 'stickers'),
(105, 'tarjetas de regalo'),
(106, 'scrapbooking'),
(107, 'hojas decoradas'),
(108, 'marcapáginas'),
(109, 'álbumes de fotos'),
(110, 'calendarios'),
(111, 'libros de notas'),
(112, 'papel reciclado'),
(113, 'tarjetas para ocasiones'),
(114, 'papelería escolar'),
(115, 'papelería minimalista'),
(116, 'diarios personales'),
(117, 'libros de dibujo'),
(118, 'packaging creativo'),
(119, 'agendas artesanales'),
(120, 'set de papelería'),
(121, 'velas artesanales'),
(122, 'jabones naturales'),
(123, 'cosmética sólida'),
(124, 'velas aromáticas'),
(125, 'velas decorativas'),
(126, 'velas ecológicas'),
(127, 'jabones de glicerina'),
(128, 'bálsamos labiales'),
(129, 'exfoliantes'),
(130, 'sales de baño'),
(131, 'cremas artesanales'),
(132, 'velas en frasco'),
(133, 'difusores'),
(134, 'aceites esenciales'),
(135, 'kits de spa'),
(136, 'ambientadores'),
(137, 'jabones exfoliantes'),
(138, 'velas pintadas'),
(139, 'velas personalizadas'),
(140, 'jabones para regalo'),
(141, 'ropa hecha a mano'),
(142, 'bolsos textiles'),
(143, 'neceseres'),
(144, 'manteles'),
(145, 'cojines'),
(146, 'delantales'),
(147, 'fundas decorativas'),
(148, 'accesorios textiles'),
(149, 'ropa para bebés'),
(150, 'ropa para mascotas'),
(151, 'retazos reciclados'),
(152, 'tapetes tejidos'),
(153, 'telas estampadas'),
(154, 'ropa sostenible'),
(155, 'pañuelos artesanales'),
(156, 'carteras textiles'),
(157, 'decoración textil'),
(158, 'patchwork'),
(159, 'bolsas ecológicas'),
(160, 'organizadores colgantes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenproducto`
--

DROP TABLE IF EXISTS `imagenproducto`;
CREATE TABLE IF NOT EXISTS `imagenproducto` (
  `idImagenProducto` int(11) NOT NULL AUTO_INCREMENT,
  `idProducto` int(11) DEFAULT NULL,
  `urlImagen` varchar(500) NOT NULL,
  PRIMARY KEY (`idImagenProducto`),
  KEY `fk05` (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=357 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenproducto`
--

INSERT INTO `imagenproducto` (`idImagenProducto`, `idProducto`, `urlImagen`) VALUES
(1, 3, 'https://agathabydr.com/cdn/shop/files/IMG_8977_2ccca8ae-ce96-4319-ae0b-65c82f1a6179.jpg?v=1719276256'),
(2, 3, 'https://agathabydr.com/cdn/shop/files/IMG_8977_2ccca8ae-ce96-4319-ae0b-65c82f1a6179.jpg?v=1719276256'),
(3, 3, 'https://agathabydr.com/cdn/shop/files/IMG_8977_2ccca8ae-ce96-4319-ae0b-65c82f1a6179.jpg?v=1719276256'),
(4, 3, 'https://castellanoeo.com.co/cdn/shop/files/castellanowayuusetpulserasx3.jpg?v=1718658997'),
(5, 1, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(6, 1, 'https://i.imgur.com/rFca2BV.jpeg'),
(7, 1, 'https://i.imgur.com/aWqsCTo.jpeg'),
(8, 2, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(9, 2, 'https://i.imgur.com/rFca2BV.jpeg'),
(10, 2, 'https://i.imgur.com/aWqsCTo.jpeg'),
(11, 4, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(12, 4, 'https://i.imgur.com/rFca2BV.jpeg'),
(13, 4, 'https://i.imgur.com/aWqsCTo.jpeg'),
(14, 5, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(15, 5, 'https://i.imgur.com/rFca2BV.jpeg'),
(16, 5, 'https://i.imgur.com/aWqsCTo.jpeg'),
(17, 6, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(18, 6, 'https://i.imgur.com/rFca2BV.jpeg'),
(19, 6, 'https://i.imgur.com/aWqsCTo.jpeg'),
(20, 7, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(21, 7, 'https://i.imgur.com/rFca2BV.jpeg'),
(22, 7, 'https://i.imgur.com/aWqsCTo.jpeg'),
(23, 8, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(24, 8, 'https://i.imgur.com/rFca2BV.jpeg'),
(25, 8, 'https://i.imgur.com/aWqsCTo.jpeg'),
(26, 9, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(27, 9, 'https://i.imgur.com/rFca2BV.jpeg'),
(28, 9, 'https://i.imgur.com/aWqsCTo.jpeg'),
(29, 10, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(30, 10, 'https://i.imgur.com/rFca2BV.jpeg'),
(31, 10, 'https://i.imgur.com/aWqsCTo.jpeg'),
(32, 11, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(33, 11, 'https://i.imgur.com/rFca2BV.jpeg'),
(34, 11, 'https://i.imgur.com/aWqsCTo.jpeg'),
(35, 12, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(36, 12, 'https://i.imgur.com/rFca2BV.jpeg'),
(37, 12, 'https://i.imgur.com/aWqsCTo.jpeg'),
(38, 13, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(39, 13, 'https://i.imgur.com/rFca2BV.jpeg'),
(40, 13, 'https://i.imgur.com/aWqsCTo.jpeg'),
(41, 14, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(42, 14, 'https://i.imgur.com/rFca2BV.jpeg'),
(43, 14, 'https://i.imgur.com/aWqsCTo.jpeg'),
(44, 15, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(45, 15, 'https://i.imgur.com/rFca2BV.jpeg'),
(46, 15, 'https://i.imgur.com/aWqsCTo.jpeg'),
(47, 16, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(48, 16, 'https://i.imgur.com/rFca2BV.jpeg'),
(49, 16, 'https://i.imgur.com/aWqsCTo.jpeg'),
(50, 17, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(51, 17, 'https://i.imgur.com/rFca2BV.jpeg'),
(52, 17, 'https://i.imgur.com/aWqsCTo.jpeg'),
(53, 18, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(54, 18, 'https://i.imgur.com/rFca2BV.jpeg'),
(55, 18, 'https://i.imgur.com/aWqsCTo.jpeg'),
(56, 19, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(57, 19, 'https://i.imgur.com/rFca2BV.jpeg'),
(58, 19, 'https://i.imgur.com/aWqsCTo.jpeg'),
(59, 20, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(60, 20, 'https://i.imgur.com/rFca2BV.jpeg'),
(61, 20, 'https://i.imgur.com/aWqsCTo.jpeg'),
(62, 21, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(63, 21, 'https://i.imgur.com/rFca2BV.jpeg'),
(64, 21, 'https://i.imgur.com/aWqsCTo.jpeg'),
(65, 22, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(66, 22, 'https://i.imgur.com/rFca2BV.jpeg'),
(67, 22, 'https://i.imgur.com/aWqsCTo.jpeg'),
(68, 23, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(69, 23, 'https://i.imgur.com/rFca2BV.jpeg'),
(70, 23, 'https://i.imgur.com/aWqsCTo.jpeg'),
(71, 24, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(72, 24, 'https://i.imgur.com/rFca2BV.jpeg'),
(73, 24, 'https://i.imgur.com/aWqsCTo.jpeg'),
(74, 26, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(75, 25, 'https://i.imgur.com/rFca2BV.jpeg'),
(76, 25, 'https://i.imgur.com/aWqsCTo.jpeg'),
(77, 25, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(78, 26, 'https://i.imgur.com/rFca2BV.jpeg'),
(79, 26, 'https://i.imgur.com/aWqsCTo.jpeg'),
(80, 27, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(81, 27, 'https://i.imgur.com/rFca2BV.jpeg'),
(82, 27, 'https://i.imgur.com/aWqsCTo.jpeg'),
(252, 28, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(253, 28, 'https://i.imgur.com/rFca2BV.jpeg'),
(254, 28, 'https://i.imgur.com/aWqsCTo.jpeg'),
(255, 29, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(256, 29, 'https://i.imgur.com/rFca2BV.jpeg'),
(257, 29, 'https://i.imgur.com/aWqsCTo.jpeg'),
(258, 30, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(259, 30, 'https://i.imgur.com/rFca2BV.jpeg'),
(260, 30, 'https://i.imgur.com/aWqsCTo.jpeg'),
(261, 31, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(262, 31, 'https://i.imgur.com/rFca2BV.jpeg'),
(263, 31, 'https://i.imgur.com/aWqsCTo.jpeg'),
(264, 32, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(265, 32, 'https://i.imgur.com/rFca2BV.jpeg'),
(266, 32, 'https://i.imgur.com/aWqsCTo.jpeg'),
(267, 33, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(268, 33, 'https://i.imgur.com/rFca2BV.jpeg'),
(269, 33, 'https://i.imgur.com/aWqsCTo.jpeg'),
(270, 34, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(271, 34, 'https://i.imgur.com/rFca2BV.jpeg'),
(272, 34, 'https://i.imgur.com/aWqsCTo.jpeg'),
(273, 35, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(274, 35, 'https://i.imgur.com/rFca2BV.jpeg'),
(275, 35, 'https://i.imgur.com/aWqsCTo.jpeg'),
(276, 36, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(277, 36, 'https://i.imgur.com/rFca2BV.jpeg'),
(278, 36, 'https://i.imgur.com/aWqsCTo.jpeg'),
(279, 37, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(280, 37, 'https://i.imgur.com/rFca2BV.jpeg'),
(281, 37, 'https://i.imgur.com/aWqsCTo.jpeg'),
(282, 38, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(283, 38, 'https://i.imgur.com/rFca2BV.jpeg'),
(284, 38, 'https://i.imgur.com/aWqsCTo.jpeg'),
(285, 39, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(286, 39, 'https://i.imgur.com/rFca2BV.jpeg'),
(287, 39, 'https://i.imgur.com/aWqsCTo.jpeg'),
(288, 40, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(289, 40, 'https://i.imgur.com/rFca2BV.jpeg'),
(290, 40, 'https://i.imgur.com/aWqsCTo.jpeg'),
(306, 41, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(307, 41, 'https://i.imgur.com/rFca2BV.jpeg'),
(308, 41, 'https://i.imgur.com/aWqsCTo.jpeg'),
(330, 42, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(331, 42, 'https://i.imgur.com/rFca2BV.jpeg'),
(332, 42, 'https://i.imgur.com/aWqsCTo.jpeg'),
(333, 42, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(334, 42, 'https://i.imgur.com/rFca2BV.jpeg'),
(335, 42, 'https://i.imgur.com/aWqsCTo.jpeg'),
(336, 42, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(337, 42, 'https://i.imgur.com/rFca2BV.jpeg'),
(338, 42, 'https://i.imgur.com/aWqsCTo.jpeg'),
(339, 43, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(340, 43, 'https://i.imgur.com/rFca2BV.jpeg'),
(341, 43, 'https://i.imgur.com/aWqsCTo.jpeg'),
(351, 43, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(352, 43, 'https://i.imgur.com/rFca2BV.jpeg'),
(353, 43, 'https://i.imgur.com/aWqsCTo.jpeg'),
(354, 45, 'https://i.imgur.com/Pr9TV1W.jpeg'),
(355, 45, 'https://i.imgur.com/rFca2BV.jpeg'),
(356, 45, 'https://i.imgur.com/aWqsCTo.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `idEmprendimiento` int(11) DEFAULT NULL,
  `tituloProducto` varchar(100) NOT NULL,
  `descripcionProducto` text NOT NULL,
  `precio` int(10) UNSIGNED NOT NULL,
  `fechaPublicacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`idProducto`),
  KEY `fk04` (`idEmprendimiento`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `idEmprendimiento`, `tituloProducto`, `descripcionProducto`, `precio`, `fechaPublicacion`) VALUES
(1, 1, 'Sombrero Vueltiao', 'Sombrero tradicional hecho a mano por artesanos de la región de Córdoba. Tejido con caña flecha.', 85000, '2025-07-21 16:03:08'),
(2, 2, 'Mochila Arhuaca', 'Mochila de lana natural tejida por mujeres indígenas Arhuacas en la Sierra Nevada de Santa Marta.', 95000, '2025-07-21 16:03:08'),
(3, 3, 'Pulsera Wayuu', 'Colorida pulsera tejida con diseños geométricos por la comunidad Wayuu.', 25000, '2025-07-21 16:03:08'),
(4, 4, 'Jarrón de Ráquira', 'Jarrón de barro cocido, decorado con motivos precolombinos. Hecho en Boyacá.', 32000, '2025-07-21 16:03:08'),
(5, 5, 'Hamaca Guajira', 'Hamaca tejida a mano por artesanos guajiros. Ideal para el descanso.', 120000, '2025-07-21 16:03:08'),
(6, 6, 'Collar de Tagua', 'Collar hecho con semillas de tagua talladas y teñidas a mano.', 40000, '2025-07-21 16:03:08'),
(7, 7, 'Cinturón de Cuero', 'Cinturón artesanal de cuero grabado con símbolos ancestrales.', 60000, '2025-07-21 16:03:08'),
(8, 8, 'Escultura Zenú', 'Figura decorativa hecha con palma de iraca por artesanos Zenú.', 55000, '2025-07-21 16:03:08'),
(9, 9, 'Aretes de Mostacilla', 'Aretes con patrones indígenas, hechos con mostacillas de colores vivos.', 18000, '2025-07-21 16:03:08'),
(10, 10, 'Camino de Mesa Wayuu', 'Decoración textil tejida por artesanas Wayuu con figuras abstractas.', 78000, '2025-07-21 16:03:08'),
(11, 11, 'Caja Tallada en Madera', 'Caja multiuso elaborada en madera de cedro, tallada a mano.', 45000, '2025-07-21 16:03:08'),
(12, 12, 'Bolso de Palma Iraca', 'Bolso tejido con palma iraca en Usiacurí, Atlántico. Resistente y elegante.', 68000, '2025-07-21 16:03:08'),
(13, 4, 'Sombrero ', 'Sombrero tejido con hoja de caña', 40000, '2025-07-21 16:03:08'),
(14, 14, 'Taza de Cerámica Negra', 'Taza artesanal con acabado rústico, hecha en La Chamba, Tolima.', 21000, '2025-07-21 16:03:08'),
(15, 15, 'Llaveros Tejidos', 'Set de llaveros miniatura con formas de animales típicos colombianos.', 12000, '2025-07-21 16:03:08'),
(16, 16, 'Alfombra Wayuu', 'Alfombra tejida a mano con motivos geométricos tradicionales.', 135000, '2025-07-21 16:03:08'),
(17, 17, 'Zarcillos de Filigrana', 'Zarcillos delicados hechos en filigrana de plata por joyeros de Mompox.', 95000, '2025-07-21 16:03:08'),
(18, 18, 'Máscara Carnaval de Barranquilla', 'Máscara decorativa pintada a mano, ideal para coleccionistas.', 33000, '2025-07-21 16:03:08'),
(19, 19, 'Servilleteros de Totumo', 'Set de servilleteros elaborados con cáscara de totumo pintado.', 28000, '2025-07-21 16:03:08'),
(20, 20, 'Camisa Bordada', 'Camisa de lino bordada con flores típicas de la región cafetera.', 105000, '2025-07-21 16:03:08'),
(21, 21, 'Maceta Vallecaucana', 'Maceta de azúcar típica del Valle, decorativa y tradicional.', 22000, '2025-07-21 16:03:08'),
(22, 22, 'Tapabocas Artesanal', 'Tapabocas de tela con bordados tradicionales de Boyacá.', 15000, '2025-07-21 16:03:08'),
(23, 5, 'Vela aroma lavanda', 'Vela artesanal hecha a mano con flores y aroma a lavanda', 48000, '2025-07-21 16:03:08'),
(24, 2, 'Aretes Zenú', 'Aretes tejidos con palma de iraca en espiral. Livianos y coloridos.', 19000, '2025-07-21 16:03:08'),
(25, 3, 'Candelabro de Totumo', 'Candelabro artesanal tallado con motivos florales.', 36000, '2025-07-21 16:03:08'),
(26, 4, 'Cuenco en Barro Cocido', 'Cuenco utilitario hecho a mano con barro de Ráquira.', 27000, '2025-07-21 16:03:08'),
(27, 5, 'Billetera en Cuero Artesanal', 'Billetera con grabados manuales y costura reforzada.', 43000, '2025-07-21 16:03:08'),
(28, 6, 'Poncho de Lana', 'Poncho típico del altiplano cundiboyacense, tejido en telar manual.', 118000, '2025-07-21 16:03:08'),
(29, 7, 'Bolsa Ecológica Estampada', 'Bolsa de tela con estampado de fauna colombiana.', 25000, '2025-07-21 16:03:08'),
(30, 8, 'Repujado en Cuero', 'Cuadro decorativo con repujado artesanal en cuero.', 62000, '2025-07-21 16:03:08'),
(31, 9, 'Atrapasueños Wayuu', 'Atrapasueños tejido a mano con hilos de colores y cuentas.', 28000, '2025-07-21 16:03:08'),
(32, 10, 'Títere de Animales Andinos', 'Títeres de mano en tela con diseños de animales colombianos.', 16000, '2025-07-21 16:03:08'),
(33, 11, 'Collar de Mostacilla', 'Collar multicolor con diseño circular tradicional.', 39000, '2025-07-21 16:03:08'),
(34, 12, 'Florero en Cerámica', 'Florero rústico pintado a mano con esmalte mate.', 34000, '2025-07-21 16:03:08'),
(35, 13, 'Juego de Café Artesanal', 'Juego de tazas con ilustraciones hechas a mano.', 98000, '2025-07-21 16:03:08'),
(36, 14, 'Cintillo de Lana', 'Cintillo con tejido grueso ideal para climas fríos.', 22000, '2025-07-21 16:03:08'),
(37, 15, 'Marco de Fotos Tallado', 'Marco en madera tallada con figuras de fauna nacional.', 47000, '2025-07-21 16:03:08'),
(38, 16, 'Camiseta Pintada a Mano', 'Camiseta blanca con diseño pintado en técnica libre.', 52000, '2025-07-21 16:03:08'),
(39, 17, 'Cartera Tejida con Cintas', 'Cartera de mano con patrón de tejido en cintas recicladas.', 38000, '2025-07-21 16:03:08'),
(40, 18, 'Colgante de Semillas', 'Collar hecho con semillas amazónicas barnizadas.', 29000, '2025-07-21 16:03:08'),
(41, 19, 'Cuadro de Tejido en Lana', 'Cuadro decorativo hecho con telar artesanal.', 57000, '2025-07-21 16:03:08'),
(42, 20, 'Canasto de Palma', 'Canasto multiusos tejido a mano en palma de iraca.', 32000, '2025-07-21 16:03:08'),
(43, 21, 'Pantuflas de Lana', 'Pantuflas cómodas tejidas en lana 100% natural.', 39000, '2025-07-21 16:03:08'),
(45, 1, 'Amigurumi personalizado', 'Tejido estilo amigurumi de mascota', 25000, '2025-07-21 17:16:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productocategoria`
--

DROP TABLE IF EXISTS `productocategoria`;
CREATE TABLE IF NOT EXISTS `productocategoria` (
  `idProductoCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `idProducto` int(11) DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProductoCategoria`),
  KEY `fk06` (`idProducto`),
  KEY `fk07` (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productocategoria`
--

INSERT INTO `productocategoria` (`idProductoCategoria`, `idProducto`, `idCategoria`) VALUES
(1, 1, 1),
(2, 45, 4),
(3, 2, 7),
(4, 24, 4),
(5, 3, 8),
(6, 25, 1),
(7, 4, 6),
(8, 13, 8),
(9, 26, 3),
(10, 5, 7),
(11, 23, 2),
(12, 27, 3),
(13, 6, 2),
(14, 28, 1),
(15, 7, 6),
(16, 29, 9),
(17, 8, 9),
(18, 30, 7),
(19, 9, 7),
(20, 31, 4),
(21, 10, 9),
(22, 32, 7),
(23, 11, 4),
(24, 33, 1),
(25, 12, 2),
(26, 34, 7),
(27, 35, 7),
(28, 14, 8),
(29, 36, 9),
(30, 15, 3),
(31, 37, 6),
(32, 16, 2),
(33, 38, 2),
(34, 17, 2),
(35, 39, 4),
(36, 18, 6),
(37, 40, 7),
(38, 19, 6),
(39, 41, 1),
(40, 20, 5),
(41, 42, 3),
(42, 21, 7),
(43, 43, 8),
(44, 22, 8),
(64, 1, 7),
(65, 45, 5),
(66, 2, 3),
(67, 24, 8),
(68, 3, 4),
(69, 25, 6),
(70, 4, 8),
(71, 13, 2),
(72, 26, 5),
(73, 5, 8),
(74, 23, 8),
(75, 27, 8),
(76, 6, 4),
(77, 28, 4),
(78, 7, 6),
(79, 29, 2),
(80, 8, 9),
(81, 30, 4),
(82, 9, 2),
(83, 31, 5),
(84, 10, 8),
(85, 32, 9),
(86, 11, 1),
(87, 33, 3),
(88, 12, 3),
(89, 34, 8),
(90, 35, 1),
(91, 14, 7),
(92, 36, 7),
(93, 15, 1),
(94, 37, 5),
(95, 16, 1),
(96, 38, 1),
(97, 17, 7),
(98, 39, 7),
(99, 18, 6),
(100, 40, 5),
(101, 19, 9),
(102, 41, 2),
(103, 20, 9),
(104, 42, 4),
(105, 21, 1),
(106, 43, 1),
(107, 22, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productoetiqueta`
--

DROP TABLE IF EXISTS `productoetiqueta`;
CREATE TABLE IF NOT EXISTS `productoetiqueta` (
  `idProductoEtiqueta` int(11) NOT NULL AUTO_INCREMENT,
  `idEtiqueta` int(11) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProductoEtiqueta`),
  KEY `fk11` (`idEtiqueta`),
  KEY `fk12` (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productoetiqueta`
--

INSERT INTO `productoetiqueta` (`idProductoEtiqueta`, `idEtiqueta`, `idProducto`) VALUES
(97, 12, 1),
(98, 84, 1),
(99, 5, 1),
(100, 43, 2),
(101, 88, 2),
(102, 16, 2),
(103, 127, 2),
(104, 13, 3),
(105, 90, 3),
(106, 44, 3),
(107, 101, 3),
(108, 23, 4),
(109, 65, 4),
(110, 34, 4),
(111, 109, 5),
(112, 18, 5),
(113, 150, 5),
(114, 12, 5),
(115, 37, 6),
(116, 122, 6),
(117, 75, 6),
(118, 28, 7),
(119, 134, 7),
(120, 95, 7),
(121, 48, 8),
(122, 3, 8),
(123, 101, 8),
(124, 154, 8),
(125, 67, 9),
(126, 14, 9),
(127, 98, 9),
(128, 36, 9),
(129, 19, 10),
(130, 76, 10),
(131, 25, 10),
(132, 60, 11),
(133, 7, 11),
(134, 89, 11),
(135, 139, 11),
(136, 117, 12),
(137, 66, 12),
(138, 132, 12),
(139, 38, 13),
(140, 53, 13),
(141, 128, 13),
(142, 11, 14),
(143, 87, 14),
(144, 40, 14),
(145, 154, 14),
(146, 31, 15),
(147, 143, 15),
(148, 99, 15),
(149, 6, 16),
(150, 55, 16),
(151, 135, 16),
(152, 24, 17),
(153, 45, 17),
(154, 113, 17),
(155, 159, 17),
(156, 77, 18),
(157, 100, 18),
(158, 12, 18),
(159, 50, 19),
(160, 93, 19),
(161, 144, 19),
(162, 22, 20),
(163, 79, 20),
(164, 35, 20),
(165, 111, 20),
(166, 2, 21),
(167, 30, 21),
(168, 120, 21),
(169, 126, 22),
(170, 64, 22),
(171, 91, 22),
(172, 149, 22),
(173, 10, 23),
(174, 57, 23),
(175, 85, 23),
(176, 124, 24),
(177, 52, 24),
(178, 141, 24),
(179, 98, 24),
(180, 9, 25),
(181, 43, 25),
(182, 133, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `redsocial`
--

DROP TABLE IF EXISTS `redsocial`;
CREATE TABLE IF NOT EXISTS `redsocial` (
  `idRedSocial` int(11) NOT NULL AUTO_INCREMENT,
  `idEmprendimiento` int(11) NOT NULL,
  `nombreRedSocial` varchar(50) NOT NULL,
  `url` varchar(500) NOT NULL,
  PRIMARY KEY (`idRedSocial`),
  UNIQUE KEY `uq_empr_red` (`idEmprendimiento`,`nombreRedSocial`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `redsocial`
--

INSERT INTO `redsocial` (`idRedSocial`, `idEmprendimiento`, `nombreRedSocial`, `url`) VALUES
(1, 1, 'facebook', 'https://facebook.com/artesaniaswayuuexpress'),
(2, 2, 'instagram', 'https://instagram.com/ceramicarinconantioqueno'),
(3, 3, 'whatsapp', 'https://wa.me/3001000003'),
(4, 4, 'facebook', 'https://facebook.com/fibrasdefiquenatural'),
(5, 5, 'instagram', 'https://instagram.com/sombrerovueltiaoauthentico'),
(6, 6, 'facebook', 'https://facebook.com/molasdelpacifico'),
(7, 7, 'whatsapp', 'https://wa.me/3001000007'),
(8, 8, 'instagram', 'https://instagram.com/talladoenmaderachoco'),
(9, 9, 'facebook', 'https://facebook.com/ruanasdeboyaca'),
(10, 10, 'whatsapp', 'https://wa.me/3001000010'),
(11, 11, 'instagram', 'https://instagram.com/tejidosenfiquehuila'),
(12, 12, 'facebook', 'https://facebook.com/bolsosencuerotolima'),
(13, 13, 'whatsapp', 'https://wa.me/3001000013'),
(14, 14, 'instagram', 'https://instagram.com/ceramicanegraqueraquira'),
(15, 15, 'facebook', 'https://facebook.com/artesaniastumaco'),
(16, 16, 'instagram', 'https://instagram.com/dollsafrodelcaribe'),
(17, 17, 'facebook', 'https://facebook.com/guaduamueblespaisas'),
(18, 18, 'whatsapp', 'https://wa.me/3001000018'),
(19, 19, 'facebook', 'https://facebook.com/tapiceswayuu'),
(20, 20, 'instagram', 'https://instagram.com/bisuteriawayuu'),
(21, 21, 'facebook', 'https://facebook.com/sombreroscartagena'),
(22, 22, 'whatsapp', 'https://wa.me/3001000022'),
(23, 23, 'instagram', 'https://instagram.com/sandaliasplayeritas'),
(24, 24, 'facebook', 'https://facebook.com/tejidosamor'),
(25, 4, 'instagram', 'instagram.com/fibrasdefiquenatural');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `idPersona` int(11) NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(100) NOT NULL,
  `apellidoUsuario` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `fechaRegistro` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`idPersona`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idPersona`, `nombreUsuario`, `apellidoUsuario`, `email`, `contrasena`, `telefono`, `fechaRegistro`) VALUES
(1, 'Vanessa', 'Ramirez', 'vane12@example.com', 'supercontraseña124', '3013983589', '2025-07-21 15:06:55'),
(2, 'Carlos', 'Martínez', 'carlos@example.com', 'admin123', '3109876543', '2025-07-21 15:06:55'),
(3, 'Daniela', 'Gómez', 'daniela@example.com', 'daniela456', '3111234567', '2025-07-21 15:06:55'),
(4, 'Andrés', 'Lopez', 'andres@example.com', 'andres789', '3124567890', '2025-07-21 15:06:55'),
(5, 'María', 'Torres', 'maria@example.com', 'maria321', '3005551234', '2025-07-21 15:06:55'),
(6, 'Sofía', 'Ramírez', 'sofia@example.com', 'sofia654', '3156789012', '2025-07-21 15:06:55'),
(7, 'Sebastián', 'Ruiz', 'sebastian@example.com', 'sebas159', '3208765432', '2025-07-21 15:06:55'),
(8, 'Camila', 'Toro', 'camila@example.com', 'camila741', '3137654321', '2025-07-21 15:06:55'),
(9, 'Felipe', 'Moreno', 'felipe@example.com', 'felipe963', '3146549870', '2025-07-21 15:06:55'),
(10, 'Valentina', 'Ruiz', 'valentina@example.com', 'vale258', '3163456789', '2025-07-21 15:06:55'),
(11, 'Miguel', 'Castro', 'miguel@example.com', 'miguel852', '3011122334', '2025-07-21 15:06:55'),
(12, 'Paula', 'López', 'paula@example.com', 'paula753', '3173344556', '2025-07-21 15:06:55'),
(13, 'David', 'Reyes', 'david@example.com', 'david159', '3182233445', '2025-07-21 15:06:55'),
(14, 'Natalia', 'Acosta', 'natalia@example.com', 'natalia357', '3199988776', '2025-07-21 15:06:55'),
(15, 'Julián', 'Vargas', 'julian@example.com', 'julian456', '3223344556', '2025-07-21 15:06:55'),
(16, 'Angélica', 'Ortiz', 'angelica@example.com', 'angelica147', '3231122334', '2025-07-21 15:06:55'),
(17, 'Lucía', 'Mejía', 'lucia@example.com', 'lucia789', '3246677889', '2025-07-21 15:06:55'),
(18, 'Esteban', 'Salazar', 'esteban@example.com', 'esteban951', '3255566778', '2025-07-21 15:06:55'),
(19, 'Isabela', 'Pérez', 'isabela@example.com', 'isabela852', '3264455667', '2025-07-21 15:06:55'),
(20, 'Tomás', 'Gutiérrez', 'tomas@example.com', 'tomas753', '3273344552', '2025-07-21 15:06:55'),
(21, 'Juan', 'Rendón', 'juanrend@example.com', 'juanrendon12345', '3145879547', '2025-07-21 20:25:07'),
(27, 'Diego', 'Alvarez', 'daegoudea@gmail.com', '12345678', NULL, '2025-07-27 12:56:45'),
(28, 'xio', 'gar', 'xiogarcia98@hotmail.com', '0987654321', NULL, '2025-07-27 13:09:32'),
(29, 'xio', 'gar', 'xiogr98@gmail.com', '12345678', NULL, '2025-07-27 13:12:07'),
(30, 'Paulina', 'Fernandez', 'fpaulina545@gmail.com', '12345678', NULL, '2025-07-27 13:16:49');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria` ADD FULLTEXT KEY `nombreCategoria_2` (`nombreCategoria`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `emprendimiento`
--
ALTER TABLE `emprendimiento`
  ADD CONSTRAINT `fk02` FOREIGN KEY (`idPersona`) REFERENCES `usuario` (`idPersona`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `imagenproducto`
--
ALTER TABLE `imagenproducto`
  ADD CONSTRAINT `fk05` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk04` FOREIGN KEY (`idEmprendimiento`) REFERENCES `emprendimiento` (`idEmprendimiento`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `productocategoria`
--
ALTER TABLE `productocategoria`
  ADD CONSTRAINT `fk06` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk07` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `productoetiqueta`
--
ALTER TABLE `productoetiqueta`
  ADD CONSTRAINT `fk11` FOREIGN KEY (`idEtiqueta`) REFERENCES `etiqueta` (`idEtiqueta`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk12` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `redsocial`
--
ALTER TABLE `redsocial`
  ADD CONSTRAINT `fk03` FOREIGN KEY (`idEmprendimiento`) REFERENCES `emprendimiento` (`idEmprendimiento`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
