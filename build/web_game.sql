SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE DATABASE IF NOT EXISTS `web_game`;

-- -----------------------------------------------------
-- Table `web_game`.`user`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `web_game`.`user` (
  `user_id` VARCHAR(20) NOT NULL ,
  `nick_name` VARCHAR(45) NULL ,
  `avatar_path` VARCHAR(100) NULL ,
  PRIMARY KEY (`user_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `web_game`.`picture`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `web_game`.`picture` (
  `upload_date` TIMESTAMP NULL ,
  `fullimage_path` VARCHAR(100) NULL ,
  `thumbnail_path` VARCHAR(100) NULL ,
  `is_avatar` INT NULL ,
  `user_id` VARCHAR(20) NULL ,
  INDEX `user_id_idx` (`user_id` ASC) ,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `web_game`.`user` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `web_game`.`game`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `web_game`.`game` (
  `game_name` VARCHAR(30) NULL ,
  `game_id` INT NOT NULL AUTO_INCREMENT ,
  `create_date` TIMESTAMP NULL ,
  `picture_pathes` VARCHAR(500) NULL ,
  `played_times` INT NULL ,
  `last_players` VARCHAR(135) NULL ,
  `owner_id` VARCHAR(20) NULL ,
  PRIMARY KEY (`game_id`) ,
  INDEX `owner_id_idx` (`owner_id` ASC) ,
  CONSTRAINT `owner_id`
    FOREIGN KEY (`owner_id` )
    REFERENCES `web_game`.`user` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
