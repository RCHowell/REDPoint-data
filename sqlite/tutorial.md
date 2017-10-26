# SQLite Basic Setup with REDPoint-Data

Note: These commands use relative paths so I'm operating under the assumption that the file structure is like so

```
.
├── data
│   ├── pages.tsv
│   ├── relationships.tsv
├── sqlite (Running commands from here)
│   ├── relations.db (This is a database with only the relationship information and page urls)
│   ├── join_example.sql
│   ├── select.sql
│   ├── tables.sql
│   └── tutorial.md
```

### Create databse and insert tables
`sqlite3 ./relations.db < ./tables.sql`

### Insert TSV
```
sqlite3 ./relations.db
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
