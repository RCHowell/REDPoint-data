SELECT pages.page_id, pages.name, pages.url FROM pages
INNER JOIN relationships
ON relationships.child_id = pages.page_id
WHERE relationships.parent_id = 1;

