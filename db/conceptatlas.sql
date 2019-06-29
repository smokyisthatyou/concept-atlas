-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 29, 2019 alle 12:57
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
('1', 'Biologia', 'Questo atlas tratta di vari argomenti riguardanti l\'ambito della biologia. ', 'giorgia.manna@edu.unito.it'),
('2', 'Doungeon&Dragons', 'Questo atlas contiene le istruzioni schematizzate per il gioco di ruolo di D&D.', 'sibilla.merlo@edu.unito.it');

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
  `mapwork` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `concept`
--

INSERT INTO `concept` (`id`, `name`, `description`, `synonyms`, `palette`, `mapwork`) VALUES
('1', 'Organuli della cellula animale\r\n', 'Parti specializzate della cellula animale, ogni parte ha un compito specifico.', 'Organelli', '1', '1'),
('2', 'Nucleo', 'È un organulo presente nella quasi totalità delle cellule eucariote, con forma e sede molto variabili e\r\nun volume proporzionale a quello della cellula. È la centrale di controllo della cellula e dirige tutte le\r\nfunzioni cellulari: contiene gli acidi nucleici, provvede alla duplicazione del DNA, alla trascrizione e alla maturazione dell’RNA.', NULL, '1', '1'),
('3', 'Mitocondri', 'Sono organuli citoplasmatici circondati da una doppia membrana con creste sporgenti all’interno. Nei\r\nmitocondri si svolge la seconda fase della respirazione cellulare, chiamata appunto respirazione mitocondriale, grazie alla quale la cellula ricava energia (ATP) per le sue attività.', NULL, '1', '1');

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
  `root` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `concept` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `mapwork`
--

INSERT INTO `mapwork` (`id`, `name`, `atlas`, `privacy`, `root`, `description`, `concept`) VALUES
('1', 'La cellula animale', '1', 'public', '1', 'Spiegazione dei vari componenti e comportamenti della cellulare animale.', NULL),
('2', 'La cellula vegetale', '1', 'public', '6', 'Spiegazione dei componenti e comportamenti della cellulare vegetale.', NULL),
('3', 'Battaglia', '2', 'public', '7', 'Regole per la battaglia.', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `palette`
--

CREATE TABLE `palette` (
  `id` varchar(255) NOT NULL,
  `atlas` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `palette`
--

INSERT INTO `palette` (`id`, `atlas`) VALUES
('1', '1'),
('2', '2');

-- --------------------------------------------------------

--
-- Struttura della tabella `perspective`
--

CREATE TABLE `perspective` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `author` varchar(255) NOT NULL,
  `mapwork` varchar(255) NOT NULL,
  `freezed` varchar(5) NOT NULL,
  `published` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `perspective`
--

INSERT INTO `perspective` (`id`, `name`, `author`, `mapwork`, `freezed`, `published`) VALUES
('1', 'Organuli Cellulari', 'giorgia.manna@edu.unito.it', '1', 'true', 'true'),
('2', 'Organuli Cellulari-v1.1', 'giorgia.manna@edu.unito.it', '1', 'true', 'true'),
('3', 'Organuli Cellulari-v.1.2', 'sibilla.merlo@edu.unito.it', '1', 'true', 'true'),
('4', 'Organuli Cellulari-v.1.2.1', 'giorgia.manna@edu.unito.it', '1', 'true', 'false'),
('5', 'Oganuli cellualari v-1.1.2.1', 'sibilla.merlo@edu.unito.it', '1', 'false', 'true'),
('6', 'Tipi di Cellule Vegetali', 'sibilla.merlo@edu.unito.it', '2', 'true', 'true'),
('7', 'Battaglia', 'sibilla.merlo@edu.unito.it', '3', 'false', 'false'),
('8', 'Statistiche ed Equipaggiamento', 'sibilla.merlo@edu.unito.it', '3', 'false', 'false'),
('9', 'Organuli Cellulari-v.1.2.1.1', 'giorgia.manna@edu.unito.it', '1', 'true', 'false');

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

--
-- Dump dei dati per la tabella `relationshiptype`
--

INSERT INTO `relationshiptype` (`id`, `name`, `description`, `palette`) VALUES
('1', 'contiene', 'Accogliere in sé, nel proprio interno.', '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `teamatlas`
--

CREATE TABLE `teamatlas` (
  `id_user` varchar(255) NOT NULL,
  `id_atlas` varchar(255) NOT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `teamatlas`
--

INSERT INTO `teamatlas` (`id_user`, `id_atlas`, `role`) VALUES
('giorgia.manna@edu.unito.it', '1', 'admin'),
('giorgia.manna@edu.unito.it', '2', 'admin'),
('sibilla.merlo@edu.unito.it', '1', 'admin'),
('sibilla.merlo@edu.unito.it', '2', 'admin');

-- --------------------------------------------------------

--
-- Struttura della tabella `teammap`
--

CREATE TABLE `teammap` (
  `id_user` varchar(255) NOT NULL,
  `id_map` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `teammap`
--

INSERT INTO `teammap` (`id_user`, `id_map`) VALUES
('giorgia.manna@edu.unito.it', '1'),
('giorgia.manna@edu.unito.it', '2'),
('sibilla.merlo@edu.unito.it', '1'),
('sibilla.merlo@edu.unito.it', '2');

-- --------------------------------------------------------

--
-- Struttura della tabella `tree`
--

CREATE TABLE `tree` (
  `father` varchar(255) NOT NULL,
  `child` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `tree`
--

INSERT INTO `tree` (`father`, `child`) VALUES
('1', '2'),
('1', '3'),
('3', '4'),
('3', '5'),
('4', '9'),
('7', '8');

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
  ADD KEY `atlas` (`atlas`),
  ADD KEY `root` (`root`);

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
  ADD KEY `child` (`child`);

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
  ADD CONSTRAINT `mapwork_ibfk_1` FOREIGN KEY (`atlas`) REFERENCES `atlas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mapwork_ibfk_2` FOREIGN KEY (`root`) REFERENCES `perspective` (`id`);

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
  ADD CONSTRAINT `tree_ibfk_2` FOREIGN KEY (`child`) REFERENCES `perspective` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
