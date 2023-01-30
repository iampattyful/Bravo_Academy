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