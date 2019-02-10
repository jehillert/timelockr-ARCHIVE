/*mysql -u root <schema.sql*/
DROP DATABASE IF EXISTS keepsafe;
CREATE DATABASE IF NOT EXISTS keepsafe;

USE keepsafe;

CREATE TABLE IF NOT EXISTS credentials (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(40) UNIQUE,
  hash VARCHAR(172),
  salt VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS secrets (
  secret_id INT(4) ZEROFILL NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
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
