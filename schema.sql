CREATE DATABASE todo;
USE todo;

CREATE TABLE todo (
    id integer PRIMARY KEY AUTO_INCREMENT,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO todo (task, completed)
VALUES ('Learn SQL', false),
       ('Learn Python', false),
       ('Learn JavaScript', true);