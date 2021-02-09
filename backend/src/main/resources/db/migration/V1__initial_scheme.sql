CREATE TABLE user (
  id bigint NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  username varchar(255) DEFAULT NULL UNIQUE,
  PRIMARY KEY (id)
) ;