CREATE TABLE albums (
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(18) NOT NULL
);

CREATE TABLE reviews (
  id SERIAL,
  album_id INTEGER,
  reviewer_id INTEGER,
  body VARCHAR(300) NOT NULL,
  date_ DATE DEFAULT CURRENT_DATE
);
