# SQLite Basic Setup with REDPoint-Data

Note: These commands use relative paths so I'm operating under the assumption that the file structure is like so

```
.
├── data
│   ├── pages.tsv (name, url, type of mountainproject pages)
│   ├── relationships.tsv (transitive closure table for areas and routes relationship - including depth)
│   ├── route_numbers.tsv (one to one relationships with the columns being route_id and route numbers from Left to Right)
├── sqlite (Running commands from here)
│   ├── database.db
│   ├── join_example.sql
│   ├── select.sql
│   ├── tables.sql (page and relationship table)
│   ├── routes.sql (routes table)
│   └── tutorial.md
```

### Create databse and insert tables
`sqlite3 ./database.db < ./tables.sql`

### Insert TSV
```
sqlite3 ./database.db
.mode tabs
.import ../data/pages.tsv pages
.import ../data/relationships.tsv relationships
```

### Formatted Output
```
.mode column
.headers on

# Show the elapsed time for a query
.timer on
```

### Describe Database
```
# List tables
.tables

# Describe tables
PRAGMA table_info([tablename]);

# Show table creation code
.schema tablename

# Show stats for queries
.stats on
```
