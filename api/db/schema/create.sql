DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS matches CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  avatar TEXT DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png');

CREATE TABLE matches (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  partner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);