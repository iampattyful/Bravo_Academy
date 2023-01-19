CREATE TABLE users
(
  user_id     SERIAL  NOT NULL,
  username    VARCHAR NOT NULL,
  password    VARCHAR NOT NULL,
  description VARCHAR,
  price       INTEGER NOT NULL DEFAULT 100,
  duration    INTEGER NOT NULL DEFAULT 60,
  subject     VARCHAR NOT NULL,
  image       VARCHAR ,     
  role_id     INTEGER ,
  PRIMARY KEY (user_id)
);

CREATE TABLE role
(
  id        SERIAL  NOT NULL,
  role_name VARCHAR NOT NULL,
  PRIMARY KEY (id)
);


ALTER TABLE users
  ADD CONSTRAINT FK_role_TO_users
    FOREIGN KEY (role_id)
    REFERENCES role (id);

INSERT INTO users (username, password, description, subject, role_id ) VALUES ('jojo','jojo','This is jojo','English',1)

UPDATE users SET username = 'jojo@gmail.com' WHERE username = 'jojo'