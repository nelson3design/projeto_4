-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02-Ago-2022 às 21:13
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
  `nomeCliente` varchar(150) NOT NULL,
  `cpf` varchar(30) NOT NULL,
  `cep` int(11) NOT NULL,
  `rua` varchar(150) NOT NULL,
  `cidade` varchar(150) NOT NULL,
  `numero` int(11) NOT NULL,
  `complemento` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_cliente`
--

INSERT INTO `tb_cliente` (`id`, `nomeCliente`, `cpf`, `cep`, `rua`, `cidade`, `numero`, `complemento`) VALUES
(67, 'nelson delva', '70093359233', 88137626, 'rua caraúna', 'palhoça', 86, 'casa 1'),
(68, 'ivan', '123456', 88131740, 'rua braulio sebastião goulart', 'palhoça', 56, ' apto 7'),
(69, 'Lamba gomes', '1234567', 88131450, 'rua paluo vitor', 'palhoça', 10, 'casa 2'),
(70, 'eduardo', '12345678', 88131540, 'rua paulo vidal', 'palhoça', 85, 'apto 1'),
(71, 'maria ', '123456789', 88132451, 'rua rafela gomes', 'palhoça', 56, 'casa 2');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pedido`
--

CREATE TABLE `tb_pedido` (
  `idPedido` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `bebida` text NOT NULL,
  `valorAdicional` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `valorTotal` int(150) NOT NULL,
  `pago` varchar(10) NOT NULL DEFAULT 'off',
  `confirmar` varchar(10) NOT NULL DEFAULT 'off',
  `cancelar` varchar(10) NOT NULL DEFAULT 'off',
  `preparar` varchar(10) NOT NULL DEFAULT 'off',
  `terminar` varchar(10) NOT NULL DEFAULT 'off',
  `entregar` varchar(10) NOT NULL DEFAULT 'off',
  `finalizar` varchar(10) NOT NULL DEFAULT 'off',
  `data` datetime NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `pedido` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_pedido`
--

INSERT INTO `tb_pedido` (`idPedido`, `valor`, `bebida`, `valorAdicional`, `valorTotal`, `pago`, `confirmar`, `cancelar`, `preparar`, `terminar`, `entregar`, `finalizar`, `data`, `id_cliente`, `id_produto`, `pedido`) VALUES
(104, 45, 'Água Crystal sem Gás', '4.4', 49, 'on', 'off', 'on', 'off', 'off', 'off', 'off', '2022-08-02 11:01:12', 67, 74, '#349233'),
(105, 90, '', '0', 90, 'on', 'on', 'off', 'on', 'on', 'on', 'on', '2022-08-02 15:11:14', 68, 74, '#353456'),
(106, 45, 'Água Crystal sem Gás', '4.4', 49, 'on', 'off', 'on', 'off', 'off', 'off', 'off', '2022-08-02 10:36:27', 69, 74, '#364567'),
(107, 86, 'Coca-Cola Original', '6.4', 92, 'on', 'on', 'off', 'on', 'on', 'on', 'on', '2022-08-02 10:36:18', 70, 53, '#375678'),
(108, 32, 'Água Crystal sem Gás', '4.4', 36, 'on', 'on', 'off', 'on', 'on', 'on', 'on', '2022-08-02 10:36:20', 71, 51, '#396789'),
(109, 32, 'Guaraná Antarctica sem Açúcar', '10.8', 42, 'on', 'on', 'off', 'on', 'on', 'on', 'on', '2022-08-02 15:11:29', 67, 51, '#439233'),
(110, 63, '', '0', 63, 'on', 'on', 'off', 'on', 'on', 'on', 'off', '2022-08-02 13:55:17', 67, 51, '#539233'),
(111, 32, '', '0', 32, 'on', 'on', 'off', 'on', 'on', 'on', 'on', '2022-08-02 14:41:23', 67, 45, '#379233'),
(112, 32, '', '0', 32, 'on', 'on', 'off', 'on', 'on', 'off', 'off', '2022-08-02 15:11:10', 68, 51, '#103456'),
(113, 32, '', '0', 32, 'on', 'on', 'off', 'off', 'off', 'off', 'off', '2022-08-02 15:32:16', 68, 45, '#323456');

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
  `categoria` varchar(10) NOT NULL,
  `destaque` varchar(5) NOT NULL,
  `senha` varchar(200) NOT NULL DEFAULT 'projeto4'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_user`
--

INSERT INTO `tb_user` (`id`, `image`, `nome`, `description`, `preco`, `categoria`, `destaque`, `senha`) VALUES
(29, 'imageB1.jpg1658683284749.jpg', 'Fanta Laranja', 'Lata 350ml', '6.40', 'bebida', 'não', 'projeto4'),
(30, 'image1.jpg1658683448112.jpg', 'Água Crystal com Gás', 'Garrafa 500ml', '4.40', 'bebida', 'não', 'projeto4'),
(31, 'image2.jpg1658683523847.jpg', 'Coca-Cola sem Açúcar', 'Lata 350ml', '6.40', 'bebida', 'não', 'projeto4'),
(32, 'image3.jpg1658683583478.jpg', 'Guaraná Antarctica', 'Lata 350ml', '6.40', 'bebida', 'sim', 'projeto4'),
(33, 'image4.jpg1658683648661.jpg', 'Fanta Uva', 'Lata 350ml', '6.40', 'bebida', 'não', 'projeto4'),
(34, 'image5.jpg1658683755927.jpg', 'Sprite Lemon Fresh sem Açúcar', 'Lata 310ml', '6.40', 'bebida', 'não', 'projeto4'),
(35, 'image6.jpg1658683820284.jpg', ' Coca-Cola Original', 'Garrafa 2L', '15.70', 'bebida', 'sim', 'projeto4'),
(36, 'image7.jpg1658683900106.jpg', 'Guaraná Antarctica', 'Garrafa 2L', '13.90', 'bebida', 'não', 'projeto4'),
(37, 'image8.jpg1658683980820.jpg', 'Suco Natural One Uva', 'Garrafa 300ml', '8.90', 'bebida', 'não', 'projeto4'),
(38, 'image9.jpg1658684073352.jpg', 'Coca-Cola Original', 'Lata 350ml', '6.40', 'bebida', 'sim', 'projeto4'),
(39, 'image10.jpg1658684148824.jpg', 'Guaraná Antarctica sem Açúcar', 'Lata 350ml', '6.40', 'bebida', 'não', 'projeto4'),
(40, 'image11.jpg1658684212864.jpg', 'Água Crystal sem Gás', 'Garrafa 500ml', '4.40', 'bebida', 'não', 'projeto4'),
(41, 'img1.jpg1658684393172.jpg', 'Nola Chicken Crispy', 'Coxa e sobrecoxa empanados ao estilo americano com alface americana e molho nola (levemente apimentado) no pão de brioche.', '26.30', 'hamburguer', 'não', 'projeto4'),
(42, 'imag2.jpg1658684462028.jpg', 'Salad', 'Burger bovino com 140g, muçarela, alface, tomate no pão de brioche.', '31.30', 'hamburguer', 'não', 'projeto4'),
(43, 'img3.jpg1658684541069.jpg', 'Juicy Lucy', 'Esse é o nosso burger recheado de cheddar! Burger bovino com 180g, cheddar, bacon defumado artesanalmente, picles, cebola roxa, alface americana, tomate e molho especial no pão de brioche.', '41.40', 'hamburguer', 'não', 'projeto4'),
(44, 'img4.jpg1658684595691.jpg', 'Winchester', 'Esse é animal! 2 burgers com 180g, duplo cheddar, duplo bacon defumado artesanalmente, molho da casa no pão de brioche.', '50.50', 'hamburguer', 'não', 'projeto4'),
(45, 'img5.jpg1658684693076.jpg', 'Calábria', 'Burger de calabresa fresca 170g, queijo muçarela, cebola caramelizada, picles e molho especial no pão australiano.', '31.90', 'hamburguer', 'sim', 'projeto4'),
(46, 'img6.jpg1658684766841.jpg', 'No Beef', 'Burger de cogumelos com cevada 150g, queijo muçarela, rúcula, cebola roxa e molho especial no pão australiano.', '37.90', 'hamburguer', 'não', 'projeto4'),
(47, 'img7.jpg1658684847058.jpg', 'P.C.Q.', 'Burger bovino com 140g, cheddar, molho especial no pão de brioche.', '27.90', 'hamburguer', 'não', 'projeto4'),
(48, 'img8.jpg1658684910592.jpg', 'Bacon Crispy', 'Burger bovino com 140g, cheddar cremoso, bacon em cubos no pão australiano.', '32.30', 'hamburguer', 'não', 'projeto4'),
(49, 'img9.jpg1658684981079.jpg', 'Pollo Bruttu', 'Burger de frango de 170g, queijo muçarela, confit de tomate e cebola (tomate e cebola assados juntos), rúcula e molho especial no pão de brioche.', '27.90', 'hamburguer', 'não', 'projeto4'),
(50, 'img10.jpg1658685095253.jpg', 'Bruttus', 'Burger bovino com 180g, cheddar, bacon, picles, alface americana, tomate, cebola roxa e molho especial no pão de brioche.', '39.70', 'hamburguer', 'não', 'projeto4'),
(51, 'img11.jpg1658685140496.jpg', 'Cheddar Cream', 'Burger bovino com 140g, cheddar cremoso, cebola caramelizada no pão australiano.', '31.50', 'hamburguer', 'sim', 'projeto4'),
(52, 'img12.jpg1658685185141.jpg', 'The King', 'O burger com crosta de pimenta do reino! Burger bovino com 180g, com crosta de pimenta do reino, cheddar, cebola caramelizada, picles, alface americana, tomate e molho especial no pão australiano.', '40.90', 'hamburguer', 'não', 'projeto4'),
(53, 'img13.jpg1658685234406.jpg', 'Notorious P.I.G', 'Burger com pulled pork? A combinação perfeita! Burger bovino com 180g, cheddar fatiado, pulled pork com molho barbecue, crispy onion no pão de brioche.', '42.90', 'hamburguer', 'sim', 'projeto4'),
(54, 'img1.jpg1658685477533.jpg', '3 Queijos', 'Queijo, requeijão, oregano e parmesão ralado.', '49.99', 'pizza', 'não', 'projeto4'),
(55, 'img2.jpg1658686045030.jpg', 'Frango com Requeijão', 'Frango desfiado, cebola, oregano e requeijão.', '55.00', 'pizza', 'sim', 'projeto4'),
(56, 'img3.jpg1658686095844.jpg', 'Calabresa', 'Queijo, calabresa e cebola, oregano.', '69.90', 'pizza', 'não', 'projeto4'),
(57, 'img4.jpg1658686148124.jpg', 'Corn & Bacon', 'Queijo, bacon, oregano e milho.', '45.50', 'pizza', 'não', 'projeto4'),
(58, 'img5.jpg1658686201540.jpg', 'Pizza de Queijo', 'Queijo e orégano.', '44.90', 'pizza', 'não', 'projeto4'),
(59, 'img6.jpg1658686245858.jpg', 'Margherita', 'Queijo, tomate, oregano e manjericão.', '48.50', 'pizza', 'não', 'projeto4'),
(60, 'img7.jpg1658686295241.jpg', 'Pepperoni', 'Queijo, oregano e pepperoni.', '39.99', 'pizza', 'não', 'projeto4'),
(61, 'img8.jpg1658686337657.jpg', 'Presunto', 'Queijo, oregano e presunto.', '42.90', 'pizza', 'sim', 'projeto4'),
(62, 'img9.jpg1658686377977.jpg', 'Napolitana', 'Queijo, tomate, oregano e parmesão ralad', '44.99', 'pizza', 'não', 'projeto4'),
(63, 'img10.jpg1658686428024.jpg', 'América', 'Queijo, pepperoni, champignon, cebola, oregano e pimentão verde.', '64.99', 'pizza', 'não', 'projeto4'),
(64, 'img11.jpg1658686478073.jpg', '4 Queijos', 'Queijo, requeijão, gorgonzola, oregano e parmesão ralado.', '44.99', 'pizza', 'sim', 'projeto4'),
(65, 'img12.jpg1658686517247.jpg', 'Bauru', 'Queijo, presunto, requeijão, oregano e tomate.', '39.99', 'pizza', 'não', 'projeto4'),
(66, 'img13.jpg1658686576951.jpg', 'Búfala La Bianca', 'Queijo, queijo de búfala e leite, requeijão, parmesão ralado, oregano e manjericão.', '45.50', 'pizza', 'não', 'projeto4'),
(67, 'img14.jpg1658686621247.jpg', 'Calabresa Especial', 'Queijo, azeitona preta, calabresa, cebola, oregano e Cream Cheese.', '44.99', 'pizza', 'não', 'projeto4'),
(68, 'img15.jpg1658686675645.jpg', 'Catuperoni', 'Queijo, pepperoni, requeijão, oregano e parmesão ralado.', '45.90', 'pizza', 'não', 'projeto4'),
(69, 'img16.jpg1658686718245.jpg', 'Egg & Bacon', 'Queijo, bacon, cebola, cream cheese, oregano e ovo de codorna.', '65.99', 'pizza', 'não', 'projeto4'),
(70, 'img17.jpg1658686760725.jpg', 'Frango com Cream Cheese', 'Queijo, frango desfiado, Cream Cheese, oregano e parmesão ralado', '54.99', 'pizza', 'não', 'projeto4'),
(71, 'img18.jpg1658687708037.jpg', 'Frango Grelhado', 'Queijo, frango, requeijão, tomate, azeitona preta, oregano e manjericão.', '45.90', 'pizza', 'não', 'projeto4'),
(72, 'img19.jpg1658687749853.jpg', 'Pepperrock', 'Queijo, pepperoni, azeitona preta, parmesão ralado, oregano, Cream Cheese e alho granulado.', '46.90', 'pizza', 'não', 'projeto4'),
(73, 'img20.jpg1658687794106.jpg', 'Portuguesa', 'Queijo, presunto, ovo de codorna, azeitona preta, cebola, oregano e pimentão verde.', '44.50', 'pizza', 'não', 'projeto4'),
(74, 'img21.jpg1658687849683.jpg', 'Veggie®', 'Queijo, champignon, azeitona preta, cebola, oregano e pimentão verde.', '44.99', 'pizza', 'sim', 'projeto4'),
(75, 'img22.jpg1658687891293.jpg', 'Extravaganzza®', 'Queijo, pepperoni, presunto, azeitona preta, champignon, cebola, oregano e pimentão verde.', '44.99', 'pizza', 'não', 'projeto4'),
(76, 'img23.jpg1658687933785.jpg', 'Meat & Bacon', 'Queijo, bacon, calabresa, pepperoni, oregano e presunto.', '39.99', 'pizza', 'não', 'projeto4'),
(77, 'img24.jpg1658687977258.jpg', 'Frango com Barbecue', 'Barbecue, queijo, frango grelhado, cebola, oregano e parmesão.', '50.59', 'pizza', 'não', 'projeto4');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_user_server`
--

CREATE TABLE `tb_user_server` (
  `idUser` int(11) NOT NULL,
  `nomeUser` varchar(120) NOT NULL,
  `senha` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_user_server`
--

INSERT INTO `tb_user_server` (`idUser`, `nomeUser`, `senha`) VALUES
(1, 'menu', 'projeto4');

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
  ADD PRIMARY KEY (`idPedido`);

--
-- Índices para tabela `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_user_server`
--
ALTER TABLE `tb_user_server`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de tabela `tb_pedido`
--
ALTER TABLE `tb_pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT de tabela `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT de tabela `tb_user_server`
--
ALTER TABLE `tb_user_server`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
