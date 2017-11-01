-- Select all routes from an area with given id
.headers on
.mode column

SELECT pages.name, pages.url, relationships.depth FROM pages
INNER JOIN relationships
ON relationships.child_id = pages.page_id
WHERE relationships.parent_id = 3 AND pages.is_route = 1;
