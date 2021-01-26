INSERT INTO users (name, email, avatar) VALUES
  ('Bob Ross', 'test@test.com', 'https://yt3.ggpht.com/ytc/AAUvwnhkZjfj3AhZNOvbxzIzVLTKZZHGLAlIHVstuYx1=s88-c-k-c0x00ffffff-no-rj'),
  ('Bart Simpson', 'bart@simpson.com', 'https://openpsychometrics.org/tests/characters/test-resources/pics/S/2.jpg'),
  ('Bob Mango', 'bob@mango.com', 'https://i.ibb.co/YNnbbrs/bob-mango-1.png'),
  ('Sue Mango', 'sue@mango.com', 'https://i.ibb.co/1RGFYwV/sue-mango.png'),
  ('John Oke', 'jooke98@outlook.com', 'https://media-exp1.licdn.com/dms/image/C5635AQGwkJh0Lf8XHA/profile-framedphoto-shrink_200_200/0/1610396481292?e=1611626400&v=beta&t=SggNsnoUbaPDgE9Oe9a_froW8pXW4K52gyx94A4nAX4'),
  ('Dante Cross', 'dantecross@outlook.com', 'https://media-exp1.licdn.com/dms/image/C5603AQFngo8irDmEzQ/profile-displayphoto-shrink_200_200/0/1553551349093?e=1617235200&v=beta&t=57VAQOqpMdFUE0yXfA4vAwWT9_s-Ug1ZN6xiicV07sA'),
  ('Arthur Remy', 'remy_29@msn.com', 'https://media-exp1.licdn.com/dms/image/C4D35AQEe68RPjd1UWA/profile-framedphoto-shrink_200_200/0/1609639216906?e=1611630000&v=beta&t=EsQj3SqSpfWnYisVV3uMXZ66ZRwusnpJNTzhkmfxkSc'),
  ('Sean Oyler', 'sean.oyler@gmail.com', 'https://media-exp1.licdn.com/dms/image/C5635AQH6NcF0nuAqdw/profile-framedphoto-shrink_200_200/0/1607720718073?e=1611630000&v=beta&t=DMVlKZP0gmSeBY9mWZus5ZwwuCT68QOaY5Lc-KyJf1Q'),
  ('Stanley Park', '4ever@stlyprk.bc.ca', 'https://i.ibb.co/f078yTW/stanley.png');

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