CREATE TABLE routes(
  route_id INT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  length INT NOT NULL,
  grade TEXT NOT NULL,
  stars REAL NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  protection TEXT NOT NULL
);
