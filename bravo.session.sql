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

CREATE TABLE role
(
  id        SERIAL  NOT NULL,
  role_name VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

        
CREATE TABLE bookmark_table
(
  student_id INTEGER,
  teacher_id INTEGER 
);

-- CREATE TABLE comments
-- (
--   comment_id SERIAL NOT NULL,
--   user_id    INTEGER,
--   PRIMARY KEY (comment_id)
-- );

CREATE TABLE user_comment_table
(
  user_id    INTEGER,
  comment_id INTEGER 
);

ALTER TABLE user_comment_table
  ADD CONSTRAINT FK_users_TO_user_comment_table
    FOREIGN KEY (user_id)
    REFERENCES users (user_id);

ALTER TABLE user_comment_table
  ADD CONSTRAINT FK_comments_TO_user_comment_table
    FOREIGN KEY (comment_id)
    REFERENCES comments (comment_id);

ALTER TABLE bookmark_table
  ADD CONSTRAINT FK_users_TO_bookmark_table
    FOREIGN KEY (student_id)
    REFERENCES users (user_id);

ALTER TABLE bookmark_table
  ADD CONSTRAINT FK_users_TO_bookmark_table1
    FOREIGN KEY (teacher_id)
    REFERENCES users (user_id);



ALTER TABLE users
  ADD CONSTRAINT FK_role_TO_users
    FOREIGN KEY (role_id)
    REFERENCES role (id);

ALTER TABLE users
  ADD CONSTRAINT FK_subject_TO_users
    FOREIGN KEY (subject_id)
    REFERENCES subject (id);



INSERT INTO subject (subject_name) VALUES ('chinese');
INSERT INTO subject (subject_name) VALUES ('english');
INSERT INTO subject (subject_name) VALUES ('french');
INSERT INTO subject (subject_name) VALUES ('japanese');
INSERT INTO subject (subject_name) VALUES ('student');

INSERT INTO role (role_name) VALUES ('teacher');
INSERT INTO role (role_name) VALUES ('student');

DROP TABLE user_comment_table;
DROP TABLE comments;

CREATE TABLE user_comment_table
(
  user_id    INTEGER,
  content    VARCHAR NOT NULL,
  comment_id SERIAL  NOT NULL,
  PRIMARY KEY (comment_id)
);
ALTER TABLE user_comment_table
  ADD CONSTRAINT FK_users_TO_user_comment_table
    FOREIGN KEY (user_id)
    REFERENCES users (user_id);

CREATE TABLE contact_us
(
  id      SERIAL  NOT NULL,
  email   VARCHAR NOT NULL,
  content VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO role (id, role_name) VALUES (3, 'admin') ;

        
CREATE TABLE appointment
(
  user_id integer 
  user_id integer 
);