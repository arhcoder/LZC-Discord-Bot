-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-05-2022 a las 05:00:30
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lzc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `achievements`
--

CREATE TABLE `achievements` (
  `id` varchar(4) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `icon` varchar(20) NOT NULL,
  `value` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `achievements`
--

INSERT INTO `achievements` (`id`, `name`, `description`, `icon`, `value`) VALUES
('A01', '¡Dibuja lo que te digo!', 'Te aceptaron una propuesta en viernes de request', '', 444),
('A02', 'No necesito dormir', 'Participaste en una pijamada', '', 466),
('A03', 'Cinéfilo de corazón', 'Viste cinco películas en el cine de Primera Estación', '', 688),
('A04', 'Miembro LZC', 'Participaste en alguna dinámica', '', 222),
('A05', 'Artista colorido', 'Hiciste un dibujo para LZColors', '', 556),
('A06', 'Artista MUY colorido', 'Participaste por lo menos con cinco dibujos en LZColors', '', 888),
('B01', 'Miembro clase D', 'Llegaste a nivel #10', '', 100),
('B02', 'Miembro clase C', 'Llegaste a nivel #20', '', 200),
('B03', 'Miembro clase B', 'Llegaste a nivel #40', '', 400),
('B04', 'Miembro clase A', 'Llegaste a nivel #60', '', 600),
('B05', 'Miembro del CONSEJO 05', 'Llegaste a nivel #80', '', 800),
('B06', 'SOBERANO PRESIDENTE', 'Llegaste a nivel #100', '', 1000),
('C01', 'Cartoonero', 'Mandaste 50 mensajes en #Cartoons', '', 144),
('C02', 'Otaku', 'Mandaste 200 mensajes en #Anime', '', 244),
('C03', 'Memero', 'Mandaste 100 mensajes en #Memes y #Shitposting', '', 388),
('C04', 'Spamero', 'Mandaste 500 mensajes en #EmojiSpam', '', 556),
('C05', 'Culto', 'Mandaste 1000 mensajes en #CulturaPop', '', 777),
('C06', 'Callado', 'Mandaste 2000 mensajes en #Antivoz', '', 882),
('C07', 'Escritor', 'Mandaste 4000 mensajes en #Antivoz', '', 1000),
('C08', 'El programador te quiere <3', 'Usaste 444 comandos del LZC Bot', '', 1000),
('D01', 'Artista competitivo', 'Participaste en un V.S', '', 422),
('D02', 'Artista profesional', 'Fuiste finalista en un V.S', '', 744),
('D03', 'Artista lider', 'Ganaste una edición de V.S', '', 880),
('D04', 'Artista veterano', 'Participaste en por lo menos cinco V.S', '', 934),
('D05', 'Artista invicto', 'Fuiste finalista en al menos cinco V.S', '', 1000),
('D06', 'Artista REY', 'Ganaste un V.S All Stars', '', 1000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `members`
--

CREATE TABLE `members` (
  `id` varchar(20) NOT NULL,
  `achievements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`achievements`)),
  `lzcpoints` int(8) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `memberID` varchar(20) NOT NULL,
  `cartoon` int(8) NOT NULL DEFAULT 0,
  `anime` int(8) NOT NULL DEFAULT 0,
  `memes` int(8) NOT NULL DEFAULT 0,
  `emojis` int(8) NOT NULL DEFAULT 0,
  `pop` int(8) NOT NULL DEFAULT 0,
  `lzgeneral` int(8) NOT NULL DEFAULT 0,
  `antivoz` int(8) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stats`
--

CREATE TABLE `stats` (
  `memberID` varchar(20) NOT NULL,
  `vsparticipations` int(4) NOT NULL DEFAULT 0,
  `vsfinalist` int(4) NOT NULL DEFAULT 0,
  `vsallstars` int(4) NOT NULL DEFAULT 0,
  `vswins` int(4) NOT NULL DEFAULT 0,
  `colors` int(4) NOT NULL DEFAULT 0,
  `requests` int(4) NOT NULL DEFAULT 0,
  `sleepovers` int(4) NOT NULL DEFAULT 0,
  `movies` int(4) NOT NULL DEFAULT 0,
  `commands` int(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`memberID`);

--
-- Indices de la tabla `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`memberID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
