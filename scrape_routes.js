const path = require('path');
const fs = require('fs');
const Route = require('./lib/route');
const sqlite3 = require('sqlite3').verbose();

// Get location of db
const dbFilename = path.join(__dirname, 'sqlite', 'relations.db');
// console.log(`Database file: ${dbFilename}`);

// Load routes table schema from file
const routesTableSchemaFile = path.join(__dirname, 'sqlite', 'routes.sql');
const routesTableSchema = fs.readFileSync(routesTableSchemaFile, {
  encoding: 'utf-8',
});
// console.log(routesTableSchema);

const db = new sqlite3.Database(dbFilename, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log(err);
  // else console.log('Database open');
});

db.serialize(() => {
  // Queries within db.serialize will run sequentially
  // db.run('DROP TABLE IF EXISTS routes');
  // db.run(routesTableSchema);
  const runners = []; // Promise runners
  db.each('SELECT * FROM pages WHERE is_route = 1 limit 100 offset 1600', (err, page) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const route = new Route(page);
    // console.log(route.url);
    runners.push(route.get().catch((routeError) => {
      console.error(routeError);
      console.log(`For ${page.url}`);
    }));
  });
  // Dummy query to make sure Promise.all() runs after adding all promise runners
  // I must do this to make sure the provided callback is added to sqlite3's execution stack
  db.run('ANALYZE routes', () => {
    // Insert into routes table after all promises resolve
    Promise.all(runners).then((data) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        data.forEach((route) => {
          // console.log(Object.keys(route));
          db.run(`
            INSERT INTO routes (route_id, name, url, type, length, grade, stars, description, location, protection)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
              route.route_id,
              route.name,
              route.url,
              route.type,
              route.length,
              route.grade,
              route.stars,
              route.description,
              route.location,
              route.protection,
            ]);
        });
        db.run('END');
      });
    });
  });
});
