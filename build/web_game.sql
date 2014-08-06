SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

USE `CmEyRBHdSYQSLfefqMRl` ;

-- -----------------------------------------------------
-- Table `CmEyRBHdSYQSLfefqMRl`.`blob`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `CmEyRBHdSYQSLfefqMRl`.`blob` (
  `content` BINARY(1) NOT NULL ,
  `contentType` VARCHAR(45) NULL DEFAULT NULL ,
  `size` INT(11) NULL DEFAULT NULL ,
  `status` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`content`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `CmEyRBHdSYQSLfefqMRl`.`connets`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `CmEyRBHdSYQSLfefqMRl`.`connets` (
  `gameName` VARCHAR(50) NULL DEFAULT NULL ,
  `ownerID` VARCHAR(45) NULL DEFAULT NULL ,
  `ownerName` VARCHAR(45) NULL DEFAULT NULL ,
  `createData` DATETIME NULL DEFAULT NULL ,
  `pictureIDs` VARCHAR(2048) NULL DEFAULT NULL ,
  `iconID` VARCHAR(45) NULL DEFAULT NULL ,
  `public` INT(11) NULL DEFAULT NULL ,
  `playedTimes` INT(11) NULL DEFAULT NULL ,
  `topscore` INT(11) NULL DEFAULT NULL ,
  `topscorePlayer` INT(11) NULL DEFAULT NULL ,
  `lastPlayers` VARCHAR(45) NULL DEFAULT NULL ,
  `status` INT(11) NULL DEFAULT NULL )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `CmEyRBHdSYQSLfefqMRl`.`game`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `CmEyRBHdSYQSLfefqMRl`.`game` (
  `ownerID` VARBINARY(50) NULL DEFAULT NULL ,
  `ownerName` VARCHAR(45) NULL DEFAULT NULL ,
  `gameType` INT(11) NULL DEFAULT NULL ,
  `createDate` DATETIME NULL DEFAULT NULL ,
  `gameName` VARCHAR(45) NULL DEFAULT NULL ,
  `pictureID` VARCHAR(45) NULL DEFAULT NULL ,
  `iconID` VARCHAR(45) NULL DEFAULT NULL ,
  `gameID` VARCHAR(45) NULL DEFAULT NULL ,
  `status` INT(11) NULL DEFAULT NULL )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `CmEyRBHdSYQSLfefqMRl`.`game_record`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `CmEyRBHdSYQSLfefqMRl`.`game_record` (
  `gameID` VARCHAR(50) NULL DEFAULT NULL ,
  `playerID` VARCHAR(45) NULL DEFAULT NULL ,
  `playerName` VARCHAR(45) NULL DEFAULT NULL ,
  `playerAvatar` VARCHAR(45) NULL DEFAULT NULL ,
  `score` INT(11) NULL DEFAULT NULL )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `CmEyRBHdSYQSLfefqMRl`.`picture`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `CmEyRBHdSYQSLfefqMRl`.`picture` (
  `userID` VARBINARY(50) NULL DEFAULT NULL ,
  `pictureName` VARCHAR(45) NULL DEFAULT NULL ,
  `uploadDate` DATETIME NULL DEFAULT NULL ,
  `contentType` VARCHAR(30) NULL DEFAULT NULL ,
  `fullImageBlob` VARCHAR(45) NULL DEFAULT NULL ,
  `thumbnailId` VARBINARY(45) NULL DEFAULT NULL ,
  `blur` INT(11) NULL DEFAULT NULL ,
  `isAvatar` INT(11) NULL DEFAULT NULL ,
  `status` INT(11) NULL DEFAULT NULL )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `CmEyRBHdSYQSLfefqMRl`.`user`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `CmEyRBHdSYQSLfefqMRl`.`user` (
  `userID` VARCHAR(50) NOT NULL DEFAULT '' ,
  `nickName` VARCHAR(45) NULL DEFAULT NULL ,
  `avatarID` VARCHAR(45) NULL DEFAULT NULL ,
  `status` INT(11) NULL DEFAULT NULL ,
  `score` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`userID`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `CmEyRBHdSYQSLfefqMRl` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
