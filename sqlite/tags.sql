CREATE TABLE tags(
  FOREIGN KEY (route_id) REFERENCES routes(route_id),
  tag TEXT NOT NULL
);
