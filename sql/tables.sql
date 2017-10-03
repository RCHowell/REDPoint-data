CREATE TABLE pages(
  page_id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  url  TEXT NOT NULL
);

CREATE TABLE relationships(
  parent_id integer NOT NULL,
  child_id  integer NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES pages(page_id),
  FOREIGN KEY (child_id)  REFERENCES pages(page_id)
);

