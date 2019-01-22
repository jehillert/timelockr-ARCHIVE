/*mysql -u root <schema.sql*/
DROP DATABASE IF EXISTS safekeep;
CREATE DATABASE IF NOT EXISTS safekeep;

USE safekeep;

CREATE TABLE IF NOT EXISTS credentials (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  UNIQUE KEY (username),
  UNIQUE KEY (password)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS secrets (
  secret_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT(10) NOT NULL,
  creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  release_date DATETIME NOT NULL,
  secret_label VARCHAR(20) NOT NULL DEFAULT '',
  secret_body VARCHAR(10000) NOT NULL,
  FOREIGN KEY fk_user (user_id)
    REFERENCES credentials(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/* Procedure to show full secret entries */
-- USE `safekeep`;
-- DROP procedure IF EXISTS `ShowSecretsEntries`;

-- DELIMITER $$
-- USE `safekeep`$$
-- CREATE DEFINER=`root`@`localhost` PROCEDURE `JoinTables`()
-- BEGIN
--   SELECT * FROM safekeep.secrets
--   LEFT JOIN safekeep.credentials USING (user_id);
-- END;$$

-- DELIMITER ;
