/*mysql -u root <schema.sql*/
DROP DATABASE IF EXISTS `keepsafe`;
CREATE DATABASE IF NOT EXISTS `keepsafe`;

USE keepsafe;

CREATE TABLE IF NOT EXISTS `credentials` (
  `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(40) UNIQUE,
  `hash` VARCHAR(172),
  `salt` VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `entries` (
  `entry_id` INT(4) ZEROFILL NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `creation_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `release_date` DATETIME NOT NULL,
  `description` VARCHAR(100) NOT NULL DEFAULT '',
  `content` VARCHAR(10000) NOT NULL,
  FOREIGN KEY fk_user (user_id)
    REFERENCES credentials(`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB

/* Procedure to show full entries */
-- USE `keepsafe`;
-- DROP procedure IF EXISTS `ShowEntries`;

-- DELIMITER $$
-- USE `keepsafe`$$
-- CREATE DEFINER=`root`@`localhost` PROCEDURE `JoinTables`()
-- BEGIN
--   SELECT * FROM keepsafe.entries
--   LEFT JOIN keepsafe.credentials USING (user_id);
-- END;$$

-- DELIMITER ;
