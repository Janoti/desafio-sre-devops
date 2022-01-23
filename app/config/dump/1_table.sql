CREATE SCHEMA IF NOT EXISTS  desafio4
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE  TABLE IF NOT EXISTS `desafio` .`users` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(255) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `birthdate` VARCHAR(255) NOT NULL,  
  PRIMARY KEY (`id`))
ENGINE = InnoDB;