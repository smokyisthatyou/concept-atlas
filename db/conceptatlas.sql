-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 11, 2019 alle 23:36
-- Versione del server: 10.1.38-MariaDB
-- Versione PHP: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `conceptatlas`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `atlas`
--

CREATE TABLE `atlas` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `owner` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `atlas`
--

INSERT INTO `atlas` (`id`, `name`, `description`, `owner`) VALUES
('1', 'Primo Atlas', 'Questo è il primo atas di prova, sarebbe bello funzionasse tutto quanto', 'sibilla.merlo@edu.unito.it'),
('2', 'Secondo Atlas', 'Ha funzionato.', 'giorgia.manna@edu.unito.it');

-- --------------------------------------------------------

--
-- Struttura della tabella `concept`
--

CREATE TABLE `concept` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `synonyms` varchar(500) DEFAULT NULL,
  `palette` varchar(255) NOT NULL,
  `mapwork` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `concpersp`
--

CREATE TABLE `concpersp` (
  `id` varchar(255) NOT NULL,
  `conc` varchar(255) NOT NULL,
  `persp` varchar(255) NOT NULL,
  `coord_x` float NOT NULL,
  `coord_y` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `mapwork`
--

CREATE TABLE `mapwork` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `atlas` varchar(255) NOT NULL,
  `privacy` varchar(25) NOT NULL,
  `root` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `palette`
--

CREATE TABLE `palette` (
  `id` varchar(255) NOT NULL,
  `atlas` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `perspective`
--

CREATE TABLE `perspective` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `author` varchar(255) NOT NULL,
  `mapwork` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `relationship`
--

CREATE TABLE `relationship` (
  `id` varchar(255) NOT NULL,
  `conc1` varchar(255) NOT NULL,
  `conc2` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `persp` varchar(255) NOT NULL,
  `side1` char(1) NOT NULL,
  `side2` char(1) NOT NULL,
  `pos1` int(11) NOT NULL,
  `pos2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `relationshiptype`
--

CREATE TABLE `relationshiptype` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `palette` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `teamatlas`
--

CREATE TABLE `teamatlas` (
  `id_user` varchar(255) NOT NULL,
  `id_atlas` varchar(255) NOT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `teammap`
--

CREATE TABLE `teammap` (
  `id_user` varchar(255) NOT NULL,
  `id_map` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `tree`
--

CREATE TABLE `tree` (
  `father` varchar(255) NOT NULL,
  `child` varchar(255) NOT NULL,
  `mapwork` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `email` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`email`, `name`, `surname`, `role`) VALUES
('claudia.picardi@unito.it', 'Claudia', 'Picardi', 'admin'),
('giorgia.manna@edu.unito.it', 'Giorgia', 'Manna', 'admin'),
('sibilla.merlo@edu.unito.it', 'Sibilla', 'Merlo', 'admin');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `atlas`
--
ALTER TABLE `atlas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

--
-- Indici per le tabelle `concept`
--
ALTER TABLE `concept`
  ADD PRIMARY KEY (`id`),
  ADD KEY `palette` (`palette`),
  ADD KEY `mapwork` (`mapwork`);

--
-- Indici per le tabelle `concpersp`
--
ALTER TABLE `concpersp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conc` (`conc`),
  ADD KEY `persp` (`persp`);

--
-- Indici per le tabelle `mapwork`
--
ALTER TABLE `mapwork`
  ADD PRIMARY KEY (`id`),
  ADD KEY `atlas` (`atlas`);

--
-- Indici per le tabelle `palette`
--
ALTER TABLE `palette`
  ADD PRIMARY KEY (`id`),
  ADD KEY `atlas` (`atlas`);

--
-- Indici per le tabelle `perspective`
--
ALTER TABLE `perspective`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`author`),
  ADD KEY `mapwork` (`mapwork`);

--
-- Indici per le tabelle `relationship`
--
ALTER TABLE `relationship`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conc1` (`conc1`),
  ADD KEY `conc2` (`conc2`),
  ADD KEY `type` (`type`),
  ADD KEY `persp` (`persp`);

--
-- Indici per le tabelle `relationshiptype`
--
ALTER TABLE `relationshiptype`
  ADD PRIMARY KEY (`id`),
  ADD KEY `palette` (`palette`);

--
-- Indici per le tabelle `teamatlas`
--
ALTER TABLE `teamatlas`
  ADD PRIMARY KEY (`id_user`,`id_atlas`),
  ADD KEY `id_atlas` (`id_atlas`);

--
-- Indici per le tabelle `teammap`
--
ALTER TABLE `teammap`
  ADD PRIMARY KEY (`id_user`,`id_map`),
  ADD KEY `id_map` (`id_map`);

--
-- Indici per le tabelle `tree`
--
ALTER TABLE `tree`
  ADD PRIMARY KEY (`father`,`child`),
  ADD KEY `child` (`child`),
  ADD KEY `mapwork` (`mapwork`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `atlas`
--
ALTER TABLE `atlas`
  ADD CONSTRAINT `atlas_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `concept`
--
ALTER TABLE `concept`
  ADD CONSTRAINT `concept_ibfk_1` FOREIGN KEY (`palette`) REFERENCES `palette` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `concept_ibfk_2` FOREIGN KEY (`mapwork`) REFERENCES `mapwork` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `concpersp`
--
ALTER TABLE `concpersp`
  ADD CONSTRAINT `concpersp_ibfk_1` FOREIGN KEY (`conc`) REFERENCES `concept` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `concpersp_ibfk_2` FOREIGN KEY (`persp`) REFERENCES `perspective` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `mapwork`
--
ALTER TABLE `mapwork`
  ADD CONSTRAINT `mapwork_ibfk_1` FOREIGN KEY (`atlas`) REFERENCES `atlas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `palette`
--
ALTER TABLE `palette`
  ADD CONSTRAINT `palette_ibfk_1` FOREIGN KEY (`atlas`) REFERENCES `atlas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `perspective`
--
ALTER TABLE `perspective`
  ADD CONSTRAINT `perspective_ibfk_1` FOREIGN KEY (`author`) REFERENCES `teammap` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `perspective_ibfk_2` FOREIGN KEY (`mapwork`) REFERENCES `mapwork` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `relationship`
--
ALTER TABLE `relationship`
  ADD CONSTRAINT `relationship_ibfk_1` FOREIGN KEY (`conc1`) REFERENCES `concpersp` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relationship_ibfk_2` FOREIGN KEY (`conc2`) REFERENCES `concpersp` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relationship_ibfk_3` FOREIGN KEY (`type`) REFERENCES `relationshiptype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relationship_ibfk_4` FOREIGN KEY (`persp`) REFERENCES `perspective` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `relationshiptype`
--
ALTER TABLE `relationshiptype`
  ADD CONSTRAINT `relationshiptype_ibfk_1` FOREIGN KEY (`palette`) REFERENCES `palette` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `teamatlas`
--
ALTER TABLE `teamatlas`
  ADD CONSTRAINT `teamatlas_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teamatlas_ibfk_2` FOREIGN KEY (`id_atlas`) REFERENCES `atlas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `teammap`
--
ALTER TABLE `teammap`
  ADD CONSTRAINT `teammap_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `teamatlas` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teammap_ibfk_2` FOREIGN KEY (`id_map`) REFERENCES `mapwork` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `tree`
--
ALTER TABLE `tree`
  ADD CONSTRAINT `tree_ibfk_1` FOREIGN KEY (`father`) REFERENCES `perspective` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tree_ibfk_2` FOREIGN KEY (`child`) REFERENCES `perspective` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tree_ibfk_3` FOREIGN KEY (`mapwork`) REFERENCES `mapwork` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
