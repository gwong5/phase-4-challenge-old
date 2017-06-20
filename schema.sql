CREATE TABLE albums (
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(18) NOT NULL
);

CREATE TABLE reviews (
  id SERIAL,
  reviewer_id INTEGER,
  body VARCHAR(300),
  created DATE
);
