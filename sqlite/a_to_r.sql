CREATE TABLE a_to_r(
  parent_id INT NOT NULL,
  child_id INT NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES pages(page_id),
  FOREIGN KEY (child_id) REFERENCES routes(route_ID)
);

BEGIN TRANSACTION;

INSERT INTO a_to_r (parent_id, child_id)
  SELECT parent_id, child_id
  FROM relationships;

COMMIT;
