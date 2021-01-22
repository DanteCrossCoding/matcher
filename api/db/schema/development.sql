INSERT INTO users (name, email) VALUES
  ('Bob Ross', 'test@test.com'),
  ('Stanley Park', '4ever@stlyprk.bc.ca'),
  ('Bart Simpson', 'fart@farts.com'),
  ('Dante Cross', 'dantecross@outlook.com'),
  ('Arthur Remy', 'remy_29@msn.com'),
  ('Sean Oyler', 'sean.oyler@gmail.com'),
  ('John Oke', 'jooke98@outlook.com');

INSERT INTO matches (restaurant, user_id, partner_id) VALUES
  ('604-669-7769', 1, 2),
  ('604-669-7769', 2, 1),
  ('604-879-9878', 2, 3),
  ('604-879-9878', 3, 2),
  ('604-266-1428', 1, 2),
  ('604-266-1428', 2, 1),
  ('604-266-1428', 2, 3),
  ('604-266-1428', 3, 2),
  ('604-266-1428', 4, 2),
  ('604-266-1428', 5, 2),
  ('604-266-1428', 6, 2),
  ('604-266-1428', 2, 4),
  ('604-266-1428', 2, 5),
  ('604-266-1428', 2, 6);