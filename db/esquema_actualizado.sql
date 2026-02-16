-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Table `inventario`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('admin', 'encargado') NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre` (`nombre` ASC) VISIBLE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `inventario`.`marcas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario`.`marcas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `proveedor_id` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre` (`nombre` ASC) VISIBLE,
  INDEX `proveedor_id` (`proveedor_id` ASC) VISIBLE,
  CONSTRAINT `marcas_ibfk_1`
    FOREIGN KEY (`proveedor_id`)
    REFERENCES `inventario`.`proveedor` (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `inventario`.`proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario`.`proveedor` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `inventario`.`inv_dia_bat_generica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario`.`inv_dia_bat_generica` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_marca_fk` INT(11) NULL DEFAULT NULL,
  `version` VARCHAR(50) NULL DEFAULT NULL,
  `color` VARCHAR(30) NULL DEFAULT NULL,
  `calidad` VARCHAR(30) NULL DEFAULT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  `codigo` VARCHAR(50) NULL DEFAULT NULL,
  `proveedor_id` INT(11) NULL DEFAULT NULL,
  `cantidad` INT(11) NULL DEFAULT NULL,
  `costo` DECIMAL(10,2) NULL DEFAULT NULL,
  `v_mayor` DECIMAL(10,2) NULL DEFAULT NULL,
  `rebaja` DECIMAL(10,2) NULL DEFAULT NULL,
  `pedir` TINYINT(1) NULL DEFAULT NULL,
  `faltantes` INT(11) NULL DEFAULT NULL,
  `celulares` VARCHAR(100) NULL DEFAULT NULL,
  `devolucion` INT(11) NULL DEFAULT NULL,
  `stock_minimo` INT(11) NULL DEFAULT 5,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `id_marca_fk` (`id_marca_fk` ASC) VISIBLE,
  INDEX `proveedor_id` (`proveedor_id` ASC) VISIBLE,
  CONSTRAINT `inv_dia_bat_generica_ibfk_1`
    FOREIGN KEY (`id_marca_fk`)
    REFERENCES `inventario`.`marcas` (`id`),
  CONSTRAINT `inv_dia_bat_generica_ibfk_2`
    FOREIGN KEY (`proveedor_id`)
    REFERENCES `inventario`.`proveedor` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `inventario`.`inv_dia_bat_original`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario`.`inv_dia_bat_original` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_marca_fk` INT(11) NULL DEFAULT NULL,
  `version` VARCHAR(50) NULL DEFAULT NULL,
  `color` VARCHAR(30) NULL DEFAULT NULL,
  `calidad` VARCHAR(30) NULL DEFAULT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  `codigo` VARCHAR(50) NULL DEFAULT NULL,
  `proveedor_id` INT(11) NULL DEFAULT NULL,
  `cantidad` INT(11) NULL DEFAULT NULL,
  `costo` DECIMAL(10,2) NULL DEFAULT NULL,
  `v_mayor` DECIMAL(10,2) NULL DEFAULT NULL,
  `pedir` TINYINT(1) NULL DEFAULT NULL,
  `faltantes` INT(11) NULL DEFAULT NULL,
  `celulares` VARCHAR(100) NULL DEFAULT NULL,
  `devolucion` INT(11) NULL DEFAULT NULL,
  `stock_minimo` INT(11) NULL DEFAULT 5,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `id_marca_fk` (`id_marca_fk` ASC) VISIBLE,
  INDEX `proveedor_id` (`proveedor_id` ASC) VISIBLE,
  CONSTRAINT `inv_dia_bat_original_ibfk_1`
    FOREIGN KEY (`id_marca_fk`)
    REFERENCES `inventario`.`marcas` (`id`),
  CONSTRAINT `inv_dia_bat_original_ibfk_2`
    FOREIGN KEY (`proveedor_id`)
    REFERENCES `inventario`.`proveedor` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `inventario`.`inv_dia_cel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario`.`inv_dia_cel` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `costo` DECIMAL(10,2) NULL DEFAULT NULL,
  `referencia` VARCHAR(100) NULL DEFAULT NULL,
  `software` VARCHAR(50) NULL DEFAULT NULL,
  `tarjeta` VARCHAR(50) NULL DEFAULT NULL,
  `display` VARCHAR(50) NULL DEFAULT NULL,
  `tactil` VARCHAR(50) NULL DEFAULT NULL,
  `visor` VARCHAR(50) NULL DEFAULT NULL,
  `bateria` VARCHAR(50) NULL DEFAULT NULL,
  `boton` VARCHAR(50) NULL DEFAULT NULL,
  `ping` VARCHAR(50) NULL DEFAULT NULL,
  `cam_tapas` VARCHAR(50) NULL DEFAULT NULL,
  `bcver` VARCHAR(50) NULL DEFAULT NULL,
  `mantenimiento` VARCHAR(50) NULL DEFAULT NULL,
  `logica` VARCHAR(50) NULL DEFAULT NULL,
  `entrega` VARCHAR(50) NULL DEFAULT NULL,
  `abonos` DECIMAL(10,2) NULL DEFAULT NULL,
  `fecha_entrega_pago` DATE NULL DEFAULT NULL,
  `no_entrega_o_garantia` VARCHAR(100) NULL DEFAULT NULL,
  `devolucion` VARCHAR(50) NULL DEFAULT NULL,
  `terceros_comentos` TEXT NULL DEFAULT NULL,
  `stock_minimo` INT(11) NULL DEFAULT 5,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `inventario`.`inv_dia_display`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario`.`inv_dia_display` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_marca_fk` INT(11) NULL DEFAULT NULL,
  `version` VARCHAR(50) NULL DEFAULT NULL,
  `color` VARCHAR(30) NULL DEFAULT NULL,
  `calidad` VARCHAR(30) NULL DEFAULT NULL,
  `r_f` VARCHAR(30) NULL DEFAULT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  `codigo` VARCHAR(50) NULL DEFAULT NULL,
  `proveedor_id` INT(11) NULL DEFAULT NULL,
  `inventario_inicial` INT(11) NULL DEFAULT NULL,
  `vta` INT(11) NULL DEFAULT NULL,
  `ser_t` INT(11) NULL DEFAULT NULL,
  `dev` INT(11) NULL DEFAULT NULL,
  `t_inv_final` INT(11) NULL DEFAULT NULL,
  `cost` DECIMAL(10,2) NULL DEFAULT NULL,
  `cost_venta` DECIMAL(10,2) NULL DEFAULT NULL,
  `rebaja` DECIMAL(10,2) NULL DEFAULT NULL,
  `pedir` TINYINT(1) NULL DEFAULT NULL,
  `falt` TINYINT(1) NULL DEFAULT NULL,
  `celular` VARCHAR(100) NULL DEFAULT NULL,
  `nota` TEXT NULL DEFAULT NULL,
  `stock_minimo` INT(11) NULL DEFAULT 5,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `id_marca_fk` (`id_marca_fk` ASC) VISIBLE,
  INDEX `proveedor_id` (`proveedor_id` ASC) VISIBLE,
  CONSTRAINT `inv_dia_display_ibfk_1`
    FOREIGN KEY (`id_marca_fk`)
    REFERENCES `inventario`.`marcas` (`id`),
  CONSTRAINT `inv_dia_display_ibfk_2`
    FOREIGN KEY (`proveedor_id`)
    REFERENCES `inventario`.`proveedor` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `inventario`.`inv_dia_rptos_peq`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario`.`inv_dia_rptos_peq` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_marca_fk` INT(11) NULL DEFAULT NULL,
  `v3` INT(11) NULL DEFAULT NULL,
  `v8` INT(11) NULL DEFAULT NULL,
  `tc` INT(11) NULL DEFAULT NULL,
  `tablet` INT(11) NULL DEFAULT NULL,
  `chinos` INT(11) NULL DEFAULT NULL,
  `mic_dig` INT(11) NULL DEFAULT NULL,
  `power` INT(11) NULL DEFAULT NULL,
  `audio` INT(11) NULL DEFAULT NULL,
  `conector_carga` INT(11) NULL DEFAULT NULL,
  `lector_huella` INT(11) NULL DEFAULT NULL,
  `auricular` INT(11) NULL DEFAULT NULL,
  `parlante` INT(11) NULL DEFAULT NULL,
  `logic_carga` INT(11) NULL DEFAULT NULL,
  `home` INT(11) NULL DEFAULT NULL,
  `delantera_visor` INT(11) NULL DEFAULT NULL,
  `trasera_visor` INT(11) NULL DEFAULT NULL,
  `antena` INT(11) NULL DEFAULT NULL,
  `porta_sim` INT(11) NULL DEFAULT NULL,
  `boton_lateral` INT(11) NULL DEFAULT NULL,
  `stock_minimo` INT(11) NULL DEFAULT 5,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `id_marca_fk` (`id_marca_fk` ASC) VISIBLE,
  CONSTRAINT `inv_dia_rptos_peq_ibfk_1`
    FOREIGN KEY (`id_marca_fk`)
    REFERENCES `inventario`.`marcas` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `inventario`.`inv_dia_tactil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario`.`inv_dia_tactil` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_marca_fk` INT(11) NULL DEFAULT NULL,
  `version` VARCHAR(50) NULL DEFAULT NULL,
  `color` VARCHAR(30) NULL DEFAULT NULL,
  `calidad` VARCHAR(30) NULL DEFAULT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  `codigo` VARCHAR(50) NULL DEFAULT NULL,
  `proveedor_id` INT(11) NULL DEFAULT NULL,
  `cantidad` INT(11) NULL DEFAULT NULL,
  `costo` DECIMAL(10,2) NULL DEFAULT NULL,
  `v_mayor` DECIMAL(10,2) NULL DEFAULT NULL,
  `rebaja` DECIMAL(10,2) NULL DEFAULT NULL,
  `pedir` TINYINT(1) NULL DEFAULT NULL,
  `faltantes` INT(11) NULL DEFAULT NULL,
  `celulares` VARCHAR(100) NULL DEFAULT NULL,
  `devolucion` INT(11) NULL DEFAULT NULL,
  `stock_minimo` INT(11) NULL DEFAULT 5,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `id_marca_fk` (`id_marca_fk` ASC) VISIBLE,
  INDEX `proveedor_id` (`proveedor_id` ASC) VISIBLE,
  CONSTRAINT `inv_dia_tactil_ibfk_1`
    FOREIGN KEY (`id_marca_fk`)
    REFERENCES `inventario`.`marcas` (`id`),
  CONSTRAINT `inv_dia_tactil_ibfk_2`
    FOREIGN KEY (`proveedor_id`)
    REFERENCES `inventario`.`proveedor` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `inventario`.`inv_dia_tapa_back`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario`.`inv_dia_tapa_back` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_marca_fk` INT(11) NULL DEFAULT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  `codigo` VARCHAR(50) NULL DEFAULT NULL,
  `proveedor_id` INT(11) NULL DEFAULT NULL,
  `inventario_inicial` INT(11) NULL DEFAULT NULL,
  `comp` INT(11) NULL DEFAULT NULL,
  `t_ext` INT(11) NULL DEFAULT NULL,
  `vta` INT(11) NULL DEFAULT NULL,
  `ser_t` INT(11) NULL DEFAULT NULL,
  `devolucion` INT(11) NULL DEFAULT NULL,
  `t_inv_final` INT(11) NULL DEFAULT NULL,
  `vxm` DECIMAL(10,2) NULL DEFAULT NULL,
  `rebaja` DECIMAL(10,2) NULL DEFAULT NULL,
  `pedir` TINYINT(1) NULL DEFAULT NULL,
  `falta` TINYINT(1) NULL DEFAULT NULL,
  `celular` VARCHAR(100) NULL DEFAULT NULL,
  `nota` TEXT NULL DEFAULT NULL,
  `stock_minimo` INT(11) NULL DEFAULT 5,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `id_marca_fk` (`id_marca_fk` ASC) VISIBLE,
  INDEX `proveedor_id` (`proveedor_id` ASC) VISIBLE,
  CONSTRAINT `inv_dia_tapa_back_ibfk_1`
    FOREIGN KEY (`id_marca_fk`)
    REFERENCES `inventario`.`marcas` (`id`),
  CONSTRAINT `inv_dia_tapa_back_ibfk_2`
    FOREIGN KEY (`proveedor_id`)
    REFERENCES `inventario`.`proveedor` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `inventario`.`inv_dia_visores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventario`.`inv_dia_visores` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL DEFAULT NULL,
  `sin_oca` TINYINT(1) NULL DEFAULT NULL,
  `color` VARCHAR(30) NULL DEFAULT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  `codigo` VARCHAR(50) NULL DEFAULT NULL,
  `proveedor_id` INT(11) NULL DEFAULT NULL,
  `inventario_inicial` INT(11) NULL DEFAULT NULL,
  `comp` INT(11) NULL DEFAULT NULL,
  `t_ext` INT(11) NULL DEFAULT NULL,
  `vta` INT(11) NULL DEFAULT NULL,
  `ser_t` INT(11) NULL DEFAULT NULL,
  `dev` INT(11) NULL DEFAULT NULL,
  `t_inv_final` INT(11) NULL DEFAULT NULL,
  `cost` DECIMAL(10,2) NULL DEFAULT NULL,
  `vxm` DECIMAL(10,2) NULL DEFAULT NULL,
  `rebaja` DECIMAL(10,2) NULL DEFAULT NULL,
  `pedir` TINYINT(1) NULL DEFAULT NULL,
  `celular` VARCHAR(100) NULL DEFAULT NULL,
  `nota` TEXT NULL DEFAULT NULL,
  `stock_minimo` INT(11) NULL DEFAULT 5,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `proveedor_id` (`proveedor_id` ASC) VISIBLE,
  CONSTRAINT `inv_dia_visores_ibfk_1`
    FOREIGN KEY (`proveedor_id`)
    REFERENCES `inventario`.`proveedor` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
