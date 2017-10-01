# REDPoint-data

What's this?

I'm working on a project which requires lots of Rock Climbing data! So, this is a repo which has some scraping scripts to get data from Mountain Project. I have it configured to start a depth first search at Kentucky's Red River Gorge, but that could be replaced to start anywhere. Classes in `/lib` can be used to retrieve more information from the page. `index.js` is what constructs the graph of urls and recognizes a page as either a route or an area.

## What are the nodes?

```javascript
class Node {
  constructor(name, url, type) {
    // I'm using the current node count as an id
    this.id = COUNT;
    this.name = name;
    this.url = url;
    this.children = [];
    this.type = type;
  }

  addChild(child) {
    this.children.push(child);
  }
}
```

## graph.json

This file contains a stringify-ed version of the generated graph.

## pages.tsv and relationships.tsv

These files contain data ready to be inserted into a SQL database.

A **page** is an area or route.

A **relationship** holds the id's of parents and children


