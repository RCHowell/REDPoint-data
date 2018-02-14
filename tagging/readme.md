# REDPoint-Data Tagging

This folder contains a python virtual environment with NLTK installed in order to generate tags from route descriptions.

An ideal route object will contain
```
  route_id INT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  length INT NOT NULL,
  grade TEXT NOT NULL,
  stars REAL NOT NULL,
  location TEXT NOT NULL,
  protection TEXT NOT NULL,
  number INT NOT NULL,
  needsPermit INT NOT NULL,
<<<<<<< HEAD:sqlite/routes.sql
  permitInfo TEXT NOT NULL
);

CREATE TABLE favorites(
  -- using strftime('%s', 'now')
  saved_on INT NOT NULL,
  route_id INT NOT NULL,
  FOREIGN KEY (route_id) REFERENCES routes(route_id)
);
=======
  permitInfo TEXT NOT NULL,
```
>>>>>>> 52250fbafb5c1a1f6eb2a927283e2de352eb3d89:tagging/readme.md
