CREATE TABLE folder (
  id bigint NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255) DEFAULT NULL,
  user_id bigint NOT NULL REFERENCES user(id),
  PRIMARY KEY (id)
);

CREATE TABLE to_do_item  (
  id bigint NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  state varchar (3) NOT NULL DEFAULT "ACT",
  user_id bigint NOT NULL REFERENCES user(id),
  folder_id bigint DEFAULT NULL REFERENCES folder(id),
  CONSTRAINT check_status CHECK (state IN ('ACT', 'COM')),
  PRIMARY KEY (id)
);