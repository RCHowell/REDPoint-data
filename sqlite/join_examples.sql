-- Select all routes from an area with given id
.headers on
.mode column

-- Get children pages given a page id
SELECT pages.name, pages.url, relationships.depth FROM pages
INNER JOIN relationships
ON relationships.child_id = pages.page_id
WHERE relationships.parent_id = 3 AND pages.is_route = 1;


-- Select all areas/crags and print out routes broken down by type
SELECT
  P.page_id,
  P.name,
  P.url,
  (
    SELECT COUNT(*) FROM routes
    INNER JOIN relationships AS R
    ON R.child_id = routes.route_id
    WHERE R.parent_id = P.page_id AND routes.type = 'Sport'
  ) sport_count,
  (
    SELECT COUNT(*) FROM routes
    INNER JOIN relationships AS R
    ON R.child_id = routes.route_id
    WHERE R.parent_id = P.page_id AND routes.type = 'Trad'
  ) trad_count,
  (
    SELECT COUNT(*) FROM routes
    INNER JOIN relationships AS R
    ON R.child_id = routes.route_id
    WHERE R.parent_id = P.page_id AND routes.type != 'Trad' AND routes.type != 'Sport'
  ) other_count
FROM pages AS P
INNER JOIN relationships AS R ON R.child_id = P.page_id
WHERE R.parent_id = 1 AND P.is_route = 0 AND R.depth = 1;

SELECT
  R.route_id,
  R.name,
  (
    SELECT tag FROM tags
    LEFT JOIN routes ON routes.route_id = tags.route_id
  ) tags
FROM routes as R
LIMIT 1
