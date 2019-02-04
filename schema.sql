/*
CHANGES TO VARIABLE NAMES IN THE FUTURE
  secrets ==> capsules
  secret_body ==> contents
  secret_label ==> description
*/
/*mysql -u root <schema.sql*/
DROP DATABASE IF EXISTS keepsafe;
CREATE DATABASE IF NOT EXISTS keepsafe;

USE keepsafe;

CREATE TABLE IF NOT EXISTS credentials (
  user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  UNIQUE KEY (username),
  UNIQUE KEY (password)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS secrets (
  secret_id INT(4) ZEROFILL AUTO_INCREMENT NOT NULL PRIMARY KEY,
  user_id INT(10) NOT NULL,
  creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  release_date DATETIME NOT NULL,
  secret_label VARCHAR(100) NOT NULL DEFAULT '',
  secret_body VARCHAR(10000) NOT NULL,
  FOREIGN KEY fk_user (user_id)
    REFERENCES credentials(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/* Procedure to show full secret entries */
-- USE `keepsafe`;
-- DROP procedure IF EXISTS `ShowSecretsEntries`;

-- DELIMITER $$
-- USE `keepsafe`$$
-- CREATE DEFINER=`root`@`localhost` PROCEDURE `JoinTables`()
-- BEGIN
--   SELECT * FROM keepsafe.secrets
--   LEFT JOIN keepsafe.credentials USING (user_id);
-- END;$$

-- DELIMITER ;
