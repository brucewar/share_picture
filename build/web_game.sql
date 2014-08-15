SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `web_game` DEFAULT CHARACTER SET utf8 ;
USE `web_game` ;

-- -----------------------------------------------------
-- Table `web_game`.`user`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `web_game`.`user` (
  `user_id` VARCHAR(20) NOT NULL ,
  `nick_name` VARCHAR(45) NULL DEFAULT NULL ,
  `avatar_path` VARCHAR(100) NULL DEFAULT NULL ,
  PRIMARY KEY (`user_id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `web_game`.`game`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `web_game`.`game` (
  `game_name` VARCHAR(30) NULL DEFAULT NULL ,
  `game_id` INT(11) NOT NULL AUTO_INCREMENT ,
  `create_date` TIMESTAMP NULL DEFAULT NULL ,
  `picture_pathes` VARCHAR(500) NULL DEFAULT NULL ,
  `played_times` INT(11) NULL DEFAULT NULL ,
  `last_players` VARCHAR(135) NULL DEFAULT NULL ,
  `owner_id` VARCHAR(20) NULL DEFAULT NULL ,
  PRIMARY KEY (`game_id`) ,
  INDEX `owner_id_idx` (`owner_id` ASC) ,
  CONSTRAINT `owner_id`
    FOREIGN KEY (`owner_id` )
    REFERENCES `web_game`.`user` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `web_game`.`picture`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `web_game`.`picture` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `upload_date` TIMESTAMP NULL DEFAULT NULL ,
  `fullimage_path` VARCHAR(100) NULL DEFAULT NULL ,
  `thumbnail_path` VARCHAR(100) NULL DEFAULT NULL ,
  `user_id` VARCHAR(20) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `user_id_idx` (`user_id` ASC) ,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `web_game`.`user` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;

USE `web_game` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
