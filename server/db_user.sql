-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19-Jul-2022 às 22:10
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_user`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_cliente`
--

CREATE TABLE `tb_cliente` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `cpf` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_cliente`
--

INSERT INTO `tb_cliente` (`id`, `nome`, `cpf`) VALUES
(11, 'nelson', '123456'),
(12, 'lorna', '12345'),
(13, 'chico', '1234'),
(14, 'pivane', '123');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pedido`
--

CREATE TABLE `tb_pedido` (
  `id` int(11) NOT NULL,
  `nomep` varchar(150) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `comment` text NOT NULL,
  `quant` int(11) NOT NULL,
  `confim` varchar(11) NOT NULL DEFAULT 'off',
  `cancelar` varchar(11) NOT NULL DEFAULT 'off',
  `preparo` varchar(11) NOT NULL DEFAULT 'off',
  `entrega` varchar(11) NOT NULL DEFAULT 'off',
  `pago` varchar(11) DEFAULT 'off',
  `data` datetime NOT NULL,
  `id_cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_pedido`
--

INSERT INTO `tb_pedido` (`id`, `nomep`, `preco`, `comment`, `quant`, `confim`, `cancelar`, `preparo`, `entrega`, `pago`, `data`, `id_cliente`) VALUES
(26, 'x-salada', '222.90', 'sak gen la', 1, 'on', 'off', 'on', 'off', 'on', '2022-07-19 16:50:42', 11),
(27, 'x-delicia', '222.90', 'dezyem prodwi mw', 2, 'on', 'off', 'off', 'off', NULL, '2022-07-19 13:17:59', 11),
(28, 'x-delicia', '222.90', 'mw se lorna', 2, 'on', 'off', 'off', 'off', 'on', '2022-07-19 13:28:22', 12),
(29, 'x-delicia', '222.90', 'mw se lorna map fe yon dezyem acha', 1, 'on', 'off', 'off', 'off', NULL, '2022-07-19 13:21:44', 12),
(30, 'x-delicia', '222.90', 'me se chico', 2, 'on', 'off', 'off', 'off', 'on', '2022-07-19 13:31:37', 13),
(31, 'x-delicia', '222.90', 'me se chico map fe yon dezyem acha', 1, 'on', 'off', 'off', 'off', NULL, '2022-07-19 13:27:41', 13),
(32, 'x-delicia', '222.90', 'pivane map fe yon acha', 1, 'on', 'off', 'off', 'off', 'on', '2022-07-19 16:50:17', 14),
(33, 'x-salada', '222.90', 'pivane map fe yon lot acha', 2, 'off', 'off', 'off', 'off', NULL, '2022-07-19 16:29:21', 14);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL,
  `image` varchar(200) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `categoria` varchar(5) NOT NULL,
  `destaque` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_user`
--

INSERT INTO `tb_user` (`id`, `image`, `nome`, `description`, `preco`, `categoria`, `destaque`) VALUES
(20, 'relogio-png.png1658189424541.png', 'relogio', 'teste 2', '22.99', 'pizza', 'sim');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_pedido`
--
ALTER TABLE `tb_pedido`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `tb_pedido`
--
ALTER TABLE `tb_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de tabela `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
