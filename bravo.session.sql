CREATE TABLE users
(
  user_id     SERIAL  NOT NULL,
  email       VARCHAR NOT NULL,
  password    VARCHAR NOT NULL,
  username    VARCHAR NOT NULL,
  phone       INTEGER NOT NULL,
  description VARCHAR     ,
  price       INTEGER NOT NULL DEFAULT 100,
  duration    INTEGER NOT NULL DEFAULT 60,
  subject     VARCHAR NOT NULL,
  image       VARCHAR      ,
  role_id     INTEGER      ,
  subject_id  INTEGER  ,
  PRIMARY KEY (user_id)
);


CREATE TABLE subject
(
  id           SERIAL  NOT NULL,
  subject_name VARCHAR NOT NULL,
  PRIMARY KEY (id)
);


ALTER TABLE users
  ADD CONSTRAINT FK_role_TO_users
    FOREIGN KEY (role_id)
    REFERENCES role (id);

ALTER TABLE users
  ADD CONSTRAINT FK_subject_TO_users
    FOREIGN KEY (subject_id)
    REFERENCES subject (id);



INSERT INTO subject (subject_name) VALUES ('chinese')
INSERT INTO subject (subject_name) VALUES ('english');
INSERT INTO subject (subject_name) VALUES ('french');
INSERT INTO subject (subject_name) VALUES ('japanese');


INSERT INTO users (email, password, username, phone, role_id) VALUES ('jojo@gmail.com','$2a$10$X6ZJGYd2rNZlU2QfqcLSu.Ps4rxVJrz7Fs0Ti/4g2zsNxKjuvRcZu','jojo',12345678,2 );


UPDATE subject SET subject_name = 'chinese' WHERE id = '1'