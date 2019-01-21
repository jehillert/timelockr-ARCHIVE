/*mysql -u root <schema.sql*/
DROP DATABASE IF EXISTS keepAway;
CREATE DATABASE IF NOT EXISTS keepAway;

USE keepAway;

CREATE TABLE IF NOT EXISTS credentials (
  username VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  userId INT NOT NULL AUTO_INCREMENT,
  UNIQUE KEY (username),
  UNIQUE KEY (password),
  PRIMARY KEY (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS secrets (
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  available DATETIME NOT NULL,
  secret VARCHAR(10000) NOT NULL,
  userId INT(10) NOT NULL,
  FOREIGN KEY fk_user (userId)
    REFERENCES credentials(userId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  secretsId INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (secretsId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/* Procedure to show full sectret entries */
-- USE `keepAway`;
-- DROP procedure IF EXISTS `ShowSecretsEntries`;

-- DELIMITER $$
-- USE `keepAway`$$
-- CREATE DEFINER=`root`@`localhost` PROCEDURE `JoinTables`()
-- BEGIN
--   SELECT * FROM keepAway.secrets
--   LEFT JOIN keepAway.credentials USING (userId);
-- END;$$

-- DELIMITER ;
