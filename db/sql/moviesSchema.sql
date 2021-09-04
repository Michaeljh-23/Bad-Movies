-- SET UP SCHEMA HERE


CREATE DATABASE badMovies;

USE badMovies;

CREATE TABLE genres (
  genre_id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE favorites (
  movie_id INTEGER NOT NULL PRIMARY KEY
);
  -- title VARCHAR(100) NOT NULL,
  -- overview VARCHAR(300),
  -- backdrop_path VARCHAR(100),
  -- release_date DATE NOT NULL,
  -- genre_ids INTEGER,
  -- vote_average INTEGER NOT NULL,
  -- vote_count INTEGER NOT NULL,
  -- FOREIGN KEY (genre_ids) REFERENCES genres(genre_id)

-- CREATE TABLE favorites_genres (
--   genre_id: INTEGER NOT NULL,
--   movie_id: INTEGER NOT NULL,
--   PRIMARY KEY(genre_id, movie_id)
-- );

