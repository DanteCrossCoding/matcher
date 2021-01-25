INSERT INTO users (name, email, avatar) VALUES
  ('Bob Ross', 'test@test.com', 'https://yt3.ggpht.com/ytc/AAUvwnhkZjfj3AhZNOvbxzIzVLTKZZHGLAlIHVstuYx1=s88-c-k-c0x00ffffff-no-rj'),
  ('Bart Simpson', 'fart@farts.com', 'https://images.newrepublic.com/5485c82606455ce71f6659fc57975a096a291c11.jpeg'),
  ('Bob Mango', 'bob@mango.com', 'https://static.wikia.nocookie.net/annoyingorange/images/4/46/MangoLeStache.png/revision/latest?cb=20140720020208'),
  ('Sue Mango', 'sue@mango.com', 'https://www.seekpng.com/png/full/18-181383_mango-clipart-apple-clip-art-mango-png.png');
  
INSERT INTO users (name, email) VALUES
  ('Stanley Park', '4ever@stlyprk.bc.ca'),
  ('Dante Cross', 'dantecross@outlook.com'),
  ('Arthur Remy', 'remy_29@msn.com'),
  ('Sean Oyler', 'sean.oyler@gmail.com'),
  ('John Oke', 'jooke98@outlook.com');

INSERT INTO matches (restaurant, user_id, partner_id) VALUES
  ('Dinesty Dumpling House', 1, 2),
  ('Dinesty Dumpling House', 2, 1),
  ('Peaceful Restaurant', 2, 3),
  ('Peaceful Restaurant', 3, 2),
  ('Ajisai Sushi Bar', 1, 2),
  ('Ajisai Sushi Bar', 2, 1),
  ('Ajisai Sushi Bar', 2, 3),
  ('Ajisai Sushi Bar', 3, 2),
  ('Ajisai Sushi Bar', 4, 2),
  ('Ajisai Sushi Bar', 5, 2),
  ('Ajisai Sushi Bar', 6, 2),
  ('Ajisai Sushi Bar', 2, 4),
  ('Ajisai Sushi Bar', 2, 5),
  ('Ajisai Sushi Bar', 2, 6);